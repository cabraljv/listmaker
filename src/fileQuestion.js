const fs = require('fs');

class FileQuestion{
  async readFile(path){
    fs.readFile(path, "utf8", function(err, buf) {
      try {
        const fileText = buf.split('\n');
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
      
    });
  }
}

module.exports = new FileQuestion();