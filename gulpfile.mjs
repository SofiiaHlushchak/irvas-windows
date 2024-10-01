"use strict";

import { dest, src, watch, parallel, series } from "gulp";
import webpack from "webpack-stream";
import browsersync from "browser-sync";
import { deleteAsync } from "del";

const dist = "./dist/";

export const clean = () => {
    return deleteAsync([dist]);
};

export const copyHtml = () => {
    return src("./src/index.html").pipe(dest(dist)).pipe(browsersync.stream());
};

export const buildJs = () => {
    return src("./src/js/main.js")
        .pipe(
            webpack({
                mode: "development",
                output: {
                    filename: "script.js",
                },
                watch: false,
                devtool: "source-map",
                module: {
                    rules: [
                        {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                                loader: "babel-loader",
                                options: {
                                    presets: [
                                        [
                                            "@babel/preset-env",
                                            {
                                                debug: true,
                                                corejs: 3,
                                                useBuiltIns: "usage",
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                    ],
                },
            })
        )
        .pipe(dest(dist))
        .on("end", browsersync.reload);
};

export const copyAssets = () => {
    return src("./src/assets/**/*.*", { encoding: false })
        .pipe(dest(dist + "/assets"))
        .on("end", () => console.log("Ресурси успішно скопійовані!"))
        .on("error", (err) =>
            console.error("Помилка при копіюванні ресурсів:", err)
        );
};

export const watchFiles = () => {
    browsersync.init({
        server: "./dist/",
        port: 4000,
        notify: true,
    });

    watch("./src/index.html", parallel(copyHtml));
    watch("./src/assets/**/*.*", parallel(copyAssets));
    watch("./src/js/**/*.js", parallel(buildJs));
};

export const build = series(clean, parallel(copyHtml, copyAssets, buildJs));

export const buildProdJs = () => {
    return src("./src/js/main.js")
        .pipe(
            webpack({
                mode: "production",
                output: {
                    filename: "script.js",
                },
                module: {
                    rules: [
                        {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                                loader: "babel-loader",
                                options: {
                                    presets: [
                                        [
                                            "@babel/preset-env",
                                            {
                                                corejs: 3,
                                                useBuiltIns: "usage",
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                    ],
                },
            })
        )
        .pipe(dest(dist));
};

export const dev = series(build, watchFiles);

export default dev;
