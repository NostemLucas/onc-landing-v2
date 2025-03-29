export interface Personnel {
	name: string;
	specialty: string;
	department: string;
	description: string;
	image: string;
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

const personnel: Doctor = [
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
			'Medico Cirujano':
				'Médico Cirujano de la Universidad Mayor de San Andrés, Bolivia',
			Hematologo: 'Oncohematólogo del Hospital Papa Giovanni XXIII, Italia',
			Doctorado:
				'Doctorado en la Universidad de Milán-Bicocca (UNIMIB), Italia',
			'Especilista de Transplantes':
				'Especialidad en Trasplante de Médula Ósea en la Universidad de Chicago, EE. UU.',
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
		videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
		hasVideo: true,
	},

	{
		id: 2,
		name: 'Dra. Jimena Yudid Bueno Limachi',
		specialties: [
			'Cirugía Oncológica',
			'Médico especialista – Cirujano Oncólogo',
			'Cirujano general',
		],
		location: [
			{
				clinic: 'ONCOCLINIC CLÍNICA ONCOLÓGICA',
				address: 'Obrajes, Avenida Costanerita, entre calles 5 y 6, No. 71.',
				phone: '22785566',
			},
			{
				clinic: 'ONCOCLINIC CLÍNICA ONCOLÓGICA',
				address:
					'Sucursal Sopocachi Av. 6 de agosto, Torre 2255 Mezanine (Frente al cine 6 de agosto)',
				phone: '72026935',
			},
		],
		education: {
			'Médico Cirujano' :' de la Universidad Mayor de San Andrés',
			'Residencia Médica Cirugía General en el Hospital Obrero',
			'Residencia Médica Subespecialidad Cirugía Oncológica en HODE Oncológico – CNS',
		},
	},
	{
		name: 'Dra. Erika Lourdes Patiño Constancio',
		specialties: [
			'Cirujano Oncológico de cabeza y cuello',
			'Médico especialista – Cirugía general',
			'Cirujano general',
			'Cirugía de Cabeza y Cuello',
			'Maxilectomías',
			'Laringectomías',
			'Tiroidectomías',
			'Mandibulectomías',
			'Tumores en piel',
			'Cirugía citorreductora',
			'Manejo multidisciplinario',
		],
		location: [
			{
				clinic: 'ONCOCLINIC CLÍNICA ONCOLÓGICA',
				address: 'Obrajes, Avenida Costanerita, entre calles 5 y 6, No. 71.',
				phone: '22785566',
			},
			{
				clinic: 'ONCOCLINIC CLÍNICA ONCOLÓGICA',
				address:
					'Sucursal Sopocachi Av. 6 de agosto, Torre 2255 Mezanine (Frente al cine 6 de agosto)',
				phone: '72026935',
			},
		],
		education: [
			'Profesional de la Universidad Mayor de San Andrés',
			'Residencia Médica Cirugía General en el Hospital Militar Central',
			'Residencia Médica Subespecialidad Cirujano Oncológico de cabeza y cuello en INEN, Lima – Perú',
		],
	},
	{
		name: 'Dr. Marcio Denis López Ramirez',
		specialties: [
			'Oncólogo Clínico',
			'Especialidad en Tratamiento en Inmunoterapia',
			'Especialidad en Terapia Biológica y Quimioterapia',
			'Oncología Clínica',
			'Quimioterapia',
			'Inmunoterapia',
			'Terapia Biológica',
			'Biología Molecular aplicada a Oncología Clínica',
			'Secuenciación del ADN tumoral',
			'Manejo multidisciplinario',
		],
		location: [
			{
				clinic: 'ONCOCLINIC CLÍNICA ONCOLÓGICA',
				address: 'Obrajes, Avenida Costanerita, entre calles 5 y 6, No. 71.',
				phone: '22785566',
			},
			{
				clinic: 'ONCOCLINIC CLÍNICA ONCOLÓGICA',
				address:
					'Sucursal Sopocachi Av. 6 de agosto, Torre 2255 Mezanine (Frente al cine 6 de agosto)',
				phone: '72026935',
			},
		],
		education: [
			'Biología Molecular aplicada a la Oncología Clínica en la Universidad de Liège, Bélgica',
			'Doctorado en Medicina en el Colegio Médico Latinoamericano',
			'Medicina General Integral de la Facultad de Ciencias Médicas Faustino Pérez Hernández',
			'Médico Oncólogo, Quimioterapia, Inmunoterapia en la Facultad de Ciencias Médicas Faustino Pérez Hernández',
			'Control de Cáncer, Manejo del dolor y Cuidados Paliativos en el Hospital Universitario Camilo Cienfuegos',
		],
	},
	{
		name: 'Dr. Daniel Eduardo Mercado Rodrigo',
		specialties: [
			'Médico Cirujano',
			'Especialidad en Ortopedia y Traumatología',
			'Especialidad en Ortopedia Oncológica',
			'Ortopedia Oncológica',
			'Tumores Muscoesqueléticos',
			'Cirugía reconstructiva con prótesis modulares',
		],
		location: [
			{
				clinic: 'ONCOCLINIC CLÍNICA ONCOLÓGICA',
				address: 'Obrajes, Avenida Costanerita, entre calles 5 y 6, No. 71.',
				phone: '22785566',
			},
			{
				clinic: 'ONCOCLINIC CLÍNICA ONCOLÓGICA',
				address:
					'Sucursal Sopocachi Av. 6 de agosto, Torre 2255 Mezanine (Frente al cine 6 de agosto)',
				phone: '72026935',
			},
		],
		education: [
			'Médico Cirujano de la Universidad Nuestra Señora de La Paz',
			'Especialista en Ortopedia y Traumatología',
			'Alta especialidad en ortopedia oncológica INR-Unam México',
			'Diplomado en Infecciones óseas y pseudoartrosis INR-Unam México',
		],
	},
];

export default personnel;
