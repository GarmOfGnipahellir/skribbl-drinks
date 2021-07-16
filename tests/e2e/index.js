const FIRST_WORD = "#overlay > div > div.wordContainer > div:nth-child(1)";

let invite, word, guessing, drawing;

describe("skribbl drinks tests", function () {
  before(async (browser) => {
    await browser
      .url(browser.launchUrl)
      .waitForElementVisible("body")
      .click("#cmpwelcomebtncustom > a")
      .click(
        "#cmpbox > div.cmpboxinner > div.cmpboxbtns.cmpboxbtnscustomchoices > a.cmpboxbtn.cmpboxbtnyes.cmpboxbtnyescustomchoices"
      )
      .click("#buttonLoginCreatePrivate")
      .waitForElementVisible("#invite");

    invite = (await browser.getValue("#invite")).value;

    await browser
      .openNewWindow()
      .switchWindow((await browser.windowHandles()).value[1])
      .url(invite)
      .click("#formLogin > button.btn.btn-success.btn-lg.btn-block")
      .switchWindow((await browser.windowHandles()).value[0])
      .waitForElementVisible("#player1")
      .click("#buttonLobbyPlay");
  });

  test("water mark is added", async (browser) =>
    await browser.assert.visible("#drinksWaterMark"));

  test("intial player drinks", async (browser) => {
    await browser.assert.playerDrinksEquals(0, 0);
    await browser.assert.playerDrinksEquals(1, 0);
  });

  test("make wrong guess", async (browser) => {
    await browser
      .waitForElementVisible("#overlay > div > div.text")
      .pause(3000);

    let overlayText = (await browser.getText("#overlay > div > div.text"))
      .value;
    if (overlayText != "Choose a word") {
      await browser.switchWindow((await browser.windowHandles()).value[1]);
      drawing = 1;
      guessing = 0;
    } else {
      drawing = 0;
      guessing = 1;
    }

    word = (await browser.getText(FIRST_WORD)).value;

    await browser
      .waitForElementVisible(FIRST_WORD)
      .click(FIRST_WORD)
      .switchWindow((await browser.windowHandles()).value[guessing])
      .sendChatMessage("not " + word);

    await browser.assert.playerDrinksEquals(guessing, 1);
  });

  test("make right guess", async (browser) => {
    await browser
      .pause(1000)
      .switchWindow((await browser.windowHandles()).value[guessing])
      .sendChatMessage(word);

    const player0Name = (await browser.getPlayerName(0)).value;
    const player1Name = (await browser.getPlayerName(1)).value;
    const player0Drinks = (await browser.getPlayerDrinks(0)).value;
    const player1Drinks = (await browser.getPlayerDrinks(1)).value;

    await browser.assert.containsText(
      "#boxMessages > p:nth-last-child(2)",
      `${player0Name} drinks ${player0Drinks}!`
    );
    await browser.assert.containsText(
      "#boxMessages > p:nth-last-child(1)",
      `${player1Name} drinks ${player1Drinks}!`
    );
  });

  test("new turn", async (browser) => {
    drawing = drawing == 0 ? 1 : 0;
    guessing = guessing == 0 ? 1 : 0;

    await browser
      .pause(3000)
      .switchWindow((await browser.windowHandles()).value[drawing])
      .waitForElementVisible(FIRST_WORD);

    word = (await browser.getText(FIRST_WORD)).value;

    await browser.click(FIRST_WORD);

    await browser.assert.playerDrinksEquals(0, 0);
    await browser.assert.playerDrinksEquals(1, 0);
  });

  test("player join / leave", async (browser) => {
    await browser
      .openNewWindow()
      .switchWindow((await browser.windowHandles()).value[2])
      .url(invite)
      .click("#formLogin > button.btn.btn-success.btn-lg.btn-block");

    await browser.assert.playerDrinksEquals(2, 0);
    await browser.switchWindow((await browser.windowHandles()).value[0]);
    await browser.assert.playerDrinksEquals(2, 0);
    await browser.switchWindow((await browser.windowHandles()).value[1]);
    await browser.assert.playerDrinksEquals(2, 0);
    await browser.switchWindow((await browser.windowHandles()).value[2]);

    await browser.sendChatMessage("not " + word);

    await browser.assert.playerDrinksEquals(2, 1);
    await browser.switchWindow((await browser.windowHandles()).value[0]);
    await browser.assert.playerDrinksEquals(2, 1);
    await browser.switchWindow((await browser.windowHandles()).value[1]);
    await browser.assert.playerDrinksEquals(2, 1);
    await browser.switchWindow((await browser.windowHandles()).value[2]);

    await browser
      .pause(1000)
      .sendChatMessage(word)
      .pause(1000)
      .switchWindow((await browser.windowHandles()).value[guessing])
      .sendChatMessage(word);

    const player0Name = (await browser.getPlayerName(0)).value;
    const player1Name = (await browser.getPlayerName(1)).value;
    const player2Name = (await browser.getPlayerName(2)).value;
    const player0Drinks = (await browser.getPlayerDrinks(0)).value;
    const player1Drinks = (await browser.getPlayerDrinks(1)).value;
    const player2Drinks = (await browser.getPlayerDrinks(2)).value;

    await browser.assert.containsText(
      "#boxMessages > p:nth-last-child(3)",
      `${player0Name} drinks ${player0Drinks}!`
    );
    await browser.assert.containsText(
      "#boxMessages > p:nth-last-child(2)",
      `${player1Name} drinks ${player1Drinks}!`
    );
    await browser.assert.containsText(
      "#boxMessages > p:nth-last-child(1)",
      `${player2Name} drinks ${player2Drinks}!`
    );

    await browser
      .switchWindow((await browser.windowHandles()).value[2])
      .url(browser.launchUrl)
      .pause(1000)
      .url(invite)
      .click("#formLogin > button.btn.btn-success.btn-lg.btn-block");

    await browser.assert.playerDrinksEquals(3, 0);
    await browser.switchWindow((await browser.windowHandles()).value[0]);
    await browser.assert.playerDrinksEquals(3, 0);
    await browser.switchWindow((await browser.windowHandles()).value[1]);
    await browser.assert.playerDrinksEquals(3, 0);
    await browser.switchWindow((await browser.windowHandles()).value[2]);
  });

  after((browser) => browser.pause(1_000_000));
});
