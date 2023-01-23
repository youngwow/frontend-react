import {useEffect, useState} from "react";
import axios, {AxiosError} from 'axios'

// export interface IPriceStock {
//     date: string,
//     open: string
// }

export interface IHistoricalData {
    label: string,
    stocks: {
        date: string,
        open: string
    }[]
}

export function useHistoricalStocks() {
    const [allHistory, setAllHistory] = useState<IHistoricalData[]>([]);

    async function fetchPrices(){
        try {
            const responce = await axios.get<IHistoricalData[]>('http://localhost:4000/stocks/history');
            setAllHistory(responce.data)
        } catch (e) {
            const error = e as AxiosError;
            console.error(error);
        }
    }

    useEffect(() => {
        fetchPrices()
    }, [])

    return { allHistory }
}