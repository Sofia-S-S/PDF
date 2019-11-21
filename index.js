const fs = require("fs");
//const path = re4("path");
const inquirer = require("inquirer");
const api = require("./api");
const convertFactory = require("electron-html-to");
const generateHTML = require("./generateHTML");
const questions = [
  {
    type: "input",
    name: "username",
    message: "What is your github userName"
  },
  {
    type: "list",
    name: "color",
    message: "What is your favorite color?",
    choices: ["red", "blue", "green", "pink"]
  }
];

function init() {
  inquirer.prompt(questions).then(({ username, color }) => {
    api
      .getUser(username)
      .then(response =>
        api.getTotalStarts(username).then(starts => {
          return generateHTML({
            starts,
            color,
            ...response.data
          });
        })
      )
      .then(html => {
        var conversion = convertFactory({
          converterPath: convertFactory.converters.PDF
        });

        conversion({ html }, function(err, result) {
          if (err) {
            return console.error(err);
          }

          result.stream.pipe(path.join(__dirname, "resume.pdf"));
          conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
        });
        open(path.join(process.cwd(), "resume.pdf"));
      });
  });
}
init();
