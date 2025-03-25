<template>
	<div
		class="group relative h-[26em] overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-2xl"
	>
		<!-- Fondo hexagonal con patrón -->
		<div class="absolute inset-0 z-0 opacity-10">
			<div class="hexagon-pattern"></div>
		</div>

		<!-- Imagen de fondo -->
		<div class="absolute inset-0 z-0">
			<NuxtImg
				:src="diagnostico.image"
				:alt="`Imagen de ${diagnostico.title}`"
				draggable="false"
				format="webpm"
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				loading="lazy"
			/>
		</div>

		<!-- Gradiente personalizado -->
		<div
			class="absolute inset-0 z-10 bg-gradient-to-br opacity-90 transition-opacity duration-500 group-hover:opacity-95"
			:class="diagnostico.color"
		></div>

		<!-- Círculo decorativo -->
		<div
			class="absolute -top-20 -right-20 z-10 h-40 w-40 rounded-full bg-white opacity-10"
		></div>
		<div
			class="absolute -bottom-20 -left-20 z-10 h-40 w-40 rounded-full bg-white opacity-10"
		></div>

		<!-- Contenido -->
		<div
			class="absolute inset-0 z-20 flex flex-col justify-between p-6 text-white"
		>
			<div class="flex items-start justify-between">
				<div
					class="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
				>
					<Icon :name="diagnostico.icon" size="28" class="text-white" />
				</div>

				<div
					class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
				>
					<Icon
						name="mdi:arrow-top-right"
						size="20"
						class="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					/>
				</div>
			</div>

			<div class="mt-auto">
				<h3 class="mb-3 text-2xl font-bold text-white">
					{{ diagnostico.title }}
				</h3>

				<p class="line-clamp-3 text-sm font-light text-white/90">
					{{ diagnostico.description }}
				</p>

				<div
					class="mt-6 transform transition-transform duration-300 group-hover:translate-y-0"
					:class="{ 'translate-y-10': !isHovered }"
				>
					<NuxtLink
						:to="`/diagnosticos#${diagnostico.id}`"
						class="inline-flex items-center rounded-full bg-white/20 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
					>
						Conocer más
						<Icon name="mdi:arrow-right" class="ml-2" size="16" />
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, onUnmounted } from 'vue';

	const props = defineProps({
		diagnostico: {
			type: Object,
			required: true,
		},
	});

	const isHovered = ref(false);

	// Detectar si es dispositivo móvil para mostrar siempre el botón en móviles
	const isMobile = ref(false);

	const checkMobile = () => {
		isMobile.value = window.innerWidth < 768;
		if (isMobile.value) {
			isHovered.value = true;
		}
	};

	onMounted(() => {
		checkMobile();
		window.addEventListener('resize', checkMobile);
	});

	onUnmounted(() => {
		window.removeEventListener('resize', checkMobile);
	});
</script>

<style scoped>
	.hexagon-pattern {
		background-color: transparent;
		background-image:
			repeating-linear-gradient(
				120deg,
				rgba(255, 255, 255, 0.1),
				rgba(255, 255, 255, 0.1) 1px,
				transparent 1px,
				transparent 60px
			),
			repeating-linear-gradient(
				60deg,
				rgba(255, 255, 255, 0.1),
				rgba(255, 255, 255, 0.1) 1px,
				transparent 1px,
				transparent 60px
			),
			linear-gradient(
				60deg,
				rgba(255, 255, 255, 0.1) 25%,
				transparent 25%,
				transparent 75%,
				rgba(255, 255, 255, 0.1) 75%,
				rgba(255, 255, 255, 0.1)
			),
			linear-gradient(
				120deg,
				rgba(255, 255, 255, 0.1) 25%,
				transparent 25%,
				transparent 75%,
				rgba(255, 255, 255, 0.1) 75%,
				rgba(255, 255, 255, 0.1)
			);
		background-size: 70px 120px;
		height: 100%;
		width: 100%;
	}
</style>
