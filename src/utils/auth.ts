import { ApolloClient } from "apollo-client";

export function getAuthToken(): string | null {
  const token = localStorage.getItem("jwt");
  return token == "undefined" ? null : token;
}
export function setAuthToken(token: string, then?: () => void) {
  localStorage.setItem("jwt", token);
  then && then();
}

export function removeAuthToken() {
  localStorage.removeItem("jwt");
}

export function clearStorage(): void {
  localStorage.clear();
}
export function fireSignOut(client?: ApolloClient<any>): void {
  clearStorage();
  client && client.clearStore();
  if (navigator.credentials && navigator.credentials.preventSilentAccess) {
    navigator.credentials.preventSilentAccess();
  }
}
