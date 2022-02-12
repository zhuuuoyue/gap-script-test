import fs from "fs";

import { Runnable, Utils } from "../shared";

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
        let generatedFiles: string[] = Utils.getGeneratedJsFiles(this.rootDir);
        this.deleteFiles(generatedFiles);

        let reportFiles: string[] = Utils.getReportFiles(this.rootDir);
        this.deleteFiles(reportFiles);
    }
    
}