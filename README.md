# Cèos

Backend da plataforma Cèos, criada para o desafio da Olist no hackathon da Shawee.

## Rotas

### Produtos

- find product: `/api/product/find/:id` (GET)
- list products: `/api/product/list` (GET)

### Mensagens

- list messages: `/api/message/list` (GET)
- awnser message: `/api/message/awnser/:id` (POST)

### Usuários

- `/api/auth/register` (POST)
- `/api/auth/login` (POST)
- find user by id: `/api/user/:id` (GET)
- create user: `/api/user` (POST)
- update user: `/api/user/:id` (PUT)
- delete user: `/api/user/:id` (DELETE)
- upload image: `/api/user/upload` (POST)

### Ambiente

São necessárias as seguintes váriaveis de ambiente:

- ACCOUNT_SID
- ASSISTANT_SID
- REST_API_ACCOUNT_SID
- AUTH_TOKEN
- BOT_WHATSAPP_NUMBER
- WHATSAPP_BOT_ACCOUNT_SID
- WHATSAPP_BOT_REST_TOKEN