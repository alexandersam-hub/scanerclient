import React from 'react';
import s from './footer.module.css'
import logo from '../img/logo.svg'
import record from '../record.png'

const Footer = (props) => {
    return (
        <div className={s.wrapper}>
            <div className={s.logo}><img src={logo} alt=""/></div>
            <div onClick={()=>{
                props.look()
            }} className={s.record}><img src={record} alt=""/></div>
        </div>
    );
};

export default Footer;