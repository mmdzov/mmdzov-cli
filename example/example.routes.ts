import "reflect-metadata";
import express from "express";
import { Container } from "typedi";
import ExampleController from "./example.controller";

const exampleRoute = express.Router();

const controller = Container.get(ExampleController);

exampleRoute.get("/example", (req, res) => controller.sayHello(req, res));

export default exampleRoute;
