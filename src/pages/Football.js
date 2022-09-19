import { useContext, useEffect, useState } from "react"
import { RandomNumber } from "../functions/Random-number"
import { UserVerification } from "../functions/User-verification"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { Valuables } from "../App"
import { Link } from "react-router-dom"
import '../styles/css/Football.css'
const teams = require('../data/teams.json')

const intlFormat = new Intl.NumberFormat('en-US')
export function Football () {
    UserVerification()
    sessionStorage.setItem('betPlaced', 0)
    const { user, guestCash } = useContext(Valuables)
    const [randomTeamsList, setRandomTeamsList] = useState([...teams])
    const [matchupArray, setMatchupArray] = useState([])
    const [betSelections, setBetSelections] = useState([])
    const [confirmBet, setConfirmBet] = useState('confirm-bet-close')
    const [stake, setStake] = useState(100)
    const [totalOdds, setTotalOdds] = useState(0)

    useEffect(()=>{
        setRandomTeamsList(prevList => prevList.sort(()=>0.5 - Math.random()))
        function matchups () {
            const dummyRandomArray = randomTeamsList
            while (dummyRandomArray.length > 0) {
                let team1odds = 0
                let team2odds = 0
                let drawOdds = 0
                let team1Score = 0
                let team2Score = 0
                if (dummyRandomArray[0].strength < dummyRandomArray[1].strength) {
                    if (Math.abs(dummyRandomArray[0].strength - dummyRandomArray[1].strength) === 1) {
                        team1odds = RandomNumber(1.8, 2.1).toFixed(2)
                        team2odds = RandomNumber(2.0, 2.3).toFixed(2)
                        drawOdds = RandomNumber(2.2, 2.5).toFixed(2)
                        team1Score = Math.floor(RandomNumber(0, 4))
                        team2Score = Math.floor(RandomNumber(0, 4))
                    }
                    else if (Math.abs(dummyRandomArray[0].strength - dummyRandomArray[1].strength) === 2) {
                        team1odds = RandomNumber(1.5, 1.8).toFixed(2)
                        team2odds = RandomNumber(2.2, 2.5).toFixed(2)
                        drawOdds = RandomNumber(2.5, 2.8).toFixed(2)
                        team1Score = Math.floor(RandomNumber(0, 5))
                        team2Score = Math.floor(RandomNumber(0, 3))
                    }
                    else if (Math.abs(dummyRandomArray[0].strength - dummyRandomArray[1].strength) === 3) {
                        team1odds = RandomNumber(1.2, 1.5).toFixed(2)
                        team2odds = RandomNumber(2.7, 3.0).toFixed(2)
                        drawOdds = RandomNumber(3.0, 3.5).toFixed(2)
                        team1Score = Math.floor(RandomNumber(0, 5))
                        team2Score = Math.floor(RandomNumber(0, 3))
                    }
                }
                else if (dummyRandomArray[0].strength > dummyRandomArray[1].strength) {
                    if (Math.abs(dummyRandomArray[0].strength - dummyRandomArray[1].strength) === 1) {
                        team2odds = RandomNumber(1.8, 2.1).toFixed(2)
                        team1odds = RandomNumber(2.0, 2.3).toFixed(2)
                        drawOdds = RandomNumber(2.2, 2.5).toFixed(2)
                        team2Score = Math.floor(RandomNumber(0, 4))
                        team1Score = Math.floor(RandomNumber(0, 3))
                    }
                    else if (Math.abs(dummyRandomArray[0].strength - dummyRandomArray[1].strength) === 2) {
                        team2odds = RandomNumber(1.5, 1.8).toFixed(2)
                        team1odds = RandomNumber(2.2, 2.5).toFixed(2)
                        drawOdds = RandomNumber(2.5, 2.8).toFixed(2)
                        team2Score = Math.floor(RandomNumber(0, 5))
                        team1Score = Math.floor(RandomNumber(0, 3))
                    }
                    else if (Math.abs(dummyRandomArray[0].strength - dummyRandomArray[1].strength) === 3) {
                        team2odds = RandomNumber(1.2, 1.5).toFixed(2)
                        team1odds = RandomNumber(2.7, 3.0).toFixed(2)
                        drawOdds = RandomNumber(3.0, 3.5).toFixed(2)
                        team2Score = Math.floor(RandomNumber(0, 5))
                        team1Score = Math.floor(RandomNumber(0, 3))
                    }
                }
                else if (dummyRandomArray[0].strength === dummyRandomArray[1].strength) {
                    team1odds = RandomNumber(2.2, 2.5).toFixed(2)
                    team2odds = RandomNumber(2.4, 2.6).toFixed(2)
                    drawOdds = RandomNumber(2.0, 2.29).toFixed(2)
                    team1Score = Math.floor(RandomNumber(0, 3))
                    team2Score = Math.floor(RandomNumber(0, 3))
                }
                let matchupObject = {team1 : dummyRandomArray[0], team2 : dummyRandomArray[1], team1odds, team2odds, drawOdds, team1Score, team2Score, selected : ''}
                dummyRandomArray.splice(0,2)
                setMatchupArray(prevArray => [...prevArray, matchupObject])
            }
        }
        matchups()
    }, [randomTeamsList])


    function handleSelection (selection, sName) {
        let dummy = matchupArray
        let index = dummy.findIndex((element)=>{
            return element.team1.shortName === sName
        })
        if (dummy[index].selected === selection) {
            dummy[index].selected = ''
            setMatchupArray(prevArray => [...dummy])
        }else{
            dummy[index].selected = selection
            setMatchupArray(prevArray => [...dummy])
        }

        let dummySelection = []
        matchupArray.forEach(element => {
            if (element.selected.length > 1) {
                dummySelection.push(element)
            }
        })
        setBetSelections(dummySelection)

    }

    function ConfirmModalSingle () {
        const totalEarnings = intlFormat.format(stake * totalOdds)
        return (
            <div className={confirmBet}>
                <div className="confirm-bet-cont">
                    <div className="head">
                        <h3>Select amount you wish to stake</h3>
                        <FontAwesomeIcon onClick={()=>setConfirmBet('confirm-bet-close')} style={{fontSize : '2.4rem', cursor : 'pointer'}} icon={faTimes}/>
                    </div>
                    <div className="body">
                        <div className="input-cont">
                            <button onClick={()=>setStake(prevStake => prevStake > 50 ? prevStake - 50 : prevStake)}>- ₦50</button>
                            <input type='number' readOnly value={stake} onChange={(e)=>setStake(Number(e.target.value))} />
                            <button onClick={()=>setStake(prevStake => prevStake + 50)}>+ ₦50</button>
                        </div>
                        <div className="price-ranges">
                            <button onClick={()=>setStake(prevStake => prevStake + 100)}>₦100</button>
                            <button onClick={()=>setStake(prevStake => prevStake + 200)}>₦200</button>
                            <button onClick={()=>setStake(prevStake => prevStake + 500)}>₦500</button>
                            <button onClick={()=>setStake(prevStake => prevStake + 1000)}>₦1000</button>
                        </div>
                    </div>
                    <div className="odds-win">
                        <div className="total-odds">
                            <h3>Total odds : </h3>
                            <h3>{totalOdds}</h3>
                        </div>
                        <div className="total-win">
                            <h2>Total earnings :</h2>
                            <h2 style={{color : 'rgb(31, 168, 31)'}}>₦{totalEarnings}</h2>
                        </div>
                    </div>
                    {
                        stake > user?.user.cash || stake > guestCash?.cash
                        ? <button className="place-bet-inactive">Place Bet</button>
                        :   <Link style={{margin:'0 auto'}} to='/match-sim' state={{totalEarnings, stake, matchupArray, betSelections, totalOdds}}>
                                <button className="place-bet">Place Bet</button>
                            </Link>
                    }
                </div>
            </div>
        )
    }

    function next () {
        let add = 0
        betSelections.forEach(element => {
            if (element.selected === 'team1') {
                add += Number(element.team1odds)
            }
            else if (element.selected === 'team2') {
                add += Number(element.team2odds)
            }else if (element.selected === 'draw') {
                add += Number(element.drawOdds)
            }
        })
        setTotalOdds(add.toFixed(2))
        if (add < 1) {
            return alert('Bets must be selected')
        }
        setConfirmBet('confirm-bet-open')
    }
    
    const teamsRender = matchupArray.map(matchup => {
        return (
            <div key={matchup.team1.name} className="team">
                <div className="team-name">{matchup.team1.name} - {matchup.team2.name}</div>
                <div className="odd-select">
                    <motion.button whileTap={{scale : 1.1}} className={matchup.selected === 'team1' ? 'selected-odd' : 'odds'} onClick={()=>handleSelection('team1', matchup.team1.shortName)}>{matchup.team1odds}</motion.button>
                    <motion.button whileTap={{scale : 1.1}} className={matchup.selected === 'draw' ? 'selected-odd' : 'odds'} onClick={()=>handleSelection('draw', matchup.team1.shortName)}>{matchup.drawOdds}</motion.button>
                    <motion.button whileTap={{scale : 1.1}} className={matchup.selected === 'team2' ? 'selected-odd' : 'odds'} onClick={()=>handleSelection('team2', matchup.team1.shortName)}>{matchup.team2odds}</motion.button>
                </div>
            </div>
        )
    })
    return (
        <div className="football-page">
            <div className="football-cont">
                <div className="teams">
                    {teamsRender}
                </div>

                <button className="next" onClick={next}>Next</button>
            </div>
            <ConfirmModalSingle/>
        </div>
    )
}