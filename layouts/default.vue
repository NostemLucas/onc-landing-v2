<script setup lang="ts">
	import HeroDrawerIcons from '~/components/landing/HeroDrawerIcons.vue';
	import HeroClient from '~/components/landing/HeroClient.vue';
	import HeroFooter from '~/components/landing/HeroFooter.vue';
</script>
<template>
	<div>
		<HeroClient />
		<div>
			<slot />
		</div>
		<HeroFooter />
	</div>
</template>
