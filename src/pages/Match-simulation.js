import { useState } from "react"
import { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Valuables } from "../App"
import { UserVerification } from "../functions/User-verification"
import { motion } from "framer-motion"
import '../styles/css/Match-simulation.css'
import { Credit, Debit } from "../functions/Credit-Debit"
import { ValidateBet } from "../functions/Validate-bet"

export function MatchSim () {
    UserVerification()
    ValidateBet()
    const location = useLocation()
    const matchDetails = location.state
    const token = sessionStorage.getItem('token')
    const {user, guestCash, dispatch} = useContext(Valuables)
    const [countdownShow, setCountdownShow] = useState(true)
    const [simulation, setSimulation] = useState(false)
    const [simulationPeriod, setSimulationPeriod] = useState('Simulating...')
    const [countdown, setCountdown] = useState(4)
    const [results, setResults] = useState([])

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
                setSimulation(true)
                handleSimulation()
            }
        }, 1000)
    }, [countdown])

    useEffect(()=>{
        let dummyArray = []
        matchDetails.matchupArray.forEach(element => {
            if (element.team1Score > element.team2Score) {
                dummyArray.push({team1 : element.team1.shortName, team2 : element.team2.shortName, result : 'team1'})
            }
            else if (element.team1Score < element.team2Score) {
                dummyArray.push({team1 : element.team1.shortName, team2 : element.team2.shortName, result : 'team2'})
            }
            else if (element.team1Score === element.team2Score) {
                dummyArray.push({team1 : element.team1.shortName, team2 : element.team2.shortName, result : 'draw'})
            }
        })
        setResults(dummyArray)
    }, [countdownShow, matchDetails])

    const renderMatchups = matchDetails.matchupArray.map(matchup => {
        return (
            <div key={matchup.team1.name}>{matchup.team1.name} <span>{!countdownShow && !simulation ? matchup.team1Score : 0}</span> - <span>{!countdownShow && !simulation ? matchup.team2Score : 0}</span> {matchup.team2.name}</div>
        )
    })
    const renderSelections = matchDetails.betSelections.map(selection =>{
        let color = ''
        results.forEach(element =>{
            if (element.team1 === selection.team1.shortName) {
                if (element.result === selection.selected) {
                    color = '#009444'
                }else{
                    color = 'crimson'
                }
            }
        })
        return (
            <div key={selection.team1.name}>
                <h3 style={{color : color}}>{selection.team1.shortName} - {selection.team2.shortName}</h3>
                {selection.selected === 'team1' && <p>You picked - {selection.team1.shortName}</p>}
                {selection.selected === 'team2' && <p>You picked - {selection.team2.shortName}</p>}
                {selection.selected === 'draw' && <p>You picked - DRAW</p>}
            </div>
        )
    })

    function selectionResult () {
        let add = 0
        results.forEach(element => {
            matchDetails.betSelections.forEach(selection=> {
                if (element.team1 === selection.team1.shortName) {
                    if (element.result === selection.selected) {
                        add += 1
                    }
                }
            })
        })
        if (add === matchDetails.betSelections.length) {
            return true
        }else{
            return false
        }
    }

    function winLose () {
        if (selectionResult()) {
            let winnings = matchDetails.totalEarnings.split(',')
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
                dispatch({type : 'update guest cash', payload : guestCash.cash - matchDetails.stake})
            }
            else if (user) {
                Debit(matchDetails.stake)
            }
            else {
                return window.location.assign('/')
            }
        }
    }

    function handleSimulation () {
        setTimeout(() => {
            setSimulationPeriod('Match Ended')
        }, 7000);
        setTimeout(() => {
            setSimulation(false)
            winLose()
            setTimeout(() => {
                sessionStorage.setItem('betPlaced', 1)
            }, 500);
        }, 9500);
    }

    return (
        <div className="match-sim-page">
            {
                countdownShow &&
                <div className="countdown">
                    <h1>Matches will begin in</h1>
                    <h1 className="number">{countdown}</h1>
                </div>
            }
            {
                simulation &&
                <div className="simulation">
                    <motion.h2 initial={{y:'-100vh'}} animate={{y:0}} exit={{y:'-100vh'}} transition={{delay:.9}} className="header">{simulationPeriod}</motion.h2>
                    <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} className="simulation-cont">
                        <motion.div className="player">1</motion.div>
                        
                        <motion.div animate={{left:'50%'}} transition={{duration:6, delay:1}} initial={{top:'5%', left:'15%'}} className="player">22</motion.div>
                        <motion.div animate={{left:'40%'}} transition={{duration:6, delay:1}}  initial={{top:'30%', left:'12%'}} className="player">4</motion.div>
                        <motion.div animate={{left:'40%'}} transition={{duration:6, delay:1}}  initial={{bottom:'30%', left:'12%'}} className="player">12</motion.div>
                        <motion.div animate={{left:'50%'}} transition={{duration:6, delay:1}}  initial={{bottom:'5%', left:'15%'}} className="player">3</motion.div>

                        <motion.div animate={{left:'65%', top:'20%'}} transition={{duration:6, delay:1}}  initial={{top:'30%', left:'30%'}} className="player">5</motion.div>
                        <motion.div animate={{left:'55%'}} transition={{duration:6, delay:1}}  initial={{left:'25%'}} className="player">6</motion.div>
                        <motion.div animate={{left:'60%'}} transition={{duration:6, delay:1}}  initial={{bottom:'30%', left:'30%'}} className="player">8</motion.div>

                        <motion.div animate={{left:'90%'}} transition={{duration:6, delay:1}}  initial={{top:'10%', left:'40%'}} className="player">11</motion.div>
                        <motion.div animate={{left:'82%'}} transition={{duration:6, delay:1}}  initial={{left:'42%'}} className="player">7</motion.div>
                        <motion.div animate={{left:'70%'}} transition={{duration:6, delay:1}}  initial={{bottom:'10%', left:'40%'}} className="player">23</motion.div>
                        
                        {/* second team */}
                        
                        <motion.div animate={{top:'40%'}} transition={{duration:6, delay:1}}  className="player2">12</motion.div>

                        <motion.div animate={{right:'15%'}} transition={{duration:6, delay:1}}  initial={{top:'5%', right:'12%'}} className="player2">11</motion.div>
                        <motion.div animate={{right:'8%'}} transition={{duration:6, delay:1}}  initial={{top:'30%', right:'12%'}} className="player2">4</motion.div>
                        <motion.div animate={{right:'8%'}} transition={{duration:6, delay:1}}  initial={{bottom:'30%', right:'12%'}} className="player2">3</motion.div>
                        <motion.div animate={{right:'15%'}} transition={{duration:6, delay:1}}  initial={{bottom:'5%', right:'12%'}} className="player2">2</motion.div>

                        <motion.div animate={{right:'30%'}} transition={{duration:6, delay:1}}  initial={{top:'5%', right:'27%'}} className="player2">5</motion.div>
                        <motion.div animate={{right:'18%'}} transition={{duration:6, delay:1}}  initial={{top:'30%', right:'27%'}} className="player2">8</motion.div>
                        <motion.div animate={{right:'18%'}} transition={{duration:6, delay:1}}  initial={{bottom:'30%', right:'27%'}} className="player2">15</motion.div>
                        <motion.div animate={{right:'35%'}} transition={{duration:6, delay:1}}  initial={{bottom:'5%', right:'27%'}} className="player2">93</motion.div>

                        <motion.div animate={{right:'47%'}} transition={{duration:6, delay:1}}  initial={{top:'30%', right:'42%'}} className="player2">10</motion.div>
                        <motion.div animate={{right:'47%'}} transition={{duration:6, delay:1}}  initial={{bottom:'30%', right:'42%'}} className="player2">7</motion.div>
                    </motion.div>
                </div>
            }
            <div className="sim-container">
                <div className="matchups-cont">
                    <div className="matchups">
                        {renderMatchups}
                    </div>
                </div>
                <div className="selection-cont">
                    {
                        !countdownShow && !simulation
                        ? <div className="selections">
                            {renderSelections}
                        </div>
                        : null
                    }
                    {
                        !countdownShow && !simulation 
                        ? <div className="selection-result">
                            {
                                selectionResult()
                                ?   <>
                                    <h1 style={{color:'#009444'}}>You Win! ₦{matchDetails.totalEarnings}</h1>
                                    <p onClick={()=>window.location.assign('/menu')}>Back to menu page</p>
                                    <p onClick={()=>window.location.assign('/football')} to='/football'>Continue betting</p>
                                    </>
                                :   <>
                                    <h1 style={{color:'crimson'}}>You Lose :(</h1>
                                    <p onClick={()=>window.location.assign('/menu')}>Back to menu page</p>
                                    <p onClick={()=>window.location.assign('/football')}>Continue betting</p>
                                    </>
                            }
                        </div>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}