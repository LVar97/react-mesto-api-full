class IncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    // this.statusCode = 302;
  }
}

module.exports = IncorrectDataError;
