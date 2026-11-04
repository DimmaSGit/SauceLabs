import { APIRequestContext } from "@playwright/test";
import { faker } from "@faker-js/faker";

export const BASE_URL = "http://104.168.59.50";

export type TestUser = {
  username: string;
  email: string;
  password: string;
  token: string;
};

export async function registerUser(
  request: APIRequestContext,
){
  const username = `user-${faker.string.alphanumeric(8)}`;
  const email = `${username}@test.com`;
  const password = "test123";

  const response = await request.post(`${BASE_URL}/api/users`, {
    data: { user: { username, email, password } },
    failOnStatusCode: true,
  });

  const body = await response.json();
  return { username, email, password, token: body.user.token };
}
