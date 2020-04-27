const shell = require("shelljs");
const process = require("process");
const chalk = require("chalk");

exports.django = async (projectDir, projectName) => {
  const working_dir = process.cwd();
  const createEnv = "python3 -m venv venv";
  const activateEnv = `${working_dir}/src/activate_venv_d.sh ${projectDir} ${projectName}`;

  console.log(chalk.magenta("copying server file..."))
  if(shell.mkdir("-p", `${projectDir}/src/server`).code!= 0){
    console.log(chalk.red("Error: failed to create src directory"))
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


  if(shell.cd(`${projectDir}`).code != 0) {
      console.log(chalk.red("Error: failed to change directory to project"));
      shell.exit(1);
    }

  //cd to ~/venv/[projectName]/[projectName]
  if(shell.cd(`${projectDir}/djangoServer`).code != 0) {
      console.log(chalk.red("Error: failed to change directory to project subdirectory"));
      shell.exit(1);
    }
  //open settings.py and add hello_world to list of installed appps
  if(shell.sed("-i", `s/'django.contrib.staticfiles','/django.contrib.staticfiles',\n'hello_world',/`, "settings.py").code != 0) {
      console.log(chalk.red("Error: failed to add hello_world to list of installed apps"));
      shell.exit(1);
    }

  //cd to ~[projectName]/hello_world/
  if(shell.cd(`${projectDir}/hello_world`).code != 0) {
      console.log(chalk.red("Error: failed to change directory to app subdirectory"));
      shell.exit(1);
    }

  //open views.py and add def hello_world(request):
  //                        return render(request, 'hello_world.html', {})
  if(shell.echo(`def hello_world(request): return render(request, 'hello_world.html', {})` >> "views.py").code != 0) {
      console.log(chalk.red("Error: failed to append views.py"));
      shell.exit(1);
    }

  //mkdir hello_world/templates/
  if(shell.mkdir("-p", `~/${projectDir}/hello_world/templates/`).code!= 0){
      console.log(chalk.red("Error: failed to create templates directory"))
      shell.exit(1);
    }

  //cd hello_world/templates
  if(shell.cd(`${projectDir}/hello_world/templates`).code != 0) {
      console.log(chalk.red("Error: failed to change directory to templates subdirectory"));
      shell.exit(1);
    }

  //open hello_world.html and add [message]
  if(shell.echo(`Thanks for using web-starter-cli,
      this message is from the django backend` >> "hello_world.html").code != 0) {
      console.log(chalk.red("Error: failed to append views.py"));
      shell.exit(1);
    }

  //cd to ~/[projectName]/[projectName]
  if(shell.cd(`${projectDir}/${projectDir}`).code != 0) {
      console.log(chalk.red("Error: failed to change directory to project subdirectory"));
      shell.exit(1);
    }

  //open urls.py and add from django.urls import path, include
  if(shell.sed("-i", `s/from django.urls import path/from django.urls import path, include,/`, "urls.py").code != 0) {
      console.log(chalk.red("Error: failed to add hello_world to list of installed apps"));
      shell.exit(1);
    }
  //add path('', include('hello_world.urls')),
  if(shell.sed("-i", `path('admin/', admin.site.urls),/path('admin/', admin.site.urls),\npath('', include('hello_world.urls')),/`, "urls.py").code != 0) {
      console.log(chalk.red("Error: failed to add hello_world to list of installed apps"));
      shell.exit(1);
    }

  //cd to ~/[projectName]/hello_world
  if(shell.cd(`${projectDir}/hello_world`).code != 0) {
      console.log(chalk.red("Error: failed to change directory to app subdirectory"));
      shell.exit(1);
    }

  //create file urls.py
  if(shell.echo(`"App urls"` >> "urls.py").code != 0) {
      console.log(chalk.red("Error: failed to create urls.py"));
      shell.exit(1);
    }

  //add from django.urls import path
  //    from hello_world import views

  //       urlpatterns = [
  //         path('', views.hello_world, name='hello_world'),
  //       ]
  if(shell.echo(`from django.urls import path` >> "urls.py").code != 0) {
      console.log(chalk.red("Error: failed to append urls.py"));
      shell.exit(1);
    }
  if(shell.echo(`from hello_world import views` >> "urls.py").code != 0) {
      console.log(chalk.red("Error: failed to append urls.py"));
      shell.exit(1);
    }
  if(shell.echo(`urlpatterns = [` >> "urls.py").code != 0) {
      console.log(chalk.red("Error: failed to append urls.py"));
      shell.exit(1);
    }
  if(shell.echo(`path('', views.hello_world, name='hello_world'),` >> "urls.py").code != 0) {
      console.log(chalk.red("Error: failed to append urls.py"));
      shell.exit(1);
    }
  if(shell.echo(`]` >> "urls.py").code != 0) {
      console.log(chalk.red("Error: failed to append urls.py"));
      shell.exit(1);
    }

  //run server
  //python manage.py runserver
  if(shell.cd(`${projectDir}`).code != 0) {
      console.log(chalk.red("Error: failed to change directory to project"));
      shell.exit(1);
    }
  if(shell.exec(`python manage.py runserver`).code!= 0){
      console.log(chalk.red("Error: failed to run server"))
      shell.exit(1);
    }


}
