
# Gerenciador de Tarefas (CRUD) com Supabase

Um gerenciador de tarefas simples (Create, Read, Update, Delete) feito em **HTML, CSS e JavaScript**, utilizando o **Supabase** como banco de dados e hospedado no **Vercel**.

## ✨ Funcionalidades
- Adicionar novas tarefas
- Listar todas as tarefas
- Editar tarefas existentes
- Excluir tarefas
- Persistência dos dados no banco PostgreSQL do Supabase

## 🚀 Tecnologias
- [Supabase](https://supabase.com) → banco de dados e API
- HTML, CSS e JavaScript → front-end
- [Vercel](https://vercel.com) → deploy do projeto

## 📂 Estrutura do projeto
```
/index.html   → página principal
/style.css    → estilos (opcional)
/script.js    → lógica do CRUD e integração com Supabase
```

## ⚙️ Configuração

1. Crie um projeto no [Supabase](https://supabase.com).
2. No painel do Supabase, crie a tabela `tasks`:
   ```sql
   create table public.tasks (
     id bigint generated always as identity primary key,
     text text not null,
     created_at timestamp with time zone default now()
   );
   ```
   > Para testes, desative o Row Level Security (RLS) ou crie políticas abertas.

3. Copie o **Project URL** e a **anon public key** em  
   **Project Settings → API**.

4. No `script.js`, configure:
   ```js
   const SUPABASE_URL = "https://SEU-PROJETO.supabase.co";
   const SUPABASE_ANON_KEY = "SUA-CHAVE-ANON";
   const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
   ```

## 📦 Deploy no Vercel
1. Crie um repositório no GitHub com os arquivos do projeto.
2. Conecte o repositório ao Vercel.
3. Faça o deploy.  
   O site estará disponível em uma URL gerada pelo Vercel.

## 🖼️ Demonstração
O projeto pode ser acessado em:  
[Gerenciador de Tarefas no Vercel](https://gerenciador-six.vercel.app)

---

### 📌 Observações
- Se quiser que cada usuário tenha suas próprias tarefas privadas, ative o **RLS** e configure autenticação no Supabase.
- Para produção, é recomendado usar variáveis de ambiente no Vercel para esconder a `anon key`.

```
