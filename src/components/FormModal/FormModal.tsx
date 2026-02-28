import { IonButton, IonContent, IonInput, IonModal, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import type { Persona } from '../../types/persona';
import s from './FormModal.module.scss';

type ConsumoSelector = 'come_toma' | 'come' | 'toma';

interface FormModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    form: Persona;
    setForm: React.Dispatch<React.SetStateAction<Persona>>;
    agregarPersona: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, setIsOpen, form, setForm, agregarPersona }) => {
    const [selectState, setSelectState] = useState<ConsumoSelector>('come_toma');

    const handleChangeInputNumber = (event: Event, field: 'gasto_comida' | 'gasto_bebida') => {
        const value = (event.target as HTMLInputElement).value;
        if (value === '' || !isNaN(Number(value))) {
            setForm(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleSelector = (v: ConsumoSelector) => {
        if (v === 'come') setForm(prev => ({ ...prev, gasto_bebida: '' }));
        if (v === 'toma') setForm(prev => ({ ...prev, gasto_comida: '' }));
        setSelectState(v);
    };

    const updateSelectForm = () => {
        if (selectState === 'come_toma') setForm(prev => ({ ...prev, come: true, toma: true }));
        if (selectState === 'come')      setForm(prev => ({ ...prev, come: true, toma: false }));
        if (selectState === 'toma')      setForm(prev => ({ ...prev, come: false, toma: true }));
    };

    const isAddDisabled = (): boolean => {
        if (form.come && form.toma) return form.gasto_comida === '' || form.gasto_bebida === '' || form.nombre === '';
        if (form.come)              return form.gasto_comida === '' || form.nombre === '';
        if (form.toma)              return form.gasto_bebida === '' || form.nombre === '';
        return form.nombre === '';
    };

    useEffect(() => {
        updateSelectForm();
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
                                    value={form.nombre}
                                    onIonInput={(e) => setForm(prev => ({ ...prev, nombre: String(e.target.value ?? '') }))}
                                    type='text'
                                    placeholder='Ingresar nombre'
                                />
                            </div>
                            {form.come && (
                                <div className={s.input}>
                                    <span>Gasto en comida</span>
                                    <IonInput
                                        className={s.input_field}
                                        value={form.gasto_comida}
                                        onIonInput={(e) => handleChangeInputNumber(e as unknown as Event, 'gasto_comida')}
                                        type='number'
                                        placeholder='Ingresar gasto en comida'
                                    />
                                </div>
                            )}
                            {form.toma && (
                                <div className={s.input}>
                                    <span>Gasto en bebida</span>
                                    <IonInput
                                        className={s.input_field}
                                        value={form.gasto_bebida}
                                        onIonInput={(e) => handleChangeInputNumber(e as unknown as Event, 'gasto_bebida')}
                                        type='number'
                                        placeholder='Ingresar gasto en bebida'
                                    />
                                </div>
                            )}
                            <div className={s.input}>
                                <span>¿Come y toma?</span>
                                <IonSelect
                                    aria-label="come"
                                    interface="popover"
                                    value={selectState}
                                    onIonChange={(e) => handleSelector(e.detail.value as ConsumoSelector)}
                                    className={s.input_field}
                                >
                                    <IonSelectOption value="come_toma">Come y toma</IonSelectOption>
                                    <IonSelectOption value="come">Solo come</IonSelectOption>
                                    <IonSelectOption value="toma">Solo toma</IonSelectOption>
                                </IonSelect>
                            </div>
                        </div>
                        <IonButton
                            className={s.button}
                            onClick={() => { agregarPersona(); setSelectState('come_toma'); }}
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
