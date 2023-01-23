import React from 'react'
import {Link} from 'react-router-dom'

export function Navigation() {
    return (
        <>
            <nav className="h-[50px] flex justify-between px-5 bg-gray-500 items-center text-white">
                <span className="font-bold">Securities Exchange</span>
            <span>
                <Link to="/brokers" className="mr-2">Brokers</Link>
                <Link to="/stocks" className="mr-2">Stocks</Link>
                <Link to="/settings" className="mr-2">Settings</Link>
            </span>
            </nav>
        </>
    );
}
