import { useContext } from 'react'
import { Valuables } from '../App'
import '../styles/css/Home.css'

export function Home () {
    const {user} = useContext(Valuables)
    const token = sessionStorage.getItem('token')
    if (user) {
        window.location.assign('/menu')
        return
    }
    else if (JSON.parse(token)?.value === 'guest') {
        window.location.assign('/menu')
        return
    }

    function guestLogin () {
        sessionStorage.clear()
        sessionStorage.setItem('token', JSON.stringify({ value :'guest', expires : new Date().getTime()+86400000 }))
        sessionStorage.setItem('guestCash', 1000)
        window.location.assign('/menu')
    }

    return (
        <div className='home'>
            <img className='home-img' src='/images/Betting Logo.svg' alt='logo' />
            <div className='home-text'>
                <p>Welcome to the home of leading Virtual betting</p>
                <p>We offer online betting on either horse racing or Football.</p>
                <p>Take advantage of the convenience of betting at any time and anywhere</p>
                <p>Our website is optimized for portable devices, such as smartphones and tablets.</p>
            </div>
            <div className='home-buttons'>
                <button onClick={guestLogin}>Sign In as a Guest</button>
                <button onClick={()=>{window.location.assign('/sign-in')}}>Log In</button>
                <button onClick={()=>{window.location.assign('/sign-in')}}>Sign Up</button>
            </div>
        </div>
    )
}