import React from 'react';
import { IonIcon } from '@ionic/react';
import { chevronForwardCircle } from 'ionicons/icons';
import type { Transfer } from '../../types/person';
import formatCurrency from '../../helpers/formatCurrency';
import s from './Transaction.module.scss';

interface TransactionProps {
    result: Transfer;
    delay: number;
}

const Transaction: React.FC<TransactionProps> = ({ result, delay }) => {
    return (
        <div className={s.container} style={{ animationDelay: `.${2 + delay}s` }}>
            <div className={s.deudor}>
                <p>{result.debtor}</p>
            </div>
            <div className={s.arrow}>
                <IonIcon aria-hidden="true" icon={chevronForwardCircle} style={{ fontSize: '1.5em', color: '#328f4e' }} />
                <p>{formatCurrency(result.amount)}</p>
            </div>
            <div className={s.acreedor}>
                <p>{result.creditor}</p>
            </div>
        </div>
    );
};

export default Transaction;
