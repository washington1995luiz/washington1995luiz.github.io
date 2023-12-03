// script.js
const form = document.getElementById("form");
const server = "https://whatsapp-u6dl.onrender.com";
const socket = new WebSocket(`ws://whatsapp-u6dl.onrender.com:443`);

let animationInitialized = false;
let countAnimation = 0;
const btn = document.getElementById('btn')
const divContainer = document.getElementById('container');
const divConnect = document.getElementById("connect");
form.addEventListener("submit", submitForm);
socket.addEventListener('message', event => {
        console.log(event.data)
        if(event.data.toString() === "connecting" && animationInitialized == false) 
                animationConnecting(false) 
        if(event.data.toString() === "ready")
                animationConnecting(true)

})
function animationConnecting(stop){ 
        animationInitialized = true;
        let animation = setInterval(() => {
                if(countAnimation == 0){
                        document.getElementById('qrdiv').innerHTML = '<p>Conectando</p>'
                        countAnimation = 1;
                        return
                }
                if(countAnimation == 1){
                        document.getElementById('qrdiv').innerHTML = '<p>Conectando.</p>'
                        countAnimation = 2;
                        return
                }
                if(countAnimation == 2){
                        document.getElementById('qrdiv').innerHTML = '<p>Conectando..</p>'
                        countAnimation = 3;
                        return
                }
                if(countAnimation == 3){
                        document.getElementById('qrdiv').innerHTML = '<p>Conectando...</p>'
                        countAnimation = 0;
                        return
                }
                
        }, 500)
         if(stop){
                clearInterval(animation)
                document.getElementById('qrdiv').style.display = "none";
                document.getElementById('ready').style.display = "flex";
                document.getElementById('ready').innerHTML = '<p>Conectado!</p>'
                setTimeout(()=>{
                        connected()
                }, 3000)
        }
        
}


function submitForm(e) {
        e.preventDefault()
        const name = document.getElementById("name");
        const files = document.getElementById("files");
        const formData = new FormData();
        formData.append("number", name.value);
        for (let i = 0; i < files.files.length; i++) {
                formData.append("files", files.files[i]);
        }
        fetch(`${server}/sendMessage`, {

                method: 'POST',
                body: formData
        })
                .then(async (res) => {
                        let { error, message } = await res.json()
                        if(error){
                                return alert(error)
                        }
                        alert(message)
                })
                .catch((err) => ("Error occured", err));
}


async function connected() {
        let response = await fetch(`${server}/connected`)
        let status = await response.json()
        console.log(status.response)
        if (status.response == false) {
                divConnect.style.display = 'block';
                divContainer.style.display = 'none';
        } else {
                divConnect.style.display = 'none';
                divContainer.style.display = 'block';
        }
}



btn.addEventListener('click', async () => {
        document.getElementById('qrdiv').innerHTML = "Gerando QR CODE, aguarde!"
        let response = await fetch(`${server}/qrcode`);
        let svg = await response.json();
        document.getElementById('qrdiv').innerHTML = svg.response
})

connected()
