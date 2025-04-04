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
			name: 'Dr. Ariel Amaru MD PHD',
			specialty: 'ONCOHEMATOLOGO',
			department: 'DEPARTAMENTO DE ONCOLOGIA',
			description:
				'Director Médico de Oncoclinic, responsable del área de Trasplante de Células Madre para enfermedades oncohematológicas, como las leucemias, linfomas, mielomas o mielofibrosis.',
			image: '/doctors/amaru.png',
		},
		{
			name: 'Dra. Jimena Yudid Bueno Limachi',
			specialty: 'CIRUGÍA ONCOLÓGICA',
			department: 'DEPARTAMENTO DE ONCOLOGIA',
			description:
				'Médico Cirujano Oncóloga, formada en la Facultad de Medicina de la Universidad Mayor de San Andrés, con Especialidad en Cirugía General en el Hospital Obrero No2 y Sub-Especialidad en Cirugía Oncológica.',
			image: '/doctors/bueno.png',
		},
		{
			name: 'Dra. Erika Lourdes Patiño Constancio',
			specialty: 'CIRUGÍA ONCOLÓGICA',
			department: 'Cirugía Oncologica',
			description:
				'Médico Cirujano Oncóloga, con formación en la Facultad de Medicina en la Universidad Mayor de San Andrés, con Especialidad en Cirugía General',
			image: '/doctors/patiño.png',
		},
		{
			name: 'Dr. Marcio Denis López Ramirez',
			specialty: 'ONCOLOGÍA CLINICA',
			department: 'DEPARTAMENTO DE ONCOLOGÍA',
			description:
				'Oncóloga especializada en cáncer de mama. Pionera en tratamientos personalizados basados en perfiles genéticos de tumores.',
			image: '/doctors/lopez.png',
		},
		{
			name: 'Dr. Daniel Eduardo Mercado Rodrigo',
			specialty: 'ORTOPEDIA ONCOLOGICA',
			department: 'DEPARTAMENTO DE DERMATOLOGÍA',
			description:
				'Médico del área de Oncología Quirúrgica, con enfoque en el área de Ortopedia y Traumatología Oncológica.',
			image: '/doctors/mercado.png',
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
	<div class="container mx-auto max-w-7xl px-4 py-12">
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
							class="absolute top-4 right-4 rounded-full bg-white px-3 py-2 text-xs font-semibold text-primary-500"
						>
							{{ person.specialty }}
						</div>

						<div
							class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary-900 via-primary-800/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-6"
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
								<UButton
									variant="solid"
									:aria-label="`Ver más información sobre Dr. ${person.name}`"
									class="bg-white rounded-full px-4 py-2 text-primary-500"
									label="Ver más"
								/>
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
