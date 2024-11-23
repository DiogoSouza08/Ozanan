const usuarios = [];
const senhaMestra = "minhaSenhaMestra"; // Altere para a sua senha mestra

// Função para codificar dados em Base64 com senha mestra
function codificarBase64ComSenhaMestra(dados) {
  const dadosString = JSON.stringify(dados);
  const dadosCodificados = btoa(dadosString + senhaMestra);
  return dadosCodificados;
}

// Função para decodificar dados de Base64 com senha mestra
function decodificarBase64ComSenhaMestra(dadosCodificados) {
  const dadosString = atob(dadosCodificados);
  if (dadosString.endsWith(senhaMestra)) {
    const dados = dadosString.slice(0, -senhaMestra.length);
    return JSON.parse(dados);
  } else {
    return null;
  }
}

function mostrarCadastroForm() {
  document.getElementById("cadastroFormContainer").style.display = "block";
  document.getElementById("loginFormContainer").style.display = "none";
  document.getElementById("welcomeMessage").style.display = "none";
}

function mostrarLoginForm() {
  document.getElementById("cadastroFormContainer").style.display = "none";
  document.getElementById("loginFormContainer").style.display = "block";
  document.getElementById("welcomeMessage").style.display = "none";
}

// Função para cadastrar um novo usuário
document.getElementById("cadastroForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;

  if (nome && email && senha) {
    const usuario = {
      nome: nome,
      email: email,
      senha: senha,
    };

    const usuarioCodificado = codificarBase64ComSenhaMestra(usuario);
    usuarios.push(usuarioCodificado);

    document.getElementById("cadastroForm").reset();

    alert("Cadastro realizado com sucesso!");

    // Mostrar a mensagem de boas-vindas após o cadastro
    document.getElementById("welcomeUsername").textContent = nome;
    document.getElementById("welcomeMessage").style.display = "block";
    document.getElementById("cadastroFormContainer").style.display = "none";
  } else {
    alert("Por favor, preencha todos os campos.");
  }
});

// Função para realizar o login
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const emailLogin = document.querySelector("#emailLogin").value;
  const senhaLogin = document.querySelector("#senhaLogin").value;

  const usuarioCodificado = usuarios.find(function (usuarioCodificado) {
    const usuario = decodificarBase64ComSenhaMestra(usuarioCodificado);
    return usuario && usuario.email === emailLogin && usuario.senha === senhaLogin;
  });

  if (usuarioCodificado) {
    const usuario = decodificarBase64ComSenhaMestra(usuarioCodificado);
    alert(`Bem-vindo, ${usuario.nome}!`);
    
    // Mostrar a mensagem de boas-vindas após o login
    document.getElementById("welcomeUsername").textContent = usuario.nome;
    document.getElementById("welcomeMessage").style.display = "block";
    document.getElementById("loginFormContainer").style.display = "none";
  } else {
    alert("E-mail ou senha incorretos.");
  }
});



'use strict';

const textWriter = (()=>{

const intro = document.querySelector('.intro');

const arr = [];
let value = intro.firstChild.nodeValue;
let current = 0;
let intervalTime = 0;

const text = () =>{
  for (let i = 0, len = value.length; i < len; i++){
    arr.push(value.charAt(i));
  }

  intro.firstChild.nodeValue = '';

  const textWriter = () =>{
  intro.firstChild.nodeValue += arr[current];
  current++;
    if (current === arr.length){
      clearInterval(duration);
    }

  };

const duration = setInterval(textWriter, intervalTime);
};

const loadFunction = (callback) =>{
  if (addEventListener){
  window.addEventListener('load', callback, false);
  }
};

return {
  init: (time) =>{
    intervalTime = time;
    loadFunction(text);
  }
};

})();

textWriter.init(100);
