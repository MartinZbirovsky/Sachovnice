const defaultSize = 8;
let points = [];
window.onload = function () {

	createAllComponents(defaultSize);

	//find all elements TR and TD on the value of index and change bgcolor color in cell
	document.getElementById("changeColorBtn").onclick = setColor;
	//reset grid
	document.getElementById("resetButtonBtn").onclick = resetGrid;

	document.querySelector("table").onclick = setSolorClick;
}

//change color in cell on X and Y index
function setColor(){
	let valueX = document.getElementById("selecX");
	let valueXOpt = valueX.options[valueX.selectedIndex].value;

	let valueY = document.getElementById("selecY");
	let valueYOpt = valueY.options[valueY.selectedIndex].value;

	let tableGrid = document.getElementById("tableGrid");
	let rows = tableGrid.getElementsByTagName('tr');

	let colorPickerValue = document.getElementById("colorPicker").value;

	let columns = rows[valueYOpt - 1].getElementsByTagName("td");
	columns[valueXOpt - 1].style.background = colorPickerValue;

	points.push({ x: valueXOpt, y: valueYOpt});
}

//creates all controls
function createAllComponents(defaultSize) {
	createTableGrid(defaultSize);
	createSelectPoint(defaultSize, "selecX");
	createSelectPoint(defaultSize, "selecY");
	createColorPicker();
	createBtn("changeColorBtn", "Apply color");
	createBtn("resetButtonBtn", "Reset Grid");
}

//create table with rows and culoms
function createTableGrid(size) {
	let tableGrid = document.createElement("table");
	tableGrid.setAttribute("id", "tableGrid")

	for (let i = 1; i <= size; i++) {
		let row = document.createElement('tr');

		for (let j = 1; j <= size; j++) {
			let td = document.createElement('td');
			row.appendChild(td);
		}
		tableGrid.appendChild(row);
	}
	document.body.appendChild(tableGrid);
}

//create button with name and content
function createBtn(name, content) {
	let resetBtn = document.createElement("button");
	resetBtn.setAttribute("id", name);
	resetBtn.textContent = content;
	document.body.appendChild(resetBtn);
}

//craete color picker
function createColorPicker() {
	let colorPicker = document.createElement("input");
	colorPicker.setAttribute("type", "color");
	colorPicker.setAttribute("id", "colorPicker");
	colorPicker.setAttribute("name", "colorPicker");
	colorPicker.setAttribute("value", "#e66465");
	document.body.appendChild(colorPicker);
}

//create select with options and name
function createSelectPoint(itemsNum, name) {
	let selectPoint = document.createElement("select");
	selectPoint.setAttribute("id", name);

	for (let i = 1; i <= itemsNum; i++) {
		let option = document.createElement("option");
		option.setAttribute("value", i);

		let text = document.createTextNode(`Axis ${name[name.length - 1]}: ${i}`);
		option.appendChild(text);

		selectPoint.appendChild(option);
	}
	document.body.appendChild(selectPoint);
}

//finds changed positions stored in array
function resetGrid() {
	var tableGrid = document.getElementById("tableGrid");
	var rows = tableGrid.getElementsByTagName('tr');

	for(let point of points) {
		const td = rows[point.y - 1].getElementsByTagName("td");
		td[point.x - 1].style.background = "";
	}
	points = [];
}

function setSolorClick(cell) {
	const td = cell.target;

	if(cell.target.nodeName == "TD") {
		const colorPickerValue = document.getElementById("colorPicker").value;
		const tr = td.parentElement;
		td.style.background = colorPickerValue;
		points.push({ x: td.cellIndex + 1, y: tr.rowIndex + 1 });
	}
}