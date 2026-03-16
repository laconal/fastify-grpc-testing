export interface newBookInterface {
    title: string
    authorID: number
}

export interface bookInterface {
    id: number
    title: string
    authorID: number
    createdDate: Date
}

export interface updateInterface {
    id: number
    title: string
}