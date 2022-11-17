let form = document.querySelector('#Reservation');
let expireMM = document.getElementById('expireMM');
let expireYY = document.getElementById('expireYY');
let name = document.getElementById('FIO');
let email = document.getElementById('Email');
let ps1 = document.getElementById('ps');
let ps2 = document.getElementById('ps2');
let phone = document.getElementById('phone');
let card = document.getElementById('card');
let cvv = document.getElementById('cvv');
let tokend = localStorage.getItem('token');

function openForm() {
        fetch('http://185.246.66.171:3100/CheckValidToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${tokend}`
        }
    }).then((res)=>{
        if(res.status === 200){
            alert('Приятного времяпровождения!');
        }
        else{
            form.style.display = "block";
        }
    })
}

function closeForm() {
    form.style.display = "none";
}

function submitRegister(){
    //Все так же приводим номер к единому формату
    let phonechange = phone.value.replaceAll('+', '');
    phonechange = phonechange.replaceAll('(', '');
    phonechange = phonechange.replaceAll(')', '');
    phonechange = phonechange.replaceAll(' ', '');
    phonechange = phonechange.replaceAll('-', '');
//Создаем обьект ЮЗЕР куда помещаем все данные
    const User = {
        name: name.value,
        dateexp: expireMM.value + '/' + expireYY.value,
        phon: phonechange,
        pass: ps1.value,
        email: email.value,
        cardnum: card.value,
        cvv: cvv.value
    }
    //Если пароли совпадают
            if(ps1.value === ps2.value){
                //Отправляем фетч запрос к серверу
                fetch('http://185.246.66.171:3100/Register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    //В тело помещаем обьект
                    body: JSON.stringify(User)
                }).then((res)=>{
                    //Если статус 200, то возвращаем в следующий этап Json с токеном
                    if(res.status === 200){
                        return res.json();
                    }
                    //Иначе принтим алерт что юзер зареган
                    else if(res.status === 403){
                        alert('Вы уже зарегестрированы!');

                    }
                    else{
                        console.log(res);
                    }

                }).then((json)=>{
                    if(json){
                        //записываем токен в локальное хранилище.
                        localStorage.setItem('token', json);
                        window.open('index.html', '_self');
                    }
                })
            }
            else{
                alert('Пароли не совпадают!');
            }
}
