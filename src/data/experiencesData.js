export const experiencesData = {
  wellness: {
    category: 'Holistic Wellness & Spa',
    title: 'Sanctuary of the Senses: Ancient Rituals & Modern Vitality',
    description: 'Immerse in geothermal onsen baths, Tibetan sound resonance chambers, and bespoke Ayurvedic therapies administered by master practitioners.',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80',
    items: [
      {
        id: 'hydro-onsen',
        title: 'Geothermal Mineral Hydrotherapy & Steam',
        duration: '90 Minutes',
        price: 180,
        rating: 4.98,
        location: 'Kyoto Sanctuary & Swiss Crest',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
        highlights: ['Volcanic sulfur hot springs', 'Cedar aroma sauna', 'Cold plunge cascade', 'Matcha electrolyte tonic'],
        summary: 'Alternating thermal baths infused with essential botanical oils to stimulate circulation, lymphatic drainage, and deep cellular release.'
      },
      {
        id: 'sound-healing',
        title: 'Sacred Cenote Tibetan Singing Bowl Therapy',
        duration: '75 Minutes',
        price: 160,
        rating: 4.99,
        location: 'Tulum Cenote & Baa Atoll',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
        highlights: ['Handmade planetary singing bowls', 'Floating acoustic pads', 'Breathwork session', 'Smudging ceremony'],
        summary: 'Suspended in warm buoyant waters as multi-frequency sound vibrations re-align autonomic nervous system harmony.'
      },
      {
        id: 'ayurveda-vitality',
        title: 'Abhyanga Herbal Body Awakening & Shirodhara',
        duration: '120 Minutes',
        price: 240,
        rating: 4.97,
        location: 'Baa Atoll Biosphere',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80',
        highlights: ['Warm medicated herbal oils', 'Continuous forehead oil flow', 'Marma point stimulation', 'Custom dosha tea'],
        summary: 'Synchronized four-hand warm oil massage followed by rhythmic herbal oil pour to ease mental tension and restore deep restorative sleep.'
      }
    ]
  },
  dining: {
    category: 'Culinary Arts & Cellars',
    title: 'Epicurean Journeys: Zero-Kilometer Gastronomy',
    description: 'Michelin-starred master chefs blending ancestral cooking techniques with organic ingredients harvested straight from sanctuary gardens and surrounding waters.',
    heroImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=80',
    items: [
      {
        id: 'kaiseki-masters',
        title: 'Eleven-Course Seasonal Kyoto Kaiseki Banquet',
        duration: '3 Hours',
        price: 320,
        rating: 5.0,
        location: 'Kyoto Arashiyama',
        image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
        highlights: ['Wagyu A5 beef', 'Wild mountain herbs', 'Rare vintage Junmai Daiginjo sake pairing', 'Private garden seating'],
        summary: 'A poetic celebration of the seasons cooked by 3-star Michelin disciple Chef Kenzo Takahashi overlooking moonlit bamboo.'
      },
      {
        id: 'undersea-wine',
        title: 'Coral Atoll Undersea Wine Tasting & Caviar',
        duration: '2.5 Hours',
        price: 380,
        rating: 4.98,
        location: 'Baa Atoll Biosphere',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
        highlights: ['6 Meters submerged cellar', 'Grand Cru Champagne', 'Beluga caviar pairing', 'Marine biologist commentary'],
        summary: 'Sample rare biodynamic vintages inside our underwater acrylic dome while manta rays and reef sharks glide overhead.'
      },
      {
        id: 'amalfi-cliff-pasta',
        title: 'Amalfi Lemon Grove Private Chef Table',
        duration: '2.5 Hours',
        price: 260,
        rating: 4.96,
        location: 'Amalfi Cliffside Perch',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
        highlights: ['Handmade Scialatielli pasta', 'Fresh Amalfi sea bass', 'Limoncello sorbet', 'Sunset cliff veranda'],
        summary: 'Learn heirloom pasta making before dining family-style under illuminated lemon trees overlooking Positano harbor.'
      }
    ]
  },
  adventures: {
    category: 'Eco Adventures & Safaris',
    title: 'Uncharted Horizons: Respectful Nature Expeditions',
    description: 'Immersive low-impact expeditions led by resident marine biologists, alpine guides, and cultural historians.',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=80',
    items: [
      {
        id: 'manta-safari',
        title: 'Hanifaru Bay Bioluminescent Manta Snorkel',
        duration: '4 Hours',
        price: 210,
        rating: 5.0,
        location: 'Baa Atoll Biosphere',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        highlights: ['UNESCO marine reserve access', 'Underwater photography included', 'Manta identification tagging', 'Silent electric boat'],
        summary: 'Swim alongside dozens of feeding gentle manta rays in one of the world’s most pristine marine biospheres.'
      },
      {
        id: 'matterhorn-heli-trek',
        title: 'Glacier Heli-Hike & High Altitude Fondue',
        duration: '5 Hours',
        price: 490,
        rating: 4.99,
        location: 'Zermatt Alpine Crest',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        highlights: ['Electric helicopter flight', 'Crampon glacier navigation', 'Glacier ice cave tour', 'Summit fondue picnic'],
        summary: 'Fly to untouched alpine glaciers with UIAGM mountain guides and explore mystical blue ice caves before a scenic summit lunch.'
      },
      {
        id: 'mayan-cenote-dive',
        title: 'Subterranean Mayan Cenote Cave Exploration',
        duration: '3.5 Hours',
        price: 190,
        rating: 4.95,
        location: 'Tulum Cenote Sanctuary',
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
        highlights: ['Sacred underground stalactites', 'Crystal clear cave water', 'Eco torchlights', 'Mayan elder blessings'],
        summary: 'Guided dive through ancient limestone caverns holding crystal clear water filtered through centuries of bedrock.'
      }
    ]
  },
  retreats: {
    category: 'Private Bespoke Retreats',
    title: 'Transformational Journeys: Mind, Body & Reconnection',
    description: 'Multi-day curated retreats designed around intentional rest, digital detox, and personal transformation in protected sanctuaries.',
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80',
    items: [
      {
        id: 'zen-mindfulness',
        title: 'Kyoto 5-Day Silent Zazen & Calligraphy Immersion',
        duration: '5 Days',
        price: 1850,
        rating: 4.99,
        location: 'Kyoto Arashiyama',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
        highlights: ['Daily private Zen master sessions', 'Shodo Japanese calligraphy', 'Temple dawn chanting', 'Forest bathing (Shinrin-yoku)'],
        summary: 'A transformative guided journey to still the mind, learn traditional brushwork, and reconnect with nature.'
      },
      {
        id: 'alpine-detox',
        title: 'Swiss Crest 4-Day Thermal Recovery & Breathwork',
        duration: '4 Days',
        price: 1600,
        rating: 4.98,
        location: 'Zermatt Alpine Crest',
        image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80',
        highlights: ['Wim Hof cold water immersion', 'High-altitude oxygen therapy', 'Custom herbal detox menu', 'Glacier sound baths'],
        summary: 'Recharge cellular energy through thermal contrast therapy, targeted breathwork, and clean alpine botanicals.'
      },
      {
        id: 'biophilic-renewal',
        title: 'Tulum 3-Day Sound & Mayan Herbal Renewal',
        duration: '3 Days',
        price: 1250,
        rating: 4.97,
        location: 'Tulum Cenote Sanctuary',
        image: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=800&q=80',
        highlights: ['Traditional Temazcal ceremony', 'Sacred cacao ritual', 'Chakra acoustic alignment', 'Sunrise yoga on canopy nets'],
        summary: 'Cleanse past stress in ancient steam sweat lodges, celebrate with organic cacao, and align with jungle frequencies.'
      }
    ]
  }
};
