/**
 * sxanghai Portfolio Data Store & Local Storage Persistence
 * All project, video, photography, and personal details can be edited here or in the Studio Dashboard.
 */

const STORAGE_KEY = 'sxanghai_portfolio_store_v1';
const PASSCODE_KEY = 'sxanghai_admin_passcode';

const initialPortfolioData = {
  // Personal & Brand Information
  brand: {
    name: "sxanghai",
    title: "Graphic Designer • Video Editor • Photographer",
    location: "Phnom Penh City",
    fullLocation: "Phnom Penh City, Cambodia",
    emailHandle: "sxanghai",
    email: "sxanghai@example.com", // Replace with your actual email address (e.g., hello@sxanghai.com)
    availability: "Available for new projects & collaborations",
    bio: "Graphic Designer with focused expertise in visual identity and print systems, complemented by cinematic video editing and architectural/product photography. Based in Phnom Penh, crafting deliberate visual work that connects with people.",
    socials: [
      { name: "Behance", url: "https://www.behance.net/sxanghai", icon: "behance" },
      { name: "Instagram", url: "https://www.instagram.com/sxanghai", icon: "instagram" },
      { name: "Facebook", url: "https://www.facebook.com/sxanghai", icon: "facebook" },
      { name: "YouTube", url: "https://www.youtube.com/@sxanghai", icon: "youtube" },
      { name: "Telegram", url: "https://t.me/sxanghai", icon: "telegram" }
    ]
  },

  // Selected Projects (Graphic Design, Video Editing, Photography)
  projects: [
    {
      id: "luminary-identity",
      title: "Luminary Visual Identity",
      category: "Graphic Design",
      subCategory: "Brand Identity & Systems",
      year: "2026",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "aspect-16-10",
      overview: "A cohesive brand identity redesign for a contemporary creative studio, focusing on tactile print collateral, custom typographic marks, and an adaptive digital design system.",
      role: "Lead Graphic Designer — Identity Design, Typography, Print Specifications",
      approach: "Constructed a stark, timeless visual architecture anchored by custom grotesque typography and unbleached cotton paper stocks. The design eliminates visual noise to let the studio's portfolio command full attention.",
      deliverables: ["Primary & Secondary Logomarks", "Typography Guidelines", "Stationery & Packaging Suite", "Digital Brand Guidelines"],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1400&auto=format&fit=crop",
          caption: "Stationery suite printed on textured off-white stock with blind debossing."
        },
        {
          url: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1400&auto=format&fit=crop",
          caption: "Custom editorial layout and typography system for brand publications."
        },
        {
          url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1400&auto=format&fit=crop",
          caption: "Color harmony and modular collateral application."
        }
      ]
    },
    {
      id: "kroma-campaign",
      title: "Kroma Modern Art Campaign",
      category: "Graphic Design",
      subCategory: "Marketing Campaign & Posters",
      year: "2025",
      featured: false,
      thumbnail: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "aspect-4-5",
      overview: "An outdoor and digital campaign for an experimental visual exhibition in Phnom Penh, exploring dynamic typography, risograph color separations, and modular grid disruptions.",
      role: "Graphic Designer & Campaign Art Director",
      approach: "Balanced strict Swiss grid discipline with fluid letterforms to express tension between order and organic discovery. The series was rolled out across street banners, digital transit totems, and social teasers.",
      deliverables: ["Exhibition Poster Series", "Digital Transit Ads", "Social Media Campaign Assets", "Wayfinding Program"],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1400&auto=format&fit=crop",
          caption: "Primary exhibition poster featuring high-contrast geometric typography."
        },
        {
          url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1400&auto=format&fit=crop",
          caption: "Experimental print proofing and tactile pigment separation."
        }
      ]
    },
    {
      id: "nomad-coffee",
      title: "Nomad Botanical Coffee",
      category: "Graphic Design",
      subCategory: "Packaging & Social Media",
      year: "2025",
      featured: false,
      thumbnail: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "aspect-16-10",
      overview: "Complete packaging architecture and launch social media suite for an artisanal micro-roastery, highlighting origin transparency and minimalist shelf presence.",
      role: "Packaging & Social Media Designer",
      approach: "Developed an earth-tone metallic foil label system coupled with an educational social media grid format that deconstructs roasting notes through clean infographics and macro photography.",
      deliverables: ["Retail Bag Packaging", "Tasting Notes Card System", "30-Day Launch Social Grid", "Instagram Stories Templates"],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1400&auto=format&fit=crop",
          caption: "Minimalist ceramic packaging and typographic label detail."
        },
        {
          url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1400&auto=format&fit=crop",
          caption: "Artisan coffee storytelling and brand photography direction."
        }
      ]
    },
    {
      id: "aura-monograph",
      title: "Aura Architectural Monograph",
      category: "Graphic Design",
      subCategory: "Print Design & Editorial Book",
      year: "2026",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "aspect-4-5",
      overview: "A 240-page hardcover publication documenting tropical brutalist architecture in Southeast Asia, with meticulous attention to paper textures, binding, and asymmetric typographic layouts.",
      role: "Editorial Designer & Pre-press Specialist",
      approach: "Prioritized generous negative space and rhythmic pacing. Images were paired with quiet, technical captions and bespoke index markers, honoring the monumental concrete structures depicted inside.",
      deliverables: ["Hardcover Book Binding & Slipcase", "Grid & Typographic Hierarchy", "Paper Stock Curation", "Exhibition Catalog"],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1400&auto=format&fit=crop",
          caption: "Editorial spread highlighting asymmetric grid systems and white space."
        },
        {
          url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1400&auto=format&fit=crop",
          caption: "Hardcover linen binding with blind-embossed foil typography."
        }
      ]
    },
    {
      id: "urban-echoes",
      title: "Urban Echoes: Phnom Penh",
      category: "Video Editing",
      subCategory: "Cinematic Short & Event Coverage",
      year: "2025",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "aspect-16-9",
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      overview: "A sensory cinematic documentary capturing the vibrant pulse, night markets, and architectural evolution of Phnom Penh through rhythmic editing and atmospheric sound design.",
      role: "Video Editor, Sound Designer & Colorist",
      approach: "Paced the cut to ambient street recordings and neo-classical synths. Utilized split-second match cuts and filmic color grading to bridge historical French colonial facades with modern metropolitan neon.",
      deliverables: ["4K Cinematic Cut (3:20)", "Vertical Teaser Reels (9:16)", "Custom Sound Mix & Foley", "Film LUT Grade Package"],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1400&auto=format&fit=crop",
          caption: "Cinematic night grade contrasting warm ambient lights with charcoal shadows."
        },
        {
          url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1400&auto=format&fit=crop",
          caption: "Color grading breakdown and waveform calibration."
        }
      ]
    },
    {
      id: "veloce-launch",
      title: "Veloce Brand Launch Film",
      category: "Video Editing",
      subCategory: "Promotional Video & Commercial",
      year: "2026",
      featured: false,
      thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "aspect-16-9",
      videoUrl: "https://www.youtube.com/embed/L_LUpnjgPso",
      overview: "High-energy commercial spot for an urban mobility concept, merging live-action performance with kinetic typography and precision sound design.",
      role: "Commercial Video Editor & Motion Designer",
      approach: "Created an intoxicating cadence using speed ramps, typography tracking, and precision audio stems, keeping viewer retention exceptionally high on both widescreen and vertical social cuts.",
      deliverables: ["60s Director's Cut", "30s Commercial Broadcast Spot", "15s Social Cutdowns", "Motion Graphics Title Package"],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1400&auto=format&fit=crop",
          caption: "Motion design overlay frame test for commercial broadcast."
        },
        {
          url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1400&auto=format&fit=crop",
          caption: "Editing timeline structure and audio stem balancing."
        }
      ]
    },
    {
      id: "silhouettes-concrete",
      title: "Silhouettes in Concrete",
      category: "Photography",
      subCategory: "Architectural Photography Series",
      year: "2025",
      featured: false,
      thumbnail: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "aspect-4-5",
      overview: "A study of light, geometry, and raw textures across contemporary structural forms, documenting how natural sunlight carves monolithic volumes.",
      role: "Photographer & Digital Retoucher",
      approach: "Shot during golden hour and mid-afternoon harsh light to accentuate brutalist planar contrasts. Graded with deep, velvety blacks and soft highlights to emphasize structural purity.",
      deliverables: ["12-Piece Exhibition Print Series", "High-Resolution Archival TIFFs", "Location Scouting & Sunlight Mapping"],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1400&auto=format&fit=crop",
          caption: "Diagonal light falloff across cast concrete surfaces."
        },
        {
          url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop",
          caption: "Geometric perspective emphasizing clean repetitive lines."
        }
      ]
    },
    {
      id: "aether-chronograph",
      title: "Aether Minimalist Watch",
      category: "Photography",
      subCategory: "Product & Commercial Still Life",
      year: "2026",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
      aspectRatio: "aspect-1-1",
      overview: "Studio macro product series spotlighting brushed titanium finishes, sapphire crystal reflections, and hand-finished leather details.",
      role: "Product Photographer & Commercial Retoucher",
      approach: "Employed specialized diffusers and flag cards to sculpt reflections across metallic chamfers without losing watch dial micro-textures. Finished with micro-contrast color balancing.",
      deliverables: ["Hero E-Commerce Product Stills", "Lifestyle Editorial Assets", "Macro Detail Crops", "Clean Retouching & Compositing"],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1400&auto=format&fit=crop",
          caption: "Hero product perspective on matte textured stone pedestal."
        },
        {
          url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1400&auto=format&fit=crop",
          caption: "Precision macro lighting highlighting brushed bezel finish."
        }
      ]
    }
  ],

  // Video Showcase Section
  videos: {
    featured: {
      id: "showreel-2026",
      title: "2026 Creative & Motion Showreel",
      category: "Featured Showreel",
      duration: "01:45",
      year: "2026",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1400&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      description: "A curated montage blending brand commercial cuts, kinetic typography, dynamic social video edits, and documentary storytelling."
    },
    items: [
      {
        id: "vid-urban-echoes",
        title: "Urban Echoes: Phnom Penh",
        category: "Event & Cultural Film",
        duration: "03:20",
        year: "2025",
        thumbnail: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=800&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
        description: "Atmospheric evening portrait of Phnom Penh's living streets and modern architecture."
      },
      {
        id: "vid-veloce-promo",
        title: "Veloce Brand Launch",
        category: "Commercial & Promotional",
        duration: "01:00",
        year: "2026",
        thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/embed/L_LUpnjgPso",
        description: "Kinetic commercial cut featuring fast-paced audio synchronization and typography."
      },
      {
        id: "vid-design-process",
        title: "Craft & Materiality: Behind The Scenes",
        category: "Social Content & Storytelling",
        duration: "02:10",
        year: "2025",
        thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
        description: "Intimate documentary look into print craft, typography proofing, and studio production."
      }
    ]
  },

  // Photography Gallery (Balanced Portrait & Landscape with Lightbox)
  photography: [
    {
      id: "photo-1",
      title: "Monolithic Shadows",
      category: "Architecture",
      location: "Phnom Penh",
      aspect: "portrait",
      thumbnail: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
      full: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
      notes: "Brutalist facade caught in high-noon sunlight. Pure geometric rhythm."
    },
    {
      id: "photo-2",
      title: "Riverfront Solitude",
      category: "City & Atmosphere",
      location: "Phnom Penh City",
      aspect: "landscape",
      thumbnail: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop",
      full: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1600&auto=format&fit=crop",
      notes: "Quiet twilight tones reflecting over the urban water horizon."
    },
    {
      id: "photo-3",
      title: "Aether Chronograph Detail",
      category: "Product & Still Life",
      location: "Studio",
      aspect: "portrait",
      thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      full: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop",
      notes: "Direct macro lighting on titanium chamfers and clean typography."
    },
    {
      id: "photo-4",
      title: "Minimal Interior Lines",
      category: "Architecture",
      location: "Phnom Penh",
      aspect: "landscape",
      thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      full: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
      notes: "Soft indirect light filling open architectural volume."
    },
    {
      id: "photo-5",
      title: "Raw Ceramics & Texture",
      category: "Still Life",
      location: "Studio",
      aspect: "portrait",
      thumbnail: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1000&auto=format&fit=crop",
      full: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1600&auto=format&fit=crop",
      notes: "Study of tactile surfaces, natural clay grain, and directional shadow."
    },
    {
      id: "photo-6",
      title: "Urban Facade Grid",
      category: "Architecture",
      location: "Phnom Penh City",
      aspect: "landscape",
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      full: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
      notes: "Repetitive modern window modules in cool morning light."
    }
  ],

  // Services (3 Focused Columns)
  services: [
    {
      number: "01",
      badge: "Main Focus",
      title: "Graphic Design",
      description: "Intentional visual identities, marketing collateral, and publication design built to endure and communicate with clarity.",
      deliverables: [
        "Brand Identity & Logo Systems",
        "Marketing Campaigns & Posters",
        "Social Media Content Systems",
        "Editorial, Books & Print Collateral",
        "Packaging & Label Architecture"
      ]
    },
    {
      number: "02",
      badge: "Motion & Cut",
      title: "Video Editing",
      description: "Paced, narrative-driven editing and color grading that transforms raw footage into compelling brand stories and high-impact social content.",
      deliverables: [
        "Brand Promotional Videos",
        "High-Retention Social Video Content",
        "Event Highlights & Documentaries",
        "Cinematic Color Grading (LUTs)",
        "Sound Design & Audio Synchronization"
      ]
    },
    {
      number: "03",
      badge: "Visual Capture",
      title: "Photography",
      description: "Clean, atmospheric imagery highlighting the honest beauty of products, architectural spaces, and authentic moments.",
      deliverables: [
        "Commercial Product Photography",
        "Architectural & Interior Documentation",
        "Lifestyle & Brand Imagery",
        "Event & Cultural Coverage",
        "High-End Retouching & Color Grading"
      ]
    }
  ],

  // About Me Details
  about: {
    portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    headline: "Visual craft grounded in intention, composition, and storytelling.",
    lead: "I am a multidisciplinary visual creator based in Phnom Penh City, specializing in Graphic Design as my primary discipline, along with cinematic Video Editing and Photography.",
    body: "My creative philosophy centers on restraint and clarity. Whether shaping a brand's visual identity, pacing a narrative cut for a video, or framing an architectural space through the lens, I look for the core idea and strip away the superfluous. Every layout, color choice, and cut serves to strengthen the connection between the story and the audience.",
    principles: [
      {
        title: "Visual Communication",
        desc: "Designing with hierarchy, purpose, and deliberate typographic rhythm so every message is understood instantly."
      },
      {
        title: "Storytelling & Pacing",
        desc: "Structuring video sequences and brand narratives with emotional resonance, whether in 15 seconds or a long-form cut."
      },
      {
        title: "Composition & Form",
        desc: "Employing balanced proportions, intentional negative space, and architectural balance across digital and physical mediums."
      },
      {
        title: "Attention to Detail",
        desc: "Meticulous focus on color grading fidelity, print production tolerances, typography kerning, and pixel-level precision."
      }
    ]
  }
};

