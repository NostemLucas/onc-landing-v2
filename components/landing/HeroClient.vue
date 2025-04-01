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
							@mouseenter="item.hasSubmenu ? (hoverIndex = index) : null"
							@mouseleave="item.hasSubmenu ? (hoverIndex = null) : null"
						>
							<!-- Botón con submenú -->
							<button
								v-if="item.hasSubmenu"
								class="flex items-center gap-1 text-[15px] font-medium transition-colors duration-200 hover:text-blue-600"
								:class="{ 'text-blue-600': hoverIndex === index }"
							>
								{{ item.label }}
								<ChevronDown
									class="h-4 w-4 transition-transform"
									:class="{ 'rotate-180': hoverIndex === index }"
								/>
								<span
									class="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"
									:class="{ 'w-full': hoverIndex === index }"
								></span>
							</button>

							<!-- Enlace sin submenú -->
							<NuxtLink
								v-else
								:to="item.url || '#'"
								class="group relative text-sm font-medium transition-colors duration-200 hover:text-blue-600"
								:class="{ 'text-blue-600': isActiveRoute(item.url) }"
							>
								{{ item.label }}
								<span
									class="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"
									:class="{ 'w-full': isActiveRoute(item.url) }"
								></span>
							</NuxtLink>

							<!-- Submenu -->
							<div
								v-if="item.hasSubmenu && hoverIndex === index"
								class="absolute top-full left-0 z-50 mt-2 w-64 rounded-md border border-gray-300 bg-white p-6 shadow-lg"
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
										<h3 class="mb-3 font-semibold text-gray-800">
											{{ column.title }}
										</h3>
										<ul class="space-y-2">
											<li
												v-for="(link, linkIndex) in column.links"
												:key="linkIndex"
											>
												<NuxtLink
													:to="link.url"
													class="group relative block text-sm transition-colors duration-200 hover:text-blue-600"
													:class="{
														'text-blue-600': isActiveRoute(link.url),
													}"
												>
													{{ link.label }}
													<span
														class="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"
													></span>
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
											class="group relative block text-sm transition-colors duration-200 hover:text-blue-600"
											:class="{ 'text-blue-600': isActiveRoute(subItem.url) }"
										>
											{{ subItem.label }}
											<span
												class="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"
												:class="{ 'w-full': isActiveRoute(subItem.url) }"
											></span>
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
							class="group relative text-sm font-medium transition-colors duration-200 hover:text-blue-600"
						>
							Solicita una cita
							<span
								class="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"
							></span>
						</a>
						<a
							href="#"
							class="rounded-full border border-gray-400 px-4 py-2 text-sm font-medium transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
						>
							Iniciar Sesión
						</a>
					</div>

					<!-- Mobile Menu Button -->
					<div class="lg:hidden">
						<button
							class="flex h-10 w-10 items-center justify-center rounded-full p-0 transition-colors hover:bg-gray-100"
							@click="isMobileMenuOpen = !isMobileMenuOpen"
						>
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
			v-if="hoverIndex !== null"
			class="fixed inset-0 z-40 hidden bg-black/20 lg:block"
			@click="hoverIndex = null"
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
					<button
						class="flex h-10 w-10 items-center justify-center rounded-full p-0 transition-colors hover:bg-gray-100"
						@click="isMobileMenuOpen = false"
					>
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
								class="relative block py-2 text-base font-medium transition-colors duration-200 hover:text-blue-600"
								:class="{ 'text-blue-600': isActiveRoute(item.url) }"
								@click="isMobileMenuOpen = false"
							>
								{{ item.label }}
								<span
									v-if="isActiveRoute(item.url)"
									class="absolute top-1/2 -left-3 h-6 w-1 -translate-y-1/2 rounded-r-md bg-blue-600"
								></span>
							</NuxtLink>

							<!-- Botón con submenú en móvil -->
							<div v-else>
								<button
									class="flex w-full items-center justify-between py-2 text-base font-medium transition-colors duration-200 hover:text-blue-600"
									:class="{ 'text-blue-600': mobileOpenSections[index] }"
									@click="toggleMobileSection(index)"
								>
									{{ item.label }}
									<ChevronDown
										class="h-5 w-5 transition-transform"
										:class="{ 'rotate-180': mobileOpenSections[index] }"
									/>
								</button>

								<Transition name="expand">
									<div
										v-if="mobileOpenSections[index]"
										class="mt-2 rounded-lg bg-gray-50 p-4"
									>
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
															class="relative block py-1 text-sm transition-colors duration-200 hover:text-blue-600"
															:class="{
																'text-blue-600': isActiveRoute(link.url),
															}"
															@click="isMobileMenuOpen = false"
														>
															{{ link.label }}
															<span
																v-if="isActiveRoute(link.url)"
																class="absolute top-1/2 -left-2 h-4 w-0.5 -translate-y-1/2 rounded-r-md bg-blue-600"
															></span>
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
													class="relative block py-1 text-sm transition-colors duration-200 hover:text-blue-600"
													:class="{
														'text-blue-600': isActiveRoute(subItem.url),
													}"
													@click="isMobileMenuOpen = false"
												>
													{{ subItem.label }}
													<span
														v-if="isActiveRoute(subItem.url)"
														class="absolute top-1/2 -left-2 h-4 w-0.5 -translate-y-1/2 rounded-r-md bg-blue-600"
													></span>
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
							class="relative block py-2 text-base font-medium transition-colors duration-200 hover:text-blue-600"
						>
							Solicita una cita
							<span
								class="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 hover:w-full"
							></span>
						</a>
						<a
							href="#"
							class="flex items-center justify-center rounded-full border border-gray-400 px-4 py-3 text-base font-medium transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
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
				@click="isMobileMenuOpen = false"
			></div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
	import { ChevronDown, Menu, X } from 'lucide-vue-next';
	import { useRoute } from 'vue-router';

	// Get current route for active link detection
	const route = useRoute();

	// Estado simplificado
	const isScrolled = ref(false);
	const isMobileMenuOpen = ref(false);
	const hoverIndex = ref<number | null>(null);
	const mobileOpenSections = ref<Record<number, boolean>>({});

	// Datos de navegación
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
			url: '/tratamientos',
		},
		{
			label: 'Nuestros Profesionales',
			hasSubmenu: false,
			url: '/profesionales',
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

	// Función simplificada para verificar si una ruta está activa
	const isActiveRoute = (url: string): boolean => {
		if (!url || url === '#') return false;
		return url === '/' ? route.path === '/' : route.path === url;
	};

	// Función simplificada para alternar secciones móviles
	const toggleMobileSection = (index: number): void => {
		mobileOpenSections.value = {
			...mobileOpenSections.value,
			[index]: !mobileOpenSections.value[index],
		};
	};

	// Manejo del scroll para efectos de header
	const handleScroll = (): void => {
		isScrolled.value = window.scrollY > 10;
	};

	// Gestión del overflow del body cuando el menú móvil está abierto
	watch(isMobileMenuOpen, (newValue) => {
		document.body.style.overflow = newValue ? 'hidden' : '';
	});

	// Configuración de eventos
	onMounted(() => {
		window.addEventListener('scroll', handleScroll);
		handleScroll();
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', handleScroll);
		document.body.style.overflow = '';
	});
</script>
