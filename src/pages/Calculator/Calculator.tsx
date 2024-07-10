import React, { useState } from 'react';

import { IonContent, IonModal, IonPage, IonButton, IonProgressBar, IonIcon, IonFabButton, useIonAlert } from '@ionic/react';
import { add, people, reload } from 'ionicons/icons';
import s from './Calculator.module.scss';

//Componentes
import HeaderCustom from '../../components/Header/Header';
import CardPerson from '../../components/CardPerson/CardPerson';
import calcularSaldos from '../../helpers/cuentas';
import Transaction from '../../components/Transaction/Transaction';
import FormModal from '../../components/FormModal/FormModal';

const Calculator: React.FC = () => {
  const [presentAlert] = useIonAlert();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [form, setForm] = useState<Persona>({nombre: '', gasto_comida: '', gasto_bebida: '', toma: true, come: true});
  const [personas, setPersonas] = useState<Persona[]>([]);

  const [results, setResults] = useState<{
    transacciones_comida: any[],
    transacciones_bebida: any[],
  }>({
    transacciones_comida: [],
    transacciones_bebida: [],
  });

  const agregarPersona = () => {
    if(personas.find((p: Persona) => p.nombre === form.nombre)){
      alert("Ya existe una persona con ese nombre");
    }else{
      setPersonas((prev: Persona[]) => [...prev, form])
      setForm({nombre: '', gasto_comida: '', gasto_bebida: '', toma: true, come: true});
      setModalOpen(false);
    }
  }

  const deletePerson = (nombre: string) => {
    let personasFiltered = personas.filter((p: Persona) => p.nombre !== nombre);
    setPersonas([...personasFiltered]);
  }

  const calcularCuentas = () => {
    setLoading(true);
    setIsOpen(true)
    setTimeout(() => {
      setResults(calcularSaldos(personas));
      setLoading(false);
    }, 1000);
  };

  return (
    <IonPage style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#222428'}}>
      <IonContent fullscreen color='dark' style={{maxWidth: '800px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '20px'}}>
          <div style={{width: '95%'}}>
            <HeaderCustom icon={people} title='.cuentas' isIcon={true}/>
          </div>
          {personas.length >=2 && <IonButton id='new_buy' color='light' size='small'
            onClick={() =>
              presentAlert({
                header: 'Iniciar nueva compra',
                subHeader: '¿Desea iniciar una nueva compra?',
                message: 'Esta acción eliminará los registros ya ingresados',
                buttons:[
                  { text: 'iniciar', role: 'confirm', handler: () => setPersonas([]) },
                  { text: 'Cancelar', role: 'cancel'},
                ],
              })
            }
          ><IonIcon icon={reload} style={{fontSize: '1.5em'}}/></IonButton>}
        </div>

        <div className={s.container}>
          <div className={s.persons}>
            {personas.length < 2 && <div className={s.empty}>
              <p>Ingrese 2 o más personas para calcular...</p>
            </div>}
            {
              <>
                {personas.map((p, index) => {
                  return <CardPerson key={index} person={p} deletePerson={() => deletePerson(p.nombre)}/>
                })}
              </>
            }
          </div>
          <IonFabButton onClick={() => setModalOpen(true)} color='light' size='small'>
            <IonIcon icon={add} style={{fontSize: '1.5em'}}/>
          </IonFabButton>
          <div style={{height: '7vh', width: '100%'}}>
            <button disabled={personas.length < 2} className={personas.length >= 2 ? s.calcular : s.cacular_dis}
                    onClick={() => calcularCuentas()}>Calcular
            </button>
          </div>
        </div>
        <ModalResultados isOpen={isOpen} setIsOpen={setIsOpen} loading={loading} results={results}/>
        <FormModal isOpen={modalOpen} setIsOpen={setModalOpen} form={form} setForm={setForm} agregarPersona={agregarPersona}/>  
      </IonContent>
    </IonPage>
  );
};

const ModalResultados : React.FC<{
  isOpen: boolean, 
  setIsOpen: any,
  loading: boolean, 
  results: { transacciones_comida: any[], transacciones_bebida: any[]
  }}> = ({isOpen, setIsOpen, loading, results}) => {

  return(
    <IonModal isOpen={isOpen}>
    <IonContent className='ion-padding' color='dark'>
      <div className={s.modal}>
        <div className={s.transactions}>
        
          <h3>Transacciones para la comida 🥩</h3>
          <div style={{maxHeight: '35vh', overflowY: 'scroll'}}>
            {
              loading ? <IonProgressBar type="indeterminate" color='light' ></IonProgressBar> :
              results.transacciones_comida.length ? <>
                {
                  results.transacciones_comida.map((r, i) => (
                    <Transaction key={i} result={r} delay={i}/>
                  ))
                }
              </> : <p>Cuentas de comida al día ✔️</p>
            }
            </div>
          
            <h3 style={{marginTop: '40px'}}>Transacciones para la bebida 🍺</h3>
            <div style={{maxHeight: '35vh', overflowY: 'scroll'}}>
              {
                loading ? <IonProgressBar type="indeterminate" color='light'></IonProgressBar> :
                results.transacciones_bebida.length ? <>
                  {
                    results.transacciones_bebida.map((r, i) => (
                      <Transaction key={i} result={r} delay={i}/>
                    ))
                  }
                </> : <p>Cuentas de bebida al día ✔️</p>
              }
            </div>
        </div>
        <IonButton onClick={() => setIsOpen(false)} style={{width: '100%'}} color='light'>Cerrar</IonButton>
      </div>
    </IonContent>
  </IonModal>
  )
}

export default Calculator;
