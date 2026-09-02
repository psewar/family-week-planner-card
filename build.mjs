// Build / dev-serve script for family-week-planner-card.
// `node build.mjs`          -> minified bundle in dist/
// `node build.mjs --serve`  -> watch + static server (serves dev/index.html + live bundle)
import esbuild from "esbuild";

const base = {
  entryPoints: ["src/family-week-planner-card.js"],
  bundle: true,
  format: "esm",
  target: "es2021",
  outfile: "dist/family-week-planner-card.js",
  legalComments: "inline",
};

if (process.argv.includes("--serve")) {
  const ctx = await esbuild.context({ ...base, minify: false, sourcemap: true });
  await ctx.watch();
  const { host, port } = await ctx.serve({ servedir: ".", port: 8137 });
  const shown = host === "0.0.0.0" || host === "::" ? "localhost" : host;
  console.log(`\n  Dev server:  http://${shown}:${port}/dev/index.html\n  (bundle live at /dist/family-week-planner-card.js, rebuilds on save)\n`);
} else {
  await esbuild.build({ ...base, minify: true });
  console.log("built dist/family-week-planner-card.js");
}
