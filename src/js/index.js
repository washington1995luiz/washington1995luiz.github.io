let employees = []
let activities = []

let createNewEmployeeButton = document.getElementById("save")
let activitiesListView = document.querySelector('.listarAtividades')
let employeeListViewBody = document.querySelector(".listaFuncionarios")
let createNewActivityButton = document.getElementById('salvarAtividade')

if (localStorage.getItem('activities') == undefined) {
    activities.push('Selecionar')
    localStorage.setItem('activities', JSON.stringify(activities))
}


function popEmployees() {
    if (localStorage.getItem('employees')) {
        employees = []

        let arrayList = JSON.parse(localStorage.getItem('employees').toString())
        let ajusteArray = String(arrayList).split(',')
        for (let i = 0; i < ajusteArray.length; i++) {
            employees.push(ajusteArray[i])
        }
    }

}
function popActivities() {
    if (localStorage.getItem('activities')) {
        activities = []
        let arrayList = JSON.parse(localStorage.getItem('activities').toString())
        let ajusteArray = String(arrayList).split(',')
        for (let i = 0; i < ajusteArray.length; i++) {
            activities.push(ajusteArray[i])
        }
    }
}


function createNewEmployee() {
    let employeeName = document.getElementsByName('name')[0].value
    if (employeeName === '' || employeeName === undefined || employeeName === ' ') return alert('Digite o nome do funcionário para salvar!!')
    popEmployees()
    popActivities()
    employees.push(employeeName)
    localStorage.setItem("employees", JSON.stringify(employees))
    let i = employees.length - 1
    employeeListViewBody.innerHTML += `<li><span>${employees[i]} </span>
        <div style="display: flex;">
        <select class="selecionar" name="selecionar" id="selecionar"> 
        ${activities.map((element, index) => { return '<option value=' + `${index}` + '>' + element + '</option>' })}
        </select>
        <select style="margin-left: 5px;" class="selecionar1" name="selecionar1" id="selecionar1"> 
            ${activities.map((element, index) => { return '<option value=' + `${index}` + '>' + element + '</option>' })}
        </select>
        <select style="margin-left: 5px;" class="selecionar2" name="selecionar2" id="selecionar2"> 
            ${activities.map((element, index) => { return '<option value=' + `${index}` + '>' + element + '</option>' })}
        </select>
        <div class="folgaCheckbox">
        <input index="${i}" onclick="folgaCheckBox(${i})" class="folga" type="checkbox" name="folga" id="folga">
            <label for="folga">Folga</label>
            </div>
        <button onclick="deleteEmployee(${i})" index="${i}">Excluir</button>
        </div>
        </li> `
    document.getElementsByName('name')[0].value = ''
}

function getAllEmployees() {
    popEmployees()
    popActivities()
    employeeListViewBody.innerHTML = ''
    for (let i = 0; i < employees.length; i++) {

        employeeListViewBody.innerHTML += `<li><span>${employees[i]} </span>
        <div style="display: flex;">
        <select class="selecionar" name="selecionar" id="selecionar"> 
        ${activities.map((element, index) => { return '<option value=' + `${index}` + '>' + element + '</option>' })}
        </select>
        <select style="margin-left: 5px;" class="selecionar1" name="selecionar1" id="selecionar1"> 
        ${activities.map((element, index) => { return '<option value=' + `${index}` + '>' + element + '</option>' })}
        </select>
        <select style="margin-left: 5px;" class="selecionar2" name="selecionar2" id="selecionar2"> 
        ${activities.map((element, index) => { return '<option value=' + `${index}` + '>' + element + '</option>' })}
        </select>
        <div class="folgaCheckbox">
        <input index="${i}" onclick="folgaCheckBox(${i})" class="folga" type="checkbox" name="folga" id="folga">
        <label for="folga">Folga</label>
        </div>
        <button onclick="deleteEmployee(${i})" index="${i}">Excluir</button>
        </div>
        </li> `
    }
}

function createNewActivity() {
    let activityText = document.getElementsByName('activity')[0].value
    if (activityText === '' || activityText === undefined || activityText === ' ') return alert('Digite a atividade para salvar!!')
    popActivities()
    activities.push(activityText)
    localStorage.setItem("activities", JSON.stringify(activities))
    const index = activities.length - 1
    activitiesListView.innerHTML += `<li><span>${activities[index]}</span>  <button onclick="deleteActivity(${index})" index="${index}">Excluir</button></li> `
    document.getElementsByName('activity')[0].value = ''

    getAllEmployees()
}


function getActivities() {
    activitiesListView.innerHTML = ''
    popActivities()
    activitiesListView.innerHTML = ''
    for (let i = 0; i < activities.length; i++) {
        if (!activities[i].includes('Selecionar')) {
            activitiesListView.innerHTML += `<li><span>${activities[i]}</span>  <button  onclick="deleteActivity(${i})" index="${i}">Excluir</button></li> `
        }
    }
}

