# ceos-platform

## APIs

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