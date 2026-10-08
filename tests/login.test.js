// Escrevendo teste de performance com k6
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {  
  iterations: 500, // Número de iterações que o teste irá executar, ou seja, quantas vezes a função exportada será chamada
  vus: 10, // Número de usuários virtuais (Virtual Users) que irão executar o teste simultaneamente
  duration: '120s', // Duração total do teste, que é de 120 segundos
  thresholds: {
   http_req_duration: ['max<5000', 'p(90)<3000', 'p(95)<4000'], 
   http_req_failed: ['rate<0.01'] 
  }
 // stages: [
 //   { duration: '10s', target: 10 }, // Ramp-up: Aumenta gradualmente o número de usuários virtuais de 0 para 10 em 10 segundos
 //   { duration: '30s', target: 20 }, // Sustentação: Mantém o número de usuários virtuais em 20 por 30 segundos
 //   { duration: '10s', target: 0 }, // Ramp-down: Reduz gradualmente o número de usuários virtuais de 20 para 0 em 10 segundos
 // ],        
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







  
 