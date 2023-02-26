//create one div grid-container and 16 divs grid-item
const container = document.createElement("div");
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
container.setAttribute("id", "grid-container");
container.classList.add("grid-container");
console.log(container);
var ngrid = 16;
container.style = "display: grid; grid-template-columns: repeat(" + ngrid + ", 1fr); grid-template-rows: repeat(" + ngrid + ", 1fr); background-color: none; height: 500px; width: 500px; margin-left:15%; box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;";

h1.appendChild(container);
h1.style = "display: flex; flex-direction: column;  ";
h2.style = "display: flex; flex-direction: column; postion: absolute;  ";

//add a slide bar to change the size of the grid
const divrange = document.createElement("div");
divrange.setAttribute("id", "divrange");
h2.appendChild(divrange);
console.log(divrange);
divrange.appendChild(document.createTextNode("Change the size of the grid: "));
divrange.style = "display: flex; justify-content: center; align-self: center; margin-top: 5%; flex-direction: column; align-items: center;";


const range = document.createElement("input");
range.setAttribute("id", "myRange");
range.setAttribute("type", "range");
range.setAttribute("min", "10");
range.setAttribute("max", "80");
range.setAttribute("value", "16");
range.style = "width: 50%; margin-top: 35%; height: 30px;";
divrange.appendChild(range);
console.log(range);
const range_output = document.createElement("div");
range_output.setAttribute("id", "range-output");
divrange.appendChild(range_output);
console.log(range_output);
range_output.style = "position: absolute; margin-top: 80px; left: (24px - 6px * 2) / 2; top: (24px - 6px * 2) / 2; transform-origin: 0 0; transition: transform .4s cubic-bezier(0.175, 0.885, 0.320, 1.275); user-select: none;";
const output = document.createElement("output");
output.classList.add("output");
output.setAttribute = ("name", "output");
output.setAttribute = ("for", "range");
output.style = "display: block; position: absolute; height: 60px; line-height: 60px; min-width: 32px; padding: 0 20px; top: - (24px / 2) - 4px - 10px; transform: translate(-50%, -100%); background: #383c42; color: #fff; border-radius: 100px; white-space: nowrap; font-weight: bold; font-size: 1.2em; text-align: center;  &:before { content: ''; position: absolute; bottom: - 10px + 2px; left: 50%; border: 10px solid #383c42; border-bottom: none; border-left-color: transparent; border-right-color: transparent; transform: translateX(-50%);}";
range_output.appendChild(output);
const slider = document.getElementById("myRange");
const outputget = document.getElementById("range");
output.innerHTML = "16 x 16"; // Display the default slider value



function Grid() {
    for (let i = 0; i < ngrid * ngrid ; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item",i);
        gridItem.textContent = "";
        gridItem.style = " border: 0px solid #000; text-align: center; height: auto; width: auto; border-top : 0px solid; background-color: blue;  ";
        container.appendChild(gridItem);
        
    }
}

function fullGrid(){
    for (let i = 0; i < ngrid; i++) {
        Grid() * i;
    }
}

function removeGrid() {
    const gridItem = document.querySelectorAll(".grid-item");
    //clean the grid
    gridItem.forEach((gridItem) => {
        container.removeChild(gridItem);
    }
    );
}

function updateGrid() {
    removeGrid();
    Grid();
}

function updateDiv()
{ 
    // $( "#here" ).load(window.location.href + " #grid-container" );
    
}

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
function changeColor1() {
    //the color change when the mouse click the div and move the mouse over the div
	const gridItem = document.querySelectorAll(".grid-item");
	gridItem.forEach((gridItem) => {
		gridItem.addEventListener("mouseover", () => {
			if (mouseDown) {
				gridItem.style.backgroundColor = "#000";
			}
		});
	}
	);
}

function changeColor() {
    const gridItem = document.querySelectorAll(".grid-item");
    gridItem.forEach((gridItem) => {
        gridItem.addEventListener("mouseover", () => {
            gridItem.style.backgroundColor = "#000";
        });
    }
    );
}

