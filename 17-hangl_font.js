import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "../examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "../examples/jsm/geometries/TextGeometry.js";

class App {
  constructor() {
    const divContainer = document.querySelector("#webgl-container");
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    divContainer.appendChild(renderer.domElement);
    this._renderer = renderer;

    const scene = new THREE.Scene();
    this._scene = scene;

    this._setupCamera();
    this._setupLight();
    this._setupModel();
    this._setupControls();

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  _setupControls() {
    new OrbitControls(this._camera, this._divContainer);
  }

  _setupCamera() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 2;
    this._camera = camera;
  }

  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this._scene.add(light);
  }

  _setupModel() {
    const loader = new FontLoader();
    loader.load("./data/NanumMyeongjo_Regular.json", (font) => {
      const geometry = new TextGeometry("대한민국\nKorea #1", {
        font: font,
        size: 0.3,
        height: 0.2,
        curveSegments: 12,
        // strring for ExtrudeGeometry
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.03,
        bevelOffset: 0.005,
        bevelSegments: 24,
      });

      // geometry.computeBoundingBox();
      // const midX =
      //   (geometry.boundingBox.max.x - geometry.boundingBox.min.x) / 2.0;
      // const midZ =
      //   (geometry.boundingBox.max.z - geometry.boundingBox.min.z) / 2.0;
      // geometry.translate(-midX, 0, -midZ);

      geometry.center();

      const material = new THREE.MeshStandardMaterial({
        color: "#689F38",
        roughness: 0.3,
        metalness: 0.7,
      });
      const mesh = new THREE.Mesh(geometry, material);

      this._scene.add(mesh);
    });
  }

  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }

  render(time) {
    this._renderer.render(this._scene, this._camera);
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }

  update(time) {
    time *= 0.001; // second unit
  }
}

window.onload = function () {
  new App();
};
