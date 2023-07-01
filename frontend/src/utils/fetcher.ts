// Reused from assignment 3
import { SERVER_ROUTE } from "./endpoint";

class Fetcher {
  path: string
  option: {
    method?: string,
    headers?: object,
    body?: string
  }

  constructor (httpMethod: string, path: string) {
    this.path = SERVER_ROUTE + path;
    this.option = {
      method: httpMethod,
    };
  }

  withToken (token: string | null) {
    this.option.headers = {
      ...this.option.headers,
      Authorization: `Bearer ${token}`,
    };

    return this;
  }

  withLocalStorageToken () {
    return this.withToken(localStorage.getItem('token'));
  }

  withQuery (key: string, value: string) {
    this.path += `?${key}=${value}`;
    return this;
  }

  withJsonPayload (payload: object) {
    this.option.body = JSON.stringify(payload);
    this.option.headers = {
      ...this.option.headers,
      'Content-type': 'application/json',
    }
    return this;
  }

  fetchResult () {
    return new Promise((resolve, reject) => {
      fetch(this.path, this.option as RequestInit)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(e => reject(e));
    });
  }

  static get (path: string) {
    return new Fetcher('GET', path);
  }

  static post (path: string) {
    return new Fetcher('POST', path);
  }

  static put (path: string) {
    return new Fetcher('PUT', path);
  }

  static delete (path: string) {
    return new Fetcher('DELETE', path);
  }
}

export default Fetcher;
