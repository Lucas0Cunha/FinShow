# Documentação do Schema do Banco de Dados

## Visão Geral

A aplicação Finshow utiliza MongoDB como banco de dados, com 4 collections principais: `users`, `cards`, `categories` e `transactions`. Todas as collections herdam campos base de controle de tempo (`createdAt`, `updatedAt`, `deletedAt`).

## Diagrama de Relacionamentos

```
                              +---------------+
                              |     users     |
                              +---------------+
                              | _id (PK)      |
                              | name          |
                              | email (U)     |
                              | passwordHash  |
                              | timestamps    |
                              +-------+-------+
                                      |
           +--------------------------+---------------------------+
           |                          |                           |
           | 1:N                      | 1:N                       | 1:N
           v                          v                           v
   +----------------+         +---------------+         +-------------------+
   |     cards      |         |  categories   |         |   transactions    |
   +----------------+         +---------------+         +-------------------+
   | _id (PK)       |         | _id (PK)      |         | _id (PK)          |
   | name           |         | name          |         | description       |
   | finalNumbers   |         | timestamps    |         | amount            |
   | flag           |         |               |         | type              |
   | timestamps     |         |               |         | date              |
   |                |         |               |         | timestamps        |
   +-------+--------+         +-------+-------+         +----+---------+----+
           |                          |                      |         |
           | userId (FK)              | userId (FK)          |         |
           |                          |                      |         |
           +-----------+--------------+                      |         |
                       |                                     |         |
                       v                                     |         |
               +-------+-------+                             |         |
               |     users     |<----------------------------+         |
               +---------------+        userId (FK)                    |
                                                                       |
                                                                       |
   +----------------+         +---------------+                        |
   |     cards      |<--------+               +------------------------+
   +----------------+         |  transactions |      cardId (FK)
          ^                   |               |
          |                   +-------+-------+
          |                           |
          |                           | categoryId (FK)
          |                           v
          |                   +---------------+
          |                   |  categories   |
          |                   +---------------+
          |
          +-- (1:N opcional)


RESUMO DOS RELACIONAMENTOS:

  users (1) -----> (N) cards         : Um usuario possui varios cartões
  users (1) -----> (N) categories    : Um usuario possui varias categorias
  users (1) -----> (N) transactions  : Um usuario possui varias transações
  cards (1) -----> (N) transactions  : Um cartão pode ter varias transações (opcional)
  categories (1) -> (N) transactions : Uma categoria pode ter varias transações (opcional)


LEGENDA:

  PK  = Primary Key (Chave Primaria)
  FK  = Foreign Key (Chave Estrangeira)
  U   = Unique (Indice Unico)
  1:N = Relacionamento Um-para-Muitos
  --> = Direcao do relacionamento (de FK para PK)
```

## Collections Detalhadas

### 1. `users`

**Descrição:** Armazena informações dos usuários da aplicação.

**Campo** | **Tipo** | **Obrigatório** | **Constraints** | **Descrição**
---|---|---|---|---
`_id` | ObjectId | Sim | PK | Identificador único do usuário
`name` | String | Sim | - | Nome do usuário
`email` | String | Sim | Único | Email para autenticação e contato
`passwordHash` | String | Sim | - | Hash bcrypt da senha
`createdAt` | Date | Não | - | Data de criação do registro
`updatedAt` | Date | Não | - | Última data de atualização
`deletedAt` | Date | Não | - | Data de soft delete (null se ativo)

**Índices:**
- Primário: `_id`
- Único: `email`

**Timestamps:** `true` (cria automaticamente `createdAt` e `updatedAt`)

---

### 2. `cards`

**Descrição:** Armazena informações sobre os cartões de crédito/débito dos usuários.

**Campo** | **Tipo** | **Obrigatório** | **Constraints** | **Descrição**
---|---|---|---|---
`_id` | ObjectId | Sim | PK | Identificador único do cartão
`name` | String | Sim | - | Nome/apelido do cartão (ex: "Crédito Pessoal")
`finalNumbers` | String | Sim | Único | Últimos dígitos do cartão
`flag` | String (Enum) | Sim | - | Bandeira do cartão (VISA, MASTERCARD, ELO, etc)
`userId` | ObjectId | Sim | FK → users._id | Referência ao proprietário do cartão
`createdAt` | Date | Não | - | Data de criação do registro
`updatedAt` | Date | Não | - | Última data de atualização
`deletedAt` | Date | Não | - | Data de soft delete (null se ativo)

**Índices:**
- Primário: `_id`
- Único Composto: `userId` + `finalNumbers`
- Único Composto: `userId` + `name`

**Relacionamento:** Cada cartão pertence a um único usuário.

**Timestamps:** `true`

---

### 3. `categories`

**Descrição:** Armazena categorias de transações (ex: Alimentação, Transporte, Saúde).

**Campo** | **Tipo** | **Obrigatório** | **Constraints** | **Descrição**
---|---|---|---|---
`_id` | ObjectId | Sim | PK | Identificador único da categoria
`name` | String | Sim | - | Nome da categoria (case-insensitive)
`userId` | ObjectId | Sim | FK → users._id | Referência ao proprietário da categoria
`createdAt` | Date | Não | - | Data de criação do registro
`updatedAt` | Date | Não | - | Última data de atualização
`deletedAt` | Date | Não | - | Data de soft delete (null se ativo)

