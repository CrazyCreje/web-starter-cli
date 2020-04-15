const process = require("process");
const shell = require("shelljs");


//copy template
exports.express = async project_dir => {
  working_dir = process.cwd();
  //copy template to src folder
  if(shell.cp("./templates/express-server.js", `${project_dir}/src`) != 0){
    console.log(chalk.red("Error: failed copying template"));
    shell.exit(1);
  }

  //rename
  if(shell.mv(`${project_dir}/src/express-server.js`, `${project_dir}/src/server.js`) != 0){
    console.log(chalk.red("Error: failed renaming template"));
    shell.exit(1);
  }


  //TODO - this stuff will instal npm locally, because we need to actually
  //set up an npm project properly.
  // //install express
  // if(shell.cd(project_dir) = 0){
  //   console.log(chalk.red("Error: failed to change directory to project dir"));
  //   shell.exit(1);
  // }
  // if(shell.exec("npm install express") = 0){
  //   console.log(chalk.red("Error: failed to install express"));
  //   shell.exit(1);
  // }
}
