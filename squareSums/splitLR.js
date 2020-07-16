const splitLR = (arr) => {
    return {
        left: arr.filter((_, i) => !(i % 2)),
        right: arr.filter((_, i) => i % 2)
    }
}

module.exports = { splitLR }