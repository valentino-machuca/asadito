import React from 'react';
import s from './Fosforos.module.scss';
import { pencilOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const Fosforos: React.FC<{puntos: Array<number>}> = ({puntos}) => {
  return (
    <div className={s.container}>
      {puntos.includes(1) ? <IonIcon aria-hidden="true" icon={pencilOutline} className={s.fosforo1}/> : <></>}
      {puntos.includes(2) ? <IonIcon aria-hidden="true" icon={pencilOutline} className={s.fosforo2}/> : <></>}
      {puntos.includes(3) ? <IonIcon aria-hidden="true" icon={pencilOutline} className={s.fosforo3}/> : <></>}
      {puntos.includes(4) ? <IonIcon aria-hidden="true" icon={pencilOutline} className={s.fosforo4}/> : <></>}
      {puntos.includes(5) ? <IonIcon aria-hidden="true" icon={pencilOutline} className={s.fosforo5}/> : <></>}
    </div>
  )
}

export default Fosforos