let horarios = []
let funcionarios = []
let pessoasFolgando = []

let createNewEmployeeButton = document.getElementById("save")
let funcionariosListView = document.querySelector('.listarAtividades')
let employeeListViewBody = document.querySelector(".listaFuncionarios")
let createNewActivityButton = document.getElementById('salvarAtividade')


function popHorarios() {
    if (localStorage.getItem('horario')) {
        horarios = []

        let arrayList = JSON.parse(localStorage.getItem('horario').toString())
        let ajusteArray = String(arrayList).split(',')
        for (let i = 0; i < ajusteArray.length; i++) {
            horarios.push(ajusteArray[i])
        }
 
    }
}
function popFuncionarios() {
    if (localStorage.getItem('funcionarios')) {
        funcionarios = []
        let arrayList = JSON.parse(localStorage.getItem('funcionarios').toString())
        let ajusteArray = String(arrayList).split(',')
        for (let i = 0; i < ajusteArray.length; i++) {
            funcionarios.push(ajusteArray[i])
        }

    }

}


function createNewEmployee() {
    let employeeName = document.getElementById('horario').value
    if (employeeName === '' || employeeName === undefined || employeeName === ' ') return alert('Digite o horário para salvar!!')
    popHorarios()
    popFuncionarios()
    let newArray = []
    let adicionado = false;
    //newArray.push(employeeName)
    if (horarios.length == 0) {
        newArray.push(employeeName)
    } else if (employeeName.toString() > horarios[horarios.length - 1].toString()) {
        horarios.forEach(e => newArray.push(e))
        newArray.push(employeeName)
    }
    else {

        for (let i = 0; i < horarios.length; i++) {
            console.log({ adicionado })

            if (employeeName.toString() == horarios[i].toString()) {
                alert("Horário já existe")
                return
            }

            if (employeeName.toString() < horarios[i].toString() && adicionado == false) {
                newArray.push(employeeName)
                newArray.push(horarios[i])
                adicionado = true
            } else if (employeeName.toString() > horarios[i].toString() && employeeName.toString() > horarios[i + 1].toString()) {
                newArray.push(horarios[i])
            } else if (employeeName.toString() > horarios[i].toString() && employeeName.toString() < horarios[i + 1].toString()) {
                newArray.push(horarios[i])
                newArray.push(employeeName)
            } else {
                newArray.push(horarios[i])
            }

        }
    }
    localStorage.setItem("horario", JSON.stringify(newArray))
    //localStorage.setItem("horarios", JSON.stringify(newArray))
    document.getElementsByName('horario')[0].value = ''
    getAllhorarios()
}
let pessoasSelecionada = []
function hiddenfuncionariosSelected() {
    let select = document.querySelectorAll(".select > option")
    let pessoasSelecionadas = []
    for (let i = 0; i < select.length; i++) {
        if (select[i].selected && select[i].innerHTML !== "Selecionar") {
            pessoasSelecionadas.push(select[i].innerHTML)
   
        }
    }
    pessoasSelecionada = pessoasSelecionadas
    for (let i = 0; i < select.length; i++) {
        if (select[i].selected == false && select[i].innerHTML !== "Selecionar" && arrayPessoas(select[i].innerHTML)) {
            document.querySelectorAll(".select > option")[i].style.display = "none"
        } else if (select[i].selected == false && select[i].innerHTML !== "Selecionar" && arrayPessoas(select[i].innerHTML) == false) {
            document.querySelectorAll(".select > option")[i].style.display = "block"
        }
    }


    function arrayPessoas(pessoa) {
        for (let i = 0; i < pessoasSelecionada.length; i++) {
            if (pessoa == pessoasSelecionada[i]) {
                return true
            }
        }
        return false
    }

}


