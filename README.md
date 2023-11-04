# Inspired Project

Project For UF CEN3031 Group project assignment.

You must install [Node.js](https://nodejs.org) to run the project.
To install the project clone the repository to your local system, then in the root directery run `npm install` to download the required modules to run the project locally.
Then navigate to the src/client/ subdirectory `cd src/client` and run the command `npm install` again to download the modules necessary for the client to build and run (basically just [React](https://reactjs.org)). Finally navigate to the server directory `cd ../server` amd run the command `npm install` for the final time to get the files required for the server to run.

Before the project can be ran the client application needs to be built. This is done by navigating to the client folder and running the command `npm run build`. Make sure this completes successfully, if any errors are generated they will need to be dealt with. This process will need to be repeated after any changes to the client application.

To run the project navigate to the main root directory and run the command `npm run dev` to launch the server and the client at the same time. Your browser will attempt to open the project automatically at [localhost:3000](localhost:3000), but at least for me the project could not open on 3000 and fell back to port 4000 instead ([localhost:4000](localhost:4000)) so if you don't see anything try navigating there. The port that is used will be reported in the command output so be sure to reference that if the project does not show up.

To add pages create new jsx files in src/client/src/routes, then reference them in src/client/src/index.js. Links will be needed to navigate to these pages, both root and about link to eachother so you can reference that.

This project uses [react-node-template](https://github.com/mattvukas/react-node-template) as a base.