//Получаем токен из локального хранилища

let token = localStorage.getItem('token');

function validateToken(){
    //Если он есть
    if(token){
        //Отправляем фетч-запрос на сервер по адресу, с методом ПОСТ, в хедерсах указываем токен
        fetch('http://185.246.66.171:3100/CheckValidToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            //Если с сервера приходит статус 200 то принтим что пользователь уже авторизован, в иных случаях перекидываем на страницу авторизации
            if(res.status === 200){
                let isWant = confirm('Уупс! Вы уже авторизованы. Хотите выйти из аккаунта?');
                if(isWant === true){
                    localStorage.removeItem('token');
                    window.location.reload();
                }
            }
            else{
                window.open('auth.html', '_self');
            }
        })
    }
    else{
        window.open('auth.html', '_self');
    }
}
