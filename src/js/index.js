import '../components/CardLaptopKot';
import '../components/KotLetter'

const KOT = ["K", "O", "T"];
let indexLetter = 0;

const getRandomPosition = () => {
    const container = document.querySelector('#container')
    let x = container.clientHeight;
	let y = container.clientWidth;
	let randomX = Math.floor(Math.random() * x);
	let randomY = Math.floor(Math.random() * y);
	return {
        x: randomX,
        y: randomY
    }
}

const getLetter = (pos) => {
    return KOT[pos];
}

const createKotElement = (position, letter) => {
    const kotLetter = document.createElement('kot-letter')
    kotLetter.setAttribute('letter', letter);
    kotLetter.setAttribute('x', position.x);
    kotLetter.setAttribute('y', position.y);

    return kotLetter;
}


const addKotLetter = (kotLetter) => {
    document.querySelector('#container').appendChild(kotLetter);
}

const writeKotLetter = () => {
    if (indexLetter === 3) {
        indexLetter = 0;
    }

    const position = getRandomPosition();
    const letter = getLetter(indexLetter);
    const kotElement = createKotElement(position, letter);

    addKotLetter(kotElement);

    indexLetter++;
}

window.addEventListener('kot', writeKotLetter)