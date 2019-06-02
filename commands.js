const fs = require("fs");


 function done(output) {
     process.stdout.write(output);
     process.stdout.write('\nprompt > ');
 }


 function evaluateCmd(userInput) {

   const userInputArray = userInput.split(" ");
   const command = userInputArray[0];

   switch (command) {
     case "echo":
       commandLibrary.echo(userInputArray.slice(1).join(" "));
       break;
      case "cat":
        commandLibrary.cat(userInputArray.slice(1));
        break;
      case "head":
        commandLibrary.head(userInputArray.slice(1));
        break;
      case "tail":
        commandLibrary.tail(userInputArray.slice(1));
        break;
      default:
        commandLibrary.error();
   }
 }


 const commandLibrary = {
   "echo": function(userInput) {
     done(userInput);
   },
   "cat": function(fullPath) {
     const fileName = fullPath[0];
     fs.readFile(fileName, (err, data) => {
       if (err) throw err;
       done(data);
     });
   },
   "head": function(fullPath) {
     const fileName = fullPath[0];
     fs.readFile(fileName, 'utf8', (err, data) => {
       if (err) throw err;
       const n = 4;
       let splitData = data.split('\n');
       let headData = [];
       for(let i = 0; i < n; i++){
           headData.push(splitData[i]);
       }
       const head = headData.join('\n');
       done(head);
     })
   },
   "tail": function(fullPath) {
     const fileName = fullPath[0];
     fs.readFile(fileName, 'utf8', (err, data) => {
       if(err) throw err;
       const n = 2;
       let splitData = data.split('\n');
       let tailData = splitData.slice(n);
       const tail = tailData.join('\n');
       done(tail);
     })
   },
   "error": () => {
     const errorMessage = "That command does not exist";
     done(errorMessage);
   }
 };

 module.exports.commandLibrary = commandLibrary;
 module.exports.evaluateCmd = evaluateCmd;
