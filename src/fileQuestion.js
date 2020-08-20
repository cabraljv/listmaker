const fs = require('fs');

class FileQuestion{
  readFile(path){
    const data = fs.readFileSync(path, "utf8");
    try {
      const fileText = data.split('\n');
      var questions = []
      fileText.forEach(line=>{
        if(line===''){
          return;
        }
        if(line.indexOf('- ')>=1 && line.indexOf('- ')<=3){
          const question = {index:parseInt(line.substring(1,line.indexOf('- ')-1 )), question: line.substring(line.indexOf('- ')+2, line.length)}
          questions.push(question);
        }
      })
      return questions;
    } catch (error) {
      return error;
    }      
  }
  getQuestions(questions){
    return questions;
  }
}

module.exports = new FileQuestion();