declare global {
  var render: Electron.IpcRenderer;
  function $id(id: string): HTMLElement;
  function $select(id: string): HTMLElement;
  interface HTMLElement {
    prev(): HTMLElement;
    next(): HTMLElement;
    son0(): HTMLElement;
    son1(): HTMLElement;
    dad(): HTMLElement;
    classAdd(name: string);
    classDel(name: string);
    classHas(name: string): boolean;
  }
}
export {};
