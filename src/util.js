const getOS = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    return /iphone|ipad|ipod/.test(userAgent) ? "ios" : /android/.test(userAgent) ? "android" : "web";
}

export {getOS}


