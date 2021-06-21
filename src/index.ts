import { addWaterMark } from "./utils";
import { parseMessage, MessageType } from "./parser";

const screenGame = document.getElementById("screenGame");
const boxMessages = document.getElementById("boxMessages");

function onGameStarted(): void {
  console.log("Game started!");
}

function onMessageAdded(content: string): void {
  console.log(`Message added: ${content}`);

  const parsed = parseMessage(content);
  console.log(`Message parsed: ${parsed}`);

  switch (parsed.type) {
    case MessageType.GUESS:
      console.log(`${parsed.player} made a guess!`)
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
