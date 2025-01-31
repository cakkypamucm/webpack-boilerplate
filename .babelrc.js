export default {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: "3.40",
                modules: false
            }
        ],
        "@babel/preset-typescript"
    ]
};