function getAllhorarios() {
    popHorarios()
    popFuncionarios()
    let newArray = []
    newArray.push("Selecionar")
    for (let i = 0; i < funcionarios.length; i++) {
        if (pessoasFolgando.length > 0) {
            if (comparar(funcionarios[i]) == false) {
                newArray.push(funcionarios[i])
            }
        } else {
            newArray.push(funcionarios[i])
        }
    }
    function comparar(texto) {
        for (let i = 0; i < pessoasFolgando.length; i++) {
      
            if (pessoasFolgando[i] == texto) return true
        }
        return false
    }

    employeeListViewBody.innerHTML = ''
    let parse = horarios
    for (let i = 0; i < parse.length; i++) {

        employeeListViewBody.innerHTML += `
        <li><span style="text-transform: capitalize;">${parse[i]} </span>
        <div style="display: flex;">
            <select onchange="hiddenfuncionariosSelected({index: ${i}, position: 0})" class="selecionar select" name="selecionar_${i}_0" id="selecionar_${i}_0"> 
                ${setfuncionariosTohorarios()}
            </select>
            <select onchange="hiddenfuncionariosSelected({index: ${i}, position: 1})" style="margin-left: 5px;" class="selecionar1 select" name="selecionar_${i}_1" id="selecionar_${i}_1"> 
                ${setfuncionariosTohorarios()}
            </select>
            <select onchange="hiddenfuncionariosSelected({index: ${i}, position: 2})" style="margin-left: 5px;" class="selecionar2 select" name="selecionar_${i}_2" id="selecionar_${i}_2"> 
                ${setfuncionariosTohorarios()}
            </select>
            <select onchange="hiddenfuncionariosSelected({index: ${i}, position: 3})" style="margin-left: 5px;" class="selecionar1 select" name="selecionar_${i}_1" id="selecionar_${i}_1"> 
                ${setfuncionariosTohorarios()}
            </select>
            <select onchange="hiddenfuncionariosSelected({index: ${i}, position: 4})" style="margin-left: 5px;" class="selecionar2 select" name="selecionar_${i}_2" id="selecionar_${i}_2"> 
                ${setfuncionariosTohorarios()}
            </select>
            <button style="margin-left: 5px;" onclick="deleteEmployee(${i})" index="${i}">Excluir</button>
        </div>
        </li> `;



    }
    function setfuncionariosTohorarios() {
        let text = ''
        for (let i = 0; i < newArray.length; i++) {
            text += `<option style="text-transform: capitalize;" value="${i}" name="${newArray[i]}">${newArray[i]}</option>`
        }
        return text
    }


}

function createNewActivity() {
    let activityText = document.getElementsByName('activity')[0].value
    if (activityText === '' || activityText === undefined || activityText === ' ') return alert('Digite o nome para salvar!!')
    popFuncionarios()
    funcionarios.push(activityText)
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios))
    document.getElementsByName('activity')[0].value = ''
    getfuncionarios()
    getAllhorarios()
}


function getfuncionarios() {
    funcionariosListView.innerHTML = ''
    popFuncionarios()
    funcionariosListView.innerHTML = ''
    for (let i = 0; i < funcionarios.length; i++) {
        if (!funcionarios[i].includes('Selecionar')) {
            funcionariosListView.innerHTML += `<li><span style="text-transform: uppercase;">${funcionarios[i]}</span> <div class="folgaCheckbox">
            <input index="${i}" onclick="folgaCheckBox(${i})" class="folga" type="checkbox" name="folga" id="folga">
                <label for="folga">Folga</label>
            </div>  <button  onclick="deleteFuncionario(${i})" index="${i}">Excluir</button></li> `
        }
    }
}

