module.exports = class CustomCommand {
  async command(message) {
    await this.api.setValue("#inputChat", message).submitForm("#formChat");
  }
};
