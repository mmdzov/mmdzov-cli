import { describe, it } from "mocha";
import { expect } from "chai";
import ExampleService from "./example.service";
import request from "supertest";
import app from "../../app";

describe("service tests", () => {
  it("should to be string and must have hello world", () => {
    const exampleService = new ExampleService();

    const result = exampleService.sayHello();
    expect(result).to.be.a("string").to.have.contain("Hello world");
  });
});

describe("test API'S", () => {
  it("test GET /example", () => {
    request(app)
      .get("/example")
      .expect("Content-Type", /json/)
      .expect("Content-Length", "13")
      .end((err) => {
        if (err) throw new Error(err);
      });
  });
});
