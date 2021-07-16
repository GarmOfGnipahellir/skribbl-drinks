import {
  createSlice,
  configureStore,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";

export interface PlayerState {
  id: number;
  name: string;
  drinks: number;
}

export enum TurnState {
  PRE_TURN,
  TAKING_TURN,
}

export interface GameState {
  turnState: TurnState;
  players: PlayerState[];
}

const initialState: GameState = {
  turnState: TurnState.PRE_TURN,
  players: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    playerAdded: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      state.players.push({
        id: action.payload.id,
        name: action.payload.name,
        drinks: 0,
      });
    },
    playerGuessed: (state, action: PayloadAction<string>) => {
      for (let i = 0; i < state.players.length; i++) {
        if (state.players[i].name == action.payload) {
          state.players[i].drinks += 1;
        }
      }
    },
    turnStarted: (state) => {
      state.turnState = TurnState.TAKING_TURN;
      for (const player of state.players) {
        player.drinks = 0;
      }
    },
    turnEnded: (state) => {
      state.turnState = TurnState.PRE_TURN;
    },
  },
});

export const { playerAdded, playerGuessed, turnStarted, turnEnded } =
  gameSlice.actions;

export const store = configureStore({
  reducer: gameSlice.reducer,
});
