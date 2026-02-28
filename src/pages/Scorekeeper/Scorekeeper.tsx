import { useState } from 'react';
import { IonAlert, IonContent, IonIcon, IonPage, useIonToast } from '@ionic/react';
import { addOutline, bonfire, removeOutline } from 'ionicons/icons';
import s from './Scorekeeper.module.scss';

// Components
import HeaderCustom from '../../components/Header/Header';
import Matchsticks from '../../components/Matchsticks/Matchsticks';

// Helpers
import { addPoint, deletePoint } from '../../helpers/gameScore';

type TeamScore = number[][];

const POINTS_TO_WIN = 30;

const Scorekeeper: React.FC = () => {
    const [team1, setTeam1] = useState<TeamScore>([]);
    const [team2, setTeam2] = useState<TeamScore>([]);

    const [present] = useIonToast();

    const presentToast = (winner: string) => {
        present({
            message: `${winner} ha ganado!`,
            duration: 3000,
            position: 'top',
        });
    };

    const addTeamPoint = (team: TeamScore, setTeam: React.Dispatch<React.SetStateAction<TeamScore>>) => {
        if (team1.flat().length === POINTS_TO_WIN || team2.flat().length === POINTS_TO_WIN) return;

        const updated = addPoint([...team]);
        setTeam(updated);

        if (updated.flat().length === POINTS_TO_WIN) {
            const winner = team === team1 ? 'Nuestro equipo' : 'El equipo de ellos';
            presentToast(winner);
        }
    };

    const removeTeamPoint = (team: TeamScore, setTeam: React.Dispatch<React.SetStateAction<TeamScore>>) => {
        setTeam(deletePoint([...team]));
    };

    const restartGame = () => {
        setTeam1([]);
        setTeam2([]);
    };

    return (
        <IonPage style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#222428' }}>
            <IonContent fullscreen color='dark' style={{ maxWidth: '800px' }}>
                <HeaderCustom title='.anotador' icon={bonfire} isIcon={true} />

                <div className={s.container}>
                    {(team1.flat().length >= 15 || team2.flat().length >= 15) && <div className={s.separator} />}

                    <div className={s.team1}>
                        <h3>Nosotros</h3>
                        <div className={s.matchsticks} onClick={() => addTeamPoint(team1, setTeam1)}>
                            {team1.map((p, i) => <Matchsticks key={i} points={p} />)}
                        </div>
                        <div className={s.buttons}>
                            <IonIcon aria-hidden="true" icon={removeOutline} onClick={() => removeTeamPoint(team1, setTeam1)} className={s.button} />
                            <IonIcon aria-hidden="true" icon={addOutline}    onClick={() => addTeamPoint(team1, setTeam1)}    className={s.button} />
                        </div>
                    </div>

                    <div className={s.team2}>
                        <h3>Ellos</h3>
                        <div className={s.matchsticks} onClick={() => addTeamPoint(team2, setTeam2)} style={{ borderLeft: '2px solid rgba(255, 255, 255, 0.265)' }}>
                            {team2.map((p, i) => <Matchsticks key={i} points={p} />)}
                        </div>
                        <div className={s.buttons}>
                            <IonIcon aria-hidden="true" icon={removeOutline} onClick={() => removeTeamPoint(team2, setTeam2)} className={s.button} />
                            <IonIcon aria-hidden="true" icon={addOutline}    onClick={() => addTeamPoint(team2, setTeam2)}    className={s.button} />
                        </div>
                    </div>
                </div>

                <div className={s.newGame}>
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

export default Scorekeeper;
