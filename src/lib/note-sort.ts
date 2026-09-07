export const NOTE_SORT_OPTIONS = {
  "updated-desc": {
    updatedAt: "desc",
  },
  "updated-asc": {
    updatedAt: "asc",
  },
  "title-asc": {
    title: "asc",
  },
  "title-desc": {
    title: "desc",
  },
  "created-desc": {
    createdAt: "desc",
  },
  "created-asc": {
    createdAt: "asc",
  },
} as const;

export type NoteSort = keyof typeof NOTE_SORT_OPTIONS;

export const DEFAULT_NOTE_SORT: NoteSort = "updated-desc";

export const isNoteSort = (value: unknown): value is NoteSort => {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(NOTE_SORT_OPTIONS, value)
  );
};
