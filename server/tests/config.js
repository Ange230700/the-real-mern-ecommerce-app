require("dotenv").config();

const request = require("supertest");
const jwt = require("jsonwebtoken");

const CryptoJS = require("../app/config/cryptoConfig");
const stripe = require("../app/config/stripeConfig");

const app = require("../app/config");
const database = require("../database/client");
const tables = require("../database/tables");

afterEach(() => {
  jest.restoreAllMocks();
});

afterAll((done) => {
  database.end().then(done);
});

module.exports = { app, database, request, tables, jwt, stripe, CryptoJS };
