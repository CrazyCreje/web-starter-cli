const chalk = require("chalk");
const pg = require("./projectGenorator");
const {
  getConfig,
  checkConfig,
  generateQuestions,
  answers
} = require("./prompt");

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

  pg.projectGenorator(response); //start project genoration

};
main();
