import prisma from "../lib/prisma.js";

export const bookGetAll = async() => {
    const result = await prisma.book.findMany()
    return result.map(book => ({
        ...book,
        createdDate: book.createdDate.toISOString()
    }))
}

export const bookGet = async(id: number) => {
    const result = await prisma.book.findUniqueOrThrow({where: {id: id}})
    if (!result) return null
    return {
        ...result,
        createdDate: result.createdDate.toISOString()
    }
}

export const bookGetByAuthor = async(id: number) => {
    return await prisma.book.findMany({where: { authorID: id }})
}

export const bookCreate = async(title: string, authorID: number) => {
    return await prisma.book.create({data: {
        title: title,
        authorID: authorID
    }})
}

export const bookUpdate = async(id: number, data: {title: string}) => {
    return await prisma.book.update({
        where: {id: id},
        data: {
            title: data.title
        }
    })
}

export const bookDelete = async(id: number) => {
    return await prisma.book.delete({where: {id: id}})
}