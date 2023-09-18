export default function getInitialLetters(text: string) {
  const words = text.trim().split(/\s+/);

  const initials = words.map((word) => {
    if (word.length > 0) {
      return word[0].toUpperCase();
      return "";
    }
  });

  return initials.join("");
}
