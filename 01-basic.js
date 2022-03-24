import * as THREE from "../build/three.module.js";

class App {
	constructor() {
		const divContainer = document.querySelector("#webgl-container");
		this._divContainer = divContainer;
	}
}

window.onload = function () {
	new App();
};
