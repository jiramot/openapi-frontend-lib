const TOKEN_CONSTANT = {
    LOGIN_TMP: "LOGIN_TMP",
    LOGIN_STATE: "LOGIN_STATE",
    CLIENT_ID: "CLIENT_ID",
    ACCESS_TOKEN: "ACCESS_TOKEN",
    EXPIRES: "EXPIRES"
}

const PREFIX = "SDK"

const URL_CONSTANT = {
    BASE_URL: "http://localhost:8000",
    AUTH: "/oauth2/auth",
    TOKEN: "/oauth2/token",
}

const OPEN_API_CONSTANT = {
    BASE_URL: "http://localhost:8000",
    PROFILE: "/profile"
}

const getUrl = (suffix) => {
    return `${URL_CONSTANT.BASE_URL}${suffix}`
}

const getOpenApiUrl = (suffix) => {
    return `${OPEN_API_CONSTANT.BASE_URL}${suffix}`
}

export {TOKEN_CONSTANT, URL_CONSTANT, OPEN_API_CONSTANT, PREFIX, getUrl, getOpenApiUrl}