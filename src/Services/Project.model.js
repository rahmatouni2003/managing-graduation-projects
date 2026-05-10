import { submitRequestAsync } from "./ApiServices";

class Project {
  static submitTask(data) {
    return submitRequestAsync("submission/upload", "POST", data);
  }
  static reportProblem(data) {
    return submitRequestAsync("reports", "POST", data);
  }
}



export default Project;
