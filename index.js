// Get the package
var inquirer = require("inquirer");
var fs = require("fs");

var questions = [
    {
      type: 'input',
      name: 'title',
      message: "What's the title of this Project?"
    },
    {
      type: 'input',
      name: 'desc',
      message: "How would you describe this project?",
    },
    {
      type: 'input',
      name: 'table_of_contents',
      message: "Whats the table of contents",
    },
    {
      type: 'input',
      name: 'installation',
      message: "where can this be installed?",
    },
    {
        type: 'input',
        name: 'usage',
        message: "How can this be used?",
      },
      {
        type: 'list',
        name: 'license',
        message: "Open-source or evil?",
        choices:["Open-source", "Evil?"]
      },
      {
        type: 'input',
        name: 'contrib',
        message: "Who contributed to this project?",
      },
      {
        type: 'input',
        name: 'tests',
        message: "What tests did you do for this project?",
      }
  ];
  
  inquirer.prompt(questions).then(function(answers) {
    console.log('Our answers:',answers);
    var readMe = `
    #Project Title: ${answers.title}

    ##Description: ${answers.desc}

    ##Table of Contents: ${answers.table_of_contents}

    ##Installation: ${answers.installation}

    ##Usage: ${answers.usage}

    ###License: ${answers.license}

    ###Contributing: ${answers.contrib}

    ###Tests: ${answers.tests}
    `
    fs.writeFile("README.md", readMe, function(err){
        console.log(err);
    })
  });