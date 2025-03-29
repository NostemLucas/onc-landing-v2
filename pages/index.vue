<script setup lang="ts">
	import Diagnostico from '~/components/landing/Diagnostico.vue';
	import HeroAbout from '~/components/landing/HeroAbout.vue';
	import HeroBanner from '~/components/landing/HeroBanner.vue';
	import HeroCards from '~/components/landing/HeroCards.vue';
	import HeroCarrousel from '~/components/landing/HeroCarrousel.vue';
	import TreatmentCards from '~/components/landing/TreatmentCards.vue';
</script>

<template>
	<section class="">
		<HeroBanner />
		<HeroCards />
		<TreatmentCards />
		<Diagnostico />
		<HeroCarrousel />
		<HeroAbout />
	</section>
</template>

<style scoped></style>
