import { Service } from "typedi";

@Service()
class ExampleService {
  sayHello() {
    return "Hello world";
  }
}

export default ExampleService;
