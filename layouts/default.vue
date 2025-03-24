<script setup lang="ts">
	import HeroDrawerIcons from '~/components/landing/HeroDrawerIcons.vue';
	import HeroClient from '~/components/landing/HeroClient.vue';
</script>
<template>
	<div>
		<HeroClient />
		<div>
			<slot />
		</div>
	</div>
</template>
