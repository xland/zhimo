let fs = require("fs-extra");
let esbuild = require("esbuild");
let { sassPlugin } = require("esbuild-sass-plugin");
let serverUrl;
let getTemplate = (entry) => `<html>
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
  <link rel="stylesheet" href="./res/iconfont.css">
  <link rel="stylesheet" href="./${entry}.css">
</head>
<body>
    <script src="./${entry}.js"></script>
    <script>new EventSource('/esbuild').addEventListener('change', () => location.reload())</script>
</body>
</html>`;

let buildMain = async () => {
  await esbuild.build({
    entryPoints: ["./src/main/entry.ts"],
    bundle: true,
    outfile: "./dist/dev/main.js",
    platform: "node",
    external: ["electron"],
    sourcemap: true,
  });
};
let startDevServer = async () => {
  await fs.copy("./res/", "./dist/dev/res");
  let entry = "Index";
  let content = getTemplate(entry);
  fs.copy("./res", "./dist/dev");
  await fs.writeFile(`./dist/dev/${entry}.html`, content);
  let ctx = await esbuild.context({
    entryPoints: [`./src/render/${entry}.tsx`],
    plugins: [sassPlugin()],
    external: ["electron"],
    platform: "node",
    bundle: true,
    outdir: "./dist/dev",
    sourcemap: true,
  });
  await ctx.watch();
  let { port } = await ctx.serve({
    servedir: "./dist/dev",
    port: 4321,
  });
  serverUrl = `http://localhost:${port}/index.html`;
};
let startElectron = async () => {
  let electron = require("electron");
  let spawn = require("child_process").spawn;
  let child = spawn(electron, ["./main.js", serverUrl], {
    cwd: "./dist/dev",
  });
  child.stdout.on("data", (data) => {
    console.log(data.toString("utf8"));
  });
  child.stdout.on("error", (data) => {
    console.log(data.toString("utf8"));
  });
  child.on("close", () => {
    process.exit();
  });
};
let start = async () => {
  await buildMain();
  await startDevServer();
  await startElectron();
  console.log(`start at ${serverUrl}`);
};
start();
