<script lang="ts" setup>
	import { tv } from 'tailwind-variants';
	import { twMerge } from 'tailwind-merge';
	import { defineProps } from 'vue';

	// Define las props
	const props = defineProps<{
		variant?: 'primary' | 'secondary';
		size?: 'sm' | 'lg';
		text: string;
		class?: string;
	}>();

	const button = tv({
		base: 'px-4 py-2 font-bold',
		variants: {
			variant: {
				primary: 'bg-blue-500 text-white',
				secondary: 'bg-gray-500 text-black',
			},
			size: {
				sm: 'text-sm',
				lg: 'text-lg',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'sm',
		},
	});
</script>

<template>
	<button
		:class="
			twMerge(button({ variant: props.variant, size: props.size }), props.class)
		"
	>
		{{ props.text }}
	</button>
</template>
