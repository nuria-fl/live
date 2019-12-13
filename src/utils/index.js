const utils = {
  calculateProbability(probability) {
    const pool = []

    for (let i = 0; i < 10; i++) {
      if (i < probability) {
        pool.push(true)
      } else {
        pool.push(false)
      }
    }

    const idx = this.randomizeWithinRange(pool.length)

    return pool[idx]
  },
  randomizeWithinRange(range) {
    return Math.floor(Math.random() * range)
  },
  randomizeItems(source, items) {
    const arr = []

    for (let i = 0; i < items; i++) {
      const idx = utils.randomizeWithinRange(source.length)
      arr.push({ ...source[idx] })
    }

    return arr
  },
  generateId() {
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    )
  }
}

export default utils
