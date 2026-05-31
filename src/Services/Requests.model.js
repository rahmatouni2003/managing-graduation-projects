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
}


export default Requests;