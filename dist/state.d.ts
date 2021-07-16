export interface PlayerState {
    id: number;
    name: string;
    drinks: number;
}
export interface GameState {
    players: PlayerState[];
}
export declare const playerAdded: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
    id: number;
    name: string;
}, string>, playerGuessed: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, string>, turnEnded: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>, turnStarted: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
export declare const store: import("@reduxjs/toolkit").EnhancedStore<GameState, import("redux").AnyAction, [import("redux-thunk").ThunkMiddleware<GameState, import("redux").AnyAction, null> | import("redux-thunk").ThunkMiddleware<GameState, import("redux").AnyAction, undefined>]>;
