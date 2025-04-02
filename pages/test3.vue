<template>
	<div class="min-h-screen bg-gray-50 flex">
		<!-- Left Sidebar - Component Palette -->
		<div
			class="w-72 bg-white border-r border-gray-200 h-screen overflow-auto shadow-sm flex flex-col"
		>
			<div class="p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
				<h1 class="text-xl font-bold text-gray-800 flex items-center">
					<Palette class="h-5 w-5 mr-2 text-primary" />
					Content Builder
				</h1>
			</div>

			<div class="p-4 overflow-auto flex-1">
				<h2
					class="text-sm font-medium uppercase tracking-wider text-gray-500 mb-3"
				>
					Components
				</h2>
				<div class="grid grid-cols-2 gap-3 mb-6">
					<div
						v-for="component in availableComponents"
						:key="component.type"
						class="bg-white p-3 rounded-md cursor-move hover:bg-gray-50 transition-all duration-200 flex flex-col items-center justify-center border border-gray-200 shadow-sm hover:shadow hover:border-primary/30 group"
						draggable="true"
						@dragstart="onDragStart($event, component)"
					>
						<component
							:is="getIcon(component.type)"
							class="h-5 w-5 mb-1 text-gray-500 group-hover:text-primary transition-colors duration-200"
						/>
						<span
							class="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200"
						>
							{{ component.label }}
						</span>
					</div>
				</div>

				<h2
					class="text-sm font-medium uppercase tracking-wider text-gray-500 mb-3 mt-6"
				>
					Templates
				</h2>
				<div class="space-y-3">
					<div
						v-for="template in templates"
						:key="template.id"
						class="border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-all duration-200 hover:shadow-md"
						:class="{
							'border-primary ring-2 ring-primary/20 shadow-md':
								selectedTemplate === template.id,
						}"
						@click="selectTemplate(template.id)"
					>
						<div class="aspect-video bg-gray-100 overflow-hidden">
							<img
								:src="template.thumbnail"
								alt="Template preview"
								class="w-full h-full object-cover"
							/>
						</div>
						<p class="font-medium text-center text-sm py-2 bg-white">
							{{ template.name }}
						</p>
					</div>
				</div>
			</div>

			<div class="p-4 border-t border-gray-100 bg-white">
				<button
					@click="exportContent"
					class="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center gap-1 shadow-sm"
				>
					<Download class="h-4 w-4" />
					Export Content
				</button>
			</div>
		</div>

		<!-- Main Content Area -->
		<div class="flex-1 flex flex-col h-screen overflow-hidden">
			<!-- Top Toolbar -->
			<div
				class="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-10 shadow-sm"
			>
				<div class="flex items-center">
					<button
						@click="showPreview = !showPreview"
						class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-all duration-200 flex items-center gap-1 shadow-sm"
					>
						<Eye v-if="!showPreview" class="h-4 w-4" />
						<EyeOff v-else class="h-4 w-4" />
						{{ showPreview ? 'Exit Preview' : 'Preview' }}
					</button>
				</div>

				<div v-if="selectedTemplate && !showPreview" class="flex-1 mx-8">
					<div class="flex gap-4">
						<div class="flex-1">
							<input
								v-model="fixedFields.title"
								type="text"
								class="w-full p-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
								placeholder="Article Title"
							/>
						</div>
						<div class="w-48">
							<input
								v-model="fixedFields.author"
								type="text"
								class="w-full p-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
								placeholder="Author"
							/>
						</div>
					</div>
				</div>

				<div class="flex items-center gap-2">
					<button
						@click="zoomLevel = Math.max(0.5, zoomLevel - 0.1)"
						class="p-2 rounded-md hover:bg-gray-100 transition-colors"
						:disabled="zoomLevel <= 0.5"
						:class="{ 'opacity-50 cursor-not-allowed': zoomLevel <= 0.5 }"
					>
						<ZoomOut class="h-5 w-5" />
					</button>
					<span class="text-sm font-medium w-16 text-center">
						{{ Math.round(zoomLevel * 100) }}%
					</span>
					<button
						@click="zoomLevel = Math.min(2, zoomLevel + 0.1)"
						class="p-2 rounded-md hover:bg-gray-100 transition-colors"
						:disabled="zoomLevel >= 2"
						:class="{ 'opacity-50 cursor-not-allowed': zoomLevel >= 2 }"
					>
						<ZoomIn class="h-5 w-5" />
					</button>
				</div>
			</div>

			<!-- Banner Image Input -->
			<div
				v-if="selectedTemplate && !showPreview"
				class="bg-white border-b border-gray-200 p-4 flex items-center gap-4"
			>
				<label class="text-sm font-medium text-gray-700 w-32">
					Banner Image:
				</label>
				<div class="flex-1 flex gap-2">
					<input
						v-model="fixedFields.bannerImage"
						type="text"
						class="flex-1 p-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
						placeholder="Enter banner image URL"
					/>
					<button
						v-if="fixedFields.bannerImage"
						@click="previewBannerImage = !previewBannerImage"
						class="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-sm flex items-center gap-1"
					>
						<Eye class="h-4 w-4" />
						Preview
					</button>
				</div>
			</div>

			<!-- Banner Image Preview Modal -->
			<div
				v-if="previewBannerImage && fixedFields.bannerImage"
				class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
				@click="previewBannerImage = false"
			>
				<div class="bg-white rounded-lg max-w-4xl w-full p-4" @click.stop>
					<div class="flex justify-between items-center mb-4">
						<h2 class="text-xl font-bold">Banner Preview</h2>
						<button
							@click="previewBannerImage = false"
							class="text-gray-500 hover:text-gray-700"
						>
							<X class="h-5 w-5" />
						</button>
					</div>
					<img
						:src="fixedFields.bannerImage"
						alt="Banner preview"
						class="w-full h-auto max-h-[70vh] object-contain rounded-md"
					/>
				</div>
			</div>

			<!-- Main Content Area -->
			<div class="flex-1 flex overflow-hidden">
				<!-- Canvas -->
				<div class="flex-1 overflow-auto bg-gray-100 p-6">
					<div
						class="bg-white rounded-lg shadow-lg mx-auto transition-all duration-200 transform"
						:style="{
							transform: `scale(${zoomLevel})`,
							transformOrigin: 'top center',
						}"
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
							class="relative min-h-[1500px] p-6"
							@dragover.prevent
							@drop="onDrop($event)"
							ref="contentGrid"
							:class="{ 'pointer-events-none': showPreview }"
						>
							<!-- Grid Lines (only visible when not in preview) -->
							<div
								v-if="!showPreview"
								class="absolute inset-0 grid grid-cols-12 gap-4 pointer-events-none opacity-10"
							>
								<div v-for="i in 12" :key="i" class="h-full bg-gray-400"></div>
							</div>

							<p
								v-if="content.length === 0 && !showPreview"
								class="text-gray-400 text-center py-12 relative z-10"
							>
								<ArrowDownCircle class="h-8 w-8 mx-auto mb-2 animate-bounce" />
								Drag and drop components here to build your content
							</p>

							<div
								v-for="(item, index) in content"
								:key="index"
								class="absolute group transition-all duration-200"
								:class="{
									'border border-dashed border-gray-300 hover:border-gray-400 bg-white/50 backdrop-blur-sm':
										!showPreview,
									'border-primary border-2 ring-4 ring-primary/20':
										selectedItemIndex === index && !showPreview,
									'shadow-lg': !showPreview,
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
									class="absolute right-2 top-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-md rounded-md p-1 z-10"
								>
									<button
										@click.stop="bringToFront(index)"
										class="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-900 transition-colors"
										title="Bring to Front"
									>
										<ArrowUpToLine class="h-4 w-4" />
									</button>
									<button
										@click.stop="duplicateItem(index)"
										class="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-900 transition-colors"
										title="Duplicate"
									>
										<Copy class="h-4 w-4" />
									</button>
									<button
										@click.stop="removeItem(index)"
										class="p-1 hover:bg-gray-100 rounded text-red-500 hover:text-red-700 transition-colors"
										title="Delete"
									>
										<Trash2 class="h-4 w-4" />
									</button>
								</div>

								<!-- Resize Handle (only visible when selected and not in preview) -->
								<div
									v-if="selectedItemIndex === index && !showPreview"
									class="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-tl-md cursor-se-resize flex items-center justify-center"
									@mousedown.stop="startResize(index, $event)"
								>
									<Maximize2 class="h-3 w-3 text-white" />
								</div>

								<!-- Title Component -->
								<h2
									v-if="item.type === 'title'"
									class="font-bold outline-none w-full h-full flex items-center p-2"
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
									class="font-medium outline-none w-full h-full flex items-center p-2"
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
									class="outline-none w-full h-full overflow-auto p-2"
									contenteditable="!showPreview"
									@blur="updateContent($event, index)"
								>
									{{ item.content || 'Enter text here' }}
								</div>

								<!-- Divider Component -->
								<hr
									v-else-if="item.type === 'divider'"
									class="w-full absolute top-1/2 transform -translate-y-1/2 border-gray-300"
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
									<div
										v-if="!showPreview && selectedItemIndex === index"
										class="absolute bottom-0 left-0 right-0 p-2 bg-black/70 text-white text-xs"
									>
										{{ item.alt || 'No alt text' }}
									</div>
								</div>

								<!-- List Component -->
								<ul
									v-else-if="item.type === 'bullet-list'"
									class="list-disc pl-5 w-full h-full overflow-auto p-2"
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
									class="list-decimal pl-5 w-full h-full overflow-auto p-2"
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
									class="border-l-4 border-gray-300 pl-4 italic w-full h-full flex items-center p-2"
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
					class="w-80 bg-white border-l border-gray-200 overflow-auto shadow-sm"
				>
					<div class="p-4 border-b border-gray-100 sticky top-0 z-10 bg-white">
						<h2 class="text-lg font-medium flex items-center">
							<Settings class="h-5 w-5 mr-2 text-primary" />
							Properties
						</h2>
					</div>

					<div class="p-4 space-y-5">
						<!-- Component Type -->
						<div
							class="bg-gray-50 p-3 rounded-md border border-gray-200 flex items-center"
						>
							<component
								:is="getIcon(content[selectedItemIndex].type)"
								class="h-5 w-5 mr-2 text-primary"
							/>
							<span class="font-medium">
								{{ getComponentLabel(content[selectedItemIndex].type) }}
							</span>
						</div>

						<!-- Common Properties -->
						<div class="space-y-4">
							<div class="bg-white rounded-md border border-gray-200 p-3">
								<h3
									class="text-sm font-medium text-gray-700 mb-3 flex items-center"
								>
									<Move class="h-4 w-4 mr-1 text-gray-500" />
									Position
								</h3>
								<div class="grid grid-cols-2 gap-3">
									<div>
										<label class="block text-xs text-gray-500 mb-1">
											X Position
										</label>
										<div class="flex">
											<button
												@click="adjustPosition(-10, 0)"
												class="px-2 py-1 bg-gray-100 border border-gray-300 rounded-l-md hover:bg-gray-200"
											>
												-
											</button>
											<input
												type="number"
												v-model.number="content[selectedItemIndex].position.x"
												class="w-full p-1 border-y border-gray-300 text-sm text-center"
											/>
											<button
												@click="adjustPosition(10, 0)"
												class="px-2 py-1 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200"
											>
												+
											</button>
										</div>
									</div>
									<div>
										<label class="block text-xs text-gray-500 mb-1">
											Y Position
										</label>
										<div class="flex">
											<button
												@click="adjustPosition(0, -10)"
												class="px-2 py-1 bg-gray-100 border border-gray-300 rounded-l-md hover:bg-gray-200"
											>
												-
											</button>
											<input
												type="number"
												v-model.number="content[selectedItemIndex].position.y"
												class="w-full p-1 border-y border-gray-300 text-sm text-center"
											/>
											<button
												@click="adjustPosition(0, 10)"
												class="px-2 py-1 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200"
											>
												+
											</button>
										</div>
									</div>
								</div>
							</div>

							<div class="bg-white rounded-md border border-gray-200 p-3">
								<h3
									class="text-sm font-medium text-gray-700 mb-3 flex items-center"
								>
									<Maximize class="h-4 w-4 mr-1 text-gray-500" />
									Size
								</h3>
								<div class="grid grid-cols-2 gap-3">
									<div>
										<label class="block text-xs text-gray-500 mb-1">
											Width
										</label>
										<div class="flex">
											<button
												@click="adjustSize(-10, 0)"
												class="px-2 py-1 bg-gray-100 border border-gray-300 rounded-l-md hover:bg-gray-200"
											>
												-
											</button>
											<input
												type="number"
												v-model.number="content[selectedItemIndex].size.width"
												class="w-full p-1 border-y border-gray-300 text-sm text-center"
											/>
											<button
												@click="adjustSize(10, 0)"
												class="px-2 py-1 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200"
											>
												+
											</button>
										</div>
									</div>
									<div>
										<label class="block text-xs text-gray-500 mb-1">
											Height
										</label>
										<div class="flex">
											<button
												@click="adjustSize(0, -10)"
												class="px-2 py-1 bg-gray-100 border border-gray-300 rounded-l-md hover:bg-gray-200"
											>
												-
											</button>
											<input
												type="number"
												v-model.number="content[selectedItemIndex].size.height"
												class="w-full p-1 border-y border-gray-300 text-sm text-center"
											/>
											<button
												@click="adjustSize(0, 10)"
												class="px-2 py-1 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200"
											>
												+
											</button>
										</div>
									</div>
								</div>

								<!-- Quick Size Presets -->
								<div class="mt-3 flex flex-wrap gap-2">
									<button
										@click="applyPresetSize('small')"
										class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
									>
										Small
									</button>
									<button
										@click="applyPresetSize('medium')"
										class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
									>
										Medium
									</button>
									<button
										@click="applyPresetSize('large')"
										class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
									>
										Large
									</button>
									<button
										@click="applyPresetSize('full-width')"
										class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
									>
										Full Width
									</button>
								</div>
							</div>
						</div>

						<!-- Image Properties -->
						<template v-if="content[selectedItemIndex].type === 'image'">
							<div class="bg-white rounded-md border border-gray-200 p-3">
								<h3
									class="text-sm font-medium text-gray-700 mb-3 flex items-center"
								>
									<ImageIcon class="h-4 w-4 mr-1 text-gray-500" />
									Image Properties
								</h3>

								<div class="space-y-3">
									<div>
										<label class="block text-xs text-gray-500 mb-1">
											Image URL
										</label>
										<input
											type="text"
											v-model="content[selectedItemIndex].content"
											class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
											placeholder="Enter image URL"
										/>
									</div>

									<div>
										<label class="block text-xs text-gray-500 mb-1">
											Alt Text
										</label>
										<input
											type="text"
											v-model="content[selectedItemIndex].alt"
											class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
											placeholder="Describe the image"
										/>
									</div>

									<div class="flex gap-2">
										<button
											@click="applyImageStyle('contain')"
											class="flex-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
											:class="{
												'bg-primary/10 border-primary':
													content[selectedItemIndex].objectFit === 'contain',
											}"
										>
											Contain
										</button>
										<button
											@click="applyImageStyle('cover')"
											class="flex-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
											:class="{
												'bg-primary/10 border-primary':
													content[selectedItemIndex].objectFit === 'cover',
											}"
										>
											Cover
										</button>
										<button
											@click="applyImageStyle('fill')"
											class="flex-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
											:class="{
												'bg-primary/10 border-primary':
													content[selectedItemIndex].objectFit === 'fill',
											}"
										>
											Fill
										</button>
									</div>
								</div>
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
							<div class="bg-white rounded-md border border-gray-200 p-3">
								<h3
									class="text-sm font-medium text-gray-700 mb-3 flex items-center"
								>
									<Type class="h-4 w-4 mr-1 text-gray-500" />
									Text Content
								</h3>

								<div>
									<textarea
										v-model="content[selectedItemIndex].content"
										class="w-full p-2 border rounded-md text-sm h-24 focus:ring-2 focus:ring-primary/20 focus:border-primary"
										placeholder="Enter content"
									></textarea>
								</div>

								<div
									v-if="
										content[selectedItemIndex].type === 'title' ||
										content[selectedItemIndex].type === 'subtitle'
									"
									class="mt-3"
								>
									<label class="block text-xs text-gray-500 mb-1">
										Text Style
									</label>
									<div class="flex gap-2">
										<button
											@click="applyTextStyle('left')"
											class="flex-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
											:class="{
												'bg-primary/10 border-primary':
													content[selectedItemIndex].textAlign === 'left',
											}"
										>
											Left
										</button>
										<button
											@click="applyTextStyle('center')"
											class="flex-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
											:class="{
												'bg-primary/10 border-primary':
													content[selectedItemIndex].textAlign === 'center',
											}"
										>
											Center
										</button>
										<button
											@click="applyTextStyle('right')"
											class="flex-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
											:class="{
												'bg-primary/10 border-primary':
													content[selectedItemIndex].textAlign === 'right',
											}"
										>
											Right
										</button>
									</div>
								</div>
							</div>
						</template>

						<!-- Reference Properties -->
						<template v-if="content[selectedItemIndex].type === 'reference'">
							<div class="bg-white rounded-md border border-gray-200 p-3">
								<h3
									class="text-sm font-medium text-gray-700 mb-3 flex items-center"
								>
									<BookOpen class="h-4 w-4 mr-1 text-gray-500" />
									Reference Properties
								</h3>

								<div class="space-y-3">
									<div>
										<label class="block text-xs text-gray-500 mb-1">
											Reference Title
										</label>
										<input
											type="text"
											v-model="content[selectedItemIndex].referenceTitle"
											class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
											placeholder="Enter reference title"
										/>
									</div>

									<div>
										<label class="block text-xs text-gray-500 mb-1">
											Reference Text
										</label>
										<textarea
											v-model="content[selectedItemIndex].referenceText"
											class="w-full p-2 border rounded-md text-sm h-24 focus:ring-2 focus:ring-primary/20 focus:border-primary"
											placeholder="Enter reference details"
										></textarea>
									</div>

									<div>
										<label class="block text-xs text-gray-500 mb-1">URL</label>
										<input
											type="text"
											v-model="content[selectedItemIndex].referenceUrl"
											class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
											placeholder="Enter reference URL"
										/>
									</div>
								</div>
							</div>
						</template>

						<!-- Columns Properties -->
						<template v-if="content[selectedItemIndex].type === 'columns'">
							<div class="bg-white rounded-md border border-gray-200 p-3">
								<h3
									class="text-sm font-medium text-gray-700 mb-3 flex items-center"
								>
									<Columns class="h-4 w-4 mr-1 text-gray-500" />
									Columns Properties
								</h3>

								<div>
									<label class="block text-xs text-gray-500 mb-1">
										Number of Columns
									</label>
									<select
										v-model.number="content[selectedItemIndex].columns"
										class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
										@change="updateColumnsCount"
									>
										<option value="2">2 Columns</option>
										<option value="3">3 Columns</option>
										<option value="4">4 Columns</option>
									</select>
								</div>

								<div class="mt-3">
									<label class="block text-xs text-gray-500 mb-1">
										Gap Between Columns
									</label>
									<input
										type="range"
										v-model.number="content[selectedItemIndex].columnGap"
										min="0"
										max="40"
										step="4"
										class="w-full"
									/>
									<div class="flex justify-between text-xs text-gray-500">
										<span>None</span>
										<span>Medium</span>
										<span>Large</span>
									</div>
								</div>
							</div>
						</template>

						<!-- Advanced Properties -->
						<div class="bg-white rounded-md border border-gray-200 p-3">
							<h3
								class="text-sm font-medium text-gray-700 mb-3 flex items-center"
							>
								<Settings2 class="h-4 w-4 mr-1 text-gray-500" />
								Advanced
							</h3>

							<div>
								<label class="block text-xs text-gray-500 mb-1">
									Z-Index (Layer Order)
								</label>
								<input
									type="number"
									v-model.number="content[selectedItemIndex].zIndex"
									class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
								/>
								<div class="flex justify-between mt-2">
									<button
										@click="sendToBack()"
										class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
									>
										Send to Back
									</button>
									<button
										@click="bringToFront(selectedItemIndex)"
										class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
									>
										Bring to Front
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Preview Modal -->
	<div
		v-if="showPreview"
		class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
	>
		<div
			class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
		>
			<!-- Banner Template Preview -->
			<div v-if="selectedTemplate === 'banner'" class="relative">
				<img
					:src="
						fixedFields.bannerImage || '/placeholder.svg?height=400&width=1200'
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
						fixedFields.bannerImage || '/placeholder.svg?height=400&width=1200'
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

			<div class="p-6 relative min-h-[600px]">
				<div class="flex justify-between items-center mb-6">
					<h2 class="text-xl font-bold">Preview</h2>
					<button
						@click="showPreview = false"
						class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1"
					>
						<EyeOff class="h-4 w-4" />
						Exit Preview
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
								textAlign: item.textAlign || 'left',
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
								textAlign: item.textAlign || 'left',
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
							class="absolute rounded-md"
							:style="{
								left: `${item.position.x}px`,
								top: `${item.position.y}px`,
								width: `${item.size.width}px`,
								height: `${item.size.height}px`,
								objectFit: item.objectFit || 'cover',
							}"
							:alt="item.alt || 'Content image'"
						/>

						<!-- List Preview -->
						<ul
							v-else-if="item.type === 'bullet-list'"
							class="absolute list-disc pl-5"
							:style="{
								left: `${item.position.x}px`,
								top: `${item.position.y}px`,
								width: `${item.size.width}px`,
								height: `${item.size.height}px`,
							}"
							v-html="
								item.content || '<li>Item 1</li><li>Item 2</li><li>Item 3</li>'
							"
						></ul>

						<!-- Numbered List Preview -->
						<ol
							v-else-if="item.type === 'numbered-list'"
							class="absolute list-decimal pl-5"
							:style="{
								left: `${item.position.x}px`,
								top: `${item.position.y}px`,
								width: `${item.size.width}px`,
								height: `${item.size.height}px`,
							}"
							v-html="
								item.content || '<li>Item 1</li><li>Item 2</li><li>Item 3</li>'
							"
						></ol>

						<!-- Quote Preview -->
						<blockquote
							v-else-if="item.type === 'quote'"
							class="absolute border-l-4 border-gray-300 pl-4 italic"
							:style="{
								left: `${item.position.x}px`,
								top: `${item.position.y}px`,
								width: `${item.size.width}px`,
								height: `${item.size.height}px`,
							}"
						>
							{{ item.content || 'Enter quote here' }}
						</blockquote>

						<!-- Reference Preview -->
						<div
							v-else-if="item.type === 'reference'"
							class="absolute bg-gray-50 p-3 rounded-md border border-gray-200 text-sm"
							:style="{
								left: `${item.position.x}px`,
								top: `${item.position.y}px`,
								width: `${item.size.width}px`,
								height: `${item.size.height}px`,
							}"
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
								gap: `${item.columnGap || 16}px`,
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
		Settings,
		Settings2,
		Move,
		Maximize,
		Maximize2,
		X,
		Copy,
		ZoomIn,
		ZoomOut,
		Palette,
		ArrowDownCircle,
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
		objectFit?: 'contain' | 'cover' | 'fill';
		textAlign?: 'left' | 'center' | 'right';
		columnGap?: number;
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
	const zoomLevel = ref(1);
	const previewBannerImage = ref(false);

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

	const getComponentLabel = (type: string) => {
		const component = availableComponents.find((c) => c.type === type);
		return component
			? component.label
			: type.charAt(0).toUpperCase() + type.slice(1);
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
			const x = (event.clientX - gridRect.left) / zoomLevel.value;
			const y = (event.clientY - gridRect.top) / zoomLevel.value;

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
				newItem.columnGap = 16;
			} else if (componentType === 'image') {
				newItem.alt = '';
				newItem.objectFit = 'cover';
			} else if (componentType === 'reference') {
				newItem.referenceTitle = '';
				newItem.referenceText = '';
				newItem.referenceUrl = '';
			} else if (componentType === 'title' || componentType === 'subtitle') {
				newItem.textAlign = 'left';
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

	const duplicateItem = (index: number) => {
		const item = content.value[index];
		const newItem = JSON.parse(JSON.stringify(item)) as ContentItem;

		// Offset the position slightly
		newItem.position = {
			x: item.position.x + 20,
			y: item.position.y + 20,
		};

		// Assign a new z-index
		newItem.zIndex = zIndexCounter.value++;

		content.value.push(newItem);

		// Select the newly duplicated item
		selectedItemIndex.value = content.value.length - 1;
	};

	const bringToFront = (index: number) => {
		content.value[index].zIndex = zIndexCounter.value++;
	};

	const sendToBack = () => {
		if (selectedItemIndex.value === null) return;

		// Find the lowest z-index
		const lowestZIndex = Math.min(...content.value.map((item) => item.zIndex));

		// Set the selected item's z-index to one lower
		content.value[selectedItemIndex.value].zIndex = lowestZIndex - 1;
	};

	const selectItem = (index: number, event: MouseEvent) => {
		selectedItemIndex.value = index;

		// Start dragging
		if (contentGrid.value && !isResizing.value) {
			const item = content.value[index];
			const gridRect = contentGrid.value.getBoundingClientRect();

			// Calculate offset from the mouse position to the top-left corner of the element
			dragOffset.value = {
				x: (event.clientX - gridRect.left) / zoomLevel.value - item.position.x,
				y: (event.clientY - gridRect.top) / zoomLevel.value - item.position.y,
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
						gridRect.width / zoomLevel.value - content.value[index].size.width,
						(event.clientX - gridRect.left) / zoomLevel.value -
							dragOffset.value.x
					)
				),
				y: Math.max(
					0,
					Math.min(
						gridRect.height / zoomLevel.value -
							content.value[index].size.height,
						(event.clientY - gridRect.top) / zoomLevel.value -
							dragOffset.value.y
					)
				),
			};
		} else if (isResizing.value) {
			// Update size while resizing
			const newWidth = Math.max(
				50,
				(event.clientX - gridRect.left) / zoomLevel.value -
					content.value[index].position.x
			);
			const newHeight = Math.max(
				30,
				(event.clientY - gridRect.top) / zoomLevel.value -
					content.value[index].position.y
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

	// Adjust position with buttons
	const adjustPosition = (deltaX: number, deltaY: number) => {
		if (selectedItemIndex.value === null) return;

		const item = content.value[selectedItemIndex.value];
		item.position.x = Math.max(0, item.position.x + deltaX);
		item.position.y = Math.max(0, item.position.y + deltaY);
	};

	// Adjust size with buttons
	const adjustSize = (deltaWidth: number, deltaHeight: number) => {
		if (selectedItemIndex.value === null) return;

		const item = content.value[selectedItemIndex.value];
		item.size.width = Math.max(50, item.size.width + deltaWidth);
		item.size.height = Math.max(30, item.size.height + deltaHeight);
	};

	// Apply preset sizes
	const applyPresetSize = (preset: string) => {
		if (selectedItemIndex.value === null) return;

		const item = content.value[selectedItemIndex.value];

		switch (preset) {
			case 'small':
				item.size.width = 200;
				item.size.height = 100;
				break;
			case 'medium':
				item.size.width = 350;
				item.size.height = 150;
				break;
			case 'large':
				item.size.width = 500;
				item.size.height = 250;
				break;
			case 'full-width':
				if (contentGrid.value) {
					item.size.width =
						contentGrid.value.clientWidth / zoomLevel.value - 40; // Account for padding
					item.size.height = item.size.height;
				}
				break;
		}
	};

	// Apply image style
	const applyImageStyle = (style: 'contain' | 'cover' | 'fill') => {
		if (selectedItemIndex.value === null) return;

		const item = content.value[selectedItemIndex.value];
		if (item.type === 'image') {
			item.objectFit = style;
		}
	};

	// Apply text alignment
	const applyTextStyle = (align: 'left' | 'center' | 'right') => {
		if (selectedItemIndex.value === null) return;

		const item = content.value[selectedItemIndex.value];
		if (item.type === 'title' || item.type === 'subtitle') {
			item.textAlign = align;
		}
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

	/* Smooth transitions */
	.transition-all {
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Animation for bounce */
	@keyframes bounce {
		0%,
		100% {
			transform: translateY(-25%);
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
		50% {
			transform: translateY(0);
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
	}

	.animate-bounce {
		animation: bounce 1s infinite;
	}
</style>
