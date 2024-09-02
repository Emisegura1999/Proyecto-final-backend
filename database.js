const moongose = require("mongoose");
const configObject = require("./src/config/env.config.js");
const { logger } = require("./src/middleware/loggerMiddleware.js");

class DataBase {
  static #instance;
  constructor() {
    moongose.connect(configObject.server.mongo_url);
  }
  static getInstance() {
    try {
      if (this.#instance) return this.#instance;
      this.#instance = new DataBase();
      logger.info("mongoDB connected succesfully");
    } catch (error) {
      logger.error(error);
    }
  }
}

module.exports = DataBase.getInstance();
