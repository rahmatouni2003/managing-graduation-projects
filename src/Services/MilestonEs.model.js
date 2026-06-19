import { submitRequestAsync } from "./ApiServices";

class Milestones {
  static getOpenMilestones() {
    return submitRequestAsync("milestone/active", "GET");
  }


}

export default Milestones;