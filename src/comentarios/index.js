import store from 'store';
import './comentarios.css';
import comentarios from './comentarios.json';

document.body.innerHTML = `
  <h1>O Livro dos Espíritos comentado pelo Espírito Miramez</h1>
  <nav>
    Ir para: <input id="numeroPergunta" value="1" type="number">
    <select id="perguntaInicial"><option></option>
    </select> &nbsp;&nbsp; Quantidade:
    <input id="quantidadePerguntas" value="10" type="number">
  </nav>
  <div id="comentarios">
  </div>
`;

function titulo(comentario) {
  var texto = comentario.questao;
  texto = texto.replace(/\n/g, ' ').replace(/.*?\d+\. (.*)/g, "$1");
  if (texto.length > 40) {
    texto = texto.substring(0, 40) + "...";
  }
  return `${comentario.numero}. ${texto} (${comentario.tituloComentario})`;
}

var html = "<option/>";
for (var i in comentarios) {
  var comentario = comentarios[i];
  if (comentario) {
    comentario.questao.split('\n', 2)[0]
    html += (`<option value="${comentario.numero}">${titulo(comentario)}</option>`);
  }
}
document.getElementById('perguntaInicial').innerHTML = html;

function exibirComentarios(perguntaInicial, quantidade) {
  store.set("ultimaPergunta", perguntaInicial);
  store.set("quantidadePerguntas", quantidade);
  var html = "";
  var total = 0;
  for (i in comentarios) {
    var comentario = comentarios[i];
    if (comentario) {
      if (comentario.numero < perguntaInicial)
        continue;
      if (total >= quantidade)
        break;
      total++;
      html += `
        <article>
          <header>
            <h1>Questão ${comentario.numero}</h1>
            <p>${comentario.parte} - ${comentario.tituloParte}</p>
            <h3>${comentario.tituloSecao}</h3>
          </header>
          <section class='questao'>
            <p>${comentario.questao.split('\n').join('</p><p>')}</p>
          </section>
          <section class='comentario'>
            <h3>Comentário "${comentario.tituloComentario}"</h3>
            <p>${comentario.comentario.split('\n').join('</p><p>')}</p>
          </section>
        </article>
      `;
    } else {
      console.log(`Comentário da pergunta ${(parseInt(i, 10) + 1)} não foi encontrada`);
    }
  }
  document.getElementById("comentarios").innerHTML = html;
}

function listarComentarios() {
  var numeroPergunta = document.getElementById("numeroPergunta").value = document.getElementById("perguntaInicial").value;
  var quantidadePerguntas = document.getElementById("quantidadePerguntas").value;
  exibirComentarios(numeroPergunta, quantidadePerguntas);
}

function isNumber(n) {
  return !isNaN(parseInt(n, 10));
}

document.getElementById("perguntaInicial").onchange = listarComentarios;
document.getElementById("quantidadePerguntas").onchange = listarComentarios;
document.getElementById("numeroPergunta").onchange = function () {
  var numeroPerguntaText = document.getElementById("numeroPergunta").value.replace(/^\s+|\s+$/g, '');
  var numeroPergunta = parseInt(numeroPerguntaText, 10);
  if (isNumber(numeroPergunta)) {
    document.getElementById("perguntaInicial").value = document.getElementById("numeroPergunta").value;
    listarComentarios();
  }
};
document.getElementById("numeroPergunta").onfocus = function () {
  document.getElementById("numeroPergunta").select();
}
document.getElementById("quantidadePerguntas").onfocus = function () {
  document.getElementById("quantidadePerguntas").select();
}
document.getElementById("numeroPergunta").focus();
if (store.get("ultimaPergunta"))
  document.getElementById("perguntaInicial").value = store.get("ultimaPergunta");
if (store.get("quantidadePerguntas"))
  document.getElementById("quantidadePerguntas").value = store.get("quantidadePerguntas");
listarComentarios();