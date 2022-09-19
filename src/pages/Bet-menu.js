import { motion } from 'framer-motion'
import { UserVerification } from '../functions/User-verification'
import '../styles/css/Bet-menu.css'

export function BetMenu () {
    UserVerification()
    sessionStorage.setItem('betPlaced', 0)
    return (
        <div className="menu-page">
            <div className="menu-page-cont">
                <motion.div
                className="menu-cont"
                whileHover={{
                    scale : 1.06,
                    transition : {
                        duration : .01
                    }
                }}
                style={{backgroundImage : 'url("images/jannik-skorna-mY2ZHBU6GRk-unsplash.jpg")'}}
                onClick={()=>window.location.assign('/football')}>
                    <h1>Football</h1>
                    <p>Place bets on your favorite team in virtually simulated football matches</p>
                </motion.div>

                <motion.div
                className="menu-cont"
                whileHover={{
                    scale : 1.06,
                    transition : {
                        duration : .01
                    }
                }}
                style={{backgroundImage : 'url("images/noah-silliman-fxAo3DiMICI-unsplash.jpg")'}}
                onClick={()=>window.location.assign('/horse-racing')}>
                    <h1>Horse Racing</h1>
                    <p>Virtual Horse Races is a game in which players place bets on one or more of 8 horses that are racing on the track. Outcomes are the result of an electronic random number generator (RNG).</p>
                </motion.div>
            </div>
        </div>
    )
}