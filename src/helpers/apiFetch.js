export default async function (method, uri, body = null, isBlob = false) {
    const host = 'http://localhost/kosmos/public/api-kosmos'

    const options = {
        method: method,
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
        },
    }

    const token = localStorage.getItem('user-token')
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`
    }

    if (body instanceof FormData) {
        options.body = body
    } else if (body) {
        options.body = JSON.stringify(body)
        options.headers['Content-Type'] = 'application/json'
    }

    const response = await fetch(host + uri, options)

    // try {
        if (isBlob && response.status === 200) {
            return {
                code: response.status,
                data: await response.blob(),
            }
        } else {
            const result = await response.json()

            return {
                code: response.status,
                data: result,
            }
        }
    // } catch (e) {
    //     console.log(e)
    // }
}
