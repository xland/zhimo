import React from "./React";
import { eventer } from "../common/eventer";
import "./Index.scss";
import TitleBar from "./TitleBar";
import ContentBox from "./ContentBox";
import "./Helper";
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
    render.invoke("changeWindowState", "show");
});