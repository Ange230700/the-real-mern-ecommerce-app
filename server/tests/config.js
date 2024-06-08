require("dotenv").config();

const request = require("supertest");
const jwt = require("jsonwebtoken");

const stripe = require("../app/stripeConfig");
const app = require("../app/config");
const database = require("../database/client");
const tables = require("../database/tables");

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

jest.mock("stripe", () => () => ({
  paymentIntents: {
    create: jest.fn(),
  },
}));

afterEach(() => {
  jest.restoreAllMocks();
});

afterAll((done) => {
  database.end().then(done);
});

module.exports = { app, database, request, tables, jwt, stripe };
