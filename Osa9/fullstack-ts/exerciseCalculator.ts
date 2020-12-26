interface ExerciseArguments {
  target: number
  exercises: Array<number>
}

interface Results {
  period: number
  target: number
  daysTrained: number
  reached: boolean
  average: number
  message: string
  rating: number
}

const parseArray = (args: Array<string>): ExerciseArguments => {
  if (args.length < 4) throw new Error('Not enought arguments')
  const argumentsArray = args.splice(2)

  const asNumbers = argumentsArray.map((arg: string) => {
    if (isNaN(Number(arg))) {
      throw new Error('Array contained a non numberical value')
    } else {
      return Number(arg)
    }
  })

  const target = asNumbers.shift()

  return {
    target: target,
    exercises: asNumbers
  }
}

const calculateExcercises = (target: number, exercises: Array<number>): Results => {
  const days = exercises.length
  const trainingDays = exercises.filter(e => e > 0).length
  const total = exercises.reduce((a, b) => { return (a + b) })
  const average = (1.0 * (total / days))

  const rating = target > average
    ? 100 * (1 + (average - target))
    : 100 * (1 + average - target)

  let message = ''
  if (rating >= 100) {
    message = 'Good job!'
  } else if (rating < 20) {
    message = 'No were close.'
  } else {
    message = 'Time to step up!'
  }

  return {
    period: days,
    target: target,
    daysTrained: trainingDays,
    reached: (target <= average),
    average: average,
    message: message,
    rating: Math.round(rating)
  }
}

try {
  const { target, exercises } = parseArray(process.argv)
  console.log(calculateExcercises(target, exercises))
} catch (e) {
  console.log(`Error: ${e.message}`)
}

export { calculateExcercises }