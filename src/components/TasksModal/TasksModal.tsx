import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import s from './TasksModal.module.scss';

// Interface
import { ComprasItem, useStorage } from '../../hooks/useStorage';
import { add, trash } from 'ionicons/icons';

const TasksModal: React.FC<{compra: ComprasItem, open: boolean, setOpen: Function}> = ({compra, open, setOpen}) => {

    const [value, setValue] = useState<string>('');
    const [currentCompra, setCurrentCompra] = useState<ComprasItem>(compra);

    const {compras, addTaskToCompra, removeTaskFromCompra, updateTaskStatus} = useStorage();

    useEffect(() => {
        const updatedCompra = compras.find(c => c.id === compra.id);
        if (updatedCompra) {
            setCurrentCompra(updatedCompra);
        }
    },[compras, compra.id])

    const handleRemoveTask = (compraId: string, task: string) => {
        removeTaskFromCompra(compraId, task);
    }

    const handleUpdateTask = (compraId: string, task: string) => {
        updateTaskStatus(compraId, task);
    }


  return (
    <IonModal isOpen={open} className={s.ionmodal}>
        <IonHeader>

            <IonToolbar color='dark'>
                <IonTitle className={s.iontitle}>{compra?.name}</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={() => setOpen(false)}>Cerrar</IonButton>
                </IonButtons>
            </IonToolbar>

        </IonHeader>
        <IonContent className={`${s.ioncontent} ion-padding`} color='dark'>

            <IonItem style={{marginBottom: '30px', borderRadius: '8px'}} color='light'>
                <IonInput placeholder='Escribe una compra...' value={value} onIonInput={(e) => setValue(e.detail.value!)}/>
                <IonButton slot='end' color='dark' disabled={!value.length}
                    onClick={async () => {
                        await addTaskToCompra(currentCompra.id, value);
                        setValue('');
                    }}
                        style={{margin: 0, width: '12%', height: '65%'}}
                    >
                    <IonIcon icon={add}/>
                </IonButton>
            </IonItem>

            <h5>Lista de compras</h5>
            <IonList color='dark' style={{backgroundColor: '#222428'}}>
                {   
                    currentCompra?.tasks.map((task, index) => (
                        <TaskItem task={task} compraId={currentCompra.id} key={index} index={index} handleRemoveTask={handleRemoveTask} handleUpdateTask={handleUpdateTask}/>
                    ))
                }
            </IonList>
            
        </IonContent>
    </IonModal>
  )
}

const TaskItem: React.FC<{task: any, compraId: string, handleRemoveTask: Function, handleUpdateTask: Function, index: number}> = ({task, compraId, handleRemoveTask, handleUpdateTask, index}) => {

    return(
        <IonItem className={s.ionitem} color='light' style={{animationDelay: `${index * 0.1}s`}}>
            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '100%', width: '90%'}}>
                <IonCheckbox slot='start' color='dark' checked={task.completed} onIonChange={() => handleUpdateTask(compraId, task.task)}/>
                <IonLabel style={{textDecoration: task.completed ? 'line-through' : 'none', marginLeft: '20px', fontSize: '1rem'}}>{task.task}</IonLabel>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '10%'}} onClick={() => handleRemoveTask(compraId, task.task)}>
                <IonIcon 
                    slot='end' 
                    icon={trash} 
                    style={{fontSize: '1.3rem', color: 'rgb(103, 49, 49)'}}
                />
            </div>
        </IonItem>
    );
}

export default TasksModal