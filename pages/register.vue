<template>
	<div
		class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4"
	>
		<div
			class="w-[80%] h-[80vh] bg-white rounded-3xl shadow-xl overflow-hidden flex"
		>
			<!-- Left side with form -->
			<div class="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col">
				<!-- Logo and navigation -->
				<div class="flex justify-between items-center mb-8">
					<div class="flex items-center">
						<div
							class="h-12 w-12 rounded-full bg-teal-500 flex items-center justify-center"
						>
							<div
								class="h-9 w-9 rounded-full bg-teal-600 flex items-center justify-center"
							>
								<span class="text-white font-bold">OC</span>
							</div>
						</div>
						<span class="ml-3 text-xl font-semibold text-gray-800">
							Oncoclinic
						</span>
					</div>
					<div class="hidden sm:flex space-x-8 text-gray-600">
						<a
							href="#"
							class="hover:text-teal-600 transition-colors font-medium"
						>
							Inicio
						</a>
						<a
							href="#"
							class="hover:text-teal-600 transition-colors font-medium"
						>
							Registrarse
						</a>
						<a
							href="#"
							class="hover:text-teal-600 transition-colors font-medium"
						>
							Contacto
						</a>
					</div>
				</div>

				<!-- Form content -->
				<div
					class="flex-grow flex flex-col justify-center max-w-md mx-auto w-full"
				>
					<div class="space-y-8">
						<div>
							<p
								class="text-teal-600 text-sm font-semibold tracking-wide uppercase"
							>
								COMIENZA GRATIS
							</p>
							<h1 class="text-4xl font-bold mt-2 text-gray-800">
								Crea tu cuenta
								<span class="text-teal-500">.</span>
							</h1>
							<p class="mt-3 text-gray-600">
								¿Ya tienes una cuenta?
								<a href="#" class="text-teal-600 hover:underline font-medium">
									Iniciar sesión
								</a>
							</p>
						</div>

						<div class="space-y-5">
							<!-- Name fields -->
							<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
								<div class="relative group">
									<label
										class="text-xs text-gray-500 absolute top-2 left-4 transition-all group-focus-within:text-teal-600"
									>
										Nombre
									</label>
									<input
										v-model="firstName"
										type="text"
										class="w-full bg-gray-50 rounded-xl border border-gray-200 pt-6 pb-2 px-4 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
										placeholder="Juan"
									/>
									<div
										class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									>
										<UserIcon class="h-5 w-5" />
									</div>
								</div>
								<div class="relative group">
									<label
										class="text-xs text-gray-500 absolute top-2 left-4 transition-all group-focus-within:text-teal-600"
									>
										Apellido
									</label>
									<input
										v-model="lastName"
										type="text"
										class="w-full bg-gray-50 rounded-xl border border-gray-200 pt-6 pb-2 px-4 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
										placeholder="Pérez"
									/>
									<div
										class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									>
										<UserIcon class="h-5 w-5" />
									</div>
								</div>
							</div>

							<!-- Email field -->
							<div class="relative group">
								<label
									class="text-xs text-gray-500 absolute top-2 left-4 transition-all group-focus-within:text-teal-600"
								>
									Correo electrónico
								</label>
								<input
									v-model="email"
									type="email"
									class="w-full bg-gray-50 rounded-xl border border-gray-200 pt-6 pb-2 px-4 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
									placeholder="juan.perez@ejemplo.com"
								/>
								<div
									class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
								>
									<MailIcon class="h-5 w-5" />
								</div>
							</div>

							<!-- Password field -->
							<div class="relative group">
								<label
									class="text-xs text-gray-500 absolute top-2 left-4 transition-all group-focus-within:text-teal-600"
								>
									Contraseña
								</label>
								<input
									v-model="password"
									:type="showPassword ? 'text' : 'password'"
									class="w-full bg-gray-50 rounded-xl border border-gray-200 pt-6 pb-2 px-4 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
									placeholder="••••••••"
								/>
								<button
									@click="togglePasswordVisibility"
									type="button"
									class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-600 transition-colors"
								>
									<EyeIcon v-if="!showPassword" class="h-5 w-5" />
									<EyeOffIcon v-else class="h-5 w-5" />
								</button>
							</div>

							<!-- Password strength indicator -->
							<div v-if="password" class="space-y-2">
								<div class="flex items-center justify-between">
									<span class="text-xs text-gray-500">
										Seguridad de la contraseña
									</span>
									<span
										class="text-xs font-medium"
										:class="passwordStrengthColor"
									>
										{{ passwordStrengthText }}
									</span>
								</div>
								<div
									class="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden"
								>
									<div
										class="h-full transition-all duration-300 rounded-full"
										:class="passwordStrengthColor"
										:style="{ width: `${passwordStrength}%` }"
									></div>
								</div>
							</div>
						</div>

						<!-- Terms and conditions -->
						<div class="flex items-start space-x-3">
							<div class="flex items-center h-5">
								<input
									v-model="acceptTerms"
									id="terms"
									type="checkbox"
									class="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
								/>
							</div>
							<div class="text-sm">
								<label for="terms" class="text-gray-600">
									Acepto los
									<a href="#" class="text-teal-600 hover:underline">
										Términos de servicio
									</a>
									y la
									<a href="#" class="text-teal-600 hover:underline">
										Política de privacidad
									</a>
								</label>
							</div>
						</div>

						<!-- Action buttons -->
						<div class="flex flex-col sm:flex-row gap-4 pt-4">
							<button
								class="px-6 py-3.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium"
							>
								<UserPlusIcon class="h-5 w-5" />
								<span>Método alternativo</span>
							</button>
							<button
								@click="createAccount"
								:disabled="!isFormValid"
								:class="[
									'flex-1 px-6 py-3.5 text-white rounded-xl transition-all flex items-center justify-center gap-2 font-medium',
									isFormValid
										? 'bg-teal-500 hover:bg-teal-600'
										: 'bg-gray-300 cursor-not-allowed',
								]"
							>
								<CheckIcon class="h-5 w-5" />
								<span>Crear cuenta</span>
							</button>
						</div>
					</div>
				</div>

				<!-- Footer -->
				<div class="mt-8 text-center text-sm text-gray-500">
					© {{ currentYear }} Oncoclinic. Todos los derechos reservados.
				</div>
			</div>

			<!-- Right side with image -->
			<div class="hidden lg:block lg:w-1/2 relative">
				<div
					class="absolute inset-0 bg-gradient-to-br from-teal-50 to-teal-100"
				></div>

				<!-- Decorative elements -->
				<div class="absolute inset-0 opacity-20">
					<div
						class="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-teal-300"
					></div>
					<div
						class="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-teal-400"
					></div>
					<div
						class="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-teal-500"
					></div>
				</div>

				<!-- Dotted line path -->
				<svg
					class="absolute top-0 left-0 w-full h-full"
					viewBox="0 0 400 600"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M200 0 Q 400 200 200 400 Q 0 600 200 800"
						stroke="#e5e7eb"
						stroke-width="2"
						stroke-dasharray="6 6"
						fill="none"
					/>
				</svg>

				<!-- Mountain lake image -->
				<div
					class="absolute bottom-0 right-0 w-full h-4/5 overflow-hidden rounded-tl-3xl"
				>
					<img
						src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-01%20114129-CVDZj9BBllKSM6mwzHfPoR3NFHxd0l.png"
						alt="Mountain lake landscape"
						class="object-cover h-full w-full transition-transform duration-10000 hover:scale-110"
					/>

					<!-- Content overlay -->
					<div
						class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-10"
					>
						<h2 class="text-white text-3xl font-bold mb-2">
							Bienvenido a Oncoclinic
						</h2>
						<p class="text-white/80 mb-6 max-w-md">
							Plataforma especializada en servicios médicos oncológicos de alta
							calidad para pacientes y profesionales.
						</p>
						<div class="flex space-x-3">
							<div class="h-2 w-2 rounded-full bg-white"></div>
							<div class="h-2 w-2 rounded-full bg-white/50"></div>
							<div class="h-2 w-2 rounded-full bg-white/50"></div>
						</div>
					</div>

					<!-- Logo watermark -->
					<div class="absolute top-6 right-6 text-white">
						<div
							class="h-12 w-12 rounded-full bg-teal-500/30 backdrop-blur-sm flex items-center justify-center"
						>
							<div
								class="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center"
							>
								<span class="text-white font-bold">OC</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import {
		UserIcon,
		MailIcon,
		EyeIcon,
		EyeOffIcon,
		CheckIcon,
		UserPlusIcon,
	} from 'lucide-vue-next';

	// Form state
	const firstName = ref<string>('');
	const lastName = ref<string>('');
	const email = ref<string>('');
	const password = ref<string>('');
	const showPassword = ref<boolean>(false);
	const acceptTerms = ref<boolean>(false);
	const currentYear = new Date().getFullYear();

	// Password strength calculation
	const passwordStrength = computed(() => {
		if (!password.value) return 0;

		let strength = 0;

		// Length check
		if (password.value.length >= 8) strength += 25;

		// Contains lowercase
		if (/[a-z]/.test(password.value)) strength += 25;

		// Contains uppercase
		if (/[A-Z]/.test(password.value)) strength += 25;

		// Contains number or special char
		if (/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password.value))
			strength += 25;

		return strength;
	});

	const passwordStrengthText = computed(() => {
		const strength = passwordStrength.value;
		if (strength < 25) return 'Muy débil';
		if (strength < 50) return 'Débil';
		if (strength < 75) return 'Moderada';
		return 'Fuerte';
	});

	const passwordStrengthColor = computed(() => {
		const strength = passwordStrength.value;
		if (strength < 25) return 'text-red-500 bg-red-500';
		if (strength < 50) return 'text-orange-500 bg-orange-500';
		if (strength < 75) return 'text-yellow-500 bg-yellow-500';
		return 'text-green-500 bg-green-500';
	});

	// Form validation
	const isFormValid = computed(() => {
		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isEmailValid = emailRegex.test(email.value);

		// All fields filled and valid
		return (
			firstName.value.trim() !== '' &&
			lastName.value.trim() !== '' &&
			isEmailValid &&
			password.value.length >= 8 &&
			acceptTerms.value
		);
	});

	// Toggle password visibility
	const togglePasswordVisibility = () => {
		showPassword.value = !showPassword.value;
	};

	// Form submission
	const createAccount = () => {
		if (!isFormValid.value) {
			return;
		}

		// Submit form (in a real app, you would call an API here)
		console.log('Account creation submitted', {
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value,
			password: password.value,
		});

		// Show success message or redirect
		alert('¡Cuenta creada con éxito!');
	};
</script>
