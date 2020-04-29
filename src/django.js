const shell = require("shelljs");
const process = require("process");
const chalk = require("chalk");

exports.django = async (projectDir, projectName) => {
  sed = "sed";

  //on mac we use a different sed
  if (process.platform === "darwin") {
    console.log(chalk.magenta("Detected OSX"));
    sed = "gsed";
  }
  const working_dir = process.cwd();
  const createEnv = "python3 -m venv venv";
  const activateEnv = `${working_dir}/src/activate_venv_d.sh ${projectDir} ${projectName}`;

  console.log(chalk.magenta("copying server file..."));
  if (shell.mkdir("-p", `${projectDir}/src/server`).code != 0) {
    console.log(chalk.red("Error: failed to create src directory"));
    shell.exit(1);
  }

  if (shell.cd(projectDir).code != 0) {
    console.log(chalk.red("Error: failed to change directory to project"));
    shell.exit(1);
  }

  console.log(chalk.magenta("Creating venv for django..."));
  if (shell.exec(createEnv).code != 0) {
    console.log(chalk.red("Error: failed to create python env"));
    shell.exit(1);
  }

  //this script runs the rest of the python setup stuff
  console.log(chalk.magenta("activating venv..."));
  if (shell.exec(activateEnv).code != 0) {
    console.log(chalk.red("Error: failed to activate venv"));
    shell.exit(1);
  }

  console.log(chalk.magenta("Returning to working dir"));
  if (shell.cd(working_dir).code != 0) {
    console.log(chalk.red("Error: failed to change directories"));
    shell.exit(1);
  }

  if (shell.cd(`${projectDir}`).code != 0) {
    console.log(chalk.red("Error: failed to change directory to project"));
    shell.exit(1);
  }

  //cd to ~/venv/[projectName]/[projectName]
  if (shell.cd(`${projectDir}/djangoServer/djangoServer`).code != 0) {
    console.log(
      chalk.red("Error: failed to change directory to project subdirectory")
    );
    shell.exit(1);
  }
  //open settings.py and add hello_world to list of installed appps
  console.log(chalk.magenta("Editing settings.py"));
  if (
    shell.exec(`${sed} -i  "1s|^|CORS_ORIGIN_ALLOW_ALL=True\\n|" settings.py`)
      .code != 0
  ) {
    console.log(
      chalk.red("Error: failed to add hello_world to list of installed apps")
    );
    shell.exit(1);
  }

  if (
    shell.exec(
      `${sed} -i  "s|'django.contrib.staticfiles' ,|'django.contrib.staticfiles',\\n'hello_world',\\n 'corsheaders',|" settings.py`
    ).code != 0
  ) {
    console.log(
      chalk.red("Error: failed to add hello_world to list of installed apps")
    );
    shell.exit(1);
  }

  console.log(chalk.magenta("Editing settings.py - cors"));
  if (
    shell.exec(
      `${sed} -i  "s|'django.middleware.security.SecurityMiddleware',|'corsheaders.middleware.CorsMiddleware',\\n'django.middleware.common.CommonMiddleware',\\n'django.middleware.security.SecurityMiddleware',\\n|" settings.py`
    ).code != 0
  ) {
    console.log(
      chalk.red("Error: failed to add hello_world to list of installed apps")
    );
    shell.exit(1);
  }

  console.log(chalk.magenta("copying views.py and urls.py"));
  if (
    shell.cp(
      "-r",
      `${working_dir}/templates/django/*.py`,
      `${projectDir}/djangoServer/hello_world`
    ).code != 0
  ) {
    console.log(
      chalk.red("Error: failed to change directory to app subdirectory")
    );
    shell.exit(1);
  }

  //cd to ~/[projectName]/[projectName]
  if (shell.cd(`${projectDir}/djangoServer/djangoServer`).code != 0) {
    console.log(
      chalk.red("Error: failed to change directory to project subdirectory")
    );
    shell.exit(1);
  }

  //open urls.py and add from django.urls import path, include
  console.log(chalk.magenta("Editing django.urls 1/2"));
  if (
    shell.exec(
      `${sed} -i "s|from django.urls import path|from django.urls import path, include|g" urls.py`
    ).code != 0
  ) {
    console.log(
      chalk.red("Error: failed to add hello_world to list of installed apps")
    );
    shell.exit(1);
  }
  //add path('', include('hello_world.urls')),
  console.log(chalk.magenta("Edditing django.urls 2/2"));
  if (
    shell.exec(
      `${sed} -i  "s|path('admin/', admin.site.urls),|path('admin/', admin.site.urls), path('', include('hello_world.urls')),|g" urls.py`
    ).code != 0
  ) {
    console.log(
      chalk.red("Error: failed to add hello_world to list of installed apps")
    );
    shell.exit(1);
  }

  if (shell.cd(`${working_dir}`).code != 0) {
    console.log(
      chalk.red("Error: failed to change directory to project subdirectory")
    );
    shell.exit(1);
  }
};
