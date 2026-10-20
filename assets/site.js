(function () {
  "use strict";

  // ---------- Content (sample until confirmed) ----------
  const STORY = [
    { fl: "Ground floor", year: "2004", title: "A yard in Shinganapur", text: "The firm starts beside the Panchganga with one yard and a crew of six." },
    { fl: "1st floor", year: "2008", title: "First apartment building", text: "Four storeys in Kolhapur city, handed over on the promised date." },
    { fl: "2nd floor", year: "2011", title: "25 families housed", text: "Most new work now comes from people who live in our buildings." },
    { fl: "3rd floor", year: "2013", title: "Shops and offices", text: "Our first commercial complex, in Ichalkaranji." },
    { fl: "4th floor", year: "2016", title: "Industrial sheds", text: "Steel-frame sheds for units at Shiroli MIDC." },
    { fl: "5th floor", year: "2019", title: "100 projects", text: "Homes, schools and a hospital wing across six talukas." },
    { fl: "6th floor", year: "2024", title: "The next generation", text: "Same yard, a larger team, and taller buildings." },
    { fl: "Roof", year: "Today", title: "Your building next", text: "Tell us about your plot and we will visit the site.", cta: true }
  ];
  const PROJECTS = [
    { name: "Sample Residency", mr: "सॅम्पल रेसिडेन्सी", kind: "apartment", type: "Residential, G+6", place: "Kolhapur city", year: "2023", area: "42,000 sq ft" },
    { name: "Sample Trade Centre", mr: "सॅम्पल ट्रेड सेंटर", kind: "commercial", type: "Shops and offices, G+3", place: "Ichalkaranji", year: "2021", area: "28,500 sq ft" },
    { name: "Sample Bungalow", mr: "सॅम्पल बंगला", kind: "bungalow", type: "Private house, G+1", place: "Panhala road", year: "2024", area: "3,200 sq ft" }
  ];
  const SERVICES = [
    { t: "Design and approvals", d: "Plans, structural design and municipal approvals, prepared with our own architects and engineers." },
    { t: "Turnkey construction", d: "Foundation to finishing with our own site team, materials and supervision. No subcontracted surprises." },
    { t: "Project management", d: "One site engineer, a weekly progress report, and a schedule you can hold us to." },
    { t: "Interiors and finishing", d: "Tiles, woodwork, painting and fittings, so the building is ready to move into on handover day." }
  ];
  const STEPS = [
    { t: "Site visit and estimate", d: "We walk the plot with you, listen to what you need, and give a clear written estimate." },
    { t: "Design and approval", d: "Drawings, structure and permissions are finished before any work starts on site." },
    { t: "Build and hand over", d: "Our team builds to the drawings and hands over a finished building, with every bill on record." }
  ];
  const SITES = [
    { name: "Shinganapur", type: "Office and yard", years: "since 2004", lon: 74.205, lat: 16.735, hq: true },
    { name: "Kolhapur city", type: "Apartment buildings", years: "2008 to now", lon: 74.243, lat: 16.705 },
    { name: "Shiroli MIDC", type: "Industrial sheds", years: "2016", lon: 74.285, lat: 16.757 },
    { name: "Panhala", type: "Bungalows", years: "2024", lon: 74.11, lat: 16.812 },
    { name: "Ichalkaranji", type: "Commercial complex", years: "2021", lon: 74.46, lat: 16.691 },
    { name: "Kagal", type: "School building", years: "2018", lon: 74.315, lat: 16.577 },
    { name: "Radhanagari", type: "Farmhouse", years: "2020", lon: 73.998, lat: 16.413 },
    { name: "Gadhinglaj", type: "Hospital wing", years: "2019", lon: 74.35, lat: 16.223 }
  ];

  const isSmall = Math.min(window.innerWidth, window.innerHeight) < 600;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const hasGL = (() => { try { const c = document.createElement("canvas"); return !!(window.THREE && (c.getContext("webgl") || c.getContext("experimental-webgl"))); } catch (e) { return false; } })();

  // ---------- Page content ----------
  function renderContent() {
    document.getElementById("milestones").innerHTML = STORY.map((s, i) =>
      `<li class="milestone${i === 0 ? " on" : ""}" data-i="${i}"><div class="fl label">${s.fl} · ${s.year}</div><h3>${s.title}</h3><p>${s.text}</p>${s.cta ? '<p><a class="btn" href="#contact">Discuss your project</a></p>' : ""}</li>`).join("");
    const cols = (list) => list.map((c, i) => `<div class="col"><span class="num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><h3>${c.t}</h3><p>${c.d}</p></div>`).join("");
    document.getElementById("serviceCols").innerHTML = cols(SERVICES);
    document.getElementById("stepCols").innerHTML = cols(STEPS);
    document.getElementById("projList").innerHTML = PROJECTS.map((p, i) =>
      `<article class="proj">
        <div class="ba" id="ba${i}">
          <div class="still-pending">Loading model</div>
          <span class="tag l label">Plot</span><span class="tag r label">Handed over</span>
          <div class="line"></div><div class="knob"></div>
          <input type="range" min="0" max="100" value="50" aria-label="Compare the plot and the finished building for ${p.name}">
        </div>
        <h3>${p.name}</h3><p class="mr" lang="mr">${p.mr}</p>
        <dl><dt>Type</dt><dd>${p.type}</dd><dt>Place</dt><dd>${p.place}</dd><dt>Handed over</dt><dd>${p.year}</dd><dt>Built area</dt><dd>${p.area}</dd></dl>
      </article>`).join("");
    document.getElementById("siteRows").innerHTML = SITES.map((s, i) =>
      `<tr><td><button type="button" data-i="${i}" aria-pressed="${s.hq ? "true" : "false"}"><span class="n">${s.name}</span><span class="y">${s.years}</span><span class="t">${s.type}</span></button></td></tr>`).join("");
    document.getElementById("enq").addEventListener("submit", e => { e.preventDefault(); document.getElementById("enqOk").hidden = false; });
  }

  function initSliders() {
    document.querySelectorAll(".ba").forEach(ba => {
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
      ba.addEventListener("click", e => { if (e.pointerType !== "mouse") fromEvent(e); range.focus({ preventScroll: true }); });
      range.addEventListener("input", () => set(+range.value));
    });
  }

  if (!hasGL) {
    renderContent(); initSliders();
    document.querySelectorAll(".still-pending").forEach(el => { el.textContent = "Model view needs a browser with 3D graphics"; });
    document.getElementById("mapStage").hidden = true;
    return;
  }

  // ---------- Geometry helpers ----------
  function mergeBoxes(list) {
    const pos = [], nor = [], uv = [], idx = [];
    const tmp = new THREE.BoxGeometry(1, 1, 1);
    const p = tmp.attributes.position, n = tmp.attributes.normal, ix = tmp.index.array;
    let off = 0;
    for (const b of list) {
      for (let i = 0; i < p.count; i++) {
        pos.push(p.getX(i) * b.sx + b.x, p.getY(i) * b.sy + b.y, p.getZ(i) * b.sz + b.z);
        nor.push(n.getX(i), n.getY(i), n.getZ(i));
        uv.push(0, 0);
      }
      for (let i = 0; i < ix.length; i++) idx.push(ix[i] + off);
      off += p.count;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    return g;
  }

  // Clay "study model" materials: white card for structure, warm grey for glass, gold for the active slab
  function clayKit() {
    return {
      clay: new THREE.MeshStandardMaterial({ color: 0xf4f0e8, roughness: 0.95 }),
      clayShade: new THREE.MeshStandardMaterial({ color: 0xe2dccf, roughness: 0.95 }),
      base: new THREE.MeshStandardMaterial({ color: 0xcfc7b8, roughness: 1 }),
      glass: new THREE.MeshStandardMaterial({ color: 0x8d9293, roughness: 0.35, metalness: 0.15 }),
      frame: new THREE.MeshStandardMaterial({ color: 0x5b554e, roughness: 0.6 }),
      gold: new THREE.MeshStandardMaterial({ color: 0xe8a50c, roughness: 0.6 }),
      rail: new THREE.MeshStandardMaterial({ color: 0xbfc4c4, roughness: 0.3, transparent: true, opacity: 0.55 }),
      shadow: new THREE.ShadowMaterial({ opacity: 0.22 })
    };
  }

  function setupLights(scene, size) {
    scene.add(new THREE.HemisphereLight(0xffffff, 0xb9b0a2, 0.75));
    const sun = new THREE.DirectionalLight(0xffffff, 0.95);
    sun.position.set(-40, 70, 45);
    sun.castShadow = true;
    sun.shadow.mapSize.set(size, size);
    Object.assign(sun.shadow.camera, { left: -45, right: 45, top: 45, bottom: -45, near: 10, far: 220 });
    sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.02;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xfff2dd, 0.25); fill.position.set(50, 20, -30); scene.add(fill);
  }

  const cs = m => { m.castShadow = true; m.receiveShadow = true; return m; };

  // Dusk materials: plastered walls, dark frames, lit windows. Same builders, different finish.
  function duskKit() {
    return {
      clay: new THREE.MeshStandardMaterial({ color: 0xc9c1b5, roughness: 0.92 }),
      clayShade: new THREE.MeshStandardMaterial({ color: 0x9d958a, roughness: 0.95 }),
      base: new THREE.MeshStandardMaterial({ color: 0x3a3631, roughness: 1 }),
      glass: new THREE.MeshStandardMaterial({ color: 0x3a2410, emissive: 0xffa24a, emissiveIntensity: 0.95, roughness: 0.4 }),
      frame: new THREE.MeshStandardMaterial({ color: 0x2b2622, roughness: 0.6 }),
      gold: new THREE.MeshStandardMaterial({ color: 0xe8a50c, roughness: 0.6 }),
      rail: new THREE.MeshStandardMaterial({ color: 0x9fb0b8, roughness: 0.2, transparent: true, opacity: 0.35 }),
      shadow: new THREE.ShadowMaterial({ opacity: 0.35 }),
      leaf: new THREE.MeshStandardMaterial({ color: 0x2c3a24, roughness: 1 }),
      leaf2: new THREE.MeshStandardMaterial({ color: 0x1c2618, roughness: 1 }),
      bark: new THREE.MeshStandardMaterial({ color: 0x2e241c, roughness: 1 }),
      lawn: new THREE.MeshStandardMaterial({ color: 0x1f231a, roughness: 1 }),
      paving: new THREE.MeshStandardMaterial({ color: 0x55504a, roughness: 0.95 })
    };
  }

  function duskLights(scene, size, span) {
    scene.add(new THREE.HemisphereLight(0x8090a6, 0x2a2420, 0.62));
    const moon = new THREE.DirectionalLight(0xaebcd2, 0.42);
    moon.position.set(-50, 60, 30); moon.castShadow = true;
    moon.shadow.mapSize.set(size, size);
    Object.assign(moon.shadow.camera, { left: -span, right: span, top: span, bottom: -span, near: 10, far: 260 });
    moon.shadow.bias = -0.0005; moon.shadow.normalBias = 0.02;
    scene.add(moon);
    const glow = new THREE.DirectionalLight(0xffb070, 0.35); glow.position.set(60, 12, 40); scene.add(glow);
  }

  // Seeded random so the trees land in the same places on every visit
  function rng(seed) { return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  // Trees: a trunk with two or three limbs and a canopy built from many small leaf clumps
  const blobGeo = new THREE.IcosahedronGeometry(1, 1);
  const trunkGeo = new THREE.CylinderGeometry(0.6, 1, 1, 7); trunkGeo.translate(0, 0.5, 0);
  function tree(K, r, h) {
    const g = new THREE.Group();
    const tw = h * 0.035;
    const trunk = cs(new THREE.Mesh(trunkGeo, K.bark)); trunk.scale.set(tw, h * 0.5, tw); g.add(trunk);
    const crowns = [];
    const limbs = 2 + Math.floor(r() * 2);
    for (let i = 0; i < limbs; i++) {
      const a = r() * Math.PI * 2, lean = 0.35 + r() * 0.35, len = h * (0.28 + r() * 0.12);
      const limb = cs(new THREE.Mesh(trunkGeo, K.bark)); limb.scale.set(tw * 0.55, len, tw * 0.55);
      limb.position.y = h * 0.42; limb.rotation.set(Math.cos(a) * lean, 0, Math.sin(a) * lean); g.add(limb);
      crowns.push(new THREE.Vector3(-Math.sin(a) * lean * len * 0.9, h * 0.42 + len * 0.85, Math.cos(a) * lean * len * 0.9));
    }
    crowns.push(new THREE.Vector3(0, h * 0.78, 0));
    const R = h * 0.3;
    crowns.forEach(c => {
      const n = 7 + Math.floor(r() * 5);
      for (let i = 0; i < n; i++) {
        const b = cs(new THREE.Mesh(blobGeo, r() > 0.45 ? K.leaf : K.leaf2));
        const s = R * (0.28 + r() * 0.22);
        b.scale.set(s, s * (0.7 + r() * 0.25), s);
        const u = r() * Math.PI * 2, v = r() * 0.9;
        b.position.set(c.x + Math.cos(u) * v * R * 0.75, c.y + (r() - 0.35) * R * 0.6, c.z + Math.sin(u) * v * R * 0.75);
        b.rotation.set(r() * 3, r() * 3, r() * 3);
        g.add(b);
      }
    });
    return g;
  }
  // Grounds: lawn, a paved forecourt, and trees kept out of the camera's line of sight
  function grounds(K, w, d, camDir, seed, count) {
    const g = new THREE.Group();
    const lawn = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), K.lawn); lawn.rotation.x = -Math.PI / 2; lawn.position.y = -0.02; lawn.receiveShadow = true; g.add(lawn);
    const pave = new THREE.Mesh(new THREE.PlaneGeometry(w, d), K.paving); pave.rotation.x = -Math.PI / 2; pave.receiveShadow = true; g.add(pave);
    const r = rng(seed);
    for (let i = 0; i < count; i++) {
      const a = r() * Math.PI * 2, dist = Math.max(w, d) * 0.62 + r() * 70;
      const x = Math.cos(a) * dist, z = Math.sin(a) * dist;
      const along = (x * camDir[0] + z * camDir[1]) / dist;
      if (along > 0.55 && dist < 70) continue;
      const t = tree(K, r, 7 + r() * 9); t.position.set(x, 0, z); t.rotation.y = r() * 6; g.add(t);
    }
    return g;
  }
  function duskSky(scene, w, h) {
    const c = document.createElement("canvas"); c.width = 4; c.height = 256;
    const x = c.getContext("2d"), gr = x.createLinearGradient(0, 0, 0, 256);
    gr.addColorStop(0, "#1a1d24"); gr.addColorStop(0.55, "#3d4049"); gr.addColorStop(0.8, "#6b5e55"); gr.addColorStop(1, "#8a7466");
    x.fillStyle = gr; x.fillRect(0, 0, 4, 256);
    const tex = new THREE.CanvasTexture(c); tex.encoding = THREE.sRGBEncoding;
    scene.background = tex;
    scene.fog = new THREE.Fog(0x4a4547, 70, 230);
  }
  // Warm light spilling out of the ground floor onto the forecourt
  function porchLights(scene, pts) { pts.forEach(p => { const l = new THREE.PointLight(0xffa04a, 0.9, 22, 2); l.position.set(...p); scene.add(l); }); }

  // Model base board, like an architect's study model
  function baseBoard(K, w, d) {
    const g = new THREE.Group();
    const board = cs(new THREE.Mesh(new THREE.BoxGeometry(w, 0.8, d), K.base)); board.position.y = -0.4; g.add(board);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), K.shadow); ground.rotation.x = -Math.PI / 2; ground.position.y = -0.8; ground.receiveShadow = true; g.add(ground);
    return g;
  }

  // Apartment block: columns, slabs, walls with openings, sunshades, balconies, roof tanks
  function buildApartment(K, opts) {
    const FLOORS = opts.floors || 7, H = 3.2, W = 16, D = 10, BASE = 0.6, SLAB = 0.3, WT = 0.23;
    const root = new THREE.Group();
    const plinth = cs(new THREE.Mesh(new THREE.BoxGeometry(W + 1.2, BASE, D + 1.2), K.clayShade)); plinth.position.y = BASE / 2; root.add(plinth);
    const colX = [0, 1, 2, 3].map(i => -W / 2 + 0.4 + i * (W - 0.8) / 3);
    const colZ = [-D / 2 + 0.4, 0, D / 2 - 0.4];
    const colGeo = new THREE.BoxGeometry(0.5, H, 0.5); colGeo.translate(0, H / 2, 0);
    const slabGeo = new THREE.BoxGeometry(W + 0.6, SLAB, D + 0.6);
    const wallH = H - SLAB;

    function facade(f) {
      const walls = [], shades = [], frames = [], glass = [], rails = [];
      function wall(axis, c, a0, a1, s, open) {
        const len = a1 - a0, mid = (a0 + a1) / 2;
        const box = (along, y, alen, h, out, depth) => axis === "x"
          ? { x: along, y, z: c + s * out, sx: alen, sy: h, sz: depth }
          : { x: c + s * out, y, z: along, sx: depth, sy: h, sz: alen };
        const ow = Math.min(open.w, len - 0.3), side = (len - ow) / 2, top = open.sill + open.h;
        walls.push(box(a0 + side / 2, wallH / 2, side, wallH, 0, WT), box(a1 - side / 2, wallH / 2, side, wallH, 0, WT));
        if (open.sill > 0) walls.push(box(mid, open.sill / 2, ow, open.sill, 0, WT));
        walls.push(box(mid, (top + wallH) / 2, ow, wallH - top, 0, WT));
        const fw = 0.07;
        frames.push(box(mid, top - fw / 2, ow, fw, -0.02, 0.1), box(mid, open.sill + fw / 2, ow, fw, -0.02, 0.1), box(a0 + side + fw / 2, open.sill + open.h / 2, fw, open.h, -0.02, 0.1), box(a1 - side - fw / 2, open.sill + open.h / 2, fw, open.h, -0.02, 0.1), box(mid, open.sill + open.h / 2, fw * 0.8, open.h, -0.02, 0.1));
        glass.push(box(mid, open.sill + open.h / 2, ow - 0.1, open.h - 0.1, -0.04, 0.03));
        if (open.chajja) shades.push(box(mid, top + 0.2, ow + 0.5, 0.08, 0.3, 0.6));
        if (open.balcony) {
          const bw = len + 0.4;
          shades.push(box(mid, -0.1, bw, 0.22, 0.8, 1.4));
          rails.push(box(mid, 0.6, bw - 0.1, 1.0, 1.4, 0.03));
          frames.push(box(mid, 1.12, bw, 0.06, 1.4, 0.07));
          [a0 - 0.15, a1 + 0.15].forEach(e => frames.push(axis === "x" ? { x: e, y: 0.55, z: c + s * 1.4, sx: 0.07, sy: 1.1, sz: 0.07 } : { x: c + s * 1.4, y: 0.55, z: e, sx: 0.07, sy: 1.1, sz: 0.07 }));
        }
      }
      for (let i = 0; i < 3; i++) {
        const a0 = colX[i] + 0.25, a1 = colX[i + 1] - 0.25;
        wall("x", D / 2 - 0.4, a0, a1, 1, f === 0 ? { w: 4.0, h: 2.5, sill: 0, chajja: true } : i === 1 ? { w: 2.4, h: 2.2, sill: 0, balcony: true } : { w: 2.1, h: 1.4, sill: 0.9, chajja: true });
        wall("x", -(D / 2 - 0.4), a0, a1, -1, { w: 1.6, h: 1.2, sill: 1.0, chajja: true });
      }
      for (let k = 0; k < 2; k++) {
        const a0 = colZ[k] + 0.25, a1 = colZ[k + 1] - 0.25;
        [1, -1].forEach(s => wall("z", s * (W / 2 - 0.4), a0, a1, s, { w: 1.6, h: 1.3, sill: 0.9, chajja: true }));
      }
      return { walls, shades, frames, glass, rails };
    }

    const floors = [];
    for (let f = 0; f < FLOORS; f++) {
      const base = BASE + f * H;
      const cols = [];
      colX.forEach(x => colZ.forEach(z => { const c = cs(new THREE.Mesh(colGeo, K.clay)); c.position.set(x, base, z); root.add(c); cols.push(c); }));
      const slab = cs(new THREE.Mesh(slabGeo, K.clay)); slab.position.y = base + H - SLAB / 2; root.add(slab);
      const fc = facade(f);
      const walls = new THREE.Group(); walls.position.y = base; root.add(walls);
      walls.add(cs(new THREE.Mesh(mergeBoxes(fc.walls), K.clay)));
      const finish = new THREE.Group(); finish.position.y = base; root.add(finish);
      finish.add(cs(new THREE.Mesh(mergeBoxes(fc.shades), K.clay)));
      finish.add(cs(new THREE.Mesh(mergeBoxes(fc.frames), K.frame)));
      finish.add(new THREE.Mesh(mergeBoxes(fc.glass), K.glass));
      if (fc.rails.length) finish.add(new THREE.Mesh(mergeBoxes(fc.rails), K.rail));
      floors.push({ base, cols, slab, walls, finish });
    }
    const roofY = BASE + FLOORS * H;
    const roof = new THREE.Group(); roof.position.y = roofY; root.add(roof);
    roof.add(cs(new THREE.Mesh(mergeBoxes([
      { x: 0, y: 0.5, z: D / 2 + 0.2, sx: W + 0.6, sy: 1, sz: 0.2 }, { x: 0, y: 0.5, z: -D / 2 - 0.2, sx: W + 0.6, sy: 1, sz: 0.2 },
      { x: W / 2 + 0.2, y: 0.5, z: 0, sx: 0.2, sy: 1, sz: D + 0.6 }, { x: -W / 2 - 0.2, y: 0.5, z: 0, sx: 0.2, sy: 1, sz: D + 0.6 },
      { x: -4, y: 1.4, z: -1.5, sx: 3.4, sy: 2.8, sz: 3.6 }]), K.clay)));
    const tankGeo = new THREE.CylinderGeometry(1.0, 1.0, 1.5, 28);
    const t1 = cs(new THREE.Mesh(tankGeo, K.clayShade)); t1.position.set(-4, 3.55, -1.5); roof.add(t1);
    const t2 = cs(new THREE.Mesh(tankGeo, K.clayShade)); t2.position.set(-1.4, 0.75, -1.5); roof.add(t2);
    return { root, floors, roof, H, BASE, SLAB, FLOORS, height: roofY + 3.5 };
  }

  function buildCommercial(K) {
    const root = new THREE.Group(), W = 24, D = 12, H = 3.8, N = 4;
    const parts = [], glass = [], frames = [];
    parts.push({ x: 0, y: 0.3, z: 0, sx: W + 1.2, sy: 0.6, sz: D + 1.2 });
    for (let f = 0; f < N; f++) {
      const y0 = 0.6 + f * H;
      parts.push({ x: 0, y: y0 + H - 0.25, z: 0, sx: W + 0.8, sy: 0.5, sz: D + 0.8 });
      parts.push({ x: 0, y: y0 + 0.55, z: D / 2 - 0.1, sx: W, sy: 1.1, sz: 0.25 });
      glass.push({ x: 0, y: y0 + (f === 0 ? H / 2 - 0.2 : 2.2), z: D / 2 - 0.25, sx: W - 0.6, sy: f === 0 ? H - 0.6 : 2.0, sz: 0.06 });
      for (let i = 0; i <= 8; i++) frames.push({ x: -W / 2 + 0.3 + i * (W - 0.6) / 8, y: y0 + H / 2 - 0.1, z: D / 2 - 0.15, sx: 0.12, sy: H - 0.6, sz: 0.14 });
      parts.push({ x: 0, y: y0 + H / 2, z: -0.2, sx: W - 0.2, sy: H - 0.4, sz: D - 0.6 });
      [-1, 1].forEach(s => parts.push({ x: s * (W / 2 - 0.1), y: y0 + H / 2, z: 0, sx: 0.3, sy: H, sz: D }));
    }
    parts.push({ x: -W / 2 + 4, y: 0.6 + N * H + 0.8, z: 0, sx: 6, sy: 1.6, sz: 0.3 });
    root.add(cs(new THREE.Mesh(mergeBoxes(parts), K.clay)));
    root.add(new THREE.Mesh(mergeBoxes(glass), K.glass));
    root.add(cs(new THREE.Mesh(mergeBoxes(frames), K.frame)));
    const sign = cs(new THREE.Mesh(new THREE.BoxGeometry(5.6, 1.2, 0.1), K.gold)); sign.position.set(-W / 2 + 4, 0.6 + N * H + 0.8, 0.22); root.add(sign);
    return { root, height: 0.6 + N * H + 2 };
  }

  function buildBungalow(K) {
    const root = new THREE.Group(), W = 12, D = 9, H = 3.1;
    const parts = [{ x: 0, y: 0.35, z: 0, sx: W + 1.4, sy: 0.7, sz: D + 1.4 }];
    for (let f = 0; f < 2; f++) {
      const y0 = 0.7 + f * H;
      parts.push({ x: 0, y: y0 + H / 2, z: 0, sx: W, sy: H - 0.2, sz: D });
      parts.push({ x: 0, y: y0 + H - 0.1, z: 0, sx: W + 0.8, sy: 0.25, sz: D + 0.8 });
    }
    parts.push({ x: 3.5, y: 0.7 + H - 0.1, z: D / 2 + 1.6, sx: 5, sy: 0.25, sz: 3.2 });
    [1.4, 5.6].forEach(x => parts.push({ x, y: 0.7 + (H - 0.2) / 2, z: D / 2 + 2.9, sx: 0.35, sy: H - 0.2, sz: 0.35 }));
    root.add(cs(new THREE.Mesh(mergeBoxes(parts), K.clay)));
    const glass = [], frames = [];
    [[-3.2, 1.8, 2.4, 1.5], [3.2, 1.7, 2.2, 2.4], [-3.2, 4.9, 2.4, 1.4], [2.4, 4.9, 3.6, 1.4]].forEach(([x, y, w, h]) => {
      glass.push({ x, y: y + 0.4, z: D / 2 + 0.02, sx: w, sy: h, sz: 0.05 });
      frames.push({ x, y: y + 0.4 + h / 2 + 0.05, z: D / 2 + 0.05, sx: w + 0.15, sy: 0.08, sz: 0.1 }, { x, y: y + 0.4 - h / 2 - 0.05, z: D / 2 + 0.05, sx: w + 0.15, sy: 0.08, sz: 0.1 });
    });
    root.add(new THREE.Mesh(mergeBoxes(glass), K.glass));
    root.add(cs(new THREE.Mesh(mergeBoxes(frames), K.frame)));
    const shape = new THREE.Shape(); shape.moveTo(-(W / 2 + 0.8), 0); shape.lineTo(W / 2 + 0.8, 0); shape.lineTo(0, 3.0); shape.lineTo(-(W / 2 + 0.8), 0);
    const roofGeo = new THREE.ExtrudeGeometry(shape, { depth: D + 1.2, bevelEnabled: false }); roofGeo.translate(0, 0, -(D + 1.2) / 2);
    const roof = cs(new THREE.Mesh(roofGeo, K.clayShade)); roof.position.y = 0.7 + 2 * H; root.add(roof);
    return { root, height: 0.7 + 2 * H + 3 };
  }

  // Empty plot: survey outline and pegs on the board
  function plotMarks(K, w, d) {
    const g = new THREE.Group();
    const pts = [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2], [-w / 2, -d / 2]].map(([x, z]) => new THREE.Vector3(x, 0.02, z));
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineDashedMaterial({ color: 0x645d55, dashSize: 0.6, gapSize: 0.4 })).computeLineDistances());
    const pegGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.1, 8); pegGeo.translate(0, 0.55, 0);
    pts.slice(0, 4).forEach(p => { const m = cs(new THREE.Mesh(pegGeo, K.frame)); m.position.copy(p); g.add(m); const flag = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.03), K.gold); flag.position.set(p.x + 0.3, 1.0, p.z); g.add(flag); });
    return g;
  }

  // ---------- Stills: hero image and before/after pairs, rendered once at dusk ----------
  function renderStills() {
    const canvas = document.createElement("canvas");
    const r = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
    r.setPixelRatio(1);
    r.outputEncoding = THREE.sRGBEncoding;
    r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap;
    const K = duskKit();
    const shoot = (W, H, build, cam, look, yard, opts = {}) => {
      r.setSize(W, H, false);
      const scene = new THREE.Scene(); duskSky(scene); duskLights(scene, 2048, 40);
      const cd = Math.hypot(cam[0], cam[2]);
      scene.add(grounds(K, yard[0], yard[1], [cam[0] / cd, cam[2] / cd], opts.seed || 7, opts.trees || 70));
      scene.add(build());
      porchLights(scene, opts.porch || []);
      const camera = new THREE.PerspectiveCamera(opts.fov || 28, W / H, 0.1, 600);
      camera.position.set(...cam); camera.lookAt(...look);
      if (opts.shift) { camera.setViewOffset(W, H, opts.shift * W, 0, W, H); }
      r.render(scene, camera);
      return canvas.toDataURL("image/jpeg", 0.86);
    };
    const out = {};
    const portrait = window.innerWidth < 860;
    const heroW = portrait ? 900 : 1680, heroH = portrait ? 1500 : 1000;
    out.hero = portrait
      ? shoot(heroW, heroH, () => buildApartment(K, {}).root, [-46, 3, 74], [0, 17, 0], [30, 22], { fov: 42, porch: [[-4, 2, 8], [4, 2, 8]], seed: 11, trees: 90 })
      : shoot(heroW, heroH, () => buildApartment(K, {}).root, [-34, 5, 58], [0, 13, 0], [30, 22], { fov: 34, shift: -0.17, porch: [[-4, 2, 8], [4, 2, 8]], seed: 11, trees: 90 });
    const cw = isSmall ? 720 : 900, ch = Math.round(cw * 1.25);
    const defs = {
      apartment: { build: () => buildApartment(K, {}).root, plot: [17, 11], yard: [30, 22], cam: [-30, 9, 44], look: [0, 11, 0], porch: [[-4, 2, 8], [4, 2, 8]] },
      commercial: { build: () => buildCommercial(K).root, plot: [25, 13], yard: [34, 22], cam: [-30, 7, 42], look: [0, 7, 0], porch: [[-6, 2, 9], [6, 2, 9]] },
      bungalow: { build: () => buildBungalow(K).root, plot: [16, 15], yard: [24, 22], cam: [-20, 5, 28], look: [0, 4, 2], porch: [[0, 2, 9]] }
    };
    PROJECTS.forEach((p, i) => {
      const d = defs[p.kind];
      const o = { fov: 36, porch: d.porch, seed: 20 + i, trees: 60 };
      out["before" + i] = shoot(cw, ch, () => plotMarks(K, d.plot[0], d.plot[1]), d.cam, d.look, d.yard, { ...o, porch: [] });
      out["after" + i] = shoot(cw, ch, d.build, d.cam, d.look, d.yard, o);
    });
    r.dispose(); try { r.forceContextLoss(); } catch (e) { /* ignore */ }
    return out;
  }

  function placeStills(s) {
    const img = new Image();
    img.alt = ""; img.src = s.hero;
    document.getElementById("heroBg").appendChild(img);
    requestAnimationFrame(() => img.classList.add("in"));
    PROJECTS.forEach((p, i) => {
      const ba = document.getElementById("ba" + i);
      ba.querySelector(".still-pending").remove();
      const before = new Image(); before.src = s["before" + i]; before.alt = "Empty plot with survey pegs";
      const after = document.createElement("div"); after.className = "after";
      after.innerHTML = `<img src="${s["after" + i]}" alt="Render of ${p.name} at dusk">`;
      ba.prepend(after); ba.prepend(before);
    });
  }

  // ---------- Story: the building rises one floor per chapter ----------
  function initStory() {
    const stage = document.getElementById("storyStage");
    const canvas = document.getElementById("storyCanvas");
    const caption = document.getElementById("storyCaption");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    // The same dusk finish as the hero: each floor's windows light up once it is finished
    const K = duskKit();
    K.gold = new THREE.MeshStandardMaterial({ color: 0xd48f00, roughness: 0.7 });
    const scene = new THREE.Scene(); duskLights(scene, isSmall ? 1024 : 2048, 40);
    const site = new THREE.Group();
    const pave = new THREE.Mesh(new THREE.BoxGeometry(30, 0.4, 22), K.paving); pave.position.y = -0.2; pave.receiveShadow = true; site.add(pave);
    const tr = rng(5);
    [[-12, -9], [-4, -9.5], [5, -9], [12.5, -8.5], [13, 1]].forEach(([x, z]) => { const t = tree(K, tr, 7 + tr() * 5); t.position.set(x, 0, z); site.add(t); });
    scene.add(site);
    porchLights(scene, [[-4, 2, 8], [4, 2, 8]]);
    const B = buildApartment(K, {});
    scene.add(B.root);
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 500);
    const state = B.floors.map(() => 0);
    let roofState = 0, active = 0, visible = false, dirty = true, scrollBias = 0;

    function applyFloors() {
      B.floors.forEach((fl, f) => {
        const s = state[f];
        const c = ease(clamp(s / 0.35));
        fl.cols.forEach(col => { col.visible = c > 0.001; col.scale.y = Math.max(0.001, c); });
        const k = clamp((s - 0.3) / 0.25);
        fl.slab.visible = k > 0; fl.slab.position.y = fl.base + B.H - B.SLAB / 2 + (1 - ease(k)) * 4;
        fl.slab.material = f === active && active < B.FLOORS ? K.gold : K.clay;
        const w = ease(clamp((s - 0.55) / 0.3));
        fl.walls.visible = w > 0; fl.walls.scale.y = Math.max(0.001, w);
        fl.finish.visible = s > 0.92;
      });
      B.roof.visible = roofState > 0.5;
    }
    function frame() {
      const built = state.reduce((a, v) => a + v, 0);
      const h = B.BASE + Math.max(1, built) * B.H;
      const wide = camera.aspect >= 1;
      const ang = -0.7 + scrollBias * 0.5;
      const rad = (wide ? 50 : 62) + h * 0.35;
      camera.position.set(Math.sin(ang) * rad, 14 + h * 0.55, Math.cos(ang) * rad);
      camera.lookAt(0, h * 0.5, 0);
    }
    function resize() {
      const w = stage.clientWidth, h = stage.clientHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h;
      camera.fov = camera.aspect < 0.9 ? 38 : 30;
      camera.updateProjectionMatrix(); dirty = true;
    }
    function setActive(i) {
      active = i;
      document.querySelectorAll(".milestone").forEach(el => el.classList.toggle("on", +el.dataset.i === i));
      caption.textContent = STORY[i].fl + " · " + STORY[i].year;
      dirty = true;
    }
    const items = [...document.querySelectorAll(".milestone")];
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) setActive(+e.target.dataset.i); });
    }, { rootMargin: isSmall ? "-60% 0px -25% 0px" : "-45% 0px -45% 0px" });
    items.forEach(el => io.observe(el));
    new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) dirty = true; }).observe(stage);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", () => {
      const sec = document.getElementById("story").getBoundingClientRect();
      scrollBias = clamp(-sec.top / Math.max(1, sec.height - window.innerHeight));
      if (visible) dirty = true;
    }, { passive: true });
    resize();
    let last = performance.now();
    (function loop(now) {
      requestAnimationFrame(loop);
      if (!visible) { last = now || performance.now(); return; }
      const dt = Math.min(0.05, ((now || performance.now()) - last) / 1000); last = now || performance.now();
      let moving = false;
      const speed = reduced ? 100 : 1.6;
      B.floors.forEach((_, f) => {
        const goal = f <= active ? 1 : 0;
        if (state[f] !== goal) {
          // build upward floor by floor, take down from the top
          const ready = goal === 1 ? (f === 0 || state[f - 1] > 0.9) : (f === B.FLOORS - 1 || state[f + 1] < 0.1);
          if (ready) { state[f] = goal ? Math.min(1, state[f] + dt * speed) : Math.max(0, state[f] - dt * speed * 1.5); moving = true; }
          else moving = true;
        }
      });
      const rg = active >= B.FLOORS ? 1 : 0;
      if (rg !== roofState && (rg === 0 || state[B.FLOORS - 1] > 0.95)) { roofState = rg; moving = true; }
      if (!moving && !dirty) return;
      dirty = false;
      applyFloors(); frame();
      renderer.render(scene, camera);
    })();
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
      label.type = "button"; label.className = "pin-label" + (s.hq ? " hq" : ""); label.textContent = s.name;
      label.tabIndex = -1; label.setAttribute("aria-hidden", "true");
      label.addEventListener("click", () => select(i));
      stage.appendChild(label);
      return { head, label, top: new THREE.Vector3(x, y + len + 1.5, z), base: new THREE.Vector3(x, y, z), hq: s.hq };
    });

    const cam = { az: 0.3, pol: 0.82, rad: 260, tx: 0, tz: 0 }, goal = { az: 0.3, rad: 260, tx: 0, tz: 0 };
    let active = 0, dragging = false, lastX = 0, sx = 0, sy = 0, decided = false, horiz = false, visible = false, dirty = true;
    function select(i) {
      active = i;
      buttons.forEach((b, j) => b.setAttribute("aria-pressed", j === i ? "true" : "false"));
      pins.forEach((p, j) => { p.label.classList.toggle("on", j === i); p.head.material = j === i || p.hq ? gold : charcoal; });
      goal.tx = pins[i].base.x * 0.5; goal.tz = pins[i].base.z * 0.5; goal.rad = 210; dirty = true;
    }
    buttons.forEach((b, i) => b.addEventListener("click", () => select(i)));
    select(0); goal.rad = 260; goal.tx = 0; goal.tz = 0;

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

  renderContent();
  initSliders();
  try { initStory(); } catch (e) { console.error(e); }
  try { initMap(); } catch (e) { console.error(e); }
  // Stills are rendered after first paint so the page text appears immediately
  setTimeout(() => { try { placeStills(renderStills()); } catch (e) { console.error(e); } }, 50);
})();
