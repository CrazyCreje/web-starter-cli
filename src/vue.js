const shell = require("shelljs");
const deps = require("./deps");

exports.vue = async (name, pm) => {
  if (
    shell.cp(
      "-r",
      "./templates/vue/*",
      "./templates/vue/.*",
      `~/web-starter-projects/${name}`
    ).code !== 0
  ) {
    shell.echo("Error: Copying vue resources failed");
    shell.exit(1);
  }

  //switch working directory
  if (shell.cd(`~/web-starter-projects/${name}`).code != 0) {
    shell.echo("Error: changing to project directory failed ");
    shell.exit(1);
  }

  deps.deps(pm);
};
