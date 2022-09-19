import { useContext, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { UserVerification } from "../functions/User-verification"
import '../styles/css/Horse-racing.css'
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RandomNumber } from "../functions/Random-number"
import { Link } from "react-router-dom"
import { Valuables } from "../App"
import { Loading } from "../components/Loading"

const intlFormat = new Intl.NumberFormat('en-US')
export function HorseRacing () {
    UserVerification()
    const {user, guestCash} = useContext(Valuables)
    const [loading, setLoading] = useState(true)
    const [singlePlacement, setSinglePlacement] = useState(false)
    const [overallPlacement, setOverallPlacement] = useState(false)
    const [confirmBet, setConfirmBet] = useState('confirm-bet-close')
    const [stake, setStake] = useState(100)
    
    const [singleHorse, setSingleHorse] = useState({horse : '', odds : 0})
    
    const max = 3.5
    const min = 2.2
    const [horseList, setHorseList] = useState([
        { name : 'Bolt', number : 1, odds : RandomNumber(min, max).toFixed(2) },
        { name : 'Henry', number : 2, odds : RandomNumber(min, max).toFixed(2) },
        { name : 'Gus', number : 3, odds : RandomNumber(min, max).toFixed(2) },
        { name : 'Julius', number : 4, odds : RandomNumber(min, max).toFixed(2) }
    ])
    const [overallHorse1, setOverallHorse1] = useState({ name : 'Bolt', position : 1, number : 1 })
    const [overallHorse2, setOverallHorse2] = useState({ name : 'Henry', position : 1, number : 2 })
    const [overallHorse3, setOverallHorse3] = useState({ name : 'Gus', position : 1, number : 3 })
    const [overallHorse4, setOverallHorse4] = useState({ name : 'Julius', position : 1, number : 4 })
    
    const overallHorseList = [overallHorse1, overallHorse2, overallHorse3, overallHorse4]
    const overallSelection = [...overallHorseList].sort((a,b) => a.position - b.position)
    
    useEffect(()=>{
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])

    function singleNext () {
        if (singleHorse.horse.length < 1) return alert('Please select a horse to place a bet')
        setConfirmBet('confirm-bet-open')
    }

    function overallNext () {
        if (
            overallHorse1.position === overallHorse2.position ||
            overallHorse1.position === overallHorse3.position ||
            overallHorse1.position === overallHorse4.position ||
            overallHorse2.position === overallHorse3.position ||
            overallHorse2.position === overallHorse4.position ||
            overallHorse3.position === overallHorse4.position
        ) return alert('Please select different positions for all horses')

        setConfirmBet('confirm-bet-open')
    }

    function ConfirmModalSingle () {
        const totalEarnings = intlFormat.format(stake * Number(singleHorse.odds))
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
                            <h3>{singleHorse.odds}</h3>
                        </div>
                        <div className="total-win">
                            <h2>Total earnings :</h2>
                            <h2 style={{color : 'rgb(31, 168, 31)'}}>₦{totalEarnings}</h2>
                        </div>
                    </div>
                    {
                        stake > user?.user.cash || stake > guestCash?.cash
                        ? <button className="place-bet-inactive">Place Bet</button>
                        :   <Link style={{margin:'0 auto'}} to='/race-result' state={{singleHorse, horseList, totalEarnings, stake}} >
                                <button className="place-bet">Place Bet</button>
                            </Link>
                    }
                </div>
            </div>
        )
    }

    function ConfirmModalOverall () {
        const totalEarnings = intlFormat.format(stake * 10)
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
                            <h3>10.00</h3>
                        </div>
                        <div className="total-win">
                            <h2>Total earnings :</h2>
                            <h2 style={{color : 'rgb(31, 168, 31)'}}>₦{totalEarnings}</h2>
                        </div>
                    </div>
                    {
                        stake > user?.user.cash || stake > guestCash?.cash
                        ? <button className="place-bet-inactive">Place Bet</button>
                        : <Link style={{margin:'0 auto'}} to='/race-result-overall' state={{overallSelection, overallHorseList, totalEarnings, stake}} >
                            <button className="place-bet">Place Bet</button>
                        </Link>
                    }
                </div>
            </div>
        )
    }

    function Bet () {
        if (singlePlacement) {
            return (
                <div style={{position : 'relative'}}>
                    <div className="single-placement">
                        <div className="single-placement-cont">
                            <h1>Place bets on a particular horse you think would win the race</h1>
                            <div className="horse-bets">
                                <motion.label whileHover={{ scale: 1.05 }} htmlFor="horse-1" className="horse-select">
                                    <div>
                                        <img src="images/horse 1.jpg" alt="horse" />
                                        <p>Meet <b>Bolt</b>. Pound for pound the fastest horse on the track, hence the name 'BOLT'. Undoubtedly a winner's pick</p>
                                        <span>Odds: {horseList[0].odds}</span>
                                        <input type='radio' name='horse-radio' id="horse-1" checked={singleHorse.horse === 'horse-1'} onChange={(e) => setSingleHorse({ horse: 'horse-1', odds: horseList[0].odds })} />
                                    </div>
                                </motion.label>

                                <motion.label whileHover={{ scale: 1.05 }} htmlFor="horse-2" className="horse-select">
                                    <div>
                                        <img src="images/horse 2.jpg" alt="horse" />
                                        <p>Meet <b>Henry</b>. The oldest but also, the most experienced horse on the roster. Knows the racetrack more than any horse. A classic pick</p>
                                        <span>Odds: {horseList[1].odds}</span>
                                        <input type='radio' name='horse-radio' id="horse-2" checked={singleHorse.horse === 'horse-2'} onChange={(e) => setSingleHorse({ horse: 'horse-2', odds: horseList[1].odds })} />
                                    </div>
                                </motion.label>

                                <motion.label whileHover={{ scale: 1.05 }} htmlFor="horse-3" className="horse-select">
                                    <div>
                                        <img src="images/horse 3.jpg" alt="horse" />
                                        <p>Meet <b>Gus</b>. The most competitive horse yet. He is always up for a challenge and will always give you your money's worth.</p>
                                        <span>Odds: {horseList[2].odds}</span>
                                        <input type='radio' name='horse-radio' id="horse-3" checked={singleHorse.horse === 'horse-3'} onChange={(e) => setSingleHorse({ horse: 'horse-3', odds: horseList[2].odds })} />
                                    </div>
                                </motion.label>

                                <motion.label whileHover={{ scale: 1.05 }} htmlFor="horse-4" className="horse-select">
                                    <div>
                                        <img src="images/horse 4.jpg" alt="horse" />
                                        <p>Meet <b>Julius</b>. Beautiful and elegant but also precise and accurate.Graces the track with such finesse and evades obstacles with precision.An exquisite pick </p>
                                        <span>Odds: {horseList[3].odds}</span>
                                        <input type='radio' name='horse-radio' id="horse-4" checked={singleHorse.horse === 'horse-4'} onChange={(e) => setSingleHorse({ horse: 'horse-4', odds: horseList[3].odds })} />
                                    </div>
                                </motion.label>
                            </div>
                            <div className="options">
                                <button onClick={() => setSinglePlacement(false)}>Back</button>
                                <button onClick={singleNext}>Next</button>
                            </div>
                        </div>
                    </div>
                    
                    <ConfirmModalSingle/>
                </div>
            )
        }
        else if (overallPlacement) {
            return (
                <div style={{position : 'relative'}}>
                    <div className="single-placement">
                        <div className="single-placement-cont">
                            <h1>Place bets on specific positions you think horses would take</h1>
                            <div className="horse-bets">
                                <div className="horse-select">
                                    <div>
                                        <img src="images/horse 1.jpg" alt="horse" />
                                        <p>Meet <b>Bolt</b>. Pound for pound the fastest horse on the track, hence the name 'BOLT'. Undoubtedly a winner's pick</p>
                                        <select value={overallHorse1.position} onChange={(e)=>setOverallHorse1({name : 'Bolt', position : Number(e.target.value), number : 1})} id='Bolt'>
                                            <option value={1}>1st</option>
                                            <option value={2}>2nd</option>
                                            <option value={3}>3rd</option>
                                            <option value={4}>4th</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="horse-select">
                                    <div>
                                        <img src="images/horse 2.jpg" alt="horse" />
                                        <p>Meet <b>Henry</b>. The oldest but also, the most experienced horse on the roster. Knows the racetrack more than any horse. A classic pick</p>
                                        <select value={overallHorse2.position} onChange={(e)=>setOverallHorse2({name : 'Henry', position : Number(e.target.value), number : 2})} id='Henry'>
                                            <option value={1}>1st</option>
                                            <option value={2}>2nd</option>
                                            <option value={3}>3rd</option>
                                            <option value={4}>4th</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="horse-select">
                                    <div>
                                        <img src="images/horse 3.jpg" alt="horse" />
                                        <p>Meet <b>Gus</b>. The most competitive horse yet. He is always up for a challenge and will always give you your money's worth.</p>
                                        <select value={overallHorse3.position} onChange={(e)=>setOverallHorse3({name : 'Gus', position : Number(e.target.value), number : 3})} id='Gus'>
                                            <option value={1}>1st</option>
                                            <option value={2}>2nd</option>
                                            <option value={3}>3rd</option>
                                            <option value={4}>4th</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="horse-select">
                                    <div>
                                        <img src="images/horse 4.jpg" alt="horse" />
                                        <p>Meet <b>Julius</b>. Beautiful and elegant but also precise and accurate.Graces the track with such finesse and evades obstacles with precision.An exquisite pick </p>
                                        <select value={overallHorse4.position} onChange={(e)=>setOverallHorse4({name : 'Julius', position : Number(e.target.value), number : 4})} id='Julius'>
                                            <option value={1}>1st</option>
                                            <option value={2}>2nd</option>
                                            <option value={3}>3rd</option>
                                            <option value={4}>4th</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="options">
                                <button onClick={() => setOverallPlacement(false)}>Back</button>
                                <button onClick={overallNext}>Next</button>
                            </div>
                        </div>
                    </div>

                    <ConfirmModalOverall/>
                </div>
            )
        }
    }

    return (
        <>
            {
                loading
                && <Loading/>
            }
            <div className="horse-racing-page">
                {
                    !singlePlacement && !overallPlacement
                    ? <div className="racing-cont">
                        <div className="head">
                            <h1><u>Welcome to Steve Bet virtual Horse Racing</u></h1>
                            <p>To play, place bets on positions you think horses would place in the race</p>
                            <p>You can either bet on the winner of a single race or the overall placement of each horse in the race</p>
                            <p>Betting on just the winner has less returns but betting on the overall placement has MASSIVE returns</p>
                            <h2>LET'S RACE !!!</h2>
                        </div>
                        <div className="horse-bet-type">
                            <button onClick={()=>{
                                setSinglePlacement(true)
                                setOverallPlacement(false)
                                setLoading(true)
                                setTimeout(()=>{
                                    setLoading(false)
                                }, 3000)
                            }}>Bet on single placement</button>
                            <button onClick={()=>{
                                setSinglePlacement(false)
                                setOverallPlacement(true)
                                setLoading(true)
                                setTimeout(()=>{
                                    setLoading(false)
                                }, 3000)
                            }}>Bet on overall placement</button>
                        </div>
                    </div>
                    : <Bet/>
                }
            </div>
        </>
    )
}