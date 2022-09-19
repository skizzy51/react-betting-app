import axios from 'axios'

export async function UserVerification () {
    const token = sessionStorage.getItem('token')
    if (!token) {
        window.location.assign('/')
        return
    }
    if (JSON.parse(token).value === 'guest' && JSON.parse(token).expires > new Date().getTime()) {
        return
    }
    let response = await axios.get('https://steve-betting-app.herokuapp.com/app/user', {
        headers : { 'authorization' : `Bearer ${JSON.parse(token)}` }
    }).then(res => res.data).catch(err => {return})

    if (!response?.user) {
        window.location.assign('/')
        sessionStorage.removeItem('token')
        return
    }
}