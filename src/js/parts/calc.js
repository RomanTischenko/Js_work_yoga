function calc() {
    let persons = document.getElementsByClassName('counter-block-input')[0],
        days = document.getElementsByClassName('counter-block-input')[1],
        place = document.getElementById('select'),
        total = document.getElementById('total'),
        personsValue = 0,
        daysValue = 0,
        totalValue = 0;

    total.textContent = 0;

    persons.addEventListener('change', function() {
        personsValue = this.value;
        totalValue = (personsValue + daysValue) * 4000;

        if(personsValue == '') {
            total.textContent = 0;
        } else if (daysValue != '' && personsValue == '') {
            total.textContent = 0;
        } else if (daysValue != '' && personsValue != '') {
            total.textContent = totalValue;
        }
    });

    days.addEventListener('change', function() {
        daysValue = this.value;
        totalValue = (personsValue + daysValue) * 4000;

        if(daysValue == '') {
            total.textContent = 0;
        } else if (personsValue != '' && daysValue == '') {
            total.textContent = 0;
        } else if (daysValue != '' && personsValue != '') {
            total.textContent = totalValue;
        }
    });

    place.addEventListener('change', function() {
        if (personsValue == '' || daysValue == '') {
            total.textContent = 0;
        } else {
            let a = totalValue;
            total.textContent = a * this.options[this.selectedIndex].value;
        }
    });
}

module.exports = calc;