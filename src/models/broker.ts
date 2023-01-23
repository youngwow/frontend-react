export interface IBroker{
    id: number,
    name: string,
    value: number
}

export interface IBrokers{
    brokers: IBroker[]
}

export interface IBrokerUpdate{
    name: string,
    value: number
}

export interface IBrokerCreate{
    name: string,
    value: number
}