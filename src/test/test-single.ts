import fs from "fs";
import _ from "lodash";

import { Document } from "gap-script";

import { compareLines, Diff, LineContent } from ".";
import { Runnable, LINE_SEPARATOR, Utils } from "../shared";
import { Writer, HtmlWriter } from "../writer";

function createLineLiteral(prefix: string, line: LineContent): string {
    let lineLiteral: string = "<Empty>";
    if (!_.isUndefined(line)) {
        lineLiteral = line;
    }
    return `<code>${prefix}${lineLiteral}</code>`;
}

export class TestSingle implements Runnable {
    private filename: string;
    private reportFilename: string;
    private outFilename: string;

    constructor(filename: string) {
        this.filename = filename;
        this.reportFilename = Utils.getReportFilename(filename);
        this.outFilename = Utils.getOutFilename(filename);
    }

    private validate(): boolean {
        return this.filename.length !== 0;
    }

    private getRawLines(filename: string): string[] {
        const raw = fs.readFileSync(filename, {
            encoding: "utf-8"
        });
        return raw.split(LINE_SEPARATOR);
    }
    
    private writeReport(diff: Diff): void {
        let writer: Writer = new HtmlWriter();
        writer.addTitle(1, "Testing Report");

        writer.addParagraph(`src: <a href="${diff.srcFile}" target="_blank">${diff.srcFile}</a> | [${diff.srcLines} line(s)]`, "", "");
        writer.addParagraph(`dst: <a href="${diff.outFile}" target="_blank">${diff.outFile}</a> | [${diff.outLines} line(s)]`, "", "");
        writer.addParagraph(`Date: ${Utils.getNowLiteral()}`, "", "");

        writer.addTitle(2, `Differences ${diff.diffLines.length}`);
        
        diff.diffLines.forEach((item, index) => {
            writer.addTitle(4, `Line ${item.lineIndex + 1}`);
            const raw = item.srcLine;
            writer.addParagraph(createLineLiteral("src: ", raw), "", "");
            const generated = item.dstLine;
            writer.addParagraph(createLineLiteral("dst: ", generated), "", "");
        });

        writer.write(diff.reportFile);
    }

    public run(): Diff {
        let diff: Diff = new Diff(this.filename, this.reportFilename, this.outFilename);

        if (!this.validate()) {
            return diff;
        }

        const rawLines = this.getRawLines(this.filename);
        if (rawLines.length !== 0) {
            diff.isValid = true;
        }

        let doc = new Document();
        doc.open(this.filename);
        
        let generatedLines: string[] = doc.getLineLiterals();
        doc.saveAs(this.outFilename);
    
        compareLines(rawLines, generatedLines, diff);
        this.writeReport(diff);
        return diff;
    }
}
