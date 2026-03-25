# qa.automationexercise-api.pactumjs

Projeto de testes automatizados de API REST utilizando PactumJS e Mocha,
com validação de contrato via Joi e geração de relatório com Mochawesome.

## Tecnologias

- [PactumJS](https://pactumjs.github.io) — requisições e asserções de API
- [Mocha](https://mochajs.org) — test runner
- [Joi](https://joi.dev) — validação de schema nos testes de contrato
- [Mochawesome](https://github.com/adamgruber/mochawesome) — geração de relatório HTML

## Pré-requisitos

- [Node.js](https://nodejs.org) v18 ou superior
- [npm](https://www.npmjs.com) v8 ou superior
- [Git](https://git-scm.com)

## Instalação

Clone o repositório:
```bash
git clone https://github.com/elvictor013/qa.automationexercise-api.pactumjs.git
cd qa.automationexercise-api.pactumjs
```

Instale todas as dependências de uma vez:
```bash
npm install
```

Ou instale cada dependência individualmente:
```bash
# Test runner
npm install -D mocha

# Requisições e asserções de API
npm install -D pactum

# Validação de schema
npm install -D joi

# Relatório HTML
npm install -D mochawesome
```

## Execução

Executa os testes com o reporter padrão no terminal:
```bash
npm test
```

Executa os testes e gera relatório HTML na pasta `mochawesome-report/`:
```bash
npm run test:report
```

## Estrutura do projeto
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

## Suítes de teste

### Login
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /login | Login com sucesso + contrato |

### Usuários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /usuarios | Listagem + contrato |
| POST | /usuarios | Criação + contrato |
| GET | /usuarios/{_id} | Busca por id + contrato |
| PUT | /usuarios/{_id} | Edição por id |
| DELETE | /usuarios/{_id} | Exclusão por id |

### Produtos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /produtos | Listagem + contrato |
| POST | /produtos | Cadastro + contrato |
| GET | /produtos/{_id} | Busca por id + contrato |
| PUT | /produtos/{_id} | Edição por id |
| DELETE | /produtos/{_id} | Exclusão por id |

### Carrinhos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /carrinhos | Listagem + contrato |
| POST | /carrinhos | Cadastro + contrato |
| GET | /carrinhos/{_id} | Busca por id + contrato |
| DELETE | /carrinhos/concluir-compra | Conclusão de compra |
| DELETE | /carrinhos/cancelar-compra | Cancelamento de compra |

## Padrões adotados

- **Triple A** — todos os testes seguem o padrão Arrange, Act, Assert
- **Schemas separados** — validações Joi isoladas em arquivos dedicados
- **Helpers reutilizáveis** — funções auxiliares compartilhadas entre suítes

## Pipeline

O projeto possui pipeline configurada no GitHub Actions que executa
os testes automaticamente a cada push ou pull request na branch main.