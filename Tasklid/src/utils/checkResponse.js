// Converte a resposta do servidor em JSON, mas lança um erro se o status for de falha.
// O fetch só falha sozinho quando a rede cai; quando o servidor responde com erro, ele NÃO falha.
function checkResponse(resp) {
    if (!resp.ok) {
        throw new Error(`Erro ${resp.status} ao falar com o servidor`)
    }
    return resp.json()
}

export default checkResponse