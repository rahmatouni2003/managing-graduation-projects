import { submitRequestAsync } from "./ApiServices";

class Project {
    static uploadIdea(data) {
    return submitRequestAsync("proposal/submit", "POST", data);
  }
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
        static getProjectTypes() {
    return submitRequestAsync("/project-types", "GET");
  }
}



export default Project;
