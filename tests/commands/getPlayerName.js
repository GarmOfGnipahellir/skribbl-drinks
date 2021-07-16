module.exports = class CustomCommand {
  async command(playerIndex, callback) {
    const text = (
      await this.api.getText(`#player${playerIndex} > div.info > div.name`)
    ).value;
    const result = {
      status: 0,
      value: text.replace(" (You)", ""),
    };
    if (!!callback) {
      callback(result);
    }
    return result;
  }
};
