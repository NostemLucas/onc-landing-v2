loginincia
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
							<NuxtImg
								src="logo.png"
								alt="Logo"
								width="240"
								draggable="false"
							/>
						</NuxtLink>
					</div>

					<!-- Desktop Navigation -->
					<nav class="hidden lg:flex lg:items-center lg:gap-6">
						<div
							v-for="(item, index) in navigationItems"
							:key="index"
							class="group relative"
							@mouseenter="openMenu(index)"
							@mouseleave="closeMenuWithDelay(index)"
							@focusin="openMenu(index)"
							@focusout="handleFocusOut($event, index)"
						>
							<!-- Botón con submenú -->
							<UButton
								variant="link"
								v-if="item.subItems"
								class="flex items-center gap-1 font-medium transition-colors duration-200 hover:text-blue-600 text-base text-black tracking-wider"
							>
								{{ item.label }}
								<ChevronDown
									class="h-4 w-4 transition-transform duration-300"
									:class="{ 'rotate-180': openMenus[index] }"
								/>
								<span
									class="absolute -bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300"
									:style="{ width: openMenus[index] ? '100%' : '0%' }"
								/>
							</UButton>

							<!-- Enlace con url -->
							<UButton
								v-else-if="item.url"
								variant="link"
								:to="item.url || '#'"
								class="group relative font-medium transition-colors duration-200 hover:text-blue-600 text-base text-black tracking-wide"
								:class="{ 'text-blue-600': isActiveRoute(item.url) }"
							>
								{{ item.label }}
								<span
									class="absolute -bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300"
									:style="{
										width: isActiveRoute(item.url)
											? '100%'
											: openMenus[index]
												? '100%'
												: '0%',
									}"
								/>
							</UButton>

							<!-- Botón con columnas -->
							<UButton
								variant="link"
								v-else-if="item.columns"
								class="flex items-center gap-1 font-medium transition-colors duration-200 hover:text-blue-600 text-base text-black"
							>
								{{ item.label }}
								<ChevronDown
									class="h-4 w-4 transition-transform duration-300"
									:class="{ 'rotate-180': openMenus[index] }"
								/>
								<span
									class="absolute -bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300"
									:style="{ width: openMenus[index] ? '100%' : '0%' }"
								/>
							</UButton>

							<!-- Submenu para subItems -->
							<div
								v-if="item.subItems"
								class="absolute top-full left-0 z-50 mt-2 w-64 rounded-md border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300"
								:class="{
									'opacity-100 visible': openMenus[index],
									'opacity-0 invisible': !openMenus[index],
								}"
							>
								<!-- Flecha del submenu -->
								<div
									class="absolute -top-2 left-4 h-4 w-4 rotate-45 border-t border-l border-gray-200 bg-white"
								></div>

								<ul class="space-y-2">
									<li
										v-for="(subItem, subIndex) in item.subItems"
										:key="subIndex"
									>
										<NuxtLink
											:to="subItem.url"
											class="group relative block py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600"
											:class="{ 'text-blue-600': isActiveRoute(subItem.url) }"
										>
											{{ subItem.label }}
											<span
												class="absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300"
												:style="{
													width: isActiveRoute(subItem.url) ? '100%' : '0%',
													transitionDelay: subIndex * 50 + 'ms',
												}"
												:class="{
													'group-hover:w-full': !isActiveRoute(subItem.url),
												}"
											></span>
										</NuxtLink>
									</li>
								</ul>
							</div>

							<!-- Submenu para columns -->
							<div
								v-if="item.columns"
								class="absolute top-full left-0 z-50 mt-2 w-[500px] rounded-md border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300"
								:class="{
									'opacity-100 visible': openMenus[index],
									'opacity-0 invisible': !openMenus[index],
								}"
							>
								<!-- Flecha del submenu -->
								<div
									class="absolute -top-2 left-4 h-4 w-4 rotate-45 border-t border-l border-gray-200 bg-white"
								></div>

								<div class="grid grid-cols-2 gap-8">
									<div
										v-for="(column, colIndex) in item.columns"
										:key="colIndex"
									>
										<h3 class="mb-3 text-sm font-semibold text-gray-800">
											{{ column.title }}
										</h3>
										<ul class="space-y-2">
											<li
												v-for="(link, linkIndex) in column.links"
												:key="linkIndex"
											>
												<NuxtLink
													:to="link.url"
													class="group relative block py-1 text-sm text-gray-700 transition-colors duration-200 hover:text-blue-600"
													:class="{
														'text-blue-600': isActiveRoute(link.url),
													}"
												>
													{{ link.label }}
													<span
														class="absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300"
														:style="{
															width: isActiveRoute(link.url) ? '100%' : '0%',
															transitionDelay:
																(colIndex * 3 + linkIndex) * 30 + 'ms',
														}"
														:class="{
															'group-hover:w-full': !isActiveRoute(link.url),
														}"
													></span>
												</NuxtLink>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</nav>

					<!-- Action Buttons -->
					<div class="hidden items-center gap-4 lg:flex">
						<NuxtLink
							href="#"
							class="group relative text-sm font-medium transition-colors duration-200 hover:text-blue-600"
						>
							Solicita una cita
							<span
								class="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"
							></span>
						</NuxtLink>
						<NuxtLink
							href="/login"
							class="rounded-full border border-gray-400 px-4 py-2 text-sm font-medium transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
						>
							Iniciar Sesión
						</NuxtLink>
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

		<!-- Mobile Menu -->
		<div
			v-if="isMobileMenuOpen"
			class="fixed inset-0 z-40 bg-white pt-24 lg:hidden"
		>
			<div class="container mx-auto px-4 py-6">
				<nav class="space-y-6">
					<div
						v-for="(item, index) in navigationItems"
						:key="index"
						class="border-b border-gray-100 pb-4"
					>
						<div
							class="flex items-center justify-between py-2"
							@click="toggleMobileSection(index)"
						>
							<span class="text-lg font-medium">{{ item.label }}</span>
							<ChevronDown
								class="h-5 w-5 transition-transform duration-300"
								:class="{ 'rotate-180': mobileOpenSections[index] }"
							/>
						</div>

						<!-- Submenu para subItems en móvil -->
						<div
							v-if="item.subItems && mobileOpenSections[index]"
							class="mt-2 space-y-2 pl-4"
						>
							<NuxtLink
								v-for="(subItem, subIndex) in item.subItems"
								:key="subIndex"
								:to="subItem.url"
								class="block py-2 text-gray-600 hover:text-blue-600"
								:class="{ 'text-blue-600': isActiveRoute(subItem.url) }"
							>
								{{ subItem.label }}
							</NuxtLink>
						</div>

						<!-- Submenu para columns en móvil -->
						<div
							v-if="item.columns && mobileOpenSections[index]"
							class="mt-2 space-y-4 pl-4"
						>
							<div
								v-for="(column, colIndex) in item.columns"
								:key="colIndex"
								class="mb-4"
							>
								<h3 class="mb-2 font-medium">{{ column.title }}</h3>
								<div class="space-y-2 pl-2">
									<NuxtLink
										v-for="(link, linkIndex) in column.links"
										:key="linkIndex"
										:to="link.url"
										class="block py-1 text-gray-600 hover:text-blue-600"
										:class="{ 'text-blue-600': isActiveRoute(link.url) }"
									>
										{{ link.label }}
									</NuxtLink>
								</div>
							</div>
						</div>
					</div>
				</nav>

				<!-- Mobile Action Buttons -->
				<div class="mt-6 flex flex-col space-y-4">
					<a
						href="#"
						class="block w-full rounded-md bg-gray-100 px-4 py-3 text-center font-medium hover:bg-gray-200"
					>
						Solicita una cita
					</a>
					<a
						href="#"
						class="block w-full rounded-md bg-blue-600 px-4 py-3 text-center font-medium text-white hover:bg-blue-700"
					>
						Iniciar Sesión
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch, onMounted, onUnmounted } from 'vue';
	import { ChevronDown, Menu, X } from 'lucide-vue-next';
	import { useRoute } from 'vue-router';

	import { navigationItems } from '../../mocks/navigation';
	const route = useRoute();
	const isScrolled = ref(false);
	const isMobileMenuOpen = ref(false);
	const mobileOpenSections = ref<Record<number, boolean>>({});
	const openMenus = ref<Record<number, boolean>>({});
	const menuCloseTimers = ref<Record<number, number>>({});

	const isActiveRoute = (url: string): boolean => {
		if (!url || url === '#') return false;
		return url === '/' ? route.path === '/' : route.path.startsWith(url);
	};

	const toggleMobileSection = (index: number): void => {
		mobileOpenSections.value = {
			...mobileOpenSections.value,
			[index]: !mobileOpenSections.value[index],
		};
	};

	const openMenu = (index: number): void => {
		// Clear any existing close timer for this menu
		if (menuCloseTimers.value[index]) {
			clearTimeout(menuCloseTimers.value[index]);
			delete menuCloseTimers.value[index];
		}
		openMenus.value = { ...openMenus.value, [index]: true };
	};

	const closeMenu = (index: number): void => {
		openMenus.value = { ...openMenus.value, [index]: false };
	};

	const closeMenuWithDelay = (index: number): void => {
		// Set a timer to close the menu after a delay
		menuCloseTimers.value[index] = window.setTimeout(() => {
			closeMenu(index);
		}, 150); // Small delay to allow moving to submenu
	};

	const handleFocusOut = (event: FocusEvent, index: number): void => {
		// Check if the new focus target is still within our menu
		const currentTarget = event.currentTarget as HTMLElement;
		const relatedTarget = event.relatedTarget as HTMLElement;

		if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
			closeMenu(index);
		}
	};

	const handleScroll = (): void => {
		isScrolled.value = window.scrollY > 10;
	};

	// Gestión del overflow del body cuando el menú móvil está abierto
	watch(isMobileMenuOpen, (newValue) => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = newValue ? 'hidden' : '';
		}
	});

	// Configuración de eventos
	onMounted(() => {
		window.addEventListener('scroll', handleScroll);
		handleScroll();
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', handleScroll);
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
		// Clear any pending timers
		Object.values(menuCloseTimers.value).forEach((timerId) => {
			clearTimeout(timerId);
		});
	});
</script>
