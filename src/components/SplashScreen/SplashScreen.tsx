import React from 'react';
import s from './SplashScreen.module.scss';

import icon from '../../../assets/icon-only.png';
import { IonProgressBar } from '@ionic/react';

const SplashScreen = () => {

    return (
        <div className={s.container}>
            <img src={icon} alt="splash_logo"/>
            <IonProgressBar color='dark' type="indeterminate" className={s.progress}></IonProgressBar>
        </div>
    )
}

export default SplashScreen;