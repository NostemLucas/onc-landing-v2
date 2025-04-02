<template>
	<div class="p-6" ref="contentGridRef">
		<div
			v-if="rows.length === 0"
			class="min-h-[300px] border-2 border-dashed border-gray-200 rounded-md flex items-center justify-center"
			@dragover.prevent
			@drop="handleDrop($event)"
		>
			<div class="text-center">
				<LayoutTemplate class="h-12 w-12 text-gray-300 mx-auto mb-2" />
				<p class="text-gray-400">
					Arrastre y suelte componentes aquí para construir su contenido
				</p>
			</div>
		</div>
		<template v-else>
			<div v-for="row in rows" :key="row.id" class="mb-4">
				<div
					class="grid grid-cols-12 gap-4 min-h-[50px] relative"
					@dragover.prevent
					@drop="handleDrop($event, row.id)"
				>
					<!-- Indicador de fila -->
					<div
						class="absolute -left-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center opacity-30 hover:opacity-100"
					>
						<button
							@click="moveRowUp(row.id)"
							class="p-1 text-gray-500 hover:text-gray-700"
						>
							<ChevronUp class="h-4 w-4" />
						</button>
						<div class="h-4 w-1 bg-gray-300 rounded-full"></div>
						<button
							@click="moveRowDown(row.id)"
							class="p-1 text-gray-500 hover:text-gray-700"
						>
							<ChevronDown class="h-4 w-4" />
						</button>
					</div>

					<template v-for="block in row.blocks" :key="block.id">
						<ContentBlock
							:block="block"
							:selected-block-id="selectedBlockId"
							:show-width-menu="showWidthMenu"
							:get-width-class="getWidthClass"
							:select-block="selectBlock"
							:update-block-content="updateBlockContent"
							:update-column-content="updateColumnContent"
							:update-image-props="updateImageProps"
							:update-columns-count="updateColumnsCount"
							:remove-block="removeBlock"
							:duplicate-block="duplicateBlock"
							:change-block-width="changeBlockWidth"
							:move-block-up="moveBlockUp"
							:move-block-down="moveBlockDown"
							@toggle-width-menu="$emit('toggle-width-menu', $event)"
						/>
					</template>

					<div
						v-if="row.blocks.length === 0"
						class="col-span-12 border-2 border-dashed border-gray-200 rounded-md flex items-center justify-center p-4"
					>
						<p class="text-gray-400">Suelte componentes aquí</p>
					</div>
				</div>
			</div>

			<button
				@click="createNewRow"
				class="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
			>
				<Plus class="h-4 w-4" />
				Agregar Nueva Fila
			</button>
		</template>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import {
		ChevronUp,
		ChevronDown,
		LayoutTemplate,
		Plus,
	} from 'lucide-vue-next';
	import ContentBlock from './ContentBlock.vue';
	import type {
		ContentRow,
		ImageProperties,
		ContentBlock as ContentBlockType,
	} from '@/types/content-builder';

	defineProps<{
		rows: ContentRow[];
		selectedBlockId: string | null;
		showWidthMenu: string | null;
		getWidthClass: (width: string) => string;
		selectBlock: (blockId: string) => void;
		handleDrop: (event: DragEvent, rowId?: string) => void;
		updateBlockContent: (blockId: string, content: string) => void;
		updateColumnContent: (
			blockId: string,
			columnIndex: number,
			content: string
		) => void;
		updateImageProps: (
			blockId: string,
			props: Partial<ImageProperties>
		) => void;
		updateColumnsCount: (blockId: string, columnsCount: number) => void;
		removeBlock: (blockId: string) => void;
		duplicateBlock: (blockId: string) => void;
		changeBlockWidth: (
			blockId: string,
			width: ContentBlockType['width']
		) => void;
		moveBlockUp: (blockId: string) => void;
		moveBlockDown: (blockId: string) => void;
		moveRowUp: (rowId: string) => void;
		moveRowDown: (rowId: string) => void;
		createNewRow: () => void;
	}>();

	defineEmits(['toggle-width-menu']);

	const contentGridRef = ref<HTMLElement | null>(null);
</script>
