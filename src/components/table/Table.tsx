import React from "react";
//import {Broker} from "./Broker";

interface TableProps {
    title: string,
    tableRow: React.ReactNode,
    tableContent?: React.ReactNode
}

export function Table({title, tableRow, tableContent}: TableProps) {
    return (
        <>
            <div className="text-gray-900 bg-white">
                <div className="p-4 flex">
                    <h1 className="text-3xl">
                        { title }
                    </h1>
                </div>
                <div className="px-3 py-4 flex justify-center">
                    <table className="w-full text-md bg-white shadow-md rounded mb-4">
                        <tbody>
                        { tableRow }
                        { tableContent }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}