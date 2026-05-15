const btnConsultar = document.querySelector("#btnConsultarAluno"); // Botão para consultar a lista de alunos

btnConsultar.addEventListener("click", function() { // Adiciona um ouvinte de evento para o clique no botão de consultar
    const tbody = document.querySelector("#corpotabela"); // Seleciona o corpo da tabela onde os alunos serão exibidos
    tbody.innerHTML = "<tr><td colspan='5'>Carregando...</td></tr>"; // Exibe uma mensagem de "Carregando..." enquanto a requisição para obter os alunos está sendo processada

    obterAlunos().then(lista => { // Chama a função para obter a lista de alunos do backend, que retorna uma promessa
        tbody.innerHTML = ""; // Limpa o conteúdo do corpo da tabela para exibir os alunos obtidos do backend
        if (lista.length === 0) { // Verifica se a lista de alunos está vazia
            tbody.innerHTML = "<tr><td colspan='5'>Nenhum aluno cadastrado</td></tr>"; // Exibe uma mensagem indicando que nenhum aluno está cadastrado caso a lista esteja vazia
        } else {
            lista.forEach(aluno => { // Itera sobre cada aluno na lista de alunos obtida do backend
                tbody.appendChild(criaLinhaAluno(aluno)); // Adiciona uma nova linha na tabela para cada aluno, usando a função criaLinhaAluno para criar o elemento da linha com os dados do aluno
            });
        }
    }).catch(erro => { // Captura qualquer erro que ocorra durante a requisição para obter os alunos
        tbody.innerHTML = "<tr><td colspan='5'>Erro ao carregar dados</td></tr>"; // Exibe uma mensagem de erro na tabela caso a requisição falhe
        console.error(erro); // Exibe o erro no console para depuração
    });
});