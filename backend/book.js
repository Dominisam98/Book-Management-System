const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const joi = require("joi");

const bookSchema = joi.object({
  title: joi.string().max(255).required(),
  publicationYear: joi.number().integer().min(0).required(),
  author: joi.string().max(255).required(),
});

async function getBooks() {
  return prisma.book.findMany();
}

async function getBook(id) {
  return prisma.book.findUnique({
    where: { id },
  });
}

async function createBook(data) {
  console.log({ data });
  const validatedData = await bookSchema.validateAsync(data);
  return prisma.book.create({
    data: validatedData,
  });
}

async function updateBook(id, data) {
  const validatedData = await bookSchema.validateAsync(data);
  return prisma.book.update({
    where: { id },
    data: validatedData,
  });
}

async function deleteBook(id) {
  return prisma.book.delete({
    where: { id },
  });
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
