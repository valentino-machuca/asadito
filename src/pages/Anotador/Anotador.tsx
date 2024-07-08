import { IonAlert, IonContent, IonIcon, IonPage, useIonToast } from '@ionic/react';
import { addOutline, bonfire, reloadOutline, removeOutline } from 'ionicons/icons';
import s from './Anotador.module.scss';

//Componentes
import HeaderCustom from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import Fosforos from '../../components/Fosforos/Fosforos';

//Helpers
import { addPoint, deletePoint } from '../../helpers/trucoPoints';

const Anotador: React.FC = () => { 
  const [equipo1, setEquipo1] = useState([]);
  const [equipo2, setEquipo2] = useState([]);

  const [present] = useIonToast();

  const presentToast = (position: 'top' | 'middle' | 'bottom', winner: string) => {
    present({
      message: `${winner} ha ganado! Paliza atroz, sobrados.`,
      duration: 3000,
      position: position,
    });
  };

  function addPointTeam(equipo: any, setEquipo: any): any{
    if(equipo1.flat().length === 30 || equipo2.flat().length === 30) return;

    let array = [...equipo];
    setEquipo(addPoint(array));

    if(equipo1.flat().length === 30) presentToast('bottom', 'Nuestro equipo')
    if(equipo2.flat().length === 30) presentToast('bottom', 'El equipo de ellos')
  }

  function deletePointTeam(equipo: any, setEquipo: any): any{
    let array = [...equipo];
    setEquipo(deletePoint(array));
  }

  function restartGame(){
    setEquipo1([]);
    setEquipo2([]);
  }

  return (
    <IonPage style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#222428'}}>
      <IonContent fullscreen color='dark' style={{maxWidth: '800px'}}>
        <HeaderCustom title='.anotador' icon={bonfire}/>

        <div className={s.container}>
          <div className={s.equipo_1}>
            <h3>Nosotros</h3>
            <div className={s.fosforos} onClick={() => addPointTeam(equipo1, setEquipo1)}>
              {
                equipo1.map(p => (<Fosforos puntos={p}/>))
              }
            </div>
            <div className={s.botones}>
              <IonIcon aria-hidden="true" icon={removeOutline} onClick={() => deletePointTeam(equipo1, setEquipo1)} className={s.button}/>
              <IonIcon aria-hidden="true" icon={addOutline} onClick={() => addPointTeam(equipo1, setEquipo1)} className={s.button}/>
            </div>
          </div>
          <div className={s.equipo_2}>
            <h3>Ellos</h3>
            <div className={s.fosforos} onClick={() => addPointTeam(equipo2, setEquipo2)}>
              {
                equipo2.map(p => (<Fosforos puntos={p}/>))
              }
            </div>
            <div className={s.botones}>
              <IonIcon aria-hidden="true" icon={removeOutline} onClick={() => deletePointTeam(equipo2, setEquipo2)} className={s.button}/>
              <IonIcon aria-hidden="true" icon={addOutline} onClick={() => addPointTeam(equipo2, setEquipo2)} className={s.button}/>
            </div>
          </div>
        </div>

        <div className={s.newgame}>
          <div className={s.button} id='new-game'>
            Nueva partida
          </div>
        </div>
        <IonAlert
          header="Nueva partida"
          message="¿Estás seguro que quieres iniciar una nueva partida?"
          trigger="new-game"
          buttons={[
            {
              text: 'Iniciar',
              role: 'confirm',
              handler: () => {
                restartGame();
              },
            },
            { text: 'Aún no', role: 'cancel'},
          ]}
          onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default Anotador;
