# 🚀 Hypesoft Challenge – Product Management System

Sistema completo de gestão de produtos desenvolvido como desafio técnico para a Hypesoft.

O projeto demonstra arquitetura moderna, boas práticas de desenvolvimento, Clean Architecture com DDD, CQRS, autenticação via Keycloak e containerização com Docker Compose.

---

# 🏗 Arquitetura

O sistema foi desenvolvido seguindo os princípios de:

- Clean Architecture
- Domain-Driven Design (DDD)
- CQRS com MediatR
- Separação clara entre camadas
- Código limpo e princípios SOLID

## 📦 Estrutura do Backend

src/
├── Hypesoft.Domain
├── Hypesoft.Application
├── Hypesoft.Infrastructure
└── Hypesoft.API


- **Domain** → Entidades, regras de negócio
- **Application** → Commands, Queries, Handlers (CQRS)
- **Infrastructure** → Persistência MongoDB, serviços externos
- **API** → Controllers, Middlewares, configuração

## 🖥 Estrutura do Frontend

src/
├── app/
├── components/
├── hooks/
├── services/
├── schemas/
└── lib/


- Next.js 14 (App Router)
- React Query
- React Hook Form + Zod
- TailwindCSS + shadcn/ui
- Recharts

---

# 🛠 Stack Tecnológica

## Backend
- .NET 9
- Entity Framework Core (MongoDB Provider)
- MediatR
- FluentValidation
- Serilog
- xUnit + FluentAssertions

## Frontend
- Next.js 14
- TypeScript
- TailwindCSS
- shadcn/ui
- TanStack Query
- NextAuth
- Keycloak

## Infraestrutura
- MongoDB
- Keycloak
- Docker
- Docker Compose

---

# 🔐 Autenticação e Segurança

- OAuth2 / OpenID Connect via Keycloak
- JWT validado no backend
- Rotas protegidas no frontend
- Endpoints protegidos com Bearer Token
- Health checks implementados
- Middleware global de tratamento de exceções
- Testes garantindo que endpoints protegidos retornam 401

---

# 📊 Funcionalidades Implementadas

## ✅ Gestão de Produtos
- Criar produto
- Listar produtos
- Editar produto
- Excluir produto
- Busca por nome
- Controle de estoque
- Destaque para estoque baixo

## ✅ Categorias
- Criar categoria
- Atualizar categoria
- Excluir categoria
- Associação com produtos
- Filtro por categoria

## ✅ Dashboard
- Total de produtos
- Valor total em estoque
- Produtos com estoque baixo
- Gráfico de produtos por categoria

---

# 🧪 Testes

O projeto possui:

- Testes unitários para regras de negócio
- Testes de integração para endpoints
- Validação de segurança (401 para usuários não autenticados)
- Health check testado

Para rodar:


---

# 🐳 Como Executar com Docker

## 1️⃣ Clonar repositório

git clone https://github.com/nicolasVieira-dev/desafio-hypesoft-resolvendo.git
cd hypesoft-challenge



