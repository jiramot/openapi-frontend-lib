const getOS = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    return /iphone|ipad|ipod/.test(userAgent) ? "ios" : /android/.test(userAgent) ? "android" : "web";
}

const getClientId = () => {

}

const login = () => {
    console.log('login')
    window.location.href = "https://postman-echo.com/get"
}

export { getOS, getClientId,login }


