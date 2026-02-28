import React, { useState } from 'react';
import { IonContent, IonPage, IonButton, IonIcon, IonFabButton, useIonAlert } from '@ionic/react';
import { add, people, reload } from 'ionicons/icons';
import type { Person, ExpensesResult } from '../../types/person';
import calculateBalances from '../../helpers/expenses';

// Components
import HeaderCustom from '../../components/Header/Header';
import CardPerson from '../../components/CardPerson/CardPerson';
import FormModal from '../../components/FormModal/FormModal';
import ResultsModal from '../../components/ResultsModal/ResultsModal';

import s from './Calculator.module.scss';

const INITIAL_FORM: Person = { name: '', foodExpense: '', drinkExpense: '', drinks: true, eats: true };

const INITIAL_RESULTS: ExpensesResult = {
    foodTransactions: [],
    drinkTransactions: [],
};

const Calculator: React.FC = () => {
    const [presentAlert] = useIonAlert();

    const [resultsOpen, setResultsOpen] = useState<boolean>(false);
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [form, setForm] = useState<Person>(INITIAL_FORM);
    const [people, setPeople] = useState<Person[]>([]);
    const [results, setResults] = useState<ExpensesResult>(INITIAL_RESULTS);

    const addPerson = () => {
        if (people.find(p => p.name === form.name)) {
            alert('Ya existe una persona con ese nombre');
            return;
        }
        setPeople(prev => [...prev, form]);
        setForm(INITIAL_FORM);
        setFormOpen(false);
    };

    const deletePerson = (name: string) => {
        setPeople(prev => prev.filter(p => p.name !== name));
    };

    const calculateExpenses = () => {
        setLoading(true);
        setResultsOpen(true);
        setTimeout(() => {
            setResults(calculateBalances(people));
            setLoading(false);
        }, 1000);
    };

    const confirmReset = () => {
        presentAlert({
            header: 'Iniciar nueva compra',
            subHeader: '¿Desea iniciar una nueva compra?',
            message: 'Esta acción eliminará los registros ya ingresados',
            buttons: [
                { text: 'Iniciar', role: 'confirm', handler: () => setPeople([]) },
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
                    {people.length >= 2 && (
                        <IonButton id='new_buy' color='light' size='small' onClick={confirmReset}>
                            <IonIcon icon={reload} style={{ fontSize: '1rem' }} />
                        </IonButton>
                    )}
                </div>

                <div className={s.container}>
                    <div className={s.persons}>
                        {people.length < 2 && (
                            <div className={s.empty}>
                                <p>Ingrese 2 o más personas para calcular...</p>
                            </div>
                        )}
                        {people.map((p, index) => (
                            <CardPerson key={index} person={p} deletePerson={() => deletePerson(p.name)} />
                        ))}
                    </div>

                    <IonFabButton onClick={() => setFormOpen(true)} color='light' size='small'>
                        <IonIcon icon={add} style={{ fontSize: '1.3rem' }} />
                    </IonFabButton>

                    <div style={{ width: '100%' }}>
                        <button
                            disabled={people.length < 2}
                            className={people.length >= 2 ? s.calcular : s.cacular_dis}
                            onClick={calculateExpenses}
                        >
                            Calcular
                        </button>
                    </div>
                </div>

                <ResultsModal
                    isOpen={resultsOpen}
                    setIsOpen={setResultsOpen}
                    loading={loading}
                    results={results}
                />
                <FormModal
                    isOpen={formOpen}
                    setIsOpen={setFormOpen}
                    form={form}
                    setForm={setForm}
                    addPerson={addPerson}
                />
            </IonContent>
        </IonPage>
    );
};

export default Calculator;
