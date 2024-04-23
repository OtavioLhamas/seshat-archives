export default [
    {
        parserOptions: {
            ecmaVersion: 'latest',
            extraFileExtensions: ['.cjs', '.mjs'],
            sourceType: 'module',
        },

        env: {
            browser: true,
        },

        extends: [
            'eslint:recommended',
        ],

        plugins: [],

        rules: {
            camelcase: 'warn',
        },

        globals: {},

        overrides: [
            {
                files: ['./*.js', './*.cjs', './*.mjs'],
                env: {
                    node: true,
                },
            },
        ],
    }
];

