<template>
	<button :class="buttonClass" @click="handleClick">
		<slot></slot>
	</button>
</template>

<script>
	export default {
		name: 'IconButton',
		props: {
			variant: {
				type: String,
				default: 'primary',
				validator: (value) =>
					['primary', 'secondary', 'danger'].includes(value),
			},
		},
		computed: {
			buttonClass() {
				const baseClass = 'p-2 rounded-full focus:outline-none';
				const variantClasses = {
					primary: 'bg-blue-500 hover:bg-blue-700 text-white',
					secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
					danger: 'bg-red-500 hover:bg-red-700 text-white',
				};
				return `${baseClass} ${variantClasses[this.variant]}`;
			},
		},
		methods: {
			handleClick(event) {
				this.$emit('click', event);
			},
		},
	};
</script>

<style scoped>
	/* Add any additional styles if needed */
</style>
