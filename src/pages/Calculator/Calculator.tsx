import { useState } from 'react';

import { IonContent, IonPage } from '@ionic/react';
import { people, person } from 'ionicons/icons';
import s from './Calculator.module.scss';

//Componentes
import HeaderCustom from '../../components/Header/Header';
import CardPerson from '../../components/CardPerson/CardPerson';

const Calculator: React.FC = () => {
  const [form, setForm] = useState({nombre: '', monto: 0})
  const [personas, setPersonas] = useState<{nombre: string, monto: number}[]>([]);

  const addPerson = (persona: any) => {
    let existe = personas.find((p:{nombre: string, monto: number}) => p.nombre === persona.nombre)

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
              <input value={form.monto} onChange={(e) => setForm(prev => ({...prev, monto: Number(e.target.value)}))} type='number' placeholder='Ingresar monto'/>
            </div>
            <button disabled={form.nombre === '' || form.monto === 0} onClick={() => addPerson(form)}>Agregar</button>
          </div>
          <button className={personas.length >= 2 ? s.calcular : s.cacular_dis} onClick={() => alert('calcular')}>Calcular</button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Calculator;
