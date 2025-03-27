<template>
	<div class="w-full">
		<!-- Navigation -->
		<header
			class="fixed top-0 right-0 left-0 z-50 h-24 border-b border-gray-200 bg-white/95 backdrop-blur-xl transition-shadow duration-300"
			:class="{ 'shadow-md': isScrolled }"
		>
			<div class="mx-auto h-full w-full px-4 lg:container lg:px-6">
				<div class="flex h-full items-center justify-between">
					<!-- Logo -->
					<div class="flex-shrink-0">
						<NuxtLink to="/" class="block">
							<div class="flex items-center">
								<NuxtImg
									src="logo.png"
									alt="Logo"
									width="220"
									height="50"
									draggable="false"
								/>
							</div>
						</NuxtLink>
					</div>

					<!-- Desktop Navigation -->
					<nav class="hidden lg:flex lg:items-center lg:gap-6">
						<div
							v-for="(item, index) in navigationItems"
							:key="index"
							class="group relative"
						>
							<!-- Botón con submenú -->
							<button
								v-if="item.hasSubmenu"
								class="hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors"
								@click="toggleSubmenu(index)"
							>
								{{ item.label }}
								<ChevronDown
									class="h-4 w-4 transition-transform"
									:class="{ 'rotate-180': activeSubmenu === index }"
								/>
							</button>

							<!-- Enlace sin submenú -->
							<NuxtLink
								v-else
								:to="item.url || '#'"
								class="hover:text-primary text-sm font-medium transition-colors"
							>
								{{ item.label }}
							</NuxtLink>

							<!-- Submenu -->
							<div
								v-if="item.hasSubmenu && activeSubmenu === index"
								class="bg-background absolute top-full left-0 z-50 mt-2 w-64 rounded-md border border-gray-300 p-6 shadow-lg"
							>
								<!-- Flecha del submenu -->
								<div
									class="absolute -top-2 left-4 h-4 w-4 rotate-45 border-t border-l border-gray-300 bg-white"
								></div>

								<div v-if="item.columns" class="grid grid-cols-2 gap-8">
									<div
										v-for="(column, colIndex) in item.columns"
										:key="colIndex"
									>
										<h3 class="mb-3 font-semibold">{{ column.title }}</h3>
										<ul class="space-y-2">
											<template
												v-for="(link, linkIndex) in column.links"
												:key="linkIndex"
											>
												<NuxtLink
													:to="link.url"
													class="hover:text-primary block text-sm transition-colors"
												>
													{{ link.label }}
												</NuxtLink>
											</template>
										</ul>
									</div>
								</div>
								<ul v-else class="space-y-2">
									<li
										v-for="(subItem, subIndex) in item.subItems"
										:key="subIndex"
									>
										<a
											:href="subItem.url"
											class="hover:text-primary block text-sm transition-colors"
										>
											{{ subItem.label }}
										</a>
									</li>
								</ul>
							</div>
						</div>
					</nav>

					<!-- Action Buttons -->
					<div class="hidden items-center gap-4 lg:flex">
						<a
							href="#"
							class="hover:text-primary text-sm font-medium transition-colors"
						>
							Solicita una cita
						</a>
						<a
							href="#"
							class="hover:bg-primary-400 rounded-full border border-gray-400 px-4 py-2 transition-colors duration-300 hover:text-gray-100"
						>
							Iniciar Sesión
						</a>
					</div>

					<!-- Mobile Menu Button -->
					<div class="lg:hidden">
						<button class="h-8 w-8 p-0" @click="toggleMobileMenu">
							<Menu v-if="!isMobileMenuOpen" class="h-5 w-5" />
							<X v-else class="h-5 w-5" />
							<span class="sr-only">Toggle menu</span>
						</button>
					</div>
				</div>
			</div>
		</header>
		<div class="h-24" />

		<!-- Backdrop for desktop submenu -->
		<div
			v-if="activeSubmenu !== null"
			class="fixed inset-0 z-40 hidden bg-black/20 lg:block"
			@click="activeSubmenu = null"
		/>

		<!-- Mobile Menu Drawer -->
		<Transition name="drawer">
			<div
				v-if="isMobileMenuOpen"
				class="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-xl"
			>
				<div
					class="flex h-24 items-center justify-between border-b border-gray-200 px-6"
				>
					<div class="text-lg font-semibold">Menú</div>
					<button class="h-8 w-8 p-0" @click="toggleMobileMenu">
						<X class="h-5 w-5" />
						<span class="sr-only">Cerrar menú</span>
					</button>
				</div>

				<div class="h-[calc(100vh-6rem)] overflow-y-auto p-6">
					<nav class="flex flex-col space-y-6">
						<div
							v-for="(item, index) in navigationItems"
							:key="index"
							class="border-b border-gray-100 pb-4"
						>
							<!-- Enlace sin submenú en móvil -->
							<NuxtLink
								v-if="!item.hasSubmenu"
								:to="item.url || '#'"
								class="block py-2 text-base font-medium"
								@click="closeMobileMenu"
							>
								{{ item.label }}
							</NuxtLink>

							<!-- Botón con submenú en móvil -->
							<div v-else>
								<button
									class="flex w-full items-center justify-between py-2 text-base font-medium"
									@click="toggleMobileSubmenu(index)"
								>
									{{ item.label }}
									<ChevronDown
										class="h-5 w-5 transition-transform"
										:class="{ 'rotate-180': mobileSections[index] }"
									/>
								</button>

								<Transition name="expand">
									<div v-if="mobileSections[index]" class="mt-2 pl-4">
										<div v-if="item.columns">
											<div
												v-for="(column, colIndex) in item.columns"
												:key="colIndex"
												class="mb-4"
											>
												<h3 class="mb-2 text-sm font-semibold text-gray-500">
													{{ column.title }}
												</h3>
												<ul class="space-y-2">
													<li
														v-for="(link, linkIndex) in column.links"
														:key="linkIndex"
													>
														<NuxtLink
															:to="link.url"
															class="block py-1 text-sm"
															@click="closeMobileMenu"
														>
															{{ link.label }}
														</NuxtLink>
													</li>
												</ul>
											</div>
										</div>
										<ul v-else class="space-y-2">
											<li
												v-for="(subItem, subIndex) in item.subItems"
												:key="subIndex"
											>
												<a
													:href="subItem.url"
													class="block py-1 text-sm"
													@click="closeMobileMenu"
												>
													{{ subItem.label }}
												</a>
											</li>
										</ul>
									</div>
								</Transition>
							</div>
						</div>
					</nav>

					<!-- Mobile Action Buttons -->
					<div class="mt-8 flex flex-col space-y-4">
						<a
							href="#"
							class="hover:text-primary block py-2 text-base font-medium transition-colors"
						>
							Solicita una cita
						</a>
						<a
							href="#"
							class="hover:bg-primary-400 flex items-center justify-center rounded-full border border-gray-400 px-4 py-3 text-base font-medium transition-colors duration-300 hover:text-gray-100"
						>
							Iniciar Sesión
						</a>
					</div>
				</div>
			</div>
		</Transition>

		<!-- Backdrop for mobile menu -->
		<Transition name="fade">
			<div
				v-if="isMobileMenuOpen"
				class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
				@click="closeMobileMenu"
			></div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted, onUnmounted } from 'vue';
	import { ChevronDown, Menu, X } from 'lucide-vue-next';

	// State for mobile menu
	const isMobileMenuOpen = ref(false);
	const mobileSections = reactive<Record<number, boolean>>({});

	// Datos de navegación actualizados para soportar elementos sin submenú
	const navigationItems = [
		{
			label: 'Inicio',
			hasSubmenu: false,
			url: '/',
		},
		{
			label: 'Nosotros',
			hasSubmenu: false,
			url: '/nosotros',
		},

		{
			label: 'Tratamientos',
			hasSubmenu: false,
			url: '/Tratamientos',
		},

		{
			label: 'Nuestros Profesionales',
			hasSubmenu: false,
			url: '#',
		},
		{
			label: 'Investigación y Educación',
			hasSubmenu: true,
			columns: [
				{
					title: 'Investigación',
					links: [
						{ label: 'Ensayos Clínicos', url: '/investigacion/ensayos' },
						{ label: 'Publicaciones', url: '/investigacion/publicaciones' },
						{
							label: 'Conferencias Médicas',
							url: '/investigacion/conferencias',
						},
					],
				},
				{
					title: 'Recursos Educativos',
					links: [
						{ label: 'Guías para Pacientes', url: '/educacion/guias' },
						{ label: 'Videos Informativos', url: '/educacion/videos' },
						{ label: 'Charlas y Talleres', url: '/educacion/talleres' },
					],
				},
			],
		},
		{
			label: 'Contacto',
			hasSubmenu: false,
			url: '/contactos',
		},
	];

	// State for scroll detection
	const isScrolled = ref(false);

	// State for desktop submenu
	const activeSubmenu = ref<number | null>(null);

	// Toggle submenu for desktop
	const toggleSubmenu = (index: number) => {
		activeSubmenu.value = activeSubmenu.value === index ? null : index;
	};

	// Handle scrolling effect on header
	const handleScroll = () => {
		isScrolled.value = window.scrollY > 10;
	};

	// Event listeners for scroll handling
	onMounted(() => {
		window.addEventListener('scroll', handleScroll);
		handleScroll();
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', handleScroll);
		document.body.style.overflow = '';
	});

	// Toggle submenu for mobile
	const toggleMobileSubmenu = (index: number) => {
		mobileSections[index] = !mobileSections[index];
	};

	// Toggle mobile menu
	const toggleMobileMenu = () => {
		isMobileMenuOpen.value = !isMobileMenuOpen.value;
		document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : '';
	};

	// Close mobile menu
	const closeMobileMenu = () => {
		isMobileMenuOpen.value = false;
		document.body.style.overflow = '';
	};
</script>

<style scoped>
	.drawer-enter-active,
	.drawer-leave-active {
		transition: transform 0.3s ease-in-out;
	}

	.drawer-enter-from,
	.drawer-leave-to {
		transform: translateX(100%);
	}

	.expand-enter-active,
	.expand-leave-active {
		transition: all 0.3s ease-in-out;
		overflow: hidden;
	}

	.expand-enter-from,
	.expand-leave-to {
		max-height: 0;
		opacity: 0;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
