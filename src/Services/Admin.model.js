// import {
//   submitRequestAsync
// } from "./ApiServices";

// class Admin {


//   static getStudents(course, page = 1, perPage = 10) {
//   return submitRequestAsync(
//     `admin/student?course=${course}&page=${page}&per_page=${perPage}`,
//     "GET"
//   );
// }
//   static updateStudent(id, data) {
//     return submitRequestAsync(
//       `admin/student/${id}/update`,
//       "PUT",
//       data
//     );
//   }
//   static addStudent(data) {
//     return submitRequestAsync(
//       `/admin/student/store`,
//       "POST",
//       data
//     );
//   }
//   static exportTAs() {
//     return submitRequestAsync(`admin/TA/export`, "GET");
//   }
//   static getTAs() {
//     return submitRequestAsync(`admin/TA`, "GET");
//   }
//   static updateTAs(id, data) {
//     return submitRequestAsync(
//       `admin/TA/${id}/update`,
//       "PUT",
//       data
//     );
//   }
//     static addTAs(data) {
//     return submitRequestAsync(
//       `/admin/TA/store`,
//       "POST",
//       data
//     );
//   }
//       static addDoctor(data) {
//     return submitRequestAsync(
//       `/admin/doctor/store`,
//       "POST",
//       data
//     );
//   }

//   static exportStudents(courseId) {
//     return submitRequestAsync(`admin/student/export?course=${courseId}`, "GET");
//   }
//   static exportDoctor() {
//     return submitRequestAsync(`admin/doctor/export`, "GET");
//   }

//   static getAcademicYears() {
//     return submitRequestAsync(`academic-years`, "GET");
//   }
//   static uploadStudent(data ) {
//     return submitRequestAsync(`admin/student/import`, "POST", data );
//   }
//   static showDoctor() {
//     return submitRequestAsync(`admin/doctor`, "GET");
//   }
//   static uploadDoctor(data) {
//     return submitRequestAsync(`admin/doctor/import`, "POST", data);
//   }
//   static librarySuggested() {
//     return submitRequestAsync(`library/suggested`, "GET");
//   }
//   static addsuggestedProject(data) {
//     return submitRequestAsync(`admin/suggested_project/store`, "POST", data);
//   }
//   static getDiscissionProjects(id) {
//     return submitRequestAsync(`admin/defense-committees/projects?project_course_id=${id}`)
//   }
//   static getAvailableDoctorsAndTA(id) {
//     return submitRequestAsync(`admin/defense-committees/options?team_id=${id}`, "GET");
//   }
//   static defenseCommittees(data) {
//     return submitRequestAsync(`/admin/defense-committees`, "POST", data);
//   }
//   static getDefenseCommittees(id) {
//     return submitRequestAsync(`/admin/defense-committees?project_course_id=${id}`, "GET");
//   }
//   static deleteDefenseCommittee(id) {
//     return submitRequestAsync(`/admin/defense-committees/${id}`, "DELETE");
//   }
//   static updateDefenseCommittee(id, data) {
//     return submitRequestAsync(`/admin/defense-committees/${id}`, "PUT", data);
//   }
//   static viewTeams(id) {
//     return submitRequestAsync(`/admin/teams/view_team/${id}`, "GET");
//   }
//   static getMilestoneCommittees() {
//     return submitRequestAsync(`/admin/milestone-committees`, "GET");
//   }
//   static downloadMilestoneCommittees() {
//     return submitRequestAsync(`/admin/milestone-committees/export`, "GET");
//   }
//   static getEigibleTeams() {
//     return submitRequestAsync(`admin/milestone-committees/eligible-teams`, "GET");
//   }

//   static getFormData(id) {
//     return submitRequestAsync(`admin/milestone-committees/${id}/form-data`, "GET");
//   }
//   static scheduleMilestoneCommittee(data) {
//     return submitRequestAsync(
//       `/admin/milestone-committees`,
//       "POST",
//       data
//     );
//   }

//   static getTeamStatus() {
//     return submitRequestAsync(`/team-statuses`, "GET");
//   }
//   static getCapastone() {
//     return submitRequestAsync(`/project-courses`, "GET");
//   }
//   static getAllTeams(params) {
//     return submitRequestAsync(
//       "admin/teams",
//       "GET",
//       params
//     );
//   }
//   static getTeamDetails(id) {
//     return submitRequestAsync(
//       `admin/teams/view_team/${id}`,
//       "GET"
//     );
//   }
// static getAdminreports() {
//   return submitRequestAsync(`admin/reports`, "GET", null, {}, true);
// }
// static getAdminreportsDetails(id) {
//   return submitRequestAsync(`/admin/reports/${id}`, "GET",);
//   }

// static sendReportSolution(id, body) {
//   return submitRequestAsync(`admin/reports/${id}/respond`, "POST", body);
// }

