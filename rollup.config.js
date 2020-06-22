import babel from "rollup-plugin-babel";
import typescript from "rollup-plugin-typescript";
import resolve from "rollup-plugin-node-resolve";
export default {
  input: "src/main.ts",
  output: {
    file: "dist/bundle.js",
    format: "umd",
    name: "SM"
  },
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    typescript()
  ]
};
