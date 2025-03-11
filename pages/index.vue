<script setup lang="ts">
	import HeroFooter from '~/components/landing/HeroFooter.vue';
	import HeroDrawer from '~/components/landing/HeroDrawer.vue';
	import TreatmentCards from '~/components/landing/TreatmentCards.vue';
	import HeroAbout from '~/components/landing/HeroAbout.vue';
	import HeroCards from '~/components/landing/HeroCards.vue';
	import HeroBanner from '~/components/landing/HeroBanner.vue';
	import HeroCarrousel from '~/components/landing/HeroCarrousel.vue';
	import HeroDrawerIcons from '~/components/landing/HeroDrawerIcons.vue';
	import MapCard from '~/components/views/MapCard.vue';
</script>

<template>
	<section class="">
		<HeroDrawerIcons />
		<HeroBanner />
		<HeroCards />
		<TreatmentCards />
		<HeroCarrousel />
		<HeroAbout />
		<HeroFooter />

		<MapCard />
	</section>
</template>

<style scoped></style>
