import React from "react";
import { Line } from "react-chartjs-2";

import {Chart, elements, registerables} from "chart.js";
import {IStock} from "./table/content/Stock";
import {IHistoricalData, useHistoricalStocks} from "../hooks/historicalStocks";

Chart.register(...registerables);


export function ViewHistoricalPrices() {
    const { allHistory } = useHistoricalStocks();

    let viewHistoricalPriceStocks = sessionStorage.getItem('viewHistoricalPriceStocks')
    if (!viewHistoricalPriceStocks){
        return (<></>);
    }
    console.log(allHistory)

    const historicalPriceStocks: IStock = JSON.parse(viewHistoricalPriceStocks);
    const indexStock = allHistory.findIndex((el: IHistoricalData) => el.label === historicalPriceStocks.label)
    const company: IHistoricalData = allHistory[indexStock];
    const companyLabels: string[] = [];
    const companyPrices: number[] = [];
    // TODO: fix that
    company?.stocks.map(element => {
        companyLabels.push(element.date)
    });
    company?.stocks.map(element => {
        companyPrices.push(parseInt(element.open));
    })
    //console.log(companyLabels);

    const data = {
        labels: companyLabels.length > 0 ? companyLabels : [],
        datasets: [
            {
                label: company?.label ? company.label : 'Loading...',
                data: companyPrices.length > 0 ? companyPrices : [],
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    };

    return (<>
        <div><Line data={data}/></div>
    </>)
}