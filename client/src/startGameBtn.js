import io from 'socket.io-client';
import { startGameTimer } from "./startGameTimer.js";
import { exitGameBtn }  from "./printexitGameBtn.js";
import { homepageDiv, printHomePage } from './printHomePage.js'
import { printWaitingForPlayers }  from './printWaitingForPlayers.js'
import { printPaintOnGrid } from './printPaintOnGrid.js';


export function startGameBtn(roomInput) {

    let startGameBtn = document.createElement('button');
    startGameBtn.textContent = "Start game";
    startGameBtn.classList.add('startGameBtn');


    
    app.append(startGameBtn);

    startGameBtn.addEventListener('click', () => {

   
  
        homepageDiv.innerHTML = '';
        app.innerHTML = '';

        printWaitingForPlayers(roomInput.value);
        exitGameBtn();
        
        // Call on inside once game starts
        // startGameTimer();

        //finishBtn(); - ska printas när 4 personer har ansulutit

    })
}

export function printchat() {
    const socket = io('http://localhost:3000');

    let chatContainer = document.createElement('div');
    chatContainer.classList.add('chatContainer');
  
    let sendMsg = document.createElement('input');
    sendMsg.placeholder = 'Type message';
  
    let sendBtn = document.createElement('button')
    sendBtn.textContent ='Send'
  
    let chatList = document.createElement('ul');
      
    sendBtn.addEventListener("click", () => {
      console.log("send chat", sendMsg.value);
      socket.emit("chat", sendMsg.value);
      sendMsg.value = "";
    })
    
    socket.on("chat", (arg) => {
      console.log("socket", arg);
      updateChat(arg);
    })
    
    function updateChat(chat) {
      let li = document.createElement("li")
      li.innerText = chat ;
      chatList.appendChild(li);
    }
    
    chatContainer.append(chatList, sendMsg, sendBtn);
    app.append(chatContainer);
}