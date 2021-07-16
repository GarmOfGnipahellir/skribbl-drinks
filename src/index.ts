import {
  addWaterMark,
  getCurrentPlayers,
  getPlayerNameDiv,
  getPlayerInfoDiv,
  getPlayerDrinksDiv,
  addChatMessage,
} from "./utils";
import { parseMessage, MessageType } from "./parser";
import {
  TurnState,
  store,
  playerAdded,
  playerGuessed,
  turnStarted,
  turnEnded,
  playerRemoved,
} from "./store";
import log from "./logger";

const screenGame = document.getElementById("screenGame");
const boxMessages = document.getElementById("boxMessages");

function onGameStarted(): void {
  log.info("Game started!");

  for (const id of getCurrentPlayers()) {
    const nameDiv = getPlayerNameDiv(id);
    let name = nameDiv.textContent;
    if (nameDiv.style.color == "rgb(0, 0, 255)") {
      name = name.slice(0, -6);
    }
    store.dispatch(playerAdded({ id, name }));
  }
}

function onTurnStarted(): void {
  log.info("Turn started!");
}

function onTurnEnded(): void {
  log.info("Turn ended!");
  for (const player of store.getState().players) {
    addChatMessage(
      `${player.name} drinks ${player.drinks}!`
      // "rgb(235, 163, 0)"
    );
  }
}

function onMessageAdded(content: string): void {
  log.info(`Message added: ${content}`);

  const parsed = parseMessage(content);
  log.info(`Message parsed: ${parsed}`);

  switch (parsed.type) {
    case MessageType.PLAYER_GUESS:
      log.info(`${parsed.player} made a guess!`);
      store.dispatch(playerGuessed(parsed.player));
      break;
    case MessageType.PLAYER_JOIN:
      for (const id of getCurrentPlayers()) {
        const name = getPlayerNameDiv(id).textContent;
        if (name == parsed.player) {
          store.dispatch(playerAdded({ id, name }));
        }
      }
      break;
    case MessageType.PLAYER_LEAVE:
      store.dispatch(playerRemoved(parsed.player));
      break;
    case MessageType.TURN_END:
      store.dispatch(turnEnded());
      break;
    case MessageType.TURN_START:
      store.dispatch(turnStarted());
      break;
  }
}

// look for attribute changes on the screenGame element
new MutationObserver(() => {
  if (screenGame.style.display === "none") return;
  onGameStarted();

  // look for child changes on the boxMessages element
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        onMessageAdded(node.textContent);
      }
    }
  }).observe(boxMessages, { childList: true });
}).observe(screenGame, { attributes: true });

// show user that drinks are enabled
addWaterMark();

// update the UI when state changes
let prevState = store.getState();
store.subscribe(() => {
  const state = store.getState();

  log.debug("new state: " + state);

  if (state.turnState != prevState.turnState) {
    switch (state.turnState) {
      case TurnState.TAKING_TURN:
        onTurnStarted();
        break;
      case TurnState.PRE_TURN:
        onTurnEnded();
        break;
    }
  }

  for (const player of state.players) {
    let drinksDiv = getPlayerDrinksDiv(player.id);
    if (drinksDiv == undefined) {
      drinksDiv = document.createElement("div");
      drinksDiv.className = "drinks";
      getPlayerInfoDiv(player.id).appendChild(drinksDiv);
    }
    drinksDiv.textContent = `${player.drinks} 🍺`;
  }

  prevState = state;
});
