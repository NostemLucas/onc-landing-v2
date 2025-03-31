<template>
	<div class="min-h-screen bg-white pt-8 pb-20">
		<div class="container mx-auto px-4 py-6">
			<div class="flex flex-col gap-6 md:flex-row">
				<!-- Sidebar with providers list -->
				<div class="w-full md:w-1/4">
					<div class="border-primary-100 overflow-hidden border">
						<div class="bg-primary-700 px-4 py-3 text-lg font-bold text-white">
							NUESTRO EQUIPO
						</div>
						<div>
							<div
								v-for="doctor in doctors"
								:key="doctor.id"
								class="hover:bg-primary-50 flex cursor-pointer items-center border-b border-gray-100 p-3 transition-colors"
								:class="{ 'bg-primary-50': selectedDoctor.id === doctor.id }"
								@click="selectDoctor(doctor.id)"
							>
								<NuxtImg
									:src="doctor.image"
									:alt="doctor.name"
									class="h-12 w-12 rounded-sm border-2 border-white object-cover shadow-sm"
								/>
								<div class="ml-3">
									<div class="text-primary-700 font-medium">
										{{ doctor.name }}
									</div>
									<div class="text-sm text-gray-600">
										{{ doctor.specialty }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Main content -->
				<div class="w-full md:w-3/4">
					<!-- Doctor video/image section -->
					<div class="border-primary-100 relative mb-6 border">
						<div class="relative">
							<div v-if="!isVideoPlaying">
								<img
									:src="selectedDoctor.videoThumbnail || selectedDoctor.image"
									:alt="selectedDoctor.name"
									class="h-[300px] w-full object-cover md:h-[400px]"
								/>
								<div
									v-if="selectedDoctor.hasVideo"
									class="bg-opacity-20 absolute inset-0 flex cursor-pointer items-center justify-center bg-black"
									@click="playVideo"
								>
									<div
										class="bg-opacity-80 flex items-center rounded-md bg-white px-4 py-2"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="text-primary-700 mr-2 h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fill-rule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
												clip-rule="evenodd"
											/>
										</svg>
										<span class="text-primary-700 font-medium">VER VIDEO</span>
									</div>
								</div>
							</div>
							<div v-else class="h-[300px] w-full md:h-[400px]">
								<iframe
									class="h-full w-full"
									:src="selectedDoctor.videoUrl"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen
								></iframe>
							</div>
						</div>

						<!-- Doctor name and specialty -->
						<div class="border-primary-100 border-t p-6">
							<h1 class="text-primary-800 text-3xl font-bold">
								{{ selectedDoctor.name }}
							</h1>
							<h2 class="text-primary-600 mt-1 text-xl">
								<a href="#" class="hover:underline">
									{{ selectedDoctor.specialty }}
								</a>
							</h2>
						</div>
					</div>

					<!-- Action buttons -->
					<div class="mb-8 flex flex-wrap gap-4">
						<UButton
							to="#"
							size="xl"
							class="bg-teal-600 px-6 py-2 font-medium text-white transition-colors hover:bg-teal-700"
						>
							Solicite Cita
						</UButton>
						<UButton
							to="#"
							size="xl"
							class="bg-primary-500 hover:bg-primary-700 px-6 py-2 font-medium text-white transition-colors"
						>
							Referir Paciente
						</UButton>
					</div>

					<!-- Doctor information -->
					<div class="border-primary-600 mb-8 border-t-4 pt-4">
						<h3
							class="text-primary-700 font-horsham mb-4 text-xl font-extrabold tracking-widest"
						>
							CONOZCA A NUESTRO PROFESIONAL DE LA SALUD
						</h3>
						<div class="font-roboto space-y-4 text-gray-700">
							<p
								v-for="(paragraph, index) in selectedDoctor.about"
								:key="index"
							>
								{{ paragraph }}
							</p>
						</div>
						<div class="mt-4 text-gray-700">
							<span class="font-semibold">Idioma:</span>
							{{ selectedDoctor.languages.join(', ') }}
						</div>
					</div>

					<!-- Specialties section -->
					<div class="border-primary-600 mb-8 border-t-4 pt-4">
						<h3
							class="text-primary-700 font-horsham mb-4 text-xl font-bold tracking-widest"
						>
							ESPECIALIDADES Y SERVICIOS
						</h3>
						<ul class="list-disc space-y-2 pl-5 text-gray-700">
							<li
								v-for="(specialty, index) in selectedDoctor.specialties"
								:key="index"
							>
								<a href="#" class="text-primary-600 hover:underline">
									{{ specialty }}
								</a>
							</li>
						</ul>
					</div>

					<!-- Location section -->
					<div class="border-primary-600 mb-8 border-t-4 pt-4">
						<h3
							class="text-primary-700 font-horsham mb-4 text-xl font-bold tracking-widest"
						>
							UBICACIÓN
						</h3>
						<div class="text-gray-700">
							<h4 class="text-lg font-semibold">
								{{ selectedDoctor.location.name }}
							</h4>
							<p>{{ selectedDoctor.location.address }}</p>
							<p>{{ selectedDoctor.location.city }}</p>
							<p class="mt-2">{{ selectedDoctor.location.phone }}</p>
						</div>
					</div>

					<!-- Education section -->
					<div class="border-primary-600 border-t-4 pt-4">
						<h3
							class="text-primary-700 font-horsham mb-4 text-xl font-bold tracking-widest"
						>
							EDUCACIÓN
						</h3>
						<div
							class="grid grid-cols-1 gap-x-6 gap-y-3 text-gray-700 md:grid-cols-2"
						>
							<template
								v-for="(value, key) in selectedDoctor.education"
								:key="key"
							>
								<div class="font-semibold">{{ key }}:</div>
								<div>{{ value }}</div>
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';

	interface Location {
		name: string;
		address: string;
		city: string;
		phone: string;
	}

	interface Doctor {
		id: number;
		name: string;
		specialty: string;
		image: string;
		videoThumbnail?: string;
		videoUrl?: string;
		hasVideo: boolean;
		about: string[];
		languages: string[];
		specialties: string[];
		location: Location;
		education: Record<string, string>;
	}

	// Video playing state
	const isVideoPlaying = ref(false);

	// Sample data for doctors
	const doctors = ref<Doctor[]>([
		{
			id: 1,
			name: 'Dr. Ariel Amaru, MD, PhD',
			specialty: 'ONCOHEMATLOGÍA',
			specialties: [
				'Trasplante de Médula Ósea',
				'Hematología y Oncohematología',
				'Trastornos de coagulación',
				'Eritrocitosis y Anemias',
				'Oncohematología',
				'Trasplante de Médula Ósea',
				'Biología Molecular',
				'Secuenciación Genética',
				'Investigación Oncológica',
			],
			location: {
				name: 'ONCOCLINIC CLÍNICA ONCOLÓGICA',
				city: 'LA PAZ',
				address: 'Obrajes, Avenida Costanerita, entre calles 5 y 6, No. 71.',
				phone: '22785566',
			},
			education: {
				es: 'Médico Cirujano de la Universidad Mayor de San Andrés, Bolivia',
				sd: 'Hematólogo – Oncohematólogo del Hospital Papa Giovanni XXIII, Italia',
				sdf: 'Doctorado en la Universidad de Milán-Bicocca (UNIMIB), Italia',
				xsd: 'Especialidad en Trasplante de Médula Ósea en la Universidad de Chicago, EE. UU.',
			},
			languages: ['Ingles', 'Español'],
			about: [
				'El Dr. Ariel Amaru es el Director Médico de Oncoclinic, responsable del área de Trasplante de Células Madre para enfermedades oncohematológicas, como las leucemias, linfomas, mielomas o mielofibrosis, y para pacientes con aplasia de médula ósea.  Es autor de revistas científicas y colaborador en trabajos de investigación',
				'El Dr. Ariel Amaru se graduó en la Facultad de Medicina de la UMSA de la ciudad de La Paz en Bolivia,  realizó sus estudios de especialidad de Oncohematologia y Trasplante de Médula Ósea en  el “Ospedale Papa Giovanni XXII” en Bérgamo, Italia y su estudio de Doctorado en la Universidad de Milano-Bicocca (UNIMIB) en Milán, Italia. Posteriormente realizo sus estudios Posdoctorado en la Universidad de Chicago en Estados Unidos.',
				'En Bolivia fue Docente de PosGrado en las Universidad de la UMSA de la ciudad de La Paz  y UMSS de Cochabamba. En 2017 inicia el Programa de Trasplantes de Médula Ósea en Bolivia, en 2023 ingresa a un programa de acreditación de la unidad de trasplantes.',
				'Desde el año 2023 estableció su Laboratorio de Investigación en Oncoclinic realizando técnicas de alta tecnología en Biología Molecular y Secuenciación Genética para la investigación en enfermedades oncológicas.',
			],
			image:
				'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SVIYB1uGFUUjRvdHB8uDzPDz4Kk3NB.png',
			videoThumbnail:
				'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SVIYB1uGFUUjRvdHB8uDzPDz4Kk3NB.png',
			videoUrl: '#',
			hasVideo: true,
		},
		{
			id: 2,
			name: 'Noah Birch, MD, PhD',
			specialty: 'Hematología',
			image: '/logo.png',
			hasVideo: false,
			about: [
				'El Dr. Birch es especialista en Hematología con enfoque en trastornos de la coagulación y enfermedades de la sangre. Completó su doctorado en Biología Molecular antes de su formación médica.',
				'Ha publicado extensamente sobre nuevos tratamientos para trastornos hematológicos y participa activamente en ensayos clínicos innovadores.',
			],
			languages: ['Inglés', 'Alemán'],
			specialties: ['Trastornos de la coagulación', 'Hematología', 'Leucemia'],
			location: {
				name: 'Outpatient Care Center, Suite 1E',
				address: '1818 W. Taylor St.',
				city: 'Chicago, IL 60612',
				phone: '312.355.1625',
			},
			education: {
				'Board Certification': 'Hematology',
				Especialización: 'Mayo Clinic',
				Internado: 'Johns Hopkins Hospital',
				'Facultad de Medicina': 'Harvard Medical School',
				Residencia: 'Massachusetts General Hospital',
				PhD: 'Stanford University',
			},
		},
		{
			id: 3,
			name: 'Oana C. Danciu, MD',
			specialty: 'Hematología y Oncología',
			image:
				'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-enKRpZzm3F2q8qB3SGwodRJxKTSDUR.png',
			videoThumbnail:
				'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-enKRpZzm3F2q8qB3SGwodRJxKTSDUR.png',
			videoUrl: '#',
			hasVideo: true,
			about: [
				'La Dra. Danciu trabaja en la División de Hematología/Oncología de UI Health. Después de recibir su título de medicina en la Universidad Carol Davila en Bucarest, Rumania, completó su residencia en Medicina Interna en el Hospital West Suburban de Oak Park, Illinois, y su beca de Hematología/Oncología en la Universidad de Illinois en Chicago.',
				'Sus intereses de investigación incluyen el desarrollo de ensayos clínicos usando terapias experimentales. La Dra. Danciu es miembro activa de la Sociedad Americana de Oncología Clínica.',
			],
			languages: ['Inglés', 'Francés', 'Rumano'],
			specialties: [
				'Cuidado de Senos',
				'Hematología y Oncología Médica',
				'Cáncer de mama',
			],
			location: {
				name: 'Outpatient Care Center, Suite 1E',
				address: '1818 W. Taylor St.',
				city: 'Chicago, IL 60612',
				phone: '312.355.1625',
			},
			education: {
				'Board Certification': 'Internal Medicine',
				Especialización: 'University of Illinois at Chicago',
				Internado: 'Weiss Memorial Hospital Chicago',
				'Facultad de Medicina': 'Carol Davila University of Medicine',
				Residencia: 'Weiss Memorial Hospital Chicago',
			},
		},
		{
			id: 4,
			name: 'Marwah Farooqui, DO',
			specialty: 'Oncología',
			image: '/logo.png',
			hasVideo: false,
			about: [
				'La Dra. Farooqui es especialista en Oncología con particular interés en cánceres ginecológicos y de mama. Su enfoque de tratamiento integra terapias tradicionales con atención al bienestar general del paciente.',
				'Es reconocida por su dedicación a la educación del paciente y por desarrollar planes de tratamiento personalizados.',
			],
			languages: ['Inglés', 'Urdu', 'Hindi'],
			specialties: [
				'Oncología Ginecológica',
				'Cáncer de mama',
				'Cuidados paliativos',
			],
			location: {
				name: "Women's Health Center",
				address: '1801 W. Taylor St.',
				city: 'Chicago, IL 60612',
				phone: '312.355.1700',
			},
			education: {
				'Board Certification': 'Medical Oncology',
				Especialización: 'MD Anderson Cancer Center',
				Internado: 'Cleveland Clinic',
				'Facultad de Medicina': 'Chicago College of Osteopathic Medicine',
				Residencia: 'Northwestern Memorial Hospital',
			},
		},
		{
			id: 5,
			name: 'Vik Gadi, MD, PhD',
			specialty: 'Hematología',
			image: '/logo.png',
			hasVideo: false,
			about: [
				'El Dr. Gadi es un hematólogo especializado en trastornos de la médula ósea y trasplantes. Su investigación se centra en mejorar los resultados de los trasplantes de médula ósea y desarrollar nuevas terapias para enfermedades hematológicas malignas.',
				'Ha recibido numerosos premios por su trabajo innovador en el campo de la hematología.',
			],
			languages: ['Inglés', 'Punjabi'],
			specialties: [
				'Trasplante de médula ósea',
				'Leucemia mieloide',
				'Síndromes mielodisplásicos',
			],
			location: {
				name: 'Blood and Marrow Transplant Clinic',
				address: '1740 W. Taylor St.',
				city: 'Chicago, IL 60612',
				phone: '312.355.1800',
			},
			education: {
				'Board Certification': 'Hematology',
				Especialización: 'Fred Hutchinson Cancer Center',
				Internado: 'University of Washington',
				'Facultad de Medicina': 'University of Michigan',
				Residencia: 'University of Washington',
				PhD: 'University of Michigan',
			},
		},
		{
			id: 6,
			name: 'Carlos Galvez, MD',
			specialty: 'Oncología',
			image: '/logo.png',
			hasVideo: false,
			about: [
				'El Dr. Galvez es especialista en Oncología con enfoque en tumores gastrointestinales. Tiene amplia experiencia en el desarrollo de protocolos de tratamiento multidisciplinarios.',
				'Es conocido por su enfoque compasivo y su habilidad para explicar opciones de tratamiento complejas de manera clara y accesible.',
			],
			languages: ['Inglés', 'Español'],
			specialties: [
				'Cáncer colorrectal',
				'Tumores gastrointestinales',
				'Oncología médica',
			],
			location: {
				name: 'Outpatient Care Center, Suite 1E',
				address: '1818 W. Taylor St.',
				city: 'Chicago, IL 60612',
				phone: '312.355.1625',
			},
			education: {
				'Board Certification': 'Medical Oncology',
				Especialización: 'Memorial Sloan Kettering',
				Internado: 'Mount Sinai Hospital',
				'Facultad de Medicina': 'Universidad Nacional Autónoma de México',
				Residencia: 'Mount Sinai Hospital',
			},
		},
	]);

	// Selected doctor state
	const selectedDoctorId = ref<number>(1);

	// Computed property to get the selected doctor
	const selectedDoctor = computed(() => {
		return (
			doctors.value.find((doctor) => doctor.id === selectedDoctorId.value) ||
			doctors.value[0]
		);
	});

	// Function to select a doctor
	const selectDoctor = (id: number) => {
		selectedDoctorId.value = id;
		isVideoPlaying.value = false;
	};

	// Function to play video
	const playVideo = () => {
		if (selectedDoctor.value.hasVideo) {
			isVideoPlaying.value = true;
		}
	};
</script>
