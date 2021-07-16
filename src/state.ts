import {
  createSlice,
  configureStore,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import { addChatMessage } from "./utils";

export interface PlayerState {
  id: number;
  name: string;
  drinks: number;
}

export interface GameState {
  players: PlayerState[];
}

const initialState: GameState = {
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
    turnEnded: (state) => {
      for (const player of state.players) {
        addChatMessage(
          `${player.name} drinks ${player.drinks}!`,
          "rgb(0, 0, 255)"
        );
      }
    },
    turnStarted: (state) => {
      for (const player of state.players) {
        player.drinks = 0;
      }
    },
  },
});

export const { playerAdded, playerGuessed, turnEnded, turnStarted } =
  gameSlice.actions;

export const store = configureStore({
  reducer: gameSlice.reducer,
});
