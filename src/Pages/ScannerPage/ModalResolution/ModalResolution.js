import React from 'react';
import s from './resolution.module.css'

const ModalResolution = (props) => {
    const colorName = props.colors.find(item=>item.color ===  props.choiceTeam.color)
    return (
        <div className={s.wrapper}>
            <div className={s.module}>
            <div className={s.wrapper_module}>
                <div className={s.content}>
                {props.isFinish ? <div>нет мест</div> : <>

                    {props.choiceTeam.isTeamNumber ? <div>
                        <div className={props.choiceTeam.isColor||props.choiceTeam.isTeamName?s.title_number:s.title_number_alone}>Номер вашей команды</div>
                        <div className={props.choiceTeam.isColor||props.choiceTeam.isTeamName?s.number:s.number_alone}>{props.choiceTeam.teamNumber}</div>
                    </div> : <></>}
                    {props.choiceTeam.isColor ? <div>
                        <div className={s.color_title}>Цвет вашей команды</div>
                        <div className={s.color_name}>{colorName.colorNameRu}</div>
                        <div  className={s.color_value} style={{backgroundColor: props.choiceTeam.color, color: props.choiceTeam.color}}>...</div>
                    </div> : <></>}
                    {props.choiceTeam.isTeamName ? <div>
                        <div  className={s.team_name_title} >Название команды</div>
                        <div className={s.team_name}>{props.choiceTeam.teamName}</div>
                    </div> : <></>}
                    {props.isButton?<button onTouchStart={()=>props.nextPlayer()} className={s.btn_next_player}>{!props.isBackResult?'Следующий игрок':'Закрыть'}</button>:<></>}

                </>}
                </div>
            </div>
            </div>
        </div>

    );
};

export default ModalResolution;