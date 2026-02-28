import { useRef, useState } from 'react';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage } from '@ionic/react';
import { add, cart, chevronForward, trash } from 'ionicons/icons';
import moment from 'moment';
import s from './Shopping.module.scss';

// Components
import HeaderCustom from '../../components/Header/Header';
import TasksModal from '../../components/TasksModal/TasksModal';

// Hooks
import { ShoppingListItem, useStorage } from '../../hooks/useStorage';

const Shopping: React.FC = () => {
    const [listName, setListName] = useState<string>('');
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedList, setSelectedList] = useState<ShoppingListItem>({
        id: '',
        name: '',
        completed: false,
        date: '',
        tasks: [],
    });

    const { shoppingLists, createList, removeList } = useStorage();
    const slidersRef = useRef<HTMLIonListElement>(null);

    const handleCreate = () => {
        createList(listName);
        setListName('');
    };

    const handleRemove = (id: string) => {
        removeList(id);
        setListName('');
        slidersRef.current?.closeSlidingItems();
    };

    const openTasksModal = (list: ShoppingListItem) => {
        setModalOpen(true);
        setSelectedList(list);
        slidersRef.current?.closeSlidingItems();
    };

    return (
        <IonPage style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#222428' }}>
            <IonContent fullscreen color='dark' style={{ maxWidth: '800px' }}>
                <HeaderCustom title='.compras' icon={cart} isIcon />

                <h3 className={s.animation} style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1rem' }}>
                    Registros de compras
                </h3>

                <IonItem className={s.animation} style={{ marginBottom: '20px', borderRadius: '8px', marginInline: '3%' }} color='light'>
                    <IonInput
                        className={s.animation}
                        placeholder='Ingresar nueva lista'
                        value={listName}
                        onIonInput={(e) => setListName(e.detail.value!)}
                    />
                    <IonButton
                        className={s.animation}
                        expand='block'
                        slot='end'
                        color='dark'
                        onClick={handleCreate}
                        disabled={!listName.length}
                    >
                        <IonIcon icon={add} />
                    </IonButton>
                </IonItem>

                <IonItem className={s.list} color='dark'>
                    <p className={s.animation}>Desliza para acceder a los items de la compra o eliminarla</p>
                </IonItem>

                <IonList lines='inset' style={{ backgroundColor: '#222428' }} ref={slidersRef}>
                    {shoppingLists.map((list, index) => (
                        <ShoppingRow
                            key={index}
                            index={index}
                            list={list}
                            onRemove={handleRemove}
                            onOpen={openTasksModal}
                        />
                    ))}
                </IonList>
            </IonContent>

            {modalOpen && <TasksModal list={selectedList} open={modalOpen} setOpen={setModalOpen} />}
        </IonPage>
    );
};

interface ShoppingRowProps {
    list: ShoppingListItem;
    index: number;
    onRemove: (id: string) => void;
    onOpen: (list: ShoppingListItem) => void;
}

const ShoppingRow: React.FC<ShoppingRowProps> = ({ list, index, onRemove, onOpen }) => {
    return (
        <IonItemSliding className={s.itemBox} style={{ animationDelay: `.${index + 3}s` }}>
            <IonItemOptions side="start">
                <IonItemOption color="success" onClick={() => onOpen(list)} expandable>
                    <IonIcon icon={chevronForward} />
                </IonItemOption>
            </IonItemOptions>
            <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => onRemove(list.id)} expandable>
                    <IonIcon icon={trash} />
                </IonItemOption>
            </IonItemOptions>
            <IonItem color='dark'>
                <IonLabel className={s.itemLabel}>
                    <h2>{list.name}</h2>
                    <p>Created at {moment(list.date).fromNow()}</p>
                </IonLabel>
            </IonItem>
        </IonItemSliding>
    );
};

export default Shopping;
