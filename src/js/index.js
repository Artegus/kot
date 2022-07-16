import '../components/CardLaptopKot';
import '../components/KotLetter'

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

const handleKotSendToDocument = (e) => {
    const { letter } = e.detail;
    const position = getRandomPosition();
    const kotElement = createKotElement(position, letter);

    addKotLetter(kotElement);
}

window.addEventListener('kotSendToDocument', handleKotSendToDocument)