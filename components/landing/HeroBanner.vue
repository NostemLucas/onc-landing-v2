<template>
	<div class="relative w-full overflow-hidden">
		<!-- Background Video (mantiene el original) -->
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

		<!-- Gradient overlays (mantiene el original) -->
		<div
			class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"
		/>

		<!-- Content Container (mantiene el original) -->
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
					<!-- Appointment Button -->
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

					<!-- Play Video Button -->
					<button
						class="group relative flex cursor-pointer items-center space-x-3 overflow-hidden rounded-full border-2 border-white bg-transparent px-6 py-3 text-white transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
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

		<!-- Simplified Video Modal -->
		<Transition name="fade">
			<div
				v-if="isVideoModalOpen"
				class="fixed inset-0 z-50 flex items-center justify-center"
				@click="closeVideoModal"
			>
				<!-- Backdrop with blur effect -->
				<div class="absolute inset-0 bg-black/40"></div>

				<!-- Modal Content -->
				<div
					ref="modalContainer"
					class="relative z-10 w-full max-w-5xl overflow-hidden rounded-xl bg-black shadow-lg transition-all duration-300"
					:class="{
						'scale-100 opacity-100': videoReady,
						'scale-95 opacity-0': !videoReady,
					}"
					@click.stop
				>
					<!-- Close Button -->
					<button
						class="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
						aria-label="Cerrar video"
						@click.stop="closeVideoModal"
					>
						<X class="h-5 w-5" />
					</button>

					<!-- Video Container -->
					<div class="relative aspect-video w-full bg-black">
						<!-- Loading Indicator -->
						<div
							v-if="!videoReady"
							class="absolute inset-0 flex items-center justify-center"
						>
							<div
								class="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"
							></div>
						</div>

						<!-- Video Element -->
						<video
							ref="modalVideoRef"
							class="h-full w-full"
							@canplay="videoReady = true"
							@click="togglePlayPause"
							controls
						>
							<source src="~/assets/media/presentation.mp4" type="video/mp4" />
							Tu navegador no soporta el formato de video.
						</video>

						<!-- Simple Play/Pause Overlay (shows briefly when clicking) -->
						<Transition name="fade-fast">
							<div
								v-if="showPlayPauseIndicator"
								class="pointer-events-none absolute inset-0 flex items-center justify-center"
							>
								<div class="rounded-full bg-black/30 p-6 backdrop-blur-sm">
									<component
										:is="isPlaying ? Pause : Play"
										class="h-12 w-12 text-white"
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
	import { ref, onMounted, onUnmounted } from 'vue';
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

	// Body scroll lock state
	let originalBodyStyle = {
		overflow: '',
		paddingRight: '',
	};

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
	};

	// Open video modal
	const openVideoModal = (): void => {
		isVideoModalOpen.value = true;
		videoReady.value = false;
		isPlaying.value = false;
		lockScroll(true);

		// Play the modal video after a short delay
		setTimeout(() => {
			if (modalVideoRef.value) {
				modalVideoRef.value
					.play()
					.then(() => {
						isPlaying.value = true;
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
		}

		isVideoModalOpen.value = false;
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

		if (event.key === 'Escape') {
			closeVideoModal();
		}
	};

	// Lifecycle hooks
	onMounted(() => {
		window.addEventListener('keydown', handleKeyDown);
	});

	onUnmounted(() => {
		window.addEventListener('keydown', handleKeyDown);

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
</style>
