import React from 'react';
import s from './choice.module.css'
import Ticket from "./Ticket/Ticket";

const ChoicePage = (props) => {
    return (
        <div className={s.wrapper}>
            {props.tickets.length>0?
            <div>
                {props.tickets.map(ticket=>{
                    return(
                        <>
                            {/*<input type="text" value={}/>*/}
                            <Ticket updateColor={props.updateColor} updateTeamName={props.updateTeamName} timeView={props.timeView} setTimeView={props.setTimeView}
                                    isTime={props.isTime} isButton={props.isButton}
                                    setIsTime={props.setIsTime} setIsButton={props.setIsButton}
                                    updateCount={props.updateCount} colors={props.colors}
                                    startTicket={props.startTicket} ticket={ticket}/>

                        </>
                        )
                })}
            </div>:
                <div>
                    Нет доступных команд
                </div>}
        </div>
    );
};

export default ChoicePage;