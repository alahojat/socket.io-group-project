import io from 'socket.io-client';
import { startGameTimer } from "./startGameTimer.js";
import { exitGameBtn }  from "./printexitGameBtn.js";
import { homepageDiv, printHomePage } from './printHomePage.js'
import { printWaitingForPlayers }  from './printWaitingForPlayers.js'
import { printPaintOnGrid } from './printPaintOnGrid.js';
import { playersAddingImage } from './PlayerAddingImage.js';


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
let chatContainer = document.createElement('div');

let chatList = document.createElement('ul');
export function printchat(room) {
  
    const socket = io('http://localhost:3000');


    chatContainer.classList.add('chatContainer');
  
    let heading = document.createElement('h4')
    heading.textContent = `Gridpainter gameroom ${room}`;
    let sendMsg = document.createElement('input');
    sendMsg.placeholder = 'Type message';
  
    let sendBtn = document.createElement('button')
    sendBtn.textContent ='Send'
  
   
    const user = JSON.parse(localStorage.getItem('user'))
    let singleUser = user.find(user => user.userId)
  
  
    fetch('http://localhost:3000/users/' + singleUser.userId)
    .then(res => res.json())
    .then(data => {
  console.log(data)
      
      sendBtn.addEventListener("click", () => {
        data.map(user => {
          console.log("send chat", sendMsg.value);
          socket.emit("chat", {userName: user.userName, room: room, message: sendMsg.value});
          sendMsg.value = "";

        })
    })
  })
  chatContainer.append(heading, chatList, sendMsg, sendBtn);
  app.append(chatContainer);
}



export function updateChatList(chat) {
  console.log('chat', chat)
  let li = document.createElement("li")
  li.innerText =  `${chat.userName}: ${chat.message}`;
  chatList.appendChild(li);
}