/** Create a PDF */
function createPDF({ print, getDay }) {
    let array = JSON.parse(localStorage.getItem(getDay))
    let styleTdName = `style="border-right: 1px solid black; border-top: 1px solid black;
        font-size: 15px; max-height: 75px; padding-left: 5px; width: 150px;
        word-wrap: break-word;"`
    let styleTdfuncionarios = `style="border-top: 1px solid black;
        font-size: 15px; max-height: 75px; padding-left: 5px;width: 200px;
        word-wrap: break-word;"`
    let conteudoDinamico = ''
    //let folga = ''
    for (let i = 0; i < array.employee.length; i++) {
        //if (!array.employee[i].folga) {
            let funcionariosSelected = ''
            if (array.employee[i].funcionariosSelected.length == 2) {
                funcionariosSelected += `${array.employee[i].funcionariosSelected[0]}
                   </br> ${array.employee[i].funcionariosSelected[1]}`
            } else if (array.employee[i].funcionariosSelected.length == 3) {
                funcionariosSelected += `${array.employee[i].funcionariosSelected[0]}
                </br> ${array.employee[i].funcionariosSelected[1]}
                </br> ${array.employee[i].funcionariosSelected[2]}`
            } else if (array.employee[i].funcionariosSelected.length == 4) {
                funcionariosSelected += `${array.employee[i].funcionariosSelected[0]}
                </br> ${array.employee[i].funcionariosSelected[1]}
                </br> ${array.employee[i].funcionariosSelected[2]}
                </br> ${array.employee[i].funcionariosSelected[3]}`
            } 
            else if (array.employee[i].funcionariosSelected.length == 5) {
                funcionariosSelected += `${array.employee[i].funcionariosSelected[0]}
                </br> ${array.employee[i].funcionariosSelected[1]}
                </br> ${array.employee[i].funcionariosSelected[2]}
                </br> ${array.employee[i].funcionariosSelected[3]}
                </br> ${array.employee[i].funcionariosSelected[4]}`
            } 
            else {
                funcionariosSelected += array.employee[i].funcionariosSelected
            }
            conteudoDinamico += `<tr style="margin: 15px; border: 1px solid black;">
                     <td ${styleTdName}>${array.employee[i].name}</td>
                     <td ${styleTdfuncionarios}>${funcionariosSelected}</td>
                     </tr>`
      //  } 
       // else {folga += `<li style="margin-right: 25px;"><span style="font-size: 15px;"> ${getFolga()}</span> </li>`//`<li style="margin-right: 25px;"><span style="font-size: 15px;"> ${array.employee[i].name}</span> </li>`}
    }
    let modelo = `<div style="width: 350px; border: 1px solid black; border-spacing: 0; padding: 0; margin: 0; word-break: break-word;">
        <table style="border-spacing: 0;">
            <thead>
                <tr>
                    <th style="border-right: 1px solid black ;font-size: 15px; max-width: 200px;">NOME</th>
                    <th style=" font-size: 15px; max-width: 200px;>ATIVIDADE <span style="font-size: 15px; font-weight: bold;">(${getDay})</span></th>
                </tr>
            </thead>
            <tbody id="tableBody">${conteudoDinamico}</tbody>
            
        </table>
        <div style="border-top: 1px solid black; padding-left: 5px; max-height: 5cm !important;">
        <h4>Folga</h4>
        <ul style="display: flex; flex-direction: row; flex-wrap: wrap;">
           ${getFolga()}
        </ul>
        </div>
    </div>`
    function getFolga(){
        let folga = ""
        for(let i = 0; i < pessoasFolgando.length; i++){
            folga += `<li style="margin-right: 25px;"><span style="font-size: 15px;"> ${pessoasFolgando[i]}</span> </li>`
        }
        return folga
    }

    let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
    let date = new Date()
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    mywindow.document.write(`<html><head><title>Atividades - ${getDay} - Criado em ${day}/${month}/${year}/</title>`);
    mywindow.document.write(`</head><body style="width: 100%; height: auto; display:flex; flex-basis: auto; flex-direction:column; 
                                top: 0; align-items: start; justify-content: top;  text-transform: uppercase; 
                                margin: 0; padding: 0; margin-left: 5px; margin-top: 5px;">`);
    mywindow.document.write(`<div style="width: 21cm; display: flex; flex-directions: row; align-items: start; justify-content: start; margin-left: 1px; margin-top: 1px;">`);
    mywindow.document.write(modelo);
    mywindow.document.write('</div>')
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10
    if (print) {
        mywindow.print();
        mywindow.close();
    }
}
function saveDay() {
    let array = { employee: [] }
    let horariosfuncionarios = document.querySelectorAll('.listaFuncionarios > li')

    let selectDay = $('#day > option:selected')[0].innerText
    for (let i = 0; i < horariosfuncionarios.length; i++) {
        let funcionariosSelected = []
    
       // if (!$(horariosfuncionarios[i]).find('input')[0].checked) {
            if ($(horariosfuncionarios[i]).find('option:selected')[0].innerText !== 'Selecionar') {
                if (funcionariosSelected.length > 0) {
                    funcionariosSelected.push($(horariosfuncionarios[i]).find('option:selected')[0].innerText)
                } else {
                    funcionariosSelected.push($(horariosfuncionarios[i]).find('option:selected')[0].innerText)
                }
            }
            if ($(horariosfuncionarios[i]).find('option:selected')[1].innerText !== 'Selecionar') {
                if (funcionariosSelected.length > 0) {
                    funcionariosSelected.push($(horariosfuncionarios[i]).find('option:selected')[1].innerText)
                } else {
                    funcionariosSelected.push($(horariosfuncionarios[i]).find('option:selected')[1].innerText)
                }
            }
            if ($(horariosfuncionarios[i]).find('option:selected')[2].innerText !== 'Selecionar') {
                if (funcionariosSelected.length > 0) {
                    funcionariosSelected.push($(horariosfuncionarios[i]).find('option:selected')[2].innerText)
                } else {
                    funcionariosSelected.push($(horariosfuncionarios[i]).find('option:selected')[2].innerText)
                }
            }
            if ($(horariosfuncionarios[i]).find('option:selected')[3].innerText !== 'Selecionar') {
                if (funcionariosSelected.length > 0) {
                    funcionariosSelected.push($(horariosfuncionarios[i]).find('option:selected')[3].innerText)
                } else {
                    funcionariosSelected.push($(horariosfuncionarios[i]).find('option:selected')[3].innerText)
                }
            }
            if ($(horariosfuncionarios[i]).find('option:selected')[4].innerText !== 'Selecionar') {
                if (funcionariosSelected.length > 0) {
                    funcionariosSelected.push($(horariosfuncionarios[i]).find('option:selected')[4].innerText)
                } else {
                    funcionariosSelected.push($(horariosfuncionarios[i]).find('option:selected')[4].innerText)
                }
            }
       // }
            /*
        if (funcionariosSelected.length === 0 && !$(horariosfuncionarios[i]).find('input')[0].checked) {
            return alert(`Falta selecionar a atividade de ${$(horariosfuncionarios[i]).find('span')[0].innerHTML}`)
        }*/


        array.employee[i] = {
            name: $(horariosfuncionarios[i]).find('span')[0].innerHTML,
            funcionariosSelected,
           // folga: $(horariosfuncionarios[i]).find('input')[0].checked
        }

        localStorage.setItem(selectDay, JSON.stringify(array))
        
    }
   
    ListExist()
}

