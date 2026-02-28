import React, { useEffect, useState } from 'react';
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
import { bonfireOutline, cartOutline, homeOutline, peopleOutline } from 'ionicons/icons';

// Pages
import Home from './pages/Home/Home';
import Calculator from './pages/Calculator/Calculator';
import Scorekeeper from './pages/Scorekeeper/Scorekeeper';
import Shopping from './pages/Shopping/Shopping';
import Playlists from './pages/Playlists/Playlists';

// Components
import SplashScreen from './components/SplashScreen/SplashScreen';

// Capacitor
import { StatusBar, Style } from '@capacitor/status-bar';

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


setupIonicReact();

const App: React.FC = () => {
    const [splashScreen, setSplashScreen] = useState(true);

    useEffect(() => {
        const setStatusBar = async () => {
            await StatusBar.setBackgroundColor({ color: '#222428' });
            await StatusBar.setStyle({ style: Style.Dark });
        };

        setStatusBar();
        setTimeout(() => setSplashScreen(false), 2500);
    }, []);

    return (
        <IonApp>
            {splashScreen && <SplashScreen />}
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Redirect exact path="/" to="/home" />
                        <Route path="/home"        render={() => <Home />}        exact={true} />
                        <Route path="/expenses"    render={() => <Calculator />}  exact={true} />
                        <Route path="/scorekeeper" render={() => <Scorekeeper />} exact={true} />
                        <Route path="/shopping"    render={() => <Shopping />}    exact={true} />
                        <Route path="/playlists"   render={() => <Playlists />}   exact={true} />
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom" color='dark'>
                        <IonTabButton tab="home"        href="/home">
                            <IonIcon icon={homeOutline}   style={{ fontSize: '1.4rem' }} />
                            <IonLabel style={{ fontSize: '.7rem' }}>Inicio</IonLabel>
                        </IonTabButton>

                        <IonTabButton tab="shopping"    href="/shopping">
                            <IonIcon icon={cartOutline}   style={{ fontSize: '1.4rem' }} />
                            <IonLabel style={{ fontSize: '.7rem' }}>Compras</IonLabel>
                        </IonTabButton>

                        <IonTabButton tab="expenses"    href="/expenses">
                            <IonIcon icon={peopleOutline} style={{ fontSize: '1.4rem' }} />
                            <IonLabel style={{ fontSize: '.7rem' }}>Cuentas</IonLabel>
                        </IonTabButton>

                        <IonTabButton tab="scorekeeper" href="/scorekeeper">
                            <IonIcon icon={bonfireOutline} style={{ fontSize: '1.4rem' }} />
                            <IonLabel style={{ fontSize: '.7rem' }}>Anotador</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
