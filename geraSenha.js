const bcrypt = require('bcrypt');
const senha = 'senha123';

bcrypt.hash(senha, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hash gerado:', hash);
});