const doNothing = () => { };

const sendChoice = (selectedChoice) => {
  const choice = `choice=${selectedChoice}`;
  xhr(doNothing, 'POST', '/game', choice);
};

const selectOption = (event) => {
  const choice = event.srcElement.id;
  const choices = ['rock', 'paper', 'scissor'];

  if (choices.includes(choice)) {
    sendChoice(choice);
  }
};
