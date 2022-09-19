import { createContext, useEffect, useReducer, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { BetMenu } from './pages/Bet-menu';
import { Home } from './pages/Home';
import { NotFound } from './pages/Not-found';
import { SignInPage } from './pages/Sign-in';
import axios from 'axios'
import './styles/css/App.css'
import { Deposit } from './pages/Deposit';
import { HorseRacing } from './pages/Horse-racing';
import { Football } from './pages/Football';
import { RaceResult } from './pages/Race-result';
import { RaceResultOverall } from './pages/Race-result-overall';
import { MatchSim } from './pages/Match-simulation';

export const Valuables = createContext()
const token = sessionStorage.getItem('token')

function getGuestCash () {
  let cash = sessionStorage.getItem('guestCash')
  if (!cash) return 1000
  return Number(cash)
}
function App() {
  const [user, setUser] = useState()
  const [guestCash, dispatch] = useReducer(reducer, {
    cash : getGuestCash()
  })

  function reducer (state, action) {
    switch (action.type) {
      case 'update guest cash':
        sessionStorage.setItem('guestCash', action.payload)
        return {
          cash : getGuestCash()
        }
      default:
        return state
    }
  }

  useEffect(()=>{
    async function getUser () {
      await axios.get('https://steve-betting-app.herokuapp.com/app/user', {
        headers : { 'authorization' : `Bearer ${JSON.parse(token)}` }
      }).then(res => setUser(res.data)).catch(err => {return})
    }
    getUser()
  },[])

  return (
    <Valuables.Provider value={{user, guestCash, dispatch}}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sign-in' element={<SignInPage/>} />
        <Route path='/menu' element={<BetMenu/>} />
        <Route path='/deposit' element={<Deposit/>} />
        <Route path='/horse-racing' element={<HorseRacing/>} />
        <Route path='/football' element={<Football/>} />
        <Route path='/race-result' element={<RaceResult/>} />
        <Route path='/race-result-overall' element={<RaceResultOverall/>} />
        <Route path='/match-sim' element={<MatchSim/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Valuables.Provider>
  );
}

export default App;
