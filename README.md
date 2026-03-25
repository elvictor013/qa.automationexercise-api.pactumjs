# qa.automationexercise-api.pactumjs

Projeto de testes automatizados de API REST utilizando PactumJS e Mocha, com validação de contrato via Joi e geração de relatório com Mochawesome.

## Tecnologias

* PactumJS — requisições e asserções de API
* Mocha — test runner
* Joi — validação de schema nos testes de contrato
* Mochawesome — geração de relatório HTML
* GitHub Actions — integração contínua (CI)

## Pré-requisitos

* Node.js v18 ou superior
* npm v8 ou superior
* Git

## Instalação

Clone o repositório:

```bash
git clone https://github.com/elvictor013/qa.automationexercise-api.pactumjs.git
cd qa.automationexercise-api.pactumjs
```

Instale as dependências:

```bash
npm install
```

## Execução

Executa os testes com saída no terminal:

```bash
npm test
```

Executa os testes e gera relatório HTML:

```bash
npm run test:report
```

## Relatório de Testes

Após executar o comando:

```bash
npm run test:report
```

Será gerada a pasta:

```
mochawesome-report/
```

Para visualizar o relatório, abra o arquivo abaixo em qualquer navegador:

```
mochawesome-report/mochawesome.html
```

O relatório contém:

* Resumo da execução
* Testes que passaram e falharam
* Tempo de execução
* Detalhamento das validações e requisições

## Relatório na Pipeline (GitHub Actions)

A pipeline executa automaticamente os testes e disponibiliza o relatório como artefato.

Para acessar:

1. Acesse a aba **Actions** no repositório
2. Clique na execução mais recente
3. Vá até a seção **Artifacts**
4. Baixe o arquivo `mochawesome-report`
5. Extraia o conteúdo
6. Abra o arquivo `mochawesome.html`

## Estrutura do Projeto

```
projeto/
├── test/
│   ├── suites/
│   │   ├── login.test.js
│   │   ├── usuarios.test.js
│   │   ├── produtos.test.js
│   │   └── carrinhos.test.js
│   ├── schemas/
│   │   ├── login.schema.js
│   │   ├── usuarios.schema.js
│   │   ├── produtos.schema.js
│   │   └── carrinhos.schema.js
│   └── helpers/
│       └── setup.js
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── .mocharc.js
├── package.json
└── README.md
```

## Suítes de Teste

### Login

| Método | Endpoint | Descrição                    |
| ------ | -------- | ---------------------------- |
| POST   | /login   | Login com sucesso + contrato |

### Usuários

| Método | Endpoint        | Descrição               |
| ------ | --------------- | ----------------------- |
| GET    | /usuarios       | Listagem + contrato     |
| POST   | /usuarios       | Criação + contrato      |
| GET    | /usuarios/{_id} | Busca por id + contrato |
| PUT    | /usuarios/{_id} | Edição por id           |
| DELETE | /usuarios/{_id} | Exclusão por id         |

### Produtos

| Método | Endpoint        | Descrição               |
| ------ | --------------- | ----------------------- |
| GET    | /produtos       | Listagem + contrato     |
| POST   | /produtos       | Cadastro + contrato     |
| GET    | /produtos/{_id} | Busca por id + contrato |
| PUT    | /produtos/{_id} | Edição por id           |
| DELETE | /produtos/{_id} | Exclusão por id         |

### Carrinhos

| Método | Endpoint                   | Descrição               |
| ------ | -------------------------- | ----------------------- |
| GET    | /carrinhos                 | Listagem + contrato     |
| POST   | /carrinhos                 | Cadastro + contrato     |
| GET    | /carrinhos/{_id}           | Busca por id + contrato |
| DELETE | /carrinhos/concluir-compra | Conclusão de compra     |
| DELETE | /carrinhos/cancelar-compra | Cancelamento de compra  |

## Padrões Adotados

* Triple A (Arrange, Act, Assert) em todos os testes
* Schemas separados para validação de contrato com Joi
* Reutilização de helpers para reduzir duplicação
* Organização por suítes de domínio

## Integração Contínua (CI)

O projeto possui pipeline configurada no GitHub Actions que:

* Executa os testes automaticamente a cada push ou pull request na branch main
* Gera relatório de execução
* Disponibiliza o relatório como artefato para download

## Objetivo do Projeto

Este projeto foi desenvolvido com foco em:

* Demonstrar boas práticas em automação de testes de API
* Garantir validação funcional e de contrato
* Manter organização e legibilidade do código
* Integrar execução automatizada via pipeline
