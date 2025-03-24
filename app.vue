<script setup lang="ts">
	import Toaster from '@nuxt/ui/runtime/components/Toaster.vue';
	import ResponsiveChip from './components/utils/ResponsiveChip.vue';
	const colorMode = useColorMode();
</script>
<template>
	<UApp>
		<NuxtLayout>
			<NuxtPage />
			<Toaster
				rich-colors
				position="top-right"
				:theme="colorMode.value === 'dark' ? 'dark' : 'light'"
			/>
			<ResponsiveChip />
		</NuxtLayout>
	</UApp>
</template>
