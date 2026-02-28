import React from 'react';
import { IonButton, IonContent, IonModal, IonProgressBar } from '@ionic/react';
import type { SaldosResult } from '../../types/persona';
import Transaction from '../Transaction/Transaction';
import s from '../../pages/Calculator/Calculator.module.scss';

interface ModalResultadosProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    loading: boolean;
    results: SaldosResult;
}

/**
 * Modal que muestra el resultado del cálculo de cuentas.
 * Presenta por separado las transacciones de comida y bebida.
 */
const ModalResultados: React.FC<ModalResultadosProps> = ({ isOpen, setIsOpen, loading, results }) => {
    return (
        <IonModal isOpen={isOpen}>
            <IonContent className='ion-padding' color='dark'>
                <div className={s.modal}>
                    <div className={s.transactions}>

                        <h3>Transacciones para la comida 🥩</h3>
                        <div style={{ maxHeight: '35vh', overflowY: 'scroll' }}>
                            {loading
                                ? <IonProgressBar type="indeterminate" color='light' />
                                : results.transacciones_comida.length
                                    ? results.transacciones_comida.map((r, i) => (
                                        <Transaction key={i} result={r} delay={i} />
                                    ))
                                    : <p>Cuentas al día ✔️</p>
                            }
                        </div>

                        <h3 style={{ marginTop: '40px' }}>Transacciones para la bebida 🍺</h3>
                        <div style={{ maxHeight: '35vh', overflowY: 'scroll' }}>
                            {loading
                                ? <IonProgressBar type="indeterminate" color='light' />
                                : results.transacciones_bebida.length
                                    ? results.transacciones_bebida.map((r, i) => (
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

export default ModalResultados;
