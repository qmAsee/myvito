const apiConfig = {
  url: "http://localhost:3003",
};

class UserApi {
  constructor(config) {
    this.url = config.url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Произошла ошибка: ${res.status}`));
  }

  signup({ nick, email, password }) {
    return fetch(`${this.url}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nick, email, password }),
    }).then((res) => {
      this._checkResponse(res);
    });
  }

  signin({ nick, password }) {
    return fetch(`${this.url}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nick, password }),
    }).then((res) => this._checkResponse(res));
  }

  getCurrentUser() {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => {
      this._checkResponse(res);
    });
  }
}

export const mainApi = new UserApi(apiConfig);
