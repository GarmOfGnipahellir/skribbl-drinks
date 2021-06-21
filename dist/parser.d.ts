export declare enum MessageType {
    UNKNOWN = 0,
    GUESS = 1
}
export interface ParsedMessage {
    type: MessageType;
    player: string;
}
export declare function parseMessage(content: string): ParsedMessage;
