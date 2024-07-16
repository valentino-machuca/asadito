import {IonButton, IonContent, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage} from '@ionic/react';
import { add, cart, chevronForward, trash } from 'ionicons/icons';
import { useState } from 'react';
import s from './ListaCompras.module.scss';

// Componentes
import HeaderCustom from '../../components/Header/Header';

// Hooks
import { ComprasItem, useStorage } from "../../hooks/useStorage";
import moment from 'moment';

const ListaCompras: React.FC = () => {
    const [buy, setBuy] = useState<string>('');

    const { compras, createCompra, removeCompra } = useStorage();
    
    const nuevaCompra = () => {
        createCompra(buy);
        setBuy('');
    };
    
    const eliminarCompra = (id: string) => {
        removeCompra(id);
        setBuy('');
    };

    return (
        <IonPage style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#222428'}}>
            <IonContent fullscreen color='dark' style={{maxWidth: '800px'}}>
                <HeaderCustom title='.compras' icon={cart} isIcon/>
                <IonItem color='dark'>
                    <IonInput placeholder='Ej. Asado viernes' value={buy} 
                    onIonInput={(e) => setBuy(e.detail.value!)}/>
                    <IonButton expand='block' slot='end' color='light' onClick={() => nuevaCompra()}>
                        <IonIcon icon={add}/>
                    </IonButton>
                </IonItem>
                <IonItem className={s.list} color='dark'>
                    <p>Desliza para acceder o eliminar</p>
                </IonItem>
                <IonList lines='inset' style={{backgroundColor: '#222428'}}>
                    {
                        compras.map((compra, index) => <ItemCompra key={index} index={index} compra={compra} removeCompra={removeCompra}/>)
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
};

const ItemCompra : React.FC<{compra: ComprasItem, index: number, removeCompra: Function}> = ({compra, index, removeCompra}) => {

    return(
        <IonItemSliding className={s.itembox} style={{animationDelay: `.${index+3}s`}}>
            <IonItemOptions side="start">
                <IonItemOption color="success" expandable>
                    <IonIcon icon={chevronForward}/>
                </IonItemOption>
            </IonItemOptions>
            <IonItemOptions side="end" onIonSwipe={() => removeCompra(compra.id)}>
                <IonItemOption color="danger" expandable>
                    <IonIcon icon={trash}/>
                </IonItemOption>
            </IonItemOptions>
            <IonItem color='dark'>
                <IonLabel className={s.itemlabel}>
                    <h2>{compra.name}</h2>
                    <p>Created at {moment(compra.date).fromNow()}</p>
                </IonLabel>
            </IonItem>
        </IonItemSliding>
    )
}

export default ListaCompras;