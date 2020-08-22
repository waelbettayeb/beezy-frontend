import { ApolloClient } from "apollo-client";

export function getAuthToken(): string | null {
  const token = localStorage.getItem("token");
  return token == "undefined" ? null : token;
}
export function setAuthToken(token: string, then?: () => void) {
  localStorage.setItem("token", token);
  then && then();
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
