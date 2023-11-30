// script.js
const form = document.getElementById("form");

form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById("name");
    const files = document.getElementById("files");
    const formData = new FormData();
    formData.append("number", name.value);
    for(let i =0; i < files.files.length; i++) {
            formData.append("files", files.files[i]);
    }
    fetch("https://whatsapp-u6dl.onrender.com/sendMessage", {
    method: 'POST',
    body: formData
    })
        .then((res) => alert('Mensagem Enviada'))
        .catch((err) => ("Error occured", err));
}