import { mergeDeep, pipe } from "remeda";

import * as path from "node:path";
import * as fs from "node:fs";
import * as process from "node:process";
import { defineConfig } from "rollup";
import { transformFileSync } from "@swc/core";
import { createFilter } from "@rollup/pluginutils";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import swc from "@rollup/plugin-swc";

const BUILD_DIR = path.resolve("build");
const SRC_DIR = path.resolve("src");
const ENTRY_FILE = path.resolve(SRC_DIR, "main.ts");
const SWC_CONFIG_FILE = path.resolve(".swcrc");

const baseURL = process.cwd();
console.log("baseURL", baseURL);

const dirents = fs.readdirSync(SRC_DIR, { withFileTypes: true });


const pathMap = new Map();
for (const dir of dirents) {
    if (dir.isDirectory()) {
        pathMap.set(`~/${dir.name}`, [path.resolve(SRC_DIR, dir.name)]);
    } else if (dir.isFile()) {
        const basename = path.basename(dir.name, path.extname(dir.name));
        pathMap.set(`~/${basename}`, [path.resolve(SRC_DIR, dir.name)]);
    }
}

const o = {
    baseURL,
    paths: Object.fromEntries(pathMap),
};
console.log("o", o);

/**
 * @type {import("@swc/core").Options}
 */
const swcConfig = pipe(
    SWC_CONFIG_FILE,
    x => fs.readFileSync(x, "utf-8"),
    JSON.parse,
    mergeDeep(
        { jsc: { baseUrl: baseURL, paths: Object.fromEntries(pathMap) }, }
    )
);


const aliasEntries = pipe(
    pathMap,
    Object.fromEntries,
    Object.entries,
    (arr) => arr.map(([key, value]) => ({
        find: key,
        replacement: value.at(0)
    }))
);

console.log({ aliasEntries });

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
            customResolver: resolve({ extensions: [".tsx", ".ts"] }),
            entries: aliasEntries
        }),
        swc({
            swc: {
                jsc: {
                    target: "es2020",
                    parser: {
                        syntax: "typescript",
                        decorators: true,
                        "tsx": false,
                        "dynamicImport": true
                    },
                    transform: {
                        decoratorMetadata: true,
                        legacyDecorator: true
                    },
                    keepClassNames: true,
                },
            },

        }),
        commonjs(
            { extensions: [".js", ".ts"] }
        ),
    ],
});

export default config;
