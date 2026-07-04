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
static getStudents(course, page = 1, perPage = 10) {
  return submitRequestAsync(
    `admin/student?course=${course}&page=${page}&per_page=${perPage}`,
    "GET"
  );
}
    static getAvailableStudents() {
  return submitRequestAsync(`available/students`, "GET");
} 
    static getHome() {
  return submitRequestAsync(`home`, "GET");
} 
    static getMilestonesActive() {
  return submitRequestAsync(`home`, "GET");
} 
    static getNotifications() {
  return submitRequestAsync(`notifications`, "GET");
} 
    static readNotifications() {
  return submitRequestAsync(`/notifications/read-all`, "POST");
}
    static getChatConversations(id) {
  return submitRequestAsync(`chat/${id}`, "GET");
} 
    static getConversations() {
  return submitRequestAsync(`chat/conversations`, "GET");
}
    static sendChatMessages(data) {
  return submitRequestAsync(`chat/messages`, "POST", data);
} 
    static sendChatTeamInfo() {
  return submitRequestAsync(`api/chat/team/info`, "GET", );
} 
}


export default Student;
