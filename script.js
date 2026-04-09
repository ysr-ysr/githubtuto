const countEl = document.getElementById("count");
const incBtn = document.getElementById("incBtn");
const resetBtn = document.getElementById("resetBtn");
const statusEl = document.getElementById("status");
const themeBtn = document.getElementById("themeBtn");

function setStatus(message) {
  if (!statusEl) return;
  statusEl.textContent = message;
}

function getTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: light)")?.matches ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeBtn?.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
  localStorage.setItem("theme", theme);
  setStatus(`Theme set to ${theme}.`);
}

function readCount() {
  const raw = localStorage.getItem("count");
  const n = Number.parseInt(raw ?? "0", 10);
  return Number.isFinite(n) ? n : 0;
}

function writeCount(n) {
  localStorage.setItem("count", String(n));
  if (countEl) countEl.textContent = String(n);
}

let count = readCount();
writeCount(count);
applyTheme(getTheme());

incBtn?.addEventListener("click", () => {
  count += 1;
  writeCount(count);
  setStatus(`Count increased to ${count}.`);
});

resetBtn?.addEventListener("click", () => {
  count = 0;
  writeCount(count);
  setStatus("Count reset to 0.");
});

themeBtn?.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  applyTheme(current === "light" ? "dark" : "light");
});

