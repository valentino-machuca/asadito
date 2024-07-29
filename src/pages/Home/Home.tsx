import { IonContent, IonIcon, IonPage } from '@ionic/react';
import {bonfire, cafe, cart, logoLinkedin, logoVercel, mail, people, radioOutline, restaurant} from 'ionicons/icons';
import s from './Home.module.scss';

// Capacitor plugin
import { Browser } from '@capacitor/browser';

// Componentes
import HeaderCustom from '../../components/Header/Header';

// Router
import { useHistory } from 'react-router';

const Home: React.FC = () => {

  return (
    <IonPage style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#222428'}}>
      <IonContent fullscreen color='dark' style={{maxWidth: '800px'}}>
          <HeaderCustom title='.asadito' icon={restaurant} isIcon={false}/>
          <div className={s.container}>
            <Features/>
            <div>
              <Support/>
              <Contact/>
            </div>
          </div>
      </IonContent>
    </IonPage>
  );
};

const Support = () => {
  const openSite = async (url_site: string) => {
    await Browser.open({url: url_site});
  };

  return (
      <div className={s.support}>
        <h3>Apoya al creador</h3>
        <div className={s.link} onClick={() => openSite('https://cafecito.app/valentino_dev')}>
          <p>Invitar un café</p>
          <IonIcon icon={cafe} style={{fontSize: '14pt'}}/>
        </div>
      </div>
  )
}

const Features = () => {

  const history = useHistory();

  const navigate = (url: string) => {
    history.push(url);
  };

  return (
      <div className={s.features}>
          <h3>Herramientas!</h3>
          <div className={s.feat} onClick={() => navigate('/cuentas')}>
              <IonIcon icon={people} style={{fontSize: '14pt', marginRight: '8px'}}/>
              <p>Divisor de compras</p>
          </div>

          <div className={s.feat} onClick={() => navigate('/anotador')}>
              <IonIcon icon={bonfire} style={{fontSize: '14pt', marginRight: '8px'}}/>
              <p>Anotador de truco</p>
          </div>

          <div className={s.feat} onClick={() => navigate('/compras')}>
              <IonIcon icon={cart} style={{fontSize: '14pt', marginRight: '8px'}}/>
              <p>Compras</p>
          </div>

          <div className={s.feat} onClick={() => navigate('/playlists')}>
              <IonIcon icon={radioOutline} style={{fontSize: '14pt', marginRight: '8px'}}/>
              <p>Playlists</p>
          </div>
      </div>
  )
}

const Contact = () => {
    const openSite = async (url_site: string) => {
        await Browser.open({url: url_site});
    };

    return (
        <div className={s.features}>
          <h3>Contacto y Soporte</h3>
          <div className={s.feat} style={{width: '80%', justifyContent: 'space-between'}}>
            <p>valentinomachuca.dev@gmail.com</p>
            <IonIcon icon={mail} style={{fontSize: '1.3rem'}}/>
          </div>
          <div className={s.feat} style={{width: '15%', display: 'flex', justifyContent: 'center'}}
              onClick={() => openSite('https://www.linkedin.com/in/valentino-machuca/')}>
            <IonIcon icon={logoLinkedin} style={{fontSize: '1.3rem'}}/>
          </div>
      </div>
  )
}

export default Home;