**Índices:**
- Primário: `_id`
- Único Composto: `userId` + `name` (case-insensitive com collation)

**Relacionamento:** Cada categoria pertence a um único usuário.

**Timestamps:** `true`

---

### 4. `transactions`

**Descrição:** Armazena transações financeiras (receitas, despesas, transferências).

**Campo** | **Tipo** | **Obrigatório** | **Constraints** | **Descrição**
---|---|---|---|---
`_id` | ObjectId | Sim | PK | Identificador único da transação
`description` | String | Sim | - | Descrição da transação
`amount` | Number | Sim | min: 0 | Valor da transação
`type` | String (Enum) | Sim | - | Tipo de transação (INCOME, EXPENSE, TRANSFER)
`date` | Date | Sim | - | Data da transação
`userId` | ObjectId | Sim | FK → users._id | Referência ao proprietário da transação
`categoryId` | ObjectId | Não | FK → categories._id | Referência à categoria (opcional)
`cardId` | ObjectId | Não | FK → cards._id | Referência ao cartão (opcional)
`createdAt` | Date | Não | - | Data de criação do registro
`updatedAt` | Date | Não | - | Última data de atualização
`deletedAt` | Date | Não | - | Data de soft delete (null se ativo)

**Índices:**
- Primário: `_id`
- Referência: `userId`
- Referência: `categoryId`
- Referência: `cardId`

**Relacionamentos:**
- Toda transação pertence obrigatoriamente a um usuário
- Uma transação pode ter uma categoria associada (opcional)
- Uma transação pode ter um cartão associado (opcional)
- Em operações de listagem e GET, `categoryId` e `cardId` são preenchidos com os dados completos dos documentos referenciados

**Timestamps:** `true`

---

## Campos Herdados (Base)

Todas as collections herdam os seguintes campos da classe `BaseEntity`:

**Campo** | **Tipo** | **Descrição**
---|---|---
`_id` | ObjectId | Identificador único gerado automaticamente pelo MongoDB
`createdAt` | Date | Timestamp da criação (preenchido automaticamente)
`updatedAt` | Date | Timestamp da última atualização (preenchido automaticamente)
`deletedAt` | Date | Timestamp do soft delete (null enquanto ativo)

---

## Enums

### CardFlag
Bandeiras de cartão aceitas:
- `AMERICAN_EXPRESS` - american-express
- `DINERS_CLUB` - diners-club
- `DISCOVER` - discover
- `ELO` - elo
- `HIPERCARD` - hipercard
- `HIPER` - hiper
- `JCB` - jcb
- `MAESTRO` - maestro
- `MASTERCARD` - mastercard
- `MIR` - mir
- `UNIONPAY` - unionpay
- `VISA` - visa
- `VERVE` - verve
- `OTHER` - other

### TransactionType
Tipos de transação:
- `INCOME` - income (Receita/entrada)
- `EXPENSE` - expense (Despesa/saída)

---

## Relacionamentos Detalhados

### User → Cards (1:N)
- Um usuário pode ter múltiplos cartões
- Um cartão pertence a apenas um usuário
- Integridade referencial: cartão sem usuário não é permitido

### User → Categories (1:N)
- Um usuário pode ter múltiplas categorias
- Uma categoria pertence a apenas um usuário
- Integridade referencial: categoria sem usuário não é permitido
- Restrição: nome da categoria único por usuário (case-insensitive)

### User → Transactions (1:N)
- Um usuário pode ter múltiplas transações
- Uma transação pertence a apenas um usuário
- Integridade referencial: transação sem usuário não é permitido

### Card → Transactions (1:N)
- Um cartão pode estar associado a múltiplas transações
- Uma transação pode estar associada a um cartão ou nenhum
- Relacionamento opcional

### Category → Transactions (1:N)
- Uma categoria pode estar associada a múltiplas transações
- Uma transação pode estar associada a uma categoria ou nenhuma
- Relacionamento opcional

---

## Restrições de Unicidade

| Collection | Campo(s) | Tipo | Notas |
|---|---|---|---|
| `users` | `email` | Simples | Email único globalmente |
| `cards` | `finalNumbers` | Simples | Últimos dígitos únicos globalmente |
| `cards` | `userId` + `finalNumbers` | Composto | Não permite duplicata de cartão por usuário |
| `cards` | `userId` + `name` | Composto | Não permite mesmo nome de cartão para usuário |
| `categories` | `userId` + `name` | Composto | Categoria de mesmo nome por usuário (case-insensitive) |

---

## Soft Delete

O sistema implementa soft delete através do campo `deletedAt`. Registros deletados não são removidos fisicamente do banco, apenas marcados com um timestamp. 

**Comportamento esperado em queries:**
- Queries devem filtrar registros com `deletedAt: null` (ou `{ $exists: false }`)
- O campo permanece vazio/null para registros ativos

---

## Notas de Implementação

1. **Conversão de ObjectId:** Em todos os construtores das entidades, ObjectIds são convertidos para string para facilitar manipulação na aplicação
2. **Preenchimento de Referências:** Em operações de listagem e GET, os campos `categoryId` e `cardId` são preenchidos com os documentos completos (população/lookup/join)
3. **Collation:** O índice único de categoria utiliza collation com locale 'en' e strength 2 para comparação case-insensitive
4. **Validação de Tipos:** O field `type` em transações é uma enumeração validada pelo schema MongoDB
