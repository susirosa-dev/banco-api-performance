// Escrevendo teste de performance com k6
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {  
  iterations: 10,
  thresholds: {
   http_req_duration: ['avg<3', 'p(90)<3', 'p(95)<5'],
   http_req_failed: ['rate<0.01'] 
  }
}

// A função exportada como padrão será usada pelo k6 como ponto de entrada do script de teste. 
// Ela será executada repetidamente, em “iterações”, durante toda a duração do teste.
export default function () {
  const url = 'http://localhost:3000/login';
  
  // O RequestBody é um objeto JSON que contém os dados que serão enviados no corpo da requisição POST, é o payload da requisição.
  const payload = JSON.stringify({
    username: 'julio.lima',
    senha: '123456',
  });
  
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);
  
  // Para saber se a requisição foi bem-sucedida, podemos usar a função check() do k6 para validar o status da resposta e o tipo do token retornado.
  check(res, { 
    'Validar que o status é 200': (r) => r.status === 200,
    'Validar que o token é string': (r) => typeof r.json().token === 'string',
    });   

  sleep(1);
}







  
 