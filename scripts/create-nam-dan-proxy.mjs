import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { writeFile } from "node:fs/promises";

globalThis.FileReader = class FileReader {
  result = null;
  onloadend = null;

  async readAsArrayBuffer(blob) {
    this.result = await blob.arrayBuffer();
    this.onloadend?.();
  }
};

const scene = new THREE.Scene();

const wood = new THREE.MeshStandardMaterial({
  color: "#b78643",
  roughness: 0.62,
  metalness: 0.02
});
const darkWood = new THREE.MeshStandardMaterial({
  color: "#6f4728",
  roughness: 0.72,
  metalness: 0.02
});
const roof = new THREE.MeshStandardMaterial({
  color: "#d2a24f",
  roughness: 0.56,
  metalness: 0.04
});
const plaster = new THREE.MeshStandardMaterial({
  color: "#e7d196",
  roughness: 0.66,
  metalness: 0
});
const paper = new THREE.MeshStandardMaterial({
  color: "#f5e8be",
  roughness: 0.48,
  metalness: 0
});

function mesh(geometry, material, position, scale = [1, 1, 1], rotation = [0, 0, 0]) {
  const item = new THREE.Mesh(geometry, material);
  item.position.set(...position);
  item.scale.set(...scale);
  item.rotation.set(...rotation);
  scene.add(item);
  return item;
}

function makeRoofGeometry() {
  const vertices = new Float32Array([
    -1.45, 0, -0.72,
    1.45, 0, -0.72,
    1.45, 0, 0.72,
    -1.45, 0, 0.72,
    0, 0.92, -0.72,
    0, 0.92, 0.72
  ]);
  const indices = [
    0, 1, 4,
    3, 5, 2,
    0, 4, 5,
    0, 5, 3,
    1, 2, 5,
    1, 5, 4,
    0, 3, 2,
    0, 2, 1
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

mesh(new THREE.BoxGeometry(2.35, 1.08, 1.16), wood, [0, 1.0, 0]);
mesh(makeRoofGeometry(), roof, [0, 1.55, 0], [1.08, 1, 1.05]);
mesh(new THREE.BoxGeometry(2.8, 0.18, 1.42), darkWood, [0, 0.34, 0]);
mesh(new THREE.BoxGeometry(0.36, 0.72, 0.05), darkWood, [-0.54, 0.8, 0.61]);
mesh(new THREE.BoxGeometry(0.46, 0.36, 0.055), plaster, [0.62, 1.06, 0.61]);

for (const x of [-1.08, 1.08]) {
  mesh(new THREE.CylinderGeometry(0.075, 0.095, 1.12, 14), darkWood, [x, 0.34, -0.52]);
  mesh(new THREE.CylinderGeometry(0.075, 0.095, 1.12, 14), darkWood, [x, 0.34, 0.52]);
}

for (const x of [-0.82, -0.28, 0.28, 0.82]) {
  mesh(new THREE.BoxGeometry(0.07, 0.1, 1.34), darkWood, [x, 1.53, 0]);
}

mesh(new THREE.BoxGeometry(3.16, 0.08, 1.72), darkWood, [0, 0.08, 0]);
mesh(new THREE.BoxGeometry(0.16, 0.16, 2.15), paper, [0, 0.03, 0.08], [1, 1, 1], [0, 0.18, 0]);

const plaque = mesh(new THREE.BoxGeometry(1.08, 0.04, 0.28), paper, [0, 0.2, 0.98], [1, 1, 1], [-0.1, 0, 0]);
plaque.name = "Nam Dan heritage plaque";

const group = new THREE.Group();
while (scene.children.length) {
  group.add(scene.children[0]);
}
scene.add(group);

const box = new THREE.Box3().setFromObject(group);
const center = new THREE.Vector3();
box.getCenter(center);
group.position.sub(center);
group.position.y -= box.min.y - center.y;

const exporter = new GLTFExporter();
const arrayBuffer = await exporter.parseAsync(scene, {
  binary: true,
  trs: false,
  onlyVisible: true
});

await writeFile(
  "public/models/optimized/Nha-Bac-Nam-Dan-proxy-source.glb",
  Buffer.from(arrayBuffer)
);
