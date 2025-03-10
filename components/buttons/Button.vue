<script lang="ts" setup>
	import { tv } from 'tailwind-variants';
	import { twMerge } from 'tailwind-merge';

	const props = defineProps<{
		variant?: 'text' | 'contained' | 'outlined';
		size?: 'sm' | 'lg';
		label: string;
		class?: string;
	}>();

	const buttonClasses = tv({
		base: 'px-6 py-2 transition duration-300 ease-in-out rounded cursor-pointer',
		variants: {
			variant: {
				text: 'text-primary hover:text-white',
				contained: 'bg-gray-500 text-black',
				outlined:
					'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-4 border border-blue-500 hover:border-transparent rounded',
			},
			size: {
				sm: 'text-sm',
				lg: 'text-lg',
			},
		},
		defaultVariants: {
			variant: 'text',
			size: 'sm',
		},
	});
</script>

<template>
	<button
		:class="
			twMerge(
				buttonClasses({ variant: props.variant, size: props.size }),
				props.class
			)
		"
	>
		{{ props.label }}
	</button>
</template>
