<!-- eslint-disable vue/attributes-order -->
<template>
	<div class="flex gap-4">
		<!-- Panel de imágenes (lado izquierdo) -->
		<div
			v-if="showImagePanel"
			class="w-48 rounded-lg border border-gray-200 bg-white p-2"
		>
			<h3 class="mb-2 font-medium text-gray-700">Mis imágenes</h3>
			<div class="grid grid-cols-2 gap-2">
				<div
					v-for="image in sampleImages"
					:key="image.id"
					class="cursor-grab rounded border border-gray-200 p-1"
					draggable="true"
					@dragstart="handleDragStart($event, image.url)"
				>
					<img
						:src="image.url"
						:alt="image.name"
						class="h-16 w-full object-cover"
					/>
				</div>
			</div>
		</div>

		<!-- Editor (lado derecho) -->
		<div v-if="editor" class="flex-1">
			<div class="mb-4">
				<div
					class="flex flex-wrap gap-1 rounded-lg border border-gray-200 bg-gray-50 p-2"
				>
					<!-- Text Formatting -->
					<div class="flex gap-1 border-r border-gray-200 px-1">
						<UTooltip text="Negrita">
							<UButton
								:disabled="!editor.can().chain().focus().toggleBold().run()"
								:class="{
									'bg-gray-200 text-gray-900': editor.isActive('bold'),
								}"
								@click="editor.chain().focus().toggleBold().run()"
								size="sm"
								color="info"
								variant="ghost"
								icon="i-lucide-bold"
							/>
						</UTooltip>
						<UTooltip text="Cursiva">
							<UButton
								:disabled="!editor.can().chain().focus().toggleItalic().run()"
								:class="{
									'bg-gray-200 text-gray-900': editor.isActive('italic'),
								}"
								@click="editor.chain().focus().toggleItalic().run()"
								size="sm"
								color="info"
								variant="ghost"
								icon="i-lucide-italic"
							/>
						</UTooltip>
						<UTooltip text="Tachado">
							<UButton
								:disabled="!editor.can().chain().focus().toggleStrike().run()"
								:class="{
									'bg-gray-200 text-gray-900': editor.isActive('strike'),
								}"
								@click="editor.chain().focus().toggleStrike().run()"
								size="sm"
								color="info"
								variant="ghost"
							>
								<StrikethroughIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
						<UTooltip text="Subrayado">
							<UButton
								:disabled="
									!editor.can().chain().focus().toggleUnderline().run()
								"
								:class="{
									'bg-gray-200 text-gray-900': editor.isActive('underline'),
								}"
								@click="editor.chain().focus().toggleUnderline().run()"
								size="sm"
								color="info"
								variant="ghost"
							>
								<UnderlineIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
						<UTooltip text="Código">
							<UButton
								:disabled="!editor.can().chain().focus().toggleCode().run()"
								:class="{
									'bg-gray-200 text-gray-900': editor.isActive('code'),
								}"
								@click="editor.chain().focus().toggleCode().run()"
								size="sm"
								color="info"
								variant="ghost"
							>
								<CodeIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
					</div>

					<!-- Paragraph Styles -->
					<div class="flex gap-1 border-r border-gray-200 px-1">
						<UPopover>
							<UButton
								size="sm"
								color="info"
								variant="ghost"
								class="flex items-center gap-1"
							>
								<TypeIcon class="h-4 w-4" />
								<ChevronDownIcon class="h-3 w-3" />
							</UButton>
							<template #content>
								<div>
									<UButton
										v-for="item in headingItems"
										:key="item.label"
										block
										size="xs"
										color="info"
										variant="ghost"
										class="mb-1 justify-start"
										@click="
											() => {
												item.click();
											}
										"
									>
										<UIcon :name="item.icon" class="mr-2 h-4 w-4" />
										{{ item.label }}
									</UButton>
								</div>
							</template>
						</UPopover>
					</div>

					<!-- Lists -->
					<div class="flex gap-1 border-r border-gray-200 px-1">
						<UTooltip text="Lista con viñetas">
							<UButton
								:class="{
									'bg-gray-200 text-gray-900': editor.isActive('bulletList'),
								}"
								@click="editor.chain().focus().toggleBulletList().run()"
								size="sm"
								color="info"
								variant="ghost"
							>
								<ListIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
						<UTooltip text="Lista numerada">
							<UButton
								:class="{
									'bg-gray-200 text-gray-900': editor.isActive('orderedList'),
								}"
								@click="editor.chain().focus().toggleOrderedList().run()"
								size="sm"
								color="info"
								variant="ghost"
							>
								<ListOrderedIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
						<UTooltip text="Lista de tareas">
							<UButton
								:class="{
									'bg-gray-200 text-gray-900': editor.isActive('taskList'),
								}"
								@click="editor.chain().focus().toggleTaskList().run()"
								size="sm"
								color="info"
								variant="ghost"
							>
								<CheckSquareIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
					</div>

					<!-- Alignment -->
					<div class="flex gap-1 border-r border-gray-200 px-1">
						<UTooltip text="Alinear a la izquierda">
							<UButton
								:class="{
									'bg-gray-200 text-gray-900': editor.isActive({
										textAlign: 'left',
									}),
								}"
								@click="editor.chain().focus().setTextAlign('left').run()"
								size="sm"
								color="info"
								variant="ghost"
							>
								<AlignLeftIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
						<UTooltip text="Centrar">
							<UButton
								:class="{
									'bg-gray-200 text-gray-900': editor.isActive({
										textAlign: 'center',
									}),
								}"
								@click="editor.chain().focus().setTextAlign('center').run()"
								size="sm"
								color="info"
								variant="ghost"
							>
								<AlignCenterIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
						<UTooltip text="Alinear a la derecha">
							<UButton
								:class="{
									'bg-gray-200 text-gray-900': editor.isActive({
										textAlign: 'right',
									}),
								}"
								@click="editor.chain().focus().setTextAlign('right').run()"
								size="sm"
								color="info"
								variant="ghost"
							>
								<AlignRightIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
						<UTooltip text="Justificar">
							<UButton
								:class="{
									'bg-gray-200 text-gray-900': editor.isActive({
										textAlign: 'justify',
									}),
								}"
								@click="editor.chain().focus().setTextAlign('justify').run()"
								size="sm"
								color="info"
								variant="ghost"
							>
								<AlignJustifyIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
					</div>

					<!-- Links -->
					<div class="flex gap-1 border-r border-gray-200 px-1">
						<UTooltip text="Insertar enlace">
							<UButton
								:class="{
									'bg-gray-200 text-gray-900': editor.isActive('link'),
								}"
								@click="setLink"
								size="sm"
								color="info"
								variant="ghost"
							>
								<LinkIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
						<UTooltip text="Quitar enlace">
							<UButton
								:disabled="!editor.isActive('link')"
								@click="editor.chain().focus().unsetLink().run()"
								size="sm"
								color="info"
								variant="ghost"
							>
								<LinkOffIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
					</div>

					<!-- Media -->
					<div class="flex gap-1 border-r border-gray-200 px-1">
						<UTooltip text="Insertar imagen">
							<UButton @click="addImage" size="sm" color="info" variant="ghost">
								<ImageIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
						<UTooltip text="Insertar video de YouTube">
							<UButton
								@click="addYoutubeVideo"
								size="sm"
								color="info"
								variant="ghost"
							>
								<YoutubeIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
						<UTooltip text="Panel de imágenes">
							<UButton
								@click="toggleImagePanel"
								size="sm"
								color="info"
								:variant="showImagePanel ? 'solid' : 'ghost'"
							>
								<ImagePlusIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
					</div>

					<!-- Tables -->
					<div class="flex gap-1 border-r border-gray-200 px-1">
						<UPopover mode="hover">
							<UButton
								size="sm"
								color="info"
								variant="ghost"
								class="flex items-center gap-1"
							>
								<TableIcon class="h-4 w-4" />
								<ChevronDownIcon class="h-3 w-3" />
							</UButton>
							<template #content>
								<div class="p-1">
									<UButton
										v-for="item in tableItems"
										:key="item.label"
										block
										size="xs"
										color="info"
										variant="ghost"
										class="mb-1 justify-start"
										:disabled="
											item.label !== 'Insertar tabla' &&
											!editor.isActive('table')
										"
										@click="item.click"
									>
										<UIcon :name="item.icon" class="mr-2 h-4 w-4" />
										{{ item.label }}
									</UButton>
								</div>
							</template>
						</UPopover>
					</div>

					<!-- Other Elements -->
					<div class="flex gap-1 border-r border-gray-200 px-1">
						<UTooltip text="Línea horizontal">
							<UButton
								@click="editor.chain().focus().setHorizontalRule().run()"
								size="sm"
								color="info"
								variant="ghost"
							>
								<MinusIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
						<UTooltip text="Cita">
							<UButton
								:class="{
									'bg-gray-200 text-gray-900': editor.isActive('blockquote'),
								}"
								@click="editor.chain().focus().toggleBlockquote().run()"
								size="sm"
								color="info"
								variant="ghost"
							>
								<QuoteIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
						<UTooltip text="Bloque de código">
							<UButton
								:class="{
									'bg-gray-200 text-gray-900': editor.isActive('codeBlock'),
								}"
								@click="editor.chain().focus().toggleCodeBlock().run()"
								size="sm"
								color="info"
								variant="ghost"
							>
								<FileCodeIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
					</div>

					<!-- History -->
					<div class="flex gap-1 border-r border-gray-200 px-1">
						<UTooltip text="Deshacer">
							<UButton
								:disabled="!editor.can().chain().focus().undo().run()"
								@click="editor.chain().focus().undo().run()"
								size="sm"
								color="info"
								variant="ghost"
							>
								<UndoIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
						<UTooltip text="Rehacer">
							<UButton
								:disabled="!editor.can().chain().focus().redo().run()"
								@click="editor.chain().focus().redo().run()"
								size="sm"
								color="info"
								variant="ghost"
							>
								<RedoIcon class="h-4 w-4" />
							</UButton>
						</UTooltip>
					</div>

					<!-- Colors -->
					<div class="flex gap-1 px-1">
						<!-- Color de texto -->
						<UPopover>
							<UTooltip text="Color de texto">
								<UButton
									size="sm"
									color="info"
									variant="ghost"
									class="flex items-center gap-1"
								>
									<PaletteIcon class="h-4 w-4" />
								</UButton>
							</UTooltip>
							<template #content>
								<div class="p-2">
									<div class="mb-2 text-xs font-medium text-gray-700">
										Color de texto
									</div>
									<div class="grid grid-cols-8 gap-1">
										<button
											v-for="color in textColors"
											:key="color"
											class="h-6 w-6 rounded-md transition-all"
											:class="{
												'ring-2 ring-gray-400 ring-offset-2': editor.isActive(
													'textStyle',
													{ color }
												),
											}"
											:style="{ backgroundColor: color }"
											@click="editor.chain().focus().setColor(color).run()"
										/>
									</div>
									<div class="mt-3 mb-2 text-xs font-medium text-gray-700">
										Color personalizado
									</div>
									<div class="flex items-center gap-2">
										<input
											v-model="customTextColor"
											type="color"
											class="h-8 w-8 cursor-pointer rounded border-0"
										/>
										<UButton
											size="xs"
											@click="
												editor.chain().focus().setColor(customTextColor).run()
											"
										>
											Aplicar
										</UButton>
									</div>
								</div>
							</template>
						</UPopover>

						<!-- Resaltado -->
						<UPopover>
							<UTooltip text="Resaltar texto">
								<UButton
									size="sm"
									color="info"
									variant="ghost"
									class="flex items-center gap-1"
								>
									<HighlighterIcon class="h-4 w-4" />
								</UButton>
							</UTooltip>
							<template #content>
								<div class="p-2">
									<div class="mb-2 text-xs font-medium text-gray-700">
										Color de resaltado
									</div>
									<div class="grid grid-cols-8 gap-1">
										<button
											v-for="color in highlightColors"
											:key="color"
											class="h-6 w-6 rounded-md transition-all"
											:style="{ backgroundColor: color }"
											@click="setHighlight(color)"
										/>
									</div>
									<div class="mt-3 mb-2 text-xs font-medium text-gray-700">
										Color personalizado
									</div>
									<div class="flex items-center gap-2">
										<input
											v-model="customHighlightColor"
											type="color"
											class="h-8 w-8 cursor-pointer rounded border-0"
										/>
										<UButton
											size="xs"
											@click="setHighlight(customHighlightColor)"
										>
											Aplicar
										</UButton>
									</div>
								</div>
							</template>
						</UPopover>
					</div>
				</div>
			</div>
			<div
				class="overflow-hidden rounded-lg border border-gray-200"
				@dragover.prevent
				@drop="handleDrop"
			>
				<editor-content
					class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto bg-white focus:outline-none"
					:editor="editor"
				/>
			</div>
			<div
				v-if="characterLimit > 0"
				class="mt-2 text-right text-sm text-gray-500"
			>
				{{ characterCount }} / {{ characterLimit }}
			</div>
		</div>
		<div
			v-else
			class="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center"
		>
			Cargando editor...
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue';
	import { Editor, EditorContent } from '@tiptap/vue-3';
	import StarterKit from '@tiptap/starter-kit';
	import Underline from '@tiptap/extension-underline';
	import Link from '@tiptap/extension-link';
	import Image from '@tiptap/extension-image';
	import Placeholder from '@tiptap/extension-placeholder';
	import TextAlign from '@tiptap/extension-text-align';
	import Subscript from '@tiptap/extension-subscript';
	import Superscript from '@tiptap/extension-superscript';
	import Table from '@tiptap/extension-table';
	import TableRow from '@tiptap/extension-table-row';
	import TableCell from '@tiptap/extension-table-cell';
	import TableHeader from '@tiptap/extension-table-header';
	import TaskList from '@tiptap/extension-task-list';
	import TaskItem from '@tiptap/extension-task-item';
	import Highlight from '@tiptap/extension-highlight';
	import CharacterCount from '@tiptap/extension-character-count';
	import Color from '@tiptap/extension-color';
	import TextStyle from '@tiptap/extension-text-style';
	import ListItem from '@tiptap/extension-list-item';
	import Youtube from '@tiptap/extension-youtube';
	import Typography from '@tiptap/extension-typography';
	import Mention from '@tiptap/extension-mention';
	import Dropcursor from '@tiptap/extension-dropcursor';
	import Gapcursor from '@tiptap/extension-gapcursor';
	import FontFamily from '@tiptap/extension-font-family';
	import ImageResize from 'tiptap-extension-resize-image';
	import {
		Bold as BoldIcon,
		Italic as ItalicIcon,
		Strikethrough as StrikethroughIcon,
		Underline as UnderlineIcon,
		Code as CodeIcon,
		Highlighter as HighlighterIcon,
		Type as TypeIcon,
		List as ListIcon,
		ListOrdered as ListOrderedIcon,
		CheckSquare as CheckSquareIcon,
		AlignLeft as AlignLeftIcon,
		AlignCenter as AlignCenterIcon,
		AlignRight as AlignRightIcon,
		AlignJustify as AlignJustifyIcon,
		Link as LinkIcon,
		Link2Off as LinkOffIcon,
		Image as ImageIcon,
		ImagePlus as ImagePlusIcon,
		Youtube as YoutubeIcon,
		Table as TableIcon,
		Minus as MinusIcon,
		Quote as QuoteIcon,
		FileCode as FileCodeIcon,
		Undo as UndoIcon,
		Redo as RedoIcon,
		Palette as PaletteIcon,
		ChevronDown as ChevronDownIcon,
	} from 'lucide-vue-next';

	// Props
	const props = defineProps({
		modelValue: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: 'Escribe algo...',
		},
		editable: {
			type: Boolean,
			default: true,
		},
		characterLimit: {
			type: Number,
			default: 0,
		},
	});

	// Emits
	const emit = defineEmits([
		'update:modelValue',
		'update',
		'focus',
		'blur',
		'ready',
	]);

	// Editor ref
	const editor = ref<Editor | null>(null) as Ref<Editor | null>;

	// Panel de imágenes
	const showImagePanel = ref(false);
	const toggleImagePanel = () => {
		showImagePanel.value = !showImagePanel.value;
	};

	// TODO: cmabira despues Imágenes de muestra
	const sampleImages = [
		{ id: 1, name: 'Imagen 1', url: 'https://picsum.photos/id/1/200/200' },
		{ id: 2, name: 'Imagen 2', url: 'https://picsum.photos/id/2/200/200' },
		{ id: 3, name: 'Imagen 3', url: 'https://picsum.photos/id/3/200/200' },
		{ id: 4, name: 'Imagen 4', url: 'https://picsum.photos/id/4/200/200' },
		{ id: 5, name: 'Imagen 5', url: 'https://picsum.photos/id/5/200/200' },
		{ id: 6, name: 'Imagen 6', url: 'https://picsum.photos/id/6/200/200' },
	];

	// Manejo de arrastrar y soltar imágenes
	const handleDragStart = (event: DragEvent, url: string) => {
		if (event.dataTransfer) {
			event.dataTransfer.setData('text/plain', url);
			event.dataTransfer.effectAllowed = 'copy';
		}
	};

	const handleDrop = (event: DragEvent) => {
		event.preventDefault();
		if (event.dataTransfer) {
			const url = event.dataTransfer.getData('text/plain');
			if (url && url.startsWith('http') && editor.value) {
				editor.value.chain().focus().setImage({ src: url }).run();
			}
		}
	};

	// Colores para texto y resaltado
	const textColors = [
		'#000000',
		'#434343',
		'#666666',
		'#999999',
		'#b7b7b7',
		'#cccccc',
		'#d9d9d9',
		'#efefef',
		'#f3f3f3',
		'#ffffff',
		'#980000',
		'#ff0000',
		'#ff9900',
		'#ffff00',
		'#00ff00',
		'#00ffff',
		'#4a86e8',
		'#0000ff',
		'#9900ff',
		'#ff00ff',
		'#e6b8af',
		'#f4cccc',
		'#fce5cd',
		'#fff2cc',
		'#d9ead3',
		'#d0e0e3',
		'#c9daf8',
		'#cfe2f3',
		'#d9d2e9',
		'#ead1dc',
	];

	const highlightColors = [
		'#ffff00',
		'#00ffff',
		'#ff9900',
		'#ff00ff',
		'#00ff00',
		'#ff0000',
		'#0000ff',
		'#9900ff',
		'#f4cccc',
		'#fce5cd',
		'#fff2cc',
		'#d9ead3',
		'#d0e0e3',
		'#c9daf8',
		'#cfe2f3',
		'#d9d2e9',
	];

	const customTextColor = ref('#000000');
	const customHighlightColor = ref('#ffff00');

	// Función para aplicar resaltado con color personalizado
	const setHighlight = (color: string) => {
		if (editor.value) {
			// Primero quitamos cualquier resaltado existente
			editor.value.chain().focus().unsetHighlight().run();

			// Luego aplicamos el nuevo color de resaltado
			editor.value.chain().focus().setHighlight({ color }).run();
		}
	};

	// Character count
	const characterCount = computed(() => {
		return editor.value?.storage.characterCount.characters() || 0;
	});

	// Dropdown items for headings
	const headingItems = [
		{
			label: 'Párrafo',
			icon: 'i-heroicons-paragraph',
			click: () => editor.value?.chain().focus().setParagraph().run(),
		},
		{
			label: 'Encabezado 1',
			icon: 'i-heroicons-heading',
			click: () =>
				editor.value?.chain().focus().toggleHeading({ level: 1 }).run(),
		},
		{
			label: 'Encabezado 2',
			icon: 'i-heroicons-heading',
			click: () =>
				editor.value?.chain().focus().toggleHeading({ level: 2 }).run(),
		},
		{
			label: 'Encabezado 3',
			icon: 'i-heroicons-heading',
			click: () =>
				editor.value?.chain().focus().toggleHeading({ level: 3 }).run(),
		},
		{
			label: 'Encabezado 4',
			icon: 'i-heroicons-heading',
			click: () =>
				editor.value?.chain().focus().toggleHeading({ level: 4 }).run(),
		},
		{
			label: 'Encabezado 5',
			icon: 'i-heroicons-heading',
			click: () =>
				editor.value?.chain().focus().toggleHeading({ level: 5 }).run(),
		},
		{
			label: 'Encabezado 6',
			icon: 'i-heroicons-heading',
			click: () =>
				editor.value?.chain().focus().toggleHeading({ level: 6 }).run(),
		},
	];

	const insertTable = () => {
		editor.value
			?.chain()
			.focus()
			.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
			.run();
	};

	// Dropdown items for tables
	const tableItems = [
		{
			label: 'Insertar tabla',
			icon: 'i-heroicons-table',
			click: insertTable,
		},
		{
			label: 'Añadir columna antes',
			icon: 'i-heroicons-table-cells',
			click: () => editor.value?.chain().focus().addColumnBefore().run(),
		},
		{
			label: 'Añadir columna después',
			icon: 'i-heroicons-table-cells',
			click: () => editor.value?.chain().focus().addColumnAfter().run(),
		},
		{
			label: 'Eliminar columna',
			icon: 'i-heroicons-trash',
			click: () => editor.value?.chain().focus().deleteColumn().run(),
		},
		{
			label: 'Añadir fila antes',
			icon: 'i-heroicons-table-cells',
			click: () => editor.value?.chain().focus().addRowBefore().run(),
		},
		{
			label: 'Añadir fila después',
			icon: 'i-heroicons-table-cells',
			click: () => editor.value?.chain().focus().addRowAfter().run(),
		},
		{
			label: 'Eliminar fila',
			icon: 'i-heroicons-trash',
			click: () => editor.value?.chain().focus().deleteRow().run(),
		},
		{
			label: 'Eliminar tabla',
			icon: 'i-heroicons-trash',
			click: () => editor.value?.chain().focus().deleteTable().run(),
		},
		{
			label: 'Combinar celdas',
			icon: 'i-heroicons-arrows-pointing-in',
			click: () => editor.value?.chain().focus().mergeCells().run(),
		},
		{
			label: 'Dividir celda',
			icon: 'i-heroicons-arrows-pointing-out',
			click: () => editor.value?.chain().focus().splitCell().run(),
		},
		{
			label: 'Convertir en celda de encabezado',
			icon: 'i-heroicons-table',
			click: () => editor.value?.chain().focus().toggleHeaderCell().run(),
		},
	];

	// Initialize editor
	onMounted(() => {
		try {
			editor.value = new Editor({
				extensions: [
					StarterKit.configure({
						heading: {
							levels: [1, 2, 3, 4, 5, 6],
						},
					}),
					ImageResize,
					Underline,
					Link.configure({
						openOnClick: true,
						validate: (href) => /^https?:\/\//.test(href),
					}),
					Image.configure({
						allowBase64: false,
						inline: false,
					}),
					Placeholder.configure({
						placeholder: props.placeholder,
					}),
					TextAlign.configure({
						types: ['heading', 'paragraph'],
					}),
					Subscript,
					Superscript,
					Table.configure({
						resizable: true,
					}),
					TableRow,
					TableCell,
					TableHeader,
					TaskList,
					TaskItem.configure({
						nested: true,
					}),
					Highlight.configure({
						multicolor: true, // Habilitar múltiples colores para resaltado
					}),
					CharacterCount.configure({
						limit: props.characterLimit > 0 ? props.characterLimit : null,
					}),
					Color.configure({
						types: [TextStyle.name, ListItem.name],
					}),
					TextStyle,
					Youtube.configure({
						width: 640,
						height: 480,
						controls: true,
					}),
					Typography,
					Mention.configure({
						suggestion: {
							items: () => [
								{ id: 'user1', name: 'John Doe' },
								{ id: 'user2', name: 'Jane Smith' },
								{ id: 'user3', name: 'Bob Johnson' },
							],
						},
					}),
					Dropcursor,
					Gapcursor,
					FontFamily,
				],
				content: props.modelValue,
				editable: props.editable,
				onUpdate: ({ editor }) => {
					const html = editor.getHTML();
					emit('update:modelValue', html);
					emit('update', {
						html,
						text: editor.getText(),
						json: editor.getJSON(),
					});
				},
				onFocus: ({ editor, event }) => {
					emit('focus', { editor, event });
				},
				onBlur: ({ editor, event }) => {
					emit('blur', { editor, event });
				},
				editorProps: {
					attributes: {
						class: 'p-4 min-h-[200px] focus:outline-none',
					},
				},
			});

			emit('ready', editor.value);
		} catch (error) {
			console.error('Error initializing editor:', error);
		}
	});

	// Watch for external modelValue changes
	watch(
		() => props.modelValue,
		(newValue) => {
			// Only update if editor exists and content is different
			if (editor.value && newValue !== editor.value.getHTML()) {
				editor.value.commands.setContent(newValue, false);
			}
		}
	);

	// Watch for editable prop changes
	watch(
		() => props.editable,
		(newValue) => {
			if (editor.value) {
				editor.value.setEditable(newValue);
			}
		}
	);

	// Clean up on component unmount
	onBeforeUnmount(() => {
		if (editor.value) {
			editor.value.destroy();
		}
	});

	// Helper methods for buttons
	const setLink = () => {
		const url = window.prompt('URL');
		if (url) {
			editor.value?.chain().focus().setLink({ href: url }).run();
		}
	};

	const addImage = () => {
		const url = window.prompt('URL');
		if (url) {
			editor.value?.chain().focus().setImage({ src: url }).run();
		}
	};

	const addYoutubeVideo = () => {
		const url = window.prompt('YouTube URL');
		if (url) {
			editor.value?.chain().focus().setYoutubeVideo({ src: url }).run();
		}
	};
</script>
<style>
	/* Add these styles to your component or in a global CSS file */
	.ProseMirror table {
		border-collapse: collapse;
		margin: 0;
		overflow: hidden;
		table-layout: fixed;
		width: 100%;
	}

	.ProseMirror table td,
	.ProseMirror table th {
		border: 2px solid #ced4da;
		box-sizing: border-box;
		min-width: 1em;
		padding: 3px 5px;
		position: relative;
		vertical-align: top;
	}

	.ProseMirror table th {
		background-color: #f1f3f5;
		font-weight: bold;
		text-align: left;
	}

	.ProseMirror table .selectedCell:after {
		background: rgba(200, 200, 255, 0.4);
		content: '';
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		pointer-events: none;
		position: absolute;
		z-index: 2;
	}

	.ProseMirror table .column-resize-handle {
		background-color: #adf;
		bottom: -2px;
		position: absolute;
		right: -2px;
		pointer-events: none;
		top: 0;
		width: 4px;
	}

	.ProseMirror table p {
		margin: 0;
	}
</style>
