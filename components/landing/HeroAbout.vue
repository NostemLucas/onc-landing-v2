<template>
	<section
		class="container mx-auto flex max-w-7xl items-center justify-center px-2 py-36"
	>
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<!-- Image section with improved responsive behavior -->
			<div
				class="relative order-2 aspect-[4/5] w-full sm:aspect-[3/4] md:aspect-square lg:order-1"
			>
				<!-- Image container with improved responsive sizing -->
				<div class="relative mx-auto h-full w-full max-w-[600px]">
					<!-- First trophy image - larger on mobile -->
					<NuxtImg
						src="mock/premio2.png"
						draggable="false"
						alt="Award trophy"
						:class="[
							'absolute',
							'rounded-2xl transition-all',
							'z-30 object-cover duration-300',
							'shadow-xl shadow-current',
							'top-0 right-[5%] w-[65%] max-w-[500px]',
							'sm:w-[60%]',
							'md:w-[65%]',
							'lg:w-[50%] lg:max-w-[300px]',
						]"
					/>

					<!-- Second trophy image - positioned closer on mobile -->
					<NuxtImg
						src="mock/premio1.png"
						draggable="false"
						alt="Award trophy"
						:class="[
							'absolute top-[25%] right-[40%] z-20 w-[65%] max-w-[500px]',
							'rounded-2xl object-cover shadow-xl shadow-current',
							'transition-all duration-300',
							'sm:top-[18%] sm:right-[25%] sm:w-[60%]',
							'md:top-[40%] md:right-[38%] md:w-[70%]',
							'md:top-[30%] lg:max-w-[290px]',
							'xl:top-[25%] xl:right-[45%] xl:w-[50%]]',
							'2xl:top-[25%] 2xl:right-[50%] 2xl:w-[50%]]',
						]"
					/>

					<!-- Building image - larger and closer on mobile -->
					<NuxtImg
						src="mock/principal.jpg"
						draggable="false"
						alt="Clinic building"
						:class="[
							'absolute right-[12%] bottom-[25%] z-10 aspect-video max-w-[620px]',
							'rounded-xl object-cover shadow-lg transition-all duration-300',
							'sm:bottom-[45%] sm:w-[70%]',
							'md:right-[-10%] md:bottom-[5%] md:w-[85%]',
							'lg:right-[10%] lg:bottom-[17%] lg:w-[65%] lg:max-w-[420px]',
							'xl:right-[10%] xl:bottom-[20%] xl:w-[65%]',
							'2xl:right-[12%] 2xl:bottom-[20%] 2xl:w-[65%]',
							'shadow-xl shadow-current',
						]"
					/>
				</div>
			</div>

			<!-- Right side with content -->
			<div class="order-1 flex flex-col justify-center lg:order-2">
				<div class="text-secondary py-3 font-bold tracking-wide md:py-5">
					¿Quiénes Somos?
				</div>
				<h2
					class="mt-2 mb-4 text-3xl font-medium text-slate-800 sm:text-4xl md:text-5xl"
				>
					Acerca De Nosotros
				</h2>
				<div class="mb-4 h-1 w-20 rounded-full bg-blue-600 md:mb-6" />
				<p class="mb-4 text-gray-500">
					En ONCOCLINIC, nos esforzamos por ser líderes en la lucha contra el
					cáncer, promoviendo la investigación, la educación y la conciencia
					sobre la enfermedad. Nuestro compromiso es proporcionar esperanza,
					compasión y excelencia en el tratamiento del cáncer.
				</p>

				<p class="mb-6 text-gray-500">
					Nuestro centro se propone alcanzar la excelencia en el campo de la
					prevención, diagnóstico y cura de tumores a través de la investigación
					clínico-científica e innovación en gestión, dirigida a la calidad del
					servicio para nuestros pacientes.
				</p>

				<div class="flex flex-wrap items-center gap-4">
					<button
						class="border-primary-500 text-primary-500 hover:bg-primary-100/30 cursor-pointer rounded-full border-4 px-10 py-2 font-black"
					>
						Ver Más
					</button>
					<a
						href="tel:+59174846264"
						class="inline-flex items-center tracking-widest text-slate-700"
					>
						<PhoneCallIcon class="mr-2 h-6 w-6 text-red-500 md:h-7 md:w-7" />
						(+591) 74846264
					</a>
				</div>

				<!-- Services section -->
				<div class="mt-8 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-4">
					<div class="flex flex-col items-center text-center">
						<div
							class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 p-3 md:h-20 md:w-20"
						>
							<NuxtImg
								src="medicine-icon.png"
								alt="Hospitalisation icon"
								draggable="false"
							/>
						</div>
						<div class="text-sm font-semibold md:text-base">
							Medicina y Atención Sanitaria
						</div>
					</div>

					<div class="flex flex-col items-center text-center">
						<div
							class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 p-3 md:h-20 md:w-20"
						>
							<NuxtImg
								src="stetoscop-icon.png"
								alt="Hospitalisation icon"
								draggable="false"
							/>
						</div>
						<div class="text-sm font-semibold md:text-base">
							Doctores y Enfermería
						</div>
					</div>

					<div class="flex flex-col items-center text-center">
						<div
							class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 p-3 md:h-20 md:w-20"
						>
							<NuxtImg
								src="hospitalisation-icon.png"
								alt="Hospitalisation icon"
							/>
						</div>
						<div class="text-sm font-semibold md:text-base">
							Servicio de Internación
						</div>
					</div>

					<div class="flex flex-col items-center text-center">
						<div
							class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 p-3 md:h-20 md:w-20"
						>
							<NuxtImg src="laboratory-icon.png" alt="Laboratory icon" />
						</div>
						<div class="text-sm font-semibold md:text-base">
							Servicio de Laboratorios
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
	import {
		ChevronRight as ChevronRightIcon,
		PhoneCall as PhoneCallIcon,
	} from 'lucide-vue-next';
</script>
