export default function getRelativeChange(
  data: number[]
): number[] {
  const output: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      output.push(1)
    } else {
      output.push(data[i] / data[i - 1])
    }
  }

  return output;
}