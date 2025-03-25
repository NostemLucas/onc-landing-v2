<template>
	<div class="h-screen w-screen p-2">
		<div id="map" class="map-filter"></div>
	</div>
</template>

<script setup>
	import { onMounted } from 'vue';
	import 'ol/ol.css';
	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import OSM from 'ol/source/OSM';
	import Feature from 'ol/Feature';
	import Point from 'ol/geom/Point';
	import VectorLayer from 'ol/layer/Vector';
	import VectorSource from 'ol/source/Vector';
	import Style from 'ol/style/Style';
	import Icon from 'ol/style/Icon';
	import { fromLonLat } from 'ol/proj';

	onMounted(() => {
		// Coordenadas del centro y del marcador en EPSG:3857
		//	-68.12703295752024, -16.507985587243112,

		const centerCoordinates = fromLonLat([
			-68.11105322436397, -16.52711826894523,
		]);

		const map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
			],
			view: new View({
				center: centerCoordinates,
				zoom: 16,
			}),
		});

		// Crear un marcador
		const marker = new Feature({
			geometry: new Point(centerCoordinates),
		});

		// Estilo del marcador
		marker.setStyle(
			new Style({
				image: new Icon({
					src: 'https://openlayers.org/en/latest/examples/data/icon.png', // URL del icono del marcador
					scale: 0.1, // Escala del icono
				}),
			})
		);

		// Capa de vectores para el marcador
		const vectorLayer = new VectorLayer({
			source: new VectorSource({
				features: [marker],
			}),
		});

		// Agregar la capa de vectores al mapa
		map.addLayer(vectorLayer);
	});
</script>

<style scoped>
	.map-filter {
		width: 100%;
		height: 100%;
		filter: grayscale(100%) hue-rotate(0deg) invert(10%) sepia(0%)
			saturate(100%);
	}
</style>
