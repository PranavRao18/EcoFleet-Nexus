import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Icons (lucide-react or similar)
import { 
  Leaf, 
  Check, 
  MapPin, 
  TreePine, 
  Users, 
  Truck, 
  ShoppingCart, 
  Zap, 
  Award, 
  Package, 
  ArrowLeft, 
  ChevronRight, 
  Eye 
} from 'lucide-react';

// Mock Products Data (extended from previous)
const mockProducts = [
  {
    id: '1',
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop"
    ],
    ecoScore: "A+",
    co2Footprint: "0.8 kg CO₂e",
    co2Reduction: 37,
    packagingType: "Plant-Based",
    category: "Clothing",
    description: "Made from 100% certified organic cotton, this ultra-soft t-shirt combines comfort with environmental responsibility. Produced using sustainable farming practices that support soil health and biodiversity.",
    materials: [
      { name: "Organic Cotton", percentage: 100, sustainability: "A+" },
    ],
    supplyChain: [
      { stage: "Raw Materials", location: "India", co2: "0.2 kg", sustainability: "A+" },
      { stage: "Manufacturing", location: "Bangladesh", co2: "0.4 kg", sustainability: "A" },
      { stage: "Transportation", location: "Global", co2: "0.2 kg", sustainability: "B+" }
    ],
    carbonSavings: "2.1 kg CO₂e vs average",
    inStock: true,
    rating: 4.8,
    reviews: 247
  },
  {
    id: '2',
    name: "Bamboo Fiber Hoodie",
    price: 49.99,
    originalPrice: 64.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop"
    ],
    ecoScore: "A",
    co2Footprint: "1.2 kg CO₂e",
    co2Reduction: 28,
    packagingType: "Returnable",
    category: "Clothing",
    description: "Premium bamboo fiber hoodie that's naturally antibacterial, moisture-wicking, and incredibly soft. Bamboo grows 30x faster than cotton while absorbing more CO₂.",
    materials: [
      { name: "Bamboo Fiber", percentage: 85, sustainability: "A+" },
      { name: "Organic Cotton", percentage: 15, sustainability: "A+" }
    ],
    supplyChain: [
      { stage: "Raw Materials", location: "China", co2: "0.3 kg", sustainability: "A+" },
      { stage: "Manufacturing", location: "Vietnam", co2: "0.6 kg", sustainability: "A" },
      { stage: "Transportation", location: "Global", co2: "0.3 kg", sustainability: "B+" }
    ],
    carbonSavings: "1.8 kg CO₂e vs average",
    inStock: true,
    rating: 4.6,
    reviews: 183
  }
];

// EcoScore Badge Component
const EcoScoreBadge = ({ score, size = "md" }) => {
  const getScoreConfig = (score) => {
    switch (score) {
      case 'A+':
        return {
          bg: 'bg-gradient-to-r from-emerald-500 to-green-600',
          text: 'text-white',
          glow: 'shadow-emerald-500/25'
        };
      case 'A':
        return {
          bg: 'bg-gradient-to-r from-green-400 to-emerald-500',
          text: 'text-white',
          glow: 'shadow-green-500/25'
        };
      case 'B':
        return {
          bg: 'bg-gradient-to-r from-yellow-400 to-orange-500',
          text: 'text-white',
          glow: 'shadow-yellow-500/25'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-400 to-gray-600',
          text: 'text-white',
          glow: 'shadow-gray-500/25'
        };
    }
  };

  const config = getScoreConfig(score);
  const sizeClasses = size === "lg" ? "px-4 py-2 text-lg" : "px-3 py-1.5 text-sm";

  return (
    <div className={`inline-flex items-center ${sizeClasses} rounded-full font-bold ${config.bg} ${config.text} shadow-lg ${config.glow}`}>
      <Leaf className="w-4 h-4 mr-1" />
      EcoScore {score}
    </div>
  );
};

// Delivery Option Card Component
const DeliveryOptionCard = ({ option, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(option)}
      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/20' 
          : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
              isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
            }`}>
              {isSelected && <Check className="w-3 h-3 text-white" />}
            </div>
            <h3 className="font-bold text-lg text-gray-900">{option.name}</h3>
            {option.badge && (
              <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                {option.badge}
              </span>
            )}
          </div>
          
          <div className="flex items-center text-gray-600 mb-3">
            <option.icon className="w-4 h-4 mr-2" />
            <span className="text-sm">{option.time}</span>
          </div>

          <p className="text-sm text-gray-600 mb-3">{option.description}</p>

          {option.benefits && (
            <div className="space-y-1">
              {option.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-emerald-500 mr-2" />
                  <span className={benefit.highlight ? 'text-emerald-700 font-medium' : 'text-gray-600'}>
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {option.price && (
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">{option.price}</div>
            {option.originalPrice && (
              <div className="text-sm text-gray-500 line-through">{option.originalPrice}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Impact Bar Component
const ImpactBar = ({ current, average, label }) => {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const percentage = Math.max(0, Math.min(100, (current / average) * 100));
  const isGood = current < average;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">
          {current} vs {average} avg
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${
              isGood ? 'bg-gradient-to-r from-emerald-500 to-green-600' : 'bg-gradient-to-r from-orange-500 to-red-600'
            }`}
            style={{ 
              width: animated ? `${percentage}%` : '0%',
              transformOrigin: 'left'
            }}
          />
        </div>
        
        <div className="absolute -top-8 right-0 text-xs text-gray-500">
          Average
        </div>
        
        <div 
          className="absolute -bottom-8 transition-all duration-1000 ease-out text-xs font-medium"
          style={{ left: animated ? `${Math.min(percentage, 90)}%` : '0%' }}
        >
          <span className={isGood ? 'text-emerald-600' : 'text-orange-600'}>
            {isGood ? `${Math.round(((average - current) / average) * 100)}% better` : 'Above average'}
          </span>
        </div>
      </div>
    </div>
  );
};

