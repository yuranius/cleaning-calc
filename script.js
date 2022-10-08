// импорт констант для расчета стоимости
import  objVar  from "/const.js"

// Изменение класса active при нажатии на кнопки блока типа уборки калькулятора
const buttonCalc = document.querySelectorAll('.calculator__button_type-clining');

buttonCalc.forEach((elem, item, active) => {
	elem.addEventListener('click', (event) => {
		active.forEach((act) => {
			act.classList.toggle('active', act === elem);
            const childList = act.querySelectorAll('*');
            if (act === elem) {
                setValueTypeCliningSumm(act.attributes.id.value)
                totalSummAndOutputDisplay()
                childList.forEach ( el => {
                    el.classList.add('active')
                })
            } else {
                childList.forEach ( el => {
                    el.classList.remove('active')
                })
            }
		});
	});
});

//  Открытие попап описания
const buttonQuestion = document.querySelectorAll('.calculator__button-question')
buttonQuestion.forEach( button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation();
        buttonQuestion.forEach(button => {
            button.querySelector('.calculator__button-hint').classList.remove('active')
        })
        button.querySelector('.calculator__button-hint').classList.toggle('active')
    })
})
//  Закрытие попап описания при нажатии на внешнюю область
document.addEventListener('click', (event) => {
    buttonQuestion.forEach(item => {
        if (!event.composedPath().includes(item)) {
            item.querySelector('.calculator__button-hint').classList.remove('active')
        }
    })
})

//Изменение класса при нажатии на кнопки загрязнения калькулятора
const buttonPollutionLevel = document.querySelectorAll('.pollution__level');
buttonPollutionLevel.forEach((elem, item, active) => {
	elem.addEventListener('click', (event) => {
		active.forEach((act) => {
			act.classList.toggle('active', act === elem);
            if (act === elem) {
                setValuePollutionLevelSumm(act.attributes.id.value)
                totalSummAndOutputDisplay()
            } 
		});
	});
});

const buttonListOfServices = document.querySelectorAll('.calculator__button_list-of-services');

buttonListOfServices.forEach((elem, item, active) => {
	elem.addEventListener('click', (event) => {
		active.forEach((act) => {
			act.classList.toggle('active', act === elem);
            const childList = act.querySelectorAll('*');
            if (act === elem) {
                setValueListServicesSumm(act.attributes.id.value)
                totalSummAndOutputDisplay()
                childList.forEach ( el => {
                    el.classList.add('active')
                })
            } else {
                childList.forEach ( el => {
                    el.classList.remove('active')
                })
            }
		});
	});
});


const totalSummElement = document.querySelector('.total-sum')

let typeCliningSumm = 0

let pollutionLevelSumm = 0

let squareRangeSumm = 0

let listServicesSumm = 0


// Функция установки суммы выбранной услуги
function setValueTypeCliningSumm (element) {
    if ( element === 'button-1'){
        typeCliningSumm = objVar.firstTypeClining
     } else if ( element === 'button-2') {
        typeCliningSumm = objVar.secondTypeClining
     } else if ( element === 'button-3') {
        typeCliningSumm = objVar.thirdTypeClining
     } else if ( element === 'button-4') {
        typeCliningSumm = objVar.fourthTypeClining
     }
}

// Функция установки суммы выбранной услуги
function setValuePollutionLevelSumm (element) {
    if ( element === 'level-1'){
        pollutionLevelSumm = objVar.firstPollutionLevel
     } else if ( element === 'level-2') {
        pollutionLevelSumm = objVar.secondPollutionLevel
     } else if ( element === 'level-3') {
        pollutionLevelSumm = objVar.thirdPollutionLevel
     } else if ( element === 'level-4') {
        pollutionLevelSumm = objVar.fourthPollutionLevel
     } else if ( element === 'level-5') {
        pollutionLevelSumm = objVar.fifthPollutionLevel
     }
}

