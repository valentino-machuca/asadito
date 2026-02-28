import React from 'react';
import { IonIcon } from '@ionic/react';
import { pencilOutline } from 'ionicons/icons';
import s from './Matchsticks.module.scss';

interface MatchsticksProps {
    points: number[];
}

const Matchsticks: React.FC<MatchsticksProps> = ({ points }) => {
    return (
        <div className={s.container}>
            {points.includes(1) && <IonIcon aria-hidden="true" icon={pencilOutline} className={s.matchstick1} />}
            {points.includes(2) && <IonIcon aria-hidden="true" icon={pencilOutline} className={s.matchstick2} />}
            {points.includes(3) && <IonIcon aria-hidden="true" icon={pencilOutline} className={s.matchstick3} />}
            {points.includes(4) && <IonIcon aria-hidden="true" icon={pencilOutline} className={s.matchstick4} />}
            {points.includes(5) && <IonIcon aria-hidden="true" icon={pencilOutline} className={s.matchstick5} />}
        </div>
    );
};

export default Matchsticks;
