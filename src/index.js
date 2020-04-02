const chalk = require("chalk");
const git = require("./git");
const react = require("./react");
const {
  getConfig,
  checkConfig,
  generateQuestions,
  answers
} = require("./prompt");

const projectDir = "~/web-starter-projects/";

const main = async () => {
  console.log(
    chalk.magenta(
      "Welcome to web-starter-cli!\nThis program is designed to make your web-development experience easier."
    )
  );
  console.log(
    chalk.magenta(
      "It will create a Git repository, install dependencies, and generate boilerplate\nbased on your chosen frameworks."
    )
  );


  const config = getConfig();

  checkConfig(config);
  const questions = generateQuestions(config);
  response = await answers(questions);

  //TODO - move this into project generator when that exists
  gitRepo = new git(response.project, projectDir);
  gitRepo.init();
  react.react(response.project);
  console.log(
    chalk.magenta(
      "Your new project has been created in the following directory: \n"
    ) + chalk.green(`${projectDir}${response.project}`)
  );

  console.log(
    chalk.magenta(
      `To run your project, go to ${projectDir}${response.project} and run\n`
      + chalk.red("npm start ") + chalk.magenta("and open a browser to http://localhost:3000")
    )
  );

};

main();
