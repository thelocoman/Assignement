HOW TO RUN THE FRONTEND:

1. Download the project from github to your computer with the -Download ZIP-

2. CD to the frontend folder (Assignement-main/Frontend)

3. Run "npm i" 

4. Run "npm run dev"

5. The project will be available at localhost:5173 in your web browser






HOW TO RUN THE BACKEND: 

IF YOU DON'T HAVE A POSTGRES SERVER ON YOUR LOCAL COMPUTER YOU MUST SET IT UP FIRST

1. Go to the official PostgreSQL website (https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) and download the interactive installer for your operating system.

2. Run the downloaded file. During the installation, you will be prompted to:
    - Set a password for the default superuser, typically named postgres. Remember this password!
    - Choose the port (default is 5432).
    - Select the components to install (make sure PostgreSQL Server and Command Line Tools are selected).

3. The installer usually sets PostgreSQL up as a service (Windows) or a daemon (macOS/Linux) that starts automatically upon installation and whenever your computer starts.



IF YOU DO HAVE A POSTGRES SERVER ON YOUR LOCAL COMPUTER YOU CAN CONTINUE TO THE NEXT STEPS

1. CD to the backend folder (Assignement-main/Backend)

2. Run the comman "psql -U postgres -h localhost". When prompted enter your password

3. Once you are inside the postgresql command line interface run the command "CREATE DATABASE assignement;" - Don't forget the semicolon at the end of the command!

4. Run the command "\c assignment" to make sure you are in the db that you have created.

5. Run the command:

CREATE TABLE announcements (
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
publication_date DATE DEFAULT CURRENT_DATE,
last_update TIMESTAMP,
categories VARCHAR(500),
content TEXT NOT NULL
);

6. Run command "npm init -y"

7. Run command "npm install express pg dotenv"

8. Update the .env file according to your database credentials

9. Install the extension "REST Client by -Huachao Mao" inside VSCode 

10. Head over to the annoncement-test.http file and if you have properly downloaded the "REST Client" you should see a "Send Request" above each request. You can try out all the requests to make sure the backend works properly.
