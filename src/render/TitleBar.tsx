import { eventer } from "../common/eventer";
import React from "./React";
import "./TitleBar.scss";
export default function (props) {
    let stateChange = (e) => {
        let ele = e.currentTarget as HTMLElement;
        let icon = ele.children[0] as HTMLElement;
        let state = icon.getAttribute("class").split('-')[1] as string;
        render.invoke("changeWindowState", state);
    }
    let windowStateHandler = (e, state) => {
        let restoreBtn = $id("restoreBtn") as HTMLElement;
        let maximizeBtn = $id("maximizeBtn") as HTMLElement;
        if (state === "maximize") {
            restoreBtn.style.display = "";
            maximizeBtn.style.display = "none";
        } else if (state === "unmaximize") {
            restoreBtn.style.display = "none";
            maximizeBtn.style.display = "";
        }
    };
    eventer.once("domReady", async () => {
        render.addListener("windowStateChanged", windowStateHandler);
        let flag = await render.invoke("getWindowState");
        windowStateHandler(null, flag ? "maximize" : "unmaximize");
    });
    return (
        <div class="TitleBar">
            <div class="TitleLabel">allen</div>
            <div class="WindowToolBox">
                <div class="WindowToolBtn" onClick={stateChange}>
                    <i class="icon icon-minimize"></i>
                </div>
                <div onClick={stateChange} class="WindowToolBtn" id="restoreBtn" style="display: none;">
                    <i class="icon icon-restore"></i>
                </div>
                <div onClick={stateChange} class="WindowToolBtn" id="maximizeBtn">
                    <i class="icon icon-maximize"></i>
                </div>
                <div class="WindowToolBtn closeBtn" onClick={stateChange}>
                    <i class="icon icon-close"></i>
                </div>
            </div>
        </div>
    );
};
