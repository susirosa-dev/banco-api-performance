import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterToken } from '../helpers/autenticacao.js';
import { pegarBaseUrl } from '../utils/variaveis.js';

export const options = {
 iterations: 1
};

export default function() {
  const token = obterToken();

  //const url = 'http://localhost:3000/transferencias';
  const url = pegarBaseUrl() + '/transferencias';
  
  // O RequestBody é um objeto JSON que contém os dados que serão enviados no corpo da requisição POST, é o payload da requisição.
  const payload = JSON.stringify({
    "contaOrigem": 1,
    "contaDestino": 2,
    "valor": 12,
    "token": ""
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  };


  let res = http.post(url, payload, params);

  console.log(`Transferência — status: ${res.status}`);
  console.log(`Transferência — resposta: ${res.body}`);
    
  check(res, { "status is 201": (res) => res.status === 201 });
  sleep(1);
}