// ==========================================================================
// LocalStorage Persistence & Data Management Layer
// ==========================================================================

function getStoredData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...initialPortfolioData,
        ...parsed,
        brand: { ...initialPortfolioData.brand, ...(parsed.brand || {}) },
        projects: Array.isArray(parsed.projects) ? parsed.projects : initialPortfolioData.projects,
        videos: parsed.videos || initialPortfolioData.videos,
        photography: Array.isArray(parsed.photography) ? parsed.photography : initialPortfolioData.photography,
        services: Array.isArray(parsed.services) ? parsed.services : initialPortfolioData.services,
        about: { ...initialPortfolioData.about, ...(parsed.about || {}) }
      };
    }
  } catch (err) {
    console.warn('Could not read portfolio store from localStorage:', err);
  }
  return JSON.parse(JSON.stringify(initialPortfolioData));
}

// Active mutable portfolio data instance
let portfolioData = getStoredData();

// Save updated state to localStorage and broadcast event
function savePortfolioStore(data) {
  try {
    portfolioData = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('portfolioDataUpdated', { detail: data }));
    return true;
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
    return false;
  }
}

// Reset back to initial baseline data
function resetPortfolioStore() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    portfolioData = JSON.parse(JSON.stringify(initialPortfolioData));
    window.dispatchEvent(new CustomEvent('portfolioDataUpdated', { detail: portfolioData }));
    return true;
  } catch (err) {
    console.error('Failed to reset store:', err);
    return false;
  }
}

// Admin passcode management (Default: "sxanghai")
function getAdminPasscode() {
  return localStorage.getItem(PASSCODE_KEY) || 'sxanghai';
}

function setAdminPasscode(newCode) {
  if (!newCode) return false;
  localStorage.setItem(PASSCODE_KEY, newCode);
  return true;
}

function checkAdminAuthenticated() {
  return sessionStorage.getItem('sxanghai_auth') === 'true';
}

function setAdminAuthenticated(status) {
  if (status) {
    sessionStorage.setItem('sxanghai_auth', 'true');
  } else {
    sessionStorage.removeItem('sxanghai_auth');
  }
}
