const fs = require("fs").promises; 
const inquirer = require("inquirer");

const checkboxPrompt = ['Description', 'Table of Contents', 'Installation', 'Usage', 'Contributing', 'License', 'Tests', 'Questions'];
const LicensePrompt = ['MIT', 'GPLv3', 'Mozilla'];

async function PromptQuestions() {
    const data = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of your project?',
            name: 'projectName'
        },
        {
            type: 'checkbox',
            message: 'What sections do you want in your README?',
            name: 'checkboxSection',
            choices: checkboxPrompt
        },
        {
            type: 'list',
            message: 'Pick a license',
            name: 'readmeLicense',
            choices: LicensePrompt
        }
    ]);

    const title = data.projectName;

    await fs.appendFile('README.md', `# ${title} \n \n`);

    for (const item of data.checkboxSection) {
        if (item === 'License') {
            switch (data.readmeLicense) {
                case "MIT":
                    await fs.appendFile('README.md', `## License \n \n [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n \n`);
                    console.log('License Section Made');
                    break;
                case "GPLv3":
                    await fs.appendFile('README.md', `## License \n \n [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)\n \n`);
                    console.log('License Section Made');
                    break;
                case "Mozilla":
                    await fs.appendFile('README.md', `## License \n \n [![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)\n \n`);
                    console.log('License Section Made');
                    break;
            }
        } else {
            await promptDesc(item);
        }
    }
}

async function writeToFile() {
    try {
        await fs.writeFile('README.md', '');
        console.log('File Made');
    } catch (err) {
        console.error('Error creating file:', err);
    }
}

async function promptDesc(item) {
    const dat = await inquirer.prompt([
        {
            type: 'input',
            message: `Give a description for the ${item} section`,
            name: 'description'
        }
    ]);

    await fs.appendFile('README.md', `## ${item} \n ${dat.description} \n \n`);
    console.log(`${item} Section Made`);
}

async function init() {
    await writeToFile();
    await PromptQuestions();
}

init();
