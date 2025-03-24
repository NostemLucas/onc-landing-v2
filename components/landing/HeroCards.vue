<template>
	<div class="container mx-auto max-w-7xl bg-amber-400 px-4 py-12">
		<!-- Primera Tarjeta -->
		<div
			class="mb-16 flex flex-col items-stretch gap-8 overflow-hidden lg:flex-row"
		>
			<div class="flex flex-col justify-center p-8 lg:w-3/5 lg:p-10">
				<h2
					class="mb-4 text-3xl leading-tight font-bold text-gray-900 lg:text-4xl"
				>
					La recuperación
					<span class="text-primary-600">empieza aquí</span>
				</h2>
				<div class="mb-6 h-1 w-20 rounded-full bg-blue-600" />

				<p class="mb-2 font-medium text-gray-700">
					El éxito del tratamiento comienza con un diagnóstico preciso
				</p>
				<p class="mb-6 text-gray-700">
					En Oncoclinic Bolivia, combinamos experiencia médica con tecnología de
					vanguardia para detectar y tratar el cáncer de manera oportuna.
					Nuestro equipo multidisciplinario brinda una atención integral y
					personalizada para cada paciente
				</p>

				<div class="mb-6 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
					<p class="mb-2 font-semibold text-gray-800">
						Entre los mejores expertos en Bolivia.
					</p>
					<p class="mb-2 text-gray-700">
						Oncoclinic clasifica más veces en el n.º 1 que ningún otro hospital
						del país, según
						<span class="font-medium italic">Añadir Ref</span>
						.
					</p>
					<a
						href="#"
						class="inline-flex items-center font-medium text-blue-600 hover:underline"
					>
						Informarse sobre las especialidades más destacadas
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="ml-1 h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</a>
				</div>

				<button
					class="text-primary-600 group flex w-fit items-center rounded-full border-2 px-6 py-3 transition-colors hover:bg-blue-700 hover:text-white"
				>
					¿Por qué elegir a Oncoclinic?
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</button>
			</div>
			<div class="relative overflow-hidden lg:w-2/5">
				<div
					class="absolute inset-0 z-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-transparent"
				/>
				<NuxtImg
					src="/mock/close-up.jpg"
					alt="Doctor atendiendo a un paciente"
					class="h-full max-h-[80vh] w-full rounded-lg object-cover object-center"
				/>
			</div>
		</div>

		<!-- Segunda Tarjeta -->
		<div
			class="flex flex-col-reverse items-stretch gap-8 overflow-hidden lg:flex-row"
		>
			<div class="relative overflow-hidden lg:w-2/5">
				<div
					class="absolute inset-0 z-10 rounded-lg bg-gradient-to-l from-blue-500/20 to-transparent"
				/>
				<NuxtImg
					src="/mock/happy-mature.jpg"
					alt="Madre con bebé"
					class="h-full max-h-[80vh] w-full rounded-lg object-cover object-center"
				/>
			</div>
			<div class="flex flex-col justify-center p-8 lg:w-3/5 lg:p-10">
				<h2
					class="mb-4 text-3xl leading-tight font-bold text-gray-900 lg:text-4xl"
				>
					Atención médica de
					<span class="text-blue-600">primera categoría</span>
					para pacientes de todo el mundo
				</h2>
				<div class="mb-6 h-1 w-20 rounded-full bg-blue-600" />

				<p class="mb-6 text-gray-700">
					Hacemos que sea fácil recibir atención médica en Oncoclinic para los
					pacientes de todo el país, con servicios de asistencia personalizada
					durante todo el proceso.
				</p>

				<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="flex items-start">
						<div class="mr-3 rounded-full bg-blue-100 p-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-blue-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="font-medium text-gray-900">Atención personalizada</h3>
							<p class="text-sm text-gray-600">
								Adaptada a sus necesidades específicas
							</p>
						</div>
					</div>
					<div class="flex items-start">
						<div class="mr-3 rounded-full bg-blue-100 p-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-blue-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="font-medium text-gray-900">Asistencia multilingüe</h3>
							<p class="text-sm text-gray-600">
								Servicios de traducción disponibles
							</p>
						</div>
					</div>
				</div>

				<button
					class="group flex w-fit items-center rounded-full bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
				>
					Servicios internacionales
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>
