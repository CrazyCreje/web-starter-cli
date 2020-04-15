const process = require("process");
const shell = require("shelljs");
const chalk = require("chalk");
const git = require("./git");
const react = require("./react");
const express = require("./express");
const projectDir = "~/web-starter-projects/";

exports.projectGenorator = answers =>{
  //save current working directory
  working_dir = process.cwd();
  project_dir = `${projectDir}${response.project}`;

  //create project directory
  console.log(
    chalk.magenta(
      "Creating project "
    )
  );
  if(shell.exec(`mkdir -p ${project_dir}/src`).code!= 0) {
    console.log(chalk.red("Error: failed creating project directory"));
    shell.exit(1);
  }

  //create repo
  console.log(
    chalk.magenta(
      "Creating git repository"
    )
  );
  gitRepo = new git(response.project, projectDir);
  gitRepo.init();

  //backend
  backend(project_dir);
  if(shell.cd(working_dir) != 0){
    console.log(chalk.red("Error: failed returning to working dir"));
    shell.exit(1);
  }
  //frontend
  frontend(response);
  if(shell.cd(working_dir) != 0){
    console.log(chalk.red("Error: failed returning to working dir"));
    shell.exit(1);
  }

  //removing resources folder
  if (shell.rm("-rf", "./res").code !== 0) {
    shell.echo("Error: Copying react resources failed");
    shell.exit(1);
  }

  //done
  console.log(
    chalk.magenta(
      "Your new project has been created in the following directory: \n"
    ) + chalk.green(project_dir)

  );

  console.log(
    chalk.magenta(
      `To run your project, go to ${projectDir}${response.project} and run\n`
      + chalk.red("npm start ") + chalk.magenta("and open a browser to http://localhost:3000")
    )
  );

};


function frontend(answers){
    //this function will check which front end the user selects
    console.log(
      chalk.magenta(
        "Genorating front end boilerplate with "
      ) + chalk.red(response.frontend)
    );
    react.react(response.project);
}

function backend(project_dir){
  //this function will check which back end the user selects
  console.log(
    chalk.magenta(
      "Genorating back end boilerplate with "
    ) + chalk.red(response.backend)
  );
  express.express(project_dir);
}
