let phone = document.getElementById('phone');
let password = document.getElementById('password');

function logInSys(){
    //Приводим номер к единому формату восприятия информации
    let phonechange = phone.value.replaceAll('+', '');
    phonechange = phonechange.replaceAll('(', '');
    phonechange = phonechange.replaceAll(')', '');
    phonechange = phonechange.replaceAll(' ', '');
    phonechange = phonechange.replaceAll('-', '');
    //Делаем обьект с двумя полями - номером и телефоном
    const User = {
        phone: phonechange,
        pass: password.value
    }
    //Отправляем фетч запрос на сервер, к адресу Аутенфикации
    fetch('http://185.246.66.171:3100/Authenfication', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //В тело передаем строку JSON с обьектом выше
        body: JSON.stringify(User)
    }).then((res)=>{
        //если сервер возвращает результат 200 - пользователь авторизован, возвращаем токен который в дальнейшем записываем в хранилище и переходим на главную
        if(res.status === 200){
            return res.json();
        }
        //Если сервер возвращает 403 - юзер еще не зарегестрирован
        else if(res.status === 403){
            alert('Вы еще не зарегестрированы!');
            window.open('registration.html', '_self');
        }
        //Обработчик для иных ошибок
        else{
            alert('Упс! Попробуйте позже.');
        }
    }).then((json)=>{
        if(json){
            localStorage.setItem('token', json)
            window.open('index.html', '_self');
        }
    })
}
