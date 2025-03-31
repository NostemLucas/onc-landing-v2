<template>
	<div class="relative w-full overflow-hidden">
		<!-- Background Video sin transición -->
		<div
			class="relative aspect-[3/4] max-h-[600px] w-full bg-gray-900 md:aspect-auto md:max-h-[650px]"
		>
			<video
				ref="backgroundVideoRef"
				class="aspect-[3/4] max-h-[600px] w-full bg-black object-cover md:aspect-auto md:max-h-[650px] md:w-full"
				loop
				muted
				autoplay
				playsinline
				poster="~/assets/media/banner.png"
			>
				<source src="~/assets/media/video.webm" type="video/webm" />
				Tu navegador no soporta el formato de video.
			</video>
		</div>

		<!-- Gradient overlays mejorados -->
		<div
			class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 animate-gradient"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"
		/>

		<!-- Content Container con mejor espaciado -->
		<div
			class="px-6 lg:container w-full m-auto absolute inset-x-0 bottom-20 md:bottom-24"
		>
			<div class="h-auto max-w-4xl">
				<!-- Main Heading con animaciones mejoradas -->
				<h1
					class="font-horsham mb-8 text-4xl leading-tight tracking-wide text-white md:mb-10 md:text-5xl lg:mb-12 lg:text-7xl text-glow animate-title-reveal"
				>
					Transformando el cuidado de tu salud
				</h1>

				<!-- Action Buttons con efectos mejorados -->
				<div
					class="flex flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-8 animate-buttons-reveal"
				>
					<!-- Appointment Button con efecto mejorado -->
					<NuxtLink
						to="#"
						class="group flex items-center text-lg text-white transition duration-300 ease-in-out md:text-xl lg:text-2xl hover:text-glow"
					>
						<span
							class="relative border-b-2 border-transparent transition-all group-hover:border-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 group-hover:after:w-full"
						>
							Pedir una cita
						</span>
						<ChevronRight
							class="ml-3 h-6 w-6 transition duration-300 ease-in-out transform group-hover:translate-x-2 group-hover:scale-110"
						/>
					</NuxtLink>

					<!-- Play Video Button con efecto de brillo -->
					<UButton
						class="px-8 py-4 text-white text-2xl ring-white rounded-full ring-2 hover:bg-white/10 transition-all duration-300 button-glow"
						@click="openVideoModal"
						icon="i-lucide-play"
						label="Ver Presentación"
						variant="outline"
						size="xl"
					/>
				</div>
			</div>
		</div>

		<!-- Video Modal con animación de carga mejorada -->
		<Transition name="fade">
			<div
				v-if="isVideoModalOpen"
				class="fixed inset-0 z-50 flex items-center justify-center"
				@click="closeVideoModal"
			>
				<!-- Backdrop con blur mejorado -->
				<div class="absolute inset-0 bg-black/70"></div>

				<!-- Modal Content -->
				<div
					ref="modalContainer"
					class="relative z-10 w-full max-w-5xl overflow-hidden rounded-xl bg-black shadow-xl transition-all duration-500"
					:class="{
						'scale-100 opacity-100': videoReady,
						'scale-95 opacity-0': !videoReady,
					}"
					@click.stop
				>
					<!-- Close Button -->
					<button
						class="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2.5 text-white transition-all duration-300 hover:bg-white hover:text-black"
						aria-label="Cerrar video"
						@click.stop="closeVideoModal"
					>
						<X class="h-5 w-5" />
					</button>

					<!-- Video Container con estado de carga mejorado -->
					<div class="relative aspect-video w-full bg-black">
						<!-- Indicador de carga avanzado para el video modal -->
						<div
							v-if="!videoReady"
							class="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-gray-900/80"
						>
							<!-- Animación de carga personalizada -->
							<div class="video-loading-container">
								<div class="video-loading-bar"></div>
								<div class="video-loading-bar"></div>
								<div class="video-loading-bar"></div>
								<div class="video-loading-bar"></div>
							</div>
							<div class="text-white text-lg font-medium mt-4">
								Cargando presentación...
							</div>

							<!-- Simulación visual del video -->
							<div class="absolute inset-0 flex items-center justify-center">
								<div
									class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 opacity-50 animate-pulse"
								>
									<div
										class="absolute inset-0 flex items-center justify-center"
									>
										<div
											class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center"
										>
											<Play class="h-10 w-10 text-white/70" />
										</div>
									</div>
								</div>
							</div>

							<!-- Barra de progreso -->
							<div
								class="absolute bottom-8 left-0 right-0 mx-auto w-3/4 h-2 bg-gray-700 rounded-full overflow-hidden"
							>
								<div
									class="h-full bg-white rounded-full loading-progress-bar"
									:style="{ width: `${loadingProgress}%` }"
								></div>
							</div>
						</div>

						<!-- Video Element con carga optimizada -->
						<video
							ref="modalVideoRef"
							class="h-full w-full"
							@canplay="videoReady = true"
							@click="togglePlayPause"
							@loadeddata="updateLoadingProgress(50)"
							@canplaythrough="updateLoadingProgress(100)"
							@progress="updateLoadingProgress"
							controls
							preload="metadata"
						>
							<source src="~/assets/media/presentation.mp4" type="video/mp4" />
							Tu navegador no soporta el formato de video.
						</video>

						<!-- Indicador de Play/Pause mejorado -->
						<Transition name="scale">
							<div
								v-if="showPlayPauseIndicator"
								class="pointer-events-none absolute inset-0 flex items-center justify-center"
							>
								<div
									class="rounded-full bg-black/40 p-8 backdrop-blur-sm transform transition-transform duration-300"
								>
									<component
										:is="isPlaying ? Pause : Play"
										class="h-14 w-14 text-white"
									/>
								</div>
							</div>
						</Transition>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
	import { ChevronRight, Play, Pause, X } from 'lucide-vue-next';

	// Video references
	const backgroundVideoRef = ref<HTMLVideoElement | null>(null);
	const modalVideoRef = ref<HTMLVideoElement | null>(null);
	const modalContainer = ref<HTMLElement | null>(null);

	// Modal state
	const isVideoModalOpen = ref<boolean>(false);
	const videoReady = ref<boolean>(false);
	const isPlaying = ref<boolean>(false);
	const showPlayPauseIndicator = ref<boolean>(false);
	const loadingProgress = ref<number>(0);

	// Body scroll lock state
	let originalBodyStyle = {
		overflow: '',
		paddingRight: '',
	};

	// Actualizar progreso de carga
	const updateLoadingProgress = (event) => {
		if (typeof event === 'number') {
			loadingProgress.value = event;
			return;
		}

		if (modalVideoRef.value) {
			try {
				// Calcular progreso basado en buffered ranges
				if (modalVideoRef.value.buffered.length > 0) {
					const bufferedEnd = modalVideoRef.value.buffered.end(0);
					const duration = modalVideoRef.value.duration;
					if (duration > 0) {
						loadingProgress.value = Math.round((bufferedEnd / duration) * 100);
					}
				}
			} catch (e) {
				console.error('Error al calcular progreso:', e);
			}
		}

		// Simular progreso si no hay datos reales
		if (loadingProgress.value < 20) {
			loadingProgress.value += 5;
		}
	};

	// Toggle play/pause con animación mejorada
	const togglePlayPause = (): void => {
		if (!modalVideoRef.value) return;

		if (modalVideoRef.value.paused) {
			modalVideoRef.value.play();
			isPlaying.value = true;
		} else {
			modalVideoRef.value.pause();
			isPlaying.value = false;
		}

		// Mostrar indicador de play/pause
		showPlayPauseIndicator.value = true;
		setTimeout(() => {
			showPlayPauseIndicator.value = false;
		}, 1000);
	};

	// Abrir modal de video con carga optimizada
	const openVideoModal = (): void => {
		isVideoModalOpen.value = true;
		videoReady.value = false;
		isPlaying.value = false;
		loadingProgress.value = 0;
		lockScroll(true);

		// Iniciar simulación de progreso
		const progressInterval = setInterval(() => {
			if (loadingProgress.value < 90 && !videoReady.value) {
				loadingProgress.value += Math.random() * 5;
			} else {
				clearInterval(progressInterval);
			}
		}, 500);

		// Reproducir el video modal después de un breve retraso
		setTimeout(() => {
			if (modalVideoRef.value) {
				if (modalVideoRef.value.canPlayType('video/mp4')) {
					modalVideoRef.value
						.play()
						.then(() => {
							isPlaying.value = true;
						})
						.catch((error) => {
							console.error('Error playing video:', error);
						});
				}
			}
		}, 300);
	};

	// Cerrar modal de video
	const closeVideoModal = (): void => {
		if (modalVideoRef.value) {
			modalVideoRef.value.pause();
			// Resetear posición del video para la próxima visualización
			modalVideoRef.value.currentTime = 0;
		}

		isVideoModalOpen.value = false;
		lockScroll(false);
	};

	// Bloquear/desbloquear scroll del body
	const lockScroll = (lock: boolean): void => {
		if (lock) {
			// Guardar estilos actuales del body
			originalBodyStyle = {
				overflow: document.body.style.overflow,
				paddingRight: document.body.style.paddingRight,
			};

			// Calcular ancho de la barra de desplazamiento
			const scrollbarWidth =
				window.innerWidth - document.documentElement.clientWidth;

			// Bloquear scroll
			document.body.style.overflow = 'hidden';
			if (scrollbarWidth > 0) {
				document.body.style.paddingRight = `${scrollbarWidth}px`;
			}
		} else {
			// Restaurar estilos originales del body
			document.body.style.overflow = originalBodyStyle.overflow;
			document.body.style.paddingRight = originalBodyStyle.paddingRight;
		}
	};

	// Manejar tecla escape para cerrar modal
	const handleKeyDown = (event: KeyboardEvent): void => {
		if (!isVideoModalOpen.value) return;

		if (event.key === 'Escape') {
			closeVideoModal();
		}
	};

	// Lifecycle hooks
	onMounted(() => {
		window.addEventListener('keydown', handleKeyDown);
	});

	onUnmounted(() => {
		window.removeEventListener('keydown', handleKeyDown);

		// Asegurar que el scroll se restaura
		document.body.style.overflow = '';
		document.body.style.paddingRight = '';
	});
