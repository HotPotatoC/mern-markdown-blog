export default function randomNumber(min: number, max: number) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}
