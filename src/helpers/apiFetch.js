export default async function (method, uri, body = null) {
    const host = 'http://localhost/kosmos/public/api-kosmos'

    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }

    const token = localStorage.getItem('user-token')
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`
    }

    if (body) {
        options.body = JSON.stringify(body)
    }

    const response = await fetch(host + uri, options)

    try {
        const result = await response.json()

        return {
            code: response.status,
            data: result,
        }
    } catch (e) {
        console.log(e)
    }
}
