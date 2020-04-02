const shell = require("shelljs");
// const GitAPI = require("nodegit");

exports.react = async name => {
  if (
    shell.exec(
      `git clone --depth=1 https://github.com/react-boilerplate/react-boilerplate.git ./projects/${name}`
    ).code !== 0
  ) {
    shell.echo("Error: Git clone failed");
    shell.exit(1);
  }
  // const { stdout, stderr } = await exec(
  //   ``
  // );
  //   console.log(stdout);
  //   GitAPI.Clone(
  //     "https://github.com/react-boilerplate/react-boilerplate.git",
  //     `./projects/${name}`
  //   );
  //await exec('npm run setup')
  //await exec('npm run clean')
  //await exec('npm run generate')

  console.log("in react() function call");
};
