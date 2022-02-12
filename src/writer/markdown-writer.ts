import { Level, Writer } from "./writer";

export class MarkdownWriter implements Writer {

    addTitle(level: Level, title: string): void {
        throw new Error("Method not implemented.");
    }
    
    addParagraph(content: string, url: string, color: string): void {
        throw new Error("Method not implemented.");
    }
    
    clear(): void {
        throw new Error("Method not implemented.");
    }
    
    write(filename: string): void {
        throw new Error("Method not implemented.");
    }
    
}
