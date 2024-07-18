import { IonButton, IonContent, IonIcon, IonItem, IonList, IonPage } from '@ionic/react';
import { radioOutline, reload } from 'ionicons/icons';
import s from './Playlists.module.scss';

//Componentes
import HeaderCustom from '../../components/Header/Header';
import useNetwork from '../../hooks/useNetwork';

const playlistsItems = [
  <iframe style={{borderRadius: '12px', border: 'none'}} src="https://open.spotify.com/embed/playlist/37i9dQZF1DX1ToZ44rvfQL?utm_source=generator" width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>,
  <iframe style={{borderRadius: '12px', border: 'none'}} src="https://open.spotify.com/embed/playlist/42rXirU0hxroTS8yO2meXT?utm_source=generator" width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>,
  <iframe style={{borderRadius: '12px', border: 'none'}} src="https://open.spotify.com/embed/playlist/48MSgkY7ZvDNcD7yu4y3kV?utm_source=generator" width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>,
]

const Playlists: React.FC = () => { 

  const network = useNetwork();

  const handleCheckStatus = () => {
    network.getStatus();
  }

  return (
    <IonPage style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#222428'}}>
      <IonContent fullscreen color='dark' style={{maxWidth: '800px'}}>
        <HeaderCustom title='.playlists' icon={radioOutline} isIcon={true}/>
        <div className={s.container}>
          <p>Playlists recomendadas para tu asado!</p>

          {
            network.status ? (
            <IonList style={{backgroundColor: '#222428', width: '100%'}}>
              {
                playlistsItems.map((playlist, index) => (
                  <IonItem color='dark' className={s.ionItem} key={index}>
                    {playlist}
                  </IonItem>
                ))
              }
            </IonList>
            ) : (
              <div className={s.no_internet}>
                <p>Para visualizar las playlists necesitas conexión a internet, por favor revisa tu conexión.</p>
                <IonButton color='light' onClick={() => handleCheckStatus()}>
                  <IonIcon icon={reload}/>
                </IonButton>
              </div>
            )
          }

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Playlists;
