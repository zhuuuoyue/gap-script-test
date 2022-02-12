export type LineContent = string | undefined;
export interface DiffInfo {
    lineIndex: number;
    srcLine: LineContent;
    dstLine: LineContent;
}

export class Diff {
    public srcFile: string;
    public reportFile: string;
    public outFile: string;
    public srcLines: number;
    public outLines: number;
    public diffLines: DiffInfo[];
    public isValid: boolean;

    constructor(srcFile: string, reportFile: string, outFile: string) {
        this.srcFile = srcFile;
        this.reportFile = reportFile;
        this.outFile = outFile;
        this.srcLines = 0;
        this.outLines = 0;
        this.diffLines = [];
        this.isValid = false;
    }

}