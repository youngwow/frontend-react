import {useEffect, useState} from 'react'
import axios, {AxiosError} from 'axios'
import {IBroker, IBrokerCreate, IBrokerUpdate} from "../models/broker";

export function useBrokers() {
    const [brokers, setBrokers] = useState<IBroker[]>([])

    function addBroker(broker: IBroker) {
        setBrokers(prev => [...prev, broker])
    }
    
    function deleteBroker(id: number) {
        setBrokers(brokers.filter(broker => broker.id !== id));
    }

    // ф-ия нигде не используется
    function getNewId(): number {
        return brokers.length > 0 ? brokers[brokers.length - 1].id : 0;
    }

    async function fetchBrokers() {
        try {
            const response = await axios.get<IBroker[]>('http://localhost:4000/brokers')
            setBrokers(response.data)
        } catch (e: unknown) {
            const error = e as AxiosError
            console.error(error)
        }
    }

    useEffect(() => {
        fetchBrokers()
    }, [])

    return { brokers, addBroker, deleteBroker }
}