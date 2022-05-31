import React, {useEffect, useState} from 'react';
import colorList from '../../Services/ClolorList'
import s from './scanner.module.css'
import ModalResolution from "./ModalResolution/ModalResolution";
import Footer from "../Static/Footer/Footer";
import back from './../../img/back.svg'
import imgFinger from '../Static/img/finger.svg'
import line from '../Static/img/line.svg'
import ring0 from '../Static/img/ring0.svg'
import ring1 from '../Static/img/ring1.svg'
import ring2 from '../Static/img/ring2.svg'
import ring3 from '../Static/img/ring3.svg'
import ring4 from '../Static/img/ring4.svg'
import a from './scanner_animation.module.css'
import setting_logo from '../Static/img/setting_logo.svg'

const ScannerPage = (props) => {
    const [isModalView, setIsModalView] = useState(false)
    const [currentChoice, setCurrentChoice] = useState(null)
    const [modelTeams, setModelTeams] = useState(null)
    const [isFinish, setIsFinish] = useState(false)
    const [countTouch, setCountTouch] = useState(0)
    const [isBackResult, setIsBackResult] = useState(false)

    const init = ()=>{
        const countPeopleInTeams = Math.floor(props.ticket.countPeople / props.ticket.countTeams)
        let countOtherPeople = props.ticket.countPeople - (props.ticket.countTeams*countPeopleInTeams)
        const teams=[]
        for(let i = 0; i<props.ticket.countTeams; i++){
            let countPeople = countPeopleInTeams
            if(countOtherPeople>0){
                countPeople++
                countOtherPeople-=1
            }
            teams.push(
                {countPeople, isColor:props.ticket.isColor,
                isTeamNumber:props.ticket.isTeamNumber, isTeamName:props.ticket.isTeamName})
            if(props.ticket.isColor){
                teams[i].color = props.ticket.teamsColor[i]
                teams[i].colorNames = colorList[props.ticket.teamsColor[i]]
            }
            if(props.ticket.isTeamName){
                teams[i].teamName = props.ticket.teamsName[i]
            }
            if(props.ticket.isTeamNumber){
                teams[i].teamNumber = i+1
            }
        }
        setModelTeams(teams)
    }
    useEffect(()=>{
        init()
    },[])

    const look=()=>{
        setIsBackResult(true)
        if(!currentChoice)
            return
        setIsModalView(true)
        if(props.isTime){
            setTimeout(()=>{
                setIsModalView(false)
            },props.timeView*1000)
        }

    }
    const choiceLogic=()=>{
        const getRandomInt = (max)=> {
            return Math.floor(Math.random() * max);
        }

        if(modelTeams.length===0){
            setIsFinish(true)
            return
        }
        const count = getRandomInt(modelTeams.length)

        const currentModel = modelTeams.slice()

        setCurrentChoice({...currentModel[count]})
        currentModel[count].countPeople -= 1

        if(currentModel[count].countPeople === 0)
            currentModel.splice(count,1)
        setModelTeams(currentModel.slice())


    }
    const nextPlayer = ()=>{

        setIsModalView(false)
    }
    const viewResult = ()=>{
        setIsBackResult(false)
        choiceLogic()
        setIsModalView(true)
        if (props.isTime){
            setTimeout(()=>{
                setIsModalView(false)
            },props.timeView*1000)
        }
    }
    return (
        <div className={s.wrapper}>
            <img className={s.backImg} src={back} alt=""/>
            <h1 className={s.title}>Team Scanner</h1>

                <>

                    <img onTouchStart={()=>{
                        if(1 + countTouch === 4)
                            props.setBack(true)
                        setCountTouch(1 + countTouch)

                        setTimeout(()=>{
                            setCountTouch(0)
                        },3000)
                    }
                    } className={s.setting_logo} src={setting_logo} alt=""/>
                    <div onTouchStart={()=>{
                        viewResult()
                    }}>
                        <img className={s.finger} src={imgFinger} alt=""/>
                        <img id={a.line_scanner} className={s.line} src={line} alt=""/>
                    </div>
                <img  id={a.ring0} className={s.ring0} src={ring0} alt=""/>
                <img id={a.ring1} className={s.ring1} src={ring1} alt=""/>
                <img  id={a.ring2} className={s.ring2} src={ring2} alt=""/>
                <img id={a.ring3} className={s.ring3} src={ring3} alt=""/>
                <img id={a.ring4} className={s.ring4} src={ring4} alt=""/>


                    {!isModalView?<div className={s.last_result} onClick={()=>look()}>Последний результат</div>:<></>}

                    {isModalView? <ModalResolution nextPlayer={nextPlayer}
                                     isBackResult={isBackResult} isButton={props.isButton}
                                     colors={props.colors} isFinish={isFinish} choiceTeam={currentChoice}/>:<></>}
            </>


                {/*<video  className={s.video_scanner} loop={true} autoPlay={true} src={videoScanner}/>*/}


            {/*{isModalView?<ModalResolution isFinish={isFinish} choiceTeam={currentChoice}/>:<></>}*/}

            {/*<Footer look={look}/>*/}
        </div>
    );
};

export default ScannerPage;