import { submitRequestAsync } from "./ApiServices";

class Milestones {
  static getOpenMilestones() {
    return submitRequestAsync("milestone/active", "GET");
  }

  static showMilestone(milestoneId) {
    return submitRequestAsync(`milestones/${milestoneId}/show`, "GET");
  }
}

export default Milestones;