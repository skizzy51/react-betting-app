import { useEffect, useRef, useState } from 'react'
import { Loading } from '../components/Loading'
import axios from 'axios'
import '../styles/css/Sign-in.css'

export function SignInPage () {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [createUsername, setCreateUsername] = useState('')
    const [createPassword1, setCreatePassword1] = useState('')
    const [createPassword2, setCreatePassword2] = useState('')
    const signInCont = useRef()
    const signUpCont = useRef()
    const token = sessionStorage.getItem('token')
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])

    useEffect(()=>{
        async function verifyUser () {
            let response = await axios.get('https://betting-app-backend.vercel.app/app/user', {
                headers : { 'authorization' : `Bearer ${token}` }
            }).then(res => res.data).catch(err => {return})

            if (response?.user) {
                window.location.assign('/menu')
                return
            }
            else if (JSON.parse(token)?.value === 'guest') {
                window.location.assign('/menu')
                return
            }
            else if (!response) {
                sessionStorage.removeItem('token')
            }
        }
        verifyUser()
    },[token])

    async function signIn () {
        if (username.length < 1 || password.length < 1) {
            return alert('Username field and password field must be filled')
        }
        let data = {
            username : username,
            password : password
        }

        let response = await axios.post('https://betting-app-backend.vercel.app/app/login', data, {
            headers : { 'Content-Type' : 'application/json' }
        }).then(res => res.data).catch(err => {return})

        if (response?.message === 'logged in') {
            sessionStorage.setItem('token', JSON.stringify(response?.token))
            window.location.assign('/menu')
            return
        }
        else {
            return alert('Invalid Username or Password')
        }
    }

    async function signUp () {
        if (createUsername.length < 1 || createPassword1.length < 1 || createPassword2.length < 1) {
            return alert('Username field and password field must be filled')
        }
        if (createUsername.length < 4) {
            return alert('Username must be at least 4 characters long')
        }
        if (createPassword1 === createPassword2) {
            let data = {
                username : createUsername,
                password : createPassword1
            }
            let response = await axios.post('https://betting-app-backend.vercel.app/app/user', data, {
                headers : { 'Content-Type' : 'application/json' }
            }).then(res => res.data).catch(err => {return})

            if (response.message === 'User Created and signed in') {
                sessionStorage.setItem('token', JSON.stringify(response.token))
                window.location.assign('/menu')
                return
            }
            else {
                return alert('Username already exists')
            }
        }
        else{
            return alert('First and second passwords do not match')
        }
    }

    function goToSignUp () {
        signInCont.current.style.display = 'none'
        signUpCont.current.style.display = 'block'
        document.getElementById('form1').reset()
        document.getElementById('form2').reset()
    }
    function goToSignIn () {
        signInCont.current.style.display = 'block'
        signUpCont.current.style.display = 'none'
        document.getElementById('form1').reset()
        document.getElementById('form2').reset()
    }

    return (
        <>
            {
                loading
                && <Loading/>
            }
            <div className="sign-in-page">
                <div className='sign-in-cont' ref={signInCont}>
                    <h3>Sign In</h3>
                    <form className='sign-in' id='form1' style={{padding : '5rem 2rem'}}>
                        <div className='input-cont'>
                            <b>Enter username :</b>
                            <input onChange={(e)=>setUserName(e.target.value)} type='text' placeholder='Username' />
                        </div>
                        <div className='input-cont'>
                            <b>Enter password :</b>
                            <input onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password' />
                        </div>
                        <button onClick={signIn} type='button' className='sign-in-button'>Sign In</button>
                        <p>Don't have an account?&nbsp;<span onClick={goToSignUp}>Sign up</span></p>
                    </form>
                </div>
                <div className='sign-up-cont' ref={signUpCont}>
                    <h3>Sign Up</h3>
                    <form className='sign-in' id='form2' style={{padding : '3rem 2rem'}}>
                        <div className='input-cont'>
                            <b>Enter username :</b>
                            <input onChange={(e)=>setCreateUsername(e.target.value)} type='text' placeholder='Username' />
                        </div>
                        <div className='input-cont'>
                            <b>Enter password :</b>
                            <input onChange={(e)=>setCreatePassword1(e.target.value)} type='password' placeholder='Password' />
                        </div>
                        <div className='input-cont'>
                            <b>Re-enter password :</b>
                            <input onChange={(e)=>setCreatePassword2(e.target.value)} type='password' placeholder='Password' />
                        </div>
                        <button onClick={signUp} type='button' className='sign-in-button'>Sign Up</button>
                        <p>Already have an account?&nbsp;<span onClick={goToSignIn}>Sign In</span></p>
                    </form>
                </div>
            </div>
        </>
    )
}