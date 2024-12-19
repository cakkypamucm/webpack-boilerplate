const path = require("node:path");
const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const uniqueFileName = "[name]-[contenthash:7]";
const uniqueFileChunkName = `${uniqueFileName}-chunk`;
const babelLoaderOpts = {
    cacheCompression: false,
    cacheDirectory: true,
    babelrc: true
};

module.exports = (_, argv) => ({
    mode: argv.mode || "production",
    entry: {
        index: path.join(__dirname, "src/index.ts")
    },
    output: {
        filename: `js/${uniqueFileName}.js`,
        chunkFilename: `js/${uniqueFileChunkName}.js`,
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        clean: true
    },
    resolve: {
        alias: {
            "@": path.join(__dirname, "src")
        },
        extensions: [".ts", "..."]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelLoaderOpts
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: babelLoaderOpts
                    },
                    {
                        loader: "ts-loader",
                        options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                loadPaths: [path.resolve(__dirname, "node_modules/normalize.css")]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/inline"
            }
        ]
    },
    devtool: "source-map",
    devServer: {
        hot: true,
        client: {
            overlay: {
                errors: true
            }
        },
        port: "auto",
        open: true,
        static: {
            directory: path.join(__dirname, "dist")
        },
        historyApiFallback: true
    },
    plugins: [
        new WebpackBar(),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: "true",
            __VUE_PROD_DEVTOOLS__: "false",
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false"
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public/index.html"),
            favicon: path.join(__dirname, "public/favicon.ico")
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, "public"),
                    to: path.join(__dirname, "dist"),
                    toType: "dir",
                    noErrorOnMissing: true,
                    globOptions: {
                        dot: true,
                        ignore: ["**/public/index.html"]
                    }
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: `css/${uniqueFileName}.css`,
            chunkFilename: `css/${uniqueFileChunkName}.css`
        })
    ],
    optimization: {
        minimizer: [new CssMinimizerPlugin(), "..."],
        moduleIds: "deterministic",
        runtimeChunk: {
            name: "webpack-runtime"
        },
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendors: {
                    test: /[/\\]node_modules[/\\]/,
                    name: "vendors"
                },
                default: {
                    minChunks: 2
                }
            }
        }
    },
    performance: {
        hints: false
    },
    cache: {
        type: "filesystem"
    },
    stats: {
        errorDetails: true
    },
    ignoreWarnings: [
        /node_modules\/@fontsource\/roboto-slab\/scss\/mixins\.scss[\s\S]*Global built-in functions are deprecated and will be removed in Dart Sass 3/
    ]
});
