var numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operation'),
    clearBtns = document.querySelectorAll('.clear-btn'),
    decimalBtn = document.getElementById('decimal'),
    display = document.getElementById('display'),
    operationsList = document.getElementById('operationsList'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '';

for (var i=0; i<numbers.length; i++) {
    var number = numbers[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.textContent);
    });
};

for (var i=0; i<operations.length; i++) {
    var operationBtn = operations[i];
    operationBtn.addEventListener('click', function(e) {
       operation(e.target.textContent); 
    });
};

for (var i=0; i<clearBtns.length; i++) {
    var clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function(e) {
        clear(e.target.id);
    });
};

decimalBtn.addEventListener('click', decimal);

function numberPress(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        };
    };
    timer(start);
};

function operation(op) {
    var localOperationMemory = display.value;
    
    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += parseFloat(localOperationMemory);
            MemoryCurrentNumber=parseFloat(MemoryCurrentNumber.toFixed(6));
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
            MemoryCurrentNumber=parseFloat(MemoryCurrentNumber.toFixed(6));
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
            MemoryCurrentNumber=parseFloat(MemoryCurrentNumber.toFixed(6));
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
            MemoryCurrentNumber=parseFloat(MemoryCurrentNumber.toFixed(6));
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
            MemoryCurrentNumber=parseFloat(MemoryCurrentNumber.toFixed(6));
        };
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = op;
    };
    timer(start);
};

function decimal() {
    var localDecimalMemory = display.value;
    
    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1 ) {
            localDecimalMemory += '.';
        };
    };
    display.value = localDecimalMemory;
    timer(start);
};

function clear(id) {
    if (id === 'back') {
        display.value = display.value.substring(0 , display.value.length - 1);
        if(display.value.length == 0){
            display.value = 0;
        }
    } else if (id === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    };
    timer(start);
};


var intervalId
var start = 50;
function timer(start){
    window.clearInterval(intervalId);
    var time = Math.round(start*10);
    var progressElement= document.getElementById('progressBar');
    intervalId = setInterval(function(){
        if(start<0){
            clearInterval(intervalId);
            display.value = '0';
            MemoryNewNumber = true;
            MemoryCurrentNumber = 0;
            MemoryPendingOperation = '';
            alert('Сброс состояния')
        }else{
            progressElement.value= start;
        }
        start--;
    },time)
}