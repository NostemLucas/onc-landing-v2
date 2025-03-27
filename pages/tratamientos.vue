<template>
	<div class="bg-white">
		<div class="container mx-auto px-4 py-16 md:px-6 lg:py-20">
			<!-- Encabezado de la página -->
			<div class="mx-auto mb-16 max-w-3xl text-center">
				<h1 class="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
					Tratamientos
				</h1>
				<div class="mx-auto mb-6 h-1 w-20 bg-blue-600"></div>
				<p class="leading-relaxed text-gray-600">
					En OncoClinic ofrecemos tratamientos oncológicos avanzados y
					personalizados para cada paciente, utilizando las técnicas más
					innovadoras y respaldadas por la evidencia científica.
				</p>
			</div>

			<!-- Trasplante de Médula Ósea -->
			<section class="mb-20">
				<div class="flex flex-col gap-8 lg:flex-row">
					<div class="lg:w-1/2">
						<div class="mb-6">
							<span
								class="text-sm font-medium tracking-wider text-blue-600 uppercase"
							>
								Tratamiento
							</span>
							<h2 class="mt-1 text-2xl font-bold text-blue-700 md:text-3xl">
								Trasplante De Médula Ósea
							</h2>
						</div>

						<p class="mb-4 text-gray-600">
							Un trasplante de médula ósea es un procedimiento médico que
							reemplaza la médula ósea por células sanas. Las células de
							reemplazo pueden provenir del propio paciente o de un donante.
						</p>

						<p class="mb-6 text-gray-600">
							La médula ósea es el tejido esponjoso que se encuentra dentro de
							los huesos y que consideramos verdadero de células madre
							hematopoyéticas. El trasplante se puede utilizar para tratar
							ciertos tipos de cáncer, como la leucemia o el linfoma, o
							enfermedades que afectan la producción de células de la sangre que
							fabrica la médula ósea.
						</p>

						<!-- Acordeones -->
						<div class="space-y-4">
							<div
								class="accordion-item overflow-hidden rounded-md border border-gray-200"
							>
								<button
									class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
									@click="toggleAccordion('celulas-madre')"
								>
									<span class="font-medium text-blue-700">
										¿Qué son las células madre?
									</span>
									<ChevronDown
										class="h-5 w-5 text-blue-700 transition-transform duration-200"
										:class="{
											'rotate-180': activeAccordion === 'celulas-madre',
										}"
									/>
								</button>
								<div
									class="accordion-content overflow-hidden transition-all duration-300"
									:class="
										activeAccordion === 'celulas-madre' ? 'max-h-96' : 'max-h-0'
									"
								>
									<div class="border-t border-gray-200 bg-gray-50 p-4">
										<p class="text-gray-600">
											Las células madre son células especiales que pueden
											reproducirse a sí mismas y convertirse en distintos tipos
											de células que el cuerpo necesita. Hay varios tipos de
											células madre y se encuentran en diferentes partes del
											cuerpo, incluyendo la médula ósea, la sangre y el cordón
											umbilical.
										</p>
									</div>
								</div>
							</div>

							<div
								class="accordion-item overflow-hidden rounded-md border border-gray-200"
							>
								<button
									class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
									@click="toggleAccordion('como-funciona')"
								>
									<span class="font-medium text-blue-700">
										¿Cómo funciona un trasplante de células madre/médula ósea?
									</span>
									<ChevronDown
										class="h-5 w-5 text-blue-700 transition-transform duration-200"
										:class="{
											'rotate-180': activeAccordion === 'como-funciona',
										}"
									/>
								</button>
								<div
									class="accordion-content overflow-hidden transition-all duration-300"
									:class="
										activeAccordion === 'como-funciona' ? 'max-h-96' : 'max-h-0'
									"
								>
									<div class="border-t border-gray-200 bg-gray-50 p-4">
										<p class="text-gray-600">
											En general, este proceso conlleva recolectar las células
											madre del donante, la eliminación de tratamientos de
											preparación para el cuerpo para el receptor, la infusión
											de células y la monitorización posterior del recuperación.
										</p>
										<p class="mt-2 text-gray-600">
											A menudo, se puede utilizar el trasplante en el que las
											células que provienen directa el paciente de trasplante
											(autólogo).
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="lg:w-1/2">
						<div class="overflow-hidden rounded-xl shadow-lg">
							<img
								src="https://images.unsplash.com/photo-1579154204594-2f4da161f4b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
								alt="Trasplante de Médula Ósea"
								class="h-64 w-full object-cover object-center"
							/>

							<div class="bg-white p-6">
								<h3 class="mb-4 text-lg font-semibold text-gray-800">
									¿Qué tipos de trasplante de células madre existen?
								</h3>

								<div class="space-y-3">
									<div class="custom-select relative">
										<button
											class="select-trigger flex w-full items-center justify-between rounded-md border border-gray-300 bg-white p-3 text-left hover:bg-gray-50"
											@click="toggleSelect('trasplante1')"
										>
											<span>
												{{
													selectedOptions.trasplante1 || 'Trasplante Alogénico'
												}}
											</span>
											<ChevronDown class="h-5 w-5 text-gray-500" />
										</button>
										<div
											v-if="activeSelect === 'trasplante1'"
											class="select-options absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg"
										>
											<div
												class="select-option cursor-pointer p-3 hover:bg-gray-100"
												@click="
													selectOption('trasplante1', 'Trasplante Alogénico')
												"
											>
												Trasplante Alogénico
											</div>
											<div
												class="select-option cursor-pointer p-3 hover:bg-gray-100"
												@click="
													selectOption('trasplante1', 'Trasplante Autólogo')
												"
											>
												Trasplante Autólogo
											</div>
											<div
												class="select-option cursor-pointer p-3 hover:bg-gray-100"
												@click="
													selectOption(
														'trasplante1',
														'Trasplante de Cordón Umbilical'
													)
												"
											>
												Trasplante de Cordón Umbilical
											</div>
										</div>
									</div>

									<div class="custom-select relative">
										<button
											class="select-trigger flex w-full items-center justify-between rounded-md border border-gray-300 bg-white p-3 text-left hover:bg-gray-50"
											@click="toggleSelect('trasplante2')"
										>
											<span>
												{{
													selectedOptions.trasplante2 ||
													'Trasplante de Sangre de Cordón Umbilical'
												}}
											</span>
											<ChevronDown class="h-5 w-5 text-gray-500" />
										</button>
										<div
											v-if="activeSelect === 'trasplante2'"
											class="select-options absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg"
										>
											<div
												class="select-option cursor-pointer p-3 hover:bg-gray-100"
												@click="
													selectOption(
														'trasplante2',
														'Trasplante de Sangre de Cordón Umbilical'
													)
												"
											>
												Trasplante de Sangre de Cordón Umbilical
											</div>
											<div
												class="select-option cursor-pointer p-3 hover:bg-gray-100"
												@click="
													selectOption('trasplante2', 'Trasplante Alogénico')
												"
											>
												Trasplante Alogénico
											</div>
											<div
												class="select-option cursor-pointer p-3 hover:bg-gray-100"
												@click="
													selectOption('trasplante2', 'Trasplante Autólogo')
												"
											>
												Trasplante Autólogo
											</div>
										</div>
									</div>

									<div class="custom-select relative">
										<button
											class="select-trigger flex w-full items-center justify-between rounded-md border border-gray-300 bg-white p-3 text-left hover:bg-gray-50"
											@click="toggleSelect('trasplante3')"
										>
											<span>
												{{
													selectedOptions.trasplante3 ||
													'Trasplante de Progenitores y De Inyección De Composites'
												}}
											</span>
											<ChevronDown class="h-5 w-5 text-gray-500" />
										</button>
										<div
											v-if="activeSelect === 'trasplante3'"
											class="select-options absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg"
										>
											<div
												class="select-option cursor-pointer p-3 hover:bg-gray-100"
												@click="
													selectOption(
														'trasplante3',
														'Trasplante de Progenitores y De Inyección De Composites'
													)
												"
											>
												Trasplante de Progenitores y De Inyección De Composites
											</div>
											<div
												class="select-option cursor-pointer p-3 hover:bg-gray-100"
												@click="
													selectOption(
														'trasplante3',
														'Trasplante de Sangre de Cordón Umbilical'
													)
												"
											>
												Trasplante de Sangre de Cordón Umbilical
											</div>
											<div
												class="select-option cursor-pointer p-3 hover:bg-gray-100"
												@click="
													selectOption('trasplante3', 'Trasplante Alogénico')
												"
											>
												Trasplante Alogénico
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Inmunoterapia -->
			<section class="mb-20">
				<div class="flex flex-col gap-8 lg:flex-row-reverse">
					<div class="lg:w-1/2">
						<div class="mb-6">
							<span
								class="text-sm font-medium tracking-wider text-blue-600 uppercase"
							>
								Tratamiento
							</span>
							<h2 class="mt-1 text-2xl font-bold text-blue-700 md:text-3xl">
								Inmunoterapia
							</h2>
						</div>

						<p class="mb-6 text-gray-600">
							La inmunoterapia es un tipo de tratamiento para el cáncer. Utiliza
							sustancias producidas por el cuerpo o en un laboratorio para
							mejorar el sistema inmunitario y ayudarlo a encontrar y destruir
							células cancerosas.
						</p>

						<!-- Acordeones -->
						<div class="space-y-4">
							<div
								class="accordion-item overflow-hidden rounded-md border border-gray-200"
							>
								<button
									class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
									@click="toggleAccordion('inmunoterapia-cancer')"
								>
									<span class="font-medium text-blue-700">
										¿Cómo Se Usa La Inmunoterapia Para Tratar El Cáncer?
									</span>
									<ChevronDown
										class="h-5 w-5 text-blue-700 transition-transform duration-200"
										:class="{
											'rotate-180': activeAccordion === 'inmunoterapia-cancer',
										}"
									/>
								</button>
								<div
									class="accordion-content overflow-hidden transition-all duration-300"
									:class="
										activeAccordion === 'inmunoterapia-cancer'
											? 'max-h-96'
											: 'max-h-0'
									"
								>
									<div class="border-t border-gray-200 bg-gray-50 p-4">
										<p class="text-gray-600">
											La inmunoterapia es un tratamiento que utiliza ciertas
											partes del sistema inmunitario de una persona para
											combatir enfermedades como el cáncer. Esto se puede hacer
											de varias maneras: estimulando su propio sistema
											inmunitario para que trabaje más intensamente o de manera
											más específica para atacar las células cancerosas, o
											administrando componentes del sistema inmunitario, como
											proteínas producidas en el laboratorio, para atacar a las
											células cancerosas.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div class="mt-6">
							<div class="custom-select relative">
								<button
									class="select-trigger flex w-full items-center justify-between rounded-md border border-gray-300 bg-white p-3 text-left hover:bg-gray-50"
									@click="toggleSelect('anticuerpos')"
								>
									<span>
										{{
											selectedOptions.anticuerpos ||
											'Anticuerpos Monoclonales Y Sus Efectos Secundarios'
										}}
									</span>
									<ChevronDown class="h-5 w-5 text-gray-500" />
								</button>
								<div
									v-if="activeSelect === 'anticuerpos'"
									class="select-options absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg"
								>
									<div
										class="select-option cursor-pointer p-3 hover:bg-gray-100"
										@click="
											selectOption(
												'anticuerpos',
												'Anticuerpos Monoclonales Y Sus Efectos Secundarios'
											)
										"
									>
										Anticuerpos Monoclonales Y Sus Efectos Secundarios
									</div>
									<div
										class="select-option cursor-pointer p-3 hover:bg-gray-100"
										@click="
											selectOption(
												'anticuerpos',
												'Inhibidores De Puntos De Control Inmunitario'
											)
										"
									>
										Inhibidores De Puntos De Control Inmunitario
									</div>
									<div
										class="select-option cursor-pointer p-3 hover:bg-gray-100"
										@click="
											selectOption('anticuerpos', 'Terapias De Células T')
										"
									>
										Terapias De Células T
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="lg:w-1/2">
						<div
							class="flex h-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50"
						>
							<img
								src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
								alt="Inmunoterapia"
								class="h-auto max-h-96 w-full object-contain p-6"
							/>
						</div>
					</div>
				</div>
			</section>

			<!-- Quimioterapia -->
			<section>
				<div class="flex flex-col gap-8 lg:flex-row">
					<div class="lg:w-1/2">
						<div class="mb-6">
							<span
								class="text-sm font-medium tracking-wider text-blue-600 uppercase"
							>
								Tratamiento
							</span>
							<h2 class="mt-1 text-2xl font-bold text-blue-700 md:text-3xl">
								Quimioterapia
							</h2>
						</div>

						<p class="mb-4 text-gray-600">
							La quimioterapia es el uso de fármacos para destruir las células
							cancerosas. Este tipo de tratamiento contra el cáncer actúa sobre
							las células cancerosas, matando las células y frenando su avance.
						</p>

						<p class="mb-6 text-gray-600">
							La quimioterapia se puede usar como tratamiento principal o como
							terapia adyuvante (después de la cirugía o radioterapia). Existen
							varios tipos: "quimioterapia estándar", "quimioterapia
							tradicional" y "quimioterapia citotóxica".
						</p>

						<!-- Acordeones -->
						<div class="space-y-4">
							<div
								class="accordion-item overflow-hidden rounded-md border border-gray-200"
							>
								<button
									class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
									@click="toggleAccordion('quimioterapia-cancer')"
								>
									<span class="font-medium text-blue-700">
										¿Cómo Trata La Quimioterapia El Cáncer?
									</span>
									<ChevronDown
										class="h-5 w-5 text-blue-700 transition-transform duration-200"
										:class="{
											'rotate-180': activeAccordion === 'quimioterapia-cancer',
										}"
									/>
								</button>
								<div
									class="accordion-content overflow-hidden transition-all duration-300"
									:class="
										activeAccordion === 'quimioterapia-cancer'
											? 'max-h-96'
											: 'max-h-0'
									"
								>
									<div class="border-t border-gray-200 bg-gray-50 p-4">
										<p class="text-gray-600">
											La quimioterapia es tratada por un médico oncólogo y llega
											a todas las partes del cuerpo. Existen muchos tipos
											diferentes de quimioterapia que funcionan de distintas
											maneras para destruir las células cancerosas o impedir que
											estas crezcan más rápido. Una célula durante puede pasar a
											través de varias fases del ciclo celular.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div class="mt-6 space-y-3">
							<div class="custom-select relative">
								<button
									class="select-trigger flex w-full items-center justify-between rounded-md border border-gray-300 bg-white p-3 text-left hover:bg-gray-50"
									@click="toggleSelect('ciclos')"
								>
									<span>
										{{
											selectedOptions.ciclos ||
											'¿Cuántos Ciclos Típicos Necesitaré Quimioterapia?'
										}}
									</span>
									<ChevronDown class="h-5 w-5 text-gray-500" />
								</button>
								<div
									v-if="activeSelect === 'ciclos'"
									class="select-options absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg"
								>
									<div
										class="select-option cursor-pointer p-3 hover:bg-gray-100"
										@click="
											selectOption(
												'ciclos',
												'¿Cuántos Ciclos Típicos Necesitaré Quimioterapia?'
											)
										"
									>
										¿Cuántos Ciclos Típicos Necesitaré Quimioterapia?
									</div>
									<div
										class="select-option cursor-pointer p-3 hover:bg-gray-100"
										@click="
											selectOption(
												'ciclos',
												'¿Cuánto Dura Un Ciclo De Quimioterapia?'
											)
										"
									>
										¿Cuánto Dura Un Ciclo De Quimioterapia?
									</div>
									<div
										class="select-option cursor-pointer p-3 hover:bg-gray-100"
										@click="
											selectOption(
												'ciclos',
												'¿Cuáles Son Los Efectos Secundarios Comunes?'
											)
										"
									>
										¿Cuáles Son Los Efectos Secundarios Comunes?
									</div>
								</div>
							</div>

							<div class="custom-select relative">
								<button
									class="select-trigger flex w-full items-center justify-between rounded-md border border-gray-300 bg-white p-3 text-left hover:bg-gray-50"
									@click="toggleSelect('tipos')"
								>
									<span>
										{{
											selectedOptions.tipos ||
											'¿Qué Tipos Diferentes De Quimioterapia Hay?'
										}}
									</span>
									<ChevronDown class="h-5 w-5 text-gray-500" />
								</button>
								<div
									v-if="activeSelect === 'tipos'"
									class="select-options absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg"
								>
									<div
										class="select-option cursor-pointer p-3 hover:bg-gray-100"
										@click="
											selectOption(
												'tipos',
												'¿Qué Tipos Diferentes De Quimioterapia Hay?'
											)
										"
									>
										¿Qué Tipos Diferentes De Quimioterapia Hay?
									</div>
									<div
										class="select-option cursor-pointer p-3 hover:bg-gray-100"
										@click="selectOption('tipos', 'Quimioterapia Oral')"
									>
										Quimioterapia Oral
									</div>
									<div
										class="select-option cursor-pointer p-3 hover:bg-gray-100"
										@click="selectOption('tipos', 'Quimioterapia Intravenosa')"
									>
										Quimioterapia Intravenosa
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="lg:w-1/2">
						<div class="h-full overflow-hidden rounded-xl shadow-lg">
							<img
								src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
								alt="Quimioterapia"
								class="h-80 w-full object-cover object-center"
							/>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, onUnmounted } from 'vue';
	import { ChevronDown } from 'lucide-vue-next';

	// Estado para los acordeones
	const activeAccordion = ref<string | null>(null);

	// Estado para los selectores
	const activeSelect = ref<string | null>(null);
	const selectedOptions = ref<Record<string, string>>({});

	// Función para alternar acordeones
	const toggleAccordion = (id: string) => {
		if (activeAccordion.value === id) {
			activeAccordion.value = null;
		} else {
			activeAccordion.value = id;
		}
	};

	// Función para alternar selectores
	const toggleSelect = (id: string) => {
		if (activeSelect.value === id) {
			activeSelect.value = null;
		} else {
			activeSelect.value = id;
		}
	};

	// Función para seleccionar una opción
	const selectOption = (selectId: string, value: string) => {
		selectedOptions.value[selectId] = value;
		activeSelect.value = null;
	};

	// Cerrar selectores al hacer clic fuera
	const handleClickOutside = (event: MouseEvent) => {
		if (
			activeSelect.value &&
			!(event.target as Element).closest('.custom-select')
		) {
			activeSelect.value = null;
		}
	};

	// Agregar/eliminar event listener para cerrar selectores al hacer clic fuera
	onMounted(() => {
		document.addEventListener('click', handleClickOutside);
	});

	onUnmounted(() => {
		document.removeEventListener('click', handleClickOutside);
	});
</script>

<style scoped>
	/* Estilos para los acordeones */
	.accordion-content {
		transition: max-height 0.3s ease-in-out;
	}

	/* Estilos para los selectores */
	.select-options {
		max-height: 200px;
		overflow-y: auto;
	}

	/* Asegurar que los selectores estén por encima de otros elementos */
	.custom-select {
		position: relative;
		z-index: 10;
	}

	/* Estilos para el contenedor */
	.container {
		max-width: 1200px;
	}

	/* Estilos responsivos */
	@media (max-width: 1023px) {
		.lg\:w-1\/2 {
			width: 100%;
		}

		.lg\:flex-row,
		.lg\:flex-row-reverse {
			flex-direction: column;
		}
	}
</style>
