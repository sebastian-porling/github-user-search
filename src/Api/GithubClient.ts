import { GithubUser } from "$/Model/GithubUser";

export interface IGithubClient {
  getUserByUsername(username: string): Promise<GithubUser>;
}

export class GithubClient implements IGithubClient {
  constructor(
    private readonly baseUri: string = "https://api.github.com/users/"
  ) {}

  async getUserByUsername(username: string): Promise<GithubUser> {
    return fetch(`${this.baseUri}${username}`).then((response) => {
      const status = response.status;
      if (status === 200) {
        return response.json().then((json) => {
          return GithubUser.fromJS(json);
        });
      } else if (status === 404) {
        throw new Error(`Username: ${username} not found`);
      }
      throw new Error(`Unexpected status: ${status}`);
    });
  }
}
