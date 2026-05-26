import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const N = 78;
const FW = 16, FH = 9;
const MAX_DIST = 2.8;

export default function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    cam.position.z = 6;

    const pts = [];
    const posArr = new Float32Array(N * 3);

    for (let i = 0; i < N; i++) {
      const p = {
        x: (Math.random() - 0.5) * FW,
        y: (Math.random() - 0.5) * FH,
        z: (Math.random() - 0.5) * 2,
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.5) * 0.003,
      };
      pts.push(p);
      posArr.set([p.x, p.y, p.z], i * 3);
    }

    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));

    const ptMat = new THREE.PointsMaterial({
      color: 0x5291FF,
      size: 0.052,
      transparent: true,
      opacity: 0.72,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(ptGeo, ptMat));

    const maxPairs = (N * (N - 1)) / 2;
    const lineArr = new Float32Array(maxPairs * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(lineArr, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x1564E8,
      transparent: true,
      opacity: 0.15,
    });
    const lineSegs = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegs);

    let mx = 0, my = 0;
    const onMove = e => {
      mx = (e.clientX / innerWidth - 0.5) * 1.4;
      my = (e.clientY / innerHeight - 0.5) * 0.7;
    };
    addEventListener('mousemove', onMove);

    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);

      for (let i = 0; i < N; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (Math.abs(p.x) > FW / 2) p.vx *= -1;
        if (Math.abs(p.y) > FH / 2) p.vy *= -1;
        posArr[i * 3] = p.x;
        posArr[i * 3 + 1] = p.y;
      }
      ptGeo.attributes.position.needsUpdate = true;

      let li = 0;
      for (let a = 0; a < N; a++) {
        for (let b = a + 1; b < N; b++) {
          const dx = pts[a].x - pts[b].x;
          const dy = pts[a].y - pts[b].y;
          if (dx * dx + dy * dy < MAX_DIST * MAX_DIST) {
            lineArr.set([pts[a].x, pts[a].y, pts[a].z, pts[b].x, pts[b].y, pts[b].z], li);
            li += 6;
          }
        }
      }
      lineGeo.setDrawRange(0, li / 3);
      lineGeo.attributes.position.needsUpdate = true;

      cam.position.x += (mx - cam.position.x) * 0.03;
      cam.position.y += (-my - cam.position.y) * 0.03;
      cam.lookAt(0, 0, 0);

      renderer.render(scene, cam);
    };
    tick();

    const onResize = () => {
      const nw = el.clientWidth, nh = el.clientHeight;
      cam.aspect = nw / nh;
      cam.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('mousemove', onMove);
      removeEventListener('resize', onResize);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      ptGeo.dispose(); ptMat.dispose();
      lineGeo.dispose(); lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
