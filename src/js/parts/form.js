function form() {
    let status = {
        loaded :'Загрузка',
        end: 'Заявка отправлена, скоро вам напишут',
        error: 'Произошла ошибка'
    }

    let form = document.querySelector('.main-form'),
        input = document.querySelector('.popup-form__input'),
        statusMessage = document.createElement('div');
        console.log(input);

    statusMessage.classList.add('status'); 
    form.addEventListener('submit', function(event) {
        form.appendChild(statusMessage);
        event.preventDefault();

        function newPromise() {
            return new Promise(function(resolve, reject) {
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                let formData = new FormData(form);
                let obj = {};

                formData.forEach(function(key, value) {
                    obj[key] = value;
                });

                let json = JSON.stringify(obj);

                request.send(json);

                if(request.readyState < 4) {
                    resolve()
                } else if(request.readyState == 4 && request.status === 4) {
                    resolve()
                } else {
                    reject()
                }  
            });    
        }
        newPromise()
            .then(() => statusMessage.textContent = status.loaded)
            .then(() => statusMessage.textContent = status.end)
            .catch(() => statusMessage.textContent = status.error)
    });
}
module.exports = form;