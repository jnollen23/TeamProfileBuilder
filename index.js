require('dotenv').config();
const inquirer = require('inquirer');
const fs = require('fs');
let persons = [];
let currentPersonType = "";
const path = "TeamOrganization.html";

const continueQuestion = [
    {
        name: "continue",
        message: "Do you want to:",
        choices: [
            "Add an Engineer:",
            "Add an Intern:",
            "Finish Up Team:"
        ],
        type: "list"
    }
];

function finishedQuestions() {
    let body = "";
    persons.forEach(x => {
        this.body += createPersonSquare(x);
    });

    //create header
    const file = createHTMLStart() + body + createHTMLEnd();
    fs.writeFile(path, file, (err)=>{
        if(err) console.log(err);
        else console.log("Successfully create TeamOrganizationFile.html in program directory.")
    })

}
function createHTMLStart(){
    return`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Organization</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.2/css/bootstrap.css" integrity="sha512-Fik9pU5hBUfoYn2t6ApwzFypxHnCXco3i5u+xgHcBw7WFm0LI8umZ4dcZ7XYj9b9AXCQbll9Xre4dpzKh4nvAQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
<div class="navbar">
    <a class="brand">Team Organizational Chart</a>
</div>
<div class="row">`;
}

function createHTMLEnd(){
    return`</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.2/js/bootstrap.min.js" integrity="sha512-28e47INXBDaAH0F91T8tup57lcH+iIqq9Fefp6/p+6cgF7RKnqIMSmZqZKceq7WWo9upYMBLMYyMsFq7zHGlug==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</body>
</html>`;
}

function createPersonSquare(person) {
    return `    <div class="card">
        <div class="card-header">${person.name}</div>
        <div class="card-body">
            Email: ${person.email}
            ${person.type === "manager" ? "Office Number:" : person.type === "intern" ? "School:" : "Github:"} ${person.choice}
            Employee ID: ${person.id}
        </div>
    </div>`;
}

function createPersonQuestions(){
    return [
        {
            name: "name",
            message: "Employee Name:"
        },
        {
            name: "id",
            message: "Employee ID:"
        },
        {
            name: "email",
            message: "Employee Email Address:"
        },
        {
            name: "choice",
            message: currentPersonQuestion(currentPersonType)
        }
    ];
}

function currentPersonQuestion(type) {
    if (type === "engineer:") {
        return "Github Username:";
    }
    else if(type === "manager"){
        return "Office Number:";
    }
    else {
        return "School Name:";
    }
}

function makeNewPerson() {
    inquirer.prompt(createPersonQuestions())
        .then(answers => {
            addPerson(answers,currentPersonType === "Add an Engineer" ? "engineer" : "intern");
            continueProgram();
        })
}

function addPerson(person, type){
    person.type = type;
    persons.push(person);
}

function continueProgram() {
    inquirer.prompt(continueQuestion)
        .then(answers => {
            if (answers.continue === "Finish Up Team:") {
                finishedQuestions();
            }
            else {
                currentPersonType = answers.continue === "Add an Engineer" ? "engineer":"intern";
                makeNewPerson();
            }
        })
}

function startProgram() {
    console.log("Welcome to the Team Builder. Start by adding the team managers name.");
    currentPersonType = "manager";
    inquirer.prompt(createPersonQuestions())
        .then(answers => {
            addPerson(answers, manager);
            continueProgram();
        })
}

startProgram();
