# 🚀 Hypesoft Challenge – Product Management System

Sistema completo de gestão de produtos desenvolvido como desafio técnico para a Hypesoft. 

O projeto demonstra arquitetura moderna, boas práticas de desenvolvimento, organização em camadas, autenticação via OAuth2/OpenID Connect e execução completa via Docker Compose.

---

# 🎯 Objetivo

Construir uma aplicação full stack para gestão de produtos com:

- CRUD completo
- Gestão de categorias
- Dashboard com métricas
- Autenticação segura
- Arquitetura escalável
- Testes automatizados
- Execução containerizada

---

# 🏗 Arquitetura

O backend foi desenvolvido seguindo os princípios de:

- Clean Architecture
- Domain-Driven Design (DDD)
- CQRS com MediatR
- Princípios SOLID
- Separação clara de responsabilidades

Essa abordagem garante:

- Baixo acoplamento
- Alta coesão
- Manutenibilidade
- Escalabilidade futura

---

## 📦 Estrutura do Backend

```
src/
├── Hypesoft.Domain
├── Hypesoft.Application
├── Hypesoft.Infrastructure
└── Hypesoft.API
```

### Camadas

**Domain**
- Entidades
- Regras de negócio
- Interfaces de repositório

**Application**
- Commands e Queries (CQRS)
- Handlers (MediatR)
- Validações
- DTOs

**Infrastructure**
- Implementação de repositórios
- Persistência MongoDB
- Configurações externas

**API**
- Controllers
- Middlewares
- Autenticação
- Health checks
- Configuração geral da aplicação

---

## 🖥 Estrutura do Frontend

Baseado em Next.js 14 (App Router):

```
src/
├── app/
├── components/
├── hooks/
├── services/
├── schemas/
└── lib/
```

### Tecnologias

- Next.js 14
- TypeScript
- TanStack Query
- React Hook Form + Zod
- TailwindCSS
- shadcn/ui
- Recharts
- NextAuth
- Keycloak (OIDC)

---

# 🛠 Stack Tecnológica

## Backend
- .NET 9
- MongoDB
- MediatR
- FluentValidation
- Serilog
- xUnit + FluentAssertions

## Frontend
- Next.js 14
- TypeScript
- TanStack Query
- TailwindCSS

## Infraestrutura
- Docker
- Docker Compose
- MongoDB
- Keycloak

---

# 🔐 Autenticação e Segurança

- OAuth2 / OpenID Connect via Keycloak
- JWT validado no backend
- Endpoints protegidos com Bearer Token
- Rotas protegidas no frontend
- Middleware global de tratamento de exceções
- Health check implementado
- Testes garantindo retorno 401 para usuários não autenticados

---

# 📊 Funcionalidades Implementadas

## Gestão de Produtos
- Criar produto
- Listar produtos
- Atualizar produto
- Excluir produto
- Busca por nome
- Controle de estoque
- Destaque para estoque baixo

## Gestão de Categorias
- Criar categoria
- Atualizar categoria
- Excluir categoria
- Associação com produtos
- Filtro por categoria

## Dashboard
- Total de produtos
- Valor total em estoque
- Produtos com estoque baixo
- Gráfico de produtos por categoria

---

# 🧪 Testes

O projeto inclui:

- Testes unitários de regras de negócio
- Testes de integração para endpoints
- Validação de segurança (401)
- Teste de Health Check

Para executar:

```bash
cd backend/tests/Hypesoft.Tests

dotnet test
```

---

# ⚙️ Variáveis de Ambiente

Arquivos `.env` não são versionados por segurança.

## Backend

```bash
cp .env.example .env
```

## Frontend

```bash
cp frontend/.env.example frontend/.env.local
```

---

# 🐳 Execução com Docker

Subir todos os serviços:

```bash
docker compose up -d --build
```

---

# 🌍 URLs

Frontend:
```
http://localhost:3000
```

API:
```
http://localhost:5001
```

Swagger:
```
http://localhost:5001/swagger
```

Mongo Express:
```
http://localhost:8081
```

Keycloak:
```
http://localhost:8080
```

> Observação: No ambiente local a API utiliza a porta 5001 devido a conflito com serviço do macOS. Para utilizar 5000, basta ajustar o docker-compose.

---

# 🧠 Decisões Arquiteturais

- CQRS para separar leitura e escrita
- DDD para centralizar regras de negócio no domínio
- MongoDB pela flexibilidade e escalabilidade
- Next.js App Router para melhor organização
- Docker Compose para padronizar execução em qualquer ambiente

---

# 📈 Escalabilidade e Evolução

A arquitetura está preparada para:

- Implementação de cache
- Rate limiting
- Paginação otimizada
- Observabilidade avançada
- Deploy em ambiente cloud

---

# 🎥 Demonstração

O vídeo de apresentação cobre:

- Arquitetura do sistema
- Fluxo de autenticação
- CRUD completo
- Dashboard
- Testes automatizados
- Execução via Docker

---

# 👨‍💻 Autor

Nicolas Vieira
