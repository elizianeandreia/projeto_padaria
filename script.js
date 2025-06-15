const chat = document.getElementById('chat');
const resumo = document.getElementById('resumo');
const menuContainer = document.getElementById('menu');
const cart = [];


const menu = [
  { nome: ' Pães Franceses', preco: 2.00 },
  { nome: ' Bolo de Cenoura', preco: 7.50 },
  { nome: 'Croissants', preco: 6.00 },
  { nome: ' Sonhos com creme', preco: 5.00 },
  { nome: 'Pães de Queijo', preco: 4.00 },
  { nome: 'Torta de Frango', preco: 8.50 },
  { nome: 'Café com Leite', preco: 3.00 }
];


menu.forEach((item, index) => {
  const card = document.createElement('div');
  card.classList.add('item-card');

    const title = document.createElement('h3');
  title.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;

  const controls = document.createElement('div');
  controls.classList.add('item-controls');

  const label = document.createElement('span');
 label.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;


  const input = document.createElement('input');
  input.type = 'number';
  input.min = '1';
  input.value = '1';


  const btn = document.createElement('button');
  btn.textContent = 'Adicionar';
  btn.onclick = () => {
    const qtd = parseInt(input.value);
    if (qtd > 0) handleOption(item, qtd);
  };

controls.appendChild(input);
  controls.appendChild(btn);
  card.appendChild(title);
  card.appendChild(controls);
  menuContainer.appendChild(card);
});
function speak(text) {
  const voices = speechSynthesis.getVoices();
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'pt-BR';
  
  if (voices.length) {
    const voice = voices.find(v => v.lang === 'pt-BR');
    if (voice) msg.voice = voice;
  }

  msg.rate = 1;
  speechSynthesis.speak(msg);
}

function addMessage(text, from = 'sistema') {
  const p = document.createElement('p');
  p.classList.add(from);
  p.textContent = (from === 'sistema' ? '🟡 ' : '✅ ') + text;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
}

function updateCart() {
  if (cart.length === 0) {
    resumo.textContent = 'Nenhum item ainda.';
    return;
  }

  const resumoItens = cart.map(c => `${c.quantidade}x ${c.item.nome}`).join(', ');
  const total = cart.reduce((sum, c) => sum + c.item.preco * c.quantidade, 0).toFixed(2);
  resumo.textContent = `Seu pedido: ${resumoItens} | Total: R$ ${total}`;
}

function handleOption(item, quantidade = 1) {
  addMessage(`${quantidade}x ${item.nome}`, 'usuario');

  if (item === 'Finalizar pedido') {
    if (cart.length === 0) {
      const msg = 'Você ainda não escolheu nada!';
      addMessage(msg);
      speak(msg);
      return;
    }
    const resumoPedido = cart.map(c => `${c.quantidade}x ${c.item.nome}`).join(', ');
    const total = cart.reduce((sum, c) => sum + c.item.preco * c.quantidade, 0).toFixed(2);
    const msg = `Pedido enviado: ${resumoPedido}. Total: R$ ${total}. Obrigado, Berta! ❤️`;
    addMessage(msg);
    speak(msg);
    cart.length = 0;
    updateCart();
    return;
  }

  cart.push({ item, quantidade });
  const msg = `Você escolheu ${quantidade}x ${item.nome}. Deseja mais alguma coisa?`;
  addMessage(msg);
  speak(msg);
  updateCart();
}

document.getElementById('start').addEventListener('click', () => {
  const msg = 'Olá, Berta! Que bom falar com você. Veja nosso cardápio e escolha o que deseja.';
  addMessage(msg);
  speak(msg);
  updateCart();
});
