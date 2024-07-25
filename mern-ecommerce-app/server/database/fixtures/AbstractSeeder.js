// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");

// Import database client
const database = require("../client");

// Declare an object to store created objects from their names
const refs = {};

// Provide faker access through AbstractSeed class
class AbstractSeeder {
  constructor({ table, truncate = true, dependencies = [] }) {
    // thx https://www.codeheroes.fr/2017/11/08/js-classes-abstraites-et-interfaces/
    if (this.constructor === AbstractSeeder) {
      throw new TypeError(
        "Abstract class 'AbstractSeed' cannot be instantiated directly"
      );
    }

    // Store the table name
    this.table = table;

    // Store the truncate option
    this.truncate = truncate;

    // Store the dependencies
    this.dependencies = dependencies;

    // Store the promises
    this.promises = [];

    // Store the faker library
    this.faker = faker;

    // Store the refs object
    this.refs = refs;
  }

  async #doInsert(data) {
    // Extract ref name (if it exists)
    const { refName, ...values } = data;

    // Prepare the SQL statement: "insert into <table>(<fields>) values (<placeholders>)"
    const fields = Object.keys(values).join(",");
    const placeholders = new Array(Object.keys(values).length)
      .fill("?")
      .join(",");

    const sql = `INSERT INTO ${this.table}(${fields}) VALUES (${placeholders})`;

    // Perform the query and if applicable store the insert id given the ref name
    const [result] = await database.query(sql, Object.values(values));

    if (refName != null) {
      const { insertId } = result;

      refs[refName] = { ...values, insertId };
    }
  }

  insert(data) {
    this.promises.push(this.#doInsert(data));
  }

  // Method to count the number of rows in a table
  async count() {
    const sql = `SELECT COUNT(*) AS count FROM ${this.table}`;
    const [rows] = await database.query(sql);
    return rows[0].count;
  }

  // eslint-disable-next-line class-methods-use-this
  run() {
    throw new Error("You must implement this function");
  }

  // eslint-disable-next-line class-methods-use-this
  getRef(name) {
    return refs[name];
  }
}

// Ready to export
module.exports = AbstractSeeder;
