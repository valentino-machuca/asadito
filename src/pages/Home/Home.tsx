import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { bonfire, cafe, logoVercel, people, restaurant } from 'ionicons/icons';
import s from './Home.module.scss';

// Capacitor plugin
import { Browser } from '@capacitor/browser';

//Componentes
import HeaderCustom from '../../components/Header/Header';
import { useHistory } from 'react-router';

const Home: React.FC = () => {

  const history = useHistory();

  const navigate = (url: string) => {
    history.push(url);
  };


const openSite = async (url_site: string) => {
  await Browser.open({ url: url_site });
};

  return (
    <IonPage>
      <IonContent fullscreen color='dark'>
          <HeaderCustom title='.asadito' icon={restaurant}/>
          <div className={s.container}>
            <div className={s.features}>
              <h3>Herramientas!</h3>
              <div className={s.feat} onClick={() => navigate('/cuentas')}>
                <IonIcon icon={people} style={{fontSize: '1.2em'}}/>
                <p>Divisor de compras</p>
              </div>

              <div className={s.feat} onClick={() => navigate('/anotador')}>
                <IonIcon icon={bonfire} style={{fontSize: '1.2em'}}/>
                <p>Anotador de truco</p>
              </div>

              <p style={{fontSize: '.8em'}}>Proximamente más features...</p>
            </div>
            <div className={s.support}>
              <h3>Apoya al creador!</h3>
              <div className={s.link} style={{opacity: .7}}>
                <p>Invitame un café (Próximamente)</p>
                <IonIcon icon={cafe} style={{fontSize: '1.2em'}}/>
              </div>
              <div className={s.link} style={{opacity: .7}}>
                <p>Patreon (Próximamente)</p>
                <IonIcon icon={logoVercel} style={{fontSize: '1.2em'}}/>
              </div>
            </div>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
