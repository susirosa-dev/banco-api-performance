import http from 'k6/http';
import { pegarBaseUrl } from '../utils/variaveis.js';

const postLogin = JSON.parse(open('../fixtures/postLogin.json')); // Importando o arquivo JSON com os dados de login

export function obterToken() {
    const url = pegarBaseUrl() + '/login';
      
      // O RequestBody é um objeto JSON que contém os dados que serão enviados no corpo da requisição POST, é o payload da requisição.
      const payload = JSON.stringify(postLogin);
      
      const params = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
      const res = http.post(url, payload, params);
      return res.json('token');
}