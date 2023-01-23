import React, {useContext} from "react";
import {Stock, IStock} from "../components/table/content/Stock";
import {Table} from "../components/table/Table";
import {useStocks} from "../hooks/stocks";
import {ModalContext} from "../context/ModalContext";
import {Modal} from "../components/Modal";
import {ViewHistoricalPrices} from "../components/ViewHistoricalPrices";

interface TableRowBrokersProps {
    isAllStocks: boolean
    //selectAllStocks: (isSelected: boolean) => void
}

interface TableContentStocksProps {
    stocks: IStock[]
    openModal: () => void
}

export function StocksPage() {

    function TableRowStocks({ isAllStocks }: TableRowBrokersProps) {

        function allStocksHandler(event: React.ChangeEvent<HTMLInputElement>) {
            //console.log((event.target as HTMLInputElement).checked)
            //console.log(isAllSelectedStocks)
            if ((event.target as HTMLInputElement).checked) {
                //setSelectedStocks(stocks);
                sessionStorage.setItem('stocks', JSON.stringify(stocks))
            } else {
                //setSelectedStocks([]);
                sessionStorage.setItem('stocks', JSON.stringify([]))

            }
            setIsAllSelectedStocks(prevState => !prevState);
            console.log(sessionStorage.getItem('stocks'));
        }

        return (
            <>
                <tr className="border-b">
                    <th><label>
                        <input type="checkbox" checked={isAllStocks} onChange={allStocksHandler} className="w-4 h-4"/>
                    </label></th>
                    <th className="text-left p-3 px-5">Label</th>
                    <th className="text-left p-3 px-5">Name</th>
                    <th className="text-left p-3 px-5">Price</th>
                </tr>
            </>
        );
    }

    function TableContentStocks({stocks}: TableContentStocksProps) {
        // id={stock.id} label={stock.label} name={stock.name}

        // price={stock.price}
        return (
            <>
                { stocks.map((stock) => <Stock
                    stock={stock}
                    isAllSelectedStocks={isAllSelectedStocks}
                    openModal={openModal}
                     key={stock.id} />)}
            </>
        );
    }

    const { stocks,
        isAllSelectedStocks,
        setIsAllSelectedStocks} = useStocks();

    const {modal, open: openModal, close: closeModal} = useContext(ModalContext);


    let viewHistoricalPriceStocks = sessionStorage.getItem('viewHistoricalPriceStocks');
    let ObjectViewHistoricalPriceStocks;
    if (viewHistoricalPriceStocks){
        ObjectViewHistoricalPriceStocks = JSON.parse(viewHistoricalPriceStocks);
    } else{
        ObjectViewHistoricalPriceStocks = {
            name: '',
            label: '',
            price: ''
        }
    }

    return (
        <>
            {modal &&
                <Modal children={<ViewHistoricalPrices/>}
                       title={`
                        ${ObjectViewHistoricalPriceStocks.label}
                         ${ObjectViewHistoricalPriceStocks.name}`}
                       onClose={closeModal}
                       className={"w-[1000px] h-[600px] p-5 rounded bg-white absolute top-10 left-1/2 -translate-x-1/2"}
                />}
            <Table
                title={'Stocks'}
                tableRow={ <TableRowStocks isAllStocks={isAllSelectedStocks}></TableRowStocks> }
                tableContent={ <TableContentStocks stocks={stocks} openModal={openModal}
                ></TableContentStocks>}
            />
        </>
    );
}