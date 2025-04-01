<scritp>

</scritp>

<template>
	<div class="w-screen relative h-auto text-white overflow-hidden">
		<NuxtImg
			src="/mock/paralax.jpg"
			draggable="false"
			class="bg-amber-300 w-screen max-h-[900px] h-[600px] object-cover relative"
		/>
		<div class="absolute bg-black/60 inset-0 w-full h-full top-0 left-0" />
		<div
			class="absolute inset-0 flex flex-col justify-center items-start gap-5 pl-20 pr-96 lg:container m-auto"
		>
			<h6 class="text-xl font-semibold">Oncoclinic</h6>
			<h1 class="text-5xl">
				La Mejor Atencion Medica y Sanitaria En Tu Ciudad
			</h1>
			<h6 class="text-xl">
				Expertos en el servicio medico en el area Oncológica
			</h6>
			<div class="flex flex-row gap-4">
				<UButton
					variant="outline"
					label="Contactos"
					trailing-icon="i-lucide-plus"
					size="xl"
					class="ring-2 ring-white text-white rounded-full px-8 py-3 group group-hover:rotate-180 hover:bg-black/30"
					:ui="{
						trailingIcon: 'group-hover:rotate-180 ',
					}"
				/>
				<UButton
					variant="outline"
					label="Nuestros Doctores"
					trailing-icon="i-lucide-plus"
					size="xl"
					class="ring-2 ring-white text-white rounded-full px-8 py-3 group group-hover:rotate-180 hover:bg-black/30"
					:ui="{
						trailingIcon: 'group-hover:rotate-180 ',
					}"
				/>
			</div>
		</div>
	</div>
</template>
