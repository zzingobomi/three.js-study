import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js";
import { VertexNormalsHelper } from "../examples/jsm/helpers/VertexNormalsHelper.js";

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
    camera.position.z = 3;
    this._camera = camera;
    this._scene.add(camera);
  }

  _setupLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this._scene.add(ambientLight);

    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    //this._scene.add(light);
    this._camera.add(light);
  }

  _setupModel() {
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load(
      "images/glass/Glass_Window_002_basecolor.jpg"
    );
    const mapAO = textureLoader.load(
      "images/glass/Glass_Window_002_ambientOcclusion.jpg"
    );
    const mapHeight = textureLoader.load(
      "images/glass/Glass_Window_002_height.png"
    );
    const mapNormal = textureLoader.load(
      "images/glass/Glass_Window_002_normal.jpg"
    );
    const mapRoughness = textureLoader.load(
      "images/glass/Glass_Window_002_roughness.jpg"
    );
    const mapMetalic = textureLoader.load(
      "images/glass/Glass_Window_002_metallic.jpg"
    );
    const mapAlpha = textureLoader.load(
      "images/glass/Glass_Window_002_opacity.jpg"
    );
    const mapLight = textureLoader.load("images/glass/light.jpg");

    const material = new THREE.MeshStandardMaterial({
      map: map,

      normalMap: mapNormal,

      displacementMap: mapHeight,
      displacementScale: 0.2,
      displacementBias: -0.15,

      aoMap: mapAO,
      aoMapIntensity: 1,

      roughnessMap: mapRoughness,
      roughness: 1,

      metalnessMap: mapMetalic,
      metalness: 0.5,

      //alphaMap: mapAlpha,
      transparent: true,
      side: THREE.DoubleSide,

      lightMap: mapLight,
      lightMapIntensity: 0.5,
    });

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1, 256, 256, 256),
      material
    );
    box.position.set(-1, 0, 0);
    box.geometry.attributes.uv2 = box.geometry.attributes.uv;
    this._scene.add(box);

    // const boxHelper = new VertexNormalsHelper(box, 0.1, 0xffff00);
    // this._scene.add(boxHelper);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 512, 512),
      material
    );
    sphere.position.set(1, 0, 0);
    sphere.geometry.attributes.uv2 = sphere.geometry.attributes.uv;
    this._scene.add(sphere);

    // const sphereHelper = new VertexNormalsHelper(sphere, 0.1, 0xffff00);
    // this._scene.add(sphereHelper);
  }

  // Texture
  // _setupModel() {
  //   const textureLoader = new THREE.TextureLoader();
  //   const map = textureLoader.load(
  //     "../examples/textures/uv_grid_opengl.jpg",
  //     (texture) => {
  //       texture.repeat.x = 1;
  //       texture.repeat.y = 1;

  //       texture.wrapS = THREE.ClampToEdgeWrapping;
  //       texture.wrapT = THREE.ClampToEdgeWrapping;

  //       texture.offset.x = 0;
  //       texture.offset.y = 0;

  //       texture.rotation = THREE.MathUtils.degToRad(45);
  //       texture.center.x = 0.5;
  //       texture.center.y = 0.5;

  //       texture.magFilter = THREE.NearestFilter;
  //       texture.minFilter = THREE.NearestMipMapLinearFilter;
  //     }
  //   );

  //   const material = new THREE.MeshStandardMaterial({
  //     map: map,
  //   });

  //   const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
  //   box.position.set(-1, 0, 0);
  //   this._scene.add(box);

  //   const sphere = new THREE.Mesh(
  //     new THREE.SphereGeometry(0.7, 32, 32),
  //     material
  //   );
  //   sphere.position.set(1, 0, 0);
  //   this._scene.add(sphere);
  // }

  // MeshPhysicalMaterial
  // _setupModel() {
  //   const material = new THREE.MeshPhysicalMaterial({
  //     color: 0xff0000,
  //     emissive: 0x000000,
  //     roughness: 1,
  //     metalness: 0,
  //     clearcoat: 0.4,
  //     clearcoatRoughness: 0,
  //     flatShading: false,
  //     wireframe: false,
  //   });

  //   const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
  //   box.position.set(-1, 0, 0);
  //   this._scene.add(box);

  //   const sphere = new THREE.Mesh(
  //     new THREE.SphereGeometry(0.7, 32, 32),
  //     material
  //   );
  //   sphere.position.set(1, 0, 0);
  //   this._scene.add(sphere);
  // }

  // MeshStandardMaterial
  // _setupModel() {
  //   const material = new THREE.MeshStandardMaterial({
  //     color: 0xff0000,
  //     emissive: 0x000000,
  //     roughness: 0.25,
  //     metalness: 0.6,
  //     flatShading: false,
  //     wireframe: false,
  //   });

  //   const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
  //   box.position.set(-1, 0, 0);
  //   this._scene.add(box);

  //   const sphere = new THREE.Mesh(
  //     new THREE.SphereGeometry(0.7, 32, 32),
  //     material
  //   );
  //   sphere.position.set(1, 0, 0);
  //   this._scene.add(sphere);
  // }

  // MeshPhongMaterial
  // _setupModel() {
  //   const material = new THREE.MeshPhongMaterial({
  //     color: 0xff0000,
  //     emissive: 0x000000,
  //     specular: 0x000000,
  //     shininess: 0,
  //     flatShading: false,
  //     wireframe: false,
  //   });

  //   const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
  //   box.position.set(-1, 0, 0);
  //   this._scene.add(box);

  //   const sphere = new THREE.Mesh(
  //     new THREE.SphereGeometry(0.7, 32, 32),
  //     material
  //   );
  //   sphere.position.set(1, 0, 0);
  //   this._scene.add(sphere);
  // }

  // MeshLambertMaterial
  // _setupModel() {
  //   const material = new THREE.MeshLambertMaterial({
  //     color: 0xff0000,
  //     emissive: 0x000000,
  //     wireframe: false,
  //   });

  //   const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
  //   box.position.set(-1, 0, 0);
  //   this._scene.add(box);

  //   const sphere = new THREE.Mesh(
  //     new THREE.SphereGeometry(0.7, 32, 32),
  //     material
  //   );
  //   sphere.position.set(1, 0, 0);
  //   this._scene.add(sphere);
  // }

  // MeshBasicMaterial
  // _setupModel() {
  //   const material = new THREE.MeshBasicMaterial({
  //     // 부모 클래스인 Material 속성들
  //     visible: true,
  //     transparent: false,
  //     opacity: 1,
  //     depthTest: true,
  //     depthWrite: true,
  //     side: THREE.FrontSide,

  //     color: 0xffff00,
  //     wireframe: false,
  //   });

  //   const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
  //   box.position.set(-1, 0, 0);
  //   this._scene.add(box);

  //   const sphere = new THREE.Mesh(
  //     new THREE.SphereGeometry(0.7, 32, 32),
  //     material
  //   );
  //   sphere.position.set(1, 0, 0);
  //   this._scene.add(sphere);
  // }

  // LineMaterial
  // _setupModel() {
  //   const vertices = [-1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0];

  //   const geometry = new THREE.BufferGeometry();
  //   geometry.setAttribute(
  //     "position",
  //     new THREE.Float32BufferAttribute(vertices, 3)
  //   );

  //   //const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  //   const material = new THREE.LineDashedMaterial({
  //     color: 0xff0000,
  //     dashSize: 0.2,
  //     gapSize: 0.1,
  //     scale: 1,
  //   });

  //   const line = new THREE.Line(geometry, material);
  //   line.computeLineDistances();
  //   this._scene.add(line);
  // }

  // PointMaterial
  // _setupModel() {
  //   const vertices = [];
  //   for (let i = 0; i < 10000; i++) {
  //     const x = THREE.Math.randFloatSpread(5);
  //     const y = THREE.Math.randFloatSpread(5);
  //     const z = THREE.Math.randFloatSpread(5);

  //     vertices.push(x, y, z);
  //   }

  //   const geometry = new THREE.BufferGeometry();
  //   geometry.setAttribute(
  //     "position",
  //     new THREE.Float32BufferAttribute(vertices, 3)
  //   );

  //   const sprite = new THREE.TextureLoader().load(
  //     "../examples/textures/sprites/disc.png"
  //   );

  //   const material = new THREE.PointsMaterial({
  //     map: sprite,
  //     alphaTest: 0.5,
  //     color: 0x00ffff,
  //     size: 0.1,
  //     sizeAttenuation: true,
  //   });

  //   const points = new THREE.Points(geometry, material);
  //   this._scene.add(points);
  // }

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
