import React, { useState } from "react";

export interface IStock {
    id: number | string,
    label: string,
    name: string,
    price: number | string
    date?: string
}

interface IStockContent {
    stock: IStock,
    isAllSelectedStocks: boolean
    openModal: () => void
}

export function Stock({stock, isAllSelectedStocks, openModal}: IStockContent) {

    const { id, label, name, price } = stock;

    const [isStockSelected, setIsStockSelected] = useState(false);

    const selectStockHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsStockSelected(prevState => !prevState);
        //isAllSelectedStocks = false;
        const stocksString = sessionStorage.getItem('stocks')
        let stocks: IStock[];
        if (stocksString){
            stocks = JSON.parse(stocksString);
        } else {
            stocks = [];
        }
        if ((event.target as HTMLInputElement).checked) {
            //console.log(stock)
            stocks.push(stock);
        } else{
            stocks = stocks.filter(stockEl => stockEl.id !== stock.id);
            //console.log(stock)
        }
        sessionStorage.setItem('stocks', JSON.stringify(stocks));
        console.log(sessionStorage.getItem('stocks'))
    }

    function viewHistoricalPrice() {
        //console.log(id)
        sessionStorage.setItem('viewHistoricalPriceStocks', JSON.stringify(stock))
        openModal();
    }


    return (
        <>
            <tr className="border-b hover:bg-blue-100 bg-white">
                <th>
                    <label>
                        <input type="checkbox" checked={isAllSelectedStocks || isStockSelected}
                               onChange={selectStockHandler} className="w-4 h-4" />
                    </label>
                </th>
                <td className="p-3 px-5"><p className="bg-transparent">{label}</p>
                </td>
                <td className="p-3 px-5"><p className="bg-transparent">{name}</p>
                </td>
                <td className="p-3 px-5"><p className="bg-transparent">{price}</p>
                </td>
                <td className="p-3 px-5 flex justify-end">
                    <button type="button"
                            className="mr-3 text-sm bg-blue-500
                             hover:bg-blue-700 text-white py-1 px-2
                             rounded focus:outline-none focus:shadow-outline"
                            onClick={viewHistoricalPrice}
                    >
                        All prices
                    </button>
                </td>
            </tr>
        </>
    );
}