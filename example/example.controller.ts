import { Request, Response } from "express";
import { Service } from "typedi";
import ExampleService from "./example.service";

@Service()
class ExampleController {
  constructor(private exampleService: ExampleService) {}

  sayHello(req: Request, res: Response) {
    const result = this.exampleService.sayHello();
    return res.json(result);
  }
}

export default ExampleController;
