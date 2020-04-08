// Get the package
var inquirer = require("inquirer");
var fs = require("fs");
var axios = require("axios");

var questions = [
  {
    type: "input",
    name: "title",
    message: "What's the title of this Project?",
  },
  {
    type: "input",
    name: "desc",
    message: "How would you describe this project?",
  },
  {
    type: "input",
    name: "table_of_contents",
    message: "Whats the table of contents",
  },
  {
    type: "input",
    name: "installation",
    message: "where can this be installed?",
  },
  {
    type: "input",
    name: "usage",
    message: "How can this be used?",
  },
  {
    type: "list",
    name: "license",
    message: "Open-source or evil?",
    choices: ["Open-source", "Evil?"],
  },
  {
    type: "input",
    name: "contrib",
    message: "Who contributed to this project?",
  },
  {
    type: "input",
    name: "tests",
    message: "What tests did you do for this project?",
  },
  {
    type: "input",
    name: "github",
    message: "Enter your github username",
  },
];

inquirer.prompt(questions).then(function (answers) {
  console.log("Our answers:", answers);
  axios.get(`https://api.github.com/users/${answers.github}`).then(function (data) {
    axios.get(`https://api.github.com/users/${answers.github}/events/public`).then(function (emailResponse) {
      console.log(emailResponse.data[0].payload.commits[0].author);
      const email = emailResponse.data[0].payload.commits[0].author.email;
      const name = encodeURIComponent(data.data.name);
      const title = encodeURIComponent(answers.title);
      const regex = /"/gi;
      const badge = `https://img.shields.io/badge/${name}-${title}-Chartreuse`;
      var readMe = `
![picture of badge](${badge})
# Project Title: ${answers.title}

## Description: ${answers.desc}

## Table of Contents: ${answers.table_of_contents}

## Installation: ${answers.installation}

## Usage: ${answers.usage}

### License: ${answers.license}

### Contributing: ${answers.contrib}

### Tests: ${answers.tests}

### Contributor: 
![picture of ${data.data.name}](${data.data.avatar_url} "${data.data.name.replace(regex, "'")}")
${email}

    `;
      fs.writeFile("README.md", readMe, function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
  });
});
