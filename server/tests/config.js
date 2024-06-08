require("dotenv").config();

const request = require("supertest");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = require("../app/config");
const database = require("../database/client");
const tables = require("../database/tables");

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

afterEach(() => {
  jest.restoreAllMocks();
});

afterAll((done) => {
  database.end().then(done);
});

module.exports = { app, database, request, tables, jwt, stripe };
