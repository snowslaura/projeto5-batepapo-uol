let messages = [];
let content = document.querySelector("main");


// Entrando na Sala


function loginChat(){

    let name = prompt("Benvinde ao bate-papo UOl. Digite seu nome");

    const promiseParticipants = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name})

    promiseParticipants.catch(function(error){

        alert("Por favor, insira outro nome! :)")
        let name = prompt("Benvinde ao bate-papo UOl. Digite seu nome");

        
    })

}

loginChat()

// Carregando mensagens

function callMessages(){
    const promiseMessage = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
    
    promiseMessage.then(function (response) {
        
        messages=response.data
           
        for (let i=0; i<messages.length;i++){

           
            if(messages[i].type === "private_message"){
                content.innerHTML += `    
                <div class="message-container ${messages[i].type}">
                    <div class="message-structure">
                        <span class="time">(${messages[i].time}) </span>  
                        <span class="from"><b>${messages[i].from}</b></span> 
                        <span class="type"> reservadamente para <span class="to">${messages[i].to}:</span></span>
                        <span class="text">${messages[i].text}</span>
                    </div>
                </div>`
            } else if (messages[i].type === "message") {
                content.innerHTML += ` 
                <div class="message-container ${messages[i].type}">
                    <div class="message-structure ">
                        <span class="time">(${messages[i].time})</span>  
                        <span class="from"><b>${messages[i].from}</b></span> 
                        <span class="type">  para <span class="to">${messages[i].to}:</span></span>
                        <span class="text">${messages[i].text}</span>
                    </div>
                </div>`
            } else if (messages[i].type === "status") {
                
                content.innerHTML+= `
                <div class="message-container ${messages[i].type}">
                    <div class="message-structure ">
                        <span class="time">(${messages[i].time})</span>  
                        <span class="from"><b>${messages[i].from}</b></span> 
                        <span class="text"> ${messages[i].text}</span>
                    </div>
                </div>`
            }       
        }
        content.lastchild.scrollIntoView()
        
        })
      
    promiseMessage.catch(function (erro){
    alert(erro)
    
     })

}
callMessages()

// setInterval(callMessages,3000);

// Enviando mensagens
let messageWritten = document.querySelector("input").value
 messageWritten = "Laura"
function sendMessages(){

console.log(messageWritten)

// const promisseSendMessage = axios.post(https://mock-api.driven.com.br/api/v4/uol/messages, {
    
//         from: name,
//         to: Todos // (Todos se não for um específico)",
//         text: Input.value,
//         type: "message" // ou "private_message" para o bônus
    

// })


}



