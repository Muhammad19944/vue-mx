// rollup.config.js
import path from "path";
import vue from "rollup-plugin-vue";
import alias from "@rollup/plugin-alias";
import buble from "@rollup/plugin-buble";
import commonjs from "rollup-plugin-commonjs";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import minimist from "minimist";
import copy from "rollup-plugin-copy-glob";

const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, "..");

const baseConfig = {
  input: "src/entry.js",
  plugins: {
    preVue: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      commonjs(),
      alias({
        resolve: [".jsx", ".js", ".vue"],
        entries: {
          "@": path.resolve(projectRoot, "src")
        }
      })
    ],
    vue: {
      css: true,
      template: {
        isProduction: true
      }
    },
    postVue: [buble()]
  }
};

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === "es") {
  const esConfig = {
    ...baseConfig,
    external,
    output: {
      file: "dist/vue-mx.esm.js",
      format: "esm",
      exports: "named"
    },
    plugins: [
      copy([{ files: "src/styles/**/*.{css,sass}", dest: "dist/styles" }], {
        verbose: true,
        watch: true
      }),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue
    ]
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === "cjs") {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: "dist/vue-mx.ssr.js",
      format: "cjs",
      name: "VueMx",
      exports: "named",
      globals
    },
    plugins: [
      copy([{ files: "src/styles/**/*.{css,sass}", dest: "dist/styles" }], {
        verbose: true,
        watch: true
      }),
      ...baseConfig.plugins.preVue,
      vue({
        ...baseConfig.plugins.vue,
        template: {
          ...baseConfig.plugins.vue.template,
          optimizeSSR: true
        }
      }),
      ...baseConfig.plugins.postVue
    ]
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === "iife") {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: "dist/vue-mx.min.js",
      format: "iife",
      name: "VueMx",
      exports: "named",
      globals
    },
    plugins: [
      copy([{ files: "src/styles/**/*.{css,sass}", dest: "dist/styles" }], {
        verbose: true,
        watch: true
      }),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      terser({
        output: {
          ecma: 5
        }
      })
    ]
  };
  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
