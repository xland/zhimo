import React from "./React";
import "./ContentBox.scss";
import { eventer } from "../common/eventer";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import LeftBox from "./LeftBox";
import ArticleList from "./ArticleList";
eventer.on("domReady", () => {
  const editor = new EditorJS({
    placeholder: "开始写字吧！",
    tools: {
      header: Header,
      list: List,
    },
    holder: "editor",
  });
});
export default function (props) {
  return (
    <div class="ContentBox">
      <LeftBox></LeftBox>
      <ArticleList></ArticleList>
      <div class="editorBox">
        <div class="titleBox">
          <input type="text" placeholder="文章标题"></input>
        </div>
        <div class="editor" id="editor"></div>
      </div>
    </div>
  );
}
