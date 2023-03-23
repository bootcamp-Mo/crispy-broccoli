const inquirer = require('inquirer');
const fs = require('fs');

const generateREADME =
    ({ projectName, description, tableCont, install, usage,
        license, contribute, tests, questions, }) => `
        # ${projectName}

        ## Description
        ${description}
        
        ## Table of Contents
        ${tableCont}
        
        ## Installation
        ${install}
        
        ## Usage
        ${usage}
        
        ## License
        ${license}
        
        ## Contributing
        ${contribute}
        
        ## Tests
        ${tests}
        
        ## Questions
        ${questions}
    `;
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
            name: 'tableCont',
            message: 'Table of Contents: '
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
            type: 'input',
            name: 'license',
            message: 'License: '
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
    ])
    .then((data) => {
        const readmeContent = generateREADME(data);
        writeFile('README.md', readmeContent, (err) =>
            err ? console.log(err) : console.log('Success!')
        );
    });