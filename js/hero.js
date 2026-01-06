let scene, camera, renderer, container;
// let railMesh, nodeMesh, frameRing;
// let rowCount = 6; 
// let nodesPerRow = []; 
// let rowRestVariance = []; 
// let totalNodes = 0;
// let clock = new THREE.Clock();

// // Configuration for spacing and scale
// const VERTICAL_SPACING = 3.0; 
// const BEAD_RADIUS = 0.65; 

// const PRIMARY_COLOR = new THREE.Color('#BD061A');
// const NODE_COLOR = new THREE.Color('#ffffff');
// const RAIL_COLOR = new THREE.Color('#111111');

// function init() {
//     container = document.getElementById('globe-container');

//     scene = new THREE.Scene();
    
//     camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
//     camera.position.set(0, 0, 38); 
//     camera.lookAt(0, 0, 0);

//     renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(container.clientWidth, container.clientHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     container.appendChild(renderer.domElement);

//     for (let i = 0; i < rowCount; i++) {
//         const count = Math.floor(Math.random() * 5) + 1; 
//         nodesPerRow.push(count);
//         rowRestVariance.push((Math.random() - 0.5) * 7.0); 
//         totalNodes += count;
//     }

//     createAccountingVisuals();

//     const resizeObserver = new ResizeObserver(() => onContainerResize());
//     resizeObserver.observe(container);

//     animate();
// }

// function createAccountingVisuals() {
//     // 1. Create the Rails
//     const railGeom = new THREE.CylinderGeometry(0.04, 0.04, 30, 8);
//     const railMat = new THREE.MeshStandardMaterial({ 
//         color: RAIL_COLOR,
//         roughness: 1,
//         metalness: 0
//     });
//     railMesh = new THREE.InstancedMesh(railGeom, railMat, rowCount);
    
//     for (let i = 0; i < rowCount; i++) {
//         const dummy = new THREE.Object3D();
//         dummy.position.set(0, (i - (rowCount - 1) / 2) * VERTICAL_SPACING, 0);
//         dummy.rotation.z = Math.PI / 2;
//         dummy.updateMatrix();
//         railMesh.setMatrixAt(i, dummy.matrix);
//     }
//     scene.add(railMesh);

//     // 2. Create the Nodes (Spherical beads)
//     const nodeGeom = new THREE.SphereGeometry(BEAD_RADIUS, 32, 32); 
//     const nodeMat = new THREE.MeshStandardMaterial({ 
//         color: NODE_COLOR,
//         roughness: 0.9,
//         metalness: 0,
//         emissive: PRIMARY_COLOR,
//         emissiveIntensity: 0
//     });
//     nodeMesh = new THREE.InstancedMesh(nodeGeom, nodeMat, totalNodes);
    
//     const groupOffsets = [];
//     const rowIndexMap = [];
    
//     for (let r = 0; r < rowCount; r++) {
//         const count = nodesPerRow[r];
//         for (let n = 0; n < count; n++) {
//             groupOffsets.push(n * (BEAD_RADIUS * 2.2)); 
//             rowIndexMap.push(r);
//         }
//     }
    
//     nodeMesh.userData = {
//         groupOffsets: groupOffsets,
//         rowIndexMap: rowIndexMap
//     };
    
//     scene.add(nodeMesh);

//     // 3. Create the Frame Ring
//     const ringGeom = new THREE.TorusGeometry(11, 0.15, 16, 100);
//     const ringMat = new THREE.MeshStandardMaterial({ 
//         color: PRIMARY_COLOR,
//         roughness: 0.8,
//         metalness: 0.2
//     });
//     frameRing = new THREE.Mesh(ringGeom, ringMat);
//     scene.add(frameRing);

//     // Lighting
//     scene.add(new THREE.AmbientLight(0xffffff, 0.8)); 
    
//     const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.5);
//     scene.add(hemiLight);

//     const softPoint = new THREE.PointLight(0xffffff, 0.2);
//     softPoint.position.set(10, 10, 10);
//     scene.add(softPoint);
// }

// function onContainerResize() {
//     if (!camera || !renderer || !container) return;
//     camera.aspect = container.clientWidth / container.clientHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(container.clientWidth, container.clientHeight);
// }

// function slideEase(t) {
//     const cycle = t % 1;
//     if (cycle < 0.2) return -1;
//     if (cycle < 0.45) {
//         const p = (cycle - 0.2) / 0.25;
//         return -1 + (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
//     }
//     if (cycle < 0.75) return 0;
//     if (cycle < 0.95) {
//         const p = (cycle - 0.75) / 0.2;
//         return Math.pow(p, 3);
//     }
//     return 1; 
// }

// function animate() {
//     requestAnimationFrame(animate);
//     // Reduced time multiplier from 0.22 to 0.14 for a slower, smoother speed
//     const time = clock.getElapsedTime() * 0.14; 
//     const dummy = new THREE.Object3D();

//     const { groupOffsets, rowIndexMap } = nodeMesh.userData;

//     for (let i = 0; i < totalNodes; i++) {
//         const rowIndex = rowIndexMap[i];
//         const rowTime = time + rowIndex * 0.15; 
//         const offset = slideEase(rowTime);
        
//         const groupWidth = (nodesPerRow[rowIndex] - 1) * (BEAD_RADIUS * 2.2);
//         const travelDistance = 32;
//         const restVariance = rowRestVariance[rowIndex];
        
//         const x = (offset * travelDistance) + restVariance + (groupOffsets[i] - (groupWidth / 2));
//         const y = (rowIndex - (rowCount - 1) / 2) * VERTICAL_SPACING;
        
//         const chaos = Math.abs(offset) > 0.05 ? Math.sin(time * 8 + i) * 0.02 : 0;
        
