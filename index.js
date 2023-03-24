const inquirer = require('inquirer');
const fs = require('fs');

// This function returns a badge image based on the input license. 
// It uses an object to map licenses to their respective badges.
const getLicenseBadge = (license) => {
	const licenseBadges = {
		'MIT': '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
		'Apache 2.0': '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
		'IBM PLV 1.0': '[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)',
		'Mozilla PL 2.0': '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)',
		'None': '',
	};

	return licenseBadges[license];
};
// This function generates the README content using a template string. 
// It takes an object with properties for each section and returns a formatted string.
const generateREADME =
	({ projectName, description, install, usage,
		license, contribute, tests, githubUsername, email, }) => `
# ${projectName}

## Description
${description}
        
## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [License](#license)
5. [Contributing](#contributing)
6. [Tests](#tests)
7. [Questions](#questions)
        
## Installation
${install}
        
## Usage
${usage}
        
## License
${getLicenseBadge(license)}
        
## Contributing
${contribute}
        
## Tests
${tests}
        
## Questions
${generateQuestionsSection(githubUsername, email)}
    `;

// This function generates the Questions section of the README 
// using the provided GitHub username and email address.
const generateQuestionsSection = (githubUsername, email) => {
	return `Questions? Feel free to reach out through the following channels:

- [GitHub](https://github.com/${githubUsername})
- Email: ${email} 
`;
};

// This part of the code prompts the user for input using an array of question objects. 
// Each object defines a question, its type, and the name of the property that will store the answer. 
// After getting the user input, the code executes a callback function with the collected data.
inquirer
	.prompt([
		{
			type: 'input',
			name: 'projectName',
			message: 'Project name: '
		},
		{
			type: 'input',
			name: 'description',
			message: 'Description: '
		},
		{
			type: 'input',
			name: 'install',
			message: 'Installation: '
		},
		{
			type: 'input',
			name: 'usage',
			message: 'Usage: '
		},
		{
			type: 'list',
			name: 'license',
			message: 'Choose a license for your application:',
			choices: ['MIT', 'Apache 2.0', 'IBM PLV 1.0', 'Mozilla PL 2.0', 'None'],
		},
		{
			type: 'input',
			name: 'contribute',
			message: 'Contributing: '
		},
		{
			type: 'input',
			name: 'tests',
			message: 'Tests: '
		},
		{
			type: 'input',
			name: 'questions',
			message: 'Questions: '
		},
		{
			type: 'input',
			name: 'githubUsername',
			message: 'GitHub username: '
		},
		{
			type: 'input',
			name: 'email',
			message: 'Email address: '
		},
	])
	.then(async (data) => {
		// This is a callback function, the code calls generateREADME to generate the README 
		// content based on the user's input. Then, it writes the content to a README.md 
		// file using the fs.writeFile function. If there's an error, it prints the error; 
		// otherwise, it prints a success message.
		const readmeContent = generateREADME(data);
		fs.writeFile('README.md', readmeContent, (err) =>
			err ? console.log(err) : console.log('Success!')
		);
	});