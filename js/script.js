window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // TABS
    let info = document.querySelector('.info-header'),
        tabs = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    const hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    const showTabContent = (b) => {
        if(tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;

        if(target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tabs.length; i++) {
                if(target == tabs[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });


    //MODAL

    let btnTab = document.querySelectorAll('.description-btn'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        more = document.querySelector('.more');

    btnTab.forEach (function(item) {
        item.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';

        });
    });

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    });


    //TIMER

    let deadline = '03-11-2024';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000*60*60)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeIterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num) {
                if(num <= 9) {
                    return '0' + num;
                } else return num;
            }

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timeIterval);
                
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);

    //FORM

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

    
    

});
