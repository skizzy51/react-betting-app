import axios from "axios"

export async function Credit (amount) {
    const token = sessionStorage.getItem('token')
    let response = await axios.post('https://steve-betting-app.herokuapp.com/app/deposit', {amount : Number(amount)}, {
        headers : { 'authorization' : `Bearer ${JSON.parse(token)}` }
    }).then(res => res.data).catch(err => {return})

    if (response.message !== 'Cash successfully deposited') return alert('Server error')
}

export async function Debit (amount) {
    const token = sessionStorage.getItem('token')
    let response = await axios.post('https://steve-betting-app.herokuapp.com/app/debit', {amount : Number(amount)}, {
        headers : { 'authorization' : `Bearer ${JSON.parse(token)}` }
    }).then(res => res.data).catch(err => {return})

    if (response.message !== 'Cash successfully debited') return alert('Server error')
}