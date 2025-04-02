<template>
	<div class="min-h-screen bg-gray-50 flex">
		<!-- Left Sidebar - Component Palette -->
		<div
			class="w-64 bg-white border-r border-gray-200 h-screen overflow-auto p-4 flex flex-col"
		>
			<h2 class="text-lg font-medium mb-4">Components</h2>

			<div class="grid grid-cols-2 gap-3">
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

			<div class="mt-6">
				<h2 class="text-lg font-medium mb-3">Templates</h2>
				<div class="space-y-3">
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
						<p class="font-medium text-center text-sm">{{ template.name }}</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Main Content Area -->
		<div class="flex-1 flex flex-col h-screen overflow-hidden">
			<!-- Top Toolbar -->
			<div
				class="bg-white border-b border-gray-200 p-4 flex justify-between items-center"
			>
				<h1 class="text-xl font-bold">Content Builder</h1>
				<div class="flex gap-2">
					<button
						@click="showPreview = !showPreview"
						class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1"
					>
						<Eye v-if="!showPreview" class="h-4 w-4" />
						<EyeOff v-else class="h-4 w-4" />
						{{ showPreview ? 'Exit Preview' : 'Preview' }}
					</button>
					<button
						@click="exportContent"
						class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-1"
					>
						<Download class="h-4 w-4" />
						Export
					</button>
				</div>
			</div>

			<!-- Article Info -->
			<div
				v-if="selectedTemplate && !showPreview"
				class="bg-white border-b border-gray-200 p-4"
			>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">
							Banner Image URL
						</label>
						<input
							v-model="fixedFields.bannerImage"
							type="text"
							class="w-full p-2 border rounded-md"
							placeholder="Enter banner image URL"
						/>
					</div>
				</div>
			</div>

			<!-- Main Content Area -->
			<div class="flex-1 flex overflow-hidden">
				<!-- Canvas -->
				<div class="flex-1 overflow-auto bg-gray-100 p-6">
					<div
						class="bg-white rounded-lg shadow mx-auto"
						style="max-width: 1000px"
					>
						<!-- Template Header -->
						<div v-if="selectedTemplate">
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
						</div>

						<!-- Content Canvas -->
						<div
							class="relative min-h-[600px] p-6"
							@dragover.prevent
							@drop="onDrop($event)"
							ref="contentGrid"
							:class="{ 'pointer-events-none': showPreview }"
						>
							<p
								v-if="content.length === 0 && !showPreview"
								class="text-gray-400 text-center py-12"
							>
								Drag and drop components here to build your content
							</p>

							<div
								v-for="(item, index) in content"
								:key="index"
								class="absolute group"
								:class="{
									'border border-dashed border-gray-300 hover:border-gray-400':
										!showPreview,
									'border-primary border-2':
										selectedItemIndex === index && !showPreview,
								}"
								:style="{
									left: `${item.position.x}px`,
									top: `${item.position.y}px`,
									width: `${item.size.width}px`,
									height: `${item.size.height}px`,
									zIndex: item.zIndex,
								}"
								@mousedown="!showPreview && selectItem(index, $event)"
							>
								<!-- Component Controls (only visible when not in preview) -->
								<div
									v-if="!showPreview"
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

								<!-- Resize Handle (only visible when selected and not in preview) -->
								<div
									v-if="selectedItemIndex === index && !showPreview"
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
									contenteditable="!showPreview"
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
									contenteditable="!showPreview"
									@blur="updateContent($event, index)"
								>
									{{ item.content || 'Enter subtitle here' }}
								</h3>

								<!-- Text Component -->
								<div
									v-else-if="item.type === 'text'"
									class="outline-none w-full h-full overflow-auto"
									contenteditable="!showPreview"
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
										:src="
											item.content || '/placeholder.svg?height=300&width=600'
										"
										class="w-full h-full object-cover rounded-md"
										:alt="item.alt || 'Content image'"
									/>
								</div>

								<!-- List Component -->
								<ul
									v-else-if="item.type === 'bullet-list'"
									class="list-disc pl-5 w-full h-full overflow-auto"
									contenteditable="!showPreview"
									@blur="updateContent($event, index)"
								>
									<li v-if="!item.content">Item 1</li>
									<li v-if="!item.content">Item 2</li>
									<li v-if="!item.content">Item 3</li>
									<div v-else v-html="item.content"></div>
								</ul>

								<!-- Numbered List Component -->
								<ol
									v-else-if="item.type === 'numbered-list'"
									class="list-decimal pl-5 w-full h-full overflow-auto"
									contenteditable="!showPreview"
									@blur="updateContent($event, index)"
								>
									<li v-if="!item.content">Item 1</li>
									<li v-if="!item.content">Item 2</li>
									<li v-if="!item.content">Item 3</li>
									<div v-else v-html="item.content"></div>
								</ol>

								<!-- Quote Component -->
								<blockquote
									v-else-if="item.type === 'quote'"
									class="border-l-4 border-gray-300 pl-4 italic w-full h-full flex items-center"
									contenteditable="!showPreview"
									@blur="updateContent($event, index)"
								>
									{{ item.content || 'Enter quote here' }}
								</blockquote>

								<!-- Reference Component -->
								<div
									v-else-if="item.type === 'reference'"
									class="bg-gray-50 p-3 rounded-md border border-gray-200 text-sm w-full h-full overflow-auto"
								>
									<p class="font-medium">
										{{ item.referenceTitle || 'Reference Title' }}
									</p>
									<p>{{ item.referenceText || 'Reference details' }}</p>
									<a
										v-if="item.referenceUrl"
										:href="item.referenceUrl"
										target="_blank"
										class="text-primary hover:underline"
									>
										{{ item.referenceUrl }}
									</a>
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
										contenteditable="!showPreview"
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

				<!-- Properties Panel (Right Sidebar) -->
				<div
					v-if="selectedItemIndex !== null && !showPreview"
					class="w-72 bg-white border-l border-gray-200 overflow-auto p-4"
				>
					<h2 class="text-lg font-medium mb-4">Properties</h2>

					<div class="space-y-4">
						<!-- Common Properties -->
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">
								Position
							</label>
							<div class="grid grid-cols-2 gap-2">
								<div>
									<label class="block text-xs text-gray-500">X</label>
									<input
										type="number"
										v-model.number="content[selectedItemIndex].position.x"
										class="w-full p-1 border rounded-md text-sm"
									/>
								</div>
								<div>
									<label class="block text-xs text-gray-500">Y</label>
									<input
										type="number"
										v-model.number="content[selectedItemIndex].position.y"
										class="w-full p-1 border rounded-md text-sm"
									/>
								</div>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">
								Size
							</label>
							<div class="grid grid-cols-2 gap-2">
								<div>
									<label class="block text-xs text-gray-500">Width</label>
									<input
										type="number"
										v-model.number="content[selectedItemIndex].size.width"
										class="w-full p-1 border rounded-md text-sm"
									/>
								</div>
								<div>
									<label class="block text-xs text-gray-500">Height</label>
									<input
										type="number"
										v-model.number="content[selectedItemIndex].size.height"
										class="w-full p-1 border rounded-md text-sm"
									/>
								</div>
							</div>
						</div>

						<!-- Image Properties -->
						<template v-if="content[selectedItemIndex].type === 'image'">
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">
									Image URL
								</label>
								<input
									type="text"
									v-model="content[selectedItemIndex].content"
									class="w-full p-2 border rounded-md text-sm"
									placeholder="Enter image URL"
								/>
							</div>

							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">
									Alt Text
								</label>
								<input
									type="text"
									v-model="content[selectedItemIndex].alt"
									class="w-full p-2 border rounded-md text-sm"
									placeholder="Describe the image"
								/>
							</div>
						</template>

						<!-- Text Content -->
						<template
							v-if="
								['title', 'subtitle', 'text', 'quote'].includes(
									content[selectedItemIndex].type
								)
							"
						>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">
									Content
								</label>
								<textarea
									v-model="content[selectedItemIndex].content"
									class="w-full p-2 border rounded-md text-sm h-24"
									placeholder="Enter content"
								></textarea>
							</div>
						</template>

						<!-- Reference Properties -->
						<template v-if="content[selectedItemIndex].type === 'reference'">
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">
									Reference Title
								</label>
								<input
									type="text"
									v-model="content[selectedItemIndex].referenceTitle"
									class="w-full p-2 border rounded-md text-sm"
									placeholder="Enter reference title"
								/>
							</div>

							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">
									Reference Text
								</label>
								<textarea
									v-model="content[selectedItemIndex].referenceText"
									class="w-full p-2 border rounded-md text-sm h-24"
									placeholder="Enter reference details"
								></textarea>
							</div>

							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">
									URL
								</label>
								<input
									type="text"
									v-model="content[selectedItemIndex].referenceUrl"
									class="w-full p-2 border rounded-md text-sm"
									placeholder="Enter reference URL"
								/>
							</div>
						</template>

						<!-- Columns Properties -->
						<template v-if="content[selectedItemIndex].type === 'columns'">
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">
									Number of Columns
								</label>
								<select
									v-model.number="content[selectedItemIndex].columns"
									class="w-full p-2 border rounded-md text-sm"
									@change="updateColumnsCount"
								>
									<option value="2">2 Columns</option>
									<option value="3">3 Columns</option>
									<option value="4">4 Columns</option>
								</select>
							</div>
						</template>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
	import {
		Type,
		Heading1,
		Heading2,
		AlignLeft,
		Image as ImageIcon,
		SeparatorHorizontal,
		Trash2,
		ArrowUpToLine,
		Eye,
		EyeOff,
		Download,
		List,
		ListOrdered,
		Quote,
		BookOpen,
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
		type:
			| 'title'
			| 'subtitle'
			| 'text'
			| 'divider'
			| 'image'
			| 'columns'
			| 'bullet-list'
			| 'numbered-list'
			| 'quote'
			| 'reference';
		content?: string;
		position: Position;
		size: Size;
		zIndex: number;
		columns?: number;
		columnContent?: string[];
		alt?: string;
		referenceTitle?: string;
		referenceText?: string;
		referenceUrl?: string;
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
		{ type: 'bullet-list', label: 'Bullet List' },
		{ type: 'numbered-list', label: 'Numbered List' },
		{ type: 'quote', label: 'Quote' },
		{ type: 'reference', label: 'Reference' },
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
			case 'bullet-list':
				return List;
			case 'numbered-list':
				return ListOrdered;
			case 'quote':
				return Quote;
			case 'reference':
				return BookOpen;
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
			} else if (
				componentType === 'bullet-list' ||
				componentType === 'numbered-list'
			) {
				width = 300;
				height = 150;
			} else if (componentType === 'quote') {
				width = 350;
				height = 100;
			} else if (componentType === 'reference') {
				width = 300;
				height = 120;
			}

			const newItem: ContentItem = {
				type: componentType,
				content: '',
				position: { x, y },
				size: { width, height },
				zIndex: zIndexCounter.value++,
			};

			// Add specific properties based on component type
			if (componentType === 'columns') {
				newItem.columns = 2;
				newItem.columnContent = ['', ''];
			} else if (componentType === 'image') {
				newItem.alt = '';
			} else if (componentType === 'reference') {
				newItem.referenceTitle = '';
				newItem.referenceText = '';
				newItem.referenceUrl = '';
			}

			content.value.push(newItem);

			// Select the newly added item
			selectedItemIndex.value = content.value.length - 1;
		}
	};

	const updateContent = (event: Event, index: number) => {
		const target = event.target as HTMLElement;
		content.value[index].content = target.innerHTML;
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
		content.value[index].columnContent![columnIndex] = target.innerHTML;
	};

	const updateColumnsCount = () => {
		if (selectedItemIndex.value === null) return;

		const item = content.value[selectedItemIndex.value];
		if (item.type !== 'columns' || !item.columns) return;

		// Ensure we have the right number of column content entries
		if (!item.columnContent) {
			item.columnContent = [];
		}

		// Add empty columns if needed
		while (item.columnContent.length < item.columns) {
			item.columnContent.push('');
		}

		// Remove extra columns if needed
		if (item.columnContent.length > item.columns) {
			item.columnContent = item.columnContent.slice(0, item.columns);
		}
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

	// Clear selection when entering preview mode
	watch(showPreview, (newValue) => {
		if (newValue) {
			selectedItemIndex.value = null;
		}
	});

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
