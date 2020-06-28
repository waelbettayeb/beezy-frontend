import { ApolloClient } from "apollo-client";

export function getAuthToken(): string | null {
  try {
    const token = localStorage.getItem("token");
    return token == "undefined" ? null : token;
  } catch {
    return null;
  }
}
export function setAuthToken(token: string) {
  localStorage.setItem("token", token);
  console.log(token);
}

export function removeAuthToken() {
  localStorage.removeItem("token");
}

export function clearStorage(): void {
  localStorage.clear();
}
export function fireSignOut(client?: ApolloClient<any>): void {
  clearStorage();
  if (navigator.credentials && navigator.credentials.preventSilentAccess) {
    navigator.credentials.preventSilentAccess();
  }
  if (client) {
    client.resetStore();
  }
}
