export function format(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  function pad2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  return `${pad2Digits(minutes)}:${pad2Digits(seconds)}`;
}
