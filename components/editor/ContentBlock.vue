<template>
	<div
		:class="[
			getWidthClass(block.width),
			selectedBlockId === block.id ? 'ring-2 ring-emerald-500' : '',
			'relative group p-2',
			block.customClasses || '',
		]"
		@click="selectBlock(block.id)"
	>
		<!-- Controles del bloque -->
		<div
			class="absolute right-2 top-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm rounded-md p-1 z-10"
		>
			<div class="relative">
				<button
					@click.stop="$emit('toggle-width-menu', block.id)"
					class="p-1 hover:bg-gray-100 rounded"
				>
					<LayoutGrid class="h-4 w-4" />
				</button>
				<div
					v-if="showWidthMenu === block.id"
					class="absolute right-0 mt-1 w-40 bg-white shadow-lg rounded-md p-1 z-20"
					@click.stop
				>
					<button
						@click.stop="changeBlockWidth(block.id, 'full')"
						class="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
					>
						Ancho completo
					</button>
					<button
						@click.stop="changeBlockWidth(block.id, 'half')"
						class="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
					>
						Mitad (1/2)
					</button>
					<button
						@click.stop="changeBlockWidth(block.id, 'third')"
						class="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
					>
						Un tercio (1/3)
					</button>
					<button
						@click.stop="changeBlockWidth(block.id, 'quarter')"
						class="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
					>
						Un cuarto (1/4)
					</button>
					<button
						@click.stop="changeBlockWidth(block.id, 'two-thirds')"
						class="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
					>
						Dos tercios (2/3)
					</button>
					<button
						@click.stop="changeBlockWidth(block.id, 'three-quarters')"
						class="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
					>
						Tres cuartos (3/4)
					</button>
				</div>
			</div>
			<button
				@click.stop="moveBlockUp(block.id)"
				class="p-1 hover:bg-gray-100 rounded"
			>
				<ChevronUp class="h-4 w-4" />
			</button>
			<button
				@click.stop="moveBlockDown(block.id)"
				class="p-1 hover:bg-gray-100 rounded"
			>
				<ChevronDown class="h-4 w-4" />
			</button>
			<button
				@click.stop="duplicateBlock(block.id)"
				class="p-1 hover:bg-gray-100 rounded"
			>
				<Copy class="h-4 w-4" />
			</button>
			<button
				@click.stop="removeBlock(block.id)"
				class="p-1 hover:bg-gray-100 rounded text-red-500"
			>
				<Trash2 class="h-4 w-4" />
			</button>
		</div>

		<!-- Título -->
		<div
			v-if="block.type === 'title'"
			class="font-bold text-2xl md:text-3xl outline-none w-full min-h-[40px]"
			contenteditable
			@blur="updateBlockContent(block.id, $event.target.textContent || '')"
		>
			{{ block.content || 'Ingrese título aquí' }}
		</div>

		<!-- Subtítulo -->
		<div
			v-else-if="block.type === 'subtitle'"
			class="font-medium text-xl md:text-2xl outline-none w-full min-h-[36px]"
			contenteditable
			@blur="updateBlockContent(block.id, $event.target.textContent || '')"
		>
			{{ block.content || 'Ingrese subtítulo aquí' }}
		</div>

		<!-- Texto -->
		<div
			v-else-if="block.type === 'text'"
			class="text-base outline-none w-full min-h-[100px]"
			contenteditable
			@blur="updateBlockContent(block.id, $event.target.textContent || '')"
		>
			{{ block.content || 'Ingrese texto aquí' }}
		</div>

		<!-- Divisor -->
		<hr v-else-if="block.type === 'divider'" class="w-full border-t" />

		<!-- Imagen -->
		<div v-else-if="block.type === 'image'" class="w-full">
			<div
				class="w-full relative"
				:style="{
					height: `${block.imageProps?.height || 100}%`,
				}"
			>
				<img
					:src="block.content || '/placeholder.svg?height=300&width=600'"
					:alt="block.imageProps?.alt || 'Imagen descriptiva'"
					class="w-full h-full rounded-md"
					:style="{
						objectFit: block.imageProps?.objectFit || 'cover',
					}"
				/>
			</div>

			<div
				v-if="selectedBlockId === block.id"
				class="mt-4 space-y-4 bg-gray-50 p-4 rounded-md"
			>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">
						URL de la imagen
					</label>
					<input
						type="text"
						:value="block.content || ''"
						@input="updateBlockContent(block.id, $event.target.value)"
						placeholder="Ingrese URL de la imagen"
						class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">
						Texto alternativo
					</label>
					<input
						type="text"
						:value="block.imageProps?.alt || ''"
						@input="
							updateImageProps(block.id, {
								alt: $event.target.value,
							})
						"
						placeholder="Descripción de la imagen"
						class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">
						Ajuste de imagen
					</label>
					<select
						:value="block.imageProps?.objectFit || 'cover'"
						@change="
							updateImageProps(block.id, {
								objectFit: $event.target.value,
							})
						"
						class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
					>
						<option value="cover">Cubrir (cover)</option>
						<option value="contain">Contener (contain)</option>
						<option value="fill">Llenar (fill)</option>
						<option value="none">Ninguno (none)</option>
					</select>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">
						Altura ({{ block.imageProps?.height || 100 }}%)
					</label>
					<input
						type="range"
						:value="block.imageProps?.height || 100"
						@input="
							updateImageProps(block.id, {
								height: parseInt($event.target.value),
							})
						"
						min="20"
						max="200"
						step="5"
						class="w-full accent-emerald-500"
					/>
				</div>
			</div>
		</div>

		<!-- Columnas -->
		<div v-else-if="block.type === 'columns'" class="w-full">
			<div
				class="w-full grid"
				:style="{
					gridTemplateColumns: `repeat(${block.columns || 2}, 1fr)`,
					gap: '1rem',
				}"
			>
				<div
					v-for="(_, colIndex) in Array.from({
						length: block.columns || 2,
					})"
					:key="colIndex"
					class="border border-dashed border-gray-200 p-2 min-h-[100px]"
				>
					<div
						contenteditable
						class="outline-none h-full"
						@blur="
							updateColumnContent(
								block.id,
								colIndex,
								$event.target.textContent || ''
							)
						"
					>
						{{
							block.columnContent && block.columnContent[colIndex]
								? block.columnContent[colIndex]
								: `Contenido columna ${colIndex + 1}`
						}}
					</div>
				</div>
			</div>

			<div
				v-if="selectedBlockId === block.id"
				class="mt-4 bg-gray-50 p-4 rounded-md"
			>
				<label class="block text-sm font-medium text-gray-700 mb-1">
					Número de columnas
				</label>
				<select
					:value="block.columns || 2"
					@change="updateColumnsCount(block.id, parseInt($event.target.value))"
					class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
				>
					<option value="2">2 columnas</option>
					<option value="3">3 columnas</option>
					<option value="4">4 columnas</option>
					<option value="6">6 columnas</option>
				</select>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		ChevronUp,
		ChevronDown,
		LayoutGrid,
		Copy,
		Trash2,
	} from 'lucide-vue-next';
	import type { ContentBlock, ImageProperties } from '@/types/content-builder';

	defineProps<{
		block: ContentBlock;
		selectedBlockId: string | null;
		showWidthMenu: string | null;
		getWidthClass: (width: string) => string;
		selectBlock: (blockId: string) => void;
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
		changeBlockWidth: (blockId: string, width: ContentBlock['width']) => void;
		moveBlockUp: (blockId: string) => void;
		moveBlockDown: (blockId: string) => void;
	}>();

	const emit = defineEmits(['toggle-width-menu']);
</script>
