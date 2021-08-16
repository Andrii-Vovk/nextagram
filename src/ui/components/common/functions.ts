

export default function thousandstoK(num: number): string | number {
  return Math.abs(num) > 999
    ? `${Math.sign(num) * parseFloat((Math.abs(num) / 1000).toFixed(1))}k`
    : Math.sign(num) * Math.abs(num);
}
