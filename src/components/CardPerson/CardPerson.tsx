import React, { useEffect } from 'react';
import s from './CardPerson.module.scss';
import { IonIcon } from '@ionic/react';
import { beer, restaurant, trash } from 'ionicons/icons';
import formatearImporte from '../../helpers/formatearImporte';

const CardPerson: React.FC<{person: Persona, deletePerson: any}> = ({person, deletePerson}) => {
  let monto: number = 0;

  if(Number(person.gasto_bebida)){
    monto = monto + Number(person.gasto_bebida)
  }
  if(parseFloat(person.gasto_comida)){
    monto = monto + Number(person.gasto_comida)
  }

  return (
    <div className={s.container}>
      <div className={s.avatar}>
         {person.come && <IonIcon aria-hidden="true" icon={restaurant} className={s.icon} style={{color: '#848785'}}/>}
         {person.toma && <IonIcon aria-hidden="true" icon={beer} className={s.icon} style={{color: '#f2ae27'}}/>}
         <p className={s.nombre}>{person.nombre}</p>
      </div>
      <p className={s.monto}>{formatearImporte(monto)}</p>
      <IonIcon aria-hidden="true" icon={trash} className={s.trash} onClick={() => deletePerson()}/>
    </div>
  )
}

export default CardPerson