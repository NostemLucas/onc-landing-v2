<template>
	<div class="relative w-full overflow-hidden">
		<video
			ref="videoRef"
			class="aspect-[3/4] max-h-[600px] w-full bg-black object-cover md:aspect-auto md:max-h-[700px] md:w-full xl:max-h-[700px]"
			loop
			muted
			autoplay
			poster="~/assets/media/banner.png"
		>
			<source src="~/assets/media/video.webm" type="video/webm" />
			Tu navegador no soporta el formato de video.
		</video>
		<!-- design -->
		<div
			class="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent via-transparent to-[#000000]"
		/>
		<div
			class="absolute bottom-6 w-full px-10 text-center text-white md:bottom-14 lg:px-14 xl:px-32 2xl:px-80"
		>
			<h1
				class="font-horsham mb-8 text-start text-4xl leading-tight tracking-wide md:text-5xl lg:mb-10 lg:text-7xl"
			>
				Transformando el cuidado de tu salud
			</h1>
			<div
				class="flex flex-col justify-start sm:flex-row sm:items-center sm:justify-start"
			>
				<a
					href="#"
					class="group mr-2 mb-6 flex flex-row items-center justify-start text-start text-lg transition duration-300 ease-in-out sm:mb-0 md:text-2xl"
				>
					<span
						class="inline-block border-b-4 border-transparent hover:border-white"
					>
						Cómo impulsamos la innovación
					</span>
					<ChevronRight
						class="ml-2 h-8 w-8 transition duration-150 ease-in group-hover:translate-x-1"
					/>
				</a>
				<a
					href="#"
					class="rounded-full border-2 border-white px-8 py-2 text-xl font-normal text-white transition-colors duration-500 hover:bg-white hover:text-black md:ml-6 md:py-3 md:text-2xl md:font-medium"
				>
					Pide una cita
				</a>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ChevronRight } from 'lucide-vue-next';
</script>
