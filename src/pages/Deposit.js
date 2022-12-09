import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { PaystackButton } from 'react-paystack'
import { Valuables } from '../App'
import { Loading } from '../components/Loading'
import { UserVerification } from '../functions/User-verification'
import '../styles/css/Deposit.css'

export function Deposit () {
    const [amount, setAmount] = useState(1000)
    const [loading, setLoading] = useState(true)
    const { user } = useContext(Valuables)
    const token = sessionStorage.getItem('token')
    const email = 'example@example.com'
    
    const publicKey = 'pk_test_3c3583c8828234ac6d37ac46ac17bcbca3f672bd'
    
    UserVerification()

    useEffect(()=>{
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [])

    async function pay () {
        let response = await axios.post('https://betting-app-backend.vercel.app/app/deposit', {amount : Number(amount)}, {
            headers : { 'authorization' : `Bearer ${JSON.parse(token)}` }
        }).then(res => res.data).catch(err => {return})
        
        if (response.message !== 'Cash successfully deposited') return alert('Transaction failed')
        alert('Cash deposit successful')
        window.location.assign('/menu')
    }

    const componentProps = {
        email : 'example@gmail.com',
        amount : amount * 100,
        metadata: {
            name : user?.user.username
        },
        publicKey,
        text: 'Deposit',
        onSuccess: () => pay()
    }

    return (
        <>
            {
                loading
                && <Loading/>
            }
            <div className='deposit-page'>
                <div className='deposit-page-cont'>
                    <h2>Deposit cash</h2>
                    <div className='inputs'>
                        <div className='deposit-input'>
                            <b>Username :</b>
                            <input style={{opacity : '50%', cursor : 'not-allowed'}} readOnly type='text' defaultValue={user?.user.username} />
                        </div>
                        <div className='deposit-input'>
                            <b>E-mail :</b>
                            <input style={{opacity : '50%', cursor : 'not-allowed'}} readOnly type='text' defaultValue={email} />
                        </div>
                        <div className='deposit-input'>
                            <b>Amount :</b>
                            <input onChange={(e)=>setAmount(e.target.value)} type='number' defaultValue={amount} max='10000' min='0' />
                        </div>
                        <PaystackButton className='deposit-btn' {...componentProps} />
                    </div>
                </div>
            </div>
        </>
    )
}