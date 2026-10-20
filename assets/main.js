(function () {
  "use strict";

  // ---------- Content (placeholders until the family's real list arrives) ----------
  const SITES = [
    { name: "Shinganapur", type: "Office and yard", years: "since 1994", lon: 74.205, lat: 16.735, hq: true },
    { name: "Kolhapur city", type: "Apartment buildings", years: "1999 to now", lon: 74.243, lat: 16.705 },
    { name: "Shiroli MIDC", type: "Industrial sheds", years: "2016", lon: 74.285, lat: 16.757 },
    { name: "Panhala", type: "Bungalows", years: "2024", lon: 74.11, lat: 16.812 },
    { name: "Ichalkaranji", type: "Commercial complex", years: "2021", lon: 74.46, lat: 16.691 },
    { name: "Kagal", type: "Public building", years: "2018", lon: 74.315, lat: 16.577 },
    { name: "Radhanagari", type: "Farmhouse", years: "2020", lon: 73.998, lat: 16.413 },
    { name: "Gadhinglaj", type: "Public building", years: "2019", lon: 74.35, lat: 16.223 }
  ];

  const isSmall = Math.min(window.innerWidth, window.innerHeight) < 600;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const hasGL = (() => { try { const c = document.createElement("canvas"); return !!(window.THREE && (c.getContext("webgl") || c.getContext("experimental-webgl"))); } catch (e) { return false; } })();
  const cs = m => { m.castShadow = true; m.receiveShadow = true; return m; };

  function renderSites() {
    document.getElementById("siteRows").innerHTML = SITES.map((s, i) =>
      `<li><button type="button" aria-pressed="${i ? "false" : "true"}"><span class="nm">${s.name}</span><span class="ty">${s.type}</span><span class="yr">${s.years}</span></button></li>`).join("");
  }

  function initHeader() {
    const bar = document.getElementById("bar");
    const on = () => bar.classList.toggle("solid", window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true }); on();
  }

  function initSlider() {
    const ba = document.querySelector(".ba"); if (!ba) return;
    const range = ba.querySelector("input");
    const set = v => { v = clamp(v, 0, 100); ba.style.setProperty("--pos", v + "%"); range.value = Math.round(v); };
    const fromEvent = e => { const r = ba.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); };
    let down = false, sx = 0, sy = 0, decided = false, horiz = false;
    ba.addEventListener("pointerdown", e => { down = true; decided = e.pointerType === "mouse"; horiz = decided; sx = e.clientX; sy = e.clientY; if (horiz) { fromEvent(e); ba.setPointerCapture(e.pointerId); } });
    ba.addEventListener("pointermove", e => {
      if (!down) return;
      if (!decided) { const dx = Math.abs(e.clientX - sx), dy = Math.abs(e.clientY - sy); if (dx + dy > 6) { decided = true; horiz = dx > dy; if (horiz) ba.setPointerCapture(e.pointerId); } }
      if (horiz) fromEvent(e);
    });
    const up = () => { down = false; };
    ba.addEventListener("pointerup", up); ba.addEventListener("pointercancel", up);
    range.addEventListener("input", () => set(+range.value));
  }

  function initForm() {
    const form = document.getElementById("enq");
    form.addEventListener("submit", e => {
      e.preventDefault();
      const ok = form.checkValidity();
      form.querySelectorAll("input, select, textarea").forEach(f => f.setAttribute("aria-invalid", f.checkValidity() ? "false" : "true"));
      document.getElementById("enqErr").hidden = ok;
      document.getElementById("enqOk").hidden = !ok;
      if (!ok) form.querySelector(":invalid").focus();
    });
  }

  // ---------- Footprint: clay relief model of the district ----------
  const LON0 = 73.88, LON1 = 74.62, LAT0 = 16.16, LAT1 = 16.9, SIZE = 180;
  const toX = lon => (lon - LON0) / (LON1 - LON0) * SIZE - SIZE / 2;
  const toZ = lat => SIZE / 2 - (lat - LAT0) / (LAT1 - LAT0) * SIZE;
  function hash(x, y) { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); }
  function vnoise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  const fbm = (x, y) => { let s = 0, a = 0.5, f = 1; for (let i = 0; i < 4; i++) { s += a * vnoise(x * f, y * f); f *= 2; a *= 0.5; } return s; };
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };

  function initMap() {
    const stage = document.getElementById("mapStage");
    const canvas = document.getElementById("mapCanvas");
    const buttons = [...document.querySelectorAll("#siteRows button")];
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xffffff, 0xb9b0a2, 0.8));
    const sun = new THREE.DirectionalLight(0xffffff, 0.9); sun.position.set(-120, 110, 60); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -110, right: 110, top: 110, bottom: -110, near: 10, far: 400 }); sun.shadow.bias = -0.0008;
    scene.add(sun);
    const camera = new THREE.PerspectiveCamera(32, 1, 1, 1000);

    const riverLL = [[73.9, 16.865], [74.03, 16.83], [74.12, 16.795], [74.17, 16.78], [74.205, 16.748], [74.25, 16.728], [74.33, 16.722], [74.4, 16.706], [74.46, 16.697], [74.6, 16.68]];
    const branchLL = [[73.99, 16.4], [74.04, 16.5], [74.09, 16.62], [74.13, 16.72], [74.17, 16.78]];
    const mkCurve = ll => new THREE.CatmullRomCurve3(ll.map(([lo, la]) => new THREE.Vector3(toX(lo), 0, toZ(la))));
    const rivers = [mkCurve(riverLL), mkCurve(branchLL)];
    const riverPts = rivers.flatMap(c => c.getPoints(160));
    const distRiver = (x, z) => { let m = 1e9; for (const p of riverPts) { const d = (p.x - x) ** 2 + (p.z - z) ** 2; if (d < m) m = d; } return Math.sqrt(m); };
    const heightAt = (x, z) => {
      const west = smooth(20, -85, x);
      let h = west * 17 * (0.45 + 0.75 * fbm(x * 0.035 + 3, z * 0.035));
      h += fbm(x * 0.07, z * 0.07) * 3.0;
      h *= 0.25 + 0.75 * smooth(1.5, 14, distRiver(x, z));
      return h;
    };
    const seg = isSmall ? 90 : 150;
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, seg, seg); geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const low = new THREE.Color(0xf1ece2), high = new THREE.Color(0xd7cfc0), tmp = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i), h = heightAt(x, z);
      pos.setY(i, h);
      tmp.copy(low).lerp(high, clamp(h / 16)).convertSRGBToLinear();
      colors[i * 3] = tmp.r; colors[i * 3 + 1] = tmp.g; colors[i * 3 + 2] = tmp.b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    scene.add(cs(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }))));
    const sideMat = new THREE.MeshStandardMaterial({ color: 0xbdb3a2, roughness: 1 });
    const board = cs(new THREE.Mesh(new THREE.BoxGeometry(SIZE, 5, SIZE), sideMat)); board.position.y = -2.55; scene.add(board);
    const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(800, 800), new THREE.ShadowMaterial({ opacity: 0.18 })); shadowPlane.rotation.x = -Math.PI / 2; shadowPlane.position.y = -5.05; shadowPlane.receiveShadow = true; scene.add(shadowPlane);
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x5f8fa8, roughness: 0.5 });
    rivers.forEach((c, i) => {
      const pts = c.getPoints(120).map(p => new THREE.Vector3(p.x, heightAt(p.x, p.z) + 0.3, p.z));
      scene.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 240, i ? 0.55 : 0.9, 6), waterMat));
    });
    const gold = new THREE.MeshStandardMaterial({ color: 0xe8a50c, roughness: 0.55 });
    const charcoal = new THREE.MeshStandardMaterial({ color: 0x1e1a17, roughness: 0.7 });
    const pins = SITES.map((s, i) => {
      const x = toX(s.lon), z = toZ(s.lat), y = heightAt(x, z);
      const g = new THREE.Group(); g.position.set(x, y, z);
      const len = s.hq ? 9 : 6;
      const stem = cs(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, len, 8), charcoal)); stem.position.y = len / 2; g.add(stem);
      const head = cs(new THREE.Mesh(new THREE.BoxGeometry(s.hq ? 3.2 : 2.2, s.hq ? 1.0 : 0.7, s.hq ? 3.2 : 2.2), s.hq ? gold : charcoal)); head.position.y = len; g.add(head);
      scene.add(g);
      const label = document.createElement("button");
      label.type = "button"; label.className = "pin-label" + (s.hq ? " hq" : ""); label.textContent = s.name; label.style.visibility = "hidden";
      label.tabIndex = -1; label.setAttribute("aria-hidden", "true");
      label.addEventListener("click", () => select(i));
      stage.appendChild(label);
      return { head, label, top: new THREE.Vector3(x, y + len + 1.5, z), base: new THREE.Vector3(x, y, z), hq: s.hq };
    });

    const cam = { az: 0.3, pol: 0.82, rad: 380, tx: 0, tz: 12 }, goal = { az: 0.3, rad: 380, tx: 0, tz: 12 };
    let active = 0, dragging = false, lastX = 0, sx = 0, sy = 0, decided = false, horiz = false, visible = false, dirty = true;
    function select(i) {
      active = i;
      buttons.forEach((b, j) => b.setAttribute("aria-pressed", j === i ? "true" : "false"));
      pins.forEach((p, j) => { p.label.classList.toggle("on", j === i); p.head.material = j === i || p.hq ? gold : charcoal; });
      goal.tx = pins[i].base.x * 0.5; goal.tz = pins[i].base.z * 0.5; goal.rad = 280; dirty = true;
    }
    buttons.forEach((b, i) => b.addEventListener("click", () => select(i)));
    select(0); goal.rad = 380; goal.tx = 0; goal.tz = 12;

    stage.addEventListener("pointerdown", e => { if (e.target.classList.contains("pin-label")) return; dragging = true; decided = e.pointerType === "mouse"; horiz = decided; sx = lastX = e.clientX; sy = e.clientY; if (horiz) { stage.setPointerCapture(e.pointerId); stage.classList.add("dragging"); } });
    stage.addEventListener("pointermove", e => {
      if (!dragging) return;
      if (!decided) { const dx = Math.abs(e.clientX - sx), dy = Math.abs(e.clientY - sy); if (dx + dy > 6) { decided = true; horiz = dx > dy; if (horiz) { stage.setPointerCapture(e.pointerId); stage.classList.add("dragging"); } } }
      if (!horiz) return;
      goal.az -= (e.clientX - lastX) * 0.006; lastX = e.clientX; dirty = true;
    });
    const end = () => { dragging = false; stage.classList.remove("dragging"); };
    stage.addEventListener("pointerup", end); stage.addEventListener("pointercancel", end);
    function resize() {
      const w = stage.clientWidth, h = stage.clientHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      stage.classList.toggle("compact", w < 560); dirty = true;
    }
    window.addEventListener("resize", resize); resize();
    new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) dirty = true; }).observe(stage);
    const v = new THREE.Vector3();
    (function loop() {
      requestAnimationFrame(loop);
      if (!visible) return;
      const k = reduced ? 1 : 0.1;
      const d = Math.abs(goal.az - cam.az) + Math.abs(goal.rad - cam.rad) + Math.abs(goal.tx - cam.tx) + Math.abs(goal.tz - cam.tz);
      if (d < 0.01 && !dirty) return;
      dirty = false;
      cam.az += (goal.az - cam.az) * k; cam.rad += (goal.rad - cam.rad) * k; cam.tx += (goal.tx - cam.tx) * k; cam.tz += (goal.tz - cam.tz) * k;
      const r = cam.rad * (camera.aspect < 0.9 ? 1.3 : 1);
      camera.position.set(cam.tx + r * Math.sin(cam.pol) * Math.sin(cam.az), r * Math.cos(cam.pol), cam.tz + r * Math.sin(cam.pol) * Math.cos(cam.az));
      camera.lookAt(cam.tx, 0, cam.tz);
      renderer.render(scene, camera);
      // Place labels without overlaps: HQ and the selected place first, then try above, right, left and below each pin
      const placed = [];
      const order = pins.map((p, j) => j).sort((a, b) => (pins[b].hq * 2 + pins[b].label.classList.contains("on")) - (pins[a].hq * 2 + pins[a].label.classList.contains("on")));
      order.forEach(j => {
        const p = pins[j];
        v.copy(p.top).project(camera);
        const x = (v.x * 0.5 + 0.5) * stage.clientWidth, y = (-v.y * 0.5 + 0.5) * stage.clientHeight;
        if (!p.label.offsetWidth) return;
        const w = p.label.offsetWidth, h = p.label.offsetHeight;
        const tries = [[x - w / 2, y - h], [x + 8, y - h / 2], [x - w - 8, y - h / 2], [x - w / 2, y + 14]];
        const fit = tries.find(([l, t]) => !placed.some(q => l < q[0] + q[2] && l + w > q[0] && t < q[1] + q[3] && t + h > q[1]));
        const hide = v.z > 1 || (!fit && !p.hq && !p.label.classList.contains("on"));
        p.label.style.visibility = hide ? "hidden" : "";
        if (hide) return;
        const [l, t] = fit || tries[0];
        placed.push([l, t, w, h]);
        p.label.style.transform = `translate(${l}px, ${t}px)`;
      });
    })();
  }


  renderSites(); initHeader(); initSlider(); initForm();
  if (!hasGL) { document.getElementById("mapStage").hidden = true; return; }
  try { initMap(); } catch (e) { console.error(e); document.getElementById("mapStage").hidden = true; }
})();
