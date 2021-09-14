import * as storage from './storage'
import {TOKEN_CONSTANT} from './constant'

const Sdk = function () {
  
}

Sdk.prototype = {
    init: function () {
        const sdk1 = async function (data) {
            console.log("init with promise")
            await initContext(data)
        }

        const sdk2 = function (data, resolve, reject) {
            console.log("init with callback")
            initContext(data)
                .then(resolve())
                .catch(err => reject(err))
        }

        if (arguments.length === 1) {
            return sdk1(arguments[0])
        } else {
            return sdk2(arguments[0], arguments[1], arguments[2])
        }
    }
}

const initContext = async (data) => {
    console.log("init data")
    if (data.clientId == null) {
        throw new Error("No clientId found")
    }
    storage.setItem(TOKEN_CONSTANT.CLIENT_ID, data.clientId)
}

const sdk = new Sdk()
export default sdk.init
