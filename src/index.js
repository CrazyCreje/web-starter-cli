const { prompt } = require('enquirer');
const Enquirer = require('enquirer')

//I know we said we would use prompt, but I couldn't find a way to have slectable choices
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
    }

];

let answers = async () => await prompt(questions)

answers()

// inquirer
// 	.prompt(questions)
// 	.then(answers => {
// 		console.log(answers)
// 	});
