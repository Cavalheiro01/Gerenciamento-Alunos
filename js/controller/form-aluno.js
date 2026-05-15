const btnSalvar = document.querySelector("#btnSalvarAluno"); // Botão para salvar um novo aluno

btnSalvar.addEventListener("click", function(event) { // Adiciona um ouvinte de evento para o clique no botão de salvar
    event.preventDefault(); // Previne o comportamento padrão do botão (submissão de formulário)

    const nome = document.querySelector("#nome").value.trim(); // Obtém o valor do campo de nome e remove espaços em branco nas extremidades
    const trabalho = parseFloat(document.querySelector("#trabalho").value); // Obtém o valor do campo de trabalho e converte para número de ponto flutuante
    const prova = parseFloat(document.querySelector("#prova").value); // Obtém o valor do campo de prova e converte para número de ponto flutuante

    if (!nome || isNaN(trabalho) || isNaN(prova)) { // Verifica se o nome está vazio ou se as notas não são números válidos
        alert("Preencha todos os campos corretamente."); // Exibe um alerta para o usuário caso algum campo esteja vazio ou com valor inválido
        return;
    }
    if (!validarNotaTrabalho(trabalho) || !validarNotaProva(prova)) { // Verifica se as notas do trabalho e da prova estão dentro do intervalo permitido (0 a 10)
        alert("Notas devem estar entre 0 e 10."); // Exibe um alerta para o usuário caso as notas estejam fora do intervalo permitido
        return;
    }

    const novoAluno = { nome, trabalho, prova }; // Cria um objeto com os dados do novo aluno a ser salvo

    salvarAlunoNoBackend(novoAluno) // Chama a função para salvar o aluno no backend, passando o objeto do novo aluno
        .then(alunoSalvo => { // Quando a promessa for resolvida, recebe o aluno salvo (com ID gerado pelo backend)
            // Atualiza a tabela sem recarregar a página
            const tbody = document.querySelector("#corpotabela");
            // Remove mensagem "Nenhum aluno" se existir
            if (tbody.children.length === 1 && tbody.children[0].colSpan === 5) { // Verifica se a tabela tem apenas uma linha com a mensagem de "Nenhum aluno cadastrado"
                tbody.innerHTML = ""; // Limpa o conteúdo do corpo da tabela para adicionar o novo aluno
            }
            tbody.appendChild(criaLinhaAluno(alunoSalvo)); // Adiciona uma nova linha na tabela com os dados do aluno salvo, usando a função criaLinhaAluno para criar o elemento da linha

            // Limpa formulário
            document.querySelector("#nome").value = "";
            document.querySelector("#trabalho").value = "";
            document.querySelector("#prova").value = "";
        })
        .catch(erro => {
            console.error("Erro ao salvar:", erro);
            alert("Erro ao salvar aluno no servidor.");
        });
});