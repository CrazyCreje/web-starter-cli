const shell = require("shelljs");
const deps = require("./deps");

exports.vue = async (p_dir, pm) => {
  if (
    (await shell.cp("-r", "./templates/vue/*", "./templates/vue/.*", `${p_dir}`)
      .code) !== 0
  ) {
    shell.echo("Error: Copying vue resources failed");
    shell.exit(1);
  }

  // switch to working directory
  if (shell.cd(`${p_dir}`).code != 0) {
    shell.echo("Error: changing to project directory failed ");
    shell.exit(1);
  }

  await deps.deps(pm);
};
