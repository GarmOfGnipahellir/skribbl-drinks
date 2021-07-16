import {
  addWaterMark,
  getCurrentPlayers,
  getPlayerNameDiv,
  getPlayerInfoDiv,
  getPlayerDrinksDiv,
} from "./utils";
import { parseMessage, MessageType } from "./parser";
import {
  store,
  playerAdded,
  playerGuessed,
  turnEnded,
  turnStarted,
} from "./state";

const screenGame = document.getElementById("screenGame");
const boxMessages = document.getElementById("boxMessages");

function onGameStarted(): void {
  console.log("Game started!");

  for (const id of getCurrentPlayers()) {
    const nameDiv = getPlayerNameDiv(id);
    let name = nameDiv.textContent;
    console.log(nameDiv.style.color);
    if (nameDiv.style.color == "rgb(0, 0, 255)") {
      name = name.slice(0, -6);
    }
    store.dispatch(playerAdded({ id, name }));
  }
}

function onMessageAdded(content: string): void {
  console.log(`Message added: ${content}`);

  const parsed = parseMessage(content);
  console.log(`Message parsed: ${parsed}`);

  switch (parsed.type) {
    case MessageType.GUESS:
      console.log(`${parsed.player} made a guess!`);
      store.dispatch(playerGuessed(parsed.player));
      break;
    case MessageType.TURN_ENDED:
      console.log("Turn ended!");
      store.dispatch(turnEnded());
      break;
    case MessageType.TURN_STARTED:
      console.log("Turn started!");
      store.dispatch(turnStarted());
      break;
  }
}

// look for attribute changes on the screenGame element
new MutationObserver(() => {
  if (screenGame.style.display === "none") return;
  onGameStarted();
}).observe(screenGame, { attributes: true });

// look for child changes on the boxMessages element
new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      onMessageAdded(node.textContent);
    }
  }
}).observe(boxMessages, { childList: true });

// show user that drinks are enabled
addWaterMark();

store.subscribe(() => {
  const state = store.getState();

  for (const player of state.players) {
    let drinksDiv = getPlayerDrinksDiv(player.id);
    if (drinksDiv == undefined) {
      drinksDiv = document.createElement("div");
      drinksDiv.className = "drinks";
      getPlayerInfoDiv(player.id).appendChild(drinksDiv);
    }
    drinksDiv.textContent = `${player.drinks} 🍺`;
  }
});
