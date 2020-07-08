export const getItem = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value == "undefined" ? null : value;
  } catch {
    return null;
  }
};
