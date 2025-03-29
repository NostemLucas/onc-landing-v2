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

interface Location {
	name: string;
	city: string;
	address: string;
	phone: string;
}

const personnel: Doctor[] = [
	{
		id: 1,
		name: 'Dr. Ariel Amaru, MD, PhD',
		specialty: 'ONCOHEMATOLOGY',
		specialties: [
			'Bone Marrow Transplant',
			'Hematology and Oncohematology',
			'Coagulation Disorders',
			'Erythrocytosis and Anemia',
			'Oncohematology',
			'Bone Marrow Transplant',
			'Molecular Biology',
			'Genetic Sequencing',
			'Oncological Research',
		],
		location: {
			name: 'ONCOCLINIC ONCOLOGICAL CLINIC',
			city: 'LA PAZ',
			address: 'Obrajes, Avenida Costanerita, between streets 5 and 6, No. 71.',
			phone: '22785566',
		},
		education: {
			'Medical Surgeon':
				'Medical Surgeon from the Universidad Mayor de San Andrés, Bolivia',
			Hematologist: 'Oncohematologist from Hospital Papa Giovanni XXIII, Italy',
			Doctorate:
				'Ph.D. from the University of Milan-Bicocca (UNIMIB), Italy',
			'Bone Marrow Transplant Specialist':
				'Bone Marrow Transplant Specialty at the University of Chicago, USA',
		},
		languages: ['English', 'Spanish'],
		about: [
			'Dr. Ariel Amaru is the Medical Director of Oncoclinic, responsible for the Bone Marrow Stem Cell Transplant program for oncohematological diseases such as leukemia, lymphoma, myeloma, or myelofibrosis, and for patients with bone marrow aplasia. He is an author of scientific journals and collaborates in research work.',
			'Dr. Ariel Amaru graduated from the Faculty of Medicine of UMSA in La Paz, Bolivia, completed his Oncohematology and Bone Marrow Transplant specialty at the "Ospedale Papa Giovanni XXII" in Bergamo, Italy, and completed his Ph.D. at the University of Milan-Bicocca (UNIMIB) in Milan, Italy. He later completed postdoctoral studies at the University of Chicago in the United States.',
			'In Bolivia, he was a postgraduate professor at UMSA in La Paz and UMSS in Cochabamba. In 2017, he initiated the Bone Marrow Transplant Program in Bolivia, and in 2023, he entered an accreditation program for the transplant unit.',
			'In 2023, he established his Research Laboratory at Oncoclinic, performing high-tech techniques in Molecular Biology and Genetic Sequencing for research in oncological diseases.',
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
		specialty: 'Oncological Surgery',
		specialties: [
			'Oncological Surgery',
			'Specialist Doctor – Oncological Surgeon',
			'General Surgeon',
		],
		location: {
			name: 'ONCOCLINIC ONCOLOGICAL CLINIC',
			city: 'LA PAZ',
			address: 'Obrajes, Avenida Costanerita, between streets 5 and 6, No. 71.',
			phone: '22785566',
		},
		education: {
			'Medical Surgeon':
				'From Universidad Mayor de San Andrés',
			'Medical Residency in General Surgery at Hospital Obrero',
			'Medical Residency in Subspecialty Oncological Surgery at HODE Oncológico – CNS',
		},
		languages: ['Spanish'],
		about: [],
		image:
			'https://example.com/doctor-image.jpg', // Add image URL
		hasVideo: false,
	},

	{
		id: 3,
		name: 'Dra. Erika Lourdes Patiño Constancio',
		specialty: 'Head and Neck Oncological Surgery',
		specialties: [
			'Head and Neck Oncological Surgeon',
			'General Surgeon',
			'Head and Neck Surgery',
			'Maxillectomies',
			'Laryngectomies',
			'Thyroidectomies',
			'Mandiublectomies',
			'Skin Tumors',
			'Cytoreductive Surgery',
			'Multidisciplinary Management',
		],
		location: {
			name: 'ONCOCLINIC ONCOLOGICAL CLINIC',
			city: 'LA PAZ',
			address: 'Obrajes, Avenida Costanerita, between streets 5 and 6, No. 71.',
			phone: '22785566',
		},
		education: [
			'Professional from Universidad Mayor de San Andrés',
			'Medical Residency in General Surgery at the Hospital Militar Central',
			'Medical Residency in Subspecialty Head and Neck Oncological Surgeon at INEN, Lima – Peru',
		],
		languages: ['Spanish'],
		about: [],
		image:
			'https://example.com/doctor-image.jpg', // Add image URL
		hasVideo: false,
	},

	{
		id: 4,
		name: 'Dr. Marcio Denis López Ramirez',
		specialty: 'Clinical Oncologist',
		specialties: [
			'Clinical Oncologist',
			'Specialty in Immunotherapy Treatment',
			'Specialty in Biological Therapy and Chemotherapy',
			'Clinical Oncology',
			'Chemotherapy',
			'Immunotherapy',
			'Biological Therapy',
			'Molecular Biology Applied to Clinical Oncology',
			'Tumor DNA Sequencing',
			'Multidisciplinary Management',
		],
		location: {
			name: 'ONCOCLINIC ONCOLOGICAL CLINIC',
			city: 'LA PAZ',
			address: 'Obrajes, Avenida Costanerita, between streets 5 and 6, No. 71.',
			phone: '22785566',
		},
		education: [
			'Molecular Biology Applied to Clinical Oncology at the University of Liège, Belgium',
			'Doctorate in Medicine at the Latin American Medical College',
			'General Medicine at the Faculty of Medical Sciences Faustino Pérez Hernández',
			'Oncologist, Chemotherapy, Immunotherapy at the Faculty of Medical Sciences Faustino Pérez Hernández',
			'Cancer Control, Pain Management, and Palliative Care at the Camilo Cienfuegos University Hospital',
		],
		languages: ['Spanish', 'English'],
		about: [],
		image:
			'https://example.com/doctor-image.jpg', // Add image URL
		hasVideo: false,
	},

	{
		id: 5,
		name: 'Dr. Daniel Eduardo Mercado Rodrigo',
		specialty: 'Orthopedic Surgeon',
		specialties: [
			'Medical Surgeon',
			'Specialty in Orthopedics and Traumatology',
			'Orthopedic Oncology',
			'Orthopedic Oncology',
			'Skeletal Tumors',
			'Reconstructive Surgery with Modular Prostheses',
		],
		location: {
			name: 'ONCOCLINIC ONCOLOGICAL CLINIC',
			city: 'LA PAZ',
			address: 'Obrajes, Avenida Costanerita, between streets 5 and 6, No. 71.',
			phone: '22785566',
		},
		education: [
			'Medical Surgeon from Universidad Nuestra Señora de La Paz',
			'Specialist in Orthopedics and Traumatology',
			'Advanced Specialty in Orthopedic Oncology at INR-Unam Mexico',
			'Diploma in Bone Infections and Pseudoarthrosis at INR-Unam Mexico',
		],
		languages: ['Spanish', 'English'],
		about: [],
		image:
			'https://example.com/doctor-image.jpg', // Add image URL
		hasVideo: false,
	},
];

export default personnel;
