interface IGithubUser {
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  followersCount: number;
  repositoriesCount: number;
}

class GithubUser {
  public username!: string;
  public name!: string;
  public avatarUrl!: string;
  public bio!: string;
  public followersCount!: number;
  public repositoriesCount!: number;

  constructor(user?: IGithubUser) {
    if (user) {
      this.username = user.username;
      this.name = user.name;
      this.avatarUrl = user.avatarUrl;
      this.bio = user.bio;
      this.followersCount = user.followersCount;
      this.repositoriesCount = user.repositoriesCount;
    }
  }

  private init(data?: any) {
    if (data) {
      this.username = data["login"] ?? "";
      this.name = data["name"] ?? "";
      this.avatarUrl = data["avatar_url"] ?? "";
      this.bio = data["bio"] ?? "";
      this.followersCount = data["followers"] ?? 0;
      this.repositoriesCount = data["public_repos"] ?? 0;
    }
  }

  static fromJS(data?: any) {
    data = typeof data === "object" ? data : {};
    let result = new GithubUser();
    result.init(data);
    return result;
  }
}

export { IGithubUser, GithubUser };
