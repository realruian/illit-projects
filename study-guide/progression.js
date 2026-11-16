import { chapters } from "./curriculum.js";

// Retain this key to migrate the previously published first-chapter record.
export const STORAGE_KEY = "illit.personal.prototype.v2";
export function freshChapter() {
  return {
    tasks: [false, false, false],
    answers: [null, null, null],
    note: "",
    completed: false,
    tool: {},
  };
}
export function freshProgress() {
  return {
    version: 3,
    chapters: Object.fromEntries(chapters.map((c) => [c.id, freshChapter()])),
    explore: { favorites: [] },
  };
}
export function isUnlocked(progress, id) {
  return (
    Number.isInteger(id) &&
    id >= 1 &&
    id <= 5 &&
    Array.from({ length: id - 1 }, (_, i) => i + 1).every(
      (n) => progress.chapters[n]?.completed === true,
    )
  );
}
export function canConfirm(progress, id) {
  const c = chapters.find((c) => c.id === id),
    s = progress.chapters[id];
  return !!c && !!s && isUnlocked(progress, id);
}
export function confirmChapter(progress, id) {
  if (!canConfirm(progress, id)) return progress;
  return {
    ...progress,
    chapters: {
      ...progress.chapters,
      [id]: { ...progress.chapters[id], completed: true },
    },
  };
}
export function getCurrentLevel(progress) {
  return chapters.find((c) => !progress.chapters[c.id]?.completed)?.id ?? 5;
}
function cleanTool(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const tool = {};
  if (typeof raw.choice === "string") tool.choice = raw.choice.slice(0, 80);
  for (const key of ["saved", "selected"])
    if (Array.isArray(raw[key]))
      tool[key] = raw[key]
        .filter((v) => typeof v === "string")
        .slice(0, 20)
        .map((v) => v.slice(0, 80));
  if (raw.checks && typeof raw.checks === "object")
    tool.checks = Object.fromEntries(
      Object.entries(raw.checks).filter(
        ([k, v]) => typeof v === "boolean" && k.length < 120,
      ),
    );
  return tool;
}
export function normalizeProgress(raw) {
  const p = freshProgress();
  if (!raw || typeof raw !== "object") return p;
  if (Array.isArray(raw.explore?.favorites)) {
    p.explore.favorites = [
      ...new Set(
        raw.explore.favorites.filter(
          (id) => typeof id === "string" && /^[a-z0-9-]{1,80}$/.test(id),
        ),
      ),
    ];
  }
  const records =
    raw.version === 3 && raw.chapters && typeof raw.chapters === "object"
      ? raw.chapters
      : { 1: raw };
  for (const c of chapters) {
    const r = records[c.id];
    if (!r || typeof r !== "object") continue;
    const s = p.chapters[c.id];
    s.tasks = c.tasks.map((_, i) => r.tasks?.[i] === true);
    s.answers = c.quiz.map((q, i) =>
      Number.isInteger(r.answers?.[i]) &&
      r.answers[i] >= 0 &&
      r.answers[i] < q.options.length
        ? r.answers[i]
        : null,
    );
    s.note = typeof r.note === "string" ? r.note.slice(0, 8000) : "";
    s.tool = cleanTool(r.tool);
    // Practice is optional. Preserve explicit, sequential confirmations independently of scores.
    s.completed = r.completed === true && canConfirm(p, c.id);
  }
  return p;
}
export function loadProgress(storage) {
  try {
    return normalizeProgress(JSON.parse(storage.getItem(STORAGE_KEY)));
  } catch {
    return freshProgress();
  }
}
export function saveProgress(storage, p) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(p));
    return true;
  } catch {
    return false;
  }
}
