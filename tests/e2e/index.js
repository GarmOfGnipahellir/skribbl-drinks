describe("skribbl drinks tests", function () {
  before((browser) =>
    browser
      .url(browser.launchUrl)
      .waitForElementVisible("body")
      .click("#cmpwelcomebtncustom > a")
      .click(
        "#cmpbox > div.cmpboxinner > div.cmpboxbtns.cmpboxbtnscustomchoices > a.cmpboxbtn.cmpboxbtnyes.cmpboxbtnyescustomchoices"
      )
  );

  test("water mark is added", (browser) =>
    browser.assert.visible("#drinksWaterMark"));

  test("start new game", (browser) => {
    browser.openNewWindow();

    browser
      .windowHandles((result) => {
        var handle = result.value[0];
        browser.switchWindow(handle);
      })
      .url(browser.launchUrl)
      .pause(1000);

    browser
      .windowHandles((result) => {
        var handle = result.value[1];
        browser.switchWindow(handle);
      })
      .url(browser.launchUrl)
      .pause(1000);
  });

  after((browser) => browser.end());
});
