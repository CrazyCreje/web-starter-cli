const chalk = require("chalk");
const {
  getConfig,
  checkConfig,
  generateQuestions,
  answers
} = require("./prompt");
const git = require("./git");
const react = require("./react");

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
  gitRepo = new git(response.project);
  gitRepo.init();

  react.react(response.project);

};

main();
