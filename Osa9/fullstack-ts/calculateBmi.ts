const calculateBmi = (height: number, weight: number,) => {
  const bmi = (weight / (height * height)) * 10000
  if (bmi < 18.5) {
    return `Underweight (${Math.round(bmi)}).`
  }
  if (bmi > 25) {
    return `Overweight (${Math.round(bmi)}).`
  }
  return `Normal (${Math.round(bmi)}).`
}
const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])

console.log(calculateBmi(a, b))