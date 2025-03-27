<template>
	<div
		class="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
	>
		<!-- Patrones decorativos-->
		<div
			class="pointer-events-none absolute inset-0 overflow-hidden opacity-5 dark:opacity-10"
		>
			<div class="bg-grid-pattern absolute top-0 left-0 h-full w-full" />
		</div>

		<!-- Formas decorativas -->
		<div
			class="bg-primary-500 absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-10 blur-3xl"
		/>

		<div
			class="bg-primary-600 absolute -bottom-32 -left-32 h-96 w-96 rounded-full opacity-10 blur-3xl"
		/>

		<div class="relative z-10 container mx-auto max-w-6xl px-6 py-12">
			<div
				class="flex flex-col items-center justify-between gap-12 md:flex-row"
			>
				<!-- Contenido textual -->
				<div class="w-full space-y-8 lg:w-1/2">
					<div class="group relative">
						<div
							class="from-primary-400 to-primary-600 dark:from-primary-300 dark:to-primary-500 animate-pulse-slow bg-gradient-to-r bg-clip-text text-9xl font-black text-transparent"
						>
							404
						</div>
						<div
							class="from-primary-400 absolute -bottom-4 left-1 h-1 w-0 rounded-full bg-gradient-to-r to-transparent transition-all duration-700 ease-in-out group-hover:w-full"
						/>
						<div
							class="text-primary-500/5 dark:text-primary-500/10 absolute -top-2 -left-4 -z-10 text-[10rem] font-black select-none"
						>
							404
						</div>
					</div>

					<h1
						class="text-2xl leading-tight font-light text-gray-800 transition-all duration-300 md:text-3xl dark:text-gray-200"
					>
						<span class="border-primary-500 border-b-2 pb-1 font-medium">
							Lo sentimos
						</span>
						, no pudimos encontrar la página que estás buscando
					</h1>

					<p
						class="max-w-lg rounded-lg border border-gray-200 bg-white/30 p-4 text-gray-600 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/30 dark:text-gray-400"
					>
						La página que intentas visitar puede haber sido movida, eliminada o
						temporalmente no disponible. Por favor, verifica la URL o regresa a
						la página principal.
					</p>

					<div class="flex flex-wrap gap-4 pt-4">
						<NuxtLink
							to="/"
							class="group from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 hover:shadow-primary-500/30 focus:ring-primary-500 focus:ring-opacity-50 transform rounded-lg bg-gradient-to-r px-6 py-3 text-base font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 focus:ring-2 focus:outline-none"
						>
							<span class="flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2"
									/>
								</svg>
								<span>Volver a Principal</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-0 w-0 opacity-0 transition-all duration-300 group-hover:h-5 group-hover:w-5 group-hover:opacity-100"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</span>
						</NuxtLink>

						<button
							@click="goBack"
							class="group text-primary-600 dark:text-primary-400 border-primary-200 dark:border-primary-800 focus:ring-primary-500 focus:ring-opacity-50 transform rounded-lg border bg-white px-6 py-3 text-base font-medium shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50 focus:ring-2 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700"
						>
							<span class="flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 19l-7-7m0 0l7-7m-7 7h18"
									/>
								</svg>
								Regresar
							</span>
						</button>
					</div>

					<!-- Contador de redirección -->
					<div
						v-if="showCountdown"
						class="mt-8 rounded-lg border border-gray-200 bg-gray-100 p-4 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800"
					>
						<p class="text-sm text-gray-600 dark:text-gray-400">
							Redirección a la página principal en
							<span class="text-primary-600 dark:text-primary-400 font-bold">
								{{ countdown }}
							</span>
							segundos...
							<button
								@click="cancelRedirect"
								class="hover:text-primary-500 ml-2 text-xs text-gray-500 underline transition-colors"
							>
								Cancelar
							</button>
						</p>
						<div
							class="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
						>
							<div
								class="bg-primary-500 h-full rounded-full transition-all duration-1000 ease-linear"
								:style="{ width: `${(10 - countdown) * 10}%` }"
							/>
						</div>
					</div>
				</div>

				<!-- Ilustración con efectos -->
				<div class="flex w-full justify-center lg:w-1/2 lg:justify-end">
					<div class="group perspective-1000 relative">
						<div
							class="transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-y-6"
						>
							<NuxtImg
								src="/404-ligth.svg"
								class="h-auto max-w-full drop-shadow-xl dark:hidden"
								alt="Página no encontrada"
								loading="eager"
							/>
							<NuxtImg
								src="/404-dark.svg"
								class="hidden h-auto max-w-full drop-shadow-xl dark:block"
								alt="Página no encontrada"
								loading="eager"
							/>

							<!-- Efecto de brillo en hover -->
							<div
								class="from-primary-500/0 via-primary-500/20 to-primary-500/0 pointer-events-none absolute inset-0 bg-gradient-to-tr opacity-0 transition-opacity duration-700 group-hover:opacity-100"
							/>

							<!-- Efecto de sombra -->
							<div
								class="absolute -bottom-6 left-1/2 h-8 w-4/5 -translate-x-1/2 scale-x-110 transform rounded-full bg-black/20 blur-xl transition-all duration-500 group-hover:scale-x-125 dark:bg-black/40"
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- Pie de página con información adicional -->
			<div class="mt-16 border-t border-gray-200 pt-8 dark:border-gray-700">
				<div
					class="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row dark:text-gray-400"
				>
					<p>
						© {{ new Date().getFullYear() }} Codex. Todos los derechos
						reservados.
					</p>
					<div class="flex gap-6">
						<a href="#" class="hover:text-primary-500 transition-colors">
							Ayuda
						</a>
						<a href="#" class="hover:text-primary-500 transition-colors">
							Contacto
						</a>
						<a href="#" class="hover:text-primary-500 transition-colors">
							Mapa del sitio
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

	// Tipos
	type CountdownTimer = ReturnType<typeof setInterval> | null;

	// Estado reactivo
	const countdown = ref<number>(10);
	const showCountdown = ref<boolean>(true);
	let countdownTimer: CountdownTimer = null;

	// Métodos
	const startCountdown = (): void => {
		countdownTimer = setInterval(() => {
			countdown.value--;
			if (countdown.value <= 0) {
				if (countdownTimer) clearInterval(countdownTimer);
				window.location.href = '/';
			}
		}, 1000);
	};

	const cancelRedirect = (): void => {
		if (countdownTimer) clearInterval(countdownTimer);
		showCountdown.value = false;
	};

	const goBack = (): void => {
		window.location.href = '/';
	};

	// Hooks de ciclo de vida
	onMounted(() => {
		startCountdown();
	});

	onBeforeUnmount(() => {
		if (countdownTimer) {
			clearInterval(countdownTimer);
		}
	});
</script>
<style scoped>
	.animate-pulse-slow {
		animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.8;
		}
	}

	.perspective-1000 {
		perspective: 1000px;
	}

	.rotate-y-6 {
		transform: rotateY(6deg);
	}

	.bg-grid-pattern {
		background-image:
			linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px),
			linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px);
		background-size: 20px 20px;
	}
</style>
