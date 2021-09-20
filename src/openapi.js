import {getOpenApiUrl, OPEN_API_CONSTANT, TOKEN_CONSTANT} from "./constant";
import fetch from "isomorphic-fetch";
import * as storage from './storage'

const getProfile = async () => {
    const accessToken = storage.getItem(TOKEN_CONSTANT.ACCESS_TOKEN)
    const authorizationHeader = `Bearer ${accessToken}`
    const url = getOpenApiUrl(OPEN_API_CONSTANT.PROFILE);
    console.log(url)
    const response = await fetch(url,
        {
            method: 'GET',
            headers: {
                Authorization: authorizationHeader
            }
        })
    const data = await response.json()
    console.log(data)
    return data
}

export {getProfile}