export const DEFAULT_SYMBOLS = ["RELIANCE", "TCS", "INFY", "HDFCBANK"];

export function loadTheme() {
  const t = localStorage.getItem("theme") || "dark";
  if (t === "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
  return t;
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  return isDark ? "dark" : "light";
}