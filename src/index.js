// script.js
const form = document.getElementById("form");

form.addEventListener("submit", submitForm);

function submitForm(e) {
        e.preventDefault();
        const name = document.getElementById("name");
        const files = document.getElementById("files");
        const formData = new FormData();
        formData.append("number", name.value);
        for (let i = 0; i < files.files.length; i++) {
                formData.append("files", files.files[i]);
        }
        fetch("https://whatsapp-u6dl.onrender.com/sendMessage", {
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

const btn = document.getElementById('btn')
const divContainer = document.getElementById('container');
const divConnect = document.getElementById("connect");
async function connected() {
        let response = await fetch("https://whatsapp-u6dl.onrender.com/connected")
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
btn.addEventListener('click', async (event) => {
        document.getElementById('qrdiv').innerHTML = "Gerando QR CODE, aguarde!"
        let response = await fetch("https://whatsapp-u6dl.onrender.com/qrcode");
        let svg = await response.json();
        document.getElementById('qrdiv').innerHTML = svg.response
        document.getElementById('qrdiv').innerHTML += '<p>Já leu o qr code?</p><button id="refresh">Recarregar Página</button>'
        document.getElementById('refresh').addEventListener('click', () => {
                document.getElementById('qrdiv').innerHTML = 'Recarrengando página, aguarde!!'
                setTimeout(() => {
                  window.location.reload()      
                }, 5000)
                
        })

})
