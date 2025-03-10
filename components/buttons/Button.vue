<script lang="ts" setup>
	import { tv } from 'tailwind-variants';
	import { twMerge } from 'tailwind-merge';

	const props = defineProps<{
		variant?: 'text' | 'contained' | 'outlined';
		size?: 'sm' | 'lg';
		label: string;
		class?: string;
		rounded?: boolean;
	}>();

	const buttonClasses = tv({
		base: 'px-6 py-2 duration-500 transition-colors ease-in-out rounded cursor-pointer flex flex-row items-center justify-center gap-1 ',
		variants: {
			variant: {
				text: 'text-primary focus:bg-primary/20 ',
				contained: 'bg-primary text-white hover:bg-secondary focus:opacity-80',
				outlined:
					'bg-transparent hover:bg-primary text-primary font-semibold hover:text-white border border-primary hover:border-transparent active:bg-secondary/90 active:text-white ',
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
				props.class,
				rounded && 'rounded-full'
			)
		"
	>
		<slot name="icon-left" />
		{{ props.label }}
		<slot name="icon-right" />
	</button>
</template>
