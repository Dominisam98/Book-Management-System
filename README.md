# Book-Management-System

# Technologies used to build this site...

**React js** - for the frontend
  
**Node js** - for the backend

**Prisma** - as the ORM
 
**Apollo Client** - for GraphQL communication 
 
**Express** - for the server

# Follow The Process To Run The Application

install **node version 18** and **npm version 8**

change the **DATABASE_URL** in your **.env** file
**DATABASE_URL="mysql://root:password@localhost:3306/book_management" **//example


# To Run The Backend

run these command from terminal...

**npm install** (in root folder to download the packages to run the backend)

start your mysql server

**Prisma schema**

The Prisma schema file (short: schema file, Prisma schema or schema) is the main configuration file for your Prisma setup. It is typically called schema.prisma and consists of the following parts:

Data sources: Specify the details of the data sources Prisma should connect to (e.g. a PostgreSQL database)
Generators: Specifies what clients should be generated based on the data model (e.g. Prisma Client)
Data model definition: Specifies your application models (the shape of the data per data source) and their relations

run these commands to generate the data source client code and to create a new migration

**prisma generate** //Reads all above mentioned information from the Prisma schema to generate the correct data source client code (e.g. Prisma Client).

**prisma migrate dev** //Reads the data sources and data model definition to create a new migration.

to run the prisma studio
**npm prisma studio**

**prisma generate **

Prisma Client is an auto-generated database client that's tailored to your database schema. By default, Prisma Client is generated into the node_modules/.prisma/client folder

-Ensure that you have Prisma CLI installed on your machine.

**npm run dev** ....to start the development mode

**npm start** ....to start prod mode

# To Run The Front-End

cd book-management-system\frontend
**npm install** (in frontend folder to download the packages to run the frontend)
**npm start** //to start the frontend
**npm run build** //to generate the build

# Features

Book Management: Users can add new books to their collection by providing book details such as title, author, and publication year. They can also edit existing book information and delete books from their list of books.

Responsive Design: The website is designed to be responsive, ensuring optimal user experience across different devices and screen sizes.


