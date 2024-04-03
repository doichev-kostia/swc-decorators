import * as path from "node:path";
import * as fs from "node:fs";
import * as process from "node:process";


import { defineConfig } from "rollup";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import swc from "@rollup/plugin-swc";

import { mergeDeep, pipe } from "remeda";

const BUILD_DIR = path.resolve("build");
const SRC_DIR = path.resolve("src");
const ENTRY_FILE = path.resolve(SRC_DIR, "main.ts");
const SWC_CONFIG_FILE = path.resolve(".swcrc");

const baseURL = process.cwd();

/**
 * @type {import("@swc/core").Options}
 */
const swcConfig = pipe(
    SWC_CONFIG_FILE,
    x => fs.readFileSync(x, "utf-8"),
    JSON.parse,
    mergeDeep(
        { jsc: { baseUrl: baseURL }, }
    )
);

// swc config paths break swc transpiler
if (swcConfig.jsc.paths) {
    swcConfig.jsc.paths = undefined;
}

const config = defineConfig({
    input: ENTRY_FILE,
    output: {
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: SRC_DIR,
        dir: BUILD_DIR,
        format: "cjs"
    },
    plugins: [
        alias({
            customResolver: resolve({ extensions: [".ts", ".js"] }),
            entries:
                [
                    {
                        find: "~",
                        replacement: path.resolve("src")
                    }
                ]
        }),
        swc({
            swc: {
                jsc: swcConfig.jsc,
                minify: swcConfig.minify,
            },
        }),
        commonjs(
            { extensions: [".js", ".ts"] }
        ),
    ],
});

export default config;