//         dummy.position.set(x, y + chaos, 0);
        
//         const isLocked = Math.abs(offset) < 0.01;
//         const scale = isLocked ? 1.15 : 1.0;
//         dummy.scale.set(scale, scale, scale);

//         const colorLerp = isLocked ? 1 : 0;
//         nodeMesh.setColorAt(i, new THREE.Color().lerpColors(new THREE.Color(0x333333), PRIMARY_COLOR, colorLerp));
        
//         dummy.updateMatrix();
//         nodeMesh.setMatrixAt(i, dummy.matrix);
//     }

//     if (nodeMesh.instanceColor) nodeMesh.instanceColor.needsUpdate = true;
//     nodeMesh.instanceMatrix.needsUpdate = true;
    
//     const orbitRotation = Math.sin(time * 0.15) * 0.05;
//     scene.rotation.y = orbitRotation;
//     scene.rotation.x = 0.05; 

//     renderer.render(scene, camera);
// }

// window.onload = init;

// let scene, camera, renderer, container;
// let instancedMesh, particlesCount = 120;
// let paths = [];
// let clock = new THREE.Clock();

// // Brand Color
// const PRIMARY_COLOR = new THREE.Color('#BD061A');

// function init() {
//     container = document.getElementById('globe-container');

//     scene = new THREE.Scene();
    
//     camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
//     camera.position.set(15, 10, 25);
//     camera.lookAt(0, 0, 0);

//     renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(container.clientWidth, container.clientHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     container.appendChild(renderer.domElement);

//     // Lighting
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(ambientLight);
//     const pointLight = new THREE.PointLight(0xffffff, 1);
//     pointLight.position.set(10, 10, 10);
//     scene.add(pointLight);

//     createProcessSystem();

//     const resizeObserver = new ResizeObserver(() => onContainerResize());
//     resizeObserver.observe(container);

//     animate();
// }

// function createProcessSystem() {
//     // Create Paths (The "Structured Process")
//     const pathMaterial = new THREE.LineBasicMaterial({ 
//         color: 0x333333, 
//         transparent: true, 
//         opacity: 0.3 
//     });

//     for (let i = 0; i < 8; i++) {
//         const curve = new THREE.CubicBezierCurve3(
//             new THREE.Vector3(-15, (i - 4) * 1.5, 0),    // Start: Pay Run
//             new THREE.Vector3(-5, (i - 4) * 0.5, 5),     // Tax
//             new THREE.Vector3(5, (i - 4) * 0.5, -5),     // Payment
//             new THREE.Vector3(15, (i - 4) * 1.5, 0)      // Reporting/Final
//         );
        
//         const points = curve.getPoints(50);
//         const geometry = new THREE.BufferGeometry().setFromPoints(points);
//         const line = new THREE.Line(geometry, pathMaterial);
//         scene.add(line);
//         paths.push(curve);

//         // Add "Checkpoints" (Subtle cubes at key stages)
//         [0, 0.33, 0.66, 1].forEach(t => {
//             const pos = curve.getPoint(t);
//             const boxGeom = new THREE.BoxGeometry(0.2, 0.2, 0.2);
//             const boxMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
//             const box = new THREE.Mesh(boxGeom, boxMat);
//             box.position.copy(pos);
//             scene.add(box);
//         });
//     }

//     // Instanced Mesh for "Employee Nodes"
//     const geometry = new THREE.SphereGeometry(0.15, 16, 16);
//     const material = new THREE.MeshPhongMaterial({ 
//         color: PRIMARY_COLOR,
//         emissive: PRIMARY_COLOR,
//         emissiveIntensity: 0.5
//     });
    
//     instancedMesh = new THREE.InstancedMesh(geometry, material, particlesCount);
//     scene.add(instancedMesh);

//     // Initialize custom data for each instance
//     instancedMesh.userData = {
//         offsets: Array.from({ length: particlesCount }, () => Math.random()),
//         pathIndices: Array.from({ length: particlesCount }, () => Math.floor(Math.random() * paths.length)),
//         speeds: Array.from({ length: particlesCount }, () => 0.05 + Math.random() * 0.05)
//     };
// }

// function onContainerResize() {
//     if (!camera || !renderer || !container) return;
//     camera.aspect = container.clientWidth / container.clientHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(container.clientWidth, container.clientHeight);
// }

// function animate() {
//     requestAnimationFrame(animate);
//     const time = clock.getElapsedTime();
//     const dummy = new THREE.Object3D();

//     const { offsets, pathIndices, speeds } = instancedMesh.userData;

//     for (let i = 0; i < particlesCount; i++) {
//         // Progress loops from 0 to 1
//         let progress = (time * speeds[i] + offsets[i]) % 1;
        
//         // Easing: Particles "snap" into alignment slightly at the start and end
//         // using a smoothstep-like behavior for the flow
//         const p = progress;
//         const curve = paths[pathIndices[i]];
//         const pos = curve.getPoint(p);

//         dummy.position.copy(pos);
        
//         // Scale effect: pulse nodes slightly as they pass "checkpoints"
//         const pulse = 1 + Math.sin(p * Math.PI * 6) * 0.2;
//         dummy.scale.set(pulse, pulse, pulse);
        
//         dummy.updateMatrix();
//         instancedMesh.setMatrixAt(i, dummy.matrix);
//     }

//     instancedMesh.instanceMatrix.needsUpdate = true;
    
//     // Subtle scene float
//     scene.rotation.y = Math.sin(time * 0.2) * 0.1;
//     scene.rotation.x = Math.cos(time * 0.1) * 0.05;

//     renderer.render(scene, camera);
// }

// window.onload = init;