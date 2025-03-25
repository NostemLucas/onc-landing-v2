<template>
	<div class="min-h-screen bg-white">
		<!-- Encabezado de la página -->
		<section
			class="bg-gradient-to-r from-indigo-600 to-blue-700 py-16 text-white"
		>
			<div class="container mx-auto px-4">
				<div class="mx-auto max-w-3xl text-center">
					<h1 class="mb-4 text-3xl font-bold">Diagnósticos Especializados</h1>
					<p class="text-lg text-white/90">
						Utilizamos tecnología de vanguardia y métodos avanzados para
						proporcionar diagnósticos precisos y oportunos.
					</p>
				</div>
			</div>
		</section>

		<!-- Lista de diagnósticos -->
		<section class="py-16">
			<div class="container mx-auto px-4">
				<div class="mb-12 text-center">
					<div class="mx-auto mb-2 h-1 w-16 bg-indigo-600"></div>
					<h2 class="text-3xl font-bold text-gray-900">
						Nuestros Métodos Diagnósticos
					</h2>
					<p class="mx-auto mt-4 max-w-2xl text-gray-600">
						Ofrecemos una amplia gama de pruebas diagnósticas para detectar y
						evaluar diferentes tipos de cáncer y condiciones relacionadas.
					</p>
				</div>

				<div class="mx-auto max-w-4xl">
					<!-- Diagnóstico por Imagen -->
					<div class="mb-12 overflow-hidden rounded-lg bg-white shadow-lg">
						<div class="grid grid-cols-1 md:grid-cols-3">
							<div class="md:col-span-1">
								<img
									src="/logo.png"
									alt="Diagnóstico por Imagen"
									class="h-full w-full object-cover"
								/>
							</div>
							<div class="p-6 md:col-span-2">
								<div class="mb-2">
									<h3 class="text-xl font-bold text-indigo-700">
										Diagnóstico por Imagen
									</h3>
									<div class="mt-1 h-1 w-16 bg-indigo-600"></div>
								</div>

								<p class="mb-4 text-gray-700">
									Utilizamos tecnologías avanzadas de imagen para detectar y
									evaluar tumores y otras anomalías con precisión. Nuestros
									equipos de última generación permiten obtener imágenes
									detalladas que ayudan a nuestros especialistas a realizar
									diagnósticos precisos.
								</p>

								<div class="space-y-2">
									<div class="flex items-center">
										<Icon
											name="mdi:check-circle"
											class="mr-2 text-green-600"
											size="20"
										/>
										<span class="text-gray-700">
											Tomografía Computarizada (TC)
										</span>
									</div>
									<div class="flex items-center">
										<Icon
											name="mdi:check-circle"
											class="mr-2 text-green-600"
											size="20"
										/>
										<span class="text-gray-700">Resonancia Magnética (RM)</span>
									</div>
									<div class="flex items-center">
										<Icon
											name="mdi:check-circle"
											class="mr-2 text-green-600"
											size="20"
										/>
										<span class="text-gray-700">PET-CT</span>
									</div>
									<div class="flex items-center">
										<Icon
											name="mdi:check-circle"
											class="mr-2 text-green-600"
											size="20"
										/>
										<span class="text-gray-700">Ecografía</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Biopsia -->
					<div class="mb-12 overflow-hidden rounded-lg bg-white shadow-lg">
						<div class="grid grid-cols-1 md:grid-cols-3">
							<div class="order-1 md:order-2 md:col-span-1">
								<img
									src="/logo.png"
									alt="Biopsia"
									class="h-full w-full object-cover"
								/>
							</div>
							<div class="order-2 p-6 md:order-1 md:col-span-2">
								<div class="mb-2">
									<h3 class="text-xl font-bold text-indigo-700">Biopsia</h3>
									<div class="mt-1 h-1 w-16 bg-indigo-600"></div>
								</div>

								<p class="mb-4 text-gray-700">
									La biopsia es un procedimiento en el que se toma una muestra
									de tejido para examinarla bajo un microscopio. Es una
									herramienta esencial para el diagnóstico del cáncer y otras
									enfermedades.
								</p>

								<div class="space-y-2">
									<div class="flex items-center">
										<Icon
											name="mdi:check-circle"
											class="mr-2 text-green-600"
											size="20"
										/>
										<span class="text-gray-700">Biopsia por punción</span>
									</div>
									<div class="flex items-center">
										<Icon
											name="mdi:check-circle"
											class="mr-2 text-green-600"
											size="20"
										/>
										<span class="text-gray-700">Biopsia quirúrgica</span>
									</div>
									<div class="flex items-center">
										<Icon
											name="mdi:check-circle"
											class="mr-2 text-green-600"
											size="20"
										/>
										<span class="text-gray-700">Biopsia guiada por imagen</span>
									</div>
									<div class="flex items-center">
										<Icon
											name="mdi:check-circle"
											class="mr-2 text-green-600"
											size="20"
										/>
										<span class="text-gray-700">
											Análisis patológico avanzado
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Análisis Genético -->
					<div class="mb-12 overflow-hidden rounded-lg bg-white shadow-lg">
						<div class="grid grid-cols-1 md:grid-cols-3">
							<div class="md:col-span-1">
								<img
									src="/logo.png"
									alt="Análisis Genético"
									class="h-full w-full object-cover"
								/>
							</div>
							<div class="p-6 md:col-span-2">
								<div class="mb-2">
									<h3 class="text-xl font-bold text-indigo-700">
										Análisis Genético
									</h3>
									<div class="mt-1 h-1 w-16 bg-indigo-600"></div>
								</div>

								<p class="mb-4 text-gray-700">
									El análisis genético nos permite identificar mutaciones y
									alteraciones en el ADN que pueden estar relacionadas con el
									cáncer. Esta información es crucial para desarrollar
									tratamientos personalizados y medicina de precisión.
								</p>

								<div class="space-y-2">
									<div class="flex items-center">
										<Icon
											name="mdi:check-circle"
											class="mr-2 text-green-600"
											size="20"
										/>
										<span class="text-gray-700">Secuenciación genómica</span>
									</div>
									<div class="flex items-center">
										<Icon
											name="mdi:check-circle"
											class="mr-2 text-green-600"
											size="20"
										/>
										<span class="text-gray-700">Pruebas de biomarcadores</span>
									</div>
									<div class="flex items-center">
										<Icon
											name="mdi:check-circle"
											class="mr-2 text-green-600"
											size="20"
										/>
										<span class="text-gray-700">
											Análisis de mutaciones específicas
										</span>
									</div>
									<div class="flex items-center">
										<Icon
											name="mdi:check-circle"
											class="mr-2 text-green-600"
											size="20"
										/>
										<span class="text-gray-700">Asesoramiento genético</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Sección de Proceso Diagnóstico -->
		<section class="bg-gray-50 py-16">
			<div class="container mx-auto px-4">
				<div class="mb-12 text-center">
					<div class="mx-auto mb-2 h-1 w-16 bg-indigo-600"></div>
					<h2 class="text-3xl font-bold text-gray-900">
						Nuestro Proceso Diagnóstico
					</h2>
					<p class="mx-auto mt-4 max-w-2xl text-gray-600">
						Un enfoque integral y personalizado para cada paciente
					</p>
				</div>

				<div class="mx-auto max-w-5xl">
					<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
						<div
							class="rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
						>
							<div
								class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600"
							>
								<Icon name="mdi:numeric-1-circle" size="40" />
							</div>
							<h3 class="mb-2 text-lg font-bold text-gray-900">
								Evaluación Inicial
							</h3>
							<p class="text-gray-700">
								Consulta completa con un especialista para evaluar síntomas,
								historial médico y factores de riesgo.
							</p>
						</div>

						<div
							class="rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
						>
							<div
								class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600"
							>
								<Icon name="mdi:numeric-2-circle" size="40" />
							</div>
							<h3 class="mb-2 text-lg font-bold text-gray-900">
								Pruebas Diagnósticas
							</h3>
							<p class="text-gray-700">
								Selección de las pruebas más adecuadas según cada caso
								particular.
							</p>
						</div>

						<div
							class="rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
						>
							<div
								class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600"
							>
								<Icon name="mdi:numeric-3-circle" size="40" />
							</div>
							<h3 class="mb-2 text-lg font-bold text-gray-900">
								Análisis Multidisciplinario
							</h3>
							<p class="text-gray-700">
								Evaluación de resultados por un equipo de especialistas de
								diferentes áreas.
							</p>
						</div>

						<div
							class="rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
						>
							<div
								class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600"
							>
								<Icon name="mdi:numeric-4-circle" size="40" />
							</div>
							<h3 class="mb-2 text-lg font-bold text-gray-900">
								Plan Personalizado
							</h3>
							<p class="text-gray-700">
								Desarrollo de un plan de tratamiento individualizado basado en
								los resultados diagnósticos.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Sección CTA -->
		<section
			class="bg-gradient-to-r from-indigo-600 to-blue-700 py-16 text-white"
		>
			<div class="container mx-auto px-4">
				<div class="mx-auto max-w-3xl text-center">
					<h2 class="mb-6 text-3xl font-bold">
						¿Necesitas un diagnóstico especializado?
					</h2>
					<p class="mb-8 text-lg text-white/90">
						Nuestro equipo de expertos está listo para ayudarte. Contáctanos hoy
						mismo para programar una consulta.
					</p>
					<button
						class="rounded-full bg-white px-8 py-3 font-medium text-indigo-600 transition-all hover:bg-blue-50"
					>
						Solicitar una cita
					</button>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	// Puedes agregar lógica adicional aquí si es necesario
</script>
