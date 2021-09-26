import {getOS} from './util'
import sdk, {getClientId, getProfile, isLoggedIn, login, isInClient} from "./sdk";

export {sdk as init, getOS, login, isLoggedIn, getProfile, getClientId, isInClient}
