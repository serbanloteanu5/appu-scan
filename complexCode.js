/* 
Filename: complexCode.js 

This code is a complex implementation of a chatbot that utilizes the Natural Language Processing (NLP) library 'compromise'. It is designed to interact with users, understand their input, and provide relevant responses based on the context of the conversation. The code also includes various helper functions, error handling, and advanced string manipulation techniques.
*/

const compromise = require('compromise');

// Helper function to generate a random integer within a given range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Chatbot class definition
class Chatbot {
  constructor(name) {
    this.name = name;
    this.conversationHistory = [];
  }

  greet() {
    const greetings = ['Hi!', 'Hello!', 'Hey there!', 'Greetings!'];
    const randomIndex = getRandomInt(0, greetings.length - 1);
    return greetings[randomIndex];
  }

  processInput(input) {
    let response;

    if (input === 'hi' || input === 'hello') {
      response = this.greet();
    } else {
      this.conversationHistory.push(input);

      if (this.conversationHistory.length >= 3) {
        const lastInput = this.conversationHistory[this.conversationHistory.length - 1];
        const secondLastInput = this.conversationHistory[this.conversationHistory.length - 2];
        const thirdLastInput = this.conversationHistory[this.conversationHistory.length - 3];

        const lastInputKeywords = compromise.text(lastInput).nouns().out('array');
        const secondLastInputKeywords = compromise.text(secondLastInput).nouns().out('array');
        const thirdLastInputKeywords = compromise.text(thirdLastInput).nouns().out('array');

        if (lastInputKeywords.length === 0) {
          response = 'Could you please rephrase that? I didn\'t understand.';
        } else {
          const mergedKeywords = [...lastInputKeywords, ...secondLastInputKeywords, ...thirdLastInputKeywords];
          const uniqueKeywords = [...new Set(mergedKeywords)];

          const capitalizedKeywords = uniqueKeywords.map(keyword => capitalizeFirstLetter(keyword));
          const responseKeywords = capitalizedKeywords.join(', ');

          response = `So you're interested in ${responseKeywords}? That's intriguing!`;
        }
      } else {
        response = 'I need a bit more context. Could you please provide some additional information?';
      }
    }

    return response;
  }
}

// Example Usage
const chatbot = new Chatbot('Sophia');

console.log(chatbot.greet());
console.log(chatbot.processInput('Hello'));
console.log(chatbot.processInput('Can you tell me about the weather?'));
console.log(chatbot.processInput('I love sports, especially football.'));
console.log(chatbot.processInput('What are your hobbies?'));
console.log(chatbot.processInput('I enjoy painting and reading books.'));

// More complex code continues...