const shell = require("shelljs");
const process = require("process");
const chalk = require("chalk");

exports.django = async projectDir => {
  const working_dir = process.cwd();
  const createEnv = "python3 -m venv venv";
  const activateEnv = `${working_dir}/src/activate_venv_d.sh ${projectDir}`;

  console.log(chalk.magenta("copying server file..."))
  if(shell.mkdir("-p", `${projectDir}/src/server`).code!= 0){
    console.log(chalk.red("Error: failed to create src directory"))
    shell.exit(1);
  }
  if(shell.cp("./templates/django-server.py", `${projectDir}/src/server`).code != 0){
    console.log(chalk.red("Error: failed to copy django-server.py"));
    shell.exit(1);
  }
  if(shell.mv(`${projectDir}/src/server/django-server.py`, `${projectDir}/src/server/wsgi.py`).code != 0){
    console.log(chalk.red("Error: failed to rename template"));
    shell.exit(1);
  }

  if(shell.cd(projectDir).code != 0) {
    console.log(chalk.red("Error: failed to change directory to project"));
    shell.exit(1);
  }

  console.log(chalk.magenta("Creating venv for django..."));
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

  console.log(chalk.magenta("Returning to working dir"));
  if(shell.cd(working_dir).code != 0){
    console.log(chalk.red("Error: failed to change directories"));
    shell.exit(1);
  }

}
