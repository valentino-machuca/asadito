import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { beer, chevronDown, restaurant, trash } from 'ionicons/icons';
import type { Persona } from '../../types/persona';
import formatearImporte from '../../helpers/formatearImporte';
import s from './CardPerson.module.scss';

interface CardPersonProps {
    person: Persona;
    deletePerson: () => void;
}

const CardPerson: React.FC<CardPersonProps> = ({ person, deletePerson }) => {
    const [openDetail, setOpenDetail] = useState<boolean>(false);

    const monto =
        (Number(person.gasto_bebida) || 0) +
        (Number(person.gasto_comida) || 0);

    return (
        <div className={s.container}>
            <div className={s.info}>
                <div className={s.avatar} onClick={() => setOpenDetail(prev => !prev)}>
                    <IonIcon
                        icon={chevronDown}
                        style={{ marginRight: '10px', rotate: openDetail ? '180deg' : '0deg', transition: '.3s' }}
                    />
                    {person.come && <IonIcon aria-hidden="true" icon={restaurant} className={s.icon} style={{ color: '#555' }} />}
                    {person.toma && <IonIcon aria-hidden="true" icon={beer} className={s.icon} style={{ color: '#555' }} />}
                    <p className={s.nombre}>{person.nombre}</p>
                </div>
                <p className={s.monto}>{formatearImporte(monto)}</p>
                <IonIcon aria-hidden="true" icon={trash} className={s.trash} onClick={deletePerson} />
            </div>
            <div className={`${openDetail ? s.opendetail : ''} ${s.detail}`}>
                <p>Gasto en comida: {formatearImporte(Number(person.gasto_comida))}</p>
                <p>Gasto en bebida: {formatearImporte(Number(person.gasto_bebida))}</p>
            </div>
        </div>
    );
};

export default CardPerson;
