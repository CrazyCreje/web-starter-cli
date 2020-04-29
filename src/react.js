const shell = require("shelljs");
const deps = require("./deps");

exports.react = async (p_dir, pm) => {
  if (
    (await shell.cp(
      "-r",
      "./templates/react/*",
      "./templates/react/.*",
      `${p_dir}`
    ).code) !== 0
  ) {
    shell.echo("Error: Copying react resources failed");
    shell.exit(1);
  }

  //switch working directory
  if (shell.cd(`${p_dir}`).code != 0) {
    shell.echo("Error: Copying react resources failed");
    shell.exit(1);
  }

  await deps.deps(pm);
};
