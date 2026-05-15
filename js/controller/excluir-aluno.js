document.querySelector("#corpotabela").addEventListener("click", function(event) { // Adiciona um ouvinte de evento para o clique em qualquer elemento dentro do corpo da tabela, permitindo detectar cliques nos botões de excluir
    const btn = event.target; // Obtém o elemento que foi clicado (o alvo do evento), que pode ser um botão de excluir ou outro elemento dentro da tabela
    if (btn.tagName === "BUTTON" && btn.textContent === "Excluir") { // Verifica se o elemento clicado é um botão e se seu texto é "Excluir", garantindo que a ação de exclusão seja executada apenas quando o botão de excluir for clicado
        const tr = btn.closest("tr"); // Encontra o elemento <tr> mais próximo do botão clicado, que representa a linha da tabela correspondente ao aluno que se deseja excluir
        const id = tr.getAttribute("data-id"); // Obtém o valor do atributo "data-id" da linha da tabela, que contém o ID do aluno a ser excluído, facilitando a identificação do aluno para a exclusão no backend

        if (confirm("Deseja realmente excluir este aluno?")) { // Exibe uma caixa de confirmação para o usuário, perguntando se ele realmente deseja excluir o aluno, para evitar exclusões acidentais
            excluirAlunoNoBackend(id) // Chama a função para excluir o aluno no backend, passando o ID do aluno a ser excluído
                .then(() => { // Quando a promessa for resolvida, ou seja, quando a exclusão for bem-sucedida no backend, executa a função para remover a linha da tabela correspondente ao aluno excluído
                    tr.remove(); // Remove a linha da tabela do DOM, removendo visualmente o aluno excluído da lista exibida na página
                    // Se a tabela ficar vazia, exibe mensagem
                    const tbody = document.querySelector("#corpotabela"); // Seleciona o corpo da tabela para verificar se ainda existem alunos exibidos após a exclusão
                    if (tbody.children.length === 0) { // Verifica se o corpo da tabela não tem mais linhas (ou seja, se a tabela ficou vazia após a exclusão do aluno)
                        tbody.innerHTML = "<tr><td colspan='5'>Nenhum aluno cadastrado</td></tr>"; // Exibe uma mensagem indicando que nenhum aluno está cadastrado caso a tabela fique vazia após a exclusão do aluno
                    }
                })
                .catch(erro => { // Captura qualquer erro que ocorra durante a requisição para excluir o aluno no backend
                    console.error("Erro ao excluir:", erro); // Exibe o erro no console para depuração
                    alert("Erro ao excluir aluno."); // Exibe um alerta para o usuário caso ocorra um erro ao tentar excluir o aluno no backend, informando que a exclusão falhou
                });
        }
    }
});