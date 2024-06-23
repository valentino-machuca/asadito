import React from 'react';
import s from './CardPerson.module.scss';
import { IonIcon } from '@ionic/react';
import { person as personIcon, trash } from 'ionicons/icons';
import formatearImporte from '../../helpers/formatearImporte';

const CardPerson: React.FC<{person: any, deletePerson: any}> = ({person, deletePerson}) => {
  return (
    <div className={s.container}>
      <div className={s.avatar}>
         <IonIcon aria-hidden="true" icon={personIcon}/>
         <p className={s.nombre}>{person.nombre}</p>
      </div>
      <p className={s.monto}>{formatearImporte(person.monto)}</p>
      <IonIcon aria-hidden="true" icon={trash} className={s.trash} onClick={() => deletePerson()}/>
    </div>
  )
}

export default CardPerson