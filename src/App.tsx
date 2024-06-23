import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { bonfireOutline, homeOutline, peopleOutline } from 'ionicons/icons';

// Componentes
import Home from './pages/Home/Home';
import Calculator from './pages/Calculator/Calculator';
import Tab3 from './pages/Anotador/Anotador';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Anotador from './pages/Anotador/Anotador';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/cuentas">
            <Calculator />
          </Route>
          <Route path="/anotador">
            <Anotador />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color='dark'>
          <IonTabButton tab="tab1" href="/">
            <IonIcon aria-hidden="true" icon={homeOutline} />
            <IonLabel>Inicio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/cuentas">
            <IonIcon aria-hidden="true" icon={peopleOutline} />
            <IonLabel>Cuentas</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/anotador">
            <IonIcon aria-hidden="true" icon={bonfireOutline} />
            <IonLabel>Anotador de truco</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
