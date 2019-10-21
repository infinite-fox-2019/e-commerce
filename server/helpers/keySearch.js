module.exports = function ({ q }) {
    let keySearch = {}
    if (q) keySearch.$or = [{ category: new RegExp(q, 'gi') }]
    return keySearch
}