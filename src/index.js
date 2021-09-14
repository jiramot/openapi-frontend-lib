import {getOS} from './util'
import login from './login'
import sdk from "./sdk";

const onload = () => {
    console.log("onload")
}
window.onload = onload

export {sdk as init, getOS, login}
