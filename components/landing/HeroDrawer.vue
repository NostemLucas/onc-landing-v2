<template>
	<div class="w-full font-sans">
		<!-- Main Navigation - Now with scroll padding -->
		<header
			class="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md transition-shadow duration-300"
			:class="{ 'shadow-md': isScrolled }"
		>
			<div class="container mx-auto px-4 lg:px-6">
				<div class="flex h-16 items-center justify-between lg:h-20">
					<!-- Logo -->
					<div class="flex-shrink-0">
						<a href="/" class="block">
							<div class="flex items-center">
								<NuxtImg
									src="logo.png"
									alt="Logo"
									width="200"
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

						<a
							href="#"
							class="px-3 py-2 text-sm font-medium transition duration-150 ease-in-out hover:text-blue-700"
						>
							Para donar
						</a>

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
		<div class="h-16 lg:h-20"></div>

		<!-- Mobile Menu -->
		<Transition name="slide-right">
			<div
				v-if="isMobileMenuOpen"
				class="fixed inset-0 z-40 overflow-hidden lg:hidden"
			>
				<!-- Backdrop -->
				<div
					class="fixed inset-0 bg-black/50 backdrop-blur-sm"
					@click="closeMobileMenu"
				></div>

				<!-- Menu Content -->
				<div
					class="fixed inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-white shadow-xl"
				>
					<div class="flex h-full flex-col">
						<!-- Header -->
						<div
							class="flex items-center justify-between border-b border-gray-200 p-4"
						>
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
			<div v-if="activeDropdown" class="fixed inset-0 z-30 overflow-hidden">
				<!-- Backdrop -->
				<div
					class="fixed inset-0 bg-black/20 backdrop-blur-sm"
					@click="closeDropdown"
				></div>

				<!-- Dropdown Content -->
				<div
					class="absolute top-16 right-0 left-0 max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-gray-200 bg-white shadow-xl lg:top-20"
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
										{{ item.label }}
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
										{{ item.label }}
									</a>
								</template>
							</div>

							<!-- Right Column - Featured Content -->
							<div class="relative overflow-hidden rounded-lg shadow-md">
								<img
									src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-x6JIJe4cFEmAiwVCswZJ3ITH4X2tZW.png"
									alt="Educación Médica Continua"
									class="h-64 w-full object-cover"
								/>
								<div
									class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6"
								>
									<h3 class="text-xl font-bold text-white">
										Educación Médica Continua
									</h3>
									<a
										href="#"
										class="mt-2 inline-flex items-center text-white hover:underline"
									>
										Más información
										<ArrowRight class="ml-1 h-4 w-4" />
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

<script setup>
	import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
	import {
		ChevronDown,
		Menu,
		X,
		User,
		Search,
		ArrowRight,
	} from 'lucide-vue-next';

	// State for mobile menu
	const isMobileMenuOpen = ref(false);

	// State for desktop dropdown
	const activeDropdown = ref(null);

	// State for mobile dropdowns
	const mobileDropdowns = reactive({});

	// State for scroll detection
	const isScrolled = ref(false);

	// Navigation items data
	const navigationItems = [
		{
			id: 'medical',
			label: 'Atención médica en Mayo Clinic',
			subItems: [
				{ label: 'Especialidades y servicios', url: '#' },
				{ label: 'Ubicaciones', url: '#' },
				{ label: 'Información para pacientes', url: '#' },
			],
		},
		{
			id: 'library',
			label: 'Biblioteca de la Salud',
			subItems: [
				{ label: 'Enfermedades y condiciones', url: '#' },
				{ label: 'Síntomas', url: '#' },
				{ label: 'Pruebas y procedimientos', url: '#' },
			],
		},
		{
			id: 'professionals',
			label: 'Para profesionales médicos',
			subItems: [
				{ label: 'Recursos para profesionales médicos', url: '#' },
				{ label: 'Para remitir a un paciente', url: '#' },
				{ label: 'Educación Médica Continua', url: '#' },
				{ label: 'AskMayoExpert', url: '#' },
				{ label: 'Laboratorios de Mayo Clinic', url: '#' },
				{ label: 'Centro de videos', url: '#' },
				{ label: 'Revistas y publicaciones', url: '#' },
				{ label: 'Asociación de Exalumnos de Mayo Clinic', url: '#' },
			],
		},
		{
			id: 'research',
			label: 'Investigación y educación en Mayo Clinic',
			subItems: [
				{ label: 'Investigación médica', url: '#' },
				{ label: 'Educación médica', url: '#' },
				{ label: 'Laboratorios y centros', url: '#' },
			],
		},
	];

	// Toggle desktop dropdown
	const toggleDropdown = (dropdown) => {
		if (activeDropdown.value === dropdown) {
			closeDropdown();
		} else {
			activeDropdown.value = dropdown;
			addScrollPadding();
		}
	};

	// Close desktop dropdown
	const closeDropdown = () => {
		activeDropdown.value = null;
		removeScrollPadding();
	};

	// Toggle mobile menu
	const toggleMobileMenu = () => {
		isMobileMenuOpen.value = !isMobileMenuOpen.value;
		if (isMobileMenuOpen.value) {
			addScrollPadding();
		} else {
			removeScrollPadding();
		}
	};

	// Close mobile menu
	const closeMobileMenu = () => {
		isMobileMenuOpen.value = false;
		removeScrollPadding();
	};

	// Toggle mobile dropdown
	const toggleMobileDropdown = (dropdown) => {
		mobileDropdowns[dropdown] = !mobileDropdowns[dropdown];
	};

	// Computed property to get active dropdown items
	const getActiveDropdownItems = computed(() => {
		const activeItem = navigationItems.find(
			(item) => item.id === activeDropdown.value
		);
		return activeItem ? activeItem.subItems : [];
	});

	// Handle scroll for sticky header effects
	const handleScroll = () => {
		isScrolled.value = window.scrollY > 10;
	};

	// Add padding to body to prevent content shift
	const addScrollPadding = () => {
		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth;
		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = `${scrollbarWidth}px`;
	};

	// Remove padding from body
	const removeScrollPadding = () => {
		document.body.style.overflow = '';
		document.body.style.paddingRight = '';
	};

	// Setup scroll listener
	onMounted(() => {
		window.addEventListener('scroll', handleScroll);
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', handleScroll);
		removeScrollPadding();
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
