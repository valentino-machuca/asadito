import React from 'react';
import { IonButton, IonContent, IonModal, IonProgressBar } from '@ionic/react';
import type { ExpensesResult } from '../../types/person';
import Transaction from '../Transaction/Transaction';
import s from '../../pages/Calculator/Calculator.module.scss';

interface ResultsModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    loading: boolean;
    results: ExpensesResult;
}

/**
 * Modal that displays the expense calculation results.
 * Shows food and drink transactions independently.
 */
const ResultsModal: React.FC<ResultsModalProps> = ({ isOpen, setIsOpen, loading, results }) => {
    return (
        <IonModal isOpen={isOpen}>
            <IonContent className='ion-padding' color='dark'>
                <div className={s.modal}>
                    <div className={s.transactions}>

                        <h3>Transacciones para la comida 🥩</h3>
                        <div style={{ maxHeight: '35vh', overflowY: 'scroll' }}>
                            {loading
                                ? <IonProgressBar type="indeterminate" color='light' />
                                : results.foodTransactions.length
                                    ? results.foodTransactions.map((r, i) => (
                                        <Transaction key={i} result={r} delay={i} />
                                    ))
                                    : <p>Cuentas al día ✔️</p>
                            }
                        </div>

                        <h3 style={{ marginTop: '40px' }}>Transacciones para la bebida 🍺</h3>
                        <div style={{ maxHeight: '35vh', overflowY: 'scroll' }}>
                            {loading
                                ? <IonProgressBar type="indeterminate" color='light' />
                                : results.drinkTransactions.length
                                    ? results.drinkTransactions.map((r, i) => (
                                        <Transaction key={i} result={r} delay={i} />
                                    ))
                                    : <p>Cuentas al día ✔️</p>
                            }
                        </div>
                    </div>

                    <IonButton onClick={() => setIsOpen(false)} style={{ width: '100%' }} color='light'>
                        Cerrar
                    </IonButton>
                </div>
            </IonContent>
        </IonModal>
    );
};

export default ResultsModal;
