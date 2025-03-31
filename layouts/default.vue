<script setup lang="ts">
	import HeroClient from '~/components/landing/HeroClient.vue';
	import NaviagtionBar from '~/components/landing/NaviagtionBar.vue';
	import HeroFooter from '~/components/landing/HeroFooter.vue';
</script>
<template>
	<div>
		<NaviagtionBar />
		<div>
			<slot />
		</div>
		<HeroFooter />
	</div>
</template>
