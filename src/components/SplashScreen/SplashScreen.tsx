import React from 'react';
import s from './SplashScreen.module.scss';

import icon from '../../../assets/icon-only.png';

const SplashScreen = () => {

    return (
        <div className={s.container}>
            <img src={icon} alt="splash_logo"/>
        </div>
    )
}

export default SplashScreen;