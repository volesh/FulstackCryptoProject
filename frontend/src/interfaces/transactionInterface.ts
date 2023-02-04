export interface ITransaction {
    _id: string
    _user_id: string
    tokenId: string
    date: Date
    count: number
    price: number
    status: boolean
}