//   static getMilestones() {
//     return submitRequestAsync(
//       "/milestones",
//       "GET"
//     );
//   }
//   static addNotes(id, data) {
//     return submitRequestAsync(
//       `admin/milestones/${id}/add/notes`,
//       "PUT",
//       data
//     );
//   }
//   static addMilestone(data) {
//     return submitRequestAsync(
//       `admin/milestones`,
//       "POST",
//       data
//     );
//   }
//   static updateMilestone(id, data) {
//     return submitRequestAsync(
//       `admin/milestones/${id}/update`,
//       "PUT",
//       data
//     );
//   }
//   static toggleMilestoneStatus(id) {
//     return submitRequestAsync(
//       `admin/milestones/${id}/toggle-Open-Close`,
//       "POST"
//     );
//   }
//   static userToogleStatus(id) {
//     return submitRequestAsync(
//       `admin/${id}/user/toggle-status`,
//       "POST"
//     );
//   }
//         static getTeamRules(data) {
//     return submitRequestAsync(
//       `/project_rules`,
//       "GET",
//       data
//     );
//   }
//       static updateTeamRules(data) {
//     return submitRequestAsync(
//       `/admin/project_rules/team_rules`,
//       "PUT",
//       data
//     );
//   }
//         static updateTeamgrading(data) {
//     return submitRequestAsync(
//       `admin/project_rules/grading`,
//       "PUT",
//       data
//     );
//   }
//         static addProjectTypeRequirements(data) {
//     return submitRequestAsync(
//       `admin/project_rules/project_type_requirements`,
//       "POST",
//       data
//     );
//   }
//           static addideaSelectionCriteria(data) {
//     return submitRequestAsync(
//       `admin/project_rules/idea_selection_criteria`,
//       "POST",
//       data
//     );
//   }

//           static toggleOpenClose(id) {
//     return submitRequestAsync(
//       `/admin/milestones/${id}/toggle-Open-Close`,
//       "POST",
//     );
//   }
//    static deletRules(id){
//     return submitRequestAsync(`/admin/project_rules/${id}/delete`, "DELETE")
//    }

//            static updaTemilestoneCommittees(data) {
//     return submitRequestAsync(
//       `admin/milestone-committees/grades/admin-save`,
//       "POST",
//       data
//     );
//   }
  
// }
// export default Admin;

import {
  submitRequestAsync
} from "./ApiServices";

class Admin {


  static getStudents(course, page = 1, perPage = 10) {
    return submitRequestAsync(
      `admin/student?course=${course}&page=${page}&per_page=${perPage}`,
      "GET"
    );
  }
  static updateStudent(id, data) {
    return submitRequestAsync(
      `admin/student/${id}/update`,
      "PUT",
      data
    );
  }
  static addStudent(data) {
    return submitRequestAsync(
      `/admin/student/store`,
      "POST",
      data
    );
  }
  static exportTAs() {
    return submitRequestAsync(`admin/TA/export`, "GET");
  }
  // Now paginated the same way as getStudents (page / per_page query params)
  static getTAs(page = 1, perPage = 10) {
    return submitRequestAsync(
      `admin/TA?page=${page}&per_page=${perPage}`,
      "GET"
    );
  }
  static updateTAs(id, data) {
    return submitRequestAsync(
      `admin/TA/${id}/update`,
      "PUT",
      data
    );
  }
  static addTAs(data) {
    return submitRequestAsync(
      `/admin/TA/store`,
      "POST",
      data
    );
  }
  static addDoctor(data) {
    return submitRequestAsync(
      `/admin/doctor/store`,
      "POST",
      data
    );
  }

static exportStudents(courseId) {
  // الباراميتر الخامس true (لـ rawResponse) والباراميتر السادس true (لـ isBlob)
  return submitRequestAsync(`admin/student/export?course=${courseId}`, "GET", null, {}, true, true);
}
static exportDoctor() {
  return submitRequestAsync(`admin/doctor/export`, "GET", null, {}, true, true);
}



