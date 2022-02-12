import fs from "fs";

import { Level, Writer } from "./writer";
import { LINE_SEPARATOR } from "../shared";

const TITLE_PREFIX_LIST: string[] = ["<h1>", "<h2>", "<h3>", "<h4>", "<h5>", "<h6>"];
const TITLE_SUFFIX_LIST: string[] = ["</h1>", "</h2>", "</h3>", "</h4>", "</h5>", "</h6>"];

function enumToString(level: Level, mapping: string[]): string {
    return mapping[level - 1];
}

function getTitlePrefix(level: Level): string {
    return enumToString(level, TITLE_PREFIX_LIST);
}

function getTitleSuffix(level: Level): string {
    return enumToString(level, TITLE_SUFFIX_LIST);
}

export class HtmlWriter implements Writer {
    static ENTER: string = LINE_SEPARATOR;

    private lines: string[];

    constructor() {
        this.lines = [];
    }

    private addLine(line: string): void {
        this.lines.push(line);
    }

    public addTitle(level: Level, title: string): void {
        this.addLine(`${getTitlePrefix(level)}${title}${getTitleSuffix(level)}`);
    }

    public addParagraph(content: string, url: string = "", color: string = ""): void {
        let line: string = content;
        if (color.length > 0) {
            line = `<font color="${color}">${line}</font>`;
        }
        if (url.length > 0) {
            line = `<a href="${url}">${line}</a>`;
        }
        this.addLine(`<p>${line}</p>`);
    }

    public clear(): void {
        this.lines = [];
    }

    public write(filename: string): void {
        const html: string = `<!DOCTYPE html>
<html>
    <head>
        <title>${filename}</title>
    </head>
    <body>
${this.lines.join(HtmlWriter.ENTER)}
    </body>
</html>`;
        fs.writeFileSync(filename, html, {encoding: "utf-8"});
    }

}
