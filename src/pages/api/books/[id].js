// pages/api/books/[id].js
import { PrismaClient } from '@prisma/client';
import authenticateTokenMiddleware from '@/utils/authenticateTokenMiddleware';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    switch (req.method) {
        case 'GET':
            return getBookById(req, res, id);
        case 'PUT':
            return updateBook(req, res, id);
        case 'DELETE':
            return deleteBook(req, res, id);
        default:
            return res.status(405).end(); // Method Not Allowed
    }
}

async function getBookById(req, res, id) {
    try {
        const book = await prisma.book.findUnique({
            where: { id: parseInt(id) },
        });
        res.json({ book });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateBook(req, res, id) {
    try {
        const { title, author, publisher, year, pages } = req.body;

        // Pastikan bahwa pages diubah menjadi tipe data yang sesuai
        const updatedPages = parseInt(pages);
        const updatedYear = parseInt(year);

        const book = await prisma.book.update({
            where: { id: parseInt(id) },
            data: {
                title,
                author,
                publisher,
                year: updatedYear,
                pages: updatedPages, // Gunakan nilai yang sudah diubah
            },
        });

        res.json({ book });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Book update failed' });
    }
}


async function deleteBook(req, res, id) {
    try {
        const book = await prisma.book.delete({
            where: { id: parseInt(id) },
        });
        res.json({ book });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Book deletion failed' });
    }
}

// Add authentication middleware to the endpoints that require it
export { authenticateTokenMiddleware };
