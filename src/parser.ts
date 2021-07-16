export enum MessageType {
  TURN_END,
  TURN_START,
  PLAYER_JOIN,
  PLAYER_GUESS,
  UNKNOWN,
}

export interface ParsedMessage {
  type: MessageType;
  player: string;
}

export function parseMessage(content: string): ParsedMessage {
  let matches: RegExpExecArray;

  matches = /(.+?) is drawing now!/g.exec(content);
  if (!!matches) {
    return { type: MessageType.TURN_START, player: matches[1] };
  }

  matches = /The word was '.+'/g.exec(content);
  if (!!matches) {
    return { type: MessageType.TURN_END, player: "unknown" };
  }

  matches = /(.+?) joined./g.exec(content);
  if (!!matches) {
    return { type: MessageType.PLAYER_JOIN, player: matches[1] };
  }

  matches = /^(.+?): .*/g.exec(content);
  if (!!matches) {
    return { type: MessageType.PLAYER_GUESS, player: matches[1] };
  }

  return { type: MessageType.UNKNOWN, player: "unknown" };
}
