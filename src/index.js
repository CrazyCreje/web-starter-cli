const { prompt } = require('enquirer')
const shell = require('shelljs')
const Enquirer = require('enquirer')

if (!shell.which('git')) {
	shell.echo("It appears that you don't have git installed. Before running web-starter-cli,\n"
	+ "please install git and add it to your PATH.")
	shell.exit(1);
}

const npm = shell.which("npm"); // returns null if npm isn't installed or on path
const yarn = shell.which("yarn");

if (!npm && !yarn) {
	shell.echo("It appears that you don't have npm or yarn installed. Before running web-starter-cli,\n"
	+ "please install npm or yarn and add it to your PATH.")
	shell.exit(1);
}

// add welcome message

questions = [ // need to eliminate options based on {npm} and {yarn}
	{
		type: 'Select',
		name: 'packageManager',
		message: 'Choose a package manager: ',
		choices: ['npm', 'yarn'],
		default: 'npm'
	},
	{
        type: 'input',
        name: 'project',
        message: 'What is the name of your project?'
	},
	{
		type: 'Select',
		name: 'frontend',
		message: 'Choose a frontend framework: ',
		choices: ['React', 'Angular', 'Vue'],
		default: 'React'
	},
	{
		type: 'Select',
		name: 'backend',
		message: 'Choose a backend framework: ',
		choices: ['Express', 'Django', 'Flask'],
		default: 'Express'
	}

];

let answers = async () => await prompt(questions)

answers()


