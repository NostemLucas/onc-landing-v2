<script setup lang="ts">
	import { computed, ref } from 'vue';
	import type { TableColumn } from '@nuxt/ui';
	import { numberLiteral } from '~/utils/cadena';
	import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
	import { LimitItems } from '~/types/datatable.type';
	import SkeletonTable from './SkeletonTable.vue';
	import { useDebounceFn } from '@vueuse/core';

	const props = defineProps<{
		data: any[];
		columns: TableColumn<any>[];
		title?: string;
		subtitle?: string;
		secondaryTitle?: string;
		loading: boolean;
		limit: number;
		total: number;
		page: number;

		filtro: string;
	}>();

	const table = useTemplateRef('table');

	const emits = defineEmits<{
		'update:limit': [elem: number];
		'update:page': [page: number];
		'update:filtro': [texto: string];
	}>();

	const pagination = ref({
		pageIndex: 0,
		pageSize: 7,
	});

	const currentPage = computed(() => props.page);

	const totalPages = computed(() => Math.ceil(props.total / props.limit));

	const handlePageChange = (page: number) => {
		pagination.value.pageIndex = page - 1;
		emits('update:page', page);
	};

	const limiteModel = computed({
		get: () => props.limit,
		set: (val) => {
			emits('update:page', 1);
			emits('update:limit', val);
		},
	});

	const debounceFiltroData = useDebounceFn((valor: string) => {
		emits('update:filtro', valor);
	}, 1000);

	defineExpose({
		pagination,
	});
</script>

<template>
	<div class="p-2">
		<div v-if="title" class="flex justify-between items-center mb-4">
			<div class="flex flex-col">
				<h2 class="text-xl">{{ title }}</h2>
				<h1 v-if="subtitle" class="text-lg text-gray-600">{{ subtitle }}</h1>
			</div>

			<slot name="actions" />
		</div>
		<div class="my-4 w-full flex justify-between items-center">
			<div class="flex gap-1">
				<UInput
					icon="i-lucide-search"
					:value="filtro"
					placeholder="Buscar..."
					@input="debounceFiltroData($event.target.value)"
					class="w-96"
				/>
				<slot name="filters" />
			</div>

			<UDropdownMenu
				:items="
					table?.tableApi
						?.getAllColumns()
						.filter((column) => column.getCanHide())
						.map((column) => ({
							label: column.id,
							type: 'checkbox' as const,
							checked: column.getIsVisible(),
							onUpdateChecked(checked: boolean) {
								table?.tableApi
									?.getColumn(column.id)
									?.toggleVisibility(!!checked);
							},
							onSelect(e?: Event) {
								e?.preventDefault();
							},
						}))
				"
				:content="{ align: 'end' }"
			>
				<UButton
					label="Filtrar"
					color="neutral"
					variant="outline"
					trailing-icon="i-lucide-settings-2"
				/>
			</UDropdownMenu>
		</div>
		<div class="font-sans rounded-lg shadow-sm bg-white overflow-hidden">
			<div class="overflow-x-auto">
				<SkeletonTable v-if="loading" :columns="columns" />

				<UTable
					ref="table"
					v-else
					:data="data"
					:columns="columns"
					:class="[
						'w-full [&_th]:text-left [&_th]:py-3 [&_th]:px-4 [&_th]:font-medium [&_th]:text-gray-600 [&_th]:border-b [&_th]:border-gray-200 [&_th]:bg-gray-50',
						'[&_td]:py-4 [&_td]:px-4 [&_td]:border-b [&_td]:border-gray-200 [&_td]:text-gray-800',
						'[&_tr:hover]:bg-gray-50 [&_tr:last-child_td]:border-b-0',
					]"
				>
					<template #empty>
						<tr class="w-full py-8 flex justify-center">Sin registros</tr>
					</template>
				</UTable>
			</div>

			<div
				v-if="!loading && data.length > 0"
				class="flex justify-between items-center p-3 text-sm"
			>
				<p>
					Mostrando:
					<span class="font-semibold">{{ data.length }}</span>
					&nbsp;de&nbsp;
					<span class="font-semibold">{{ numberLiteral(total) }}</span>
				</p>
				<div class="flex gap-12">
					<!-- Paginación -->
					<div class="flex items-center gap-2">
						<UButton
							color="neutral"
							variant="soft"
							class="cursor-pointer border-slate-400"
							:disabled="currentPage === 1"
							@click="handlePageChange(currentPage - 1)"
						>
							<ChevronLeft :size="18" />
						</UButton>
						<div class="flex items-center gap-1">
							<UButton
								v-for="page in Math.min(5, totalPages)"
								:key="page"
								:color="page === currentPage ? 'info' : 'neutral'"
								variant="soft"
								class="cursor-pointer"
								@click="handlePageChange(page)"
							>
								{{ page }}
							</UButton>
							<span v-if="totalPages > 5" class="mx-1">...</span>
							<UButton
								v-if="totalPages > 5"
								:color="currentPage === totalPages ? 'info' : 'neutral'"
								variant="soft"
								class="cursor-pointer"
								@click="handlePageChange(totalPages)"
							>
								{{ totalPages }}
							</UButton>
						</div>
						<UButton
							color="neutral"
							variant="soft"
							:disabled="currentPage === totalPages"
							class="cursor-pointer border-slate-400"
							@click="handlePageChange(currentPage + 1)"
						>
							<ChevronRight :size="18" />
						</UButton>
					</div>
					<!-- Limite -->
					<div class="flex items-center gap-2">
						<span>Limite</span>
						<USelect
							v-model="limiteModel"
							class="w-20 shadow-md"
							:items="LimitItems"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
