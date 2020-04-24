const shell = require("shelljs");
const process = require("process");
const chalk = require("chalk");

exports.flask = async projectDir => {
  const working_dir = process.cwd();
  const createEnv = "python3 -m venv flask-env";
  const activateEnv = `${working_dir}/src/activate_venv.sh ${projectDir}`;

  console.log(chalk.magenta("copying server file..."))
  if(shell.mkdir("-p", `${projectDir}/src/server`).code!= 0){
    console.log(chalk.red("Error: failed to create src directory"))
    shell.exit(1);
  }
  if(shell.cp("./templates/flask-server.py", `${projectDir}/src/server`).code != 0){
    console.log(chalk.red("Error: failed to copy flask-server.py"));
    shell.exit(1);
  }
  if(shell.mv(`${projectDir}/src/server/flask-server.py`, `${projectDir}/src/server/server.py`).code != 0){
    console.log(chalk.red("Error: failed to copy flask-server.py"));
    shell.exit(1);
  }


  //switching to project directory
  if(shell.cd(projectDir).code != 0) {
    console.log(chalk.red("Error: failed to change directory to project"));
    shell.exit(1);
  }

  console.log(chalk.magenta("Creating venv for flask..."));
  if(shell.exec(createEnv).code != 0){
    console.log(chalk.red("Error: failed to create python env"));
    shell.exit(1);
  }

  //this script runs the rest of the python setup stuff
  console.log(chalk.magenta("activating venv..."));
  if(shell.exec(activateEnv).code != 0){
    console.log(chalk.red("Error: failed to activate venv"));
    shell.exit(1);
  }

}
