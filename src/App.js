
import NavBar from "./Pages/Static/NavBar/NavBar";
import s from './App.module.css'
import {useEffect, useState} from "react";
import teamState from "./State/teamState";
import ScannerPage from "./Pages/ScannerPage/ScannerPage";
import Loader from "./Pages/Static/Loader/Loader";
import ChoicePage from "./Pages/ChoicePage/ChoicePage";

function App() {
    const [tickets, setTickets] = useState([])
    const [activeTicket, setActiveTicket] = useState(null)
    const [isLoad, setIsLoad] = useState(false)
    const [isErrorLoad, setIsErrorLoad] = useState(false)
    const [colors, setColors] = useState([])
    const [isTime, setIsTime] = useState(true)
    const [isButton, setIsButton] = useState(false)
    const [timeView, setTimeView] = useState(3)

    const init= async ()=>{
        setIsLoad(false)
        const res = await teamState.getData()
        const resColor =  await teamState.getColors()
        if(res.warning || resColor.warning){
            setIsErrorLoad(true)
        }
        else{
            setTickets(res.tickets)
            setColors(resColor.colors)
        }
        // console.log(res)
        setIsLoad(true)
    }
    const startTicket= (id)=>{
        const ticket = tickets.find(t=>t.id === id)
        setActiveTicket(ticket)
    }

    const updateColor = (id, color, value)=>{
        const newTickets = []
        tickets.forEach(item=>{
            if(id === item.id){
                if (value){
                    item.teamsColor.push(color)
                }
                else{
                    item.teamsColor =   item.teamsColor.filter(c=>c!==color)
                }
            }
                newTickets.push(item)
        })
        setTickets(newTickets)
    }

    const setBack = (value)=>{
        setActiveTicket(null)
    }
    const updateCount = (id, count, type)=>{
        // console.log(id, count, type)
        const teams = []

        tickets.forEach(item=>{
            if(item.id === id){
                if(type==='team'){
                    if(item.isTeamName){
                        if(Number(count)>item.teamsName.length){
                            for(let i= 0; i<=count-item.teamsName.length;i++){
                                item.teamsName.push('')
                            }
                        }else if(Number(count)<item.teamsName.length){
                            item.teamsName.splice( item.teamsName.length -(item.teamsName.length-count) ,item.teamsName.length - count )
                        }
                    }

                    item.countTeams = count

                    teams.push(item)
                }
                else{
                    item.countPeople = count
                    teams.push(item)
                }

            }else{
                teams.push(item)
            }
        })
        // console.log('teams', teams)
        setTickets(teams)
    }
    const updateTeamName = (type, id, index, value)=>{
        // const ticketUpdate = tickets.find(item=>item.id === id)
        // ticketUpdate.teamsName[index] = value
        // setTickets(tickets)
        const newTeamList = []
        tickets.forEach(item=>{
            if(item.id === id){
                if(type === 'updateName')
                    item.teamsName[index] = value
            }
            newTeamList.push(item)

        })
       setTickets(newTeamList)
    }

    useEffect(()=>{
        init()
    },[])
    if(isLoad && !isErrorLoad){
        return (
            <div className={s.wrapper}>
                {/*<NavBar/>*/}
                    <div className={s.content}>
                        {activeTicket!==null?
                            <ScannerPage setBack={setBack} timeView={timeView} isTime={isTime} isButton={isButton} ticket={activeTicket} colors={colors} />:
                            <ChoicePage updateColor={updateColor} updateTeamName={updateTeamName} timeView={timeView} setTimeView={setTimeView}
                                        isTime={isTime} isButton={isButton} setIsTime={setIsTime}
                                        setIsButton={setIsButton} updateCount={updateCount} colors={colors}
                                        startTicket={startTicket} tickets={tickets}/>
                        }
                    </div>


            </div>
        );
    }
    else if(isErrorLoad){
        return (
            <>

                    <h1>Сервер не доступен</h1>

            </>
        );
    }
    else {
        return (
            <div className={s.wrapper}>
                <div className={s.content}>
                    <Loader/>
                </div>
            </div>
        );
    }

}

export default App;