</script>

<style scoped>
	/* Transiciones básicas */
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.4s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.scale-enter-active,
	.scale-leave-active {
		transition: all 0.3s ease;
	}

	.scale-enter-from,
	.scale-leave-to {
		opacity: 0;
		transform: scale(0.8);
	}

	/* Efectos de texto y botones */
	.text-glow {
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	}

	.button-glow {
		box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
		transition: all 0.3s ease;
	}

	.button-glow:hover {
		box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
		transform: scale(1.03);
	}

	/* Animaciones para el banner */
	.animate-title-reveal {
		animation: titleReveal 1s ease-out forwards;
	}

	.animate-buttons-reveal {
		animation: buttonsReveal 1s ease-out 0.3s forwards;
		opacity: 0;
	}

	.animate-gradient {
		animation: gradientPulse 8s ease-in-out infinite;
	}

	@keyframes titleReveal {
		0% {
			opacity: 0;
			transform: translateY(30px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes buttonsReveal {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes gradientPulse {
		0%,
		100% {
			opacity: 0.9;
		}
		50% {
			opacity: 0.7;
		}
	}

	/* Animación de carga para el video modal */
	.video-loading-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
	}

	.video-loading-bar {
		background-color: white;
		height: 30px;
		width: 6px;
		margin: 0 3px;
		border-radius: 10px;
		animation: loading-bar-animation 1.2s ease-in-out infinite;
	}

	.video-loading-bar:nth-child(1) {
		animation-delay: 0s;
	}

	.video-loading-bar:nth-child(2) {
		animation-delay: 0.2s;
	}

	.video-loading-bar:nth-child(3) {
		animation-delay: 0.4s;
	}

	.video-loading-bar:nth-child(4) {
		animation-delay: 0.6s;
	}

	@keyframes loading-bar-animation {
		0% {
			transform: scaleY(0.5);
			opacity: 0.5;
		}
		50% {
			transform: scaleY(1);
			opacity: 1;
		}
		100% {
			transform: scaleY(0.5);
			opacity: 0.5;
		}
	}

	/* Barra de progreso de carga */
	.loading-progress-bar {
		transition: width 0.5s ease;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.7) 0%,
			rgba(255, 255, 255, 1) 100%
		);
	}
</style>
