import { IonContent, IonIcon, IonItem, IonList, IonPage } from '@ionic/react';
import { radioOutline } from 'ionicons/icons';
import s from './Playlists.module.scss';

//Componentes
import HeaderCustom from '../../components/Header/Header';

const Playlists: React.FC = () => { 

  return (
    <IonPage style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#222428'}}>
      <IonContent fullscreen color='dark' style={{maxWidth: '800px'}}>
        <HeaderCustom title='.playlists' icon={radioOutline} isIcon={true}/>
        <div className={s.container}>
          <p>Playlists recomendadas para tu asado!</p>

          <IonList style={{backgroundColor: '#222428', width: '90%'}}>
            <iframe style={{borderRadius: '12px' }} src="https://open.spotify.com/embed/playlist/48MSgkY7ZvDNcD7yu4y3kV?utm_source=generator" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

            <iframe style={{borderRadius: '12px', marginTop: '30px' }} src="https://open.spotify.com/embed/playlist/42rXirU0hxroTS8yO2meXT?utm_source=generator" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Playlists;
