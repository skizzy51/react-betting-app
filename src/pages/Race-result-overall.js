import { useContext, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import '../styles/css/Race-result.css'
import { useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import { Credit, Debit } from "../functions/Credit-Debit"
import { UserVerification } from "../functions/User-verification"
import { Valuables } from "../App"
import { ValidateBet } from "../functions/Validate-bet"

export function RaceResultOverall () {
    UserVerification()
    ValidateBet()
    const token = sessionStorage.getItem('token')
    const location = useLocation()
    const raceInfo = location.state
    const {user, guestCash, dispatch} = useContext(Valuables)

    const [countdown, setCountdown] = useState(5)
    const [countdownShow, setCountdownShow] = useState(true)
    const [result, setResult] = useState(false)
    const [racePlacement, setRacePlacement] = useState([...raceInfo.overallHorseList])
    
    useEffect(()=>{
        setRacePlacement(prevArray => prevArray.sort(() => 0.5 - Math.random()))
    }, [])
    
    useEffect(()=>{
        racePlacement[0].duration = 4
        racePlacement[1].duration = 5
        racePlacement[2].duration = 6
        racePlacement[3].duration = 7
    }, [racePlacement])

    useEffect(()=>{
        setTimeout(()=>{
            if (countdown > 1) {
                setCountdown(countdown - 1)
            }
            else if (countdown <= 1) {
                setCountdown('GO!')
            }
            else if (countdown === 'GO!') {
                setCountdownShow(false)
            }
        }, 1000)
    }, [countdown])

    useEffect(()=>{
        setTimeout(() => {
            setResult(true)
        }, 13000);
    }, [setResult])


    const countdownMotion = {
        style : {
            color : 'white',
            margin : '0 auto',
            display : 'flex',
            flexDirection : 'column',
            alignItems : 'center',
            y : '25vh'
        },
        initial : {
            marginLeft : '-100vw',
        },
        animate : {
            marginLeft : '0vw',
        },
        exit : {
            y : '-100vh',
        }
    }

    function checkDuration (horsename) {
        let time
        racePlacement.forEach(horse=>{
            if (horse.name === horsename) time = horse.duration
        })
        return time
    }

    function checkWinner () {
        if (
            racePlacement[0].name === raceInfo.overallSelection[0].name &&
            racePlacement[1].name === raceInfo.overallSelection[1].name &&
            racePlacement[2].name === raceInfo.overallSelection[2].name &&
            racePlacement[3].name === raceInfo.overallSelection[3].name
            ) {
                return true
        }else {
            return false
        }
    }

    function winLose () {
        if (checkWinner()) {
            let winnings = raceInfo.totalEarnings.split(',')
            winnings = winnings.join('')
            winnings = Number(winnings)
            if (JSON.parse(token).value === 'guest') {
                dispatch({type : 'update guest cash', payload : guestCash.cash + winnings})
            }
            else if (user) {
                Credit(winnings)
            }
            else {
                return window.location.assign('/')
            }
        }else{
            if (JSON.parse(token).value === 'guest') {
                dispatch({type : 'update guest cash', payload : guestCash.cash - raceInfo.stake})
            }
            else if (user) {
                Debit(raceInfo.stake)
            }
            else {
                return window.location.assign('/')
            }
        }
    }

    function CountdownShow () {
        return (
            <motion.div {...countdownMotion}>
                <h1>Race will begin in...</h1>
                <motion.h1 animate={{scale : 1.2}} transition={{repeat : 6, duration : .9, ease : 'easeInOut'}} style={window.innerWidth > 425 ? {fontSize : '35vh'} : {fontSize : '20vh'}}>{countdown}</motion.h1>
            </motion.div>
        )
    }

    return (
        <div className="race-result-page">
            <AnimatePresence>
                {countdownShow && <CountdownShow/>}
            </AnimatePresence>
            {
                !countdownShow &&

                <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring'}} className="race">
                    <div className="horses-cont">
                        <div className="track">
                            <motion.div
                            animate={{left:'90%'}}
                            transition={{duration:checkDuration('Bolt')}}
                            style={{display:'flex', flexDirection:'column', alignItems:'center', position:'relative'}}>
                                <span>Bolt</span>
                                <img style={{backgroundColor:'red'}} src="images/horse-svg2.svg" className="horse" alt="race-horse" />
                            </motion.div>
                        </div>

                        <div className="track">
                            <motion.div
                            animate={{left:'90%'}}
                            transition={{duration:checkDuration('Henry')}}
                            style={{display:'flex', flexDirection:'column', alignItems:'center', position:'relative'}}>
                                <span>Henry</span>
                                <img style={{backgroundColor:'gold'}} src="images/horse-svg2.svg" className="horse" alt="race-horse" />
                            </motion.div>
                        </div>

                        <div className="track">
                            <motion.div
                            animate={{left:'90%'}}
                            transition={{duration:checkDuration('Gus')}}
                            style={{display:'flex', flexDirection:'column', alignItems:'center', position:'relative'}}>
                                <span>Gus</span>
                                <img style={{backgroundColor:'brown'}} src="images/horse-svg2.svg" className="horse" alt="race-horse" />
                            </motion.div>
                        </div>

                        <div className="track">
                            <motion.div
                            onAnimationStart={winLose}
                            animate={{left:'90%'}}
                            transition={{duration:checkDuration('Julius')}}
                            style={{display:'flex', flexDirection:'column', alignItems:'center', position:'relative'}}>
                                <span>Julius</span>
                                <img style={{backgroundColor:'purple'}} src="images/horse-svg2.svg" className="horse" alt="race-horse" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            }
            {
                result &&
                <div className="result-cont">
                    <motion.div initial={{y:'-100vh'}} animate={{y:'0'}} className="result">
                        <h1 style={{textAlign:'center', margin:'1rem 0', textDecoration:'underline'}}>Placement</h1>
                        <div className="overall-placement-result">
                            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}>1st - {racePlacement[0].name}</motion.p>
                            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}}>2nd - {racePlacement[1].name}</motion.p>
                            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3}}>3rd - {racePlacement[2].name}</motion.p>
                            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:4}}>4th - {racePlacement[3].name}</motion.p>
                        </div>

                        <h2 style={{textAlign : 'center', marginTop : '2rem'}}>Your prediction</h2>
                        <div className="overall-placement-selection">
                            <span>1st - {raceInfo.overallSelection[0].name}</span>
                            <span>2nd - {raceInfo.overallSelection[1].name}</span>
                            <span>3rd - {raceInfo.overallSelection[2].name}</span>
                            <span>4th - {raceInfo.overallSelection[3].name}</span>
                        </div>

                        <motion.div onAnimationComplete={()=>sessionStorage.setItem('betPlaced', 1)} style={{marginTop:'2rem'}} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:5}} >
                            {
                                checkWinner()
                                ? <h1 className="you-win"><FontAwesomeIcon icon={faCheck}/> You win!! <span style={{color:'green'}}>₦{raceInfo.totalEarnings}</span></h1>
                                : <h1 className="you-lose"><FontAwesomeIcon icon={faTimes}/> You lose</h1>
                            }
                            <p onClick={()=>window.location.assign('/menu')} style={{width:'fit-content', margin:'0 auto', display:'flex', cursor:'pointer', color:'blue', textDecoration:'underline'}}>Back to Menu page</p>
                        </motion.div>
                    </motion.div>   
                </div>
            }
        </div>
    )
}