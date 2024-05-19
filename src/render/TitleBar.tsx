import React from "./React";
import "./TitleBar.scss";
export default function (props) {
    let closeWin = () => {
        let ipcRenderer = require("electron").ipcRenderer
        ipcRenderer.invoke("changeWindowState", "close");
    }
    return (
        <div class="TitleBar">
            <div class="TitleLabel">allen</div>
            <div class="WindowToolBox">
                <div class="WindowToolBtn">
                    <i class="icon icon-minimize"></i>
                </div>
                <div class="WindowToolBtn">
                    <i class="icon icon-maximize"></i>
                </div>
                <div class="WindowToolBtn closeBtn" onClick={closeWin}>
                    <i class="icon icon-close"></i>
                </div>
            </div>
        </div>
    );
};