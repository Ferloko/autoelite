(() => {
  const body = document.body;
  if (!body) return;

  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');
  const CONTACT_EMAIL = "ferlokgm@gmail.com";
  const EMAIL_API_ENDPOINT = "/api/send-email";

  if (hero && nav) {
    new IntersectionObserver(([entry]) => {
      nav.classList.toggle('on-light', entry.intersectionRatio < 0.05);
    }, { threshold: 0.05 }).observe(hero);
  }

  document.querySelectorAll('.reveal').forEach((el) => {
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    }, { threshold: 0.1 }).observe(el);
  });

  const DETAIL_PLANS = [
    { id: "credito", title: "Credito directo", desc: "Financiamiento bancario tradicional", rate: 0.009 },
    { id: "leasing", title: "Leasing", desc: "Cuotas mensuales, opcion de compra al final", rate: 0.0075 },
    { id: "contado", title: "Contado", desc: "Pago unico sin intereses", rate: 0 },
  ];

  const STATIC_DETAIL_CARS = {
    "page-detalle-bmw": {
      name: "BMW M3",
      price: 94582,
      mensual: 1429,
      enganche: 0.15,
      colors: [
        { name: "Negro Zafiro", hex: "#1a1a1a" },
        { name: "Blanco Alpino", hex: "#f2f2f0" },
        { name: "Azul Mediterraneo", hex: "#2b4b8c" },
        { name: "Gris Manhattan", hex: "#8a8d91" },
        { name: "Rojo Carmesi", hex: "#8b1a1a" },
      ],
    },
    "page-detalle-db12": {
      name: "Aston Martin DB12",
      price: 269888,
      mensual: 4078,
      enganche: 0.15,
      colors: [
        { name: "Negro Obsidiana", hex: "#111111" },
        { name: "Blanco Polar", hex: "#f5f5f2" },
        { name: "Gris Selenita", hex: "#6b6e72" },
        { name: "Azul Denim", hex: "#3d5a80" },
      ],
    },
    "page-detalle-porsche": {
      name: "Porsche 911 Carrera S",
      price: 224100,
      mensual: 3386,
      enganche: 0.2,
      colors: [
        { name: "Negro Volcanico", hex: "#111111" },
        { name: "Gris Agata", hex: "#7a7d82" },
        { name: "Blanco Carrara", hex: "#ece9e3" },
      ],
    },
    "page-detalle-huracan": {
      name: "Lamborghini Huracan EVO",
      price: 206295,
      mensual: 3117,
      enganche: 0.2,
      colors: [
        { name: "Negro Volcanico", hex: "#111111" },
        { name: "Gris Agata", hex: "#7a7d82" },
        { name: "Blanco Carrara", hex: "#ece9e3" },
      ],
    },
    "page-detalle-gt": {
      name: "Aston Martin DB9",
      price: 337480,
      mensual: 5099,
      enganche: 0.2,
      colors: [
        { name: "Negro Volcanico", hex: "#111111" },
        { name: "Gris Agata", hex: "#7a7d82" },
        { name: "Blanco Carrara", hex: "#ece9e3" },
      ],
    },
    "page-detalle-mustang": {
      name: "Ford Mustang GT",
      price: 69635,
      mensual: 1052,
      enganche: 0.2,
      colors: [
        { name: "Negro Volcanico", hex: "#111111" },
        { name: "Gris Agata", hex: "#7a7d82" },
        { name: "Blanco Carrara", hex: "#ece9e3" },
      ],
    },
    "page-detalle-gtr": {
      name: "Nissan GT-R R35",
      price: 121090,
      mensual: 1830,
      enganche: 0.2,
      colors: [
        { name: "Negro Volcanico", hex: "#111111" },
        { name: "Gris Agata", hex: "#7a7d82" },
        { name: "Blanco Carrara", hex: "#ece9e3" },
      ],
    },
    "page-detalle-mclaren": {
      name: "McLaren 720s",
      price: 333881,
      mensual: 5045,
      enganche: 0.2,
      colors: [
        { name: "Negro Volcanico", hex: "#111111" },
        { name: "Gris Agata", hex: "#7a7d82" },
        { name: "Blanco Carrara", hex: "#ece9e3" },
      ],
    },
    "page-detalle-grant": {
      name: "Maserati Gran Turismo",
      price: 264876,
      mensual: 4002,
      enganche: 0.2,
      colors: [
        { name: "Negro Volcanico", hex: "#111111" },
        { name: "Gris Agata", hex: "#7a7d82" },
        { name: "Blanco Carrara", hex: "#ece9e3" },
      ],
    },
    "page-detalle-c8": {
      name: "Corvette C8",
      price: 142900,
      mensual: 2159,
      enganche: 0.2,
      colors: [
        { name: "Negro Volcanico", hex: "#111111" },
        { name: "Gris Agata", hex: "#7a7d82" },
        { name: "Blanco Carrara", hex: "#ece9e3" },
      ],
    },
  };

  const DYNAMIC_CARS = {
    bmw: {
      name: "BMW Serie 5",
      meta: "2025 · Sedan · Automatico",
      badge: "Nuevo",
      price: 58900,
      mensual: 890,
      img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
      img2: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=75",
      img3: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=75",
      desc: "El BMW Serie 5 2025 redefine el concepto de sedan ejecutivo. Con un interior completamente renovado, tecnologia de conduccion de ultima generacion y un motor turbo que entrega 245 CV, cada kilometro es una experiencia disenada para el conductor.",
      specs: [
        { label: "0-100 km/h", val: "5.8s" },
        { label: "Motor", val: "2.0L Turbo" },
        { label: "Potencia", val: "245 CV" },
        { label: "Transmision", val: "Automatica 8V" },
        { label: "Plazas", val: "5" },
        { label: "Ano", val: "2025" },
      ],
      colors: [
        { name: "Negro Zafiro", hex: "#1a1a1a" },
        { name: "Blanco Alpino", hex: "#f2f2f0" },
        { name: "Azul Mediterraneo", hex: "#2b4b8c" },
        { name: "Gris Manhattan", hex: "#8a8d91" },
        { name: "Rojo Carmesi", hex: "#8b1a1a" },
      ],
      features: [
        'Pantalla iDrive 8.5" curva',
        "Head-Up Display",
        "Asientos de cuero Merino",
        "Sistema Harman Kardon 16 alt.",
        "Camara 360°",
        "Techo panoramico electrico",
        "Conduccion semiautonoma L2",
        "Carga inalambrica",
      ],
      enganche: 0.15,
    },
    mercedes: {
      name: "Aston Martin DB12",
      meta: "2025 · SUV · Automatico",
      badge: "Nuevo",
      price: 64500,
      mensual: 975,
      img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80",
      img2: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=75",
      img3: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=75",
      desc: "El GLC 2025 combina la elegancia caracteristica de Mercedes-Benz con la practicidad de un SUV moderno. Su sistema hibrido enchufable ofrece hasta 100 km en modo electrico y una experiencia de manejo silenciosa e impecable.",
      specs: [
        { label: "0-100 km/h", val: "6.1s" },
        { label: "Motor", val: "2.0L Hybrid" },
        { label: "Potencia", val: "313 CV" },
        { label: "Transmision", val: "9G-Tronic" },
        { label: "Plazas", val: "5" },
        { label: "Ano", val: "2025" },
      ],
      colors: [
        { name: "Negro Obsidiana", hex: "#111111" },
        { name: "Blanco Polar", hex: "#f5f5f2" },
        { name: "Gris Selenita", hex: "#6b6e72" },
        { name: "Azul Denim", hex: "#3d5a80" },
      ],
      features: [
        'MBUX Hyperscreen 12.3"',
        "Burmester 3D surround",
        "Asientos electricos con masaje",
        "AR Navigation",
        "Camara 360° con vision nocturna",
        "Techo panoramico MAGIC SKY",
        "Asistente de estacionamiento",
        "Suspension adaptativa",
      ],
      enganche: 0.15,
    },
    tesla: {
      name: "Tesla Model Y",
      meta: "2025 · SUV · Electrico",
      badge: "Nuevo",
      price: 52990,
      mensual: 800,
      img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=80",
      img2: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=75",
      img3: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=75",
      desc: "El Tesla Model Y Long Range 2025 ofrece hasta 533 km de autonomia, aceleracion de 0 a 100 en 3.7 segundos y la tecnologia Autopilot mas avanzada del mercado. Con 7 plazas y espacio de carga generoso, es el SUV electrico mas completo.",
      specs: [
        { label: "0-100 km/h", val: "3.7s" },
        { label: "Motor", val: "Electrico dual" },
        { label: "Autonomia", val: "533 km" },
        { label: "Transmision", val: "Directa 1V" },
        { label: "Plazas", val: "7" },
        { label: "Ano", val: "2025" },
      ],
      colors: [
        { name: "Blanco Perla", hex: "#f0ede8" },
        { name: "Negro Solido", hex: "#1a1a1a" },
        { name: "Rojo Multicapa", hex: "#c0392b" },
        { name: "Azul Medianoche", hex: "#1a2e4a" },
        { name: "Gris Platino", hex: "#a8aaad" },
      ],
      features: [
        'Pantalla central 15.4"',
        "Autopilot avanzado",
        "Actualiz. OTA inalambricas",
        "Carga rapida Supercharger",
        "Camara Sentry 360°",
        "Techo de cristal panoramico",
        "Maletero delantero y trasero",
        "Calefaccion asientos",
      ],
      enganche: 0.1,
    },
    porsche: {
      name: "Porsche Macan S",
      meta: "2023 · SUV · Automatico",
      badge: "Certificado",
      used: true,
      price: 71200,
      mensual: 1075,
      img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80",
      img2: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=75",
      img3: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=75",
      desc: "El Macan S 2023 certificado por Porsche ha pasado una revision de 111 puntos y viene con garantia extendida de 12 meses. Con solo 28,000 km recorridos, este SUV deportivo esta practicamente como nuevo a un precio inmejorable.",
      specs: [
        { label: "0-100 km/h", val: "4.6s" },
        { label: "Motor", val: "3.0L V6" },
        { label: "Potencia", val: "380 CV" },
        { label: "Transmision", val: "PDK 7V" },
        { label: "Plazas", val: "5" },
        { label: "Km", val: "28,000" },
      ],
      colors: [
        { name: "Negro Volcanico", hex: "#111111" },
        { name: "Gris Agata", hex: "#7a7d82" },
        { name: "Blanco Carrara", hex: "#ece9e3" },
      ],
      features: [
        'PCM Porsche 10.9"',
        "Bose Surround Sound",
        "Asientos sport ventilados",
        "Frenos ceramicos",
        "Modo Sport/Sport Plus/Off-Road",
        "Techo corredizo panoramico",
        "Control de traccion PASM",
        "Garantia certificada 12 meses",
      ],
      enganche: 0.2,
    },
    audi: {
      name: "Audi A6 Quattro",
      meta: "2022 · Sedan · Automatico",
      badge: "Certificado",
      used: true,
      price: 44800,
      mensual: 677,
      img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&q=80",
      img2: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=75",
      img3: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=75",
      desc: "El Audi A6 Quattro 2022 certificado combina el lujo germanico con la tecnologia quattro de traccion integral. Con 42,000 km y un historial de servicio completo en concesionario oficial, es una opcion premium a precio competitivo.",
      specs: [
        { label: "0-100 km/h", val: "5.1s" },
        { label: "Motor", val: "3.0L TFSI" },
        { label: "Potencia", val: "340 CV" },
        { label: "Transmision", val: "S-Tronic 7V" },
        { label: "Plazas", val: "5" },
        { label: "Km", val: "42,000" },
      ],
      colors: [
        { name: "Negro Mythos", hex: "#111111" },
        { name: "Blanco Glaciar", hex: "#f0eeea" },
        { name: "Gris Quantum", hex: "#6f7275" },
        { name: "Azul Navarra", hex: "#2c3e6b" },
      ],
      features: [
        'Virtual Cockpit Plus 12.3"',
        "MMI Navigation Plus",
        "Bang & Olufsen 3D Premium",
        "Asientos sport cuero nappa",
        "Quattro traccion integral",
        "Suspension neumatica",
        "Camara 360° con lavado",
        "Garantia certificada 12 meses",
      ],
      enganche: 0.2,
    },
    lexus: {
      name: "Lexus ES 350",
      meta: "2025 · Sedan · Automatico",
      badge: "Nuevo",
      price: 47300,
      mensual: 715,
      img: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=1200&q=80",
      img2: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=75",
      img3: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&q=75",
      desc: "El Lexus ES 350 2025 es el referente de la elegancia japonesa. Con un V6 de 302 CV, acabados premium artesanales y la fiabilidad legendaria de Lexus, este sedan ofrece una experiencia de conduccion refinada y confortable.",
      specs: [
        { label: "0-100 km/h", val: "7.1s" },
        { label: "Motor", val: "3.5L V6" },
        { label: "Potencia", val: "302 CV" },
        { label: "Transmision", val: "Automatica 8V" },
        { label: "Plazas", val: "5" },
        { label: "Ano", val: "2025" },
      ],
      colors: [
        { name: "Blanco Ultra Sonic", hex: "#f3f1ed" },
        { name: "Negro Obsidiana", hex: "#111111" },
        { name: "Plata Nebula", hex: "#a5a8ab" },
        { name: "Azul Zafiro", hex: "#1c3a6e" },
        { name: "Rojo Matador", hex: "#8b2020" },
      ],
      features: [
        'Pantalla tactil 12.3"',
        "Mark Levinson 17 altavoces",
        "Asientos de piel con ventilacion",
        "Monitor de punto ciego",
        "Techo panoramico electrico",
        "Camara de vision nocturna",
        "Control de crucero adaptativo",
        "Recarga inalambrica Qi",
      ],
      enganche: 0.15,
    },
    range: {
      name: "Range Rover Sport",
      meta: "2025 · SUV · Automatico",
      badge: "Nuevo",
      price: 89700,
      mensual: 1355,
      img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80",
      img2: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=75",
      img3: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=75",
      desc: "El Range Rover Sport 2025 redefine lo que un SUV de lujo puede ofrecer. Con chasis de aluminio, suspension neumatica adaptativa y capacidad todo terreno sin igual, este vehiculo domina tanto el asfalto como el campo.",
      specs: [
        { label: "0-100 km/h", val: "6.5s" },
        { label: "Motor", val: "3.0L Diesel" },
        { label: "Potencia", val: "350 CV" },
        { label: "Transmision", val: "ZF 8V Auto" },
        { label: "Plazas", val: "5" },
        { label: "Ano", val: "2025" },
      ],
      colors: [
        { name: "Azul Aruba", hex: "#1e3d5c" },
        { name: "Verde Taiga", hex: "#2d4a2d" },
        { name: "Blanco Fuji", hex: "#f0eeea" },
        { name: "Negro Santorini", hex: "#0f0f0f" },
        { name: "Gris Eiger", hex: "#5a5c5e" },
      ],
      features: [
        'Pivi Pro Curved 13.1"',
        "Meridian 3D Surround 29 alt.",
        "Asientos con masaje 24 modos",
        "Traccion AWD permanente",
        "Suspension neumatica 6 alturas",
        "Wade Sensing off-road",
        "Head-Up Display 3D",
        "Camara ClearSight 360°",
      ],
      enganche: 0.15,
    },
    tesla3: {
      name: "Tesla Model 3",
      meta: "2023 · Sedan · Electrico",
      badge: "Certificado",
      used: true,
      price: 38400,
      mensual: 580,
      img: "https://images.unsplash.com/photo-1561580125-028ee3bd62eb?w=1200&q=80",
      img2: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=75",
      img3: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=75",
      desc: "El Tesla Model 3 Performance 2023 certificado combina el rendimiento de un deportivo con la eficiencia de un electrico. Con solo 22,000 km, sistema de bateria verificado al 98% de capacidad y garantia de 12 meses.",
      specs: [
        { label: "0-100 km/h", val: "3.1s" },
        { label: "Motor", val: "Electrico dual" },
        { label: "Autonomia", val: "547 km" },
        { label: "Transmision", val: "Directa 1V" },
        { label: "Plazas", val: "5" },
        { label: "Km", val: "22,000" },
      ],
      colors: [
        { name: "Blanco Perla", hex: "#f0ede8" },
        { name: "Negro Solido", hex: "#1a1a1a" },
        { name: "Azul Medianoche", hex: "#1a2e4a" },
        { name: "Rojo Multicapa", hex: "#c0392b" },
      ],
      features: [
        'Pantalla central 15.4"',
        "Autopilot avanzado",
        "Bateria al 98% capacidad",
        "Carga Supercharger",
        "Camara Sentry 360°",
        "Techo de vidrio panoramico",
        "Frenos de alto rendimiento",
        "Garantia certificada 12 meses",
      ],
      enganche: 0.15,
    },
  };

  const detailState = {
    car: null,
    color: null,
    finance: "credito",
    plazo: 48,
  };

  function getCurrentStaticDetailCar() {
    const className = Object.keys(STATIC_DETAIL_CARS).find((cls) => body.classList.contains(cls));
    return className ? STATIC_DETAIL_CARS[className] : null;
  }

  function setDetailNavMode() {
    if (!nav) return;
    nav.classList.add("on-light");
    window.addEventListener("scroll", () => {
      nav.classList.toggle("on-light", window.scrollY > 20);
    });
  }

  function createFinancePlanCard(plan, isActive) {
    const car = detailState.car;
    const monthly = plan.rate > 0
      ? Math.round(car.price * (1 - car.enganche) * plan.rate / (1 - Math.pow(1 + plan.rate, -48)))
      : 0;
    const priceText = plan.id === "contado"
      ? `$${car.price.toLocaleString()} unico`
      : `~$${monthly.toLocaleString()}/mes`;
    const el = document.createElement("div");
    el.className = "finance-opt" + (isActive ? " active" : "");
    el.innerHTML = `<div class="fo-title">${plan.title}</div><div class="fo-desc">${plan.desc}</div><div class="fo-price">${priceText}</div>`;
    el.onclick = () => {
      document.querySelectorAll(".finance-opt").forEach((item) => item.classList.remove("active"));
      el.classList.add("active");
      detailState.finance = plan.id;
      const plazoWrap = document.getElementById("plazo-wrap");
      if (plazoWrap) plazoWrap.style.display = plan.id === "contado" ? "none" : "";
      window.updatePlazo(detailState.plazo);
    };
    return el;
  }

  function setDetailStepOnePrice() {
    const car = detailState.car;
    const dynamicPrice = document.getElementById("s1-price");
    const dynamicMensual = document.getElementById("s1-mensual");
    if (dynamicPrice && dynamicMensual) {
      dynamicPrice.textContent = "$" + car.price.toLocaleString();
      dynamicMensual.textContent = "desde $" + car.mensual.toLocaleString() + "/mes con financiamiento";
      return;
    }

    const staticPrice = document.querySelector(".p-main");
    const staticMensual = document.querySelector(".p-sub");
    if (staticPrice) staticPrice.textContent = "$" + car.price.toLocaleString();
    if (staticMensual) staticMensual.textContent = "desde $" + car.mensual.toLocaleString() + "/mes con financiamiento";
  }

  function initDetailWizard(carData) {
    detailState.car = carData;
    detailState.color = carData.colors[0]?.name || null;
    detailState.finance = "credito";
    detailState.plazo = 48;
    setDetailNavMode();
    setDetailStepOnePrice();

    const colorContainer = document.getElementById("step-colors");
    if (colorContainer) {
      colorContainer.innerHTML = "";
      carData.colors.forEach((color, idx) => {
        const el = document.createElement("div");
        el.className = "color-opt" + (idx === 0 ? " active" : "");
        el.innerHTML = `<div class="color-dot" style="background:${color.hex}"></div>${color.name}`;
        el.onclick = () => {
          document.querySelectorAll(".color-opt").forEach((item) => item.classList.remove("active"));
          el.classList.add("active");
          detailState.color = color.name;
        };
        colorContainer.appendChild(el);
      });
    }

    const financeContainer = document.getElementById("finance-opts");
    if (financeContainer) {
      financeContainer.innerHTML = "";
      DETAIL_PLANS.forEach((plan, idx) => {
        financeContainer.appendChild(createFinancePlanCard(plan, idx === 0));
      });
    }

    window.updatePlazo(48);
  }

  window.updatePlazo = (value) => {
    if (!detailState.car) return;
    detailState.plazo = parseInt(value, 10);
    const plan = DETAIL_PLANS.find((item) => item.id === detailState.finance) || DETAIL_PLANS[0];
    const enganche = Math.round(detailState.car.price * detailState.car.enganche);
    const monto = detailState.car.price - enganche;
    const cuota = plan.rate > 0
      ? Math.round(monto * plan.rate / (1 - Math.pow(1 + plan.rate, -detailState.plazo)))
      : 0;

    const plazoLabel = document.getElementById("plazo-label");
    if (plazoLabel) plazoLabel.textContent = `${detailState.plazo} meses`;
    const engancheVal = document.getElementById("enganche-val");
    if (engancheVal) engancheVal.textContent = "$" + enganche.toLocaleString();
    const cuotaVal = document.getElementById("cuota-val");
    if (cuotaVal) cuotaVal.textContent = cuota > 0 ? "$" + cuota.toLocaleString() + "/mes" : "Pago unico al contado";
  };

  window.goStep = (step) => {
    [1, 2, 3, 4].forEach((idx) => {
      const panel = document.getElementById(`panel-${idx}`);
      if (panel) panel.classList.toggle("active", idx === step);
      const tab = document.getElementById(`tab-${idx}`);
      if (tab) {
        tab.classList.remove("active", "done");
        if (idx === step) tab.classList.add("active");
        else if (idx < step) tab.classList.add("done");
      }
    });
  };

  window.goConfirm = () => {
    if (!detailState.car) return;
    const nombre = (document.getElementById("f-nombre")?.value || "").trim();
    const apellido = (document.getElementById("f-apellido")?.value || "").trim();
    const email = (document.getElementById("f-email")?.value || "").trim();
    const tel = (document.getElementById("f-tel")?.value || "").trim();
    if (!nombre || !apellido || !email || !tel) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    const plan = DETAIL_PLANS.find((item) => item.id === detailState.finance) || DETAIL_PLANS[0];
    const enganche = Math.round(detailState.car.price * detailState.car.enganche);
    const monto = detailState.car.price - enganche;
    const cuota = plan.rate > 0
      ? Math.round(monto * plan.rate / (1 - Math.pow(1 + plan.rate, -detailState.plazo)))
      : 0;
    const rows = document.getElementById("confirm-rows");
    if (!rows) return;

    rows.innerHTML = `
      <div class="confirm-row"><span class="cr-label">Vehiculo</span><span class="cr-val">${detailState.car.name}</span></div>
      <div class="confirm-row"><span class="cr-label">Color</span><span class="cr-val">${detailState.color || "-"}</span></div>
      <div class="confirm-row"><span class="cr-label">Financiamiento</span><span class="cr-val">${plan.title}</span></div>
      ${cuota > 0 ? `<div class="confirm-row"><span class="cr-label">Plazo</span><span class="cr-val">${detailState.plazo} meses</span></div>` : ""}
      <div class="confirm-row"><span class="cr-label">Enganche estimado</span><span class="cr-val">$${enganche.toLocaleString()}</span></div>
      ${cuota > 0 ? `<div class="confirm-row"><span class="cr-label">Cuota mensual</span><span class="cr-val">$${cuota.toLocaleString()}/mes</span></div>` : ""}
      <div class="confirm-row"><span class="cr-label">Solicitante</span><span class="cr-val">${nombre} ${apellido}</span></div>
      <div class="confirm-row"><span class="cr-label">Contacto</span><span class="cr-val">${email}</span></div>
    `;

    const total = document.getElementById("confirm-total-val");
    if (total) total.textContent = "$" + detailState.car.price.toLocaleString();
    window.goStep(4);
  };

  window.submitRequest = async () => {
    const ref = "AE-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const rows = Array.from(document.querySelectorAll("#confirm-rows .confirm-row")).map((row) => {
      const label = normalizeLabel(row.querySelector(".cr-label")?.textContent || "");
      const value = normalizeLabel(row.querySelector(".cr-val")?.textContent || "");
      return { label, value };
    }).filter((item) => item.label && item.value);

    const sent = await sendMail(
      `Reserva de vehiculo ${ref} - Auto Elite`,
      "Quiero enviar esta solicitud de reserva:",
      [{ label: "Referencia", value: ref }, ...rows]
    );
    if (!sent) return;

    const refCode = document.getElementById("ref-code");
    if (refCode) refCode.textContent = ref;
    const stepsHeader = document.querySelector(".steps-header");
    if (stepsHeader) stepsHeader.style.display = "none";
    [1, 2, 3, 4].forEach((idx) => {
      const panel = document.getElementById(`panel-${idx}`);
      if (panel) panel.classList.remove("active");
    });
    const success = document.getElementById("success-panel");
    if (success) success.style.display = "block";
  };

  window.swapMain = (thumb) => {
    const main = document.getElementById("img-main");
    if (!main || !thumb) return;
    const temp = main.src;
    main.src = thumb.src;
    thumb.src = temp;
  };

  function initDynamicDetailPage() {
    if (!body.classList.contains("page-detalle")) return;
    const params = new URLSearchParams(window.location.search);
    const carId = params.get("id") || "bmw";
    const car = DYNAMIC_CARS[carId] || DYNAMIC_CARS.bmw;
    initDetailWizard(car);

    document.title = `${car.name} - Auto Elite`;
    const bcName = document.getElementById("bc-name");
    if (bcName) bcName.textContent = car.name;

    const mainImage = document.getElementById("img-main");
    if (mainImage) {
      mainImage.src = car.img;
      mainImage.alt = car.name;
    }
    const t1 = document.getElementById("img-t1");
    if (t1) t1.src = car.img2;
    const t2 = document.getElementById("img-t2");
    if (t2) t2.src = car.img3;

    const badge = document.getElementById("d-badge");
    if (badge) {
      badge.textContent = car.badge;
      if (car.used) badge.classList.add("used");
    }

    const dName = document.getElementById("d-name");
    if (dName) dName.textContent = car.name;
    const dMeta = document.getElementById("d-meta");
    if (dMeta) dMeta.textContent = car.meta;
    const dDesc = document.getElementById("d-desc");
    if (dDesc) dDesc.textContent = car.desc;

    const specsGrid = document.getElementById("d-specs");
    if (specsGrid) {
      specsGrid.innerHTML = "";
      car.specs.forEach((spec) => {
        specsGrid.innerHTML += `<div class="spec-box"><span class="s-label">${spec.label}</span><span class="s-val">${spec.val}</span></div>`;
      });
    }

    const colorsVisual = document.getElementById("d-colors-visual");
    if (colorsVisual) {
      colorsVisual.innerHTML = "";
      car.colors.forEach((color) => {
        colorsVisual.innerHTML += `<div class="color-swatch" title="${color.name}" style="background:${color.hex}"></div>`;
      });
    }

    const features = document.getElementById("d-features");
    if (features) {
      features.innerHTML = "";
      car.features.forEach((feature) => {
        features.innerHTML += `<div class="feat-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          ${feature}
        </div>`;
      });
    }
  }

  function initStaticDetailPage() {
    if (!body.classList.contains("page-detalle-vehiculo") || body.classList.contains("page-detalle")) return;
    const car = getCurrentStaticDetailCar();
    if (car) initDetailWizard(car);
  }

  const inventoryState = {
    perPage: 6,
    currentFilter: "all",
    currentPage: 1,
  };

  function renderInventoryPage() {
    const grid = document.getElementById("carGrid");
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll(".car-card"));
    const visible = cards.filter((card) => {
      const types = card.dataset.type || "";
      return inventoryState.currentFilter === "all" || types.includes(inventoryState.currentFilter);
    });

    const count = document.getElementById("count");
    if (count) count.textContent = `${visible.length} vehiculo${visible.length !== 1 ? "s" : ""}`;

    const totalPages = Math.max(1, Math.ceil(visible.length / inventoryState.perPage));
    if (inventoryState.currentPage > totalPages) inventoryState.currentPage = totalPages;
    const start = (inventoryState.currentPage - 1) * inventoryState.perPage;
    const end = start + inventoryState.perPage;

    cards.forEach((card) => {
      card.style.display = "none";
    });
    visible.forEach((card, idx) => {
      card.style.display = idx >= start && idx < end ? "" : "none";
    });

    const pagination = document.getElementById("pagination");
    if (!pagination) return;
    pagination.innerHTML = "";

    function makePgButton(label, page, isActive, isDisabled) {
      const btn = document.createElement("button");
      btn.className = "pg-btn" + (isActive ? " active" : "");
      btn.textContent = label;
      btn.disabled = isDisabled;
      if (!isDisabled) {
        btn.onclick = () => {
          inventoryState.currentPage = page;
          renderInventoryPage();
          const section = document.querySelector(".inv-section");
          if (section) {
            window.scrollTo({ top: section.offsetTop - 80, behavior: "smooth" });
          }
        };
      }
      return btn;
    }

    pagination.appendChild(makePgButton("‹", inventoryState.currentPage - 1, false, inventoryState.currentPage === 1));
    for (let i = 1; i <= totalPages; i += 1) {
      pagination.appendChild(makePgButton(i, i, i === inventoryState.currentPage, false));
    }
    pagination.appendChild(makePgButton("›", inventoryState.currentPage + 1, false, inventoryState.currentPage === totalPages));
  }

  window.sortCars = (value) => {
    const grid = document.getElementById("carGrid");
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll(".car-card"));
    cards.sort((a, b) => {
      const priceA = parseInt(a.dataset.price || "0", 10);
      const priceB = parseInt(b.dataset.price || "0", 10);
      const yearA = parseInt(a.dataset.year || "0", 10);
      const yearB = parseInt(b.dataset.year || "0", 10);
      if (value === "Menor precio") return priceA - priceB;
      if (value === "Mayor precio") return priceB - priceA;
      if (value === "Mas recientes" || value === "Más recientes") return yearB - yearA;
      return 0;
    });
    cards.forEach((card) => grid.appendChild(card));
    renderInventoryPage();
  };

  window.filterCars = (button, type) => {
    document.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
    if (button) button.classList.add("active");
    inventoryState.currentFilter = type;
    inventoryState.currentPage = 1;
    renderInventoryPage();
  };

  window.openModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  window.closeModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  function normalizeLabel(text) {
    return (text || "").replace(/\s+/g, " ").trim().replace(/\s*\(opcional\)\s*$/i, "");
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getFieldLabel(field, idx) {
    const row = field.closest(".m-field, .form-row");
    const label = row?.querySelector("label");
    if (label) return normalizeLabel(label.textContent);
    return normalizeLabel(field.getAttribute("aria-label") || field.getAttribute("placeholder") || field.name || field.id || `Campo ${idx + 1}`);
  }

  function getFieldValue(field) {
    if (!field) return "";
    if (field.tagName === "SELECT") {
      const selected = field.options[field.selectedIndex];
      return normalizeLabel(selected?.textContent || "");
    }
    return (field.value || "").trim();
  }

  function collectFields(container) {
    if (!container) return [];
    const fields = Array.from(container.querySelectorAll("input, select, textarea"));
    return fields
      .filter((field) => {
        const type = (field.getAttribute("type") || "").toLowerCase();
        return !["button", "submit", "hidden"].includes(type);
      })
      .map((field, idx) => ({
        label: getFieldLabel(field, idx),
        value: getFieldValue(field),
      }))
      .filter((item) => item.value);
  }

  function buildEmailHtml(intro, fields) {
    const rows = fields
      .map((item) => `<p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#1a1a1a;"><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.value)}</p>`)
      .join("");

    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin:0;padding:0;background:#0c0c0e;font-family:Arial,Helvetica,sans-serif;">
        <table role="presentation" width="100%" style="border-collapse:collapse;background:radial-gradient(circle at top,#1a1a20 0%,#0c0c0e 65%);padding:30px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="640" style="border-collapse:collapse;max-width:640px;width:100%;background:#ffffff;border:1px solid #232327;border-radius:14px;overflow:hidden;">
                <tr>
                  <td style="background:linear-gradient(120deg,#0f0f0f 0%,#19191d 100%);padding:24px 28px 30px;border-bottom:1px solid rgba(255,255,255,.08);">
                    <p style="margin:0;font-size:14px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#ffffff;">Auto Elite</p>
                    <p style="margin:8px 0 0;font-size:11px;color:#c8a96e;letter-spacing:.08em;text-transform:uppercase;">Concesionario Premium</p>
                    <h2 style="margin:20px 0 0;font-size:26px;line-height:1.2;letter-spacing:-.02em;color:#ffffff;max-width:420px;">Confirmacion de solicitud recibida</h2>
                    <p style="margin:10px 0 0;font-size:13px;color:rgba(255,255,255,.62);max-width:460px;line-height:1.6;">Gracias por elegir una experiencia premium. Estamos preparando una propuesta personalizada para usted.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px 28px 22px;line-height:1.65;">
                    <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">Estimado/a cliente,</p>
                    <p style="margin:0 0 14px;font-size:14px;color:#3f3f46;">${escapeHtml(intro)}</p>
                    <div style="margin:22px 0;background:linear-gradient(180deg,#fcfcfd 0%,#f6f6f8 100%);border:1px solid #ececf1;border-left:4px solid #c8a96e;border-radius:10px;padding:16px;">
                      <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#6b6b6b;">Resumen de solicitud</p>
                      ${rows}
                    </div>
                    <p style="margin:18px 0 0;font-size:14px;color:#3f3f46;">Atentamente,<br /><strong>Equipo Comercial Auto Elite</strong></p>
                  </td>
                </tr>
                <tr>
                  <td style="border-top:1px solid #ececf1;padding:16px 28px 22px;background:#fafafc;">
                    <p style="margin:0;font-size:11px;line-height:1.6;color:#7a7a83;">Auto Elite | +1 (809) 000-0000 | info@autoelite.com<br />Av. Principal 100, Santo Domingo</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  async function sendMail(subject, intro, fields) {
    if (!fields.length) {
      alert("Por favor completa al menos un campo antes de enviar.");
      return false;
    }

    const bodyText = [
      "Hola Auto Elite,",
      "",
      intro,
      "",
      ...fields.map((item) => `${item.label}: ${item.value}`),
      "",
      "Enviado desde el sitio web.",
    ].join("\n");
    const htmlContent = buildEmailHtml(intro, fields);

    try {
      const response = await fetch(EMAIL_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: CONTACT_EMAIL,
          subject,
          text: bodyText,
          html: htmlContent,
        }),
      });

      let payload = null;
      try {
        payload = await response.json();
      } catch (_err) {
        payload = null;
      }

      if (!response.ok) {
        const reason = payload?.error || "No se pudo enviar el correo.";
        throw new Error(reason);
      }

      return true;
    } catch (error) {
      alert(`No se pudo enviar la solicitud: ${error.message}`);
      return false;
    }
  }

  window.submitModal = async (formId, successId) => {
    const form = document.getElementById(formId);
    const success = document.getElementById(successId);
    if (!form || !success) return;
    const title = form.querySelector("h3")?.textContent?.trim() || "Solicitud";
    const fields = collectFields(form);
    const sent = await sendMail(
      `${title} - Auto Elite`,
      `Quiero realizar esta solicitud: ${title}`,
      fields
    );
    if (!sent) return;
    form.style.display = "none";
    success.style.display = "block";
  };

  window.submitTestDriveForm = async () => {
    if (!body.classList.contains("page-index")) return;
    const nombre = (document.getElementById("tdNombre")?.value || "").trim();
    const apellido = (document.getElementById("tdApellido")?.value || "").trim();
    const telefono = (document.getElementById("tdTelefono")?.value || "").trim();
    const correo = (document.getElementById("tdCorreo")?.value || "").trim();
    const vehiculo = (document.getElementById("tdVehiculo")?.value || "").trim();
    const fecha = (document.getElementById("tdFecha")?.value || "").trim();
    const hora = (document.getElementById("tdHora")?.value || "").trim();
    const mensaje = (document.getElementById("tdMensaje")?.value || "").trim();

    if (!nombre || !apellido || !telefono || !correo || !vehiculo || !fecha || !hora) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const subject = `Solicitud prueba de manejo - ${vehiculo}`;
    const bodyText = [
      "Hola Auto Elite,",
      "",
      "Quiero agendar una prueba de manejo con estos datos:",
      `Nombre: ${nombre} ${apellido}`,
      `Telefono: ${telefono}`,
      `Correo: ${correo}`,
      `Vehiculo de interes: ${vehiculo}`,
      `Fecha preferida: ${fecha}`,
      `Hora preferida: ${hora}`,
      `Mensaje adicional: ${mensaje || "N/A"}`,
      "",
      "Gracias.",
    ].join("\n");

    const sent = await sendMail(
      subject,
      "Quiero agendar una prueba de manejo con estos datos:",
      [
        { label: "Nombre", value: `${nombre} ${apellido}` },
        { label: "Telefono", value: telefono },
        { label: "Correo", value: correo },
        { label: "Vehiculo de interes", value: vehiculo },
        { label: "Fecha preferida", value: fecha },
        { label: "Hora preferida", value: hora },
        { label: "Mensaje adicional", value: mensaje || "N/A" },
      ]
    );
    if (!sent) return;
    const form = document.getElementById("testDriveForm");
    const success = document.getElementById("testDriveSuccess");
    if (form) form.style.display = "none";
    if (success) success.style.display = "block";
  };

  function initSharedModalHandlers() {
    const overlays = document.querySelectorAll(".modal-overlay");
    if (!overlays.length) return;
    overlays.forEach((overlay) => {
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) window.closeModal(overlay.id);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        document.querySelectorAll(".modal-overlay.open").forEach((overlay) => window.closeModal(overlay.id));
      }
    });
  }

  function initInventoryPage() {
    if (!body.classList.contains("page-inventario")) return;
    renderInventoryPage();
  }

  async function handleServiceSubmit(event) {
    const form = document.querySelector(".booking-form");
    const button = event?.target || document.querySelector(".form-submit");
    if (!button || !form) return;
    if (event?.preventDefault) event.preventDefault();
    const fields = collectFields(form);
    const sent = await sendMail(
      "Agendar cita de servicio - Auto Elite",
      "Quiero agendar una cita de servicio con estos datos:",
      fields
    );
    if (!sent) return;
    button.textContent = "¡Cita confirmada! ✓";
    button.style.background = "var(--accent)";
    button.disabled = true;
  }

  async function handleFinanceSubmit() {
    const formBody = document.getElementById("form-body");
    const formSuccess = document.getElementById("form-success");
    if (!formBody || !formSuccess) return;
    const fields = collectFields(formBody);
    const sent = await sendMail(
      "Solicitud de financiamiento - Auto Elite",
      "Quiero solicitar financiamiento con los siguientes datos:",
      fields
    );
    if (!sent) return;
    if (formBody) formBody.style.display = "none";
    if (formSuccess) formSuccess.style.display = "block";
  }

  window.submitForm = async (arg) => {
    if (body.classList.contains("page-servicio")) {
      await handleServiceSubmit(arg);
      return;
    }
    if (body.classList.contains("page-financiamiento")) {
      await handleFinanceSubmit();
    }
  };

  window.calcUpdate = () => {
    if (!body.classList.contains("page-financiamiento")) return;
    const price = parseInt(document.getElementById("price")?.value || "0", 10);
    const downPct = parseInt(document.getElementById("down")?.value || "0", 10);
    const term = parseInt(document.getElementById("term")?.value || "0", 10);
    const rate = 0.069;
    const down = Math.round(price * downPct / 100);
    const principal = price - down;
    const monthlyRate = rate / 12;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);

    const priceLabel = document.getElementById("priceLabel");
    if (priceLabel) priceLabel.textContent = "$" + price.toLocaleString();
    const downLabel = document.getElementById("downLabel");
    if (downLabel) downLabel.textContent = "$" + down.toLocaleString() + " (" + downPct + "%)";
    const termLabel = document.getElementById("termLabel");
    if (termLabel) termLabel.textContent = term + " meses";
    const monthly = document.getElementById("monthly");
    if (monthly) monthly.innerHTML = "$" + Math.round(payment).toLocaleString() + "<span>/mes</span>";
    const totalSub = document.getElementById("totalSub");
    if (totalSub) totalSub.textContent = "Total financiado: $" + principal.toLocaleString() + " · Tasa: 6.9% anual";
  };

  window.toggleFaq = (el) => {
    if (!body.classList.contains("page-financiamiento") || !el) return;
    el.classList.toggle("open");
  };

  function initFinancingPage() {
    if (!body.classList.contains("page-financiamiento")) return;
    window.calcUpdate();
  }

  initInventoryPage();
  initSharedModalHandlers();
  initFinancingPage();
  initDynamicDetailPage();
  initStaticDetailPage();
})();