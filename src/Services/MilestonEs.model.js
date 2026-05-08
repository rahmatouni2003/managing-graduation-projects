import { submitRequestAsync } from "./ApiServices";

class Milestones {
  static getOpenMilestones() {
    return submitRequestAsync("milestones", "GET");
  }


}

export default Milestones;