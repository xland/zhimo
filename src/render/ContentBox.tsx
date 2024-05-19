import React from "./React";
import "./ContentBox.scss";
import { eventer } from "../common/eventer";
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header';
import List from '@editorjs/list';
eventer.on("domReady", () => {
    const editor = new EditorJS({
        tools: {
            header: Header,
            list: List
        },
        holder: 'editorjs'
    })
})
export default function (props) {
    return (<div class="ContentBox">
        <div class="leftBox"></div>
        <div class="centerBox"></div>
        <div class="editorBox" id="editorjs"></div>
    </div>);
};