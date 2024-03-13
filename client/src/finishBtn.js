import io from 'socket.io-client';

import { playersAddingImage } from './PlayerAddingImage';
import { gridDiv } from './printPaintOnGrid';

export function finishBtn(roomInput, usersWithName, uncoloredGrid, image) {



    const socket = io('http://localhost:3000');

    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');

    let finishBtn = document.createElement('button');
    finishBtn.textContent = "finished";

    let buttonDesc = document.createElement('p');
    buttonDesc.textContent = "when clicked you will not be able to edit the grid anymore";

    let clickCount = 0;

    finishBtn.addEventListener('click', () => {

        finishBtn.disabled = true;

        buttonDesc.textContent = "waiting for the other players to press finish";
        

        socket.emit('finishBtnClicked');
    })

    socket.on('totalClickCount', (totalClickCount) => {
        console.log("total click count so far", totalClickCount);
        if (totalClickCount === 4 && timerInterval) {
            clearInterval(timerInterval); // Stop the timer
            // You can add additional logic here if needed
        }
    });

    socket.on('totalClickCount', (totalClickCount) => {
        console.log("total click count so far", totalClickCount);
        if (totalClickCount === 4) {
            clearInterval(timerInterval); // Stop the timer
            // You can add additional logic here if needed
        }
    });
    
    socket.on('changeBackgroundColor', () => {

        gridDiv.innerHTML = '';
        app.innerHTML = '';
        playersAddingImage(roomInput, usersWithName,uncoloredGrid, image)

    })
   

    buttonContainer.append(finishBtn, buttonDesc)
    app.append(buttonContainer);

  /*  let timerInterval = startGameTimer(socket);

    if (!timerInterval) {
        timerInterval = startGameTimer(socket);
    }
*/
    
    
  
}


/*
socket.on('timerUpdate', ({ minutes, seconds }) => {
    // Update the timer display with the received minutes and seconds
});
*/