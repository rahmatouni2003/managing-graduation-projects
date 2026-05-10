import { submitRequestAsync } from "./ApiServices";

class Auth {
      static Login(credentials) {
    return submitRequestAsync("login", "POST", credentials);
  }
  static updateProfile(data) {
    return submitRequestAsync("profile/update", "POST", data);
  }

  static updateProfile() {
    return submitRequestAsync("profile/update", "POST", data);
  }

}



export default Auth;