Grid();
changeColor1();

//slider.onchange = (e) => slider.oninput(e.target.value)
//assembled the output value with the slider value
slider.oninput = function() {
    output.innerHTML = this.value + " x " + this.value;
    console.log(this.value);
    
    //update the grid size
    const container = document.getElementById("grid-container");
    ngrid = this.value;
    container.style = "display: inline-grid; grid-template-columns: repeat(" + ngrid + ", 1fr); grid-template-rows: repeat(" + ngrid + ", 1fr); background-color: none; height: 500px; width: 500px; margin-left:15%; box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;";
    //clean the grid
    // container.removeChild(container.firstChild);
    updateGrid();
    changeColor1();
}















/*


const END = 'change';
const START = 'ontouchstart' in document ? 'touchstart' : 'mousedown';
const INPUT = 'input';
const MAX_ROTATION = 35;
const SOFTEN_FACTOR = 3;

class RangeInput {
	
	constructor(el) {
		this.el = el;

		this._handleEnd = this._handleEnd.bind(this);
		this._handleStart = this._handleStart.bind(this);
		this._handleInput = this._handleInput.bind(this);

		//Call the plugin
		$(this.el.querySelector('input[type=range]')).rangeslider({
			polyfill: false, //Never use the native polyfill
			rangeClass: 'rangeslider',
		    disabledClass: 'rangeslider-disabled',
		    horizontalClass: 'rangeslider-horizontal',
		    verticalClass: 'rangeslider-vertical',
		    fillClass: 'rangeslider-fill-lower',
		    handleClass: 'rangeslider-thumb',
		    onInit: function() {
		    	//No args are passed, so we can't change context of this
		    	const pluginInstance = this;

		    	//Move the range-output inside the handle so we can do all the stuff in css
		    	$(pluginInstance.$element)
		    		.parents('.range')
		    		.find('.range-output')
		    		.appendTo(pluginInstance.$handle);
		    }
		});

		this.sliderThumbEl = el.querySelector('.rangeslider-thumb');
		this.outputEl = el.querySelector('.range-output');
		this.inputEl = el.querySelector('input[type=range]');
		this._lastOffsetLeft = 0;
		this._lastTimeStamp = 0;

		this.el.querySelector('.rangeslider').addEventListener(START, this._handleStart);
	}

	_handleStart (e) {
		this._lastTimeStamp = new Date().getTime();
		this._lastOffsetLeft = this.sliderThumbEl.offsetLeft;

		//Wrap in raf because offsetLeft is updated by the plugin after this fires
		requestAnimationFrame(_ => {
			//Bind through jquery because plugin doesn't fire native event
			$(this.inputEl).on(INPUT, this._handleInput);
			$(this.inputEl).on(END, this._handleEnd);
		});
	}

	_handleEnd (e) {
		//Unbind through jquery because plugin doesn't fire native event
		$(this.inputEl).off(INPUT, this._handleInput);
		$(this.inputEl).off(END, this._handleEnd);

		requestAnimationFrame(_ => this.outputEl.style.transform = 'rotate(0deg)')
	}

	_handleInput (e) {
		let now = new Date().getTime();
		let timeElapsed = now - this._lastTimeStamp || 1;
		let distance = this.sliderThumbEl.offsetLeft - this._lastOffsetLeft;
		let direction = distance < 0 ? -1 : 1;
		let velocity = Math.abs(distance) / timeElapsed; //pixels / millisecond
		let targetRotation = Math.min(Math.abs(distance * velocity) * SOFTEN_FACTOR, MAX_ROTATION);

		requestAnimationFrame(_ => this.outputEl.style.transform = 'rotate(' + targetRotation * -direction + 'deg)');

		this._lastTimeStamp = now;
		this._lastOffsetLeft = this.sliderThumbEl.offsetLeft;
	}

}

*/
