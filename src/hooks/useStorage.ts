import { useEffect, useState } from 'react';
import { Storage } from '@ionic/storage';

const SHOPPING_LISTS_KEY = 'compras';

export interface ShoppingListItem {
    id: string;
    name: string;
    completed: boolean;
    date: string;
    tasks: { task: string; completed: boolean }[];
}

export function useStorage() {
    const [store, setStore] = useState<Storage | null>(null);
    const [shoppingLists, setShoppingLists] = useState<ShoppingListItem[]>([]);

    useEffect(() => {
        const initStorage = async () => {
            try {
                const newStore = new Storage({ name: 'asaditodb' });
                const store = await newStore.create();
                setStore(store);
                const stored: ShoppingListItem[] = (await store.get(SHOPPING_LISTS_KEY)) ?? [];
                setShoppingLists(stored);
            } catch (error) {
                console.error('Error initializing storage:', error);
            }
        };
        initStorage();
    }, []);

    const createList = async (name: string) => {
        try {
            const newList: ShoppingListItem = {
                id: String(new Date().getTime()),
                name,
                completed: false,
                date: String(new Date()),
                tasks: [],
            };
            const updated = [...shoppingLists, newList];
            setShoppingLists(updated);
            await store?.set(SHOPPING_LISTS_KEY, updated);
        } catch (error) {
            console.error('Error creating list:', error);
        }
    };

    const removeList = async (id: string) => {
        try {
            const filtered = shoppingLists.filter(item => item.id !== id);
            setShoppingLists(filtered);
            await store?.set(SHOPPING_LISTS_KEY, filtered);
        } catch (error) {
            console.error('Error removing list:', error);
        }
    };

    const addTask = async (listId: string, task: string) => {
        try {
            const updated = shoppingLists.map(list =>
                list.id === listId
                    ? { ...list, tasks: [...list.tasks, { task, completed: false }] }
                    : list
            );
            setShoppingLists(updated);
            await store?.set(SHOPPING_LISTS_KEY, updated);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const removeTask = async (listId: string, taskName: string) => {
        try {
            const updated = shoppingLists.map(list =>
                list.id === listId
                    ? { ...list, tasks: list.tasks.filter(t => t.task !== taskName) }
                    : list
            );
            setShoppingLists(updated);
            await store?.set(SHOPPING_LISTS_KEY, updated);
        } catch (error) {
            console.error('Error removing task:', error);
        }
    };

    const updateTaskStatus = async (listId: string, taskName: string) => {
        try {
            const updated = shoppingLists.map(list =>
                list.id === listId
                    ? { ...list, tasks: list.tasks.map(t => t.task === taskName ? { ...t, completed: !t.completed } : t) }
                    : list
            );
            setShoppingLists(updated);
            await store?.set(SHOPPING_LISTS_KEY, updated);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return {
        shoppingLists,
        createList,
        removeList,
        addTask,
        removeTask,
        updateTaskStatus,
    };
}
