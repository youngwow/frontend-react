import React, {useState} from "react";
import axios, {AxiosError} from 'axios'
import {IBroker, IBrokerCreate} from "../models/broker";

const brokerData: IBrokerCreate =  {
    name: '',
    value: 0
}

interface CreateBrokerProps {
    onCreate: (broker: IBroker) => void
}

export function CreateBroker({onCreate}: CreateBrokerProps) {

    const [name, setName] = useState('')
    const [balance, setBalance] = useState('')

    // const [error, setError] = useState('')

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        // setError('')
        try {
            if (name !== '' && balance !== ''){
                brokerData.name = name;
                brokerData.value = parseInt(balance);
                const response = await axios.post<IBroker>('http://localhost:4000/brokers', brokerData);
                onCreate(response.data);
            }
        } catch (e) {
            const error = e as AxiosError;
            console.error(error);
        }

    }

    const changeHandlerName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName((event.target as HTMLInputElement).value)
    }

    const changeHandlerBalance = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBalance((event.target as HTMLInputElement).value.replace(/\D/g, ''))
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    className="border py-2 px-4 mb-2 w-full outline-0"
                    placeholder="Enter broker name..."
                    value={name}
                    onChange={changeHandlerName}
                />
                <input
                    type="number"
                    className="border py-2 px-4 mb-2 w-full outline-0"
                    placeholder="Enter broker balance..."
                    value={balance}
                    onChange={changeHandlerBalance}
                />


                <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">Create</button>
            </form>
        </>
    );
}