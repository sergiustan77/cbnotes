import Note from "../interfaces/Note";

export default function sortNoteInClient(
  notes: Note[],
  sortBy: string,
  date: string,
  title: string
) {
  if (sortBy === "title") {
    console.log(sortBy + " " + title + " " + date);
    return notes.sort((n1, n2) => {
      const titleCompare = n1.title.localeCompare(n2.title);
      return title === "ASC" ? titleCompare : -titleCompare;
    });
  } else if (sortBy === "updated_at") {
    console.log(sortBy + " " + title + " " + date);
    return notes.sort((n1, n2) => {
      const dateN1 = new Date(n1.updated_at.toString()).getTime();
      const dateN2 = new Date(n2.updated_at.toString()).getTime();
      return date === "ASC" ? dateN1 - dateN2 : dateN2 - dateN1;
    });
  }
  return notes.sort(
    (n1, n2) =>
      new Date(n2.updated_at.toString()).getTime() -
      new Date(n1.updated_at.toString()).getTime()
  );
}
