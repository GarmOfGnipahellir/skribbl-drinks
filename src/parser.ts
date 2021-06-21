export enum MessageType {
  UNKNOWN,
  GUESS,
}

export interface ParsedMessage {
  type: MessageType;
  player: string;
}

export function parseMessage(content: string): ParsedMessage {
  let matches: RegExpExecArray;

  matches = /^(.+?): .*/g.exec(content);
  if (!!matches) {
    return { type: MessageType.GUESS, player: matches[1] };
  }

  return { type: MessageType.UNKNOWN, player: "unknown" };
}
