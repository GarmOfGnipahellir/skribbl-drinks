let word, guessing, drawing;

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
      .waitForElementVisible("#invite")
      .getValue("#invite", (result) => {
        browser
          .openNewWindow()
          .windowHandles((result) => browser.switchWindow(result.value[1]))
          .url(result.value)
          .click("#formLogin > button.btn.btn-success.btn-lg.btn-block");
      })
      .windowHandles((result) => browser.switchWindow(result.value[0]))
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
      .pause(3000)
      .getText("#overlay > div > div.text", (result) => {
        if (result.value != "Choose a word") {
          browser.windowHandles((result) =>
            browser.switchWindow(result.value[1])
          );
          drawing = 1;
          guessing = 0;
        } else {
          drawing = 0;
          guessing = 1;
        }
      })
      .getText(
        "#overlay > div > div.wordContainer > div:nth-child(1)",
        (result) => {
          word = result.value;
          browser
            .click("#overlay > div > div.wordContainer > div:nth-child(1)")
            .windowHandles((result) =>
              browser.switchWindow(result.value[guessing])
            )
            .sendChatMessage("not " + word);

          browser.assert.playerDrinksEquals(guessing, 1);
        }
      );
  });

  test("make right guess", async (browser) => {
    await browser
      .windowHandles((result) => browser.switchWindow(result.value[guessing]))
      .sendChatMessage(word);

    const player0Name = (await browser.getPlayerName(0)).value;
    const player1Name = (await browser.getPlayerName(1)).value;
    const player0Drinks = (await browser.getPlayerDrinks(0)).value;
    const player1Drinks = (await browser.getPlayerDrinks(1)).value;

    await browser.assert.containsText(
      "#boxMessages > p:nth-child(6)",
      `${player0Name} drinks ${player0Drinks}!`
    );
    await browser.assert.containsText(
      "#boxMessages > p:nth-child(7)",
      `${player1Name} drinks ${player1Drinks}!`
    );
  });

  after((browser) => browser.pause(1_000_000));
});
