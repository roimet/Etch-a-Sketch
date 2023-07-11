const sheet = document.querySelector(".sheet");
const slider = document.getElementById("resSlider");
const resolutionText = document.querySelector(".Resolution");

renderCanvas(slider.value);

slider.oninput = function() {
    renderCanvas(this.value);
    resolutionText.textContent = `Resolution - ${this.value}x${this.value}`;
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
            `box-sizing: border-box; width: ${eachCube}px; height: ${eachCube}px; border: 1px solid grey`);

            res[i][j] = div;
            sheet.appendChild(res[i][j]);
        }
    }
}

//drawing part
const divs = document.querySelectorAll(`.sheet div`);
let isMouseDown = false;
let currentColor = "red";

document.addEventListener('mousedown', function(e) {
    const target = e.target;
    if(target.matches('.sheet div')) {
        e.preventDefault();
        isMouseDown = true;
        target.style.backgroundColor = currentColor;
    }
});

document.addEventListener('mousemove', function(e) {
    if(isMouseDown) {
        const target = e.target;
        if(target.matches('.sheet div')) {
            target.style.backgroundColor = currentColor;
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
        if(div.style.border === "1px solid grey") {
            div.style.border = "0px";
        } else {
            div.style.border = "1px solid grey";
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
    } else {
        isEraserOn = false;
        currentColor = previousColor;
    }
});