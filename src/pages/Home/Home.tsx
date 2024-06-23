import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { restaurant } from 'ionicons/icons';
import s from './Home.module.scss';

//Componentes
import HeaderCustom from '../../components/Header/Header';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen color='dark'>
          <HeaderCustom title='.asadito' icon={restaurant}/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
