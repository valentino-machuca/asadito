import { useState } from 'react';

import { IonContent, IonModal, IonPage, IonButton, IonProgressBar } from '@ionic/react';
import { people } from 'ionicons/icons';
import s from './Calculator.module.scss';

//Componentes
import HeaderCustom from '../../components/Header/Header';
import CardPerson from '../../components/CardPerson/CardPerson';
import calcularSaldos from '../../helpers/cuentas';
import Transaction from '../../components/Transaction/Transaction';

const Calculator: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState({nombre: '', monto: ''});
  const [personas, setPersonas] = useState<{nombre: string, monto: string}[]>([]);
  const [results, setResults] = useState<any[]>([]);

  const addPerson = (persona: any) => {
    let existe = personas.find((p:{nombre: string, monto: string}) => p.nombre === persona.nombre)

    if(existe){
      alert("Ya existe una persona con ese nombre");
    }else{
      setPersonas((prev: any) => [...prev, persona])
    }
  }

  const deletePerson = (nombre: string) => {
    let personasFiltered = personas.filter((p) => p.nombre !== nombre);
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

  const handleChangeInputNumber = (event: any) => {
    const { value } = event.target;
    if (value === '' || !isNaN(value)) {
      setForm(prev => ({...prev, monto: value}))
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen color='dark'>
        <HeaderCustom title='.cuentas' icon={people}/>

        <div className={s.container}>
          <div className={s.persons}>
            {
              personas.length ? <>
                {personas.map((p, index) => {
                  return <CardPerson key={index} person={p} deletePerson={() => deletePerson(p.nombre)}/>
                })}
              </> :
              <div className={s.empty}>
                  <p>Ingrese 2 o más personas para calcular...</p>
              </div>
            }
          </div>
          <div className={s.formulario}>
            <div className={s.input}>
              <span>Nombre</span>
              <input value={form.nombre} onChange={(e) => setForm(prev => ({...prev, nombre: e.target.value}))} type='text' placeholder='Ingresar nombre'/>
            </div>
            <div className={s.input}>
              <span>Monto</span>
              <input value={form.monto} onChange={(e) => handleChangeInputNumber(e)} type='number' placeholder='Ingresar monto'/>
            </div>
            <button disabled={form.nombre === '' || Number(form.monto) === 0} onClick={() => addPerson(form)}>Agregar</button>
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
      </IonContent>
    </IonPage>
  );
};

export default Calculator;
