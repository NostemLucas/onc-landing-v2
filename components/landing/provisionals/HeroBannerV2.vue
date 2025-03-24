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
					<!-- Appointment Button -->
					<a
						href="#"
						class="group flex items-center text-lg text-white transition duration-300 ease-in-out md:text-xl lg:text-2xl"
					>
						<span
							class="border-b-2 border-transparent group-hover:border-white"
						>
							Pedir una cita
						</span>
						<ChevronRight
							class="ml-2 h-6 w-6 transition duration-150 ease-in group-hover:translate-x-1"
						/>
					</a>

					<!-- Play Video Button -->
					<button
						@click="openVideoModal"
						class="group flex items-center space-x-3 rounded-full border-2 border-white px-6 py-3 text-white transition-all duration-300 hover:bg-white hover:text-black"
					>
						<Play
							class="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
						/>
						<span class="text-lg font-medium md:text-xl">Ver presentación</span>
					</button>
				</div>
			</div>
		</div>

		<!-- Video Modal -->
		<Transition name="fade">
			<div
				v-if="isVideoModalOpen"
				class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
				@click="closeVideoModal"
			>
				<div class="relative w-full max-w-5xl px-4">
					<!-- Close Button -->
					<button
						@click.stop="closeVideoModal"
						class="absolute -top-12 right-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
					>
						<X class="h-6 w-6" />
					</button>

					<!-- Video Container with Animation -->
					<div
						class="overflow-hidden rounded-lg shadow-2xl transition-transform duration-500"
						:class="{
							'scale-100 opacity-100': videoReady,
							'scale-95 opacity-0': !videoReady,
						}"
					>
						<video
							ref="modalVideoRef"
							class="aspect-video w-full bg-black"
							controls
							@canplay="videoReady = true"
						>
							<source src="~/assets/media/video.webm" type="video/mp4" />
							Tu navegador no soporta el formato de video.
						</video>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, onUnmounted } from 'vue';
	import { ChevronRight, Play, X } from 'lucide-vue-next';

	// Video references
	const backgroundVideoRef = ref<HTMLVideoElement | null>(null);
	const modalVideoRef = ref<HTMLVideoElement | null>(null);

	// Modal state
	const isVideoModalOpen = ref<boolean>(false);
	const videoReady = ref<boolean>(false);

	// Body scroll lock state
	let originalBodyStyle = {
		overflow: '',
		paddingRight: '',
	};

	// Open video modal
	const openVideoModal = (): void => {
		isVideoModalOpen.value = true;
		videoReady.value = false;
		lockScroll(true);

		// Play the modal video after a short delay
		setTimeout(() => {
			if (modalVideoRef.value) {
				modalVideoRef.value.play().catch((error) => {
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
		if (event.key === 'Escape' && isVideoModalOpen.value) {
			closeVideoModal();
		}
	};

	// Lifecycle hooks
	onMounted(() => {
		window.addEventListener('keydown', handleKeyDown);
	});

	onUnmounted(() => {
		window.removeEventListener('keydown', handleKeyDown);
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

	/* Add font-horsham class if it's a custom font */
	.font-horsham {
		font-family: 'Horsham', serif, system-ui;
		font-weight: 600;
	}
</style>
