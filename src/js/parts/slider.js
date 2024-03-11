function slider() {
    let indexSlider = 1,
        sliderItem = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');
    
    function showSlider(n) {
        if(n < 1) {
            indexSlider = sliderItem.length;
        }
        if(n > sliderItem.length) {
            indexSlider = 1;
        }

        sliderItem.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        sliderItem[indexSlider - 1].style.display = 'block';
        dots[indexSlider - 1].classList.add('dot-active');
    };
    showSlider(indexSlider);

    function plusSlider(n) {
        showSlider(indexSlider += 1)
    }
    function currentSlider(n) {
        showSlider(indexSlider = n);
    }

    next.addEventListener('click', function() {
        plusSlider(1);
    }); 
    prev.addEventListener('click', function() {
        plusSlider(-1);
    });

    dotsWrap.addEventListener('click', function(event) {
        let target = event.target;

        for (let i = 0; i < dots.length + 1; i++) {
            if(target == dots[i-1] && target.classList.contains('dot')) {
                currentSlider(i);
            }
        }
    });
}

module.exports = slider;