# Dependencies:
React ^17.0.2
MySQL with phpMyAdmin

# Import the Database:
1) Open phpMyAdmin - I used XAMP to run a MariaDB MySQL Server.

2) Make sure the following MySQL connection settings are correct inside the file `config-dev.json` located in the Backend:

Database Host: `localhost`

Database Name: `thirdprojectdb`

Database User: `root`

Database Default Password: ` ` (empty)

# Download and Install:
1) Download my project and cd into it using the following commands:
```
git clone https://github.com/itzalg22/React-Vacations-Full-Stack-Project
cd React-Vacations-Full-Stack-Project
```

2) Install required node modules for the Backend and the Frontend using the following commands:
```
cd frontend
npm install
cd ../backend
npm install
```

# Run Instructions:
1) Make sure the MySQL server is up and running - For XAMP you also need to make sure Apache is running to be able to access phpMyAdmin.
2) First, Run the Backend: (Make sure you're on the `React-Vacations-Full-Stack-Project` folder)
```
cd backend
node app
```
3) Next, Run the Frontend:
```
cd ../frontend
npm start
```

The project should open up on http://localhost:3000/ and load up my first react project!

# Screenshots:

![image](https://user-images.githubusercontent.com/79161997/138907434-c33e949c-fe29-4a53-a40f-aad4c0b57297.png)

![image](https://user-images.githubusercontent.com/79161997/138907582-35dfd42f-4d19-40a3-861f-0bbaa5fa9a5d.png)

![image](https://user-images.githubusercontent.com/79161997/138908187-3cd625d8-7805-41e0-b9de-3d4b5595499a.png)

![image](https://user-images.githubusercontent.com/79161997/138908638-ee658d0a-0a64-49fe-8b10-b7ae70e3ec87.png)
