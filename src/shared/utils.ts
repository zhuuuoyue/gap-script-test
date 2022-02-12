import fs from "fs";
import path from "path";
import moment from "moment";

import {
    GENERATED_FILENAME_SUFFIX,
    REPORT_FILENAME_SUFFIX,
    SCRIPT_EXTENSION,
    HTML_EXTENSION,
    REPORT_FILENAME_HTML,
    FileFormat,
    REPORT_FILENAME_MD,
    MARKDOWN_EXTENSION,
} from ".";

function isGeneratedFile(filename: string): boolean {
    return filename.endsWith(`${GENERATED_FILENAME_SUFFIX}${SCRIPT_EXTENSION}`);
}

function isReportFile(filename: string): boolean {
    return filename.endsWith(`${REPORT_FILENAME_SUFFIX}${HTML_EXTENSION}`);
}

function searchFiles(dir: string, ext: string, result: string[]): void {
    const temp = fs.readdirSync(dir);
    temp.map((item) => {
        const fullPath = path.join(dir, item);
        const stat: fs.Stats = fs.statSync(fullPath);
        if (stat.isFile()) {
            if (fullPath.endsWith(ext)) {
                result.push(fullPath);
            }
        } else if (stat.isDirectory()) {
            searchFiles(fullPath, ext, result);
        }
    });
}

export function getNativeJsFiles(dir: string): string[] {
    let allFiles: string[] = [];
    searchFiles(dir, SCRIPT_EXTENSION, allFiles);
    let nativeJsFiles: string[] = [];
    allFiles.forEach((item) => {
        if (!isGeneratedFile(item)) {
            nativeJsFiles.push(item);
        }
    });
    return nativeJsFiles;
}

export function getGeneratedJsFiles(dir: string): string[] {
    let allFiles: string[] = [];
    searchFiles(dir, SCRIPT_EXTENSION, allFiles);
    let generatedJsFiles: string[] = [];
    allFiles.forEach((item) => {
        if (isGeneratedFile(item)) {
            generatedJsFiles.push(item);
        }
    });
    return generatedJsFiles;
}

export function getReportFiles(dir: string, fmt: FileFormat = "html"): string[] {
    let allFiles: string[] = [];
    let ext: string = HTML_EXTENSION;
    if ("md" === fmt) {
        ext = MARKDOWN_EXTENSION;
    }
    searchFiles(dir, ext, allFiles);
    let reportFiles: string[] = [];
    allFiles.forEach((item) => {
        if (isReportFile(item)) {
            reportFiles.push(item);
        }
    });
    let reportFile: string = REPORT_FILENAME_HTML;
    if ("md" === fmt) {
        reportFile = REPORT_FILENAME_MD;
    }
    reportFiles.push(path.join(dir, reportFile));
    return reportFiles;
}

function createNewFilename(srcFilename: string, suffix: string, newExt: string = ""): string {
    let oldExt = path.extname(srcFilename);
    let ext: string = newExt;
    if (ext.length === 0) {
        ext = oldExt;
    }
    return `${srcFilename.substring(0, srcFilename.length - oldExt.length)}${suffix}${ext}`;
}

export function getReportFilename(srcFilename: string, ext: string = HTML_EXTENSION): string {
    return createNewFilename(srcFilename, REPORT_FILENAME_SUFFIX, ext);
}

export function getOutFilename(srcFilename: string): string {
    return createNewFilename(srcFilename, GENERATED_FILENAME_SUFFIX);
}

export function getSummaryReportFilename(rootDir: string, fmt: FileFormat = "html"): string {
    let ext: string = REPORT_FILENAME_HTML;
    if (fmt === "md") {
        ext = REPORT_FILENAME_MD;
    }
    return path.join(rootDir, ext);
}

export function getNowLiteral(): string {
    let now = moment();
    return now.format();
}
