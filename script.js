const chat = document.getElementById('chat');

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'pt-BR';
  msg.rate = 1;
  speechSynthesis.speak(msg);
}

function addMessage(text, from = 'sistema') {
  const p = document.createElement('p');
  p.textContent = (from === 'sistema' ? '🟡 ' : '🟢 ') + text;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
}

function handleOption(option) {
  addMessage(option, 'usuario');
  if (option === 'Finalizar pedido') {
    const msg = 'Seu pedido foi enviado com carinho! Obrigado, Berta!';
    addMessage(msg);
    speak(msg);
  } else {
    const msg = `Você escolheu ${option}. Deseja mais alguma coisa?`;
    addMessage(msg);
    speak(msg);
  }
}

window.onload = () => {
  const msg = 'Olá, Berta! Que bom falar com você. O que você gostaria de pedir hoje?';
  addMessage(msg);
  speak(msg);
};
