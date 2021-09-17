const TOKEN_CONSTANT = {
    LOGIN_TMP: "LOGIN_TMP",
    LOGIN_STATE: "LOGIN_STATE",
    CLIENT_ID: "CLIENT_ID",
    ACCESS_TOKEN: "ACCESS_TOKEN",
    EXPIRES: "EXPIRES"
}

const URL_CONSTANT = {
    BASE_URL: "http://192.168.1.114:8080",
    AUTH: "/oauth2/auth",
    TOKEN: "/oauth2/token"
}

const getUrl = (suffix) => {
    return `${URL_CONSTANT.BASE_URL}${suffix}`
}

export {TOKEN_CONSTANT, URL_CONSTANT, getUrl}