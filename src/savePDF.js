const pdfmake = require('pdfmake');
const fs = require('fs')
const fonts = {
  Roboto: {
    normal: './assets/fonts/Roboto-Regular.ttf',
    bold: './assets/fonts/Roboto-Bold.ttf',
    italics: './assets/fonts/Roboto-Italic.ttf',
    bolditalics: './assets/fonts/Roboto-BoldItalic.ttf'
  },
}
var printer = new pdfmake(fonts);

//Gera arquivo pdf com um determinado texto dentro
function gerarPdf(texto){
  var docDefinition = {
    content: [texto]
  };
  
  var now = new Date();
  
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(`${now.valueOf()}-respostas.pdf`));
  pdfDoc.end();
}
module.exports = gerarPdf;

