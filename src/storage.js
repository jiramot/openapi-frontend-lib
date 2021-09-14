import _ from "lodash"

const setItem = (key, value) => {
    if (!_.isString()) {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}

const getItem = (key) => {
    let value = window.localStorage.getItem(key)
    if (!_.isString()) {
        value = JSON.parse(value)
    }
    return value
}
const removeItem = (key) => {
    window.localStorage.removeItem('name')
}
const clear = () => {
    window.localStorage.clear()
}

export {setItem, getItem, removeItem, clear}