# ListMaker

<img src="./docs/listmaker.png">

![version](https://img.shields.io/badge/version-0.2-green) ![license](https://img.shields.io/badge/license-mit-blue) ![contrubuitors](https://img.shields.io/badge/contribuitors-1-red) 

Esse programa a partir de um arquivo com perguntas do feltre busca no site brainly pela melhor resposta e as salva em uma lista de exercicios+respostas em formato pdf

## Requisitos
- NodeJS 12.x

## Como utilizar

Clone o repositório na sua máquina
```sh
$ git clone https://github.com/cabraljv/listmaker
```

Instale os pacotes
```sh
$ npm install
```

Insira o número da página + o número das questões no arquivo questions.txt. As pesguntas devem estar no formato:

```
Pagina {numero da pagina}
{questao1},{questao2}
```

Exemplo:

```
Pagina 88
22,24,25
```
### Atenção
A aplicação atualmente funciona somente com questões do feltre 2

Para rodar o programa basta rodar o comando

```sh
$ npm run start
```

Após isso vai ser gerado um arquivo pdf com todas as melhores respostas encontradas


## Graphql API
>Graphql API na lingua portuguesa https://brainly.com.br/graphql/pt

## Contribuidores
- João Victor Cabral

Feito com 💜