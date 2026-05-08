import { submitRequestAsync } from "./ApiServices";

class Student {
  static submitProposal(data) {
    return submitRequestAsync("proposal/submit", "POST", data);
  }

  static getProposals() {
    return submitRequestAsync("proposal", "GET");
  }
    static getProjectTypes() {
    return submitRequestAsync("project-types", "GET");
  }
      static submitIdea() {
    return submitRequestAsync("/proposal/submit", "GET");
  }
        static getStudents() {
    return submitRequestAsync("admin/student", "GET");
  }
}



export default Student;
