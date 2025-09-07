// ✅ Contact Form
function submitForm(event) {
  event.preventDefault();
  alert("✅ Thank you! Your message has been sent.");
}

// ✅ THREE.js Farming Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 15);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

// Lights
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(hemiLight);

const sun = new THREE.DirectionalLight(0xffffff, 1.5);
sun.position.set(20, 30, 20);
sun.castShadow = true;
scene.add(sun);

// ✅ Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0x32cd32 }) // Green farmland
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// ✅ Add Trees
function addTree(x, z) {
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 2),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 }) // brown
  );
  trunk.position.set(x, 1, z);
  trunk.castShadow = true;

  const leaves = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x006400 }) // dark green
  );
  leaves.position.set(x, 2.5, z);
  leaves.castShadow = true;

  scene.add(trunk, leaves);
}

addTree(0, -5);
addTree(3, -8);
addTree(-3, -8);
addTree(5, -12);
addTree(-5, -12);

// ✅ Tractor Model
const loader = new THREE.GLTFLoader();
loader.load(
  "https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/master/2.0/Tractor/glTF/Tractor.gltf",
  (gltf) => {
    const tractor = gltf.scene;
    tractor.scale.set(0.5, 0.5, 0.5);
    tractor.position.set(0, 0, -2);
    tractor.castShadow = true;
    scene.add(tractor);
  },
  undefined,
  (err) => console.error("❌ Tractor model failed to load:", err)
);

// ✅ Animate Camera (orbit effect)
function animate() {
  requestAnimationFrame(animate);

  const time = Date.now() * 0.0002;
  camera.position.x = Math.sin(time) * 15;
  camera.position.z = Math.cos(time) * 15;
  camera.lookAt(0, 1, -5); // focus on farm center

  renderer.render(scene, camera);
}
animate();

// ✅ Resize Handler
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
