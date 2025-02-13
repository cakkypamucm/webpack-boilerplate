/* eslint sort-keys/sort-keys-fix: "error" */
/* eslint-disable sort-keys/sort-keys-fix */
const selectorKebabCaseRE = /^([a-z][\da-z]*)((-|__)[\da-z]+)*$/;
const selectorKebabCaseMessage = "Use kebab-case in selectors";

export default {
    extends: ["stylelint-config-vue-cakkypamucm"],
    /* eslint-enable sort-keys/sort-keys-fix */
    rules: {
        "color-hex-length": "long",
        "selector-class-pattern": [
            selectorKebabCaseRE,
            {
                message: selectorKebabCaseMessage
            }
        ],
        "selector-id-pattern": [
            selectorKebabCaseRE,
            {
                message: selectorKebabCaseMessage
            }
        ],
        "unit-disallowed-list": [
            ["vw", "vh"],
            {
                message: "v* may be incorrect due to urlbar. Try (d|s|l)v*",
                severity: "warning"
            }
        ]
    }
    /* eslint-disable sort-keys/sort-keys-fix */
};
