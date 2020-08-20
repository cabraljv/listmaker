const Search = require('./search');
const FileQuestion = require('./fileQuestion');
const SaveFile = require('./saveFile')

async function runApp(){
  const questions = FileQuestion.readFile('questions.txt');
  await questions.forEach(async question=>{
    const bestAwnser = await Search.searchQuestion(question.question);
    SaveFile.save(question,bestAwnser);

  })
}
runApp();



