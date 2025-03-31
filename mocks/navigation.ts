export interface NavigationInterface {
	label: string;
	hasSubmenu: boolean;
	url: string;
	columns: NavigationHistoryEntryEventMap;
}

interface NavigationColumn {
	title: string;
	links: [
		{ label: 'Ensayos Clínicos'; url: '/investigacion/ensayos' },
		{ label: 'Publicaciones'; url: '/investigacion/publicaciones' },
		{
			label: 'Conferencias Médicas';
			url: '/investigacion/conferencias';
		},
	];
}
const navigationItems = [
	{
		label: 'Inicio',
		hasSubmenu: false,
		url: '/',
	},
	{
		label: 'Nosotros',
		hasSubmenu: false,
		url: '/nosotros',
	},
	{
		label: 'Tratamientos',
		hasSubmenu: false,
		url: '/tratamientos',
	},
	{
		label: 'Nuestros Profesionales',
		hasSubmenu: false,
		url: '/profesionales',
	},
	{
		label: 'Investigación y Educación',
		hasSubmenu: true,
		columns: [
			{
				title: 'Investigación',
				links: [
					{ label: 'Ensayos Clínicos', url: '/investigacion/ensayos' },
					{ label: 'Publicaciones', url: '/investigacion/publicaciones' },
					{
						label: 'Conferencias Médicas',
						url: '/investigacion/conferencias',
					},
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
		hasSubmenu: false,
		url: '/contactos',
	},
];
