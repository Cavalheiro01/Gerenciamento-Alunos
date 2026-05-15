function obterAlunos() { // Função para obter a lista de alunos do backend
    return fetch("http://localhost:3000/alunos") // Faz uma requisição GET para a API
        .then(res => res.json()); // Converte a resposta para JSON e retorna a lista de alunos  
}

function salvarAlunoNoBackend(aluno) { // Função para salvar um novo aluno no backend
    return fetch("http://localhost:3000/alunos", { // Faz uma requisição POST para a API
        method: "POST", // Especifica o método HTTP como POST
        headers: { "Content-Type": "application/json" }, // Define o cabeçalho para indicar que o corpo da requisição é JSON
        body: JSON.stringify(aluno) // Converte o objeto aluno para uma string JSON e o envia no corpo da requisição
    }).then(res => res.json()); // Converte a resposta para JSON e retorna o aluno salvo (com ID gerado pelo backend)
}

function excluirAlunoNoBackend(id) { // Função para excluir um aluno do backend
    return fetch(`http://localhost:3000/alunos/${id}`, { // Faz uma requisição DELETE para a API, passando o ID do aluno na URL
        method: "DELETE" // Especifica o método HTTP como DELETE
    }).then(res => res.json()); // Converte a resposta para JSON e retorna a mensagem de sucesso ou erro
}