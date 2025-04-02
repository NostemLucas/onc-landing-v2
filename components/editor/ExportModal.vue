<template>
	<div
		v-if="showExportModal"
		class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
	>
		<div
			class="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto"
		>
			<div class="p-6">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-xl font-bold">Código Vue</h2>
					<button
						@click="$emit('close')"
						class="text-gray-500 hover:text-gray-700"
					>
						<X class="h-5 w-5" />
					</button>
				</div>

				<div class="mb-4">
					<p class="mb-2">
						Contenido autogenerado para renderizar este contenido como una
						página nueva en Vue 3:
					</p>
					<div
						class="bg-gray-800 text-white p-4 rounded-md overflow-auto max-h-[400px]"
					>
						<pre><code>{{ generatedVueCode }}</code></pre>
					</div>
				</div>

				<div class="flex justify-between">
					<button
						@click="copyVueCode"
						class="py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center gap-2"
					>
						<ClipboardCopy class="h-4 w-4" />
						{{ codeCopied ? 'Copiado!' : 'Copiar Código' }}
					</button>
					<button
						@click="downloadVueFile"
						class="py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2"
					>
						<Download class="h-4 w-4" />
						Descargar .vue
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { X, ClipboardCopy, Download } from 'lucide-vue-next';

	defineProps<{
		showExportModal: boolean;
		generatedVueCode: string;
		codeCopied: boolean;
		copyVueCode: () => void;
		downloadVueFile: () => void;
	}>();

	defineEmits(['close']);
</script>
