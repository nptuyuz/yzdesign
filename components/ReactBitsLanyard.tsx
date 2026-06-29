/* eslint-disable react/no-unknown-property */
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { RoundedBox, Environment, Lightformer, useTexture } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

type Vec3 = [number, number, number];

type LanyardProps = {
  position?: Vec3;
  gravity?: Vec3;
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
};

type BandProps = Required<Pick<LanyardProps, 'imageFit' | 'lanyardWidth'>> & {
  isMobile: boolean;
  frontImage: string | null;
  backImage: string | null;
  lanyardImage: string | null;
};

const blankPixel =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

export default function ReactBitsLanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI * 0.9} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile,
  frontImage,
  backImage,
  imageFit,
  lanyardImage,
  lanyardWidth
}: BandProps & { maxSpeed?: number; minSpeed?: number }) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const dragVelocity = useRef(new THREE.Vector3());
  const previousDragTarget = useRef<THREE.Vector3 | null>(null);
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]),
    []
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  const strapTexture = useTexture(lanyardImage || '/lanyard/lanyard-band.png');
  const frontTexture = useTexture(frontImage || blankPixel);
  const backTexture = useTexture(backImage || blankPixel);

  const frontScale = useMemo(() => getImagePlaneScale(frontTexture, imageFit), [frontTexture, imageFit]);
  const backScale = useMemo(() => getImagePlaneScale(backTexture, imageFit), [backTexture, imageFit]);

  const segmentProps = { type: 'dynamic' as const, canSleep: true, colliders: false as const, angularDamping: 2.8, linearDamping: 2.4 };

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.86]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.86]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.86]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? 'grabbing' : 'grab';
    return () => void (document.body.style.cursor = 'auto');
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      const nextTarget = new THREE.Vector3(vec.x - dragged.x, vec.y - dragged.y, vec.z - dragged.z);
      if (previousDragTarget.current && delta > 0) {
        dragVelocity.current.copy(nextTarget).sub(previousDragTarget.current).multiplyScalar(1 / delta);
      }
      previousDragTarget.current = nextTarget.clone();
      card.current?.setNextKinematicTranslation({ x: nextTarget.x, y: nextTarget.y, z: nextTarget.z });
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  strapTexture.wrapS = strapTexture.wrapT = THREE.RepeatWrapping;
  strapTexture.colorSpace = THREE.SRGBColorSpace;
  frontTexture.colorSpace = THREE.SRGBColorSpace;
  backTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <>
      <group position={[0, 4.2, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.42, -0.08, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody position={[0.86, -0.32, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody position={[1.18, -0.74, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody position={[1.24, -2.45, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.82, 1.14, 0.045]} />
          <group
            scale={1.75}
            position={[0, -0.08, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={event => {
              (event.target as unknown as { releasePointerCapture: (pointerId: number) => void }).releasePointerCapture(event.pointerId);
              card.current?.setLinvel({ x: dragVelocity.current.x * 0.86, y: dragVelocity.current.y * 0.86, z: dragVelocity.current.z * 0.36 }, true);
              previousDragTarget.current = null;
              drag(false);
            }}
            onPointerDown={event => {
              (event.target as unknown as { setPointerCapture: (pointerId: number) => void }).setPointerCapture(event.pointerId);
              dragVelocity.current.set(0, 0, 0);
              previousDragTarget.current = null;
              drag(new THREE.Vector3().copy(event.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <RoundedBox args={[1.12, 1.56, 0.06]} radius={0.055} smoothness={8}>
              <meshPhysicalMaterial color="#f7f7f3" roughness={0.72} metalness={0.04} clearcoat={0.35} clearcoatRoughness={0.22} />
            </RoundedBox>
            <mesh position={[0, 0, 0.036]}>
              <planeGeometry args={frontScale} />
              <meshBasicMaterial map={frontTexture} transparent color="#0b0b0b" toneMapped={false} />
            </mesh>
            <mesh position={[0, 0, -0.037]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={backScale} />
              <meshBasicMaterial map={backTexture} transparent toneMapped={false} />
            </mesh>
            <mesh position={[0, 0.73, 0.055]}>
              <torusGeometry args={[0.078, 0.014, 10, 24]} />
              <meshStandardMaterial color="#050505" roughness={0.35} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0.89, 0.02]}>
              <cylinderGeometry args={[0.028, 0.028, 0.28, 16]} />
              <meshStandardMaterial color="#050505" roughness={0.35} metalness={0.65} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-expect-error MeshLine registers this element through extend(). */}
        <meshLineGeometry />
        {/* @ts-expect-error MeshLine registers this element through extend(). */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={strapTexture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

function getImagePlaneScale(texture: THREE.Texture, imageFit: 'cover' | 'contain'): [number, number] {
  const img = texture.image as HTMLImageElement | undefined;
  const cardW = 0.72;
  const cardH = 0.82;
  if (!img?.width || !img?.height) return [cardW, cardW];
  const imageRatio = img.width / img.height;
  const targetRatio = cardW / cardH;
  if (imageFit === 'contain') {
    return imageRatio > targetRatio ? [cardW, cardW / imageRatio] : [cardH * imageRatio, cardH];
  }
  return imageRatio > targetRatio ? [cardH * imageRatio, cardH] : [cardW, cardW / imageRatio];
}


