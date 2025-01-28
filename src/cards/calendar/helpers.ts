export function hashCode(str) {
  return Array.from(str).reduce(
    (hash, letter) => letter.charCodeAt(0) + ((hash << 5) - hash),
    0
  );
}

export function intToRGB(i) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "#" + "00000".substring(0, 6 - c.length) + c;
}