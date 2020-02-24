var prompt = require('prompt');
var inquirer = require('inquirer');

//I know we said we would use prompt, but I couldn't find a way to have slectable choices
questions = [
	{
		type: 'list',
		name: 'packageManager',
		message: 'Choose a package manager: ',
		choices: ['npm', 'yarn'],
		default: 'npm'
	}
];


inquirer
	.prompt(questions)
	.then(answers => {
		console.log(answers)
	});
