let income = [
    new Income ('Salary', 2100.00),
    new Income ('sale car', 1500.00)
];
let expenditure = [
    new Egress ('Rent',520),
    new Egress ('Lowi',50)
];

let appLoad = () =>{
    headerLoad();
    incomeLoad();
    egressLoad();
}

let incomeTotal = () =>{
    let incomeTotal = 0;
    for (let incomeLet of income) {
        incomeTotal += incomeLet.value;
    }
    return incomeTotal;
}

let egressTotal = () =>{
    let egressTotal = 0;
    for (let egress of expenditure) {
        egressTotal += egress.value;
    }
    return egressTotal;
}

let headerLoad = () =>{
    let budget = incomeTotal() - egressTotal();
    let percentEgress = egressTotal()/incomeTotal();

    document.getElementById('budget').innerHTML = currencyFormat( budget);
    document.getElementById('percent').innerHTML = percentFormat(percentEgress);
    document.getElementById('income').innerHTML = currencyFormat(incomeTotal());
    document.getElementById('egress').innerHTML = currencyFormat(egressTotal());
    
}
let currencyFormat = (value) =>{
    return value.toLocaleString('es-ES', {style:'currency', currency: 'EUR', minimumFractionDigits:2});
}

let percentFormat = (value) =>{
    return value.toLocaleString('es-ES', {style:'percent', currency: 'EUR', minimumFractionDigits:2});
}


let incomeLoad = () =>{
    let incomeHTML = '';
    for(let incomeLet of income){
        incomeHTML += incomeCreateHTML(incomeLet);
    }
    document.getElementById('list-income').innerHTML = incomeHTML;
}

let incomeCreateHTML = (income) =>{
    let incomeHTML = `<div class="element cleanStyles">
                        <div class="element-description">${income.description}</div>
                        <div class="right cleanStyles">
                            <div class="element-value">+ ${currencyFormat(income.value)}</div>
                            <div class="element-delete">
                                <button class="element-delete__btn">
                                    <ion-icon name="close-circle-outline" 
                                    onclick="incomeDelete(${income.id})"></ion-icon>
                                </button>
                            </div>
                        </div>
                    </div>`;
    return incomeHTML;
}
let incomeDelete = (id) =>{

    let deleteId = income.findIndex(incomeClick=> incomeClick.id === id);
    income.splice(deleteId, 1);
    headerLoad();
    incomeLoad();


}
let egressDelete=(id)=>{
    let deleteId = expenditure.findIndex(egressLet=>egressLet.id === id);
    expenditure.splice(deleteId, 1);
    headerLoad();
    egressLoad();
}

let egressLoad = () =>{
    let egressHTML = '';
    for(let egress of expenditure){
        egressHTML+= egressCreateHTML(egress);
    }
    document.getElementById('list-egress').innerHTML = egressHTML;
}

let egressCreateHTML = (egress) =>{
    let egressHTML = `<div class="element cleanStyles">
                        <div class="element-description">${egress.description}</div>
                        <div class="right cleanStyles">
                            <div class="element-value">- ${currencyFormat(egress.value)}</div>
                            <div class="element-percent">${percentFormat(egress.value/egressTotal())}</div>
                            <div class="element-delete">
                                <button class="element-delete__btn">
                                    <ion-icon name="close-circle-outline"
                                    onclick="egressDelete(${egress.id})"></ion-icon>
                                </button>
                            </div>
                        </div>
                    </div>`
    return egressHTML;
}

let addData = ()=>{
    let form = document.forms['form'];
    let type = form['type'];
    let description = form['description'];
    let value = form['value'];

    if(description.value !== '' && value.value !== ''){
        if(type.value === 'income'){
            income.push(new Income(description.value,+value.value))
            headerLoad();
            incomeLoad();
            document.getElementById('description').value = "";
            document.getElementById('value').value = "";
        } else if(type.value === 'egress'){
            expenditure.push(new Egress(description.value,+value.value))
            headerLoad();
            egressLoad();
            document.getElementById('description').value = "";
            document.getElementById('value').value = "";
        }
        
    }
}