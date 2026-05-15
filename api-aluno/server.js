const express = require('express'); // Importa o framework Express para criar a API
const cors = require('cors'); // Importa o middleware CORS para permitir requisições de diferentes origens (útil para desenvolvimento local com frontend e backend separados)
const fs = require('fs'); // Importa o módulo de sistema de arquivos do Node.js para ler e escrever o arquivo JSON que armazena os dados dos alunos

const app = express(); // Cria uma instância do Express para configurar a API
app.use(cors()); // Habilita o CORS para permitir que o frontend (que pode estar rodando em outra porta) faça requisições para esta API
app.use(express.json()); // Habilita o middleware para parsear o corpo das requisições como JSON, permitindo que o backend receba dados no formato JSON

// Função para ler o arquivo JSON
function lerAlunos() {
    if (!fs.existsSync('alunos.json')) { // Verifica se o arquivo 'alunos.json' existe; se não existir, cria um arquivo vazio com um array vazio
        fs.writeFileSync('alunos.json', '[]'); // Cria um arquivo 'alunos.json' com um array vazio para armazenar os alunos
    }
    const dados = fs.readFileSync('alunos.json', 'utf8'); // Lê o conteúdo do arquivo 'alunos.json' como uma string
    return JSON.parse(dados); // Converte a string JSON para um array de objetos JavaScript e retorna a lista de alunos
}

// Função para salvar no arquivo JSON
function salvarAlunos(alunos) {
    fs.writeFileSync('alunos.json', JSON.stringify(alunos, null, 2)); // Converte o array de alunos para uma string JSON formatada e salva no arquivo 'alunos.json'
}

// Rota GET - consultar alunos
app.get('/alunos', (req, res) => {
    const alunos = lerAlunos(); // Chama a função para ler a lista de alunos do arquivo JSON
    res.json(alunos); // Retorna a lista de alunos em formato JSON
});

// Rota POST - cadastrar aluno (com geração automática de ID)
app.post('/alunos', (req, res) => { // Recebe os dados do novo aluno no corpo da requisição
    const novoAluno = req.body; // Cria um novo objeto aluno a partir dos dados recebidos no corpo da requisição
    const alunos = lerAlunos(); // Lê a lista atual de alunos do arquivo JSON para obter o último ID e gerar um novo ID para o aluno que está sendo cadastrado
    const novoId = alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1; // Gera um novo ID para o aluno, incrementando o último ID existente ou começando do 1 se a lista estiver vazia
    novoAluno.id = novoId; // Atribui o novo ID ao objeto do novo aluno
    alunos.push(novoAluno); // Adiciona o novo aluno à lista de alunos
    salvarAlunos(alunos); // Salva a lista atualizada de alunos no arquivo JSON
    res.status(201).json(novoAluno); // Retorna o aluno recém-criado em formato JSON com status 201 (Created)
});

// Rota DELETE - excluir aluno por ID
app.delete('/alunos/:id', (req, res) => { // Recebe o ID do aluno a ser excluído como um parâmetro na URL
    const id = parseInt(req.params.id); // Converte o ID recebido como string para um número inteiro
    let alunos = lerAlunos(); // Lê a lista atual de alunos do arquivo JSON para verificar se o aluno com o ID especificado existe e para criar uma nova lista sem o aluno a ser excluído
    const novaLista = alunos.filter(a => a.id !== id); // Cria uma nova lista de alunos filtrando o aluno com o ID especificado (ou seja, removendo-o da lista)
    if (alunos.length === novaLista.length) { // Verifica se a lista de alunos não foi alterada, o que significa que o aluno com o ID especificado não foi encontrado
        return res.status(404).json({ erro: 'Aluno não encontrado' }); // Retorna um erro 404 (Not Found) se o aluno com o ID especificado não for encontrado
    }
    salvarAlunos(novaLista); // Salva a nova lista de alunos (sem o aluno excluído) no arquivo JSON
    res.json({ mensagem: 'Excluído com sucesso' }); // Retorna uma mensagem de sucesso em formato JSON após a exclusão do aluno
});

app.listen(3000, () => { // Inicia o servidor da API na porta 3000 e exibe uma mensagem no console indicando que a API está rodando
    console.log("API rodando em http://localhost:3000"); // Exibe a mensagem "API rodando em http://localhost:3000" no console para indicar que o servidor está ativo e pronto para receber requisições
});