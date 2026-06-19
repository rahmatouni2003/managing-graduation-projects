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
      static getMyMilestones(id) {
    return submitRequestAsync(`my-timeline/milestones/${id}`, "GET");
  }
        static getMyGuestMilestones() {
    return submitRequestAsync(`milestones`, "GET");
  }
   static deleteSuggestedProjects(id){
    return submitRequestAsync(`/admin/suggested_project/${id}/delete`, "DELETE");
   }  
    static updateSuggestedProjects(id,data){
    return submitRequestAsync(`/admin/suggested_project/${id}/update`, "PUT" ,data);
   }
     static addPreviousFavorite(id){
       return submitRequestAsync(`/library/previous/${id}/favorite` , "POST")
     }
          static addSuggestedFavorite(id){
       return submitRequestAsync(`/library/suggested/${id}/favorite` , "POST")
     }
       static getSuggestedProjectDetails(id) {
    return submitRequestAsync(`/library/suggested/${id}`, "GET");
  }
         static getLibraryFavorites() {
    return submitRequestAsync(`library/favorites`, "GET");
  }
}

export default Project;