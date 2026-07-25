/* ==========================================================================
   NOVA STORE - PRODUCT DATASET (30 REALISTIC PREMIUM PRODUCTS)
   ========================================================================== */

export const PRODUCTS = [
  // CATEGORY 1: AUDIO & HEADPHONES (5 items)
  {
    id: "prod-1",
    title: "Nova SoundMax Wireless ANC Headphones",
    category: "Audio",
    brand: "NovaSound",
    price: 349.99,
    discount: 15, // 15% off
    rating: 4.9,
    reviewsCount: 128,
    stock: 18,
    isFeatured: true,
    isBestSeller: true,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Experience acoustic perfection with active noise cancellation, custom 40mm titanium drivers, and 45-hour ultra battery endurance. Finished in anodized aerospace aluminum.",
    specs: {
      "Driver Size": "40mm Titanium Dynamic",
      "Noise Cancellation": "Hybrid Active ANC (up to -38dB)",
      "Battery Life": "45 Hours (ANC On)",
      "Connectivity": "Bluetooth 5.3 & 3.5mm AUX",
      "Weight": "250g"
    },
    reviews: [
      { id: "r1", user: "Alexander Wright", avatar: "https://i.pravatar.cc/100?img=11", rating: 5, date: "2026-07-10", comment: "The soundstage is stunningly accurate. Bass is rich without muddying vocal clarity." },
      { id: "r2", user: "Elena Rostova", avatar: "https://i.pravatar.cc/100?img=5", rating: 5, date: "2026-06-28", comment: "Insanely comfortable for 8-hour work sessions. Noise cancellation silences plane noise totally." }
    ]
  },
  {
    id: "prod-2",
    title: "AeroBuds Pro Spatial Audio Earbuds",
    category: "Audio",
    brand: "AeroTech",
    price: 199.99,
    discount: 0,
    rating: 4.7,
    reviewsCount: 94,
    stock: 25,
    isFeatured: true,
    isBestSeller: false,
    badge: "New",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Compact wireless earbuds featuring 360-degree head-tracking spatial audio, IPX7 water resistance, and wireless fast-charging case.",
    specs: {
      "Spatial Audio": "Dynamic Head Tracking",
      "Water Resistance": "IPX7 Certified",
      "Battery": "8 hrs earbuds + 24 hrs case",
      "Charging": "Qi Wireless & USB-C Fast Charge"
    },
    reviews: [
      { id: "r3", user: "Marcus Vance", avatar: "https://i.pravatar.cc/100?img=12", rating: 5, date: "2026-07-02", comment: "Great fit for gym workouts. Sweatproof and crisp audio." }
    ]
  },
  {
    id: "prod-3",
    title: "VibeBox Studio Reference Bluetooth Speaker",
    category: "Audio",
    brand: "NovaSound",
    price: 279.00,
    discount: 10,
    rating: 4.8,
    reviewsCount: 62,
    stock: 8,
    isFeatured: false,
    isBestSeller: true,
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Handcrafted walnut cabinet studio speaker delivering room-filling 80W Hi-Fi stereo sound with built-in EQ dials and aptX HD lossless audio.",
    specs: {
      "Output Power": "80W RMS Peak",
      "Cabinet Material": "Natural Solid Walnut",
      "Codecs": "aptX HD, AAC, LDAC",
      "Inputs": "Bluetooth, Optical, RCA"
    },
    reviews: []
  },
  {
    id: "prod-4",
    title: "Pulse360 RGB Gaming Headset",
    category: "Audio",
    brand: "HyperGamer",
    price: 129.99,
    discount: 20,
    rating: 4.6,
    reviewsCount: 110,
    stock: 30,
    isFeatured: false,
    isBestSeller: false,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80"
    ],
    description: "7.1 Surround Sound gaming headset with noise-canceling detachable condenser mic, memory foam ear cushions, and dynamic RGB lighting.",
    specs: {
      "Surround": "Virtual 7.1 Channel",
      "Microphone": "Detachable Noise-Canceling",
      "Lighting": "Customizable RGB Aura Sync",
      "Compatibility": "PC, PS5, Xbox, Switch"
    },
    reviews: []
  },
  {
    id: "prod-5",
    title: "ZenMaster Open-Back Hi-Fi Headphones",
    category: "Audio",
    brand: "Audiophile Co",
    price: 599.00,
    discount: 0,
    rating: 5.0,
    reviewsCount: 42,
    stock: 5,
    isFeatured: true,
    isBestSeller: false,
    badge: "Limited",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Planar magnetic open-back headphones engineered for audio mastering engineers and high-end sound purists. Real sheepskin leather headband.",
    specs: {
      "Driver Type": "Planar Magnetic 90mm",
      "Frequency Response": "5Hz - 50,000Hz",
      "Impedance": "32 Ohms",
      "Cable": "Silver-plated OFC Braided"
    },
    reviews: []
  },

  // CATEGORY 2: WEARABLES & SMARTWATCHES (5 items)
  {
    id: "prod-6",
    title: "Nova Chrono Pro Titanium Smartwatch",
    category: "Wearables",
    brand: "NovaTech",
    price: 429.99,
    discount: 10,
    rating: 4.9,
    reviewsCount: 156,
    stock: 14,
    isFeatured: true,
    isBestSeller: true,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Grade 5 Titanium bezel smartwatch featuring Sapphire crystal glass, dual-frequency GPS, continuous SpO2 & ECG sensor, and 14-day battery life.",
    specs: {
      "Display": "1.43-inch AMOLED (1000 nits)",
      "Material": "Titanium + Sapphire Crystal",
      "Battery": "14 Days Typical Use",
      "Waterproofing": "10 ATM (100m Dive Rated)",
      "Sensors": "ECG, SpO2, Heart Rate, Skin Temp"
    },
    reviews: [
      { id: "r4", user: "David Miller", avatar: "https://i.pravatar.cc/100?img=14", rating: 5, date: "2026-07-15", comment: "Extremely durable, sleek design. The GPS tracking for trail runs is pin-point accurate." }
    ]
  },
  {
    id: "prod-7",
    title: "AeroFit Fitness Smart Tracker Band",
    category: "Wearables",
    brand: "AeroTech",
    price: 89.99,
    discount: 15,
    rating: 4.5,
    reviewsCount: 88,
    stock: 40,
    isFeatured: false,
    isBestSeller: false,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Ultra-lightweight activity tracker with 24/7 heart rate monitoring, sleep score analysis, 30+ sports modes, and 18-day long battery life.",
    specs: {
      "Weight": "22g Ultra Light",
      "Display": "1.1-inch Curved OLED",
      "Sports Modes": "35 Auto-detect Modes",
      "Battery": "18 Days"
    },
    reviews: []
  },
  {
    id: "prod-8",
    title: "Apex Luxe Minimalist Ceramic Watch",
    category: "Wearables",
    brand: "Apex Luxe",
    price: 310.00,
    discount: 0,
    rating: 4.8,
    reviewsCount: 39,
    stock: 12,
    isFeatured: false,
    isBestSeller: false,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
    ],
    description: "High-tech white zirconia ceramic smartwatch combining Swiss watchmaking aesthetics with silent notifications and haptic health reminders.",
    specs: {
      "Case": "White Zirconia Ceramic",
      "Glass": "Scratchproof Sapphire",
      "Mechanism": "Hybrid Quartz Movement + Smart Core"
    },
    reviews: []
  },
  {
    id: "prod-9",
    title: "Quantum Ring Sleep & Recovery Tracker",
    category: "Wearables",
    brand: "Quantum",
    price: 299.00,
    discount: 0,
    rating: 4.7,
    reviewsCount: 73,
    stock: 22,
    isFeatured: true,
    isBestSeller: false,
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Discreet smart ring crafted in medical-grade titanium that continuously tracks body temperature, HRV, sleep stages, and readiness score.",
    specs: {
      "Material": "PVD Coated Titanium",
      "Sensors": "Infrared Photoplethysmography, Temp Sensor",
      "Battery": "7 Days per charge"
    },
    reviews: []
  },
  {
    id: "prod-10",
    title: "Chrono Classic Mesh Rose Gold Edition",
    category: "Wearables",
    brand: "NovaTech",
    price: 249.99,
    discount: 25,
    rating: 4.6,
    reviewsCount: 51,
    stock: 15,
    isFeatured: false,
    isBestSeller: false,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Elegantly styled rose gold stainless steel mesh smartwatch featuring customized analog watch faces, NFC payments, and wellness tracking.",
    specs: {
      "Strap": "Rose Gold Milanese Mesh",
      "NFC": "Supported (Tap & Pay)",
      "Battery": "5 Days"
    },
    reviews: []
  },

  // CATEGORY 3: LAPTOPS & COMPUTING (5 items)
  {
    id: "prod-11",
    title: "NovaBook Ultra 15 M3 Carbon Laptop",
    category: "Laptops",
    brand: "NovaTech",
    price: 1499.99,
    discount: 10,
    rating: 4.9,
    reviewsCount: 204,
    stock: 9,
    isFeatured: true,
    isBestSeller: true,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Ultra-thin carbon fiber chassis ultrabook powered by 12-core processor, 32GB LPDDR5 RAM, 1TB NVMe Gen4 SSD, and 3.2K 120Hz OLED Display.",
    specs: {
      "Processor": "12-Core NextGen Chipset",
      "RAM": "32GB LPDDR5 6400MHz",
      "Storage": "1TB PCIe 4.0 NVMe SSD",
      "Screen": "15.6” 3.2K OLED 120Hz (100% DCI-P3)",
      "Weight": "1.24 kg"
    },
    reviews: [
      { id: "r5", user: "Sophia Chen", avatar: "https://i.pravatar.cc/100?img=20", rating: 5, date: "2026-07-18", comment: "The OLED screen contrast is jaw-dropping for video editing. Lightning fast compilation speed!" }
    ]
  },
  {
    id: "prod-12",
    title: "CyberForge RTX 4080 Gaming Rig Laptop",
    category: "Laptops",
    brand: "CyberForge",
    price: 2199.00,
    discount: 5,
    rating: 4.8,
    reviewsCount: 87,
    stock: 6,
    isFeatured: false,
    isBestSeller: false,
    badge: "Powerhouse",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Extreme performance gaming laptop with vapor chamber liquid cooling, mechanical per-key RGB keyboard, and QHD+ 240Hz display.",
    specs: {
      "GPU": "NVIDIA GeForce RTX 4080 16GB",
      "CPU": "Intel Core i9-14900HX",
      "Display": "17.3” QHD+ 240Hz 3ms G-Sync"
    },
    reviews: []
  },
  {
    id: "prod-13",
    title: "NovaDesk 27” 4K Ergonomic Studio Monitor",
    category: "Laptops",
    brand: "NovaTech",
    price: 549.99,
    discount: 15,
    rating: 4.7,
    reviewsCount: 114,
    stock: 16,
    isFeatured: false,
    isBestSeller: true,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Factory color-calibrated 4K IPS display with 90W USB-C single cable power delivery, HDR600 certification, and built-in studio speakers.",
    specs: {
      "Resolution": "3840 x 2160 (4K UHD)",
      "Panel": "IPS (Delta E < 1.0 Calibration)",
      "USB-C Hub": "90W Power Delivery + 4x USB 3.2"
    },
    reviews: []
  },
  {
    id: "prod-14",
    title: "KeyPro Wireless Low-Profile Mechanical Keyboard",
    category: "Laptops",
    brand: "KeyPro",
    price: 159.00,
    discount: 0,
    rating: 4.8,
    reviewsCount: 142,
    stock: 28,
    isFeatured: true,
    isBestSeller: false,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
    ],
    description: "CNC aluminum body wireless mechanical keyboard with hot-swappable tactile switches, multi-device Bluetooth switching, and RGB backlight.",
    specs: {
      "Body": "Anodized Aircraft Aluminum",
      "Switches": "Hot-swappable Low Profile Brown",
      "Connection": "2.4GHz, Bluetooth 5.1, USB-C"
    },
    reviews: []
  },
  {
    id: "prod-15",
    title: "Precision Ergonomic Vertical Wireless Mouse",
    category: "Laptops",
    brand: "NovaTech",
    price: 79.99,
    discount: 10,
    rating: 4.6,
    reviewsCount: 95,
    stock: 35,
    isFeatured: false,
    isBestSeller: false,
    badge: "Ergonomic",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Scientifically designed 57-degree vertical handshake grip mouse reducing forearm strain and wrist pressure with precision 4000 DPI sensor.",
    specs: {
      "Angle": "57 Degree Ergonomic Tilt",
      "Sensor": "Darkfield 4000 DPI Precision",
      "Rechargeable": "USB-C Fast Charge"
    },
    reviews: []
  },

  // CATEGORY 4: SMART HOME & CAMERAS (5 items)
  {
    id: "prod-16",
    title: "Lumina 4K Cinema Mirrorless Camera",
    category: "Cameras",
    brand: "Lumina",
    price: 1899.00,
    discount: 8,
    rating: 4.9,
    reviewsCount: 78,
    stock: 7,
    isFeatured: true,
    isBestSeller: true,
    badge: "Pro Choice",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "33MP Full-Frame mirrorless camera with 4K 120fps RAW video, 5-axis in-body image stabilization, and real-time AI eye tracking autofocus.",
    specs: {
      "Sensor": "33MP Full-Frame Exmor R CMOS",
      "Video": "4K 120p 10-bit 4:2:2 All-Intra",
      "Stabilization": "5-Axis IBIS (5.5 stops)",
      "Autofocus": "759 Phase-Detection AF Points"
    },
    reviews: [
      { id: "r6", user: "Julian Vance", avatar: "https://i.pravatar.cc/100?img=33", rating: 5, date: "2026-07-05", comment: "Dynamic range is unbelievable. Perfect low-light performance for wedding cinematography." }
    ]
  },
  {
    id: "prod-17",
    title: "NovaCam 4K Solar Wireless Security System",
    category: "Cameras",
    brand: "NovaTech",
    price: 299.99,
    discount: 15,
    rating: 4.7,
    reviewsCount: 165,
    stock: 20,
    isFeatured: false,
    isBestSeller: true,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80"
    ],
    description: "100% wire-free outdoor 4K security camera pack powered by continuous solar panel charging, color night vision, and AI vehicle/person detection.",
    specs: {
      "Resolution": "4K UHD Ultra Clear",
      "Power": "Monocrystalline Solar Panel + Battery",
      "Night Vision": "Full Color Spotlight Night Vision"
    },
    reviews: []
  },
  {
    id: "prod-18",
    title: "Halo Ambient Smart LED Tower Lamps (Pair)",
    category: "Smart Home",
    brand: "Lumina",
    price: 139.99,
    discount: 10,
    rating: 4.6,
    reviewsCount: 92,
    stock: 24,
    isFeatured: false,
    isBestSeller: false,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Smart RGBIC light bars with music reactive rhythm sync, screen mirror sync app controls, and integration with Alexa and Google Home.",
    specs: {
      "LED Type": "RGBIC Segmented Colors",
      "Control": "WiFi 2.4GHz + Voice Assistant",
      "Sync": "Real-time Audio & Screen Sync"
    },
    reviews: []
  },
  {
    id: "prod-19",
    title: "PureBreeze HEPA Smart Air Purifier Pro",
    category: "Smart Home",
    brand: "BreezeCorp",
    price: 229.00,
    discount: 0,
    rating: 4.8,
    reviewsCount: 104,
    stock: 14,
    isFeatured: true,
    isBestSeller: false,
    badge: "Healthy Living",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Medical grade H13 True HEPA filtration system removing 99.97% of airborne pollen, pet dander, viruses, and smoke in rooms up to 800 sq ft.",
    specs: {
      "Filter": "H13 True HEPA + Activated Carbon",
      "Coverage": "800 sq ft (4 ACH)",
      "Noise Level": "Ultra-quiet 22dB Sleep Mode"
    },
    reviews: []
  },
  {
    id: "prod-20",
    title: "NovaRobo Vacuum & Sonic Mop Station",
    category: "Smart Home",
    brand: "NovaTech",
    price: 799.99,
    discount: 18,
    rating: 4.9,
    reviewsCount: 210,
    stock: 11,
    isFeatured: true,
    isBestSeller: true,
    badge: "Hot Deal",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Auto-emptying, auto-mop washing robot vacuum with LiDAR 3D obstacle avoidance, 6000Pa hyper suction, and carpet detection mop lifting.",
    specs: {
      "Suction": "6000Pa Extreme HyperSuction",
      "Docking Station": "Self-Emptying + Self-Washing & Hot Air Drying",
      "Navigation": "LiDAR 3D Structured Light"
    },
    reviews: []
  },

  // CATEGORY 5: APPAREL & LUXURY FOOTWEAR (5 items)
  {
    id: "prod-21",
    title: "Nova Classic Merino Wool Blazer",
    category: "Apparel",
    brand: "Nova Collection",
    price: 289.00,
    discount: 0,
    rating: 4.8,
    reviewsCount: 47,
    stock: 18,
    isFeatured: true,
    isBestSeller: false,
    badge: "Luxury",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Italian woven 100% Super 120s extra-fine Merino Wool unstructured tailored blazer. Designed for timeless comfort and breathable drape.",
    specs: {
      "Material": "100% Italian Super 120s Merino Wool",
      "Fit": "Modern Slim Structured",
      "Care": "Dry Clean Only"
    },
    reviews: []
  },
  {
    id: "prod-22",
    title: "AeroStep Nitro Knit Running Sneakers",
    category: "Apparel",
    brand: "AeroSport",
    price: 169.99,
    discount: 15,
    rating: 4.9,
    reviewsCount: 182,
    stock: 32,
    isFeatured: false,
    isBestSeller: true,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Carbon plate infused marathon running shoes with nitrogen-blown foam cushioning, engineered breathable seamless mesh, and high-traction rubber.",
    specs: {
      "Midsole": "NitroFoam + Carbon Fiber Plate",
      "Weight": "198g Ultra-light",
      "Drop": "8mm Heel-to-Toe Drop"
    },
    reviews: [
      { id: "r7", user: "Liam O'Connor", avatar: "https://i.pravatar.cc/100?img=15", rating: 5, date: "2026-07-12", comment: "Shaved 2 minutes off my 10k PR. Incredible energy return!" }
    ]
  },
  {
    id: "prod-23",
    title: "Urban Minimalist Waterproof Parka Jacket",
    category: "Apparel",
    brand: "Nova Collection",
    price: 249.00,
    discount: 10,
    rating: 4.7,
    reviewsCount: 64,
    stock: 12,
    isFeatured: false,
    isBestSeller: false,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80"
    ],
    description: "3-layer seam-sealed Gore-Tex waterproof trench parka featuring thermal insulation lining, magnetic snap buttons, and hidden phone pockets.",
    specs: {
      "Membrane": "3-Layer Waterproof Gore-Tex",
      "Insulation": "Primaloft Gold Thermal Eco",
      "Rating": "20,000mm Waterproof / 15,000g Breathability"
    },
    reviews: []
  },
  {
    id: "prod-24",
    title: "Monaco Italian Calfskin Leather Loafers",
    category: "Apparel",
    brand: "Monaco Luxury",
    price: 320.00,
    discount: 0,
    rating: 4.8,
    reviewsCount: 38,
    stock: 9,
    isFeatured: true,
    isBestSeller: false,
    badge: "Handcrafted",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Goodyear welted Italian full-grain calfskin leather dress shoes with padded leather insoles and hand-burnished cognac finish.",
    specs: {
      "Upper": "Full Grain Italian Calfskin",
      "Construction": "Goodyear Welted",
      "Sole": "Hand-stitched Leather Sole"
    },
    reviews: []
  },
  {
    id: "prod-25",
    title: "Essential Organic Heavyweight Hoodie",
    category: "Apparel",
    brand: "Nova Basics",
    price: 85.00,
    discount: 0,
    rating: 4.6,
    reviewsCount: 140,
    stock: 50,
    isFeatured: false,
    isBestSeller: true,
    badge: "Eco Organic",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "480 GSM 100% GOTS-certified organic French terry cotton hoodie with double-walled hood, ribbed cuffs, and relaxed oversized silhouette.",
    specs: {
      "Fabric Weight": "480 GSM Heavyweight",
      "Certification": "GOTS Certified Organic",
      "Fit": "Relaxed Dropped Shoulder"
    },
    reviews: []
  },

  // CATEGORY 6: ACCESSORIES & LIFESTYLE (5 items)
  {
    id: "prod-26",
    title: "Voyager Full-Grain Leather Travel Duffle",
    category: "Accessories",
    brand: "Voyager Goods",
    price: 349.00,
    discount: 12,
    rating: 4.9,
    reviewsCount: 118,
    stock: 10,
    isFeatured: true,
    isBestSeller: true,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Weekend holdall handcrafted from vegetable-tanned full-grain leather with dedicated shoe compartment, padded 16-inch laptop sleeve, and YKK brass zippers.",
    specs: {
      "Leather": "Hand-tanned Full Grain Cowhide",
      "Capacity": "45 Liters Carry-On Approved",
      "Hardware": "Solid Antiqued Brass"
    },
    reviews: [
      { id: "r8", user: "Gavin Ross", avatar: "https://i.pravatar.cc/100?img=60", rating: 5, date: "2026-06-20", comment: "The leather patina develops so beautifully after travel trips." }
    ]
  },
  {
    id: "prod-27",
    title: "AeroPolarized Titanium Aviation Sunglasses",
    category: "Accessories",
    brand: "AeroTech",
    price: 185.00,
    discount: 0,
    rating: 4.8,
    reviewsCount: 76,
    stock: 21,
    isFeatured: false,
    isBestSeller: false,
    badge: "UV400",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Featherlight Japanese Beta-Titanium frames paired with 9-layer anti-reflective polarized lenses offering 100% UV400 protection.",
    specs: {
      "Frame": "Japanese Beta-Titanium (14 grams)",
      "Lenses": "Tac Polarized HD Glass",
      "Protection": "UV400 + Blue Light Shield"
    },
    reviews: []
  },
  {
    id: "prod-28",
    title: "ScentStudio Organic Amber & Oud Diffuser",
    category: "Accessories",
    brand: "ScentStudio",
    price: 65.00,
    discount: 0,
    rating: 4.7,
    reviewsCount: 52,
    stock: 35,
    isFeatured: false,
    isBestSeller: false,
    badge: "Aroma",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Hand-blended natural essential oil reed diffuser infused with dark amber, smoked oud wood, and bergamot. Lasts up to 6 months.",
    specs: {
      "Volume": "250ml Glass Bottle",
      "Lifespan": "5 - 6 Months Diffusion",
      "Ingredients": "100% Pure Botanical Essential Oils"
    },
    reviews: []
  },
  {
    id: "prod-29",
    title: "NovaMag 3-in-1 Wireless Charging Stand",
    category: "Accessories",
    brand: "NovaTech",
    price: 99.99,
    discount: 20,
    rating: 4.8,
    reviewsCount: 168,
    stock: 27,
    isFeatured: true,
    isBestSeller: true,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1622445268465-843d31d11531?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1622445268465-843d31d11531?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Sleek aluminum desktop stand magnetically fast-charging your Smartphone, Smartwatch, and Wireless Earbuds simultaneously at 15W.",
    specs: {
      "Power Output": "15W MagFast + 5W Watch + 5W Buds",
      "Material": "Anodized Space Gray Aluminum",
      "Safety": "Overheat & Foreign Object Protection"
    },
    reviews: []
  },
  {
    id: "prod-30",
    title: "Minimalist RFID Slim Cardholder Wallet",
    category: "Accessories",
    brand: "Voyager Goods",
    price: 49.99,
    discount: 0,
    rating: 4.6,
    reviewsCount: 130,
    stock: 45,
    isFeatured: false,
    isBestSeller: false,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Aerospace-grade aluminum cardholder with quick trigger ejection mechanism, integrated money clip, and military-grade RFID blocking.",
    specs: {
      "Capacity": "1 - 12 Cards + Cash",
      "Security": "RFID & NFC Blocking Shield",
      "Weight": "65 grams"
    },
    reviews: []
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Products", icon: "fa-border-all" },
  { id: "Audio", name: "Audio & Sound", icon: "fa-headphones" },
  { id: "Wearables", name: "Smart Wearables", icon: "fa-stopwatch" },
  { id: "Laptops", name: "Laptops & Tech", icon: "fa-laptop" },
  { id: "Cameras", name: "Cameras & Vision", icon: "fa-camera" },
  { id: "Smart Home", name: "Smart Home", icon: "fa-house-signal" },
  { id: "Apparel", name: "Apparel & Shoes", icon: "fa-shirt" },
  { id: "Accessories", name: "Lifestyle & Gear", icon: "fa-glasses" }
];