  static getAcademicYears() {
    return submitRequestAsync(`academic-years`, "GET");
  }
  static uploadStudent(data) {
    return submitRequestAsync(`admin/student/import`, "POST", data);
  }
  // Now paginated the same way as getStudents (page / per_page query params)
  static showDoctor(page = 1, perPage = 10) {
    return submitRequestAsync(
      `admin/doctor?page=${page}&per_page=${perPage}`,
      "GET"
    );
  }
  static uploadDoctor(data) {
    return submitRequestAsync(`admin/doctor/import`, "POST", data);
  }
  static librarySuggested() {
    return submitRequestAsync(`library/suggested`, "GET");
  }
  static addsuggestedProject(data) {
    return submitRequestAsync(`admin/suggested_project/store`, "POST", data);
  }
  static getDiscissionProjects(id) {
    return submitRequestAsync(`admin/defense-committees/projects?project_course_id=${id}`)
  }
  static getAvailableDoctorsAndTA(id) {
    return submitRequestAsync(`admin/defense-committees/options?team_id=${id}`, "GET");
  }
  static defenseCommittees(data) {
    return submitRequestAsync(`/admin/defense-committees`, "POST", data);
  }
  static getDefenseCommittees(id) {
    return submitRequestAsync(`/admin/defense-committees?project_course_id=${id}`, "GET");
  }
  static deleteDefenseCommittee(id) {
    return submitRequestAsync(`/admin/defense-committees/${id}`, "DELETE");
  }
  static updateDefenseCommittee(id, data) {
    return submitRequestAsync(`/admin/defense-committees/${id}`, "PUT", data);
  }
  static viewTeams(id) {
    return submitRequestAsync(`/admin/teams/view_team/${id}`, "GET");
  }
  static getMilestoneCommittees() {
    return submitRequestAsync(`/admin/milestone-committees`, "GET");
  }
  static downloadMilestoneCommittees() {
    return submitRequestAsync(`/admin/milestone-committees/export`, "GET");
  }
  static getEigibleTeams() {
    return submitRequestAsync(`admin/milestone-committees/eligible-teams`, "GET");
  }

  static getFormData(id) {
    return submitRequestAsync(`admin/milestone-committees/${id}/form-data`, "GET");
  }
    static updateMilestoneCommittees(id, data) {
    return submitRequestAsync(
      `admin/milestone-committees/${id}/update`,
      "PUT",
      data
    );
  }
  static scheduleMilestoneCommittee(data) {
    return submitRequestAsync(
      `/admin/milestone-committees`,
      "POST",
      data
    );
  }

  static getTeamStatus() {
    return submitRequestAsync(`/team-statuses`, "GET");
  }
  static getCapastone() {
    return submitRequestAsync(`/project-courses`, "GET");
  }
static getAllTeams(params = {}, rawResponse = false) {
  const query = new URLSearchParams(params).toString();
  const endpoint = `admin/teams${query ? `?${query}` : ""}`;

  return submitRequestAsync(
    endpoint,
    "GET",
    null,        // مفيش body مع GET
    {},          // addHeaders
    rawResponse  // <-- ده اللي كان ناقص
  );
}
  static getTeamDetails(id) {
    return submitRequestAsync(
      `admin/teams/view_team/${id}`,
      "GET"
    );
  }
  static getAdminreports() {
    return submitRequestAsync(`admin/reports`, "GET", null, {}, true);
  }
  static getAdminreportsDetails(id) {
    return submitRequestAsync(`/admin/reports/${id}`, "GET",);
  }

  static sendReportSolution(id, body) {
    return submitRequestAsync(`admin/reports/${id}/respond`, "POST", body);
  }

  static getMilestones() {
    return submitRequestAsync(
      "/milestones",
      "GET"
    );
  }
  static addNotes(id, data) {
    return submitRequestAsync(
      `admin/milestones/${id}/add/notes`,
      "PUT",
      data
    );
  }
  static addMilestone(data) {
    return submitRequestAsync(
      `admin/milestones`,
      "POST",
      data
    );
  }
  static updateMilestone(id, data) {
    return submitRequestAsync(
      `admin/milestones/${id}/update`,
      "PUT",
      data
    );
  }
  static toggleMilestoneStatus(id) {
    return submitRequestAsync(
      `admin/milestones/${id}/toggle-Open-Close`,
      "POST"
    );
  }
  static userToogleStatus(id) {
    return submitRequestAsync(
      `admin/${id}/user/toggle-status`,
      "POST"
    );
  }
  static getTeamRules(data) {
    return submitRequestAsync(
      `/project_rules`,
      "GET",
      data
    );
  }
  static updateTeamRules(data) {
    return submitRequestAsync(
      `/admin/project_rules/team_rules`,
      "PUT",
      data
    );
  }
  static updateTeamgrading(data) {
    return submitRequestAsync(
      `admin/project_rules/grading`,
      "PUT",
      data
    );
  }
  static addProjectTypeRequirements(data) {
    return submitRequestAsync(
      `admin/project_rules/project_type_requirements`,
      "POST",
      data
    );
  }
  static addideaSelectionCriteria(data) {
    return submitRequestAsync(
      `admin/project_rules/idea_selection_criteria`,
      "POST",
      data
    );
  }

  static toggleOpenClose(id) {
    return submitRequestAsync(
      `/admin/milestones/${id}/toggle-Open-Close`,
      "POST",
    );
  }
  static deletRules(id) {
    return submitRequestAsync(`/admin/project_rules/${id}/delete`, "DELETE")
  }

  static updaTemilestoneCommittees(data) {
    return submitRequestAsync(
      `admin/milestone-committees/grades/admin-save`,
      "POST",
      data
    );
  }

}
export default Admin;