import { IonButton, IonContent, IonInput, IonModal, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import type { Person } from '../../types/person';
import s from './FormModal.module.scss';

type ConsumptionSelector = 'eats_drinks' | 'eats' | 'drinks';

interface FormModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    form: Person;
    setForm: React.Dispatch<React.SetStateAction<Person>>;
    addPerson: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, setIsOpen, form, setForm, addPerson }) => {
    const [selectState, setSelectState] = useState<ConsumptionSelector>('eats_drinks');

    const handleNumberInput = (event: Event, field: 'foodExpense' | 'drinkExpense') => {
        const value = (event.target as HTMLInputElement).value;
        if (value === '' || !isNaN(Number(value))) {
            setForm(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleSelector = (v: ConsumptionSelector) => {
        if (v === 'eats')   setForm(prev => ({ ...prev, drinkExpense: '' }));
        if (v === 'drinks') setForm(prev => ({ ...prev, foodExpense: '' }));
        setSelectState(v);
    };

    const syncFormFlags = () => {
        if (selectState === 'eats_drinks') setForm(prev => ({ ...prev, eats: true,  drinks: true  }));
        if (selectState === 'eats')        setForm(prev => ({ ...prev, eats: true,  drinks: false }));
        if (selectState === 'drinks')      setForm(prev => ({ ...prev, eats: false, drinks: true  }));
    };

    const isAddDisabled = (): boolean => {
        if (form.eats && form.drinks) return form.foodExpense === '' || form.drinkExpense === '' || form.name === '';
        if (form.eats)                return form.foodExpense === '' || form.name === '';
        if (form.drinks)              return form.drinkExpense === '' || form.name === '';
        return form.name === '';
    };

    useEffect(() => {
        syncFormFlags();
    }, [selectState]);

    return (
        <IonModal isOpen={isOpen}>
            <IonContent className='ion-padding' color='dark'>
                <div className={s.modal}>
                    <div className={s.transactions}>
                        <h3>Añadir persona</h3>
                        <div className={s.formulario}>
                            <div className={s.input}>
                                <span>Nombre</span>
                                <IonInput
                                    className={s.input_field}
                                    value={form.name}
                                    onIonInput={(e) => setForm(prev => ({ ...prev, name: String(e.target.value ?? '') }))}
                                    type='text'
                                    placeholder='Ingresar nombre'
                                />
                            </div>
                            {form.eats && (
                                <div className={s.input}>
                                    <span>Gasto en comida</span>
                                    <IonInput
                                        className={s.input_field}
                                        value={form.foodExpense}
                                        onIonInput={(e) => handleNumberInput(e as unknown as Event, 'foodExpense')}
                                        type='number'
                                        placeholder='Ingresar gasto en comida'
                                    />
                                </div>
                            )}
                            {form.drinks && (
                                <div className={s.input}>
                                    <span>Gasto en bebida</span>
                                    <IonInput
                                        className={s.input_field}
                                        value={form.drinkExpense}
                                        onIonInput={(e) => handleNumberInput(e as unknown as Event, 'drinkExpense')}
                                        type='number'
                                        placeholder='Ingresar gasto en bebida'
                                    />
                                </div>
                            )}
                            <div className={s.input}>
                                <span>¿Come y toma?</span>
                                <IonSelect
                                    aria-label="consumption"
                                    interface="popover"
                                    value={selectState}
                                    onIonChange={(e) => handleSelector(e.detail.value as ConsumptionSelector)}
                                    className={s.input_field}
                                >
                                    <IonSelectOption value="eats_drinks">Come y toma</IonSelectOption>
                                    <IonSelectOption value="eats">Solo come</IonSelectOption>
                                    <IonSelectOption value="drinks">Solo toma</IonSelectOption>
                                </IonSelect>
                            </div>
                        </div>
                        <IonButton
                            className={s.button}
                            onClick={() => { addPerson(); setSelectState('eats_drinks'); }}
                            style={{ width: '100%' }}
                            color='light'
                            disabled={isAddDisabled()}
                        >
                            Añadir
                        </IonButton>
                        <IonButton
                            className={s.button}
                            onClick={() => setIsOpen(false)}
                            style={{ width: '100%' }}
                            color='light'
                        >
                            Cerrar
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonModal>
    );
};

export default FormModal;
