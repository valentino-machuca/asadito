import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { add, trash } from 'ionicons/icons';
import s from './TasksModal.module.scss';

import { ShoppingListItem, useStorage } from '../../hooks/useStorage';

interface TasksModalProps {
    list: ShoppingListItem;
    open: boolean;
    setOpen: (open: boolean) => void;
}

interface TaskItemProps {
    task: { task: string; completed: boolean };
    listId: string;
    index: number;
    onRemove: (listId: string, task: string) => void;
    onToggle: (listId: string, task: string) => void;
}

const TasksModal: React.FC<TasksModalProps> = ({ list, open, setOpen }) => {
    const [value, setValue] = useState<string>('');
    const [currentList, setCurrentList] = useState<ShoppingListItem>(list);

    const { shoppingLists, addTask, removeTask, updateTaskStatus } = useStorage();

    useEffect(() => {
        const updated = shoppingLists.find(l => l.id === list.id);
        if (updated) setCurrentList(updated);
    }, [shoppingLists, list.id]);

    return (
        <IonModal isOpen={open} className={s.ionmodal}>
            <IonHeader>
                <IonToolbar color='dark'>
                    <IonTitle className={s.iontitle}>{list?.name}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setOpen(false)}>Cerrar</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className={`${s.ioncontent} ion-padding`} color='dark'>

                <IonItem style={{ marginBottom: '30px', borderRadius: '8px' }} color='light'>
                    <IonInput
                        placeholder='Escribe una compra...'
                        value={value}
                        onIonInput={(e) => setValue(e.detail.value!)}
                    />
                    <IonButton
                        slot='end'
                        color='dark'
                        disabled={!value.length}
                        onClick={async () => {
                            await addTask(currentList.id, value);
                            setValue('');
                        }}
                        style={{ margin: 0, width: '12%', height: '65%' }}
                    >
                        <IonIcon icon={add} />
                    </IonButton>
                </IonItem>

                <h5>Lista de compras</h5>
                <IonList color='dark' style={{ backgroundColor: '#222428' }}>
                    {currentList?.tasks.map((task, index) => (
                        <TaskItem
                            key={index}
                            task={task}
                            listId={currentList.id}
                            index={index}
                            onRemove={removeTask}
                            onToggle={updateTaskStatus}
                        />
                    ))}
                </IonList>
            </IonContent>
        </IonModal>
    );
};

const TaskItem: React.FC<TaskItemProps> = ({ task, listId, index, onRemove, onToggle }) => {
    return (
        <IonItem className={s.ionitem} color='light' style={{ animationDelay: `${index * 0.1}s` }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '100%', width: '90%' }}>
                <IonCheckbox
                    slot='start'
                    color='dark'
                    checked={task.completed}
                    onIonChange={() => onToggle(listId, task.task)}
                />
                <IonLabel style={{ textDecoration: task.completed ? 'line-through' : 'none', marginLeft: '20px', fontSize: '1rem' }}>
                    {task.task}
                </IonLabel>
            </div>
            <div
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '10%' }}
                onClick={() => onRemove(listId, task.task)}
            >
                <IonIcon slot='end' icon={trash} style={{ fontSize: '1.3rem', color: 'rgb(103, 49, 49)' }} />
            </div>
        </IonItem>
    );
};

export default TasksModal;