/** Create a PDF */
function createPDF({ print, getDay }) {
    let array = JSON.parse(localStorage.getItem(getDay))
    let styleTdName = `style="border-right: 1px solid black; border-top: 1px solid black;
        font-size: 15px; max-height: 75px; padding-left: 5px; width: 150px;
        word-wrap: break-word;"`
    let styleTdActivities = `style="border-top: 1px solid black;
        font-size: 15px; max-height: 75px; padding-left: 5px;width: 200px;
        word-wrap: break-word;"`
    let conteudoDinamico = ''
    let folga = ''
    for (let i = 0; i < array.employee.length; i++) {
        if (!array.employee[i].folga) {
            let activitiesSelected = ''
            if (array.employee[i].activitiesSelected.length == 2) {
                activitiesSelected += `${array.employee[i].activitiesSelected[0]}
                   </br> ${array.employee[i].activitiesSelected[1]}`
            } else if (array.employee[i].activitiesSelected.length == 3) {
                activitiesSelected += `${array.employee[i].activitiesSelected[0]}
                </br> ${array.employee[i].activitiesSelected[1]}
                </br> ${array.employee[i].activitiesSelected[2]}`
            } else {
                activitiesSelected += array.employee[i].activitiesSelected
            }
            conteudoDinamico += `<tr style="margin: 15px; border: 1px solid black;">
                     <td ${styleTdName}>${array.employee[i].name}</td>
                     <td ${styleTdActivities}>${activitiesSelected}</td>
                     </tr>`
        } else {
            folga += `<li style="margin-right: 25px;"><span style="font-size: 15px;"> ${array.employee[i].name}</span> </li>`
        }
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
           ${folga}
        </ul>
        </div>
    </div>`

    let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
    let date = new Date()
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    mywindow.document.write(`<html><head><title>Atividades - ${getDay} - Criado em ${day}/${month}/${year}/</title>`);
    mywindow.document.write('</head><body style="width: 100%; height: auto; display:flex; flex-basis: auto; flex-direction:column; top: 0; align-items: start; justify-content: top;  text-transform: uppercase; margin: 0; padding: 0;">');
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
    let employeesActivities = document.querySelectorAll('.listaFuncionarios > li')

    let selectDay = $('#day > option:selected')[0].innerText
    for (let i = 0; i < employeesActivities.length; i++) {
        let activitiesSelected = []
        console.log(activitiesSelected.length)
        if (!$(employeesActivities[i]).find('input')[0].checked) {
            if ($(employeesActivities[i]).find('option:selected')[0].innerText !== 'Selecionar') {
                if (activitiesSelected.length > 0) {
                    activitiesSelected.push($(employeesActivities[i]).find('option:selected')[0].innerText)
                } else {
                    activitiesSelected.push($(employeesActivities[i]).find('option:selected')[0].innerText)
                }
            }
            if ($(employeesActivities[i]).find('option:selected')[1].innerText !== 'Selecionar') {
                if (activitiesSelected.length > 0) {
                    activitiesSelected.push($(employeesActivities[i]).find('option:selected')[1].innerText)
                } else {
                    activitiesSelected.push($(employeesActivities[i]).find('option:selected')[1].innerText)
                }
            }
            if ($(employeesActivities[i]).find('option:selected')[2].innerText !== 'Selecionar') {
                if (activitiesSelected.length > 0) {
                    activitiesSelected.push($(employeesActivities[i]).find('option:selected')[2].innerText)
                } else {
                    activitiesSelected.push($(employeesActivities[i]).find('option:selected')[2].innerText)
                }
            }
        }

        if (activitiesSelected.length === 0 && !$(employeesActivities[i]).find('input')[0].checked) {
            return alert(`Falta selecionar a atividade de ${$(employeesActivities[i]).find('span')[0].innerHTML}`)
        }


        array.employee[i] = {
            name: $(employeesActivities[i]).find('span')[0].innerHTML,
            activitiesSelected,
            folga: $(employeesActivities[i]).find('input')[0].checked
        }

        localStorage.setItem(selectDay, JSON.stringify(array))


    }
    ListExist()
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
    let employeeListView = document.querySelectorAll('.listaFuncionarios > li')
    let checked = $(employeeListView[index]).find('input')[0].checked
    if (checked) {
        $(employeeListView[index]).find('select').attr('disabled', '')
    } else {
        $(employeeListView[index]).find('select').removeAttr('disabled', '')

    }
}

function deleteEmployee(index) {
    employees.splice(index, 1)

    if (employees[0] === undefined) {
        employees = []
        localStorage.removeItem('employees')
    } else {
        localStorage.setItem("employees", JSON.stringify(employees))
    }

    document.querySelectorAll('.listaFuncionarios > li')[index].remove()
}
function deleteActivity(index) {


    activities.splice(index, 1)
    if (activities[0] === undefined) {
        activities = []
        localStorage.removeItem('activities')
    } else {
        localStorage.setItem("activities", JSON.stringify(activities))
    }
    document.querySelectorAll('.listarAtividades > li')[index - 1].remove()
}

document.querySelector("#name").addEventListener("keyup", event => {
    if (event.key !== "Enter") return;
    createNewEmployee()
    event.preventDefault();
});
document.querySelector("#activity").addEventListener("keyup", event => {
    if (event.key !== "Enter") return;
    createNewActivity()
    event.preventDefault();
});

getActivities()
getAllEmployees()
ListExist()
createNewEmployeeButton.addEventListener('click', createNewEmployee)
createNewActivityButton.addEventListener('click', createNewActivity)