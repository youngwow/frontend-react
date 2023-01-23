import React, {useState} from 'react'
import {IBroker, IBrokerUpdate} from "../../../models/broker";
import axios, {AxiosError} from "axios";

interface IBrokerFunction {
    broker: IBroker,
    onDelete: (id: number) => void
}

export function Broker( {broker, onDelete}: IBrokerFunction) {

    const {id, name: nameBroker, value} = broker;
    const [name, setName] = useState(nameBroker);
    const [balance, setBalance] = useState(value);


    async function deleteHandler(event: React.MouseEvent<HTMLButtonElement>) {
        try {
            const id = (event.target as HTMLButtonElement).value;
            const response = await axios.delete(`http://localhost:4000/brokers/${id}`);
            onDelete(response.data)
        } catch (e) {
            const error = e as AxiosError;
            console.error(error);
        }
    }

    async function saveHandler(event: React.MouseEvent<HTMLButtonElement>) {
        try {
            const id = (event.target as HTMLButtonElement).value;
            const brokerUpdate: IBrokerUpdate = {
                name: name,
                value: balance
            }
            await axios.put(`http://localhost:4000/brokers/${id}`, brokerUpdate);
        } catch (e) {
            const error = e as AxiosError;
            console.error(error);
        }
    }

    function changeNameHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setName((event.target as HTMLInputElement).value)
    }

    function changeBalanceHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setBalance(parseInt((event.target as HTMLInputElement).value))
    }

    return (
        <>
            <tr className="border-b hover:bg-blue-100 bg-white">
                <td className="p-3 px-5">
                    <input type="text" value={name} onChange={changeNameHandler} className="bg-transparent" />
                </td>
                <td className="p-3 px-5">
                    <input type="number" value={balance > 0 ? balance : 0} onChange={changeBalanceHandler} className="bg-transparent" />
                </td>
                <td className="p-3 px-5 flex justify-end">
                    <button type="button"
                            onClick={saveHandler}
                            value={id}
                            className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                        Save
                    </button>
                    <button type="button"
                            onClick={deleteHandler}
                            value={id}
                            className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                        Delete
                    </button>
                </td>
            </tr>
        </>
    );
}