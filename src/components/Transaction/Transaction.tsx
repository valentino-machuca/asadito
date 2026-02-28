import React from 'react';
import { IonIcon } from '@ionic/react';
import { chevronForwardCircle } from 'ionicons/icons';
import type { Transaccion } from '../../types/persona';
import formatearImporte from '../../helpers/formatearImporte';
import s from './Transaction.module.scss';

interface TransactionProps {
    result: Transaccion;
    delay: number;
}

const Transaction: React.FC<TransactionProps> = ({ result, delay }) => {
    return (
        <div className={s.container} style={{ animationDelay: `.${2 + delay}s` }}>
            <div className={s.deudor}>
                <p>{result.deudor}</p>
            </div>
            <div className={s.arrow}>
                <IonIcon aria-hidden="true" icon={chevronForwardCircle} style={{ fontSize: '1.5em', color: '#328f4e' }} />
                <p>{formatearImporte(result.monto)}</p>
            </div>
            <div className={s.acreedor}>
                <p>{result.acreedor}</p>
            </div>
        </div>
    );
};

export default Transaction;
