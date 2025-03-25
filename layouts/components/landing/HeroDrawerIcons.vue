<template>
	<div class="w-full font-sans">
		<!-- Main Navigation -->
		<header
			class="fixed top-0 right-0 left-0 z-50 h-24 border-b border-gray-200 bg-white/95 backdrop-blur-xl transition-shadow duration-300"
			:class="{ 'shadow-md': isScrolled }"
		>
			<div class="mx-auto h-full w-full px-4 lg:container lg:px-6">
				<div class="flex h-full items-center justify-between">
					<!-- Logo -->
					<div class="flex-shrink-0">
						<a href="/" class="block">
							<div class="flex items-center">
								<NuxtImg
									src="logo.png"
									alt="Logo"
									width="220"
									height="50"
									draggable="false"
								/>
							</div>
						</a>
					</div>

					<!-- Desktop Navigation -->
					<nav class="hidden items-center space-x-1 lg:flex">
						<template v-for="(item, index) in navigationItems" :key="index">
							<div class="group relative">
								<button
									class="flex items-center space-x-1 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out hover:text-blue-700"
									:class="{
										'border-b-2 border-blue-700 text-blue-700':
											activeDropdown === item.id,
									}"
									@click="toggleDropdown(item.id)"
								>
									<span>{{ item.label }}</span>
									<ChevronDown
										class="h-4 w-4 transition-transform duration-200"
										:class="{ 'rotate-180': activeDropdown === item.id }"
									/>
								</button>
							</div>
						</template>

						<a
							href="#"
							class="px-3 py-2 text-sm font-medium transition duration-150 ease-in-out hover:text-blue-700"
						>
							Pedir una cita
						</a>
						<!-- 
						<a
							href="#"
							class="px-3 py-2 text-sm font-medium transition duration-150 ease-in-out hover:text-blue-700"
						>
							Para donar
						</a>
 -->
						<button
							class="p-2 transition duration-150 ease-in-out hover:text-blue-700"
						>
							<User class="h-5 w-5" />
							<span class="sr-only">Iniciar la sesión</span>
						</button>

						<button
							class="p-2 transition duration-150 ease-in-out hover:text-blue-700"
						>
							<Search class="h-5 w-5" />
							<span class="sr-only">Buscar</span>
						</button>
					</nav>

					<!-- Mobile Menu Button -->
					<div class="flex items-center lg:hidden">
						<button
							class="rounded-md p-2 text-gray-600 transition duration-150 ease-in-out hover:bg-blue-50 hover:text-blue-700"
							@click="toggleMobileMenu"
						>
							<Menu v-if="!isMobileMenuOpen" class="h-6 w-6" />
							<X v-else class="h-6 w-6" />
							<span class="sr-only">Menu</span>
						</button>
					</div>
				</div>
			</div>
		</header>

		<!-- Spacer to prevent content from being hidden under fixed header -->
		<div class="h-24" />

		<!-- Mobile Menu -->
		<Transition name="slide-right">
			<div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 lg:hidden">
				<!-- Backdrop -->
				<div
					class="fixed inset-0 bg-black/50 transition-opacity duration-200"
					@click="closeMobileMenu"
				></div>

				<!-- Menu Content -->
				<div
					class="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl"
					style="overflow-y: auto; height: 100%"
				>
					<div class="flex h-full flex-col">
						<!-- Header -->
						<div class="flex items-center justify-between p-4">
							<div class="flex items-center space-x-2">
								<div class="h-8 w-8">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										class="h-full w-full text-blue-700"
									>
										<path
											d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
											stroke="currentColor"
											stroke-width="2"
										/>
										<path
											d="M12 6V18M6 12H18"
											stroke="currentColor"
											stroke-width="2"
										/>
									</svg>
								</div>
								<span class="text-lg font-bold">Mayo Clinic</span>
							</div>
							<button
								class="rounded-md p-2 text-gray-600 transition duration-150 ease-in-out hover:bg-blue-50 hover:text-blue-700"
								@click="closeMobileMenu"
							>
								<X class="h-6 w-6" />
							</button>
						</div>

						<!-- Navigation Items -->
						<div class="flex-grow overflow-y-auto">
							<div class="space-y-6 px-4 py-6">
								<template v-for="(item, index) in navigationItems" :key="index">
									<div class="space-y-2">
										<button
											class="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-lg font-medium transition duration-150 ease-in-out hover:bg-blue-50"
											@click="toggleMobileDropdown(item.id)"
										>
											<span>{{ item.label }}</span>
											<ChevronDown
												class="h-5 w-5 transition-transform duration-200"
												:class="{ 'rotate-180': mobileDropdowns[item.id] }"
											/>
										</button>
										<Transition name="expand">
											<div
												v-if="mobileDropdowns[item.id]"
												class="mt-2 space-y-2 rounded-md bg-gray-50 py-3 pr-2 pl-4"
											>
												<a
													v-for="(subItem, subIndex) in item.subItems"
													:key="subIndex"
													:href="subItem.url"
													class="block rounded-md px-3 py-2 text-sm font-medium transition duration-150 ease-in-out hover:text-blue-700"
												>
													{{ subItem.label }}
												</a>
											</div>
										</Transition>
									</div>
								</template>
							</div>
						</div>

						<!-- Footer Actions -->
						<div class="space-y-3 border-t border-gray-200 p-4">
							<a
								href="#"
								class="block w-full rounded-md bg-blue-50 px-4 py-2 text-center font-medium text-blue-700 transition duration-150 ease-in-out hover:bg-blue-100"
							>
								Pedir una cita
							</a>
							<a
								href="#"
								class="block w-full rounded-md bg-gray-100 px-4 py-2 text-center font-medium text-gray-700 transition duration-150 ease-in-out hover:bg-gray-200"
							>
								Para donar
							</a>
							<a
								href="#"
								class="block w-full rounded-md px-4 py-2 text-center font-medium text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100"
							>
								Iniciar la sesión
							</a>
						</div>
					</div>
				</div>
			</div>
		</Transition>

		<!-- Dropdown Content for Desktop -->
		<Transition name="fade">
			<div v-if="activeDropdown && !isMobile" class="fixed inset-0 z-30">
				<!-- Backdrop -->
				<div
					class="fixed inset-0 bg-black/20 transition-opacity duration-200"
					@click="closeDropdown"
				></div>

				<!-- Dropdown Content - Positioned directly below header -->
				<div
					class="fixed top-24 right-0 left-0 border-b border-gray-200 bg-white shadow-xl"
					style="overflow-y: auto; max-height: calc(100vh - 6rem)"
				>
					<div class="container mx-auto px-4 py-8 lg:px-6">
						<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
							<!-- Left Column -->
							<div class="space-y-4">
								<template
									v-for="(item, index) in getActiveDropdownItems.slice(0, 4)"
									:key="index"
								>
									<a
										:href="item.url"
										class="block text-base font-medium transition duration-150 ease-in-out hover:text-blue-700"
									>
										<div class="flex items-center">
											<div
												class="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100"
											>
												<component
													:is="item.icon"
													class="h-5 w-5 text-blue-700"
												/>
											</div>
											<div>
												<span class="block">{{ item.label }}</span>
												<span class="text-sm text-gray-500">
													{{ item.description }}
												</span>
											</div>
										</div>
									</a>
								</template>
							</div>

							<!-- Middle Column -->
							<div class="space-y-4">
								<template
									v-for="(item, index) in getActiveDropdownItems.slice(4, 8)"
									:key="index"
								>
									<a
										:href="item.url"
										class="block text-base font-medium transition duration-150 ease-in-out hover:text-blue-700"
									>
										<div class="flex items-center">
											<div
												class="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100"
											>
												<component
													:is="item.icon"
													class="h-5 w-5 text-blue-700"
												/>
											</div>
											<div>
												<span class="block">{{ item.label }}</span>
												<span class="text-sm text-gray-500">
													{{ item.description }}
												</span>
											</div>
										</div>
									</a>
								</template>
							</div>

							<!-- Right Column - Featured Content -->
							<div class="relative overflow-hidden rounded-lg shadow-md">
								<NuxtImg
									src="/mock/happy-mature.jpg"
									alt="Educación Médica Continua"
									class="h-64 w-full object-cover"
								/>
								<div
									class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6"
								>
									<h3 class="text-xl font-bold text-white">
										Educación Médica Continua
									</h3>
									<p class="mt-2 text-sm text-white">
										Mantente actualizado con los últimos avances médicos
									</p>
									<a
										href="#"
										class="mt-4 inline-flex items-center rounded-md bg-blue-700 px-4 py-2 text-white hover:underline"
									>
										Más información
										<ArrowRight class="ml-2 h-4 w-4" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
	import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
	import {
		ChevronDown,
		Menu,
		X,
		User,
		Search,
		ArrowRight,
		Stethoscope,
		Book,
		Microscope,
		GraduationCap,
		MapPin,
		Users,
		Activity,
		Clipboard,
		Briefcase,
		UserPlus,
		HelpCircle,
		FlaskConical,
		Video,
		BookOpen,
		Building,
	} from 'lucide-vue-next';
	import type { Component } from 'vue';

	// Define types for navigation items
	interface SubItem {
		label: string;
		url: string;
		icon: Component;
		description: string;
	}

	interface NavigationItem {
		id: string;
		label: string;
		subItems: SubItem[];
	}

	// State for mobile menu
	const isMobileMenuOpen = ref<boolean>(false);

	// State for desktop dropdown
	const activeDropdown = ref<string | null>(null);

	// State for mobile dropdowns
	const mobileDropdowns = reactive<Record<string, boolean>>({});

	// State for scroll detection
	const isScrolled = ref<boolean>(false);

	// State for mobile detection
	const isMobile = ref<boolean>(false);

	// Store scroll position
	const scrollPosition = ref<number>(0);

	// Navigation items data
	const navigationItems: NavigationItem[] = [
		{
			id: 'medical',
			label: 'Atención médica en OncoClinic',
			subItems: [
				{
					label: 'Especialidades y servicios',
					url: '#',
					icon: Stethoscope,
					description:
						'Descubre nuestras especialidades en oncología y servicios médicos personalizados',
				},
				{
					label: 'Ubicaciones',
					url: '#',
					icon: MapPin,
					description:
						'Localiza nuestros centros médicos especializados en oncología',
				},
				{
					label: 'Información para pacientes',
					url: '#',
					icon: Users,
					description:
						'Recursos clave para pacientes en tratamiento oncológico',
				},
			],
		},
		{
			id: 'library',
			label: 'Biblioteca de Oncología',
			subItems: [
				{
					label: 'Enfermedades oncológicas y condiciones',
					url: '#',
					icon: Book,
					description:
						'Información detallada sobre tipos de cáncer y condiciones relacionadas',
				},
				{
					label: 'Síntomas oncológicos',
					url: '#',
					icon: Activity,
					description:
						'Guía de síntomas relacionados con el cáncer y su detección temprana',
				},
				{
					label: 'Pruebas y procedimientos oncológicos',
					url: '#',
					icon: Clipboard,
					description:
						'Explicaciones sobre pruebas de diagnóstico y procedimientos en oncología',
				},
			],
		},
		{
			id: 'professionals',
			label: 'Para profesionales médicos',
			subItems: [
				{
					label: 'Recursos para profesionales de la salud',
					url: '#',
					icon: Briefcase,
					description:
						'Herramientas y recursos para médicos y especialistas en oncología',
				},
				{
					label: 'Proceso de remisión de pacientes',
					url: '#',
					icon: UserPlus,
					description:
						'Guía sobre cómo remitir a pacientes para atención especializada en oncología',
				},
				{
					label: 'Educación Médica Continua',
					url: '#',
					icon: GraduationCap,
					description:
						'Programas educativos de actualización para profesionales en oncología',
				},
				{
					label: 'Consulta con expertos oncológicos',
					url: '#',
					icon: HelpCircle,
					description:
						'Consulta a nuestros especialistas para apoyo en diagnóstico y tratamiento',
				},
				{
					label: 'Laboratorios de OncoClinic',
					url: '#',
					icon: FlaskConical,
					description: 'Servicios de laboratorio especializados en oncología',
				},
				{
					label: 'Centro de videos educativos',
					url: '#',
					icon: Video,
					description:
						'Recursos audiovisuales sobre avances en oncología y tratamientos',
				},
				{
					label: 'Revistas y publicaciones científicas',
					url: '#',
					icon: BookOpen,
					description:
						'Accede a nuestras publicaciones científicas sobre investigación oncológica',
				},
				{
					label: 'Red de profesionales de OncoClinic',
					url: '#',
					icon: Users,
					description:
						'Conecta con otros profesionales de la salud en oncología',
				},
			],
		},
		{
			id: 'research',
			label: 'Investigación en Oncología',
			subItems: [
				{
					label: 'Proyectos de investigación oncológica',
					url: '#',
					icon: Microscope,
					description:
						'Conoce nuestros proyectos de investigación en tratamientos oncológicos',
				},
				{
					label: 'Formación y educación médica en oncología',
					url: '#',
					icon: GraduationCap,
					description:
						'Programas de formación continua para especialistas en cáncer',
				},
				{
					label: 'Laboratorios y centros de investigación',
					url: '#',
					icon: Building,
					description:
						'Explora nuestras instalaciones dedicadas a la investigación en cáncer',
				},
			],
		},
	];

	// Toggle desktop dropdown
	const toggleDropdown = (dropdown: string): void => {
		// Save current scroll position before opening dropdown
		scrollPosition.value = window.scrollY;

		if (activeDropdown.value === dropdown) {
			closeDropdown();
		} else {
			activeDropdown.value = dropdown;
			lockScroll(true);
		}
	};

	// Close desktop dropdown
	const closeDropdown = (): void => {
		activeDropdown.value = null;
		lockScroll(false);

		// Restore scroll position after closing dropdown
		setTimeout(() => {
			window.scrollTo({
				top: scrollPosition.value,
				behavior: 'instant' as ScrollBehavior,
			});
		}, 0);
	};

	// Toggle mobile menu
	const toggleMobileMenu = (): void => {
		// Save current scroll position before toggling menu
		scrollPosition.value = window.scrollY;

		isMobileMenuOpen.value = !isMobileMenuOpen.value;
		lockScroll(isMobileMenuOpen.value);
	};

	// Close mobile menu
	const closeMobileMenu = (): void => {
		isMobileMenuOpen.value = false;
		lockScroll(false);

		// Restore scroll position after closing menu
		setTimeout(() => {
			window.scrollTo({
				top: scrollPosition.value,
				behavior: 'instant' as ScrollBehavior,
			});
		}, 0);
	};

	// Toggle mobile dropdown
	const toggleMobileDropdown = (dropdown: string): void => {
		mobileDropdowns[dropdown] = !mobileDropdowns[dropdown];
	};

	// Computed property to get active dropdown items
	const getActiveDropdownItems = computed((): SubItem[] => {
		const activeItem = navigationItems.find(
			(item) => item.id === activeDropdown.value
		);
		return activeItem ? activeItem.subItems : [];
	});

	// Handle scroll for sticky header effects
	const handleScroll = (): void => {
		isScrolled.value = window.scrollY > 10;
	};

	// Improved scroll locking function that preserves scroll position
	const lockScroll = (lock: boolean): void => {
		if (lock) {
			// Save current scroll position
			scrollPosition.value = window.scrollY;

			// Apply fixed position to body with current scroll position as negative top
			document.body.style.position = 'fixed';
			document.body.style.top = `-${scrollPosition.value}px`;
			document.body.style.width = '100%';
			document.body.style.overflowY = 'scroll';
		} else {
			// Remove fixed position
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.width = '';
			document.body.style.overflowY = '';
		}
	};

	// Check if the device is mobile
	const checkMobile = (): void => {
		isMobile.value = window.innerWidth < 1024;
		if (!isMobile.value && isMobileMenuOpen.value) {
			isMobileMenuOpen.value = false;
			lockScroll(false);
		}
	};

	// Setup event listeners
	onMounted(() => {
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', checkMobile);
		checkMobile();
		handleScroll();
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', handleScroll);
		window.removeEventListener('resize', checkMobile);
		// Ensure scroll is restored when component is unmounted
		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.width = '';
		document.body.style.overflowY = '';
	});
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.2s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.slide-right-enter-active,
	.slide-right-leave-active {
		transition: transform 0.3s ease-in-out;
	}

	.slide-right-enter-from,
	.slide-right-leave-to {
		transform: translateX(100%);
	}

	.expand-enter-active,
	.expand-leave-active {
		transition: all 0.3s ease-in-out;
		overflow: hidden;
	}

	.expand-enter-from,
	.expand-leave-to {
		opacity: 0;
		max-height: 0;
	}

	.expand-enter-to,
	.expand-leave-from {
		opacity: 1;
		max-height: 1000px;
	}
</style>
