import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";

export default function useNetwork(){
    const [status, setStatus] = useState<boolean>(false);

    useEffect(() => {
        getStatus();
    }, []);

    async function getStatus(){
        let networkStatus = await Network.getStatus();
        setStatus(networkStatus.connected);
    }

    return {
        status,
        getStatus
    }
};