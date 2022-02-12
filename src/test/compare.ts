import { Diff, LineContent } from ".";

export function compareLines(raw: string[], generated: string[], diff: Diff): void {
    diff.srcLines = raw.length;
    diff.outLines = generated.length;

    let maxLines: number = diff.srcLines < diff.outLines ? diff.outLines : diff.srcLines;

    for (let i = 0; i < maxLines; ++i) {
        let first: LineContent = undefined;
        if (i < diff.srcLines) {
            first = raw[i];
        }
        let second: LineContent = undefined; 
        if (i < diff.outLines) {
            second = generated[i];
        }
        if (first !== second) {
            diff.diffLines.push({
                lineIndex: i,
                srcLine: first,
                dstLine: second
            });
        }
    }
}
