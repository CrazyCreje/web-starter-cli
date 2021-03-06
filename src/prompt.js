const { prompt } = require("enquirer");
const shell = require("shelljs");
const Enquirer = require("enquirer");

exports.getConfig = () => {
  return {
    npm: shell.which("npm"), // returns null if npm isn't installed or on path
    yarn: shell.which("yarn")
  };
};
// Checks user's installation of git, npm, and yarn
exports.checkConfig = ({ npm, yarn }) => {
  if (!shell.which("git")) {
    shell.echo(
      "It appears that you don't have git installed. Before running web-starter-cli,\n" +
        "please install git and add it to your PATH."
    );
    shell.exit(1);
  }

  if (!npm && !yarn) {
    shell.echo(
      "It appears that you don't have npm or yarn installed. Before running web-starter-cli,\n" +
        "please install npm or yarn and add it to your PATH."
    );
    shell.exit(1);
  }
  return 0;
};

exports.generateQuestions = ({ npm, yarn }) => {
  return [
    {
      type: "Select",
      name: "packageManager",
      message: "Choose a package manager: ",
      choices: [
        { name: "npm", disabled: !npm },
        { name: "yarn", disabled: !yarn }
      ],
      default: "npm"
    },
    {
      type: "input",
      name: "project",
      message: "What is the name of your project?"
    },
    {
      type: "Select",
      name: "frontend",
      message: "Choose a frontend framework: ",
      choices: ["React", { name: "Angular", disabled: true }, "Vue"],
      default: "React"
    },
    {
      type: "Select",
      name: "backend",
      message: "Choose a backend framework: ",
      choices: ["Express", "Django", "Flask"],
      default: "Express"
    }
  ];
};

// asynchronously awaits for user input on each question
exports.answers = async questions => {
  try {
    return await prompt(questions);
  } catch (err) {
    console.log(chalk.yellow("Closing web-stater-cli..."));
    shell.exit(1);
  }
};
