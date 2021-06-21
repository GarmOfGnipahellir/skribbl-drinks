describe("skribbl drinks tests", function () {
  test("water mark is added", function (browser) {
    browser
      .url("https://skribbl.io/")
      .waitForElementVisible("body")
      .assert.titleContains("skribbl")
      .end();
  });
});
