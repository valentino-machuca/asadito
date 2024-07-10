import { IonContent, IonIcon, IonPage } from '@ionic/react';
import {bonfire, cafe, logoLinkedin, logoVercel, mail, people, restaurant} from 'ionicons/icons';
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
  return (
      <div className={s.support}>
        <h3>Apoya al creador</h3>
        <div className={s.link} style={{opacity: .7}}>
          <p>Invitar un café</p>
          <IonIcon icon={cafe} style={{fontSize: '1.2em'}}/>
        </div>
        <div className={s.link} style={{opacity: .7}}>
          <p>Ver un anuncio</p>
          <IonIcon icon={logoVercel} style={{fontSize: '1.2em'}}/>
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
          <IonIcon icon={people} style={{fontSize: '1.2em'}}/>
          <p>Divisor de compras</p>
        </div>

        <div className={s.feat} onClick={() => navigate('/anotador')}>
          <IonIcon icon={bonfire} style={{fontSize: '1.2em'}}/>
          <p>Anotador de truco</p>
        </div>

        <p style={{fontSize: '.8em'}}>Próximamente más features...</p>
      </div>
  )
}

const Contact = () => {
  const openSite = async (url_site: string) => {
    await Browser.open({ url: url_site });
  };

  return (
      <div className={s.features}>
        <h3>Contacto y Soporte</h3>
        <div className={s.feat} style={{width: '80%'}}>
          <p>valentinomachuca.dev@gmail.com</p>
          <IonIcon icon={mail} style={{fontSize: '1.5em'}}/>
        </div>
        <div className={s.feat} style={{width: '15%'}}
             onClick={() => openSite('https://www.linkedin.com/in/valentino-machuca/')}>
          <IonIcon icon={logoLinkedin} style={{fontSize: '1.5em'}}/>
        </div>
      </div>
  )
}

export default Home;
