function calcularMedia(trabalho, prova) { // Função para calcular a média do aluno com base nas notas do trabalho e da prova
    return ((parseFloat(trabalho) + parseFloat(prova)) / 2).toFixed(1); // Converte as notas para números de ponto flutuante, calcula a média e formata o resultado para uma casa decimal
}

function validarNotaTrabalho(nota) { // Função para validar a nota do trabalho
    return nota !== "" && !isNaN(nota) && nota >= 0 && nota <= 10; // Verifica se a nota do trabalho não está vazia, é um número válido e está dentro do intervalo permitido (0 a 10)
}

function validarNotaProva(nota) { // Função para validar a nota da prova
    return nota !== "" && !isNaN(nota) && nota >= 0 && nota <= 10; // Verifica se a nota da prova não está vazia, é um número válido e está dentro do intervalo permitido (0 a 10)
}