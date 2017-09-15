# Gupy StarWars crud using data from swapi(http://swapi.co/)
Although the data is provided from the api, we load it into a relational database (sqlite3).

### This project is composed by a FrontEnd and a BackEnd project. Steps to run it are:
- Clone the git repostory:
```
git clone https://github.com/alecventura/gupy-sw-crud.git destFolder
```

Inside the destination folder will have 2 folders, one for FrontEnd project and one for BackEnd.

### For BackEnd:
- Install the dependencies: 'npm install'
- Run the server: 'npm run prod' - This will start the server on port 3002
	- The 'npm run dev' will run with nodemon.

### For FrontEnd: 
##### (The BackEnd server needs to be running on port 3002 so the FrontEnd can access it).
- Install the dependencies: 'npm install'
- Run the server: 'npm run dev' - This will start the server on port 3001