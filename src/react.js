const {exec} = require('child_process');
exports.react = async (name) => {
    const {stdout, stderr} = await exec('git clone --depth=1 https://github.com/react-boilerplate/react-boilerplate.git ./projects/' + name )
    console.log(stdout, stderr)
    //await exec('npm run setup')
    //await exec('npm run clean')
    //await exec('npm run generate')

     console.log("does this do shit?")
}
