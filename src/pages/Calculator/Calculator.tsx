import React, { useState } from 'react';
import { IonContent, IonPage, IonButton, IonIcon, IonFabButton, useIonAlert } from '@ionic/react';
import { add, people, reload } from 'ionicons/icons';
import type { Persona, SaldosResult } from '../../types/persona';
import calcularSaldos from '../../helpers/cuentas';

// Componentes
import HeaderCustom from '../../components/Header/Header';
import CardPerson from '../../components/CardPerson/CardPerson';
import Transaction from '../../components/Transaction/Transaction';
import FormModal from '../../components/FormModal/FormModal';
import ModalResultados from '../../components/ModalResultados/ModalResultados';

import s from './Calculator.module.scss';

const FORM_INICIAL: Persona = { nombre: '', gasto_comida: '', gasto_bebida: '', toma: true, come: true };

const RESULTS_INICIAL: SaldosResult = {
    transacciones_comida: [],
    transacciones_bebida: [],
};

const Calculator: React.FC = () => {
    const [presentAlert] = useIonAlert();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [form, setForm] = useState<Persona>(FORM_INICIAL);
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [results, setResults] = useState<SaldosResult>(RESULTS_INICIAL);

    const agregarPersona = () => {
        if (personas.find(p => p.nombre === form.nombre)) {
            alert('Ya existe una persona con ese nombre');
            return;
        }
        setPersonas(prev => [...prev, form]);
        setForm(FORM_INICIAL);
        setModalOpen(false);
    };

    const deletePerson = (nombre: string) => {
        setPersonas(prev => prev.filter(p => p.nombre !== nombre));
    };

    const calcularCuentas = () => {
        setLoading(true);
        setIsOpen(true);
        setTimeout(() => {
            setResults(calcularSaldos(personas));
            setLoading(false);
        }, 1000);
    };

    const confirmarNuevaCompra = () => {
        presentAlert({
            header: 'Iniciar nueva compra',
            subHeader: '¿Desea iniciar una nueva compra?',
            message: 'Esta acción eliminará los registros ya ingresados',
            buttons: [
                { text: 'Iniciar', role: 'confirm', handler: () => setPersonas([]) },
                { text: 'Cancelar', role: 'cancel' },
            ],
        });
    };

    return (
        <IonPage style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#222428' }}>
            <IonContent fullscreen color='dark' style={{ maxWidth: '800px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '20px' }}>
                    <div style={{ width: '95%' }}>
                        <HeaderCustom icon={people} title='.cuentas' isIcon={true} />
                    </div>
                    {personas.length >= 2 && (
                        <IonButton id='new_buy' color='light' size='small' onClick={confirmarNuevaCompra}>
                            <IonIcon icon={reload} style={{ fontSize: '1rem' }} />
                        </IonButton>
                    )}
                </div>

                <div className={s.container}>
                    <div className={s.persons}>
                        {personas.length < 2 && (
                            <div className={s.empty}>
                                <p>Ingrese 2 o más personas para calcular...</p>
                            </div>
                        )}
                        {personas.map((p, index) => (
                            <CardPerson key={index} person={p} deletePerson={() => deletePerson(p.nombre)} />
                        ))}
                    </div>

                    <IonFabButton onClick={() => setModalOpen(true)} color='light' size='small'>
                        <IonIcon icon={add} style={{ fontSize: '1.3rem' }} />
                    </IonFabButton>

                    <div style={{ width: '100%' }}>
                        <button
                            disabled={personas.length < 2}
                            className={personas.length >= 2 ? s.calcular : s.cacular_dis}
                            onClick={calcularCuentas}
                        >
                            Calcular
                        </button>
                    </div>
                </div>

                <ModalResultados
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    loading={loading}
                    results={results}
                />
                <FormModal
                    isOpen={modalOpen}
                    setIsOpen={setModalOpen}
                    form={form}
                    setForm={setForm}
                    agregarPersona={agregarPersona}
                />
            </IonContent>
        </IonPage>
    );
};

export default Calculator;
