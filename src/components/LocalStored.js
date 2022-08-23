export function setLocalStored(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStored(key) {
  const stored =
    typeof window !== "undefined" ? localStorage.getItem(key) : null;
  return stored ? JSON.parse(stored) : null;
}

export function deleteLocalStored(key) {
  localStorage.removeItem(key)
}