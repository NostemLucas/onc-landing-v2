<template>
	<div class="min-h-screen bg-white">
		<!-- Sección Principal: Quiénes Somos -->
		<section class="py-16">
			<div class="container mx-auto px-4">
				<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
					<div class="order-2 lg:order-1">
						<div class="mb-2">
							<div class="mb-1 h-1 w-16 bg-blue-600"></div>
							<h1 class="text-3xl font-bold text-gray-900">¿Quiénes somos?</h1>
						</div>

						<p class="mb-6 text-gray-700">
							En
							<span class="font-semibold text-blue-700">HealthCenter</span>
							, nos dedicamos con pasión a liderar en la lucha contra el cáncer,
							promoviendo la investigación, la educación y la conciencia sobre
							la enfermedad.
						</p>

						<p class="mb-6 text-gray-700">
							Somos especialistas en diagnósticos tempranos, completos y
							soluciones en el tratamiento del cáncer. Nuestro centro se propone
							alcanzar la excelencia en el campo de la prevención, diagnóstico y
							cura a través de la investigación clínica-básica y la aplicación
							de los últimos avances tecnológicos.
						</p>

						<p class="mb-6 text-gray-700">
							Nuestro equipo está compuesto por especialistas altamente
							calificados y comprometidos con brindar el mejor cuidado médico y
							psicológico a nuestros pacientes y sus familias.
						</p>

						<div class="mt-8">
							<button
								class="rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700"
							>
								Conocer más sobre nosotros
							</button>
						</div>
					</div>

					<div class="order-1 lg:order-2">
						<div class="overflow-hidden rounded-lg shadow-xl">
							<img
								src="/landing/monalisa.jpg"
								alt="Imagen institucional"
								class="h-full w-full object-cover"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Sección de Filosofía: Misión, Visión y Valores -->
		<section class="bg-gray-50 py-16">
			<div class="container mx-auto px-4">
				<div class="mb-12 text-center">
					<div class="mx-auto mb-2 h-1 w-16 bg-blue-600"></div>
					<h2 class="text-3xl font-bold text-gray-900">Nuestra Filosofía</h2>
					<p class="mt-4 text-gray-600">
						Conoce los principios que guían nuestro trabajo diario
					</p>
				</div>

				<div class="mb-8 flex flex-wrap justify-center gap-4">
					<button
						v-for="tab in tabs"
						:key="tab.id"
						@click="activeTab = tab.id"
						class="rounded-full px-8 py-3 text-sm font-medium transition-all duration-300"
						:class="
							activeTab === tab.id
								? 'bg-blue-600 text-white shadow-lg'
								: 'border border-blue-200 bg-white text-blue-600 hover:bg-blue-50'
						"
					>
						{{ tab.label }}
					</button>
				</div>

				<div class="mx-auto max-w-3xl">
					<transition name="fade" mode="out-in">
						<div :key="activeTab" class="rounded-lg bg-white p-8 shadow-lg">
							<div v-if="activeTab === 'mission'" class="text-center">
								<div class="mb-4 flex justify-center">
									<div
										class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600"
									>
										<Icon name="mdi:target" size="32" />
									</div>
								</div>
								<h3 class="mb-4 text-xl font-bold text-gray-900">
									Nuestra Misión
								</h3>
								<p class="text-gray-700">
									Asesorar de manera integral la prevención, diagnóstico,
									tratamiento y seguimiento de pacientes con enfermedades
									oncológicas, ofreciendo servicios de excelencia, innovación
									técnica y tecnología de vanguardia.
								</p>
								<p class="mt-4 text-gray-700">
									Nos comprometemos a proporcionar atención médica de la más
									alta calidad, centrada en el paciente, con un enfoque
									multidisciplinario que aborda todas las dimensiones de la
									salud.
								</p>
							</div>

							<div v-else-if="activeTab === 'vision'" class="text-center">
								<div class="mb-4 flex justify-center">
									<div
										class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600"
									>
										<Icon name="mdi:eye" size="32" />
									</div>
								</div>
								<h3 class="mb-4 text-xl font-bold text-gray-900">
									Nuestra Visión
								</h3>
								<p class="text-gray-700">
									Ser reconocidos como el centro de referencia en oncología a
									nivel nacional e internacional, destacando por la excelencia
									en la atención, investigación y formación continua.
								</p>
								<p class="mt-4 text-gray-700">
									Aspiramos a transformar el panorama de la atención oncológica
									mediante la integración de tecnologías avanzadas y un enfoque
									humanizado, garantizando acceso a tratamientos innovadores
									para todos los pacientes.
								</p>
							</div>

							<div v-else-if="activeTab === 'values'" class="text-center">
								<div class="mb-4 flex justify-center">
									<div
										class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600"
									>
										<Icon name="mdi:heart" size="32" />
									</div>
								</div>
								<h3 class="mb-4 text-xl font-bold text-gray-900">
									Nuestros Valores
								</h3>
								<div class="mx-auto max-w-2xl">
									<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
										<div
											v-for="(value, index) in values"
											:key="index"
											class="flex items-center rounded-lg bg-gray-50 p-4"
										>
											<div
												class="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600"
											>
												<Icon name="mdi:check-circle" size="20" />
											</div>
											<span class="text-gray-700">{{ value }}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</transition>
				</div>
			</div>
		</section>

		<!-- Sección de Cita -->
		<section class="bg-blue-600 py-16 text-white">
			<div class="container mx-auto px-4">
				<div class="mx-auto max-w-3xl text-center">
					<Icon
						name="mdi:format-quote-open"
						size="48"
						class="mb-6 opacity-50"
					/>
					<blockquote class="mb-6 text-2xl font-light italic">
						"Soñar, querer que el arte se una al de la medicina es una tentativa
						a la humanidad."
					</blockquote>
					<p class="text-xl font-semibold">- Renoir</p>
				</div>
			</div>
		</section>

		<!-- Sección de Timeline -->
		<section class="bg-gray-50 py-16">
			<div class="container mx-auto px-4">
				<div class="mb-12 text-center">
					<div class="mx-auto mb-2 h-1 w-16 bg-blue-600"></div>
					<h2 class="text-3xl font-bold text-gray-900">Nuestra Historia</h2>
					<p class="mt-4 text-gray-600">
						Conoce nuestra trayectoria y línea de crecimiento a lo largo del
						tiempo
					</p>
				</div>

				<div class="mx-auto max-w-4xl">
					<div class="relative">
						<!-- Línea vertical -->
						<div
							class="absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-blue-500"
						></div>

						<div class="space-y-16">
							<div
								v-for="(item, index) in timelineItems"
								:key="index"
								class="relative"
								v-intersect="{
									handler: onIntersect,
									options: { threshold: 0.5 },
								}"
								:ref="
									(el) => {
										if (el) timelineRefs[index] = el;
									}
								"
							>
								<div class="flex items-center justify-center">
									<div
										class="z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-blue-500 bg-white transition-all duration-500"
										:class="{
											'scale-125 border-blue-600 bg-blue-100':
												activeTimelineItem === index,
										}"
									></div>
								</div>

								<div
									class="absolute top-0 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-blue-600 px-6 py-2 font-bold text-white"
								>
									{{ item.year }}
								</div>

								<div
									:class="[
										'w-5/12 rounded-lg bg-white p-6 shadow-lg transition-all duration-500',
										index % 2 === 0 ? 'mr-auto' : 'ml-auto',
										activeTimelineItem === index ? 'shadow-xl' : '',
									]"
								>
									<p class="text-gray-700">{{ item.content }}</p>
									<button
										@click="toggleTimelineContent(index)"
										class="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
									>
										<span>Ver alternativa</span>
										<Icon name="mdi:swap-horizontal" class="ml-1" size="16" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';

	// Estado para los tabs
	const activeTab = ref('mission');

	const tabs = [
		{ id: 'mission', label: 'Nuestra Misión' },
		{ id: 'vision', label: 'Nuestra Visión' },
		{ id: 'values', label: 'Nuestros Valores' },
	];

	// Valores
	const values = [
		'Excelencia en el servicio',
		'Compromiso con el paciente',
		'Innovación constante',
		'Ética profesional',
		'Trabajo en equipo',
		'Integridad y transparencia',
		'Empatía y cuidado humanizado',
		'Responsabilidad social',
	];

	// Datos para la línea de tiempo
	const timelineItems = ref([
		{
			year: '2025',
			content:
				'Expansión internacional y apertura de centros de investigación avanzada en tres continentes.',
			alternative:
				'Implementación de terapias personalizadas basadas en IA y medicina de precisión.',
		},
		{
			year: '2024',
			content:
				'Lanzamiento de programa de telemedicina oncológica para llegar a zonas rurales.',
			alternative:
				'Desarrollo de plataforma digital integrada para seguimiento de pacientes en tiempo real.',
		},
		{
			year: '2023',
			content:
				'Certificación internacional ISO para todos nuestros procesos y servicios.',
			alternative:
				'Alianza estratégica con universidades para programas de formación especializada.',
		},
		{
			year: '2022',
			content:
				'Incorporación de tecnología de vanguardia para diagnósticos no invasivos.',
			alternative:
				'Creación del departamento de bienestar integral y apoyo psicológico.',
		},
		{
			year: '2021',
			content:
				'Ampliación de instalaciones y apertura de nueva unidad de radioterapia.',
			alternative:
				'Implementación del programa de investigación en inmunoterapia oncológica.',
		},
		{
			year: '2020',
			content:
				'Desarrollo de protocolos propios de tratamiento con reconocimiento internacional.',
			alternative:
				'Adaptación de servicios durante la pandemia con protocolos de seguridad avanzados.',
		},
		{
			year: '2019',
			content:
				'Inicio de colaboraciones con centros oncológicos internacionales.',
			alternative:
				'Lanzamiento del programa de prevención comunitaria en escuelas y empresas.',
		},
		{
			year: '2018',
			content:
				'Implementación del sistema de historia clínica electrónica integrada.',
			alternative:
				'Creación del primer laboratorio de investigación genómica propio.',
		},
		{
			year: '2017',
			content:
				'Fundación del centro y primeras atenciones a pacientes oncológicos.',
			alternative:
				'Establecimiento de la visión, misión y valores que guían nuestra institución.',
		},
	]);

	// Función para cambiar el contenido de la línea de tiempo
	const toggleTimelineContent = (index: number) => {
		const item = timelineItems.value[index];
		const temp = item.content;
		item.content = item.alternative;
		item.alternative = temp;
	};

	// Animación de timeline al hacer scroll
	const timelineRefs = ref<HTMLElement[]>([]);
	const activeTimelineItem = ref(-1);

	const onIntersect = (entries: IntersectionObserverEntry[], index: number) => {
		const [entry] = entries;
		if (entry.isIntersecting) {
			activeTimelineItem.value = index;
		}
	};
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
