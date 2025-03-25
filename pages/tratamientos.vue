<template>
	<div class="min-h-screen bg-white">
		<!-- Encabezado de la página -->
		<section class="bg-blue-50 py-16">
			<div class="container mx-auto px-4">
				<div class="text-center">
					<div class="mx-auto mb-2 h-1 w-16 bg-blue-600"></div>
					<h1 class="text-3xl font-bold text-gray-900">
						Nuestros Tratamientos
					</h1>
					<p class="mx-auto mt-4 max-w-2xl text-gray-600">
						Ofrecemos tratamientos avanzados y personalizados para cada
						paciente, utilizando las últimas tecnologías y protocolos médicos.
					</p>
				</div>
			</div>
		</section>

		<!-- Contenido principal con acordeones -->
		<section class="py-16">
			<div class="container mx-auto px-4">
				<div class="mx-auto max-w-4xl">
					<!-- Trasplante de Médula Ósea -->
					<div class="mb-12">
						<div
							class="mb-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-2"
						>
							<div>
								<div class="mb-2">
									<div class="mb-1 h-1 w-16 bg-blue-600"></div>
									<h2 class="text-2xl font-bold text-blue-800">
										Trasplante De Médula Ósea
									</h2>
									<p class="text-sm text-blue-600">Tratamiento</p>
								</div>

								<p class="mb-6 text-gray-700">
									El trasplante de médula ósea es un procedimiento médico que
									reemplaza la médula ósea por células sanas. Las células de
									médula ósea pueden provenir de su propio cuerpo o de un
									donante.
								</p>

								<p class="mb-6 text-gray-700">
									El trasplante de médula ósea se denomina trasplante de células
									madre porque implica células madre de la sangre y no la médula
									ósea en sí. El trasplante se puede utilizar para tratar
									ciertos tipos de cáncer, como leucemia, mieloma y linfoma, y
									para enfermedades del sistema inmunitario y de la sangre.
								</p>
							</div>

							<div>
								<div class="overflow-hidden rounded-lg shadow-xl">
									<img
										src="/logo.png"
										alt="Trasplante de Médula Ósea"
										class="h-auto w-full object-cover"
									/>
								</div>
							</div>
						</div>

						<!-- Acordeones para Trasplante -->
						<div class="space-y-4">
							<Accordion :items="trasplanteAccordionItems" />
						</div>
					</div>

					<!-- Inmunoterapia -->
					<div class="mb-12">
						<div
							class="mb-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-2"
						>
							<div class="order-2 lg:order-1">
								<div class="overflow-hidden rounded-lg shadow-xl">
									<img
										src="/logo.png"
										alt="Inmunoterapia"
										class="h-auto w-full object-cover"
									/>
								</div>
							</div>

							<div class="order-1 lg:order-2">
								<div class="mb-2">
									<div class="mb-1 h-1 w-16 bg-blue-600"></div>
									<h2 class="text-2xl font-bold text-blue-800">
										Inmunoterapia
									</h2>
									<p class="text-sm text-blue-600">Tratamiento</p>
								</div>

								<p class="mb-6 text-gray-700">
									La inmunoterapia es un tipo de tratamiento para el cáncer.
									Utiliza sustancias producidas por el cuerpo o en un
									laboratorio para mejorar el sistema inmunitario y ayudar a su
									cuerpo a encontrar y destruir células cancerosas.
								</p>

								<p class="mb-6 text-gray-700">
									La inmunoterapia funciona de diferentes maneras. Puede
									estimular su sistema inmunitario para que trabaje más
									intensamente o de manera más inteligente para atacar las
									células cancerosas, o puede eliminar las barreras que impiden
									que el sistema inmunitario afecte al tumor.
								</p>
							</div>
						</div>

						<!-- Acordeones para Inmunoterapia -->
						<div class="space-y-4">
							<Accordion :items="inmunoterapiaAccordionItems" />
						</div>
					</div>

					<!-- Quimioterapia -->
					<div class="mb-12">
						<div
							class="mb-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-2"
						>
							<div>
								<div class="mb-2">
									<div class="mb-1 h-1 w-16 bg-blue-600"></div>
									<h2 class="text-2xl font-bold text-blue-800">
										Quimioterapia
									</h2>
									<p class="text-sm text-blue-600">Tratamiento</p>
								</div>

								<p class="mb-6 text-gray-700">
									La quimioterapia es un tratamiento para destruir las células
									cancerosas. Este tipo de tratamiento contra el cáncer actúa
									sobre las células cancerosas rápidas, no sobre las células
									normales.
								</p>

								<p class="mb-6 text-gray-700">
									La quimioterapia se puede administrar de diferentes maneras,
									como por vía oral, intravenosa o tópica. La quimioterapia
									puede matar o detener la reproducción de células "normales"
									que crecen rápidamente, lo que puede causar efectos
									secundarios.
								</p>
							</div>

							<div>
								<div class="overflow-hidden rounded-lg shadow-xl">
									<img
										src="/logo.png"
										alt="Quimioterapia"
										class="h-auto w-full object-cover"
									/>
								</div>
							</div>
						</div>

						<!-- Acordeones para Quimioterapia -->
						<div class="space-y-4">
							<Accordion :items="quimioterapiaAccordionItems" />
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Sección CTA -->
		<section class="bg-blue-600 py-16 text-white">
			<div class="container mx-auto px-4">
				<div class="mx-auto max-w-3xl text-center">
					<h2 class="mb-6 text-3xl font-bold">
						¿Necesitas más información sobre nuestros tratamientos?
					</h2>
					<p class="mb-8 text-lg">
						Nuestro equipo de especialistas está disponible para responder todas
						tus preguntas y brindarte la orientación que necesitas.
					</p>
					<button
						class="rounded-full bg-white px-8 py-3 font-medium text-blue-600 transition-all hover:bg-blue-50"
					>
						Contactar a un especialista
					</button>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	// Componente de Acordeón
	const Accordion = defineComponent({
		props: {
			items: {
				type: Array as PropType<
					{
						question: string;
						answer: string;
						isOpen?: boolean;
					}[]
				>,
				required: true,
			},
		},
		setup(props) {
			const openItems = ref(props.items.map((item) => item.isOpen || false));

			const toggleItem = (index: number) => {
				openItems.value[index] = !openItems.value[index];
			};

			return { openItems, toggleItem };
		},
		template: `
    <div class="space-y-4">
      <div v-for="(item, index) in items" :key="index" class="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <button 
          @click="toggleItem(index)" 
          class="flex w-full items-center justify-between p-4 text-left font-medium transition-colors"
          :class="openItems[index] ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-900'"
        >
          <span>{{ item.question }}</span>
          <Icon 
            :name="openItems[index] ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
            size="20" 
            :class="openItems[index] ? 'text-blue-600' : 'text-gray-500'"
          />
        </button>
        <div 
          v-show="openItems[index]" 
          class="border-t border-gray-200 bg-white p-4 text-gray-700"
        >
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>
  `,
	});

	// Datos para los acordeones
	const trasplanteAccordionItems = [
		{
			question: '¿Qué son las células madre?',
			answer:
				'Las células madre son células especiales que pueden reproducirse y transformarse en diferentes tipos de células del cuerpo. En el caso de la médula ósea, las células madre pueden convertirse en glóbulos rojos, glóbulos blancos o plaquetas, que tienen diferentes funciones.',
		},
		{
			question: '¿Cómo funciona un trasplante de células madre/médula ósea?',
			answer:
				'En general, se le pueden realizar exámenes de sus células madre de antemano, o se pueden obtener células madre de un donante. Después de recibir un tratamiento de acondicionamiento, el proceso de trasplante es en esencia, a continuación, el proceso de recuperación.',
		},
		{
			question: '¿Qué dura el trasplante de células madre y cuánto?',
			answer:
				'Los efectos médicos para un trasplante autólogo provienen de su propio cuerpo.',
		},
	];

	const inmunoterapiaAccordionItems = [
		{
			question: '¿Cómo Se Usa La Inmunoterapia Para Tratar El Cáncer?',
			answer:
				'La inmunoterapia es un tratamiento que utiliza ciertas partes del sistema inmunitario de una persona para combatir enfermedades como el cáncer. Esto se puede hacer de varias maneras: estimulando el sistema inmunitario para que trabaje más intensamente o de manera más inteligente para atacar las células cancerosas, o administrando al sistema inmunitario componentes como proteínas sintéticas para ayudar a mejorar la respuesta inmune al cáncer. La inmunoterapia funciona mejor para algunos tipos de cáncer que para otros.',
		},
		{
			question: '¿Anticuerpos Monoclonales Y Otros Bloqueadores?',
			answer:
				'Los anticuerpos monoclonales son proteínas del sistema inmunitario creadas en laboratorio que están diseñadas para unirse a objetivos específicos en las células cancerosas. Algunos anticuerpos monoclonales marcan las células cancerosas para que sean más visibles para el sistema inmunitario. Otros bloquean la interacción entre las células cancerosas y ciertas proteínas que promueven su crecimiento.',
		},
	];

	const quimioterapiaAccordionItems = [
		{
			question: '¿Cómo Trata La Quimioterapia El Cáncer?',
			answer:
				'La quimioterapia se encarga por lo general mediante inyección (inyección o infusión) o tomando píldoras o cápsulas. La quimioterapia se administra en ciclos, seguidos de un período de descanso. En general, los fármacos utilizados para la quimioterapia son citotóxicos (matan células) y afectan a las células que se dividen rápidamente, como las células cancerosas.',
		},
		{
			question: '¿Cuánto Duran Todos Nuestros Tratamientos?',
			answer:
				'La duración de los tratamientos varía según el tipo de cáncer, la etapa, el tratamiento específico y la respuesta individual del paciente. Algunos tratamientos pueden durar semanas, mientras que otros pueden extenderse por meses o incluso años en forma de terapia de mantenimiento.',
		},
	];
</script>
