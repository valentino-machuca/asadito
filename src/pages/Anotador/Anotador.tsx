import { useState } from 'react';
import { IonAlert, IonContent, IonIcon, IonPage, useIonToast } from '@ionic/react';
import { addOutline, bonfire, removeOutline } from 'ionicons/icons';
import s from './Anotador.module.scss';

// Componentes
import HeaderCustom from '../../components/Header/Header';
import Fosforos from '../../components/Fosforos/Fosforos';

// Helpers
import { addPoint, deletePoint } from '../../helpers/trucoPoints';

type TableroEquipo = number[][];

const PUNTOS_PARA_GANAR = 30;

const Anotador: React.FC = () => {
    const [equipo1, setEquipo1] = useState<TableroEquipo>([]);
    const [equipo2, setEquipo2] = useState<TableroEquipo>([]);

    const [present] = useIonToast();

    const presentToast = (winner: string) => {
        present({
            message: `${winner} ha ganado!`,
            duration: 3000,
            position: 'top',
        });
    };

    const addPointTeam = (equipo: TableroEquipo, setEquipo: React.Dispatch<React.SetStateAction<TableroEquipo>>) => {
        if (equipo1.flat().length === PUNTOS_PARA_GANAR || equipo2.flat().length === PUNTOS_PARA_GANAR) return;

        const updated = addPoint([...equipo]);
        setEquipo(updated);

        if (updated.flat().length === PUNTOS_PARA_GANAR) {
            const winner = equipo === equipo1 ? 'Nuestro equipo' : 'El equipo de ellos';
            presentToast(winner);
        }
    };

    const deletePointTeam = (equipo: TableroEquipo, setEquipo: React.Dispatch<React.SetStateAction<TableroEquipo>>) => {
        setEquipo(deletePoint([...equipo]));
    };

    const restartGame = () => {
        setEquipo1([]);
        setEquipo2([]);
    };

    return (
        <IonPage style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#222428' }}>
            <IonContent fullscreen color='dark' style={{ maxWidth: '800px' }}>
                <HeaderCustom title='.anotador' icon={bonfire} isIcon={true} />

                <div className={s.container}>
                    {(equipo1.flat().length >= 15 || equipo2.flat().length >= 15) && <div className={s.separator} />}

                    <div className={s.equipo_1}>
                        <h3>Nosotros</h3>
                        <div className={s.fosforos} onClick={() => addPointTeam(equipo1, setEquipo1)}>
                            {equipo1.map((p, i) => <Fosforos key={i} puntos={p} />)}
                        </div>
                        <div className={s.botones}>
                            <IonIcon aria-hidden="true" icon={removeOutline} onClick={() => deletePointTeam(equipo1, setEquipo1)} className={s.button} />
                            <IonIcon aria-hidden="true" icon={addOutline} onClick={() => addPointTeam(equipo1, setEquipo1)} className={s.button} />
                        </div>
                    </div>

                    <div className={s.equipo_2}>
                        <h3>Ellos</h3>
                        <div className={s.fosforos} onClick={() => addPointTeam(equipo2, setEquipo2)} style={{ borderLeft: '2px solid rgba(255, 255, 255, 0.265)' }}>
                            {equipo2.map((p, i) => <Fosforos key={i} puntos={p} />)}
                        </div>
                        <div className={s.botones}>
                            <IonIcon aria-hidden="true" icon={removeOutline} onClick={() => deletePointTeam(equipo2, setEquipo2)} className={s.button} />
                            <IonIcon aria-hidden="true" icon={addOutline} onClick={() => addPointTeam(equipo2, setEquipo2)} className={s.button} />
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
                        { text: 'Iniciar', role: 'confirm', handler: restartGame },
                        { text: 'Aún no', role: 'cancel' },
                    ]}
                />
            </IonContent>
        </IonPage>
    );
};

export default Anotador;
