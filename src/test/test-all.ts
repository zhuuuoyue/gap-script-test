import _ from "lodash";

import { TestSingle, Diff } from ".";
import { Runnable, Utils } from "../shared";
import { Writer, HtmlWriter } from "../writer";

export class TestAll implements Runnable {
    private rootDir: string;

    constructor(rootDir: string) {
        this.rootDir = rootDir;
    }

    private writeSummary(allDiff: Diff[]): void {
        // sort
        let invalid: Diff[] = [];
        let good: Diff[] = [];
        let bad: Diff[] = [];
        allDiff.forEach((diff) => {
            if (_.isUndefined(diff)) {
                invalid.push(diff);
            } else {
                if (diff.diffLines.length === 0) {
                    good.push(diff);
                } else {
                    bad.push(diff);
                }
            }
        });

        // create report
        let writer: Writer = new HtmlWriter();
        writer.addTitle(1, "Testing Report");

        writer.addParagraph(`Root Directory: ${this.rootDir}`, "", "");
        writer.addParagraph(`Date: ${Utils.getNowLiteral()}`, "", "");

        writer.addTitle(2, `Invalid ${invalid.length}`);
        invalid.forEach((item) => {
            writer.addParagraph(item.srcFile, item.reportFile, "gray");
        });
        
        writer.addTitle(2, `Bad ${bad.length}`);
        bad.forEach((item) => {
            writer.addParagraph(item.srcFile, item.reportFile, "red");
        });
        
        writer.addTitle(2, `Good ${good.length}`);
        good.forEach((item) => {
            writer.addParagraph(item.srcFile, item.reportFile, "green");
        });
        
        writer.write(Utils.getSummaryReportFilename(this.rootDir, "html"));
    }

    public run() {
        const allFiles = Utils.getNativeJsFiles(this.rootDir);
        let result: Diff[] = [];
        allFiles.forEach((filename) => {
            let test: TestSingle = new TestSingle(filename);
            const diff = test.run();
            result.push(diff);
        });
        this.writeSummary(result);
    }
}
