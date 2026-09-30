import { useEffect, useRef } from "react";
import * as THREE from "three";

const R = 1.6;

function latLngToVec(lat, lng, r = R) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 256;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(128, 128, 40, 128, 128, 128);
  g.addColorStop(0, "rgba(83,219,224,0.26)");
  g.addColorStop(0.55, "rgba(63,124,255,0.1)");
  g.addColorStop(1, "rgba(83,219,224,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

export default function Globe({ locations, selectedId, onSelect }) {
  const hostRef = useRef(null);
  const labelsRef = useRef(null);
  const onSelectRef = useRef(onSelect);
  const focusRef = useRef(null);
  const selectedRef = useRef(selectedId);
  onSelectRef.current = onSelect;

  useEffect(() => { selectedRef.current = selectedId; focusRef.current?.(selectedId); }, [selectedId]);

  useEffect(() => {
    const host = hostRef.current;
    const labelLayer = labelsRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.35, 4.35);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.setAttribute("data-testid", "globe-canvas");
    renderer.domElement.style.display = "block";
    host.prepend(renderer.domElement);

    const globe = new THREE.Group();
    scene.add(globe);

    globe.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.985, 48, 48), new THREE.MeshBasicMaterial({ color: 0x081e40 })));

    const N = 1500;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const th = 2.399963 * i;
      pos[i * 3] = Math.cos(th) * rad * R;
      pos[i * 3 + 1] = y * R;
      pos[i * 3 + 2] = Math.sin(th) * rad * R;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    globe.add(new THREE.Points(dotGeo, new THREE.PointsMaterial({ color: 0x3f8fd4, size: 0.016, transparent: true, opacity: 0.85 })));

    const gratMat = new THREE.LineBasicMaterial({ color: 0x2a5a8a, transparent: true, opacity: 0.26 });
    const ringPts = (r, y) => { const pts = []; for (let i = 0; i <= 96; i++) { const a = (i / 96) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r)); } return pts; };
    [-60, -30, 0, 30, 60].forEach((lat) => { const y = R * Math.sin((lat * Math.PI) / 180); const r = R * Math.cos((lat * Math.PI) / 180); globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ringPts(r, y)), gratMat)); });
    for (let k = 0; k < 6; k++) { const pts = []; for (let i = 0; i <= 96; i++) { const a = (i / 96) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * R, Math.sin(a) * R, 0)); } const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gratMat); line.rotation.y = (k / 6) * Math.PI; globe.add(line); }

    const hq = locations.find((l) => l.role === "Headquarters") || locations[0];
    const hqId = hq.id;
    const SPREAD = 9;
    const plot = (lat, lng, r = R) => latLngToVec(hq.lat + (lat - hq.lat) * SPREAD, hq.lng + (lng - hq.lng) * SPREAD, r);
    const markers = {};
    const hitMeshes = [];
    const pulses = [];
    const markerGeo = new THREE.SphereGeometry(0.028, 16, 16);
    const hitGeo = new THREE.SphereGeometry(0.07, 8, 8);
    const ringGeo = new THREE.RingGeometry(0.05, 0.062, 40);
    locations.forEach((loc, i) => {
      const v = plot(loc.lat, loc.lng);
      const mat = new THREE.MeshBasicMaterial({ color: 0x53dbe0 });
      const m = new THREE.Mesh(markerGeo, mat);
      m.position.copy(v.clone().multiplyScalar(1.01));
      globe.add(m);
      const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0x53dbe0, transparent: true, opacity: 0.6, side: THREE.DoubleSide }));
      ring.position.copy(v.clone().multiplyScalar(1.012));
      ring.lookAt(v.clone().multiplyScalar(2));
      globe.add(ring);
      const hit = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({ visible: false }));
      hit.position.copy(v.clone().multiplyScalar(1.01));
      hit.userData.id = loc.id;
      globe.add(hit);
      hitMeshes.push(hit);
      markers[loc.id] = { mesh: m, ring, mat, base: v.clone(), index: i, loc };
      if (loc.id !== hqId) {
        const a = plot(hq.lat, hq.lng, R * 1.005);
        const b = v.clone().multiplyScalar(1.005);
        const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(R * (1.16 + a.distanceTo(b) * 0.1));
        const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
        globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(72)), new THREE.LineBasicMaterial({ color: 0x53dbe0, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending })));
        const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.02, 10, 10), new THREE.MeshBasicMaterial({ color: 0x9ff3f7, blending: THREE.AdditiveBlending, transparent: true }));
        globe.add(pulse);
        pulses.push({ curve, pulse, offset: i * 0.27 });
      }
    });

    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    glow.scale.setScalar(4.9);
    scene.add(glow);

    const PN = 320;
    const pPos = new Float32Array(PN * 3);
    for (let i = 0; i < PN; i++) { const rr = 2.1 + Math.random() * 1.5; const th = Math.random() * Math.PI * 2; const ph = Math.acos(2 * Math.random() - 1); pPos[i * 3] = rr * Math.sin(ph) * Math.cos(th); pPos[i * 3 + 1] = rr * Math.cos(ph); pPos[i * 3 + 2] = rr * Math.sin(ph) * Math.sin(th); }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x53dbe0, size: 0.018, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending }));
    scene.add(particles);

    const labelEls = {};
    const labelOffset = { "abu-dhabi": [0, 0], "al-dhafra": [-14, 20], "dubai": [30, 24], "northern-emirates": [34, -14], "offshore": [-52, -4] };
    locations.forEach((loc) => {
      const el = document.createElement("button");
      el.className = "globe-node-label";
      el.type = "button";
      el.textContent = loc.name;
      el.setAttribute("data-testid", `globe-node-${loc.id}`);
      el.addEventListener("click", () => onSelectRef.current(loc.id));
      labelLayer.appendChild(el);
      labelEls[loc.id] = el;
    });

    const state = { rotY: 0, rotX: 0.3, targetRotY: 0, targetRotX: 0.3, dragging: false, lastInteract: 0, downX: 0, downY: 0, moved: 0 };
    const focusOn = (id) => {
      const mk = markers[id];
      if (!mk) return;
      const v = mk.base;
      const ty = -Math.atan2(v.x, v.z);
      const cur = state.targetRotY;
      const delta = ((((ty - cur) + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
      state.targetRotY = cur + delta;
      state.targetRotX = Math.atan2(v.y, Math.hypot(v.x, v.z)) * 0.72;
      state.lastInteract = performance.now();
      Object.entries(markers).forEach(([mid, m]) => {
        const sel = mid === id;
        m.mat.color.set(sel ? 0xffffff : 0x53dbe0);
        m.ring.material.color.set(sel ? 0x9ff3f7 : 0x53dbe0);
      });
    };
    focusRef.current = focusOn;
    focusOn(selectedRef.current || hqId);
    state.rotY = state.targetRotY;
    state.rotX = state.targetRotX;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onDown = (e) => { state.dragging = true; state.moved = 0; state.downX = e.clientX; state.downY = e.clientY; };
    const onMove = (e) => {
      if (!state.dragging) return;
      const dx = e.clientX - state.downX;
      const dy = e.clientY - state.downY;
      state.downX = e.clientX; state.downY = e.clientY;
      state.moved += Math.abs(dx) + Math.abs(dy);
      state.targetRotY += dx * 0.005;
      state.targetRotX = Math.max(-1, Math.min(1, state.targetRotX + dy * 0.003));
    };
    const onUp = (e) => {
      if (!state.dragging) return;
      state.dragging = false;
      state.lastInteract = performance.now();
      if (state.moved > 6) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(hitMeshes);
      if (hits.length) onSelectRef.current(hits[0].object.userData.id);
    };
    const canvas = renderer.domElement;
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      const t = clock.getElapsedTime();
      if (!state.dragging && performance.now() - state.lastInteract > 3800) state.targetRotY += 0.0011;
      state.rotY += (state.targetRotY - state.rotY) * 0.055;
      state.rotX += (state.targetRotX - state.rotX) * 0.055;
      globe.rotation.y = state.rotY;
      globe.rotation.x = state.rotX;
      particles.rotation.y = -t * 0.02;
      pulses.forEach((p) => { const u = (t * 0.13 + p.offset) % 1; p.pulse.position.copy(p.curve.getPoint(u)); p.pulse.material.opacity = Math.sin(u * Math.PI); });
      Object.values(markers).forEach((mk) => {
        const sel = mk.loc.id === selectedRef.current;
        const s = 1 + 0.3 * Math.sin(t * (sel ? 4.2 : 2) + mk.index);
        mk.ring.scale.setScalar(sel ? s * 1.55 : s);
        mk.ring.material.opacity = sel ? 0.95 : 0.5 + 0.2 * Math.sin(t * 2 + mk.index);
        mk.mesh.scale.setScalar(sel ? 1.35 : mk.loc.id === hqId ? 1.25 : 1);
      });
      scene.updateMatrixWorld();
      const w = host.clientWidth;
      const h = host.clientHeight;
      Object.values(markers).forEach((mk) => {
        const el = labelEls[mk.loc.id];
        if (!el) return;
        const wp = mk.mesh.getWorldPosition(new THREE.Vector3());
        const facing = wp.clone().normalize().dot(camera.position.clone().sub(wp).normalize());
        const proj = wp.clone().project(camera);
        const x = (proj.x * 0.5 + 0.5) * w;
        const y = (-proj.y * 0.5 + 0.5) * h;
        const [ldx, ldy] = labelOffset[mk.loc.id] || [0, 0];
        el.style.transform = `translate(-50%,-140%) translate(${x + ldx}px,${y + ldy}px)`;
        const visible = facing > 0.24;
        el.style.opacity = visible ? "1" : "0";
        el.style.pointerEvents = visible ? "auto" : "none";
        el.classList.toggle("selected", mk.loc.id === selectedRef.current);
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      Object.values(labelEls).forEach((el) => el.remove());
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) { (Array.isArray(obj.material) ? obj.material : [obj.material]).forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); }); }
      });
      renderer.dispose();
      canvas.remove();
      focusRef.current = null;
    };
  }, [locations]);

  return (
    <div className="globe-stage" ref={hostRef} data-testid="coverage-globe">
      <div className="globe-halo-bg" aria-hidden="true" />
      <div className="globe-labels" ref={labelsRef} />
      <span className="globe-hint">Drag to rotate · Select a node</span>
    </div>
  );
}
