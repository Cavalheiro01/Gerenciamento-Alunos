function criaLinhaAluno(aluno) { // Função para criar uma linha da tabela com os dados de um aluno
    const tr = document.createElement("tr"); // Cria um elemento <tr> para representar a linha da tabela
    tr.setAttribute("data-id", aluno.id); // Define um atributo "data-id" na linha da tabela para armazenar o ID do aluno, facilitando a identificação para ações como exclusão

    const media = calcularMedia(aluno.trabalho, aluno.prova); // Calcula a média do aluno usando as notas do trabalho e da prova, chamando a função calcularMedia

    tr.appendChild(criaColuna(aluno.nome)); // Adiciona uma coluna com o nome do aluno à linha da tabela, usando a função criaColuna para criar o elemento da coluna
    tr.appendChild(criaColuna(aluno.trabalho)); // Adiciona uma coluna com a nota do trabalho do aluno à linha da tabela
    tr.appendChild(criaColuna(aluno.prova)); // Adiciona uma coluna com a nota da prova do aluno à linha da tabela
    tr.appendChild(criaColuna(media)); // Adiciona uma coluna com a média do aluno à linha da tabela
    tr.appendChild(criaColunaAcoes()); // Adiciona uma coluna com os botões de ação (como excluir) à linha da tabela, usando a função criaColunaAcoes para criar o elemento da coluna de ações

    return tr; // Retorna o elemento <tr> completo, representando a linha da tabela com os dados do aluno e os botões de ação
}

function criaColuna(valor) { // Função para criar uma coluna da tabela com um valor específico
    const td = document.createElement("td"); // Cria um elemento <td> para representar a coluna da tabela
    td.textContent = valor; // Define o conteúdo de texto da coluna como o valor passado como argumento para a função
    return td; // Retorna o elemento <td> completo, representando a coluna da tabela com o valor especificado
}

function criaColunaAcoes() { // Função para criar a coluna de ações da tabela, que contém os botões para interagir com cada aluno (como excluir)
    const td = document.createElement("td"); // Cria um elemento <td> para representar a coluna de ações da tabela
    const btnExcluir = document.createElement("button"); // Cria um elemento <button> para representar o botão de excluir na coluna de ações
    btnExcluir.textContent = "Excluir"; // Define o texto do botão como "Excluir" para indicar sua função ao usuário 
    btnExcluir.classList.add("btn", "btn-danger", "btn-sm"); // Adiciona classes CSS ao botão para estilização (usando classes do Bootstrap para um estilo de botão vermelho e pequeno)
    btnExcluir.setAttribute("data-acao", "excluir"); // Define um atributo "data-acao" no botão para indicar que este botão tem a função de excluir, facilitando a identificação do tipo de ação ao lidar com eventos de clique
    td.appendChild(btnExcluir); // Adiciona o botão de excluir como um filho do elemento <td>, colocando o botão dentro da coluna de ações da tabela
    return td; // Retorna o elemento <td> completo, representando a coluna de ações da tabela com o botão de excluir
}