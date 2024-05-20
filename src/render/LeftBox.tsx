import { eventer } from "../common/eventer";
import React from "./React";
import "./LeftBox.scss";
export default function (props) {
    eventer.once("domReady", async () => {
    });
    return (
        <div class="LeftBox">
            <div class="header">
                <div class="tab">分类</div>
                <div class="tab">标签</div>
            </div>
            <div class="content"></div>
        </div>
    );
};
