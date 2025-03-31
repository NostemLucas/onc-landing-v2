// @ts-check
import prettierPlugin from 'eslint-plugin-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
	{
		plugins: {
			prettier: prettierPlugin,
			vue: eslintPluginVue,
		},
		rules: {
			'prettier/prettier': [
				'error',
				{
					endOfLine: 'auto',
				},
			],
		},
	},

	{
		files: ['**/*.ts', '**/*.vue', '**/*.js'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': 'off',

			'vue/multi-word-component-names': 'off',
			'vue/html-self-closing': 'off',
			'vue/attributes-order': 'off',
			'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
			'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		},
	}
);
