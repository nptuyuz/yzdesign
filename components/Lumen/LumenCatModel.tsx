'use client';

import { useEffect, useRef, useState } from 'react';

export default function LumenCatModel() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState('LOADING GLB MODEL');

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    async function initModel() {
      try {
        const THREE = await import('three');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
        const mount = mountRef.current;
        if (!mount || disposed) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, mount.clientWidth / mount.clientHeight, 0.1, 100);
        camera.position.set(0, 1.65, 5.2);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.18;
        mount.appendChild(renderer.domElement);

        scene.add(new THREE.HemisphereLight(0xffffff, 0x111111, 2.6));
        const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
        keyLight.position.set(3, 4, 5);
        scene.add(keyLight);
        const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
        rimLight.position.set(-3, 2, -2);
        scene.add(rimLight);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.minDistance = 1.2;
        controls.maxDistance = 7;
        controls.target.set(0, 0.75, 0);

        const gltf = await new GLTFLoader().loadAsync('/models/cat.glb');
        if (disposed) return;
        const model = gltf.scene;
        model.traverse(child => {
          const mesh = child as import('three').Mesh;
          if (!mesh.isMesh) return;
          mesh.frustumCulled = false;

          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach(material => {
            const mat = material as import('three').MeshStandardMaterial;
            mat.side = THREE.DoubleSide;
            mat.roughness = Math.min(mat.roughness ?? 0.5, 0.68);
            mat.metalness = mat.metalness ?? 0;
            if ('color' in mat && mat.color) {
              const brightness = mat.color.r + mat.color.g + mat.color.b;
              if (brightness < 0.04) mat.color.set(0x101414);
            }
            if ('emissive' in mat && mat.emissive && 'color' in mat && mat.color) {
              mat.emissive.copy(mat.color).multiplyScalar(0.08);
              mat.emissiveIntensity = 0.16;
            }
            mat.needsUpdate = true;
          });
        });
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        const maxAxis = Math.max(size.x, size.y, size.z, 0.001);
        model.scale.setScalar(3.35 / maxAxis);
        model.position.y += 4.2;
        scene.add(model);
        setStatus('');

        const resize = () => {
          if (!mount) return;
          camera.aspect = mount.clientWidth / mount.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener('resize', resize);

        const animate = () => {
          if (disposed) return;
          model.rotation.y += 0.004;
          controls.update();
          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        };
        animate();

        cleanup = () => {
          window.removeEventListener('resize', resize);
          controls.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch (error) {
        console.error(error);
        setStatus('GLB MODEL LOAD FAILED - USE HTTP PREVIEW');
      }
    }

    initModel();
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className="lumen-model-canvas" aria-label="Rotatable black cat GLB 3D model">
      {status && <span className="model-status">{status}</span>}
      <div ref={mountRef} className="lumen-model-mount" />
    </div>
  );
}
