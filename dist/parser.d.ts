export declare enum MessageType {
    UNKNOWN = 0,
    GUESS = 1,
    CORRECT_GUESS = 2,
    TURN_ENDED = 3,
    TURN_STARTED = 4
}
export interface ParsedMessage {
    type: MessageType;
    player: string;
}
export declare function parseMessage(content: string): ParsedMessage;
