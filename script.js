// Espera a página carregar inteira antes de rodar o código
document.addEventListener("DOMContentLoaded", function () {
  console.log("Página carregada. O script.js está funcionando!");

  // =====================================================
  // 1) TEMA CLARO / ESCURO
  // =====================================================
  const btnTema = document.getElementById("btn-tema");

  // Só continua se o botão existir (evita erro)
  if (btnTema) {
    // Tenta lembrar a escolha da última visita
    try {
      if (localStorage.getItem("tema") === "escuro") {
        document.body.classList.add("escuro");
        btnTema.textContent = "☀️";
      }
    } catch (erro) {
      console.log("Não foi possível ler o tema salvo:", erro);
    }

    btnTema.addEventListener("click", function () {
      // Liga/desliga a classe "escuro" (troca os potes de tinta do CSS)
      const escuro = document.body.classList.toggle("escuro");
      btnTema.textContent = escuro ? "☀️" : "🌙";
      console.log("Tema alterado para:", escuro ? "escuro" : "claro");

      try {
        localStorage.setItem("tema", escuro ? "escuro" : "claro");
      } catch (erro) {
        console.log("Não foi possível salvar o tema:", erro);
      }
    });
  } else {
    console.log("Aviso: botão #btn-tema não encontrado.");
  }

  // =====================================================
  // 2) MENU DO CELULAR (abre e fecha)
  // =====================================================
  const btnMenu = document.getElementById("btn-menu");
  const menu = document.getElementById("menu");

  if (btnMenu && menu) {
    btnMenu.addEventListener("click", function () {
      menu.classList.toggle("aberto");
      console.log("Menu aberto?", menu.classList.contains("aberto"));
    });

    // Fecha o menu ao clicar em um link
    const links = menu.querySelectorAll("a");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("aberto");
      });
    });
  } else {
    console.log("Aviso: #btn-menu ou #menu não encontrado.");
  }

  // =====================================================
  // 3) FORMULÁRIO DE CONTATO
  // =====================================================
  const form = document.getElementById("form-contato");
  const campoNome = document.getElementById("nome");
  const campoEmail = document.getElementById("email");
  const campoMensagem = document.getElementById("mensagem");
  const msgSucesso = document.getElementById("msg-sucesso");

  // Mostra (ou limpa) a mensagem de erro de um campo
  function mostrarErro(campo, idErro, texto) {
    const span = document.getElementById(idErro);
    if (span) {
      span.textContent = texto;
    }
    if (campo) {
      campo.classList.toggle("invalido", texto !== "");
    }
  }

  // Confere se o e-mail tem formato válido (ex: usuario@dominio.com)
  function emailValido(email) {
    const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
  }

  if (form && campoNome && campoEmail && campoMensagem) {
    form.addEventListener("submit", function (evento) {
      // Impede a página de recarregar
      evento.preventDefault();
      console.log("Formulário enviado. Validando...");

      if (msgSucesso) {
        msgSucesso.textContent = "";
      }

      const nome = campoNome.value.trim();
      const email = campoEmail.value.trim();
      const mensagem = campoMensagem.value.trim();
      let tudoCerto = true;

      // Valida o nome
      if (nome === "") {
        mostrarErro(campoNome, "erro-nome", "Por favor, digite seu nome.");
        tudoCerto = false;
      } else {
        mostrarErro(campoNome, "erro-nome", "");
      }

      // Valida o e-mail
      if (email === "") {
        mostrarErro(campoEmail, "erro-email", "Por favor, digite seu e-mail.");
        tudoCerto = false;
      } else if (!emailValido(email)) {
        mostrarErro(campoEmail, "erro-email", "E-mail inválido. Ex: usuario@dominio.com");
        tudoCerto = false;
      } else {
        mostrarErro(campoEmail, "erro-email", "");
      }

      // Valida a mensagem
      if (mensagem === "") {
        mostrarErro(campoMensagem, "erro-mensagem", "Por favor, escreva sua mensagem.");
        tudoCerto = false;
      } else {
        mostrarErro(campoMensagem, "erro-mensagem", "");
      }

      // Se algo estiver errado, para por aqui
      if (!tudoCerto) {
        console.log("Validação falhou. Corrija os campos.");
        return;
      }

      // Tudo certo: simula o envio, limpa os campos e avisa
            console.log("Validação OK! Dados (simulação):", { nome, email, mensagem });
            form.reset();

            if (msgSucesso) {
              msgSucesso.textContent = "Mensagem enviada com sucesso!";
            }
            alert("Mensagem enviada com sucesso!");
          });
        } else {
          console.log("Aviso: formulário ou campos não encontrados.");
        }
      });