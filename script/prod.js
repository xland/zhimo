let esbuild = require("esbuild");
let fs = require("fs-extra");
let getTemplate = (
  entry
) => `<html><head><meta http-equiv="Content-Type" content="text/html;charset=UTF-8"><link rel="stylesheet" href="./${entry}.css"><link rel="stylesheet" href="./res/iconfont.css"></head>
  <body><script src="./${entry}.js"></script></body></html>`;

let preparePackageJson = async () => {
  let json = require("../package.json");
  delete json.scripts;
  delete json.license;
  let electronConfig = json.devDependencies.electron.replace("^", "");
  delete json.devDependencies;
  json.devDependencies = { electron: electronConfig };
  fs.writeFileSync("./dist/prod/package.json", JSON.stringify(json));
  //防止electron-builder再安装一次依赖
  fs.mkdirSync("./dist/prod/node_modules");
};

let buildMain = async () => {
  await esbuild.build({
    entryPoints: ["./src/main/entry.ts"],
    bundle: true,
    outfile: "./dist/prod/main.js",
    platform: "node",
    external: ["electron"],
    minify: true,
    sourcemap: false,
  });
};

let buildRender = async () => {
  let { sassPlugin } = require("esbuild-sass-plugin");
  await fs.copy("./res/", "./dist/prod/");
  let entry = "Index";
  let content = getTemplate(entry);
  await fs.writeFile(`./dist/prod/${item}.html`, content);
  await esbuild.build({
    entryPoints: [`./src/render/${entry}.tsx`],
    bundle: true,
    outdir: "prod",
    plugins: [sassPlugin()],
    platform: "node",
    external: ["electron"],
    minify: true,
    sourcemap: false,
  });
};

let buildInstaller = () => {
  let options = {
    config: {
      directories: { output: "./dist", app: "./prod" },
      files: ["**"],
      extends: null,
      productName: "Calendar",
      appId: "com.calendar.xland",
      asar: true,
      // extraResources,
      win: {
        icon: "./script/logo.ico",
        target: [{ target: "nsis", arch: ["x64"] }],
      },
      // mac: macConfig,
      nsis: {
        oneClick: true,
        perMachine: true,
        allowToChangeInstallationDirectory: false,
        // include: path.join(process.cwd(), 'script/common/installer32.nsh'),
        createDesktopShortcut: true,
        createStartMenuShortcut: true,
        shortcutName: "Calendar",
        installerIcon: "./script/logo.ico",
        uninstallerIcon: "./script/logo.ico",
        installerHeader: "./script/logo.ico",
        installerHeaderIcon: "./script/logo.ico",
        // installerSidebar: '../resource/unrelease/sidebar.bmp',
      },
      publish: [{ provider: "generic", url: "" }],
    },
    // project: process.cwd(),
  };
  let builder = require("electron-builder");
  return builder.build(options);
};

let start = async () => {
  await fs.remove("./dist/prod");
  fs.mkdirSync("./dist/prod");
  await buildMain();
  await buildRender();
  await preparePackageJson();
  await buildInstaller();
};
start();
