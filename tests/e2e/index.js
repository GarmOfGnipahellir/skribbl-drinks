describe("skribbl drinks tests", function () {
  before((browser) => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible("body")
      .click("#cmpwelcomebtncustom > a")
      .click(
        "#cmpbox > div.cmpboxinner > div.cmpboxbtns.cmpboxbtnscustomchoices > a.cmpboxbtn.cmpboxbtnyes.cmpboxbtnyescustomchoices"
      );
  });

  test("water mark is added", (browser) =>
    browser.assert.visible("#drinksWaterMark"));

  test("start new game", (browser) => {
    browser
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

  test("make wrong guess", (browser) => {
    browser
      .waitForElementVisible("#overlay > div > div.text")
      .getValue("#overlay > div > div.text", (result) => {
        // FIXME: this will alweys be "Round 1" the first time
        if (result.value != "Choose a word") {
          browser.windowHandles((result) =>
            browser.switchWindow(result.value[1])
          );
        }
      });
  });

  after((browser) => browser.pause(1_000_000));
});
