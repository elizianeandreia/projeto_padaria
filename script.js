const chat = document.getElementById('chat');
const resumo = document.getElementById('resumo');
const menuContainer = document.getElementById('menu');
const cart = [];


const menu = [
  '2 Pães Franceses',
  '1 Bolo de Cenoura',
  '3 Croissants',
  '2 Sonhos com creme',
  '4 Pães de Queijo',
  '1 Torta de Frango',
  '1 Café com Leite'
];


menu.forEach(item => {
  const btn = document.createElement('button');
  btn.textContent = item;
  btn.onclick = () => handleOption(item);
  menuContainer.appendChild(btn);
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
  resumo.textContent = cart.length > 0 ? 'Seu pedido: ' + cart.join(', ') : 'Nenhum item ainda.';
}

function handleOption(option) {
  addMessage(option, 'usuario');

  if (option === 'Finalizar pedido') {
    if (cart.length === 0) {
      const msg = 'Você ainda não escolheu nada!';
      addMessage(msg);
      speak(msg);
      return;
    }
    const msg = `Pedido enviado: ${cart.join(', ')}. Obrigado, Berta! ❤️`;
    addMessage(msg);
    speak(msg);
    cart.length = 0;
    updateCart();
  } else {
    cart.push(option);
    const msg = `Você escolheu ${option}. Deseja mais alguma coisa?`;
    addMessage(msg);
    speak(msg);
    updateCart();
  }
}

document.getElementById('start').addEventListener('click', () => {
  const msg = 'Olá, Berta! Que bom falar com você. Veja nosso cardápio e escolha o que deseja.';
  addMessage(msg);
  speak(msg);
  updateCart();
});
