module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: "3.39"
            }
        ],
        "@babel/preset-typescript"
    ]
};
