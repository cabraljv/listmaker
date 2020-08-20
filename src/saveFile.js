const fs = require('fs');

class SaveFile{
  async save(question,awnser){
    const formatedAwnser = `${question.index}- ${question.question}\n${awnser.thanksCount} obrigados - ${awnser.content}\n\n`
    try {
      fs.appendFileSync('respostas.txt',formatedAwnser );
      
    }catch(error){
      console.log(error);
    }
  }
}

module.exports = new SaveFile();