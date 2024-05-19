globalThis.render = require("electron").ipcRenderer;
globalThis.$id = (id: string) => {
  return document.getElementById(id);
};
globalThis.$select = (name: string) => {
  return document.querySelector(name);
};
