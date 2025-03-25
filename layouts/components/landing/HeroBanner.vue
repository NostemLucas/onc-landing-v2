<template>
	<div class="relative w-full overflow-hidden">
		<!-- Background Video -->
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

		<!-- Gradient overlays -->
		<div
			class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"
		/>

		<!-- Content Container -->
		<div
			class="absolute inset-0 flex flex-col justify-end px-6 pb-10 md:px-10 md:pb-16 lg:px-14 xl:px-32 2xl:px-80"
		>
			<div class="max-w-3xl">
				<!-- Main Heading -->
				<h1
					class="font-horsham mb-6 text-4xl leading-tight tracking-wide text-white md:mb-8 md:text-5xl lg:mb-10 lg:text-7xl"
				>
					Transformando el cuidado de tu salud
				</h1>

				<!-- Action Buttons -->
				<div
					class="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6"
				>
					<!-- Appointment Button (Mejorado) -->
					<a
						href="#"
						class="group flex items-center text-lg text-white transition duration-300 ease-in-out md:text-xl lg:text-2xl"
					>
						<span
							class="relative border-b-2 border-transparent transition-all group-hover:border-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 group-hover:after:w-full"
						>
							Pedir una cita
						</span>
						<ChevronRight
							class="ml-2 h-6 w-6 transition duration-150 ease-in group-hover:translate-x-1"
						/>
					</a>

					<!-- Play Video Button (Mejorado) -->
					<button
						class="group relative flex cursor-pointer items-center space-x-3 overflow-hidden rounded-full border-2 border-white bg-transparent px-6 py-3 text-white transition-all duration-300 after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient-to-r after:from-white/30 after:to-transparent after:opacity-0 after:transition-all after:duration-500 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:after:translate-x-[100%] hover:after:opacity-100"
						@click="openVideoModal"
					>
						<Play
							class="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
						/>
						<span class="text-lg font-medium md:text-xl">Ver presentación</span>
					</button>
				</div>
			</div>
		</div>

		<!-- Enhanced Video Modal -->
		<Transition name="fade">
			<div
				v-if="isVideoModalOpen"
				class="fixed inset-0 z-50 flex items-center justify-center"
				@click="closeVideoModal"
			>
				<!-- Backdrop with blur effect -->
				<div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

				<!-- Modal Content -->
				<div
					ref="modalContainer"
					class="video-modal-container relative z-10 w-full max-w-5xl overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-all duration-500"
					:class="{
						'scale-100 opacity-100': videoReady,
						'scale-95 opacity-0': !videoReady,
					}"
					@click.stop
				>
					<!-- Video Header -->
					<div
						class="flex items-center justify-between border-b border-white/10 bg-black/40 px-6 py-4 backdrop-blur-md"
					>
						<div class="flex items-center space-x-3">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600"
							>
								<Film class="h-5 w-5 text-white" />
							</div>
							<div>
								<h3 class="text-lg font-medium text-white">
									Presentación OncoClinic
								</h3>
								<p class="text-sm text-gray-300">
									Descubre nuestra misión y servicios
								</p>
							</div>
						</div>

						<!-- Close Button -->
						<button
							class="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
							aria-label="Cerrar video"
							@click.stop="closeVideoModal"
						>
							<X class="h-5 w-5" />
						</button>
					</div>

					<!-- Video Container -->
					<div class="relative aspect-video w-full bg-black">
						<!-- Video Element -->
						<video
							ref="modalVideoRef"
							:class="{ 'cursor-pointer': !showControls }"
							class="h-full w-full"
							@timeupdate="updateProgress"
							@canplay="videoReady = true"
							@ended="videoEnded = true"
							@click="togglePlayPause"
						>
							<source src="~/assets/media/presentation.mp4" type="video/mp4" />
							Tu navegador no soporta el formato de video.
						</video>

						<!-- Play/Pause Overlay (shows briefly when clicking) -->
						<Transition name="fade-fast">
							<div
								v-if="showPlayPauseIndicator"
								class="absolute inset-0 flex items-center justify-center"
							>
								<div class="rounded-full bg-black/30 p-6 backdrop-blur-sm">
									<component
										:is="isPlaying ? Pause : Play"
										class="h-12 w-12 text-white"
									/>
								</div>
							</div>
						</Transition>

						<!-- Video Controls -->
						<div
							class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pt-10 pb-4 transition-opacity duration-300"
							:class="{
								'opacity-100': showControls,
								'opacity-0': !showControls && isPlaying,
							}"
							@mouseenter="showControls = true"
							@mouseleave="showControls = false"
						>
							<!-- Progress Bar (Mejorado para arrastrar) -->
							<div
								ref="progressBar"
								class="group relative mb-3 h-1.5 cursor-pointer rounded-full bg-white/30"
								@click="seekVideo"
								@mousedown="startDrag"
							>
								<div
									class="absolute inset-y-0 left-0 rounded-full bg-blue-600"
									:style="{ width: `${videoProgress}%` }"
								></div>
								<div
									class="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-blue-600 opacity-0 transition-opacity group-hover:opacity-100 hover:cursor-grab active:cursor-grabbing"
									:style="{ left: `${videoProgress}%` }"
									@mousedown.stop="startDrag"
								></div>
							</div>

							<!-- Controls Row -->
							<div class="flex items-center justify-between">
								<!-- Left Controls -->
								<div class="flex items-center space-x-4">
									<!-- Play/Pause Button -->
									<button
										class="rounded-full p-1 text-white transition-colors hover:bg-white/10"
										:aria-label="isPlaying ? 'Pausar' : 'Reproducir'"
										@click.stop="togglePlayPause"
									>
										<component :is="isPlaying ? Pause : Play" class="h-5 w-5" />
									</button>

									<!-- Volume Control (Mejorado) -->
									<div class="group relative flex items-center">
										<button
											class="rounded-full p-1 text-white transition-colors hover:bg-white/10"
											:aria-label="isMuted ? 'Activar sonido' : 'Silenciar'"
											@click.stop="toggleMute"
										>
											<component :is="volumeIcon" class="h-5 w-5" />
										</button>

										<!-- Volume Slider -->
										<div
											class="relative ml-1 h-6 w-0 opacity-0 transition-all duration-300 group-hover:w-16 group-hover:opacity-100"
										>
											<input
												v-model="volume"
												class="absolute top-1/2 h-6 w-16 -translate-y-1/2 cursor-pointer appearance-none bg-transparent p-0"
												type="range"
												min="0"
												max="1"
												step="0.01"
												@input="updateVolume"
											/>
											<div
												class="absolute top-1/2 h-1 w-16 -translate-y-1/2 rounded-full bg-white/30"
											>
												<div
													class="absolute inset-y-0 left-0 rounded-full bg-white/70"
													:style="{ width: `${volume * 100}%` }"
												></div>
											</div>
										</div>
									</div>

									<!-- Time Display -->
									<div class="text-sm text-white">
										<span>{{ formatTime(currentTime) }}</span>
										<span class="mx-1">/</span>
										<span>{{ formatTime(duration) }}</span>
									</div>
								</div>

								<!-- Right Controls -->
								<div class="flex items-center space-x-3">
									<!-- Playback Speed -->
									<div class="relative">
										<button
											@click.stop="toggleSpeedMenu"
											class="flex items-center rounded-full px-2 py-1 text-xs text-white transition-colors hover:bg-white/10"
										>
											{{ playbackSpeed }}x
											<ChevronDown
												class="ml-1 h-3 w-3 transition-transform duration-300"
												:class="{ 'rotate-180': showSpeedMenu }"
											/>
										</button>

										<!-- Speed Menu -->
										<Transition name="fade-up">
											<div
												v-if="showSpeedMenu"
												class="absolute right-0 bottom-full mb-2 rounded-lg bg-black/90 p-1 shadow-lg backdrop-blur-sm"
												@click.stop
											>
												<div class="flex flex-col">
													<button
														v-for="speed in [0.5, 0.75, 1, 1.25, 1.5, 2]"
														:key="speed"
														@click.stop="setPlaybackSpeed(speed)"
														class="rounded px-3 py-1.5 text-left text-xs whitespace-nowrap text-white transition-colors hover:bg-white/10"
														:class="{
															'bg-blue-600/50': playbackSpeed === speed,
														}"
													>
														{{ speed }}x
													</button>
												</div>
											</div>
										</Transition>
									</div>

									<!-- Fullscreen Button (Mejorado) -->
									<button
										@click.stop="toggleFullscreen"
										class="rounded-full p-1 text-white transition-colors hover:bg-white/10"
										:aria-label="
											isFullscreen
												? 'Salir de pantalla completa'
												: 'Pantalla completa'
										"
									>
										<component
											:is="isFullscreen ? Minimize2 : Maximize2"
											class="h-5 w-5"
										/>
									</button>
								</div>
							</div>
						</div>
					</div>

					<!-- Video Description -->
					<div
						class="border-t border-white/10 bg-black/40 px-6 py-4 backdrop-blur-md"
					>
						<div class="flex items-start space-x-4">
							<div class="flex-1">
								<h4 class="mb-1 text-lg font-medium text-white">
									Innovación en tratamientos oncológicos
								</h4>
								<p class="text-sm text-gray-300">
									Descubre cómo en OncoClinic estamos transformando el cuidado
									de la salud a través de tratamientos personalizados,
									tecnología de vanguardia y un equipo médico especializado
									comprometido con tu bienestar.
								</p>
							</div>
							<div>
								<button
									class="flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
									@click="shareVideo"
								>
									<Share2 class="mr-2 h-4 w-4" />
									Compartir
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
	import {
		ChevronRight,
		Play,
		Pause,
		X,
		Volume2,
		Volume1,
		VolumeX,
		Maximize2,
		Minimize2,
		Film,
		ChevronDown,
		Share2,
	} from 'lucide-vue-next';

	// Video references
	const backgroundVideoRef = ref<HTMLVideoElement | null>(null);
	const modalVideoRef = ref<HTMLVideoElement | null>(null);
	const modalContainer = ref<HTMLElement | null>(null);
	const progressBar = ref<HTMLElement | null>(null);

	// Modal state
	const isVideoModalOpen = ref<boolean>(false);
	const videoReady = ref<boolean>(false);
	const videoEnded = ref<boolean>(false);
	const isPlaying = ref<boolean>(false);
	const isMuted = ref<boolean>(false);
	const volume = ref<number>(1);
	const currentTime = ref<number>(0);
	const duration = ref<number>(0);
	const videoProgress = ref<number>(0);
	const showControls = ref<boolean>(true);
	const showPlayPauseIndicator = ref<boolean>(false);
	const isFullscreen = ref<boolean>(false);
	const showSpeedMenu = ref<boolean>(false);
	const playbackSpeed = ref<number>(1);

	// Dragging state for progress bar
	const isDragging = ref<boolean>(false);

	// Control visibility timer
	let controlsTimer: number | null = null;

	// Volume icon based on current volume
	const volumeIcon = computed(() => {
		if (isMuted.value || volume.value === 0) return VolumeX;
		if (volume.value < 0.5) return Volume1;
		return Volume2;
	});

	// Toggle play/pause
	const togglePlayPause = (): void => {
		if (!modalVideoRef.value) return;

		if (modalVideoRef.value.paused) {
			modalVideoRef.value.play();
			isPlaying.value = true;
		} else {
			modalVideoRef.value.pause();
			isPlaying.value = false;
		}

		// Show play/pause indicator briefly
		showPlayPauseIndicator.value = true;
		setTimeout(() => {
			showPlayPauseIndicator.value = false;
		}, 800);

		// Reset controls timer
		resetControlsTimer();
	};

	// Toggle mute
	const toggleMute = (): void => {
		if (!modalVideoRef.value) return;

		isMuted.value = !isMuted.value;
		modalVideoRef.value.muted = isMuted.value;

		// Reset controls timer
		resetControlsTimer();
	};

	// Update volume
	const updateVolume = (): void => {
		if (!modalVideoRef.value) return;

		modalVideoRef.value.volume = volume.value;
		isMuted.value = volume.value === 0;

		// Reset controls timer
		resetControlsTimer();
	};

	// Update progress
	const updateProgress = (): void => {
		if (!modalVideoRef.value || isDragging.value) return;

		currentTime.value = modalVideoRef.value.currentTime;
		duration.value = modalVideoRef.value.duration;
		videoProgress.value = (currentTime.value / duration.value) * 100;
	};

	// Seek video (click on progress bar)
	const seekVideo = (event: MouseEvent): void => {
		if (!modalVideoRef.value || !progressBar.value) return;

		const rect = progressBar.value.getBoundingClientRect();
		const pos = (event.clientX - rect.left) / rect.width;

		if (pos >= 0 && pos <= 1) {
			modalVideoRef.value.currentTime = pos * modalVideoRef.value.duration;
			updateProgressFromPosition(pos);
		}

		// Reset controls timer
		resetControlsTimer();
	};

	// Start dragging the progress bar
	const startDrag = (event: MouseEvent): void => {
		if (!modalVideoRef.value) return;

		// Pause video during drag for better precision
		const wasPlaying = !modalVideoRef.value.paused;
		if (wasPlaying) {
			modalVideoRef.value.pause();
		}

		isDragging.value = true;

		// Update progress immediately on click
		updateProgressFromEvent(event);

		// Setup events for dragging
		const onMouseMove = (e: MouseEvent) => {
			updateProgressFromEvent(e);
		};

		const onMouseUp = () => {
			isDragging.value = false;
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);

			// Resume playing if it was playing before
			if (wasPlaying) {
				modalVideoRef.value?.play().then(() => {
					isPlaying.value = true;
				});
			}
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	};

	// Update progress from mouse position during drag
	const updateProgressFromEvent = (event: MouseEvent): void => {
		if (!progressBar.value || !modalVideoRef.value) return;

		const rect = progressBar.value.getBoundingClientRect();
		let pos = (event.clientX - rect.left) / rect.width;

		// Clamp position between 0 and 1
		pos = Math.max(0, Math.min(1, pos));

		updateProgressFromPosition(pos);
	};

	// Update progress and video time from position (0-1)
	const updateProgressFromPosition = (pos: number): void => {
		if (!modalVideoRef.value) return;

		videoProgress.value = pos * 100;
		currentTime.value = pos * modalVideoRef.value.duration;
		modalVideoRef.value.currentTime = currentTime.value;
	};

	// Format time (seconds to MM:SS)
	const formatTime = (seconds: number): string => {
		if (isNaN(seconds)) return '00:00';

		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);

		return `${mins.toString().padStart(2, '0')}:${secs
			.toString()
			.padStart(2, '0')}`;
	};

	// Toggle fullscreen (Mejorado)
	const toggleFullscreen = async (): Promise<void> => {
		try {
			if (!document.fullscreenElement) {
				// Verificar si el navegador soporta la API de pantalla completa
				if (modalContainer.value) {
					if (modalContainer.value.requestFullscreen) {
						await modalContainer.value.requestFullscreen();
					} else if ((modalContainer.value as any).webkitRequestFullscreen) {
						// Safari/Chrome
						await (modalContainer.value as any).webkitRequestFullscreen();
					} else if ((modalContainer.value as any).msRequestFullscreen) {
						// IE11
						await (modalContainer.value as any).msRequestFullscreen();
					}
					isFullscreen.value = true;
				}
			} else {
				if (document.exitFullscreen) {
					await document.exitFullscreen();
				} else if ((document as any).webkitExitFullscreen) {
					await (document as any).webkitExitFullscreen();
				} else if ((document as any).msExitFullscreen) {
					await (document as any).msExitFullscreen();
				}
				isFullscreen.value = false;
			}
		} catch (err) {
			console.error(`Error con pantalla completa:`, err);
		}

		// Reset controls timer
		resetControlsTimer();
	};

	// Toggle speed menu
	const toggleSpeedMenu = (): void => {
		showSpeedMenu.value = !showSpeedMenu.value;

		// Reset controls timer
		resetControlsTimer();
	};

	// Set playback speed
	const setPlaybackSpeed = (speed: number): void => {
		if (!modalVideoRef.value) return;

		playbackSpeed.value = speed;
		modalVideoRef.value.playbackRate = speed;
		showSpeedMenu.value = false;

		// Reset controls timer
		resetControlsTimer();
	};

	// Share video function
	const shareVideo = (): void => {
		// Implementar funcionalidad para compartir
		if (navigator.share) {
			navigator
				.share({
					title: 'Presentación OncoClinic',
					text: 'Descubre cómo OncoClinic está transformando el cuidado de la salud',
					url: window.location.href,
				})
				.catch((error) => {
					console.log('Error al compartir:', error);
					alert('Compartir video: Funcionalidad disponible muy pronto');
				});
		} else {
			alert('Compartir video: Funcionalidad disponible muy pronto');
		}

		// Reset controls timer
		resetControlsTimer();
	};

	// Reset controls timer
	const resetControlsTimer = (): void => {
		showControls.value = true;

		if (controlsTimer) {
			clearTimeout(controlsTimer);
		}

		controlsTimer = window.setTimeout(() => {
			if (isPlaying.value) {
				showControls.value = false;
			}
		}, 3000);
	};

	// Handle fullscreen change
	const handleFullscreenChange = (): void => {
		isFullscreen.value =
			!!document.fullscreenElement ||
			!!(document as any).webkitFullscreenElement ||
			!!(document as any).msFullscreenElement;
	};

	// Body scroll lock state
	let originalBodyStyle = {
		overflow: '',
		paddingRight: '',
	};

	// Open video modal
	const openVideoModal = (): void => {
		isVideoModalOpen.value = true;
		videoReady.value = false;
		videoEnded.value = false;
		isPlaying.value = false;
		currentTime.value = 0;
		videoProgress.value = 0;
		isDragging.value = false;
		lockScroll(true);

		// Play the modal video after a short delay
		setTimeout(() => {
			if (modalVideoRef.value) {
				modalVideoRef.value.volume = volume.value;
				modalVideoRef.value.muted = isMuted.value;
				modalVideoRef.value.playbackRate = playbackSpeed.value;

				modalVideoRef.value
					.play()
					.then(() => {
						isPlaying.value = true;
						resetControlsTimer();
					})
					.catch((error) => {
						console.error('Error playing video:', error);
					});
			}
		}, 300);
	};

	// Close video modal
	const closeVideoModal = (): void => {
		if (modalVideoRef.value) {
			modalVideoRef.value.pause();
			modalVideoRef.value.currentTime = 0;
		}

		isVideoModalOpen.value = false;
		showSpeedMenu.value = false;
		isDragging.value = false;

		if (isFullscreen.value) {
			try {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if ((document as any).webkitExitFullscreen) {
					(document as any).webkitExitFullscreen();
				} else if ((document as any).msExitFullscreen) {
					(document as any).msExitFullscreen();
				}
			} catch (err) {
				console.error(`Error exiting fullscreen:`, err);
			}
		}

		lockScroll(false);
	};

	// Lock/unlock body scroll
	const lockScroll = (lock: boolean): void => {
		if (lock) {
			// Save current body styles
			originalBodyStyle = {
				overflow: document.body.style.overflow,
				paddingRight: document.body.style.paddingRight,
			};

			// Calculate scrollbar width
			const scrollbarWidth =
				window.innerWidth - document.documentElement.clientWidth;

			// Lock scroll
			document.body.style.overflow = 'hidden';
			if (scrollbarWidth > 0) {
				document.body.style.paddingRight = `${scrollbarWidth}px`;
			}
		} else {
			// Restore original body styles
			document.body.style.overflow = originalBodyStyle.overflow;
			document.body.style.paddingRight = originalBodyStyle.paddingRight;
		}
	};

	// Handle escape key to close modal
	const handleKeyDown = (event: KeyboardEvent): void => {
		if (!isVideoModalOpen.value) return;

		switch (event.key) {
			case 'Escape':
				closeVideoModal();
				break;
			case ' ':
				togglePlayPause();
				event.preventDefault();
				break;
			case 'f':
				toggleFullscreen();
				break;
			case 'm':
				toggleMute();
				break;
			case 'ArrowRight':
				if (modalVideoRef.value) {
					modalVideoRef.value.currentTime += 10;
					resetControlsTimer();
				}
				break;
			case 'ArrowLeft':
				if (modalVideoRef.value) {
					modalVideoRef.value.currentTime -= 10;
					resetControlsTimer();
				}
				break;
		}
	};

	// Watch for video ended
	watch(videoEnded, (ended) => {
		if (ended) {
			isPlaying.value = false;
			showControls.value = true;
		}
	});

	// Close speed menu when clicking outside
	const handleClickOutside = (event: MouseEvent): void => {
		if (showSpeedMenu.value) {
			showSpeedMenu.value = false;
		}
	};

	// Lifecycle hooks
	onMounted(() => {
		window.addEventListener('keydown', handleKeyDown);
		document.addEventListener('fullscreenchange', handleFullscreenChange);
		document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
		document.addEventListener('MSFullscreenChange', handleFullscreenChange);
		document.addEventListener('click', handleClickOutside);

		// Set modal container ref after component is mounted
		nextTick(() => {
			if (isVideoModalOpen.value) {
				const modalElement = document.querySelector('.video-modal-container');
				if (modalElement) {
					modalContainer.value = modalElement as HTMLElement;
				}
			}
		});
	});

	onUnmounted(() => {
		window.removeEventListener('keydown', handleKeyDown);
		document.removeEventListener('fullscreenchange', handleFullscreenChange);
		document.removeEventListener(
			'webkitfullscreenchange',
			handleFullscreenChange
		);
		document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
		document.removeEventListener('click', handleClickOutside);

		if (controlsTimer) {
			clearTimeout(controlsTimer);
		}

		// Ensure scroll is restored
		document.body.style.overflow = '';
		document.body.style.paddingRight = '';
	});
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.fade-fast-enter-active,
	.fade-fast-leave-active {
		transition: opacity 0.2s ease;
	}

	.fade-fast-enter-from,
	.fade-fast-leave-to {
		opacity: 0;
	}

	.fade-up-enter-active,
	.fade-up-leave-active {
		transition: all 0.2s ease;
	}

	.fade-up-enter-from,
	.fade-up-leave-to {
		opacity: 0;
		transform: translateY(10px);
	}

	/* Custom video player styles */
	/* Estilos mejorados para el control de volumen */
	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		position: relative;
		z-index: 10;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: white;
		cursor: pointer;
		position: relative;
		z-index: 10;
	}

	input[type='range']::-moz-range-thumb {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: white;
		cursor: pointer;
		border: none;
		position: relative;
		z-index: 10;
	}
</style>
