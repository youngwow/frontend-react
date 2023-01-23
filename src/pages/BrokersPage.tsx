import React, {useContext} from "react";
import {Broker} from "../components/table/content/Broker";
import {Table} from "../components/table/Table";
import {Modal} from "../components/Modal";
import {CreateBroker} from "../components/CreateBroker";
import {ModalContext} from "../context/ModalContext";
import {IBroker, IBrokers} from "../models/broker";
import {useBrokers} from "../hooks/brokers";

function TableRowBrokers() {
    return (
        <>
            <tr className="border-b">
                <th className="text-left p-3 px-5">Name</th>
                <th className="text-left p-3 px-5">Balance</th>
            </tr>
        </>
    );
}

interface ITableContentBrokers {
    brokers: IBroker[],
    onDelete: (id: number) => void
}

function TableContentBrokers({brokers, onDelete}: ITableContentBrokers)  {
    // id={broker.id} name={broker.name}
    // value={broker.value}
    return (
        <>
            { brokers.map((broker: IBroker) => <Broker
                onDelete={onDelete}
                broker={broker}
                 key={broker.id} />)}
        </>
    );
}

export function BrokersPage(){

    const {modal, open: openModal, close: closeModal} = useContext(ModalContext);

    const { brokers, addBroker, deleteBroker } = useBrokers();


    const createHandler = (broker: IBroker) => {
        closeModal();
        // console.log(broker)
        // console.log(typeof broker.value)
        addBroker(broker)
    }

    const deleteHandler = (id: number) => {
        deleteBroker(id);
    }



    return (
        <>
            {modal &&
                <Modal children={
                <CreateBroker
                    onCreate={createHandler}/>}
                       title={'Add new broker'}
                       onClose={closeModal}
                       className={" w-[500px] p-5 rounded bg-white absolute top-10 left-1/2 -translate-x-1/2"}
            />}
            <Table
                title={'Brokers'}
                tableRow={ <TableRowBrokers></TableRowBrokers> }
                tableContent={ <TableContentBrokers brokers={brokers} onDelete={deleteHandler}></TableContentBrokers>}
            />
            <button
                className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2"
                onClick={openModal}
            >+</button>
        </>
    )
}