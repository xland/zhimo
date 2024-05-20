import { eventer } from "../common/eventer";
import React from "./React";
import "./ArticleList.scss";
export default function (props) {
    eventer.once("domReady", async () => {
    });
    return (
        <div class="ArticleList">
            <div class="header">
                <div class="searchInputBox">
                    <input type="text" />
                </div>
                <div class="searchBtn">
                    <i class="icon icon-search"></i>
                </div>
            </div>
            <div class="content">
                <div class="title">这是文章标题</div>
                <div class="title">这是文章标题</div>
                <div class="title">这是文章标题</div>
                <div class="title">这是文章标题</div>
                <div class="title">这是文章标题</div>
                <div class="title">这是文章标题</div>
                <div class="title">这是文章标题</div>
                <div class="title">这是文章标题</div>
                <div class="title">这是文章标题</div>
                <div class="title">这是文章标题</div>
                <div class="title">这是文章标题</div>
                <div class="title">这是文章标题</div>
                <div class="title">这是文章标题</div>
            </div>
        </div>
    );
};