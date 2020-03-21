const chalk = require("chalk");
const {
  getConfig,
  checkConfig,
  generateQuestions,
  answers
} = require("./prompt");

const main = () => {
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
  answers(questions);
};

main();
