import { APIRequestContext } from "@playwright/test";

export interface CreateUserRequest {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export interface UserResponse {
  user: {
    email: string;
    username: string;
    bio: string;
    image: string;
    token: string;
  };
}

export class UserController {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createUser(body: CreateUserRequest): Promise<string> {
    const response = await this.request.post("/api/users", {
      data: body,
      failOnStatusCode: true,
    });
    const json: UserResponse = await response.json();
    return json.user.token;
  }

  async loginAsUser(email: string, password: string): Promise<string> {
    const response = await this.request.post("/api/users/login", {
      data: { user: { email, password } },
      failOnStatusCode: true,
    });
    const json: UserResponse = await response.json();
    return json.user.token;
  }
}
