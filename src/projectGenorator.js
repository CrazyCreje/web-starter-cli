const process = require("process");
const shell = require("shelljs");
const chalk = require("chalk");
const git = require("./git");
const react = require("./react");
const flask = require("./flask");
const vue = require("./vue");
const django = require("./django");

const projectDir = "~/web-starter-projects/";

exports.projectGenorator = async answers => {
  //save current working directory
  const working_dir = process.cwd();
  const project_dir = `${projectDir}${answers.project}`;
  //create project directory
  console.log(chalk.magenta("Creating project "));
  if (shell.exec(`mkdir -p ${project_dir}/src`).code != 0) {
    console.log(chalk.red("Error: failed creating project directory"));
    shell.exit(1);
  }

  //create repo
  console.log(chalk.magenta("Creating git repository"));
  gitRepo = new git(answers.project, projectDir);
  gitRepo.init();

  await moveBoilerplate(project_dir, answers, working_dir);

  //removing resources folder
  if (shell.rm("-rf", "./res").code !== 0) {
    shell.echo("Error: Copying react resources failed");
    shell.exit(1);
  }

  //done
  console.log(
    chalk.magenta(
      "Your new project has been created in the following directory: \n"
    ) + chalk.green(project_dir)
  );

  console.log(
    chalk.magenta(
      `To run your project, change directory to ${projectDir}${answers.project} and run\n` +
        chalk.cyan(`${answers.packageManager} run server `) +
        chalk.magenta(
          "then open another terminal in the same directory and run "
        ) +
        chalk.cyan(`${answers.packageManager} start`)
    )
  );
};

const moveBoilerplate = async (project_dir, response, working_dir) => {
  console.log(
    chalk.magenta("Genorating back end boilerplate with ") +
      chalk.cyan(response.backend)
  );

  returnToProject(working_dir);

  switch (response.backend) {
    case "Flask":
      flask.flask(project_dir);
      break;
    case "Django":
      django.django(project_dir, response.project);
      break;
    case "Express":
  }

  returnToProject(working_dir);
  copyPJSON(response.frontend, response.backend, project_dir);
  returnToProject(working_dir);

  console.log(
    chalk.magenta("Genorating front end boilerplate with ") +
      chalk.cyan(response.frontend)
  );

  switch (response.frontend) {
    case "React":
      await react.react(project_dir, response.packageManager);
      break;
    case "Vue":
      await vue.vue(project_dir, response.packageManager);
      break;
  }
};

const copyPJSON = (frontend, backend, p_dir) => {
  switch (frontend) {
    case "React":
      switch (backend) {
        case "Express":
          if (
            shell.cp("./templates/pJSON/react-exp/package.json", `${p_dir}`)
              .code !== 0
          ) {
            shell.echo("Error: copy of react-express package.json failed");
            shell.exit(1);
          }
          break;
        case "Django":
          if (
            shell.cp("./templates/pJSON/react-django/package.json", `${p_dir}`)
              .code !== 0
          ) {
            shell.echo("Error: copy of react-django package.json failed");
            shell.exit(1);
          }
          break;
        case "Flask":
          if (
            shell.cp("./templates/pJSON/react-flask/package.json", `${p_dir}`)
              .code !== 0
          ) {
            shell.echo("Error: copy of react-flask package.json failed");
            shell.exit(1);
          }
          break;
      }
      break;
    case "Vue":
      switch (backend) {
        case "Express":
          if (
            shell.cp("./templates/pJSON/vue-exp/package.json", `${p_dir}`)
              .code !== 0
          ) {
            shell.echo("Error: copy of vue-express package.json failed");
            shell.exit(1);
          }
          break;
        case "Django":
          if (
            shell.cp("./templates/pJSON/vue-django/package.json", `${p_dir}`)
              .code !== 0
          ) {
            shell.echo("Error: copy of vue-django package.json failed");
            shell.exit(1);
          }
          break;
        case "Flask":
          if (
            shell.cp("./templates/pJSON/vue-flask/package.json", `${p_dir}`)
              .code !== 0
          ) {
            shell.echo("Error: copy of vue-flask package.json failed");
            shell.exit(1);
          }
          break;
      }
      break;
  }
};

// brings user back to web-starter-cli
const returnToProject = w_dir => {
  if (shell.cd(w_dir) != 0) {
    console.log(chalk.red("Error: failed returning to working dir"));
    shell.exit(1);
  }
};
