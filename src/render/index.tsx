import React from "./React";
import { eventer } from "../common/eventer";
import "./index.scss";
import TitleBar from "./TitleBar";
import ContentBox from "./ContentBox";
let App = () => {
    return (
        <>
            <TitleBar></TitleBar>
            <ContentBox></ContentBox>
        </>
    );
};
document.addEventListener("DOMContentLoaded", async () => {
    document.body.ondragstart = () => false;
    document.body.ondragend = () => false;
    document.body.ondrop = () => false;
    document.body.setAttribute("class", "blue");
    document.body.appendChild(<App />);
    eventer.emit("domReady");
    let { ipcRenderer } = require("electron");
    ipcRenderer.invoke("changeWindowState", "show");
});