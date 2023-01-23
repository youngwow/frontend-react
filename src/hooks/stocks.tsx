import {useEffect, useState} from 'react'
import axios, {AxiosError} from 'axios'
import {IStock} from "../components/table/content/Stock";

export function useStocks() {
    const [stocks, setStocks] = useState<IStock[]>([]);
    const [isAllSelectedStocks, setIsAllSelectedStocks] = useState(false);

    async function fetchStocks() {
        try {
            const response = await axios.get<IStock[]>('http://localhost:4000/stocks')
            setStocks(response.data)
        } catch (e: unknown) {
            const error = e as AxiosError
            console.error(error)
        }
    }

    useEffect(() => {
        fetchStocks()
    }, [])

    return { stocks,
        isAllSelectedStocks,
        setIsAllSelectedStocks
    }
}