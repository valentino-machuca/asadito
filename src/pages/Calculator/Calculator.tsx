import { useState } from 'react';

import { IonContent, IonModal, IonPage, IonButton, IonProgressBar, IonIcon, IonFabButton } from '@ionic/react';
import { add, people } from 'ionicons/icons';
import s from './Calculator.module.scss';

//Componentes
import HeaderCustom from '../../components/Header/Header';
import CardPerson from '../../components/CardPerson/CardPerson';
import calcularSaldos from '../../helpers/cuentas';
import Transaction from '../../components/Transaction/Transaction';
import FormModal from '../../components/FormModal/FormModal';

const Calculator: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<Persona>({nombre: '', gasto_comida: '', gasto_bebida: '', toma: true, come: true});
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [results, setResults] = useState<any[]>([]);

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
    <IonPage>
      <IonContent fullscreen color='dark'>
        <HeaderCustom title='.cuentas' icon={people}/>

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
            <IonFabButton onClick={() => setModalOpen(true)} color='light' size='small'>
              <IonIcon icon={add} style={{fontSize: '1.5em'}}/>
            </IonFabButton>
          </div>
          <button disabled={personas.length < 2} className={personas.length >= 2 ? s.calcular : s.cacular_dis} onClick={() => calcularCuentas()}>Calcular</button>
        </div>
        <IonModal isOpen={isOpen}>
          <IonContent className='ion-padding' color='dark'>
            <div className={s.modal}>
              <div className={s.transactions}>
              <h3>Resultados</h3>
                {
                  loading ? <IonProgressBar type="indeterminate" color='light'></IonProgressBar> :
                  results.length ? <>
                    {
                      results.map((r, i) => (
                        <Transaction key={i} result={r} delay={i}/>
                      ))
                    }
                  </> : <p>Cuentas al día</p>
                }
              </div>
              <IonButton onClick={() => setIsOpen(false)} style={{width: '100%'}} color='light'>Cerrar</IonButton>
            </div>
          </IonContent>
        </IonModal>
        <FormModal isOpen={modalOpen} setIsOpen={setModalOpen} form={form} setForm={setForm} agregarPersona={agregarPersona}/>
      </IonContent>
    </IonPage>
  );
};

export default Calculator;
