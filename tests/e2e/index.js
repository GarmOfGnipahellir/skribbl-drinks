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
      .click("#buttonLobbyPlay")
  });

  test("make wrong guess", (browser) => {
    browser
      .waitForElementVisible("#overlay > div > div.wordContainer > div:nth-child(1)");
  });

  after((browser) => browser.pause(1000000));
});
