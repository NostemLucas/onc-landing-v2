<template>
	<div class="w-full">
		<label
			v-if="label"
			:for="id"
			class="text-foreground mb-2 block text-sm font-medium"
		>
			{{ label }}
		</label>
		<div class="relative">
			<div
				v-if="leadingIcon"
				class="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
			>
				<component :is="leadingIcon" class="h-4 w-4" />
			</div>
			<input
				:id="id"
				:type="type"
				:value="modelValue"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="readonly"
				:class="inputClasses"
				@input="
					$emit('update:modelValue', ($event.target as HTMLInputElement).value)
				"
				@blur="$emit('blur', $event)"
				@focus="$emit('focus', $event)"
			/>
			<div
				v-if="trailingIcon"
				class="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
			>
				<component :is="trailingIcon" class="h-4 w-4" />
			</div>
		</div>
		<p v-if="error" class="text-destructive mt-1 text-sm">{{ error }}</p>
		<p v-else-if="hint" class="text-muted-foreground mt-1 text-sm">
			{{ hint }}
		</p>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { tv } from 'tailwind-variants';
	import { twMerge } from 'tailwind-merge';

	const props = defineProps({
		modelValue: {
			type: [String, Number],
			default: '',
		},
		id: {
			type: String,
			default: () => `input-${Math.random().toString(36).substring(2, 9)}`,
		},
		label: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: 'text',
		},
		placeholder: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
		error: {
			type: String,
			default: '',
		},
		hint: {
			type: String,
			default: '',
		},
		leadingIcon: {
			type: Object,
			default: null,
		},
		trailingIcon: {
			type: Object,
			default: null,
		},
		size: {
			type: String as () => 'sm' | 'md' | 'lg',
			default: 'md',
		},
		class: {
			type: String,
			default: '',
		},
	});

	defineEmits(['update:modelValue', 'blur', 'focus']);

	const input = tv({
		base: 'flex w-full rounded-md border border-input bg-background text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		variants: {
			size: {
				sm: 'h-8 text-xs px-3 py-1',
				md: 'h-10 px-4 py-2',
				lg: 'h-12 text-base px-6 py-3',
			},
			withLeadingIcon: {
				true: 'pl-10',
			},
			withTrailingIcon: {
				true: 'pr-10',
			},
			error: {
				true: 'border-destructive focus-visible:ring-destructive',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	});

	const inputClasses = computed(() => {
		return twMerge(
			input({
				size: props.size,
				withLeadingIcon: !!props.leadingIcon,
				withTrailingIcon: !!props.trailingIcon,
				error: !!props.error,
			}),
			props.class
		);
	});
</script>
