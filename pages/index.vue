<template>
	<div class="bg-background text- container">
		<Button label="label">
			<template #icon-right><LucideGithub /></template>
		</Button>
		<Button variant="contained" rounded label="secondary">
			<template #icon-right><LucideGithub /></template>
		</Button>
		<Button variant="outlined" rounded label="outlined">
			<template #icon-left><LucideGithub /></template>
		</Button>
	</div>
</template>
<script setup>
	import Button from '@/components/buttons/Button.vue';
	import { LucideGithub } from '#components';
	const functioa = () => {
		console.log('clicked');
	};
</script>
