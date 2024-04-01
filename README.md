# Personal Finances Project

## Project available at:

See project running at [Personal Finances project](https://personal-finance-front-production.up.railway.app/)

## Goals

This project that consists of an application for personal income and expense records. Where you can perform the basic CRUD operations: Create, Read, update and delete Movement records individually.

Each Movement is a record and is associated with certain fields: **date of movement**, **type of movement**; that is, if it is an Expense or an Income movement. The **category of the movement**, you can select between Food, Rent, Expenses, Bonus, Salary, etc. You must also enter the **amount of movement**, and if you wish you can leave a **comment or message** regarding the movement you want to save.
- You can also view all records in a table.
- Observe alerts every time any of the CRUD operations are carried out.
- View a total balance of operations, marked in red when the balance is less than or equal to zero; and green when it is positive.

## Behind the scenes

Worked with mysql as the database engine, `Nodejs` on the backend and `Reactjs` on the frontend. Although it is very simple, it is very complete and interesting because it develops some very useful features and concepts in the software industry, among them we can name:
- Basic CRUD on both frontend and backend.
- One simple page type project, where all the functionalities are on the same screen (frontend).
- Reuse of components in React, such as the Alert components (to report successful actions or errors) and a Modal type component (which is used to create or update records).

- Code reuse; such as functions that are called from different parts of the code (such as: `getQuery` in the backend and `fetchAction` in the frontend), which allow agility when coding and "saving" resources in memory, allowing the latter to have fewer resources in hardware therefore less money in your deploy.

- Good error handling, both from the front and backend.
- Management of state variables to show or hide components.
- Possibility of creating multiple records at once, although this possibility is intended for sample purposes only; It works very well.
- Management of asynchronous functions for database queries.
- Good handling of parsing functions to convert date and time format standards compatible with both frontend and backend.

- Successful use of database queries to obtain frontend configuration data, avoiding repetitive queries to obtain the same information in different parts or uses of the code. Although this brings with it an increase in the resources to be used in the frontend, the amount of data is not appreciably greater; Therefore, at a strictly technical level, its use does not entail greater use of resources, or in other words; It does not affect the end user's perception of some kind of "poor performance".

## Other details

- In line **265:59 of the List.js file** you can modify the number of random records you want to add from the **generateRandom** function by **Generar Registros** button.

## Upcoming Features

- Add a modal to query when deleting a record.
- Implement paging of records.
- Implementation of a calendar to filter records by dates.
- Individualize the Modal component for create or update new movememt, that is; place it in a separate file as a component to import within the List component; and thus be able to use it from other parts of the code. This is in order to obtain better readability and clarity of the code; meeting the standards of the software development industry.

- Implement registration, login and user authentication; so that many users can keep their own personal records of expenses and income.

## How to Run

### Enviroment Variables
On develop or production mode you must create a few Enviroment Variables with Vite default configuration for it:

VITE_BACK_HOST, VITE_BACKEND_PORT and VITE_ENVIROMENT, the lastwith "development" or "production" value.

### Run on Develop

npm run dev

### Run on Production

Use or modify start script