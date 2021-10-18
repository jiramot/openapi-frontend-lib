import {getOS} from './util'
import sdk, {getToken, getClientId, getProfile, isInClient, isLoggedIn, login} from "./sdk";

export {sdk as init, getOS, login, isLoggedIn, getProfile, getClientId, isInClient, getToken}
