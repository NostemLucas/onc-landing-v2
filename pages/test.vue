<template>
	<div class="min-h-screen bg-gray-50 p-4">
		<div class="max-w-6xl mx-auto">
			<h1 class="text-2xl font-bold mb-6">Advanced Content Builder</h1>

			<!-- Template Selection -->
			<div class="bg-white rounded-lg shadow p-4 mb-6">
				<h2 class="text-lg font-medium mb-3">Templates</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div
						v-for="template in templates"
						:key="template.id"
						class="border rounded-md p-3 cursor-pointer hover:border-primary transition-colors"
						:class="{
							'border-primary bg-primary/5': selectedTemplate === template.id,
						}"
						@click="selectTemplate(template.id)"
					>
						<div class="aspect-video bg-gray-100 mb-2 overflow-hidden">
							<img
								:src="template.thumbnail"
								alt="Template preview"
								class="w-full h-full object-cover"
							/>
						</div>
						<p class="font-medium text-center">{{ template.name }}</p>
					</div>
				</div>
			</div>

			<!-- Fixed Template Fields -->
			<div v-if="selectedTemplate" class="bg-white rounded-lg shadow p-4 mb-6">
				<h2 class="text-lg font-medium mb-3">Article Information</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">
							Title
						</label>
						<input
							v-model="fixedFields.title"
							type="text"
							class="w-full p-2 border rounded-md"
							placeholder="Enter article title"
						/>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">
							Author
						</label>
						<input
							v-model="fixedFields.author"
							type="text"
							class="w-full p-2 border rounded-md"
							placeholder="Enter author name"
						/>
					</div>
					<div class="md:col-span-2">
						<label class="block text-sm font-medium text-gray-700 mb-1">
							Banner Image URL
						</label>
						<input
							v-model="fixedFields.bannerImage"
							type="text"
							class="w-full p-2 border rounded-md"
							placeholder="Enter banner image URL"
						/>
						<div v-if="fixedFields.bannerImage" class="mt-2 relative">
							<img
								:src="fixedFields.bannerImage"
								alt="Banner preview"
								class="w-full h-48 object-cover rounded-md"
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- Component Palette -->
			<div class="bg-white rounded-lg shadow p-4 mb-6">
				<h2 class="text-lg font-medium mb-3">Components</h2>
				<div class="grid grid-cols-2 md:grid-cols-6 gap-3">
					<div
						v-for="component in availableComponents"
						:key="component.type"
						class="bg-gray-100 p-3 rounded-md cursor-move hover:bg-gray-200 transition-colors flex flex-col items-center justify-center"
						draggable="true"
						@dragstart="onDragStart($event, component)"
					>
						<component :is="getIcon(component.type)" class="h-5 w-5 mb-1" />
						<span class="text-sm">{{ component.label }}</span>
					</div>
				</div>
			</div>

			<!-- Content Canvas -->
			<div class="mb-6">
				<!-- Template Preview -->
				<div class="bg-white rounded-lg shadow overflow-hidden">
					<!-- Banner Template -->
					<div v-if="selectedTemplate === 'banner'" class="relative">
						<img
							:src="
								fixedFields.bannerImage ||
								'/placeholder.svg?height=400&width=1200'
							"
							alt="Banner"
							class="w-full h-64 object-cover"
						/>
						<div
							class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6"
						>
							<h1 class="text-3xl font-bold text-white">
								{{ fixedFields.title || 'Article Title' }}
							</h1>
							<p class="text-white/80">
								By {{ fixedFields.author || 'Author Name' }}
							</p>
						</div>
					</div>

					<!-- Feature Template -->
					<div v-else-if="selectedTemplate === 'feature'" class="p-6">
						<h1 class="text-4xl font-bold mb-2">
							{{ fixedFields.title || 'Article Title' }}
						</h1>
						<p class="text-gray-500 mb-4">
							By {{ fixedFields.author || 'Author Name' }}
						</p>
						<img
							:src="
								fixedFields.bannerImage ||
								'/placeholder.svg?height=400&width=1200'
							"
							alt="Banner"
							class="w-full h-64 object-cover rounded-md mb-6"
						/>
					</div>

					<!-- Minimal Template -->
					<div v-else-if="selectedTemplate === 'minimal'" class="p-6">
						<div class="max-w-3xl mx-auto">
							<h1 class="text-3xl font-bold mb-2 text-center">
								{{ fixedFields.title || 'Article Title' }}
							</h1>
							<p class="text-gray-500 mb-6 text-center">
								By {{ fixedFields.author || 'Author Name' }}
							</p>
							<img
								:src="
									fixedFields.bannerImage ||
									'/placeholder.svg?height=400&width=1200'
								"
								alt="Banner"
								class="w-full h-64 object-cover rounded-md mb-6"
							/>
						</div>
					</div>

					<!-- Content Grid -->
					<div
						class="relative grid grid-cols-12 gap-4 p-6 min-h-[500px]"
						@dragover.prevent
						@drop="onDrop($event)"
						ref="contentGrid"
					>
						<p
							v-if="content.length === 0"
							class="text-gray-400 text-center py-12 col-span-12"
						>
							Drag and drop components here to build your content
						</p>

						<div
							v-for="(item, index) in content"
							:key="index"
							class="absolute group border border-transparent hover:border-gray-200 rounded-md"
							:style="{
								left: `${item.position.x}px`,
								top: `${item.position.y}px`,
								width: `${item.size.width}px`,
								height: `${item.size.height}px`,
								zIndex: item.zIndex,
							}"
							:class="{
								'border-primary border-2': selectedItemIndex === index,
							}"
							@mousedown="selectItem(index, $event)"
						>
							<!-- Component Controls -->
							<div
								class="absolute right-2 top-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm rounded-md p-1 z-10"
							>
								<button
									@click.stop="bringToFront(index)"
									class="p-1 hover:bg-gray-100 rounded"
								>
									<ArrowUpToLine class="h-4 w-4" />
								</button>
								<button
									@click.stop="removeItem(index)"
									class="p-1 hover:bg-gray-100 rounded text-red-500"
								>
									<Trash2 class="h-4 w-4" />
								</button>
							</div>

							<!-- Resize Handles -->
							<div
								v-if="selectedItemIndex === index"
								class="absolute bottom-0 right-0 w-4 h-4 bg-primary cursor-se-resize"
								@mousedown.stop="startResize(index, $event)"
							></div>

							<!-- Title Component -->
							<h2
								v-if="item.type === 'title'"
								class="font-bold outline-none w-full h-full flex items-center"
								:style="{
									fontSize: `${Math.max(16, Math.min(36, item.size.width / 15))}px`,
								}"
								contenteditable="true"
								@blur="updateContent($event, index)"
							>
								{{ item.content || 'Enter title here' }}
							</h2>

							<!-- Subtitle Component -->
							<h3
								v-else-if="item.type === 'subtitle'"
								class="font-medium outline-none w-full h-full flex items-center"
								:style="{
									fontSize: `${Math.max(14, Math.min(24, item.size.width / 20))}px`,
								}"
								contenteditable="true"
								@blur="updateContent($event, index)"
							>
								{{ item.content || 'Enter subtitle here' }}
							</h3>

							<!-- Text Component -->
							<div
								v-else-if="item.type === 'text'"
								class="outline-none w-full h-full overflow-auto"
								contenteditable="true"
								@blur="updateContent($event, index)"
							>
								{{ item.content || 'Enter text here' }}
							</div>

							<!-- Divider Component -->
							<hr
								v-else-if="item.type === 'divider'"
								class="w-full absolute top-1/2 transform -translate-y-1/2"
							/>

							<!-- Image Component -->
							<div v-else-if="item.type === 'image'" class="w-full h-full">
								<img
									:src="item.content || '/placeholder.svg?height=300&width=600'"
									class="w-full h-full object-cover rounded-md"
									alt="Content image"
								/>
								<input
									v-if="selectedItemIndex === index"
									type="text"
									:value="item.content || ''"
									@input="updateImageUrl($event, index)"
									placeholder="Enter image URL"
									class="absolute bottom-0 left-0 right-0 p-2 bg-white/80 text-sm"
								/>
							</div>

							<!-- Column Layout Component -->
							<div
								v-else-if="item.type === 'columns'"
								class="w-full h-full grid"
								:style="{
									gridTemplateColumns: `repeat(${item.columns || 2}, 1fr)`,
									gap: '1rem',
								}"
							>
								<div
									v-for="col in item.columns || 2"
									:key="col"
									class="border border-dashed border-gray-200 p-2 h-full"
									contenteditable="true"
									@blur="updateColumnContent($event, index, col - 1)"
								>
									{{
										item.columnContent && item.columnContent[col - 1]
											? item.columnContent[col - 1]
											: `Column ${col} content`
									}}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Preview Button -->
			<div class="flex justify-end gap-4">
				<button
					@click="showPreview = !showPreview"
					class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
				>
					{{ showPreview ? 'Close Preview' : 'Preview' }}
				</button>
				<button
					@click="exportContent"
					class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
				>
					Export
				</button>
			</div>

			<!-- Preview Modal -->
			<div
				v-if="showPreview"
				class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
			>
				<div
					class="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto"
				>
					<!-- Banner Template Preview -->
					<div v-if="selectedTemplate === 'banner'" class="relative">
						<img
							:src="
								fixedFields.bannerImage ||
								'/placeholder.svg?height=400&width=1200'
							"
							alt="Banner"
							class="w-full h-64 object-cover"
						/>
						<div
							class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6"
						>
							<h1 class="text-3xl font-bold text-white">
								{{ fixedFields.title || 'Article Title' }}
							</h1>
							<p class="text-white/80">
								By {{ fixedFields.author || 'Author Name' }}
							</p>
						</div>
					</div>

					<!-- Feature Template Preview -->
					<div v-else-if="selectedTemplate === 'feature'" class="p-6">
						<h1 class="text-4xl font-bold mb-2">
							{{ fixedFields.title || 'Article Title' }}
						</h1>
						<p class="text-gray-500 mb-4">
							By {{ fixedFields.author || 'Author Name' }}
						</p>
						<img
							:src="
								fixedFields.bannerImage ||
								'/placeholder.svg?height=400&width=1200'
							"
							alt="Banner"
							class="w-full h-64 object-cover rounded-md mb-6"
						/>
					</div>

					<!-- Minimal Template Preview -->
					<div v-else-if="selectedTemplate === 'minimal'" class="p-6">
						<div class="max-w-3xl mx-auto">
							<h1 class="text-3xl font-bold mb-2 text-center">
								{{ fixedFields.title || 'Article Title' }}
							</h1>
							<p class="text-gray-500 mb-6 text-center">
								By {{ fixedFields.author || 'Author Name' }}
							</p>
							<img
								:src="
									fixedFields.bannerImage ||
									'/placeholder.svg?height=400&width=1200'
								"
								alt="Banner"
								class="w-full h-64 object-cover rounded-md mb-6"
							/>
						</div>
					</div>

					<div class="p-6">
						<div class="flex justify-between items-center mb-4">
							<h2 class="text-xl font-bold">Preview</h2>
							<button
								@click="showPreview = false"
								class="text-gray-500 hover:text-gray-700"
							>
								<X class="h-5 w-5" />
							</button>
						</div>

						<div class="relative">
							<template v-for="(item, index) in sortedContent" :key="index">
								<!-- Title Preview -->
								<h2
									v-if="item.type === 'title'"
									class="font-bold absolute"
									:style="{
										left: `${item.position.x}px`,
										top: `${item.position.y}px`,
										width: `${item.size.width}px`,
										fontSize: `${Math.max(16, Math.min(36, item.size.width / 15))}px`,
									}"
								>
									{{ item.content || 'Title' }}
								</h2>

								<!-- Subtitle Preview -->
								<h3
									v-else-if="item.type === 'subtitle'"
									class="font-medium absolute"
									:style="{
										left: `${item.position.x}px`,
										top: `${item.position.y}px`,
										width: `${item.size.width}px`,
										fontSize: `${Math.max(14, Math.min(24, item.size.width / 20))}px`,
									}"
								>
									{{ item.content || 'Subtitle' }}
								</h3>

								<!-- Text Preview -->
								<div
									v-else-if="item.type === 'text'"
									class="absolute"
									:style="{
										left: `${item.position.x}px`,
										top: `${item.position.y}px`,
										width: `${item.size.width}px`,
										height: `${item.size.height}px`,
									}"
								>
									{{ item.content || 'Text content' }}
								</div>

								<!-- Divider Preview -->
								<hr
									v-else-if="item.type === 'divider'"
									class="absolute"
									:style="{
										left: `${item.position.x}px`,
										top: `${item.position.y}px`,
										width: `${item.size.width}px`,
									}"
								/>

								<!-- Image Preview -->
								<img
									v-else-if="item.type === 'image'"
									:src="item.content || '/placeholder.svg?height=300&width=600'"
									class="absolute object-cover rounded-md"
									:style="{
										left: `${item.position.x}px`,
										top: `${item.position.y}px`,
										width: `${item.size.width}px`,
										height: `${item.size.height}px`,
									}"
									alt="Content image"
								/>

								<!-- Column Layout Preview -->
								<div
									v-else-if="item.type === 'columns'"
									class="absolute grid"
									:style="{
										left: `${item.position.x}px`,
										top: `${item.position.y}px`,
										width: `${item.size.width}px`,
										height: `${item.size.height}px`,
										gridTemplateColumns: `repeat(${item.columns || 2}, 1fr)`,
										gap: '1rem',
									}"
								>
									<div
										v-for="(colContent, colIndex) in item.columnContent || []"
										:key="colIndex"
										class="h-full"
									>
										{{ colContent || `Column ${colIndex + 1} content` }}
									</div>
								</div>
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted, onUnmounted } from 'vue';
	import {
		Type,
		Heading1,
		Heading2,
		AlignLeft,
		Image as ImageIcon,
		SeparatorHorizontal,
		Trash2,
		ArrowUpToLine,
		X,
		Columns,
	} from 'lucide-vue-next';

	interface Position {
		x: number;
		y: number;
	}

	interface Size {
		width: number;
		height: number;
	}

	interface ContentItem {
		type: 'title' | 'subtitle' | 'text' | 'divider' | 'image' | 'columns';
		content?: string;
		position: Position;
		size: Size;
		zIndex: number;
		columns?: number;
		columnContent?: string[];
	}

	interface Template {
		id: string;
		name: string;
		thumbnail: string;
	}

	interface FixedFields {
		title: string;
		author: string;
		bannerImage: string;
	}

	const availableComponents = [
		{ type: 'title', label: 'Title' },
		{ type: 'subtitle', label: 'Subtitle' },
		{ type: 'text', label: 'Text' },
		{ type: 'divider', label: 'Divider' },
		{ type: 'image', label: 'Image' },
		{ type: 'columns', label: 'Columns' },
	];

	const templates = [
		{
			id: 'banner',
			name: 'Banner Header',
			thumbnail: '/placeholder.svg?height=100&width=200',
		},
		{
			id: 'feature',
			name: 'Feature Article',
			thumbnail: '/placeholder.svg?height=100&width=200',
		},
		{
			id: 'minimal',
			name: 'Minimal',
			thumbnail: '/placeholder.svg?height=100&width=200',
		},
	];

	const content = ref<ContentItem[]>([]);
	const showPreview = ref(false);
	const selectedTemplate = ref<string | null>(null);
	const fixedFields = ref<FixedFields>({
		title: '',
		author: '',
		bannerImage: '',
	});
	const contentGrid = ref<HTMLElement | null>(null);
	const selectedItemIndex = ref<number | null>(null);
	const isDragging = ref(false);
	const isResizing = ref(false);
	const dragOffset = ref({ x: 0, y: 0 });
	const zIndexCounter = ref(1);

	// Sort content by zIndex for proper layering
	const sortedContent = computed(() => {
		return [...content.value].sort((a, b) => a.zIndex - b.zIndex);
	});

	const getIcon = (type: string) => {
		switch (type) {
			case 'title':
				return Heading1;
			case 'subtitle':
				return Heading2;
			case 'text':
				return AlignLeft;
			case 'divider':
				return SeparatorHorizontal;
			case 'image':
				return ImageIcon;
			case 'columns':
				return Columns;
			default:
				return Type;
		}
	};

	const selectTemplate = (templateId: string) => {
		selectedTemplate.value = templateId;
	};

	const onDragStart = (event: DragEvent, component: { type: string }) => {
		if (event.dataTransfer) {
			event.dataTransfer.setData('componentType', component.type);
		}
	};

	const onDrop = (event: DragEvent) => {
		if (!contentGrid.value || !event.dataTransfer) return;

		const componentType = event.dataTransfer.getData(
			'componentType'
		) as ContentItem['type'];

		if (componentType) {
			const gridRect = contentGrid.value.getBoundingClientRect();
			const x = event.clientX - gridRect.left;
			const y = event.clientY - gridRect.top;

			// Default sizes based on component type
			let width = 200;
			let height = 100;

			if (componentType === 'title') {
				width = 400;
				height = 60;
			} else if (componentType === 'subtitle') {
				width = 350;
				height = 50;
			} else if (componentType === 'text') {
				width = 300;
				height = 150;
			} else if (componentType === 'divider') {
				width = 300;
				height = 20;
			} else if (componentType === 'image') {
				width = 300;
				height = 200;
			} else if (componentType === 'columns') {
				width = 500;
				height = 200;
			}

			content.value.push({
				type: componentType,
				content: '',
				position: { x, y },
				size: { width, height },
				zIndex: zIndexCounter.value++,
				columns: componentType === 'columns' ? 2 : undefined,
				columnContent: componentType === 'columns' ? ['', ''] : undefined,
			});

			// Select the newly added item
			selectedItemIndex.value = content.value.length - 1;
		}
	};

	const updateContent = (event: Event, index: number) => {
		const target = event.target as HTMLElement;
		content.value[index].content = target.innerText;
	};

	const updateImageUrl = (event: Event, index: number) => {
		const target = event.target as HTMLInputElement;
		content.value[index].content = target.value;
	};

	const updateColumnContent = (
		event: Event,
		index: number,
		columnIndex: number
	) => {
		const target = event.target as HTMLElement;
		if (!content.value[index].columnContent) {
			content.value[index].columnContent = [];
		}
		content.value[index].columnContent![columnIndex] = target.innerText;
	};

	const removeItem = (index: number) => {
		content.value.splice(index, 1);
		if (selectedItemIndex.value === index) {
			selectedItemIndex.value = null;
		}
	};

	const bringToFront = (index: number) => {
		content.value[index].zIndex = zIndexCounter.value++;
	};

	const selectItem = (index: number, event: MouseEvent) => {
		selectedItemIndex.value = index;

		// Start dragging
		if (contentGrid.value && !isResizing.value) {
			const item = content.value[index];
			const gridRect = contentGrid.value.getBoundingClientRect();

			// Calculate offset from the mouse position to the top-left corner of the element
			dragOffset.value = {
				x: event.clientX - gridRect.left - item.position.x,
				y: event.clientY - gridRect.top - item.position.y,
			};

			isDragging.value = true;

			// Bring to front when selecting
			bringToFront(index);
		}
	};

	const startResize = (index: number, event: MouseEvent) => {
		event.stopPropagation();
		selectedItemIndex.value = index;
		isResizing.value = true;
	};

	const onMouseMove = (event: MouseEvent) => {
		if (!contentGrid.value || selectedItemIndex.value === null) return;

		const gridRect = contentGrid.value.getBoundingClientRect();
		const index = selectedItemIndex.value;

		if (isDragging.value && !isResizing.value) {
			// Update position while dragging
			content.value[index].position = {
				x: Math.max(
					0,
					Math.min(
						gridRect.width - content.value[index].size.width,
						event.clientX - gridRect.left - dragOffset.value.x
					)
				),
				y: Math.max(
					0,
					Math.min(
						gridRect.height - content.value[index].size.height,
						event.clientY - gridRect.top - dragOffset.value.y
					)
				),
			};
		} else if (isResizing.value) {
			// Update size while resizing
			const newWidth = Math.max(
				50,
				event.clientX - gridRect.left - content.value[index].position.x
			);
			const newHeight = Math.max(
				30,
				event.clientY - gridRect.top - content.value[index].position.y
			);

			content.value[index].size = {
				width: newWidth,
				height: newHeight,
			};
		}
	};

	const onMouseUp = () => {
		isDragging.value = false;
		isResizing.value = false;
	};

	const exportContent = () => {
		const exportData = {
			template: selectedTemplate.value,
			fixedFields: fixedFields.value,
			content: content.value,
		};

		// Create a JSON blob and download it
		const blob = new Blob([JSON.stringify(exportData, null, 2)], {
			type: 'application/json',
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'article-content.json';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	onMounted(() => {
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	});

	onUnmounted(() => {
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	});
</script>

<style>
	[contenteditable] {
		outline: none;
	}

	.cursor-se-resize {
		cursor: se-resize;
	}
</style>
