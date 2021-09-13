import fetch from 'isomorphic-fetch'

const login = async () => {
    console.log('login')
    const query = new URLSearchParams({
        "response_type": "code",
        "client_id": "1234",
    }).toString()
    const response = await fetch("http://192.168.1.114:8080/oauth2/auth?" + query)
    const data = await response.json()
    const redirectUrl = data.redirect_url
    window.location.href = redirectUrl
}

export default login