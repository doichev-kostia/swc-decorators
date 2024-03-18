import commonjs from "@rollup/plugin-commonjs";
import swc from "@rollup/plugin-swc";

import { mergeDeep, pipe } from "remeda";

import * as path from "node:path";
import * as fs from "node:fs";
import * as process from "node:process";
import { defineConfig } from "rollup";

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
        { jsc: { baseUrl: baseURL  }, root: SRC_DIR }
    )
);

if (swcConfig.module) {
    delete swcConfig.module;
}

const config = defineConfig({
    input: ENTRY_FILE,
    output: {
        // preserveModules: true,
        dir: BUILD_DIR,
        format: "cjs"
    },
    plugins: [
        commonjs(),
        swc({
            // swc: swcConfig
            swc: {
                jsc: swcConfig.jsc,
                root: swcConfig.root,

            }
        }),
    ],
});

export default config;
