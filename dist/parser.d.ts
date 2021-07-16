export declare enum MessageType {
    TURN_END = 0,
    TURN_START = 1,
    PLAYER_JOIN = 2,
    PLAYER_GUESS = 3,
    UNKNOWN = 4
}
export interface ParsedMessage {
    type: MessageType;
    player: string;
}
export declare function parseMessage(content: string): ParsedMessage;
