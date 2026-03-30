# 🏢 Gestão de Funcionários

![Banner](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containers-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## Descrição <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bookmark%20Tabs.png" width="25" height="25" />

 Aplicação Full Stack de **Gestão de Funcionários**, desenvolvida com Java Spring Boot no backend e React.js no frontend. Permite autenticação de usuários, listagem e cadastro de funcionários, com todo o ambiente orquestrado via Docker Compose.

---
## Demonstração da Interface de Login
![Tela-Inicial](./frontend/src/assets/InterfaceLogin.png)

## Demonstração da Interface de Dashboard
![Tela-Inicial](./frontend/src/assets/InterfaceDash.png)

## Tecnologias Utilizadas <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hammer.png" width="25" height="25" />

### Backend
1. Java <img src="https://skillicons.dev/icons?i=java" width="25" height="25" style="margin-left: 8px;" />
2. Spring Boot <img src="https://skillicons.dev/icons?i=spring" width="25" height="25" style="margin-left: 8px;" />
3. Spring Data JPA <img src="https://skillicons.dev/icons?i=hibernate" width="25" height="25" style="margin-left: 8px;" />
4. FlywayDB *(migrations automáticas)*
5. PostgreSQL <img src="https://skillicons.dev/icons?i=postgres" width="25" height="25" style="margin-left: 8px;" />

### Frontend
1. React.js <img src="https://skillicons.dev/icons?i=react" width="25" height="25" style="margin-left: 8px;" />
2. JavaScript <img src="https://skillicons.dev/icons?i=javascript" width="25" height="25" style="margin-left: 8px;" />

### Infraestrutura e Ambiente
1. Docker <img src="https://skillicons.dev/icons?i=docker" width="25" height="25" style="margin-left: 8px;" />

### Ambiente de Desenvolvimento
1. Visual Studio Code <img src="https://skillicons.dev/icons?i=vscode" width="25" height="25" style="margin-left: 8px;" />
2. IntelliJ <img src="https://skillicons.dev/icons?i=idea" width="25" height="25" style="margin-left: 8px;" />

### Consultas
1. [Link Documentação Java](https://docs.oracle.com/en/java/javase/index.html) <img src="https://skillicons.dev/icons?i=java" width="25" height="25" style="margin-left: 8px;" />
2. [Link Documentação React](https://pt-br.react.dev/learn) <img src="https://skillicons.dev/icons?i=react" width="25" height="25" style="margin-left: 8px;" />
---

## Pré-requisitos <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Clipboard.png" width="25" height="25" />
 Para rodar este projeto, você precisa ter instalado **apenas**:

- [Docker](https://www.docker.com/get-started) <img src="https://skillicons.dev/icons?i=docker" width="25" height="25" style="margin-left: 8px;" />
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Como Rodar <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Keyboard.png" width="25" height="25" />

**1. Clone o Repositório**
```bash
git clone ENDEREÇO REPOSITÓRIO
```

**2. Acesse a pasta do projeto**
```bash
cd PASTA RAIZ
```

**3. Suba toda a aplicação com um único comando**
```bash
docker-compose up --build
```

> Aguarde o build completo. O Docker irá subir automaticamente o **Banco de Dados**, o **Backend** e o **Frontend**.

**4. Acesse no navegador**

| Serviço  | URL                   |
|----------|-----------------------|
| Frontend | http://localhost:3000 ou npm run dev do REACT |
| Backend  | http://localhost:8080 ou ./mvnw spring-boot:run no INTELLIJ |

---

## Credenciais de Acesso <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Locked%20with%20Key.png" width="25" height="25" />
 As credenciais abaixo são inseridas automaticamente via **Flyway (Migration V2 - Seed)** na primeira execução:

(OBS: SE HOUVER CONGELAMENTO APOS O LOGIN, APERTE F5)

| Campo | Valor               |
|-------|---------------------|
| E-mail | `admin@empresa.com` |
| Senha  | `admin123`          |

> Use essas credenciais na **Tela de Login** para acessar o Dashboard de Funcionários.

---

## Estrutura do Projeto <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/File%20Folder.png" width="25" height="25" />

```
📦 projeto-raiz/
├── 📁 backend/
│   ├── src/
│   │   ├── main/java/com.desafio.gestao_funcionarios/
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── model/
│   │   │   ├── repository/
│   │   │   ├── security/
│   │   │   ├── service/
│   │   │   ├── util/
│   │   │   └── GestaoFuncionariosApplication.java
│   │   └── resources/
│   │       └── db/migration/
│   │           ├── V1__create_tables.sql
│   │           └── V2__seed_data.sql
│   └── Dockerfile
├── 📁 frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

---

## Funcionalidades <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Bullseye.png" width="25" height="25" />

- ✅ Autenticação com e-mail e senha (senha criptografada com BCrypt)
- ✅ Listagem de funcionários
- ✅ Cadastro de novos funcionários
- ✅ Dados gerenciados: Nome, Data de Admissão, Salário e Status (Ativo/Inativo)
- ✅ Migrations automáticas com FlywayDB
- ✅ Ambiente 100% containerizado com Docker Compose

---

## Autor

[Abreeu](https://www.linkedin.com/in/abreeu/) <img src="https://skillicons.dev/icons?i=linkedin" width="25" height="25" style="margin-left: 8px;" />
