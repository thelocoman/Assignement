## 🌟 WELCOME TO THE PROJECT

Please **download the project** from github to your computer with the **-Download ZIP-** and open it inside **VSCode**.

---

## 💻 HOW TO RUN THE FRONTEND

1.  **CD** to the frontend folder `Assignement-main/Frontend`

2.  Run `npm i`

3.  Run `npm run dev`

4.  The project will be available at `http://localhost:5173` in your web browser.
    
---

## ⚙️ HOW TO RUN THE BACKEND

**!!! IF YOU DON'T HAVE A POSTGRES SERVER ON YOUR LOCAL COMPUTER YOU MUST SET IT UP FIRST !!!**

1.  Go to the official PostgreSQL website `https://www.enterprisedb.com/downloads/postgres-postgresql-downloads` and download the interactive installer for your operating system.

2.  Run the downloaded file. During the installation, you will be prompted to:
    * Set a password for the default superuser, typically named **postgres**. **Remember this password!**
    * Choose the port (default is **5432**).
    * Select the components to install (make sure **PostgreSQL Server** and **Command Line Tools** are selected).

3.  The installer usually sets PostgreSQL up as a service (Windows) or a daemon (macOS/Linux) that starts automatically upon installation and whenever your computer starts.


**IF YOU DO HAVE A POSTGRES SERVER ON YOUR LOCAL COMPUTER YOU CAN CONTINUE TO THE NEXT STEPS**

1.  Open another terminal with the **split terminal** button inside VSCode and **CD** to the backend folder `Assignement-main/Backend` **Every folowing step is done inside this folder** .

2.  Run the command `psql -U postgres -h localhost`. When prompted, enter your password.

3.  **[ONLY RUN ONCE]** Once you are inside the postgresql command line interface run the command `CREATE DATABASE assignement;` - **Don't forget the semicolon at the end of the command!**

4.  Run the command `\c assignement` to make sure you are in the DB that you have created.

5.  **[ONLY RUN ONCE]** Run the command:
    ```sql
    CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    publication_date DATE DEFAULT CURRENT_DATE,
    last_update TIMESTAMP,
    categories VARCHAR(500),
    content TEXT NOT NULL
    );
    ```
    Once the table is created you can quit the postgresql command line interface with the command `\q`.

6.  Run command `npm init -y`

7.  Run command `npm install express pg dotenv`

8.  **Update the `.env` file** according to your database credentials **You can find it in the Assignement-main/Backend folder**.

9.  Install the extension **"REST Client** by the author -'Huachao Mao' inside VSCode if you don't have it already.

10. Run the command `node index.js`

11. Head over to the `annoncement-test.http` file and if you have properly downloaded the **"REST Client"** you should see a **"Send Request"** above each request (Above POST, GET, PUT, DELETE). You can try out all the requests to make sure the backend works properly.