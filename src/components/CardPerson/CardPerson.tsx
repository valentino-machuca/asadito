import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { beer, chevronDown, restaurant, trash } from 'ionicons/icons';
import type { Person } from '../../types/person';
import formatCurrency from '../../helpers/formatCurrency';
import s from './CardPerson.module.scss';

interface CardPersonProps {
    person: Person;
    deletePerson: () => void;
}

const CardPerson: React.FC<CardPersonProps> = ({ person, deletePerson }) => {
    const [openDetail, setOpenDetail] = useState<boolean>(false);

    const total =
        (Number(person.drinkExpense) || 0) +
        (Number(person.foodExpense) || 0);

    return (
        <div className={s.container}>
            <div className={s.info}>
                <div className={s.avatar} onClick={() => setOpenDetail(prev => !prev)}>
                    <IonIcon
                        icon={chevronDown}
                        style={{ marginRight: '10px', rotate: openDetail ? '180deg' : '0deg', transition: '.3s' }}
                    />
                    {person.eats   && <IonIcon aria-hidden="true" icon={restaurant} className={s.icon} style={{ color: '#555' }} />}
                    {person.drinks && <IonIcon aria-hidden="true" icon={beer}       className={s.icon} style={{ color: '#555' }} />}
                    <p className={s.nombre}>{person.name}</p>
                </div>
                <p className={s.monto}>{formatCurrency(total)}</p>
                <IonIcon aria-hidden="true" icon={trash} className={s.trash} onClick={deletePerson} />
            </div>
            <div className={`${openDetail ? s.opendetail : ''} ${s.detail}`}>
                <p>Gasto en comida: {formatCurrency(Number(person.foodExpense))}</p>
                <p>Gasto en bebida: {formatCurrency(Number(person.drinkExpense))}</p>
            </div>
        </div>
    );
};

export default CardPerson;
