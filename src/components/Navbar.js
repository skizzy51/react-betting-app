import { useContext, useRef } from 'react'
import { Valuables } from '../App'
import '../styles/css/App.css'

let intlFormat = new Intl.NumberFormat('en-US')

export function Navbar () {
    const { user, guestCash } = useContext(Valuables)
    const dropdownBTN = useRef()
    const token = sessionStorage.getItem('token')

    function getCash () {
        if (user) return intlFormat.format(user.user.cash)
        else if (JSON.parse(token).value === 'guest') return intlFormat.format(guestCash.cash)
    }

    function dropdown () {
        if (dropdownBTN.current.classList.contains('dropdown-close')) {
            dropdownBTN.current.classList.replace('dropdown-close', 'dropdown-open')
        }
        else if(dropdownBTN.current.classList.contains('dropdown-open')) {
            dropdownBTN.current.classList.replace('dropdown-open', 'dropdown-close')
        }
    }

    function logout () {
        sessionStorage.removeItem('token')
        window.location.reload()
    }

    if (
        window.location.pathname === '/' ||
        window.location.pathname === '/menu' ||
        window.location.pathname === '/horse-racing' ||
        window.location.pathname === '/football' ||
        window.location.pathname === '/race-result' ||
        window.location.pathname === '/race-result-overall' ||
        window.location.pathname === '/match-sim'
        ) {
        return (
            <div style={{position : 'relative'}}>
                <div style={{position : 'fixed', width : '100%', top : 0, zIndex : 12}}>
                    <div className="navbar">
                        <img src='images/Betting Logo.svg' onClick={()=>window.location.pathname === '/' ? null : window.location.assign('/menu')} className='navbar-logo' alt='logo'/>
                        {
                            window.location.pathname === '/'
                            ? null
                            : <div style={{position : 'relative'}}>
                                <button onClick={dropdown}>Cash | ₦{getCash()}</button>
                                <div className='dropdown-close' ref={dropdownBTN} >
                                    {
                                        JSON.parse(token).value === 'guest'
                                        ? null
                                        : <div onClick={()=>window.location.assign('/deposit')} className='dropdown-btn' >Deposit</div>
                                    }
                                    <div className='dropdown-btn' onClick={logout}>Logout</div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
    return null
}