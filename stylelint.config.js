/* eslint sort-keys/sort-keys-fix: "error" */
const selectorKebabCaseRE = /^([a-z][\da-z]*)((-|__)[\da-z]+)*$/;
const selectorKebabCaseMessage = "Use kebab-case in selectors";

module.exports = {
    extends: ["stylelint-config-vue-cakkypamucm"],
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
                message: "v* могут быть некорректны из-за urlbar. Попробуйте (d|s|l)v*",
                severity: "warning"
            }
        ]
    }
};
