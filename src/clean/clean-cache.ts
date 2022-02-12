import fs from "fs";

import { Runnable, getGeneratedJsFiles, getReportFiles } from "../shared";

export class CleanCache implements Runnable {
    private rootDir: string;

    constructor(rootDir: string) {
        this.rootDir = rootDir;
    }

    private deleteFiles(files: string[]): void {
        files.forEach((item) => {
            fs.unlinkSync(item);
        });
    }

    run(): void {
        let generatedFiles: string[] = getGeneratedJsFiles(this.rootDir);
        this.deleteFiles(generatedFiles);

        let reportFiles: string[] = getReportFiles(this.rootDir);
        this.deleteFiles(reportFiles);

        console.log(generatedFiles.length, reportFiles.length);
    }
    
}