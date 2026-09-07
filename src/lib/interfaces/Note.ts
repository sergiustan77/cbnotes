import Tag from "./Tag";

interface Note {
  title: string;
  content: string;
  noteContentText: string;
  created_at: string;
  updated_at: string;
  id: string;
  tags: Tag[];
  linkedNotes: any[];
}

export default Note;
