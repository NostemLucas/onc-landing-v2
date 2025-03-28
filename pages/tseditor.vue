<template>
	<div v-if="editor" class="container">
		<div class="control-group">
			<div class="UButton-group">
				<!-- Text Formatting -->
				<UButton
					:disabled="!editor.can().chain().focus().toggleBold().run()"
					:class="{ 'is-active': editor.isActive('bold') }"
					@click="editor.chain().focus().toggleBold().run()"
				>
					Bold
				</UButton>
				<UButton
					:disabled="!editor.can().chain().focus().toggleItalic().run()"
					:class="{ 'is-active': editor.isActive('italic') }"
					@click="editor.chain().focus().toggleItalic().run()"
				>
					Italic
				</UButton>
				<UButton
					:disabled="!editor.can().chain().focus().toggleStrike().run()"
					:class="{ 'is-active': editor.isActive('strike') }"
					@click="editor.chain().focus().toggleStrike().run()"
				>
					Strike
				</UButton>
				<UButton
					:disabled="!editor.can().chain().focus().toggleUnderline().run()"
					:class="{ 'is-active': editor.isActive('underline') }"
					@click="editor.chain().focus().toggleUnderline().run()"
				>
					Underline
				</UButton>
				<UButton
					:disabled="!editor.can().chain().focus().toggleCode().run()"
					:class="{ 'is-active': editor.isActive('code') }"
					@click="editor.chain().focus().toggleCode().run()"
				>
					Code
				</UButton>
				<UButton
					:disabled="!editor.can().chain().focus().toggleSubscript().run()"
					:class="{ 'is-active': editor.isActive('subscript') }"
					@click="editor.chain().focus().toggleSubscript().run()"
				>
					Subscript
				</UButton>
				<UButton
					:disabled="!editor.can().chain().focus().toggleSuperscript().run()"
					:class="{ 'is-active': editor.isActive('superscript') }"
					@click="editor.chain().focus().toggleSuperscript().run()"
				>
					Superscript
				</UButton>
				<UButton
					:disabled="!editor.can().chain().focus().toggleHighlight().run()"
					:class="{ 'is-active': editor.isActive('highlight') }"
					@click="editor.chain().focus().toggleHighlight().run()"
				>
					Highlight
				</UButton>
				<UButton @click="editor.chain().focus().unsetAllMarks().run()">
					Clear marks
				</UButton>
				<UButton @click="editor.chain().focus().clearNodes().run()">
					Clear nodes
				</UButton>

				<!-- Paragraph Styles -->
				<UButton
					:class="{ 'is-active': editor.isActive('paragraph') }"
					@click="editor.chain().focus().setParagraph().run()"
				>
					Paragraph
				</UButton>
				<UButton
					:class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
					@click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
				>
					H1
				</UButton>
				<UButton
					:class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
					@click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
				>
					H2
				</UButton>
				<UButton
					:class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
					@click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
				>
					H3
				</UButton>
				<UButton
					:class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
					@click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
				>
					H4
				</UButton>
				<UButton
					:class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
					@click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
				>
					H5
				</UButton>
				<UButton
					:class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
					@click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
				>
					H6
				</UButton>

				<!-- Lists -->
				<UButton
					:class="{ 'is-active': editor.isActive('bulletList') }"
					@click="editor.chain().focus().toggleBulletList().run()"
				>
					Bullet list
				</UButton>
				<UButton
					:class="{ 'is-active': editor.isActive('orderedList') }"
					@click="editor.chain().focus().toggleOrderedList().run()"
				>
					Ordered list
				</UButton>
				<UButton
					:class="{ 'is-active': editor.isActive('taskList') }"
					@click="editor.chain().focus().toggleTaskList().run()"
				>
					Task list
				</UButton>
				<UButton
					:disabled="!editor.can().sinkListItem('listItem')"
					@click="editor.chain().focus().sinkListItem('listItem').run()"
				>
					Indent
				</UButton>
				<UButton
					:disabled="!editor.can().liftListItem('listItem')"
					@click="editor.chain().focus().liftListItem('listItem').run()"
				>
					Outdent
				</UButton>

				<!-- Code and Quotes -->
				<UButton
					:class="{ 'is-active': editor.isActive('codeBlock') }"
					@click="editor.chain().focus().toggleCodeBlock().run()"
				>
					Code block
				</UButton>
				<UButton
					:class="{ 'is-active': editor.isActive('blockquote') }"
					@click="editor.chain().focus().toggleBlockquote().run()"
				>
					Blockquote
				</UButton>

				<!-- Tables -->
				<UButton :disabled="editor.isActive('table')" @click="insertTable">
					Insert Table
				</UButton>
				<UButton
					:disabled="!editor.can().addColumnBefore()"
					@click="editor.chain().focus().addColumnBefore().run()"
				>
					Add Column Before
				</UButton>
				<UButton
					:disabled="!editor.can().addColumnAfter()"
					@click="editor.chain().focus().addColumnAfter().run()"
				>
					Add Column After
				</UButton>
				<UButton
					:disabled="!editor.can().deleteColumn()"
					@click="editor.chain().focus().deleteColumn().run()"
				>
					Delete Column
				</UButton>
				<UButton
					:disabled="!editor.can().addRowBefore()"
					@click="editor.chain().focus().addRowBefore().run()"
				>
					Add Row Before
				</UButton>
				<UButton
					:disabled="!editor.can().addRowAfter()"
					@click="editor.chain().focus().addRowAfter().run()"
				>
					Add Row After
				</UButton>
				<UButton
					:disabled="!editor.can().deleteRow()"
					@click="editor.chain().focus().deleteRow().run()"
				>
					Delete Row
				</UButton>
				<UButton
					:disabled="!editor.can().deleteTable()"
					@click="editor.chain().focus().deleteTable().run()"
				>
					Delete Table
				</UButton>
				<UButton
					:disabled="!editor.can().mergeCells()"
					@click="editor.chain().focus().mergeCells().run()"
				>
					Merge Cells
				</UButton>
				<UButton
					:disabled="!editor.can().splitCell()"
					@click="editor.chain().focus().splitCell().run()"
				>
					Split Cell
				</UButton>
				<UButton
					:disabled="!editor.can().toggleHeaderCell()"
					@click="editor.chain().focus().toggleHeaderCell().run()"
				>
					Toggle Header Cell
				</UButton>

				<!-- Links -->
				<UButton
					:class="{ 'is-active': editor.isActive('link') }"
					@click="setLink"
				>
					Set Link
				</UButton>
				<UButton
					:disabled="!editor.isActive('link')"
					@click="editor.chain().focus().unsetLink().run()"
				>
					Unset Link
				</UButton>

				<!-- Alignment -->
				<UButton
					:class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
					@click="editor.chain().focus().setTextAlign('left').run()"
				>
					Align Left
				</UButton>
				<UButton
					:class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
					@click="editor.chain().focus().setTextAlign('center').run()"
				>
					Align Center
				</UButton>
				<UButton
					:class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
					@click="editor.chain().focus().setTextAlign('right').run()"
				>
					Align Right
				</UButton>
				<UButton
					:class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
					@click="editor.chain().focus().setTextAlign('justify').run()"
				>
					Justify
				</UButton>

				<!-- Other Elements -->
				<UButton @click="editor.chain().focus().setHorizontalRule().run()">
					Horizontal rule
				</UButton>
				<UButton @click="editor.chain().focus().setHardBreak().run()">
					Hard break
				</UButton>
				<UButton @click="addImage">Add Image</UButton>
				<UButton @click="addYoutubeVideo">Add YouTube Video</UButton>

				<!-- History -->
				<UButton
					:disabled="!editor.can().chain().focus().undo().run()"
					@click="editor.chain().focus().undo().run()"
				>
					Undo
				</UButton>
				<UButton
					:disabled="!editor.can().chain().focus().redo().run()"
					@click="editor.chain().focus().redo().run()"
				>
					Redo
				</UButton>

				<!-- Colors -->
				<div class="color-picker">
					<UButton
						v-for="color in colors"
						:key="color"
						class="color-btn"
						:class="{ 'is-active': editor.isActive('textStyle', { color }) }"
						:style="{ backgroundColor: color }"
						@click="editor.chain().focus().setColor(color).run()"
					/>
				</div>
			</div>
		</div>
		<div class="editor-wrapper">
			<editor-content class="editor-content" :editor="editor!" />
		</div>
		<div v-if="characterLimit > 0" class="character-count">
			{{ characterCount }} / {{ characterLimit }}
		</div>
	</div>
	<div v-else class="loading">Cargando editor...</div>
