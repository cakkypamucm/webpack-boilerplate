/* eslint sort-keys/sort-keys-fix: "error" */
/* eslint-disable sort-keys/sort-keys-fix */

/* eslint-enable sort-keys/sort-keys-fix */
const commonRules = {
    "capitalized-comments": ["error", "never", { ignorePattern: "TODO|FIXME" }],
    "unicorn/filename-case": [
        "error",
        {
            case: "kebabCase"
        }
    ]
};
/* eslint-disable sort-keys/sort-keys-fix */

module.exports = {
    extends: ["eslint-config-cakkypamucm"],
    rules: commonRules,
    overrides: [
        {
            files: ["src/**/*.ts", "src/**/*.vue"],
            extends: ["eslint-config-vue-typescript-cakkypamucm"],
            /* eslint-enable sort-keys/sort-keys-fix */
            rules: {
                ...commonRules,
                "vue/block-lang": [
                    "error",
                    {
                        script: {
                            lang: "ts"
                        },
                        style: {
                            lang: "scss"
                        }
                    }
                ],
                "vue/component-name-in-template-casing": [
                    "error",
                    "kebab-case",
                    {
                        ignores: [],
                        registeredComponentsOnly: false
                    }
                ],
                "vue/custom-event-name-casing": ["error", "kebab-case"]
            }
            /* eslint-disable sort-keys/sort-keys-fix */
        }
    ],
    root: true,
    settings: {
        "import-x/resolver": {
            node: true,
            webpack: true,
            typescript: {
                alwaysTryTypes: true
            }
        }
    }
};
