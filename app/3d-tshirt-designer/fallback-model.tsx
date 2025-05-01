import * as THREE from "three"

export function createFallbackTShirtModel(color = "#ffffff") {
  // Create a simple t-shirt shape using basic geometries
  const group = new THREE.Group()

  // T-shirt body
  const bodyGeometry = new THREE.CylinderGeometry(1, 0.8, 1.5, 32)
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.7,
    metalness: 0.1,
  })
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
  body.position.y = -0.5
  group.add(body)

  // Left sleeve
  const leftSleeveGeometry = new THREE.CylinderGeometry(0.3, 0.25, 0.7, 16)
  const leftSleeve = new THREE.Mesh(leftSleeveGeometry, bodyMaterial)
  leftSleeve.position.set(-1, -0.3, 0)
  leftSleeve.rotation.z = Math.PI / 3
  group.add(leftSleeve)

  // Right sleeve
  const rightSleeveGeometry = new THREE.CylinderGeometry(0.3, 0.25, 0.7, 16)
  const rightSleeve = new THREE.Mesh(rightSleeveGeometry, bodyMaterial)
  rightSleeve.position.set(1, -0.3, 0)
  rightSleeve.rotation.z = -Math.PI / 3
  group.add(rightSleeve)

  // Neck hole
  const neckGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32)
  const neckMaterial = new THREE.MeshStandardMaterial({
    color: "#000000",
    roughness: 0.7,
    metalness: 0.1,
  })
  const neck = new THREE.Mesh(neckGeometry, neckMaterial)
  neck.position.y = 0.2
  group.add(neck)

  return group
}
