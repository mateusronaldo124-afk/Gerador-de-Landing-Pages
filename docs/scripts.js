async function gerarCodigo() {
  let textarea = document.querySelector(".texto-pagina").value;

  if (textarea.trim() === '') {
    alert("Descreva seu negócio antes de gerar!");
    return;
  }

  let espacoCodigo = document.querySelector(".bloco-codigo");
  let espacoSite = document.querySelector(".bloco-site");

  espacoCodigo.textContent = "Gerando...";
  espacoSite.srcdoc = "";

  try {
    let resposta = await fetch("/api/gerar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ textarea })
    });

    let dados = await resposta.json();

    if (!resposta.ok) {
      espacoCodigo.textContent = "Erro: " + (dados.error || "algo deu errado");
      return;
    }

    espacoCodigo.textContent = dados.resultado;
    espacoSite.srcdoc = dados.resultado;

  } catch (error) {
    espacoCodigo.textContent = "Erro ao conectar com o servidor.";
    console.error(error);
  }
}