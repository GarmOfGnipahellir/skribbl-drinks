export enum MessageType {
  UNKNOWN,
  GUESS,
  CORRECT_GUESS,
  TURN_ENDED,
  TURN_STARTED,
}

export interface ParsedMessage {
  type: MessageType;
  player: string;
}

export function parseMessage(content: string): ParsedMessage {
  let matches: RegExpExecArray;

  matches = /The word was '.+'/g.exec(content);
  if (!!matches) {
    return { type: MessageType.TURN_ENDED, player: "unknown" };
  }

  matches = /(.+?) is drawing now!/g.exec(content);
  if (!!matches) {
    return { type: MessageType.TURN_STARTED, player: matches[1] };
  }

  matches = /^(.+?): .*/g.exec(content);
  if (!!matches) {
    return { type: MessageType.GUESS, player: matches[1] };
  }

  return { type: MessageType.UNKNOWN, player: "unknown" };
}
