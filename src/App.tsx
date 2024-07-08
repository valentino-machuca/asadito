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
import React, {useEffect, useState} from "react";
import SplashScreen from "./components/SplashScreen/SplashScreen";


setupIonicReact();

const App: React.FC = () => {
  const [splashScreen, setSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplashScreen(false)
    }, 2500)
  }, []);

  return (
      <IonApp>
        {splashScreen && <SplashScreen/>}
        <IonReactRouter>
          <IonTabs >
            <IonRouterOutlet>
              <Redirect exact path="/" to="/home" />
              <Route path="/home" render={() => <Home/>} exact={true} />
              <Route path="/cuentas" render={() => <Calculator />} exact={true} />
              <Route path="/anotador" render={() => <Anotador />} exact={true} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom" color='dark'>
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={homeOutline} />
                <IonLabel>Inicio</IonLabel>
              </IonTabButton>

              <IonTabButton tab="cuentas" href="/cuentas">
                <IonIcon icon={peopleOutline} />
                <IonLabel>Cuentas</IonLabel>
              </IonTabButton>

              <IonTabButton tab="anotador" href="/anotador">
                <IonIcon icon={bonfireOutline} />
                <IonLabel>Anotador de truco</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
  );
}

export default App;
