import {IonButton, IonContent, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage} from '@ionic/react';
import { add, cart, chevronForward, trash } from 'ionicons/icons';
import { useRef, useState } from 'react';
import s from './ListaCompras.module.scss';

// Componentes
import HeaderCustom from '../../components/Header/Header';

// Hooks
import { ComprasItem, useStorage } from "../../hooks/useStorage";
import moment from 'moment';
import TasksModal from '../../components/TasksModal/TasksModal';

const ListaCompras: React.FC = () => {
    const [buy, setBuy] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [compraItem, setCompraItem] = useState<ComprasItem>({
        id: '',
        name: '',
        completed: false,
        date: '',
        tasks: []
    });

    const { compras, createCompra, removeCompra } = useStorage();
    const slidersRef = useRef<HTMLIonListElement>(null);
    
    const nuevaCompra = () => { // Crear nueva compra
        createCompra(buy);
        setBuy('');
    };
    
    const eliminarCompra = (id: string) => { // Eliminar compra
        removeCompra(id);
        setBuy('');
        slidersRef.current?.closeSlidingItems(); // Cerrar sliders abiertos
    };

    const openTasksModal = (compra: ComprasItem) => { // Abrir modal de tareas
        setOpen(true);
        setCompraItem(compra)
        slidersRef.current?.closeSlidingItems(); // Cerrar sliders abiertos
    }

    return (
        <IonPage style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#222428'}}>
            <IonContent fullscreen color='dark' style={{maxWidth: '800px'}}>
                <HeaderCustom title='.compras' icon={cart} isIcon/>

                <h3 className={s.animation} style={{textAlign: 'center', marginBottom: '20px', fontSize: '1rem'}}>Registros de compras</h3>
                <IonItem  className={s.animation} style={{marginBottom: '20px', borderRadius: '8px', marginInline: '3%'}} color='light'>

                    <IonInput className={s.animation} placeholder='Ingresar nueva lista' value={buy} onIonInput={(e) => setBuy(e.detail.value!)}/>
                    <IonButton className={s.animation} expand='block' slot='end' color='dark' onClick={() => nuevaCompra()} disabled={!buy.length}>
                        <IonIcon icon={add}/>
                    </IonButton>

                </IonItem>

                <IonItem className={s.list} color='dark'>
                    <p className={s.animation}>Desliza para acceder a los items de la compra o eliminarla</p>
                </IonItem>
                <IonList lines='inset' style={{backgroundColor: '#222428'}} ref={slidersRef}>
                    {
                        compras.map((compra, index) => <ItemCompra key={index} index={index} compra={compra} removeCompra={eliminarCompra} openModal={openTasksModal}/>)
                    }
                </IonList>

            </IonContent>

            {open && <TasksModal compra={compraItem} open={open} setOpen={setOpen}/>}
        </IonPage>
    );
};

const ItemCompra : React.FC<{compra: ComprasItem, index: number, removeCompra: Function, openModal: Function}> = ({compra, index, removeCompra, openModal}) => {

    return(
        <IonItemSliding className={s.itembox} style={{animationDelay: `.${index+3}s`}}>
            <IonItemOptions side="start">

                <IonItemOption color="success" onClick={() => openModal(compra)} expandable>
                    <IonIcon icon={chevronForward}/>
                </IonItemOption>

            </IonItemOptions>
            <IonItemOptions side="end">

                <IonItemOption color="danger" onClick={() => removeCompra(compra.id)} expandable>
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