// Функция расчета суммы в зависимости от выбранной площади
function setValueSquareRangeSumm (value) {
    if ( value <= 50 ) {
        squareRangeSumm = objVar.firstSquareRange
    }   else if ( value > 50 && value <= 100) {
        squareRangeSumm = objVar.secondSquareRange
    }   else if ( value > 100 && value <= 150) {
        squareRangeSumm = objVar.thirdSquareRange
    }   else if ( value > 150 && value <= 200) {
        squareRangeSumm = objVar.fourthSquareRange
    }    else if ( value > 200 && value <= 250) {
        squareRangeSumm = objVar.fifthSquareRange
    }
}

// Функция расчета суммы в зависимости от выбранной услуги
function setValueListServicesSumm (element) {
    if ( element === 'services-1'){
        listServicesSumm = objVar.firstListServices
     } else if ( element === 'services-2') {
        listServicesSumm = objVar.secondListServices
     } else if ( element === 'services-3') {
        listServicesSumm = objVar.thirdListServices
     } else if ( element === 'services-4') {
        listServicesSumm = objVar.fourthListServices
     } else if ( element === 'services-5') {
        listServicesSumm = objVar.fifthListServices
     } else if ( element === 'services-6') {
        listServicesSumm = objVar.sixthListServices
     }
}

// Функция сложения результатов и вывода на экран
const priceFormatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
});
function totalSummAndOutputDisplay () {
    checkSelectedFields()
    totalSummElement.innerText = priceFormatter.format(typeCliningSumm + pollutionLevelSumm + squareRangeSumm + listServicesSumm)
}

function checkSelectedFields () {
    if (!typeCliningSumm && !pollutionLevelSumm && !squareRangeSumm  && !listServicesSumm){
        document.querySelector('.footer__text_error').classList.remove('active')
        document.querySelector('#next-three').setAttribute('disabled', true)
        document.querySelector('.calculator__general-button_footer button').setAttribute('disabled', true)
    } else if (!typeCliningSumm || !pollutionLevelSumm  || !squareRangeSumm  || !listServicesSumm) {
        document.querySelector('.footer__text_error').classList.add('active')
        document.querySelector('#next-three').setAttribute('disabled', true)
        document.querySelector('.calculator__general-button_footer button').setAttribute('disabled', true)
    } else {
        document.querySelector('.footer__text_error').classList.remove('active')
        document.querySelector('#next-three').removeAttribute('disabled')
        document.querySelector('.calculator__general-button_footer button').removeAttribute('disabled')
    }
}


totalSummAndOutputDisplay ()

const squareInput = document.querySelector("#input");
const squareRange = document.querySelector("#range");

// Связка Range с Input
squareRange.addEventListener("input", function () {
	squareInput.value = squareRange.value;
    setValueSquareRangeSumm(Number(squareInput.value));
    totalSummAndOutputDisplay();
});

// Связка Input c Range
squareInput.addEventListener("input", function () {
	if (squareInput.value > 250) {
		squareInput.value = 250;
	} else if (squareInput.value < 0) {
		squareInput.value = 0;
	}
	squareRange.value = squareInput.value;
    setValueSquareRangeSumm(Number(squareInput.value));
    totalSummAndOutputDisplay();
});


// Листинг окон калькулятора в мобильной версии

const buttons =  document.querySelectorAll('.calculator__button-previous-next button')
const type = document.querySelector('.calculator__type-clining')
const area = document.querySelector('.calculator__area-and-pollution')
const list = document.querySelector('.calculator__list-of-services')

buttons.forEach ( button => {
    button.addEventListener('click', function () {
        if (button.attributes.id.value === 'next-one' || button.attributes.id.value === 'previous-three') {
            toggleClass(area, type, list)
        } else if (button.attributes.id.value === 'previous-two') {
            toggleClass(type, area, list)
        } else if (button.attributes.id.value === 'next-two') {
            toggleClass(list, area, type)
        } 
    })
})

function toggleClass(add, remove1, remove2) {
    add.classList.add('active')
    remove1.classList.remove('active')
    remove2.classList.remove('active')
}
