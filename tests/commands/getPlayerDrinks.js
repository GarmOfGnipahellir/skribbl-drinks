module.exports = class CustomCommand {
  async command(playerIndex, callback) {
    const text = (
      await this.api.getText(`#player${playerIndex} > div.info > div.drinks`)
    ).value;
    const result = {
      status: 0,
      value: parseInt(text.replace(" 🍺", "")),
    };
    if (!!callback) {
      callback(result);
    }
    return result;
  }
};
