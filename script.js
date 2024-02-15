const sheet = document.querySelector(".sheet");
const slider = document.getElementById("resSlider");
const resolutionText = document.querySelector(".Resolution");

renderCanvas(slider.value);

slider.oninput = function() {
    renderCanvas(this.value);
    resolutionText.textContent = `Resolution - ${this.value}x${this.value}`;
    toggleGrid.classList.remove("active");
}

function renderCanvas(resolution) {
    while (sheet.lastChild) {
        sheet.removeChild(sheet.lastChild);
    }
    const sheetSize = 500;
    const res = [];
    const eachCube = sheetSize/resolution;
    for(i = 0; i < resolution; i++) {
        res[i] = [];
        for(j = 0; j < resolution; j++) {
            const div = document.createElement('div');

            div.setAttribute('style', 
            `box-sizing: border-box; width: ${eachCube}px; height: ${eachCube}px; border: 1px solid black`);

            res[i][j] = div;
            sheet.appendChild(res[i][j]);
        }
    }
}

function getRandomColor() {
    const r = (Math.round(Math.random()*255));
    const g = (Math.round(Math.random()*255));
    const b = (Math.round(Math.random()*255));
    return `rgb(${r},${g},${b})`;
}

//drawing part
const divs = document.querySelectorAll(`.sheet div`);
let isMouseDown = false;
let currentColor = "red";
let lastDiv = null;

document.addEventListener('mousedown', function(e) {
    const target = e.target;
    if(target.matches('.sheet div')) {
        e.preventDefault();
        isMouseDown = true;
        if(isEraserOn) {
            target.style.backgroundColor = "white";
        } else if (isRainbowOn) {
            target.style.backgroundColor = getRandomColor();
            lastDiv = target;
        } else {
            target.style.backgroundColor = currentColor;
        }
    }
});

document.addEventListener('mousemove', function(e) {
    if(isMouseDown) {
        const target = e.target;
        if(target.matches('.sheet div')) {
            if(isEraserOn) {
                target.style.backgroundColor = "white";
            } else if(isRainbowOn) {
                if(target !== lastDiv) {
                    target.style.backgroundColor = getRandomColor(); 
                    lastDiv = target;
                }
            } else {
                target.style.backgroundColor = currentColor;
            }
        }
    }
});

document.addEventListener('mouseup', function(e) {
    isMouseDown = false;
});

document.addEventListener('mouseleave', function(e) {
    isMouseDown = false;
});

const toggleGrid = document.querySelector(".toggleGrid");

toggleGrid.addEventListener('click', function() {
    const childDivs = document.querySelectorAll(".sheet div");
    childDivs.forEach(div => {
        if(div.style.border === "1px solid black") {
            div.style.border = "0px";
            toggleGrid.classList.add("active");
        } else {
            div.style.border = "1px solid black";
            toggleGrid.classList.remove("active");
        }
    });
});

const eraser = document.querySelector(".eraser");
let isEraserOn = false;

eraser.addEventListener('click', function() {
    if(!isEraserOn) {
        isEraserOn = true;
        previousColor = currentColor;
        currentColor = "white";
        eraser.classList.add("active");
    } else {
        isEraserOn = false;
        currentColor = previousColor;
        eraser.classList.remove("active");
    }
});

const rainbow = document.querySelector(".rainbow");
let isRainbowOn = false;

rainbow.addEventListener('click', function() {
    if(!isRainbowOn) {
        isRainbowOn = true;        
        rainbow.classList.add("active");
    } else {
        isRainbowOn = false;
        rainbow.classList.remove("active");
    }
});