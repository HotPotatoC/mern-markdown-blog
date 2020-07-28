import request from "./api";

export async function login(email, password) {
  const response = await request.post("/auth/login", {email, password});

  return response;
}

export async function register(payload) {
  const response = await request.post("/auth/register", {
    displayName: payload.displayName,
    username: payload.username,
    email: payload.email,
    password: payload.password,
  });

  return response;
}

export function logout() {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
  }
}

export async function user(token) {
  const response = await request.get("/auth/me");

  return response;
}
