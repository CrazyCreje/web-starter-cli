const shell = require("shelljs");
const chalk = require("chalk");
const git = require("./git");
const react = require("./react");

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
  if(shell.exec(`mkdir -p ${projectDir}/src`).code!= 0) {
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
  backend(response);
  //frontend
  frontend(response);

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

function backend(answers){
  //this function will check which back end the user selects
  console.log(
    chalk.magenta(
      "Genorating back end boilerplate with "
    ) + chalk.red(response.backend)
  );
}