function copyTextToSend(){
    let selectDay = $('#day > option:selected')[0].innerText
    let { employee } = JSON.parse(localStorage.getItem(`${selectDay}`))
    
    let textToCopy = `${selectDay}\n`
    for(let i = 0; i < employee.length; i++){
        if(employee[i].funcionariosSelected.length > 0){
            textToCopy += `\n${employee[i].name}\n`
            for(let n = 0; n < employee[i].funcionariosSelected.length; n++){
                textToCopy += ` - ${employee[i].funcionariosSelected[n]}\n` 
            }
        }
    }
    navigator.clipboard.writeText(textToCopy);
    alert(`Escala de ${selectDay} copiada!`);
}
$('#clear').click(() => { ListExist({ clear: true }) })
$('#saveDay').click(saveDay)
$('.visualizarPdf').click((e) => {
    let getDay = $(e.target.parentElement.parentElement).find('span')[0].innerText
    createPDF({ print: false, getDay })
}
)
$('.imprimirPdf').click((e) => {
    let getDay = $(e.target.parentElement.parentElement).find('span')[0].innerText
    createPDF({ print: true, getDay })
})
function ListExist(clear) {
    let daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

    for (let i = 0; i < daysOfWeek.length; i++) {
        if (clear) {
            localStorage.removeItem(daysOfWeek[i])
        }
        if (localStorage.getItem(daysOfWeek[i])) {
            document.getElementById(`day${i + 1}`).style = 'display: flex'
        } else {
            document.getElementById(`day${i + 1}`).style = 'display: none'
        }
    }

}

function folgaCheckBox(index) {
    let employeeListView = document.querySelectorAll('.listarAtividades > li')
   
    let checked = $(employeeListView[index]).find('input')[0].checked
    let folgando = []
    for (let i = 0; i < employeeListView.length; i++) {
        if (employeeListView[i].children[1].children[0].checked) {
            folgando.push(employeeListView[i].children[0].innerHTML)
        }
    }
    pessoasFolgando = folgando
 
    getAllhorarios()
    if (checked) {
        $(employeeListView[index]).find('select').attr('disabled', '')
    } else {
        $(employeeListView[index]).find('select').removeAttr('disabled', '')

    }
    /*
    let employeeListView = document.querySelectorAll('.listaFuncionarios > li')
    let checked = $(employeeListView[index]).find('input')[0].checked
    if (checked) {
        $(employeeListView[index]).find('select').attr('disabled', '')
    } else {
        $(employeeListView[index]).find('select').removeAttr('disabled', '')
 
    }*/
}

function deleteEmployee(index) {
    let newArray = [];
    if (horarios.length == 1) {
        horarios = []
        localStorage.removeItem('horario')
        getAllhorarios();
        return

    }
    for (let i = 0; i < horarios.length; i++) {
        if (i !== index) {
            newArray.push(horarios[i])
        }
    }

    localStorage.setItem("horario", JSON.stringify(newArray))
    getAllhorarios()
}
function deleteFuncionario(index) {
    let newArray = []
    if (funcionarios.length == 1) {
        funcionarios = []
        localStorage.removeItem('funcionarios')
        getfuncionarios();
        return
    }
    for (let i = 0; i < funcionarios.length; i++) {
        if (i !== index) {
            newArray.push(funcionarios[i])
        }
    }
    localStorage.setItem("funcionarios", JSON.stringify(newArray))
    getfuncionarios();
    getAllhorarios();

}

document.querySelector("#horario").addEventListener("keyup", event => {
    if (event.key !== "Enter") return;
    createNewEmployee()
    event.preventDefault();
});
document.querySelector("#activity").addEventListener("keyup", event => {
    if (event.key !== "Enter") return;
    createNewActivity()
    event.preventDefault();
});

getfuncionarios()
getAllhorarios()
ListExist()
createNewEmployeeButton.addEventListener('click', createNewEmployee)
createNewActivityButton.addEventListener('click', createNewActivity)
