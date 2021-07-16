export function getCurrentPlayers(): number[] {
  const containerGamePlayers = document.getElementById("containerGamePlayers");
  const result: number[] = [];
  for (const playerDiv of containerGamePlayers.children) {
    result.push(parseInt(playerDiv.id.replace("player", "")));
  }
  return result;
}

export function getPlayerDiv(id: number): HTMLDivElement {
  const containerGamePlayers = document.getElementById("containerGamePlayers");
  for (const playerDiv of containerGamePlayers.children) {
    if (parseInt(playerDiv.id.replace("player", "")) == id) {
      return playerDiv as HTMLDivElement;
    }
  }
}

export function getPlayerInfoDiv(id: number): HTMLDivElement {
  return getPlayerDiv(id).children[1] as HTMLDivElement;
}

export function getPlayerDrinksDiv(id: number): HTMLDivElement {
  return getPlayerInfoDiv(id).children[2] as HTMLDivElement;
}

export function getPlayerNameDiv(id: number): HTMLDivElement {
  return getPlayerInfoDiv(id).children[0] as HTMLDivElement;
}

export function addChatMessage(
  message: string,
  color: string = "rgb(0, 0, 0)"
): void {
  const messageSpan = document.createElement("span");
  messageSpan.textContent = message;
  const messageParagraph = document.createElement("p");
  messageParagraph.style.color = color;
  messageParagraph.style.fontWeight = "bold";
  messageParagraph.appendChild(messageSpan);
  const boxMessages = document.getElementById("boxMessages");
  boxMessages.appendChild(messageParagraph);
}

export function addWaterMark(): void {
  const waterMarkNode = document.createElement("div");
  waterMarkNode.id = "drinksWaterMark";
  waterMarkNode.style.position = "fixed";
  waterMarkNode.style.top = "9px";
  waterMarkNode.style.right = "9px";
  waterMarkNode.style.fontSize = "48px";
  waterMarkNode.style.color = "#ffffff";
  waterMarkNode.textContent = "Drinks 🍺";
  document.body.appendChild(waterMarkNode);
}
