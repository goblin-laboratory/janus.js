// import clean from '@rollup-extras/plugin-clean';
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import pkg from "./package.json" assert { type: "json" };

export default {
  input: "src/index.ts",
  output: [
    { format: "umd", file: pkg.browser, sourcemap: true },
    { format: "cjs", file: pkg.main, sourcemap: true },
    { format: "es", file: pkg.module, sourcemap: true },
  ],
  plugins: [
    // clean('dist'),
    typescript(), // TypeScript 插件
    terser(), // 压缩代码插件
    nodeResolve(),
    commonjs(),
    filesize(),
  ],
};
