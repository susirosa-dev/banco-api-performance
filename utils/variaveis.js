const configLocal = JSON.parse(open('../config/config.local.json')); // Importando o arquivo JSON com os dados de configuração
export function pegarBaseUrl() {
    return __ENV.BASE_URL || configLocal.baseurl; // Valor padrão caso a variável de ambiente não esteja definida    
}