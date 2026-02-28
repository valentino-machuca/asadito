import { useEffect, useState } from 'react';
import { Network } from '@capacitor/network';

export default function useNetwork() {
    const [status, setStatus] = useState<boolean>(false);

    useEffect(() => {
        getStatus();
    }, []);

    async function getStatus() {
        try {
            const networkStatus = await Network.getStatus();
            setStatus(networkStatus.connected);
        } catch {
            setStatus(false);
        }
    }

    return { status, getStatus };
}
