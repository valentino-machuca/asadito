import React, { useEffect, useState } from 'react';
import s from './CardPerson.module.scss';
import { IonIcon, IonReorder } from '@ionic/react';
import { beer, restaurant, trash } from 'ionicons/icons';
import formatearImporte from '../../helpers/formatearImporte';

const CardPerson: React.FC<{person: Persona, deletePerson: any}> = ({person, deletePerson}) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  let monto: number = 0;

  if(Number(person.gasto_bebida)){
    monto = monto + Number(person.gasto_bebida)
  }
  if(parseFloat(person.gasto_comida)){
    monto = monto + Number(person.gasto_comida)
  }

  return (
    <div className={s.container}>
      <div className={s.info}>
        <div className={s.avatar} onClick={() => setOpenDetail(prev => !prev)}>
          {person.come && <IonIcon aria-hidden="true" icon={restaurant} className={s.icon} style={{color: '#848785'}}/>}
          {person.toma && <IonIcon aria-hidden="true" icon={beer} className={s.icon} style={{color: '#f2ae27'}}/>}
          <p className={s.nombre}>{person.nombre}</p>
        </div>
        <p className={s.monto}>{formatearImporte(monto)}</p>
        <IonIcon aria-hidden="true" icon={trash} className={s.trash} onClick={() => deletePerson()}/>
      </div>
      <div className={`${openDetail ? s.opendetail : ''} ${s.detail}`}>
        <p>Gasto en comida: {formatearImporte(Number(person.gasto_comida))}</p>
        <p>Gasto en bebida: {formatearImporte(Number(person.gasto_bebida))}</p>
      </div>
    </div>
  )
}

export default CardPerson