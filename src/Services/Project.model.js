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

  static getAcademicYears() {
    return submitRequestAsync("academic-years", "GET");
  }

  static getFormData() {
    return submitRequestAsync("/proposal/form-data", "GET");
  }

  static getProjectTypes() {
    return submitRequestAsync("/project-types", "GET");
  }

  static getSuggestedProjects() {
    return submitRequestAsync("/library/suggested", "GET");
  }

  static getPreviousProjects() {
    return submitRequestAsync("library/previous", "GET");
  }

  static getProjectDetails(id) {
    return submitRequestAsync(`/library/previous/${id}`, "GET");
  }
    static getMytimeline() {
    return submitRequestAsync(`my-timeline`, "GET");
  }
}

export default Project;