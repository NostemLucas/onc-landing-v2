<template>
	<div class="h-screen w-screen p-2">
		<LMap
			ref="map"
			:zoom="zoom"
			:center="[-16.52711826894523, -68.11105322436397]"
			:use-global-leaflet="false"
			fade-animation
		>
			<LTileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
				layer-type="base"
				name="OpenStreetMap"
			/>

			<LMarker :lat-lng="[-16.52711826894523, -68.11105322436397]">
				<LPopup>
					<span>Oncoclinic Obrajes - Sede Obrajes</span>
				</LPopup>
			</LMarker>
		</LMap>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	const zoom = ref(14);
</script>
