let messages = [];
let content = document.querySelector("main");
let nameInput;

// Entrando na Sala

async function loginChat(){

    let erro = true;

        while(erro){

            nameInput = prompt("Benvinde ao chat Uol, escreva seu nome. Caso não dê certo, digite outro nome");
            
            const promiseParticipants = await axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", 
            {
            name: nameInput,
            })

            if (promiseParticipants.status === 200) {
                erro = false
                callMessages();
               
            }

            else {alert("Coloque outro nome!")}
        }

}

loginChat()


// Carregando mensagens do chat

function callMessages(){
    const promiseMessage = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
    
    promiseMessage.then(function (response) {
        
        messages=response.data        

        content.innerhtml= "";
           
        for (let i=0; i<messages.length;i++){

           
            if(messages[i].type === "private_message"){
                content.innerHTML += `    
                <div class="message-container ${messages[i].type} data-identifier="message"">
                    <div class="message-structure">
                        <span class="time">(${messages[i].time}) </span>  
                        <span class="from"><b>${messages[i].from}</b></span> 
                        <span class="type"> reservadamente para <span class="to">${messages[i].to}:</span></span>
                        <span class="text">${messages[i].text}</span>
                    </div>
                </div>`
            } else if (messages[i].type === "message") {
                content.innerHTML += ` 
                <div class="message-container ${messages[i].type} data-identifier="message"">
                    <div class="message-structure ">
                        <span class="time">(${messages[i].time})</span>  
                        <span class="from"><b>${messages[i].from}</b></span> 
                        <span class="type">  para <span class="to">${messages[i].to}:</span></span>
                        <span class="text">${messages[i].text}</span>
                    </div>
                </div>`
            } else if (messages[i].type === "status") {
                
                content.innerHTML+= `
                <div class="message-container ${messages[i].type} data-identifier="message"">
                    <div class="message-structure ">
                        <span class="time">(${messages[i].time})</span>  
                        <span class="from"><b>${messages[i].from}</b></span> 
                        <span class="text"> ${messages[i].text}</span>
                    </div>
                </div>`
            } 

            let lastChild = content.childNodes[content.childNodes.length-1]
        
            lastChild.scrollIntoView({behaviour:"smooth"})      
        }
        
               
        })
      
    promiseMessage.catch(function (erro){
    alert(erro)
    
    })

}

setInterval(callMessages,3000);

// Enviando mensagens

function sendMessages(){

    let messageWritten = document.querySelector("input[name='messageInside']").value

    if (messageWritten.length === 0) return;

    const promiseSendMessage = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', {
        from: nameInput,
        to: "Todos", // (Todos se não for um específico)",
        text: messageWritten,
        type: "message" // ou "private_message" para o bônus
    })

     promiseSendMessage.then((response) => {
         callMessages();
         document.querySelector("input[name='messageInside']").value = "";

    })

    promiseSendMessage.catch((erro) => {
        window.location.reload()
    })     
}

// Mantendo logado

function keepLoggedIn(){

    let promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status",{
        name: nameInput
    })
}

setInterval(keepLoggedIn, 5000)
