import React, {useEffect, useState} from 'react';
import s from './ticket.module.css'


const Ticket = (props) => {
    const [isVisibleButtonStart, setIsVisibleButtonStart] = useState(true)
    useEffect(()=>{
        setIsVisibleButtonStart(true)
        if ((props.ticket.teamsColor.length!==props.ticket.countTeams) && props.ticket.isColor )
            setIsVisibleButtonStart(false)
        props.ticket.teamsName.forEach(item=>{
            if(!item){
                setIsVisibleButtonStart(false)
            }
        })
    })
    return (
        <div className={s.ticket}>
        <div className={s.wrapper}>

            <div className={s.title}>{props.ticket.title}</div>

            <div className={s.description}>
                <div className={s.part}>
                    <span className={s.title_field}>Количество людей</span>
                    <br/>
                    <div  className={s.wrapper_input_box}>
                        <button className={s.btn_add_time} onClick={
                            ()=>  props.updateCount(props.ticket.id, props.ticket.countPeople-1, 'people')
                        }>-</button>
                        <input className={s.input_box} onChange={(e)=>{
                            props.updateCount(props.ticket.id, e.target.value, 'people')
                        }} value={ props.ticket.countPeople}/>
                        <button className={s.btn_add_time} onClick={
                            ()=>  props.updateCount(props.ticket.id, 1 + props.ticket.countPeople, 'people')
                        }>+</button>
                    </div>
                </div>

                <div className={s.part}>
                    <span className={s.title_field}>Количество команд</span>

                    <div  className={s.wrapper_input_box}>
                        <button className={s.btn_add_time} onClick={
                            ()=>  props.updateCount(props.ticket.id, props.ticket.countTeams-1, 'team')
                        }>-</button>
                        <input className={s.input_box} onChange={(e)=>{
                            props.updateCount(props.ticket.id, e.target.value, 'team')
                        }}  value={props.ticket.countTeams}/>
                        <button className={s.btn_add_time} onClick={
                            ()=>  props.updateCount(props.ticket.id, 1 + props.ticket.countTeams, 'team')
                        }>+</button>
                </div>
                </div>

                {props.ticket.teamsName.length > 0 ? <>
                    <span className={s.title_field}>Название команд</span>
                    <table className={s.list_field_teamname}>
                        <tbody>
                        {props.ticket.teamsName.map((teamName, index) => {

                            return (
                                <tr key={'teams_' + index}>
                                    <td>{index+1})</td>
                                    <td className={s.td_value}><input onChange={(e)=>{
                                        props.updateTeamName('updateName',props.ticket.id, index, e.target.value)
                                    }} className={s.input_box} type="text" value={teamName}/></td>
                                </tr>
                            )
                        })}
                        {/*{props.ticket.teamsName.length < Number(props.ticket.countTeams)?*/}
                        {/*    <tr key={'teams_new'}>*/}
                        {/*        <td>{props.ticket.teamsName.length +1})</td>*/}
                        {/*        <td className={s.td_value}><input onChange={(e)=>{*/}
                        {/*            props.updateTeamName('updateName',props.ticket.id, index, e.target.value)*/}
                        {/*        }} className={s.input_box} type="text" value={''}/></td>*/}
                        {/*    </tr>*/}
                        {/*}*/}
                        </tbody>
                    </table>
                </> : <></>}

                {props.ticket.isColor? <>
                    <span  className={s.title_field}>Цвета команд</span>
                    <div className={s.title_field} style={props.ticket.teamsColor.length!==props.ticket.countTeams?{color:'red'}:{}}>Выбрано {props.ticket.teamsColor.length} из {props.ticket.countTeams}</div>
                    <table className={s.list_field}>
                        <tbody>
                        {props.colors.map((color, index) => {
                            let currentColor = false
                            props.ticket.teamsColor.forEach(colorTeam=>{
                                if(color.color === colorTeam){
                                    currentColor = true
                                }
                            })
                            return (
                                <tr key={'color_' + index}>
                                    <td>{index+1})</td>
                                    <td><input onChange={(e)=>{props.updateColor(props.ticket.id, color.color, e.target.checked)}} type="checkbox" checked={currentColor}/></td>
                                    <td>{color.colorNameRu}</td>
                                    <td style={{backgroundColor: color.color, width: '50px'}}></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                </> : <></>}
                <div className={s.wrapper_settings}>
                    <div className={s.wrapper_check_setting}>
                <input className={s.check_box} checked={props.isTime} onChange={e=> {
                    props.setIsTime(e.target.checked)
                    props.setIsButton(!e.target.checked)
                }} type={'checkbox'}/><span>По времени</span>

                <input className={s.check_box} checked={props.isButton} onChange={e=> {
                    props.setIsButton(e.target.checked)
                    props.setIsTime(!e.target.checked)
                }} type={'checkbox'}/><span>По кнопке</span>
                    </div>
                {props.isTime?
                    <div className={s.wrapper_input_box}>
                        <div>Укажите время (в секундах)</div>
                        <button className={s.btn_add_time} onClick={()=>props.setTimeView(props.timeView-1)}>-</button>
                        <input className={s.input_box} value={props.timeView} onChange={e=>props.setTimeView(e.target.value)} type={'text'}/>
                        <button className={s.btn_add_time} onClick={()=>props.setTimeView(1+props.timeView)}>+</button>
                    </div>:<></>}
                </div>
            </div>


            { isVisibleButtonStart?<button className={s.btn_start} onClick={()=>{
                        props.startTicket(props.ticket.id)
                    }}>Запустить</button>:<></>}



        </div>
        </div>
    );
};

export default Ticket;