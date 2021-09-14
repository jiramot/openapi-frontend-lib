import {getOS} from './util'
import login from './login'

const init = (data, resolve, reject) => {
    initContext(data)
        .then(() => {
            try {
                resolve()
            } catch (err) {
                reject(err)
            }
        })
        .catch((err) => reject(err))
}

const initContext = async (data) => {
    console.log('initContext')
}

const onload = () => {
    console.log("onload")
}
window.onload = onload

export {init, getOS, login}
