<template>
	<div class="min-h-screen bg-gray-50">
		<!-- Layout principal con panel lateral y área de contenido -->
		<div class="flex h-screen overflow-hidden">
			<!-- Panel lateral izquierdo con componentes -->
			<Sidebar
				:available-components="availableComponents"
				:handle-drag-start="handleDragStart"
				:export-content="exportContent"
				@show-preview="showPreview = true"
				@show-export-modal="showExportModal = true"
			/>

			<!-- Área principal de contenido -->
			<div class="flex-1 flex flex-col h-full overflow-hidden">
				<!-- Barra superior -->
				<div class="bg-white border-b border-gray-200 p-4">
					<h1 class="text-xl font-bold text-gray-800">
						Constructor de Contenido Avanzado
					</h1>
				</div>

				<!-- Área de trabajo con scroll -->
				<div class="flex-1 overflow-y-auto p-6">
					<!-- Selección de plantilla -->
					<TemplateSelector
						:templates="templates"
						:selected-template="selectedTemplate"
						:select-template="selectTemplate"
					/>

					<!-- Campos fijos de la plantilla (si hay una plantilla seleccionada) -->
					<FixedFields
						:selected-template="selectedTemplate"
						:fixed-fields="fixedFields"
					/>

					<!-- Área de construcción de contenido -->
					<div
						class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6"
					>
						<!-- Template Header -->
						<TemplateHeader
							:selected-template="selectedTemplate"
							:fixed-fields="fixedFields"
						/>

						<!-- Content Grid -->
						<ContentGrid
							:rows="rows"
							:selected-block-id="selectedBlockId"
							:show-width-menu="showWidthMenu"
							:get-width-class="getWidthClass"
							:select-block="selectBlock"
							:handle-drop="handleDrop"
							:update-block-content="updateBlockContent"
							:update-column-content="updateColumnContent"
							:update-image-props="updateImageProps"
							:update-columns-count="updateColumnsCount"
							:remove-block="removeBlock"
							:duplicate-block="duplicateBlock"
							:change-block-width="changeBlockWidth"
							:move-block-up="moveBlockUp"
							:move-block-down="moveBlockDown"
							:move-row-up="moveRowUp"
							:move-row-down="moveRowDown"
							:create-new-row="createNewRow"
							@toggle-width-menu="toggleWidthMenu"
						/>
					</div>
				</div>
			</div>

			<!-- Panel de propiedades -->
			<PropertiesPanel
				:selected-block="selectedBlockId ? getSelectedBlock() : null"
				:change-block-width="changeBlockWidth"
				:update-block-content="updateBlockContent"
				:update-image-props="updateImageProps"
				:update-columns-count="updateColumnsCount"
				:update-custom-classes="updateCustomClasses"
				:duplicate-block="duplicateBlock"
				:remove-block="removeBlock"
			/>
		</div>

		<!-- Modal de Vista Previa -->
		<PreviewModal
			:show-preview="showPreview"
			:selected-template="selectedTemplate"
			:fixed-fields="fixedFields"
			:rows="rows"
			:get-width-class="getWidthClass"
			@close="showPreview = false"
		/>

		<!-- Modal de Exportación de Código -->
		<ExportModal
			:show-export-modal="showExportModal"
			:generated-vue-code="generatedVueCode"
			:code-copied="codeCopied"
			:copy-vue-code="copyVueCode"
			:download-vue-file="downloadVueFile"
			@close="showExportModal = false"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, onUnmounted, watch } from 'vue';
	import Sidebar from './Sidebar.vue';
	import TemplateSelector from './TemplateSelector.vue';
	import FixedFields from './FixedFields.vue';
	import TemplateHeader from './TemplateHeader.vue';
	import ContentGrid from './ContentGrid.vue';
	import PreviewModal from './PreviewModal.vue';
	import ExportModal from './ExportModal.vue';
	import { useTemplates } from '@/composables/useTemplates';
	import { useContentBuilder } from '@/composables/useContentBuilder';
	import { useExport } from '@/composables/useExport';
	import PropertiesPanel from './PropertiesPanel.vue';

	// Componentes disponibles
	const availableComponents = [
		{ type: 'title', label: 'Título' },
		{ type: 'subtitle', label: 'Subtítulo' },
		{ type: 'text', label: 'Texto' },
		{ type: 'divider', label: 'Divisor' },
		{ type: 'image', label: 'Imagen' },
		{ type: 'columns', label: 'Columnas' },
	];

	// Composables
	const { templates } = useTemplates();
	const {
		selectedTemplate,
		fixedFields,
		rows,
		selectedBlockId,
		showWidthMenu,
		getWidthClass,
		selectTemplate,
		selectBlock,
		handleDragStart,
		handleDrop,
		updateBlockContent,
		updateColumnContent,
		updateImageProps,
		updateColumnsCount,
		removeBlock,
		duplicateBlock,
		changeBlockWidth,
		moveBlockUp,
		moveBlockDown,
		moveRowUp,
		moveRowDown,
		createNewRow,
		updateCustomClasses,
	} = useContentBuilder();

	const {
		showPreview,
		showExportModal,
		codeCopied,
		exportContent,
		generatedVueCode,
		copyVueCode,
		downloadVueFile,
	} = useExport(rows, selectedTemplate, fixedFields, getWidthClass);

	// Añadir esta función después de las importaciones de composables
	const toggleWidthMenu = (blockId: string) => {
		showWidthMenu.value = showWidthMenu.value === blockId ? null : blockId;
	};

	// Añadir esta función después de las importaciones de composables
	const getSelectedBlock = () => {
		if (!selectedBlockId.value) return null;

		for (const row of rows.value) {
			const block = row.blocks.find((b) => b.id === selectedBlockId.value);
			if (block) return block;
		}

		return null;
	};

	// Close width menu when clicking outside
	const handleClickOutside = (event: MouseEvent) => {
		// Solo cerrar el menú si el clic no fue en un botón de ancho o en el menú mismo
		if (
			showWidthMenu.value &&
			!(event.target as HTMLElement).closest('.width-menu-button') &&
			!(event.target as HTMLElement).closest('.width-menu')
		) {
			showWidthMenu.value = null;
		}
	};

	onMounted(() => {
		document.addEventListener('click', handleClickOutside);
	});

	onUnmounted(() => {
		document.removeEventListener('click', handleClickOutside);
	});

	// Reset copied state after 2 seconds
	watch(codeCopied, (newValue) => {
		if (newValue) {
			setTimeout(() => {
				codeCopied.value = false;
			}, 2000);
		}
	});
</script>

<style>
	[contenteditable] {
		outline: none;
	}

	.accent-emerald-500::-webkit-slider-thumb {
		background-color: #10b981;
	}

	.accent-emerald-500::-moz-range-thumb {
		background-color: #10b981;
	}
</style>
