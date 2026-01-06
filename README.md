# 💰 Finshow

Sistema de gerenciamento financeiro pessoal para controle de transações, cartões e categorias.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Regras de Negócio](#-regras-de-negócio)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Como Executar](#-como-executar)
- [Endpoints da API](#-endpoints-da-api)

---

## 📖 Sobre o Projeto

O **Finshow** é uma aplicação fullstack para gerenciamento de finanças pessoais. Permite que usuários registrem suas transações financeiras (receitas e despesas), organizem por categorias e associem a cartões de crédito/débito.

### Funcionalidades

- ✅ Autenticação de usuários (registro e login)
- ✅ Gerenciamento de transações (receitas e despesas)
- ✅ Categorização de transações
- ✅ Cadastro de cartões de crédito/débito
- ✅ Dashboard com visualização de dados
- ✅ Filtros e busca de transações

---

## 📜 Regras de Negócio

### Usuários

- Cada usuário possui um cadastro único identificado por email
- A senha deve ser forte (requisitos de segurança aplicados)
- Autenticação via JWT com expiração configurável

### Transações

- Cada transação pertence a um único usuário
- Tipos de transação:
  - `income` - Receita (entrada de dinheiro)
  - `expense` - Despesa (saída de dinheiro)
- Campos obrigatórios: descrição, valor, tipo e data
- Campos opcionais: categoria e cartão associado
- O valor deve ser sempre positivo (>= 0)

### Categorias

- Cada categoria pertence a um único usuário
- O nome da categoria é único por usuário (case insensitive)
- Exemplos: Alimentação, Transporte, Lazer, Salário, etc.

### Cartões

- Cada cartão pertence a um único usuário
- O nome do cartão é único por usuário
- Os últimos 4 dígitos são únicos por usuário
- Bandeiras suportadas:
  - Visa, Mastercard, Elo, American Express
  - Hipercard, Hiper, Diners Club, Discover
  - JCB, Maestro, MIR, UnionPay, Verve, Outros

---

## 🛠 Tecnologias

### Backend (API)

| Tecnologia          | Descrição               |
| ------------------- | ----------------------- |
| **Node.js 24**      | Runtime JavaScript      |
| **NestJS 11**       | Framework backend       |
| **TypeScript**      | Linguagem tipada        |
| **MongoDB**         | Banco de dados NoSQL    |
| **Mongoose**        | ODM para MongoDB        |
| **JWT**             | Autenticação via tokens |
| **Bcrypt**          | Hash de senhas          |
| **Swagger**         | Documentação da API     |
| **class-validator** | Validação de DTOs       |
| **Biome**           | Linter e formatter      |

### Frontend

| Tecnologia          | Descrição                        |
| ------------------- | -------------------------------- |
| **React 19**        | Biblioteca UI                    |
| **TypeScript**      | Linguagem tipada                 |
| **Vite 7**          | Build tool                       |
| **TanStack Router** | Roteamento                       |
| **TanStack Query**  | Gerenciamento de estado servidor |
| **TanStack Table**  | Tabelas de dados                 |
| **React Hook Form** | Formulários                      |
| **Zod**             | Validação de schemas             |
| **Zustand**         | Gerenciamento de estado          |
| **Tailwind CSS 4**  | Estilização                      |
| **Axios**           | Cliente HTTP                     |
| **Recharts**        | Gráficos                         |
| **Sonner**          | Notificações toast               |
| **Biome**           | Linter e formatter               |

### Infraestrutura

| Tecnologia         | Descrição                    |
| ------------------ | ---------------------------- |
| **Docker**         | Containerização              |
| **Docker Compose** | Orquestração de containers   |
| **Nginx**          | Servidor web para o frontend |
| **MongoDB 7**      | Banco de dados               |

---

## 🏗 Arquitetura

```
finshow/
├── api/                    # Backend NestJS
│   ├── src/
│   │   ├── config/         # Configurações
│   │   ├── modules/        # Módulos da aplicação
│   │   │   ├── auth/       # Autenticação
│   │   │   ├── users/      # Usuários
│   │   │   ├── cards/      # Cartões
│   │   │   ├── categories/ # Categorias
│   │   │   └── transactions/ # Transações
│   │   └── shared/         # Código compartilhado
│   └── Dockerfile
│
├── front/                  # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes UI
│   │   ├── hooks/          # React hooks
│   │   ├── pages/          # Páginas
│   │   ├── queries/        # React Query
│   │   ├── routes/         # Rotas
│   │   ├── services/       # Serviços API
│   │   └── stores/         # Estado Zustand
│   ├── Dockerfile
│   └── nginx.conf
│
└── docker-compose.yml      # Orquestração
```

---

## 🔐 Variáveis de Ambiente

### API (Backend)

| Variável              | Descrição                     | Obrigatório        | Exemplo                             |
| --------------------- | ----------------------------- | ------------------ | ----------------------------------- |
| `NODE_ENV`            | Ambiente de execução          | Não                | `production`                        |
| `APP_PORT`            | Porta da API                  | Não (padrão: 4000) | `4000`                              |
| `APP_DOMAIN`          | Domínio do frontend (CORS)    | ✅ Sim             | `http://localhost:5173`             |
| `MONGODB_URI`         | String de conexão MongoDB     | ✅ Sim             | `mongodb://user:pass@host:27017/db` |
| `JWT_SECRET`          | Chave secreta para tokens JWT | ✅ Sim             | `sua-chave-secreta-aqui`            |
| `JWT_EXPIRES_IN_DAYS` | Dias até expiração do token   | ✅ Sim             | `7`                                 |

### Frontend

| Variável       | Descrição       | Obrigatório | Exemplo                 |
| -------------- | --------------- | ----------- | ----------------------- |
| `VITE_API_URL` | URL base da API | ✅ Sim      | `http://localhost:4000` |

### MongoDB

| Variável                     | Descrição               | Valor no Docker |
| ---------------------------- | ----------------------- | --------------- |
| `MONGO_INITDB_ROOT_USERNAME` | Usuário root do MongoDB | `finshow`       |
| `MONGO_INITDB_ROOT_PASSWORD` | Senha root do MongoDB   | `finshow123`    |
| `MONGO_INITDB_DATABASE`      | Nome do banco de dados  | `finshow`       |

---

## 🚀 Como Executar

### Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

### Execução com Docker (Recomendado)

1. **Clone o repositório:**

   ```bash
   git clone <url-do-repositorio>
   cd finshow
   ```

2. **Suba todos os serviços:**

   ```bash
   docker-compose up -d --build
   ```

3. **Aguarde os containers iniciarem** (pode levar alguns minutos na primeira vez)

4. **Acesse a aplicação:**
   - 🌐 **Frontend:** http://localhost:5173
   - 🔌 **API:** http://localhost:4000
   - 📚 **Swagger:** http://localhost:4000/api
   - 🗄️ **MongoDB:** localhost:27017

### Comandos Úteis

```bash
# Ver logs de todos os serviços
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f api
docker-compose logs -f front
docker-compose logs -f mongodb

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (apaga dados do banco)
docker-compose down -v

# Rebuild de um serviço específico
docker-compose up -d --build api
docker-compose up -d --build front

# Ver status dos containers
docker-compose ps
```

### Execução Local (Desenvolvimento)

#### Backend

```bash
cd api
npm install
# Crie um arquivo .env com as variáveis necessárias
npm run start:dev
```

#### Frontend

```bash
cd front
npm install
# Crie um arquivo .env com VITE_API_URL
npm run dev
```

---

## 📡 Endpoints da API

### Autenticação

| Método | Endpoint         | Descrição              |
| ------ | ---------------- | ---------------------- |
| POST   | `/auth/register` | Registrar novo usuário |
| POST   | `/auth/login`    | Autenticar usuário     |

### Usuários

| Método | Endpoint    | Descrição            |
| ------ | ----------- | -------------------- |
| GET    | `/users/me` | Obter usuário logado |

### Categorias

| Método | Endpoint          | Descrição           |
| ------ | ----------------- | ------------------- |
| GET    | `/categories`     | Listar categorias   |
| POST   | `/categories`     | Criar categoria     |
| GET    | `/categories/:id` | Obter categoria     |
| PATCH  | `/categories/:id` | Atualizar categoria |
| DELETE | `/categories/:id` | Remover categoria   |

### Cartões

| Método | Endpoint     | Descrição        |
| ------ | ------------ | ---------------- |
| GET    | `/cards`     | Listar cartões   |
| POST   | `/cards`     | Criar cartão     |
| GET    | `/cards/:id` | Obter cartão     |
| PATCH  | `/cards/:id` | Atualizar cartão |
| DELETE | `/cards/:id` | Remover cartão   |

### Transações

| Método | Endpoint            | Descrição           |
| ------ | ------------------- | ------------------- |
| GET    | `/transactions`     | Listar transações   |
| POST   | `/transactions`     | Criar transação     |
| GET    | `/transactions/:id` | Obter transação     |
| PATCH  | `/transactions/:id` | Atualizar transação |
| DELETE | `/transactions/:id` | Remover transação   |

> 📚 Para documentação completa da API, acesse o Swagger em http://localhost:4000/api

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👥 Autores

- Lucas Cunha
