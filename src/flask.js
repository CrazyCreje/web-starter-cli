const shell = require("shelljs");
const process = require("process");
const chalk = require("chalk");

exports.flask = async projectDir => {
  const working_dir = process.cwd();
  const createEnv = "python3 -m venv flask-env";
  const activateEnv = `${working_dir}/src/activate_venv.sh`;

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

  console.log(chalk.magenta("activating venv..."));
  if(shell.exec(activateEnv).code != 0){
    console.log(chalk.red("Error: failed to activate venv"));
    shell.exit(1);
  }
  shell.exec("which pip");
  console.log(chalk.magenta("installing python dependencies"));
  if(shell.exec("pip install flask").code != 0){
    console.log(chalk.red("Error: failed to install flask"));
    shell.exit(1);
  }
  if(shell.exec("pip freeze > requirements.txt").code != 0){
    console.log(chalk.red("Error: failed to install flask"));
    shell.exit(1);
  }



}