</template>

<script lang="ts">
	import {
		defineComponent,
		ref,
		watch,
		onMounted,
		onBeforeUnmount,
		computed,
	} from 'vue';
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

	export default defineComponent({
		name: 'RichTextEditor',
		components: {
			EditorContent,
		},
		props: {
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
		},
		emits: ['update:modelValue', 'update', 'focus', 'blur', 'ready'],
		setup(props, { emit }) {
			// Editor ref con tipo correcto
			const editor = ref<Editor | null>(null) as Ref<Editor | null>;

			// Available colors for the color picker
			const colors = [
				'#958DF1',
				'#F98181',
				'#FBBC88',
				'#FAF594',
				'#70CFF8',
				'#94FADB',
				'#B9F18D',
				'#000000',
			];

			// Character count
			const characterCount = computed(() => {
				return editor.value?.storage.characterCount.characters() || 0;
			});

			// Initialize editor
			onMounted(() => {
				// Asegurarnos de que el editor se inicializa correctamente
				try {
					editor.value = new Editor({
						extensions: [
							StarterKit.configure({
								heading: {
									levels: [1, 2, 3, 4, 5, 6],
								},
							}),
							Underline,
							Link.configure({
								openOnClick: true,
								validate: (href) => /^https?:\/\//.test(href),
							}),
							Image.configure({
								allowBase64: true,
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
							Highlight,
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
								class:
									'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
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

			const insertTable = () => {
				editor.value
					?.chain()
					.focus()
					.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
					.run();
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

			return {
				editor,
				colors,
				characterCount,
				setLink,
				insertTable,
				addImage,
				addYoutubeVideo,
			};
		},
	});
</script>

<style>
	.container {
		margin: 2rem 0;
	}

	.control-group {
		margin-bottom: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.button-group {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.u-button {
		padding: 0.25rem 0.5rem;
		background-color: #f3f4f6;
		border: 1px solid #d1d5db;
		border-radius: 0.25rem;
		cursor: pointer;
		font-size: 0.875rem;
	}

	.u-button:hover {
		background-color: #e5e7eb;
	}

	.u-button.is-active {
		background-color: #dbeafe;
		border-color: #93c5fd;
	}

	.editor-wrapper {
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.editor-content {
		background-color: white;
	}

	.ProseMirror {
		padding: 1rem;
		min-height: 200px;
	}

	.ProseMirror:focus {
		outline: none;
	}

	.ProseMirror p.is-editor-empty:first-child::before {
		content: attr(data-placeholder);
		float: left;
		color: #adb5bd;
		pointer-events: none;
		height: 0;
	}

	.loading {
		padding: 2rem;
		text-align: center;
		background-color: #f9fafb;
		border-radius: 0.5rem;
		border: 1px solid #e5e7eb;
	}

	.character-count {
		margin-top: 0.5rem;
		text-align: right;
		font-size: 0.875rem;
		color: #6b7280;
	}

	/* Task list styles */
	ul[data-type='taskList'] {
		list-style: none;
		padding: 0;
	}

	ul[data-type='taskList'] li {
		display: flex;
		align-items: flex-start;
	}

	ul[data-type='taskList'] li > label {
		margin-right: 0.5rem;
		user-select: none;
	}

	ul[data-type='taskList'] li > div {
		flex: 1;
	}

	/* Table styles */
	.ProseMirror table {
		border-collapse: collapse;
		table-layout: fixed;
		width: 100%;
		margin: 0;
		overflow: hidden;
	}

	.ProseMirror table td,
	.ProseMirror table th {
		min-width: 1em;
		border: 2px solid #ced4da;
		padding: 3px 5px;
		vertical-align: top;
		box-sizing: border-box;
		position: relative;
	}

	.ProseMirror table th {
		font-weight: bold;
		background-color: #f1f3f5;
	}

	.ProseMirror table .selectedCell:after {
		z-index: 2;
		position: absolute;
		content: '';
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(200, 200, 255, 0.4);
		pointer-events: none;
	}

	.ProseMirror table .column-resize-handle {
		position: absolute;
		right: -2px;
		top: 0;
		bottom: 0;
		width: 4px;
		z-index: 20;
		background-color: #adf;
		pointer-events: none;
	}

	.tableWrapper {
		overflow-x: auto;
	}

	.resize-cursor {
		cursor: col-resize;
	}
</style>