// Supply Chain Graph Component
const SupplyChainGraph = ({ supplyChain }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Supply Chain Transparency</h3>
      
      <div className="relative">
        {supplyChain.map((stage, index) => (
          <div key={index} className="flex items-center mb-6 last:mb-0">
            {/* Stage Circle */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>
              
              {/* Connecting Line */}
              {index < supplyChain.length - 1 && (
                <div className="absolute top-12 left-1/2 w-px h-8 bg-gradient-to-b from-emerald-300 to-teal-300 transform -translate-x-1/2" />
              )}
            </div>

            {/* Stage Content */}
            <div className="ml-6 flex-1">
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                  <EcoScoreBadge score={stage.sustainability} />
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {stage.location}
                </div>
                
                <div className="flex items-center text-sm">
                  <TreePine className="w-4 h-4 mr-2 text-emerald-500" />
                  <span className="text-emerald-700 font-medium">{stage.co2} CO₂e</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Product Page Component
const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedDelivery, setSelectedDelivery] = useState('standard');
  const [quantity, setQuantity] = useState(1);

  // Mock delivery options
  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      time: 'Tomorrow by 6 PM',
      icon: Truck,
      description: 'Fast and reliable delivery to your doorstep',
      price: 'Free',
      benefits: []
    },
    {
      id: 'green',
      name: 'Green Route',
      time: 'Tomorrow by 8 PM',
      icon: Leaf,
      badge: 'ECO CHOICE',
      description: 'Optimized delivery route with electric vehicles',
      price: 'Free',
      benefits: [
        { text: 'Save 120g CO₂e', highlight: true },
        { text: 'Earn ₹10 EcoCredit', highlight: true },
        { text: 'Support green logistics' }
      ]
    },
    {
      id: 'group',
      name: 'Group Delivery',
      time: '2-3 days',
      icon: Users,
      badge: '35% OFF',
      description: 'Combined with neighbor orders for maximum efficiency',
      price: '₹19.49',
      originalPrice: '₹29.99',
      benefits: [
        { text: '35% discount applied', highlight: true },
        { text: 'Reduce delivery emissions by 60%', highlight: true },
        { text: 'Help build sustainable communities' }
      ]
    }
  ];

  useEffect(() => {
    // Simulate fetching product data
    const foundProduct = mockProducts.find(p => p.id === id);
    setProduct(foundProduct || mockProducts[0]);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'description', label: 'Description', icon: Package },
    { id: 'sustainability', label: 'Sustainability Report', icon: Leaf },
    { id: 'impact', label: 'Customer Impact', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Store
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-emerald-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <EcoScoreBadge score={product.ecoScore} size="lg" />
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-2xl">⭐</span>
                  <span className="ml-1">{product.rating} ({product.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-emerald-600">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <h3 className="font-bold text-emerald-900 mb-3 flex items-center">
                <TreePine className="w-5 h-5 mr-2" />
                Environmental Impact
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-700">Carbon Footprint:</span>
                  <span className="font-medium text-emerald-900">
                    {product.co2Footprint} ({product.co2Reduction}% below avg)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-700">Packaging:</span>
                  <span className="font-medium text-emerald-900">{product.packagingType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-700">Total Savings:</span>
                  <span className="font-medium text-emerald-900">{product.carbonSavings}</span>
                </div>
              </div>
            </div>

            {/* Alternative Button */}
            <button className="flex items-center justify-center w-full py-3 border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors font-medium">
              <Eye className="w-5 h-5 mr-2" />
              View Alternative Products
            </button>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Materials</h4>
                  <div className="space-y-2">
                    {product.materials.map((material, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">{material.name}</span>
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-600">{material.percentage}%</span>
                          <EcoScoreBadge score={material.sustainability} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sustainability' && (
              <div className="space-y-8">
                <SupplyChainGraph supplyChain={product.supplyChain} />
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Certifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Organic Certified', 'Fair Trade', 'Carbon Neutral'].map(cert => (
                      <div key={cert} className="flex items-center p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                        <Award className="w-6 h-6 text-emerald-600 mr-3" />
                        <span className="font-medium text-emerald-900">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'impact' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Environmental Impact Comparison</h3>
                  <div className="space-y-6">
                    <ImpactBar 
                      current={0.8} 
                      average={1.3} 
                      label="CO₂ Emissions (kg)" 
                    />
                    <ImpactBar 
                      current={2.1} 
                      average={4.2} 
                      label="Water Usage (L)" 
                    />
                    <ImpactBar 
                      current={0.1} 
                      average={0.8} 
                      label="Waste Generated (kg)" 
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
                  <h4 className="font-bold text-emerald-900 mb-3">Your Positive Impact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">2.1kg</div>
                      <div className="text-sm text-emerald-700">CO₂ Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">4.2L</div>
                      <div className="text-sm text-emerald-700">Water Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">0.7kg</div>
                      <div className="text-sm text-emerald-700">Waste Avoided</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delivery Options */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Delivery Option</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deliveryOptions.map(option => (
              <DeliveryOptionCard
                key={option.id}
                option={option}
                isSelected={selectedDelivery === option.id}
                onSelect={(opt) => setSelectedDelivery(opt.id)}
              />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Product ({quantity}x)</span>
              <span className="font-medium">₹{(product.price * quantity).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span className="font-medium">
                {deliveryOptions.find(opt => opt.id === selectedDelivery)?.price || 'Free'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Packaging</span>
              <span className="font-medium">{product.packagingType}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-lg font-bold text-emerald-600">
                ₹{(product.price * quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;