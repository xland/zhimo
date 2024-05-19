globalThis.render = require("electron").ipcRenderer;
globalThis.$id = (id: string) => {
  return document.getElementById(id);
};
globalThis.$select = (name: string) => {
  return document.querySelector(name);
};
HTMLElement.prototype.prev = function (): HTMLElement {
  return this.previousElementSibling;
};
HTMLElement.prototype.next = function (): HTMLElement {
  return this.nextElementSibling;
};
HTMLElement.prototype.son0 = function (): HTMLElement {
  return this.firstElementChild;
};
HTMLElement.prototype.son1 = function (): HTMLElement {
  return this.lastElementChild;
};
HTMLElement.prototype.dad = function (): HTMLElement {
  return this.parentElement;
};
HTMLElement.prototype.classAdd = function (name) {
  this.classList.add(name);
};
HTMLElement.prototype.classDel = function (name) {
  this.classList.remove(name);
};
HTMLElement.prototype.classHas = function (name) {
  return this.classList.contains(name);
};
