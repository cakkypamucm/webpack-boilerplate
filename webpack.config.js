import path from "node:path";
import { fileURLToPath } from "node:url";
import webpack from "webpack";
import WebpackBar from "webpackbar";

// eslint-disable-next-line import-x/default
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";
import Critters from "critters-webpack-plugin";
import dotenv from "dotenv";

const assetsPath = "assets";
const uniqueFileName = "[name]-[contenthash:7]";
const uniqueFileChunkName = `${uniqueFileName}-chunk`;

const babelLoaderOpts = {
    cacheCompression: false,
    cacheDirectory: true,
    babelrc: true
};
const env = dotenv.config({ path: "./.env" }).parsed;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (_, { mode = "production", ...argv }) => {
    // @see https://github.com/webpack-contrib/mini-css-extract-plugin/issues/444, https://github.com/webpack-contrib/mini-css-extract-plugin/issues/1089
    const hmrCssFixStripHash = (pattern) =>
        mode === "production" ? pattern : pattern.replaceAll(/-?\[(fullhash|chunkhash|hash|contenthash)(:\d+)?\]/g, "");

    return {
        mode,
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
                    type: "asset",
                    generator: {
                        filename: `${assetsPath}/images/${uniqueFileName}[ext]`
                    }
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: "asset",
                    generator: {
                        filename: `${assetsPath}/fonts/${uniqueFileName}[ext]`
                    }
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
            port: +env.APP_PORT,
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
            new Critters({
                preload: "swap",
                preloadFonts: true
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
                filename: `${assetsPath}/css/${hmrCssFixStripHash(uniqueFileName)}.css`,
                chunkFilename: `${assetsPath}/css/${hmrCssFixStripHash(uniqueFileChunkName)}.css`
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
    };
};
