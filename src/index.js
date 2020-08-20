const Search = require('./search');
const FileQuestion = require('./fileQuestion');
const SaveFile = require('./saveFile')
const SavePDF = require('./savePDF')

async function runApp(){
  const questions = FileQuestion.readFile('questions.txt');
  var toSave='';
  for (let i=0;i<questions.length;i++){
    const bestAwnser = await Search.searchQuestion(questions[i].question);
    toSave+=SaveFile.formatAwnser(questions[i],bestAwnser);
  }
  SavePDF(toSave);
}
runApp();



