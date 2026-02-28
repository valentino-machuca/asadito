import { useEffect, useState } from 'react';
import { Storage } from '@ionic/storage';

const COMPRAS_KEY = 'compras';

export interface ComprasItem {
    id: string;
    name: string;
    completed: boolean;
    date: string;
    tasks: { task: string; completed: boolean }[];
}

export function useStorage() {
    const [store, setStore] = useState<Storage | null>(null);
    const [compras, setCompras] = useState<ComprasItem[]>([]);

    useEffect(() => {
        const initStorage = async () => {
            try {
                const newStore = new Storage({ name: 'asaditodb' });
                const store = await newStore.create();
                setStore(store);
                const storedCompras: ComprasItem[] = (await store.get(COMPRAS_KEY)) ?? [];
                setCompras(storedCompras);
            } catch (error) {
                console.error('Error al inicializar el storage:', error);
            }
        };
        initStorage();
    }, []);

    const createCompra = async (name: string) => {
        try {
            const nuevaCompra: ComprasItem = {
                id: String(new Date().getTime()),
                name,
                completed: false,
                date: String(new Date()),
                tasks: [],
            };
            const nuevasCompras = [...compras, nuevaCompra];
            setCompras(nuevasCompras);
            await store?.set(COMPRAS_KEY, nuevasCompras);
        } catch (error) {
            console.error('Error al crear compra:', error);
        }
    };

    const removeCompra = async (id: string) => {
        try {
            const filtered = compras.filter(item => item.id !== id);
            setCompras(filtered);
            await store?.set(COMPRAS_KEY, filtered);
        } catch (error) {
            console.error('Error al eliminar compra:', error);
        }
    };

    const addTaskToCompra = async (compraId: string, task: string) => {
        try {
            const updated = compras.map(compra =>
                compra.id === compraId
                    ? { ...compra, tasks: [...compra.tasks, { task, completed: false }] }
                    : compra
            );
            setCompras(updated);
            await store?.set(COMPRAS_KEY, updated);
        } catch (error) {
            console.error('Error al agregar tarea:', error);
        }
    };

    const removeTaskFromCompra = async (compraId: string, taskName: string) => {
        try {
            const updated = compras.map(compra =>
                compra.id === compraId
                    ? { ...compra, tasks: compra.tasks.filter(t => t.task !== taskName) }
                    : compra
            );
            setCompras(updated);
            await store?.set(COMPRAS_KEY, updated);
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
        }
    };

    const updateTaskStatus = async (compraId: string, taskName: string) => {
        try {
            const updated = compras.map(compra =>
                compra.id === compraId
                    ? { ...compra, tasks: compra.tasks.map(t => t.task === taskName ? { ...t, completed: !t.completed } : t) }
                    : compra
            );
            setCompras(updated);
            await store?.set(COMPRAS_KEY, updated);
        } catch (error) {
            console.error('Error al actualizar estado de tarea:', error);
        }
    };

    return {
        compras,
        createCompra,
        removeCompra,
        addTaskToCompra,
        removeTaskFromCompra,
        updateTaskStatus,
    };
}
