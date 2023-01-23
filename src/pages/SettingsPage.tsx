import React, {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import io, {Socket} from "socket.io-client"
import {Table} from "../components/table/Table";
import {IStock} from "../components/table/content/Stock";

interface TableTradingPricesProps {
    chosenStocks: IStock[]
}

interface ISettings{
    speed: string,
    date: string,
    chosenStocks: IStock[]
    isStarted: boolean
}


export function SettingsPage() {

    const checkSessionStorage = () => {
      return sessionStorage.getItem('stocks') !== null &&
          sessionStorage.getItem('stocks') !== '' &&
          sessionStorage.getItem('stocks') !== '[]'
    }

    const [socket, setSocket] = useState<Socket>();
    const [stocks, setStocks] = useState<IStock[]>([]);

    const [settings, setSetting] = useState<ISettings>({
        speed: '0',
        date: '',
        chosenStocks: checkSessionStorage() ? JSON.parse(sessionStorage.getItem('stocks')!) : [],
        isStarted: false
    });
    if (settings.chosenStocks.length > 0){
        sessionStorage.setItem('stocks', '[]')
    }

    const submitHandler = async (event: React.FormEvent) => {
        try {
            event.preventDefault()
            //console.log(settings)
            setSetting({
                speed: settings.speed,
                chosenStocks: settings.chosenStocks,
                date: settings.date,
                isStarted: !settings.isStarted
            });
            console.log(settings)
            if (settings.date !== '' &&
                settings.speed !== '' &&
                parseInt(settings.speed) > 0 &&
                settings.chosenStocks.length > 0 &&
                !settings.isStarted
            ){
                console.log(settings)
                await axios.put('http://localhost:4000/settings', {
                    tradingStartDate: (new Date(settings.date)).toLocaleDateString('en-US'),
                    dateChangeSpeed: parseInt(settings.speed),
                    stocks: settings.chosenStocks,
                    isStarted: true,
                    currentDate: (new Date()).toLocaleDateString('en-US')
                });
                socket?.open();
                socket?.emit('updatingPrices')
            } else if (settings.isStarted) {
                await axios.put('http://localhost:4000/settings', {
                    tradingStartDate: '',
                    dateChangeSpeed: 1,
                    stocks: [],
                    isStarted: false,
                    currentDate: (new Date()).toLocaleDateString('en-US')
                });
                socket?.emit('stopUpdatingPrices');
                socket?.close();
            } else{
                socket?.close()
            }
        } catch (e) {
            const error = e as AxiosError
            console.error(error)
        }
    }

    const changeHandlerDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSetting({
            speed: settings.speed,
            chosenStocks: settings.chosenStocks,
            date: (event.target as HTMLInputElement).value,
            isStarted: settings.isStarted
        })
    }

    const changeHandlerSpeed = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = (event.target as HTMLInputElement).value.replace(/\D/g, '');
        setSetting({
            speed: value,
            chosenStocks: settings.chosenStocks,
            date: settings.date,
            isStarted: settings.isStarted
        });
    }

    // setSetting({date: date, speed: speed, chosenStocks: chosenStocks})

    function TableRowTradingPrices() {
        return (
            <>
                <tr className="border-b">
                    <th className="text-left p-3 px-5">Label</th>
                    <th className="text-left p-3 px-5">Name</th>
                    <th className="text-left p-3 px-5">Price</th>
                </tr>
            </>
        );
    }

    function ContentPrices({label, name, price}: IStock) {
        return (<>
            <tr className="border-b hover:bg-blue-100 bg-white">
                <td className="p-3 px-5"><p className="bg-transparent">{label}</p>
                </td>
                <td className="p-3 px-5"><p className="bg-transparent">{name}</p>
                </td>
                <td className="p-3 px-5"><p className="bg-transparent">{price}</p>
                </td>
            </tr>
        </>);
    }

    // const send = (value: string) => {
    //     socket?.emit('message', value)
    // }


    useEffect(() => {
        const newSocket = io('http://localhost:8001', { transports : ['websocket'] })
        setSocket(newSocket);
    }, [setSocket])

    const updatingStockListener = (stocks: IStock[]) => {
        setStocks(stocks)
    }

    useEffect(() => {
        socket?.on('updatingPrices', updatingStockListener);
        //console.log(prices);
        return () => {
            socket?.off('updatingPrices', updatingStockListener)
        };
    }, [updatingStockListener])

    console.log(stocks)


    function TableTradingPrices({chosenStocks}: TableTradingPricesProps) {


        return (<>
            {chosenStocks.map((stock: IStock) => <ContentPrices
                label={stock.label}
                name={stock.name}
                price={stock.price}
                id={stock.id}
                key={stock.id}
            />)}
        </>);
    }

    // max-w-xs
    return (
        <>
            <div className="w-full self-center">
                <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                            Date
                        </label>
                        <input
                            type="date"
                            className="border py-2 px-4 mb-2 w-full outline-0"
                            placeholder="Enter broker name..."
                            value={settings.date}
                            onChange={changeHandlerDate}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="speed">
                            Speed of trading
                        </label>
                        <input
                            type="number"
                            className="border py-2 px-4 mb-2 w-full outline-0"
                            placeholder="Enter speed of trading..."
                            value={settings.speed}
                            onChange={changeHandlerSpeed}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        {!settings.isStarted && <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Start trading</button>}
                        {settings.isStarted && <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Stop trading</button>}
                    </div>
                </form>
            </div>
            <Table
                title={'Trading'}
                tableRow={ <TableRowTradingPrices /> }
                tableContent={stocks.length > 0 && settings.isStarted && <TableTradingPrices chosenStocks={stocks} />}
            />
        </>
    );
}