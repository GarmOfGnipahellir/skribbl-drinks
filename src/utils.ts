export function addWaterMark(): void {
  const waterMarkNode = document.createElement("div");
  waterMarkNode.style.position = "fixed";
  waterMarkNode.style.top = "9px";
  waterMarkNode.style.right = "9px";
  waterMarkNode.style.fontSize = "48px";
  waterMarkNode.style.color = "#ffffff";
  waterMarkNode.textContent = "Drinks 🍺";
  document.body.appendChild(waterMarkNode);
}
