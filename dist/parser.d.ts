export declare enum MessageType {
    TURN_END = 0,
    TURN_START = 1,
    PLAYER_JOIN = 2,
    PLAYER_LEAVE = 3,
    PLAYER_GUESS = 4,
    UNKNOWN = 5
}
export interface ParsedMessage {
    type: MessageType;
    player: string;
}
export declare function parseMessage(content: string): ParsedMessage;
