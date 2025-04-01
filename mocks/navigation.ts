interface Link {
	label: string;
	url: string;
}

interface Column {
	title: string;
	links: Link[];
}

// Aseguramos que solo una de las propiedades (url, subItems, columns) esté presente
export type NavigationItem = {
	label: string;
} & (
	| { url: string; subItems?: never; columns?: never }
	| { subItems: Link[]; url?: never; columns?: never }
	| { columns: Column[]; url?: never; subItems?: never }
);

export const navigationItems: NavigationItem[] = [
	{
		label: 'Inicio',
		url: '/',
	},
	{
		label: 'Nosotros',
		url: '/nosotros',
	},

	{
		label: 'Investigación',
		subItems: [
			{ label: 'Blogs', url: '/investigacion/ensayos' },
			{ label: 'Publicaciones', url: '/investigacion/publicaciones' },
		],
	},
	{
		label: 'Nuestros Profesionales',
		url: '/profesionales',
	},
	{
		label: 'Tratamientos y Diagnosticos',
		columns: [
			{
				title: 'Tratamientos',
				links: [
					{ label: 'Ensayos Clínicos', url: '/' },
					{ label: 'Publicaciones', url: '/' },
					{ label: 'Conferencias Médicas', url: '/' },
				],
			},
			{
				title: 'Diagnosticos',
				links: [
					{ label: 'Guías para Pacientes', url: '/' },
					{ label: 'Videos Informativos', url: '/' },
					{ label: 'Charlas y Talleres', url: '/' },
				],
			},
		],
	},
	{
		label: 'Contacto',
		url: '/contactos',
	},
];
