const { prompt } = require('enquirer');
const Enquirer = require('enquirer')

questions = [
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


