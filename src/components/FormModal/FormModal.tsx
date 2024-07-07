import { IonButton, IonContent, IonInput, IonModal, IonSelect, IonSelectOption } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import s from './FormModal.module.scss';

const FormModal: React.FC<{isOpen: boolean, setIsOpen: any, form: Persona, setForm: any, agregarPersona : any}> = ({isOpen, setIsOpen, form, setForm, agregarPersona}) => {

    const [selectState, setSelectState] = useState<'come_toma' | 'come' | 'toma'>('come_toma')

    const handleChangeInputNumber = (event: any, field: string) => {
        const { value } = event.target;
        if (value === '' || !isNaN(value)) {
          setForm((prev : any) => ({...prev, [field]: value}))
        }
    };

    const updateSelectForm = () => {
        if(selectState === 'come_toma') setForm((prev: any) => ({...prev, come: true, toma: true}));
        if(selectState === 'come') setForm((prev: any) => ({...prev, come: true, toma: false}));
        if(selectState === 'toma') setForm((prev: any) => ({...prev, come: false, toma: true}));
    }

    const disabledAdd = () => {
        if(form.come && form.toma) return form.gasto_comida === '' || form.gasto_bebida === '' || form.nombre === '';
        if(form.come) return form.gasto_comida === '' || form.nombre === '';
        if(form.toma) return form.gasto_bebida === '' || form.nombre === '';
        return form.nombre === '';
    }

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
                            <IonInput className={s.input_field} value={form.nombre} onIonInput={(e) => setForm((prev : any) => ({...prev, nombre: e.target.value}))} type='text' placeholder='Ingresar nombre'/>
                        </div>
                        {form.come && <div className={s.input}>
                            <span>Gasto en comida</span>
                            <IonInput className={s.input_field} value={form.gasto_comida} onIonInput={(e) => handleChangeInputNumber(e, 'gasto_comida')} type='number' placeholder='Ingresar gasto en comida'/>
                        </div>}
                        {form.toma && <div className={s.input}>
                            <span>Gasto en bebida</span>
                            <IonInput className={s.input_field} value={form.gasto_bebida} onIonInput={(e) => handleChangeInputNumber(e, 'gasto_bebida')} type='number' placeholder='Ingresar gasto en bebida'/>
                        </div>}
                        <div className={s.input}>
                            <span>¿Come y toma?</span>
                            <IonSelect aria-label="come" interface="popover" value={selectState} onIonChange={(e) => {setSelectState(e.detail.value); setForm({...form, gasto_comida: '', gasto_bebida: ''})}} className={s.input_field}>
                                <IonSelectOption value="come_toma">Come y toma</IonSelectOption>
                                <IonSelectOption value="come">Solo come</IonSelectOption>
                                <IonSelectOption value="toma">Solo toma</IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>
                    <IonButton className={s.button} onClick={() => {agregarPersona(); setSelectState('come_toma')}} style={{width: '100%'}} color='light'
                        disabled={disabledAdd()}    
                    >Añadir</IonButton>
                    <IonButton className={s.button} onClick={() => setIsOpen(false)} style={{width: '100%'}} color='light'>Cerrar</IonButton>
                </div>
            </div>
        </IonContent>
    </IonModal>
  )
}

export default FormModal