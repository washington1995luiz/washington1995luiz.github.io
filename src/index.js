// script.js
const form = document.getElementById("form");
const btn = document.getElementById('btn')
const divContainer = document.getElementById('container');
const divConnect = document.getElementById("connect");

form.addEventListener("submit", submitForm);
const server = "https://whatsapp-u6dl.onrender.com";
const socket = new WebSocket(`wss://whatsapp-u6dl.onrender.com`);
//const server = "http://localhost:8080";
//const socket = new WebSocket(`ws://localhost:8080`);
let animationInitialized = false;
let countAnimation = 0;

socket.addEventListener('message', event => {
        if (!event.data.toString().includes("svg"))
                console.log(event.data)
        if (event.data.toString() === "connecting" && animationInitialized == false)
                animationConnecting(false)
        if (event.data.toString() === "ready")
                animationConnecting(true)
        if (event.data.toString().includes("svg"))
                document.getElementById('qrdiv').innerHTML = event.data
        if (event.data.toString().includes("disconnected"))
                connected()

})
function animationConnecting(stop) {
        animationInitialized = true;
        let animation = setInterval(() => {
                if (countAnimation == 0) {
                        document.getElementById('qrdiv').innerHTML = '<p>Conectando</p>'
                        countAnimation = 1;
                        return
                }
                if (countAnimation == 1) {
                        document.getElementById('qrdiv').innerHTML = '<p>Conectando.</p>'
                        countAnimation = 2;
                        return
                }
                if (countAnimation == 2) {
                        document.getElementById('qrdiv').innerHTML = '<p>Conectando..</p>'
                        countAnimation = 3;
                        return
                }
                if (countAnimation == 3) {
                        document.getElementById('qrdiv').innerHTML = '<p>Conectando...</p>'
                        countAnimation = 0;
                        return
                }

        }, 500)
        if (stop) {
                clearInterval(animation)
                document.getElementById('qrdiv').style.display = "none";
                document.getElementById('ready').style.display = "flex";
                document.getElementById('ready').innerHTML = '<p>Conectado!</p>'
                setTimeout(() => {
                        connected()
                }, 3000)
        }

}


async function submitForm(e) {
        e.preventDefault()
        const number = document.getElementById("number");
        const text = document.getElementById("text");
        const files = document.getElementById("files");
        const formData = new FormData();
        if (number.value == '') return alert("Número Whatsapp não pode estar vázio!")
        formData.append("number", number.value);
        if (text.value !== '') {
                formData.append("text", text.value);
        }
        if (files.files.length > 0) {
                formData
                for (let i = 0; i < files.files.length; i++) {
                        formData.append("files", files.files[i]);
                }
        }
        let url = server;

        if (text.value !== '' && files.files.length > 0) url += "/sendTextFile"
        if (text.value == '' && files.files.length > 0) url += "/sendFile"
        if (text.value !== '' && files.files.length == 0 || files.files == undefined) url += "/sendText"
        if (url == server) return alert("Você não selecionou um arquivo ou não digitou nenhum texto!");

        let response = await fetch(url, { method: "POST", body: formData });
        if (response.status === 500) {
                alert("Arquivo muito grande para ser enviado! - Máximo 40Mb")
        }
        let { error, message } = await response.json()
        if (error) return alert(error)
        alert(message)



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
connected()