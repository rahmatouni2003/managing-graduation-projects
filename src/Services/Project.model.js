import { submitRequestAsync } from "./ApiServices";

class Project {
  static submitTask(data) {
    return submitRequestAsync("submission/upload", "POST", data);
  }
  static reportProblem(data) {
    return submitRequestAsync("reports", "POST", data);
  }
    static getDepartments() {
    return submitRequestAsync("departments", "GET");
  }
      static getFormData() {
    return submitRequestAsync("/proposal/form-data", "GET");
  }
}



export default Project;
