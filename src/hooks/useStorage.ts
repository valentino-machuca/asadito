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

    return {
        compras,
        createCompra,
        removeCompra
    }
}