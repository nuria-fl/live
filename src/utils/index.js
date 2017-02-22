const utils = {
  randomizeWithinRange (range) {
    return Math.floor(Math.random() * range)
  },
  randomizeItems (source, items) {
    const arr = []

    for (let i = 0; i < items; i++) {
      const idx = utils.randomizeWithinRange(source.length)
      arr.push(source[idx])
    }

    return arr
  }
}

export default utils
