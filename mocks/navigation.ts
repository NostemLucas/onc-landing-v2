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
				title: 'Investigación',
				links: [
					{ label: 'Ensayos Clínicos', url: '/investigacion/ensayos' },
					{ label: 'Publicaciones', url: '/investigacion/publicaciones' },
					{ label: 'Conferencias Médicas', url: '/investigacion/conferencias' },
				],
			},
			{
				title: 'Recursos Educativos',
				links: [
					{ label: 'Guías para Pacientes', url: '/educacion/guias' },
					{ label: 'Videos Informativos', url: '/educacion/videos' },
					{ label: 'Charlas y Talleres', url: '/educacion/talleres' },
				],
			},
		],
	},
	{
		label: 'Contacto',
		url: '/contactos',
	},
];
