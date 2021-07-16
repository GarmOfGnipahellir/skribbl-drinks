exports.assertion = function (playerIndex, expected, msg) {
  // If the custom commands operates with DOM elements, this options should be set
  this.options = {
    elementSelector: true,
  };

  /**
   * Returns the message format which will be used to output the message in the console and also
   *  the arguments which will be used for replace the place holders, used in the order of appearance
   *
   * The message format also takes into account whether the .not negate has been used
   *
   * @return {{args: [], message: string}}
   */
  this.formatMessage = function () {
    const message = `Testing if player${playerIndex}'s drinks ${
      this.negate ? "doesn't equal %s" : "equals %s"
    }`;

    return {
      message,
      args: [`'${expected}'`],
    };
  };

  /**
   * Returns the expected value of the assertion which is displayed in the case of a failure
   *
   * @return {string}
   */
  this.expected = function () {
    return this.negate ? `drinks to not equal '${expected}'` : `drinks to equal '${expected}'`;
  };

  /**
   * Given the value, the condition used to evaluate if the assertion is passed
   * @param {*} value
   * @return {Boolean}
   */
  this.evaluate = function (value) {
    return value == expected;
  };

  /**
   * Called with the result object of the command to retrieve the value which is to be evaluated
   *
   * @param {Object} result
   * @return {*}
   */
  this.value = function (result) {
    return result.value;
  };

  /**
   * When defined, this method is called by the assertion runner with the command result, to determine if the
   *  value can be retrieved successfully from the result object
   *
   * @param result
   * @return {boolean|*}
   */
  this.failure = function (result) {
    return result === false || (result && result.status === -1);
  };

  /**
   * When defined, this method is called by the assertion runner with the command result to determine the actual
   *  state of the assertion in the event of a failure
   *
   * @param {Boolean} passed
   * @return {string}
   */
  this.actual = function (passed) {
    return passed ? `drinks to equal '${expected}'` : `drinks does not equal '${expected}'`;
  };

  /**
   * The command which is to be executed by the assertion runner; Nightwatch api is available as this.api
   * @param {function} callback
   */
  this.command = function (callback) {
    this.api.getPlayerDrinks(playerIndex, callback);
  };
};
