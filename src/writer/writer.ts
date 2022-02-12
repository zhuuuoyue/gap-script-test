export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface Writer {
    addTitle(level: Level, title: string): void;
    addParagraph(content: string, url: string, color: string): void;
    clear(): void;
    write(filename: string): void;
}
