import { submitRequestAsync } from "./ApiServices";

class Requests {

  static getReceivedRequests() {
    return submitRequestAsync(
      `requests/received`,
      "GET"
    );
  }

  static getSentRequests() {
    return submitRequestAsync(
      `requests/sent`,
      "GET"
    );
  }

  static sendRequest(data) {
    return submitRequestAsync(
      `requests`,
      "POST",
      data
    );
  }

  static requestRespond(id, status) {

    return submitRequestAsync(
      `requests/${id}/respond`,
      "POST",
      {
        status: status,
      }
    );
  }
    static getReceivedRequestsFromTeams() {
    return submitRequestAsync(
      `requests/received?type=teams`,
      "GET"
    );
  }

      static getReceivedRequestsFromStudents() {
    return submitRequestAsync(
      `requests/received?type=students`,
      "GET"
    );
  }
      static getAvailableSupervisors() {
  return submitRequestAsync(`available/supervisors`, "GET");
} 
    static sendsupervisionrequests(data) {
  return submitRequestAsync(`supervision-requests`, "POST" , data);
} 
    static getSupervisorRequests() {
  return submitRequestAsync(`/supervisor/requests`, "GET");
} 
}


export default Requests;