const sheet = document.querySelector(".sheet");

const res = [];

const sheetSize = 400;
const resolution = 16;
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



console.log(res);