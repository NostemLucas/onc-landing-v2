<script setup>
	import { ChevronRight, ChevronLeft } from 'lucide-vue-next';
	import {
		ref,
		computed,
		onMounted,
		onBeforeUnmount,
		watch,
		defineProps,
	} from 'vue';

	const props = defineProps({
		autoplay: {
			type: Boolean,
			default: true,
		},
		autoplaySpeed: {
			type: Number,
			default: 4000,
		},
		isInfinite: {
			type: Boolean,
			default: true,
		},
		pauseOnHover: {
			type: Boolean,
			default: true,
		},
	});

	const currentIndex = ref(0);
	const hoveredPerson = ref(null);
	const autoplayPaused = ref(false);
	const touchStartX = ref(0);
	const touchEndX = ref(0);
	let autoplayInterval = null;
	const windowWidth = ref(
		typeof window !== 'undefined' ? window.innerWidth : 1024
	);

	const visibleSlides = computed(() => {
		if (windowWidth.value < 640) return 1;
		if (windowWidth.value < 768) return 2;
		return 3;
	});

	const personnel = ref([
		{
			name: 'Carlos Rodríguez',
			specialty: 'CARDIOLOGÍA',
			department: 'DEPARTAMENTO DE CARDIOLOGÍA',
			description:
				'Especialista en cardiología intervencionista con más de 15 años de experiencia. Formado en la Universidad de Barcelona y con fellowship en Johns Hopkins.',
			image:
				'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
		},
		{
			name: 'María González',
			specialty: 'NEUROLOGÍA',
			department: 'DEPARTAMENTO DE NEUROLOGÍA',
			description:
				'Neuróloga especializada en trastornos del movimiento y enfermedades neurodegenerativas. Investigadora principal en estudios sobre Parkinson.',
			image:
				'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
		},
		{
			name: 'Javier Martínez',
			specialty: 'PEDIATRÍA',
			department: 'DEPARTAMENTO DE PEDIATRÍA',
			description:
				'Pediatra con especialización en neonatología. Dedicado al cuidado de recién nacidos y prematuros con condiciones médicas complejas.',
			image:
				'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80',
		},
		{
			name: 'Ana Sánchez',
			specialty: 'ONCOLOGÍA',
			department: 'DEPARTAMENTO DE ONCOLOGÍA',
			description:
				'Oncóloga especializada en cáncer de mama. Pionera en tratamientos personalizados basados en perfiles genéticos de tumores.',
			image:
				'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
		},
		{
			name: 'Luis Fernández',
			specialty: 'CIRUGÍA',
			department: 'DEPARTAMENTO DE CIRUGÍA',
			description:
				'Cirujano general con especialización en cirugía mínimamente invasiva y robótica. Más de 1000 procedimientos realizados con éxito.',
			image:
				'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
		},
		{
			name: 'Elena Torres',
			specialty: 'DERMATOLOGÍA',
			department: 'DEPARTAMENTO DE DERMATOLOGÍA',
			description:
				'Dermatóloga especializada en enfermedades inflamatorias de la piel y dermatología estética. Investigadora en nuevos tratamientos biológicos.',
			image:
				'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
		},
	]);

	const nextSlide = () => {
		if (currentIndex.value < personnel.value.length - visibleSlides.value) {
			currentIndex.value++;
		} else if (props.isInfinite) {
			currentIndex.value = 0;
		}
	};

	const prevSlide = () => {
		if (currentIndex.value > 0) {
			currentIndex.value--;
		} else if (props.isInfinite) {
			currentIndex.value = personnel.value.length - visibleSlides.value;
		}
	};

	const goToSlide = (index) => {
		const maxIndex = personnel.value.length - visibleSlides.value;
		currentIndex.value = Math.min(Math.max(0, index), maxIndex);
	};

	const startAutoplay = () => {
		if (props.autoplay && !autoplayInterval && !autoplayPaused.value) {
			autoplayInterval = setInterval(() => {
				nextSlide();
			}, props.autoplaySpeed);
		}
	};

	const stopAutoplay = () => {
		if (autoplayInterval) {
			clearInterval(autoplayInterval);
			autoplayInterval = null;
		}
	};

	const pauseAutoplay = () => {
		if (props.pauseOnHover) {
			autoplayPaused.value = true;
			stopAutoplay();
		}
	};

	const resumeAutoplay = () => {
		if (props.pauseOnHover) {
			autoplayPaused.value = false;
			startAutoplay();
		}
	};

	const handleTouchStart = (e) => {
		touchStartX.value = e.touches[0].clientX;
	};

	const handleTouchMove = (e) => {
		touchEndX.value = e.touches[0].clientX;
	};

	const handleTouchEnd = () => {
		const touchDiff = touchStartX.value - touchEndX.value;

		const minSwipeDistance = 50;

		if (Math.abs(touchDiff) > minSwipeDistance) {
			if (touchDiff > 0) {
				nextSlide();
			} else {
				prevSlide();
			}
		}
	};

	const handleResize = () => {
		windowWidth.value = window.innerWidth;
	};

	watch(visibleSlides, (newValue, oldValue) => {
		if (newValue < oldValue) {
			const maxIndex = personnel.value.length - newValue;
			if (currentIndex.value > maxIndex) {
				currentIndex.value = maxIndex;
			}
		}
	});

	onMounted(() => {
		startAutoplay();

		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize);
		}
	});

	onBeforeUnmount(() => {
		stopAutoplay();

		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', handleResize);
		}
	});
