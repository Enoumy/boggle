export default function scoring(str) {
  if (str.length <= 4) return 1;
  if (str.length <= 5) return 2;
  if (str.length <= 6) return 3;
  if (str.length <= 7) return 5;
  return 11;
}
