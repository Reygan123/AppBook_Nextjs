// pages/api/books.js
import { PrismaClient } from '@prisma/client';
import authenticateTokenMiddleware from '@/utils/authenticateTokenMiddleware';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getBooks(req, res);
    case 'POST':
      return createBook(req, res);
    default:
      return res.status(405).end(); // Method Not Allowed
  }
}

async function getBooks(req, res) {
  try {
    const books = await prisma.book.findMany();
    res.json({ books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function createBook(req, res) {
  try {
    // Panggil middleware untuk memverifikasi token
    authenticateTokenMiddleware(req, res, async () => {
      const { title, author, publisher, year, pages } = req.body;
      const book = await prisma.book.create({
        data: {
          title,
          author,
          publisher,
          year: parseInt(year),
          pages: parseInt(pages),
        },
      });
      res.json({ book });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Book creation failed' });
  }
}

// Add authentication middleware to the endpoints that require it
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export { authenticateTokenMiddleware };
