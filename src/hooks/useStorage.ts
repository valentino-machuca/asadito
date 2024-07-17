import { useEffect, useState} from "react";
import { Storage } from '@ionic/storage';

const COMPRAS_KEY = 'compras';

export interface ComprasItem {
    id: string;
    name: string;
    completed: boolean;
    date: string;
    tasks: {task: string, completed: boolean}[]
}

export function useStorage() {
    const [store, setStore] = useState<Storage | null>(null);
    const [compras, setCompras] = useState<ComprasItem[]>([]);

    useEffect(() => {
        const initStorage = async () => {

            const newStore = new Storage({ // Configuración de db
                name: 'asaditodb'
            });

            const store = await newStore.create(); // Crear db
            setStore(store);

            const storedCompras = await store.get(COMPRAS_KEY) || []; // Obtener compras
            setCompras(storedCompras);
        }
        initStorage();
    }, []);

    // Crear compra
    const createCompra = async (name: string) => {
        const nuevaCompra = {
            id: '' + new Date().getTime(),
            name,
            completed: false,
            date: '' + new Date(),
            tasks: [],
        }
        const nuevasCompras = [...compras, nuevaCompra];
        setCompras(nuevasCompras);
        await store?.set(COMPRAS_KEY, nuevasCompras);
    }

    const removeCompra = async (id: string) => {
        const filteredCompras = compras.filter(item => item.id !== id);
        setCompras(filteredCompras);
        await store?.set(COMPRAS_KEY, filteredCompras);
    }

    const addTaskToCompra = async (compraId: string, task: string) => {
        const updatedCompras = compras.map(compra => {
            if (compra.id === compraId) {
                return { ...compra, tasks: [...compra.tasks, {
                    task,
                    completed: false,
                }] };
            }
            return compra;
        });
        setCompras([...updatedCompras]);
        await store?.set(COMPRAS_KEY, updatedCompras);
    }

    const removeTaskFromCompra = async (compraId: string, taskName: string) => {
        const updatedCompras = compras.map(compra => {
            if (compra.id === compraId) {
                return { ...compra, tasks: compra.tasks.filter(task => task.task !== taskName) };
            }
            return compra;
        });
        setCompras(updatedCompras);
        await store?.set(COMPRAS_KEY, updatedCompras);
    }

    const updateTaskStatus = async (compraId: string, taskName: string) => {
        const updatedCompras = compras.map(compra => {
            if (compra.id === compraId) {
                return { ...compra, tasks: compra.tasks.map(task => task.task === taskName ? { ...task, completed: !task.completed} : task) };
            }
            return compra;
        });
        setCompras(updatedCompras);
        await store?.set(COMPRAS_KEY, updatedCompras);
    }

    return {
        compras,
        createCompra,
        removeCompra,
        addTaskToCompra,
        removeTaskFromCompra,
        updateTaskStatus
    }
}