</script>

<template>
	<div class="mx-auto w-full max-w-7xl px-4 py-8">
		<div
			class="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row"
		>
			<div class="relative">
				<div class="absolute -top-3 left-0 h-1 w-12 rounded-full bg-blue-600" />
				<h2
					class="text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl lg:text-4xl"
				>
					Nuestros Profesionales Médicos
				</h2>
				<p class="mt-2 max-w-xl text-gray-600">
					Expertos altamente calificados dedicados a brindar la mejor atención
					médica
				</p>
			</div>

			<div class="flex space-x-3">
				<button
					aria-label="Previous slide"
					class="flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition-colors hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					:disabled="!isInfinite && currentIndex === 0"
					:class="{
						'cursor-not-allowed opacity-50': !isInfinite && currentIndex === 0,
						'text-blue-600 hover:text-blue-700': true,
					}"
					@click="prevSlide"
				>
					<ChevronLeft class="h-5 w-5" />
				</button>
				<button
					aria-label="Next slide"
					class="bg-blue-white flex h-12 w-12 items-center justify-center rounded-full shadow-md transition-colors hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					:disabled="
						!isInfinite && currentIndex >= personnel.length - visibleSlides
					"
					:class="{
						'cursor-not-allowed opacity-50':
							!isInfinite && currentIndex >= personnel.length - visibleSlides,
						'text-blue-600 hover:text-blue-700': true,
					}"
					@click="nextSlide"
				>
					<ChevronRight class="h-5 w-5" />
				</button>
			</div>
		</div>

		<div
			class="relative overflow-hidden"
			@mouseenter="pauseAutoplay"
			@mouseleave="resumeAutoplay"
			@touchstart="handleTouchStart"
			@touchmove="handleTouchMove"
			@touchend="handleTouchEnd"
		>
			<div
				class="flex transition-transform duration-500 ease-in-out"
				:style="{
					transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
				}"
				aria-live="polite"
			>
				<div
					v-for="(person, index) in personnel"
					:key="index"
					:class="[
						'px-2 transition-all duration-300',
						{
							'min-w-full sm:min-w-[50%] md:min-w-[33.333%] lg:min-w-[33.333%]': true,
						},
					]"
				>
					<div
						class="group relative h-[350px] overflow-hidden rounded-lg shadow-md sm:h-[400px] md:h-[450px]"
						:aria-label="`Doctor ${person.name}, ${person.specialty}`"
						@mouseenter="hoveredPerson = index"
						@mouseleave="hoveredPerson = null"
					>
						<NuxtImg
							:src="person.image"
							:alt="`Dr. ${person.name} - ${person.specialty}`"
							class="aspect-[3/4] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
						/>

						<div
							v-if="person.specialty"
							class="absolute top-4 right-4 rounded-full bg-white px-3 py-1 text-xs font-medium text-blue-700"
						>
							{{ person.specialty }}
						</div>

						<div
							class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-blue-900 via-blue-800/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-6"
						>
							<div class="text-white">
								<div class="mb-1 text-xs font-medium sm:text-sm">
									{{ person.department }}
								</div>
								<h3 class="mb-1 text-lg font-bold sm:text-xl">
									Dr. {{ person.name }}
								</h3>
								<p class="mb-3 line-clamp-3 text-xs sm:mb-4 sm:text-sm">
									{{ person.description }}
								</p>
								<button
									class="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-blue-800 transition-colors hover:bg-blue-50 focus:ring-2 focus:ring-white focus:outline-none sm:px-4 sm:py-2 sm:text-sm"
									:aria-label="`Ver más información sobre Dr. ${person.name}`"
								>
									Ver más
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-6 flex justify-center">
			<div
				v-for="(_, index) in Math.ceil(personnel.length / visibleSlides)"
				:key="index"
				class="mx-1.5 h-2.5 w-2.5 cursor-pointer rounded-full transition-all duration-300"
				:class="
					Math.floor(currentIndex / visibleSlides) === index
						? 'scale-125 bg-blue-600'
						: 'bg-gray-300 hover:bg-gray-400'
				"
				:aria-label="`Go to slide group ${index + 1}`"
				role="button"
				tabindex="0"
				@click="goToSlide(index * visibleSlides)"
				@keydown.enter="goToSlide(index * visibleSlides)"
			/>
		</div>
	</div>
</template>
