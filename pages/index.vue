<script setup lang="ts">
	import HeroFooter from '~/components/landing/HeroFooter.vue';
	import TreatmentCards from '~/components/landing/TreatmentCards.vue';
	import HeroAbout from '~/components/landing/HeroAbout.vue';
	import HeroCards from '~/components/landing/HeroCards.vue';
	import HeroBanner from '~/components/landing/HeroBanner.vue';
	import HeroCarrousel from '~/components/landing/HeroCarrousel.vue';
	import MapCard from '~/components/views/MapCard.vue';
</script>

<template>
	<section class="">
		<HeroBanner />
		<HeroCards />
		<TreatmentCards />
		<HeroCarrousel />
		<HeroAbout />
	</section>
</template>

<style scoped></style>
