import { submitRequestAsync } from "./ApiServices";

class Project {
  static submitTask(data) {
    return submitRequestAsync("submission/upload", "POST", data);
  }

}



export default Project;
