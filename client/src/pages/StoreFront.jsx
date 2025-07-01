import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Leaf, Package, Truck, ShoppingCart, Eye, ChevronDown, ChevronUp, User, Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock Products Data
const mockProducts = [
    {
        id: 1,
        name: "Organic Cotton T-Shirt",
        price: 299,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        ecoScore: "A+",
        co2Footprint: "0.8 kg CO₂e",
        packagingType: "Plant-Based",
        category: "Clothing"
    },
    {
        id: 2,
        name: "Bamboo Fiber Hoodie",
        price: 499,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        ecoScore: "A",
        co2Footprint: "1.2 kg CO₂e",
        packagingType: "Returnable",
        category: "Clothing"
    },
    {
        id: 3,
        name: "Recycled Phone Case",
        price: 199,
        image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop",
        ecoScore: "A+",
        co2Footprint: "0.3 kg CO₂e",
        packagingType: "Plant-Based",
        category: "Electronics"
    },
    {
        id: 4,
        name: "Solar Power Bank",
        price: 799,
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
        ecoScore: "A",
        co2Footprint: "2.1 kg CO₂e",
        packagingType: "Standard",
        category: "Electronics"
    },
    {
        id: 5,
        name: "Biodegradable Soap Bar",
        price: 89,
        image: "https://images.unsplash.com/photo-1585022150787-c6ec2dac4e2c?w=400&h=400&fit=crop",
        ecoScore: "A+",
        co2Footprint: "0.1 kg CO₂e",
        packagingType: "Plant-Based",
        category: "Personal Care"
    },
    {
        id: 6,
        name: "Sustainable Yoga Mat",
        price: 899,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
        ecoScore: "B",
        co2Footprint: "3.2 kg CO₂e",
        packagingType: "Returnable",
        category: "Fitness"
    },
    {
        id: 7,
        name: "Organic Coffee Beans",
        price: 249,
        image: "https://images.unsplash.com/photo-1587080461634-8c0c9e5de3e6?w=400&h=400&fit=crop",
        ecoScore: "A",
        co2Footprint: "1.8 kg CO₂e",
        packagingType: "Plant-Based",
        category: "Food"
    },
    {
        id: 8,
        name: "Reusable Water Bottle",
        price: 349,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
        ecoScore: "A+",
        co2Footprint: "0.9 kg CO₂e",
        packagingType: "Standard",
        category: "Lifestyle"
    }
];

// EcoScore Badge Component
const EcoScoreBadge = ({ score }) => {
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

    return (
        <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold ${config.bg} ${config.text} shadow-lg ${config.glow}`}>
            <Leaf className="w-3 h-3 mr-1" />
            {score}
        </div>
    );
};

// Product Card Component
const ProductCard = ({ product, onAddToCart, onViewAlternative }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        // Prevent navigation when clicking on buttons
        if (e.target.closest('button')) {
            return;
        }
        navigate(`/product/${product.id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        onAddToCart(product);
    };

    const handleViewAlternative = (e) => {
        e.stopPropagation();
        onViewAlternative(product);
    };

    return (
        <div
            onClick={handleCardClick}
            className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-100 aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
                )}

                {/* EcoScore Badge */}
                <div className="absolute top-3 left-3">
                    <EcoScoreBadge score={product.ecoScore} />
                </div>

                {/* Hover Actions
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center space-x-3 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <button
                        onClick={handleViewAlternative}
                        className="flex items-center px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-full font-medium transition-all duration-200 transform hover:scale-105"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        Alternatives
                    </button>
                </div> */}
            </div>

            {/* Product Info */}
            <div className="p-5 space-y-4">
                <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-700 transition-colors duration-300">
                        {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-emerald-600 mt-1">
                        ₹{product.price}
                    </p>
                </div>

                {/* Environmental Info */}
                <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                        <Truck className="w-4 h-4 mr-2 text-emerald-500" />
                        {product.co2Footprint}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Package className="w-4 h-4 mr-2 text-teal-500" />
                        {product.packagingType}
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

// Cart Component
const Cart = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }) => {
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const navigate = useNavigate();

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-[#00000099] bg-opacity-50 flex justify-end"
                    onClick={onClose}
                >
                    <div
                        className="bg-white w-full sm:w-96 h-full flex flex-col shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">
                                Your Cart ({getTotalItems()})
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-12">
                                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
                                    <p className="text-gray-400 text-sm">Add some sustainable products to get started!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                                                <p className="text-emerald-600 font-bold">${item.price}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:bg-white rounded-full transition-colors"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-white rounded-full transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                                <button
                                                    onClick={() => onRemoveItem(item.id)}
                                                    className="text-red-500 hover:text-red-700 mt-2 p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="border-t border-gray-200 p-6 space-y-4">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total:</span>
                                    <span className="text-emerald-600">${getTotalPrice().toFixed(2)}</span>
                                </div>
                                <div className="space-y-2">
                                    <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-xl transition-all duration-300" onClick={() => navigate('/checkout')}>
                                        Checkout
                                    </button>
                                    <button
                                        onClick={onClearCart}
                                        className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors"
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

// Filter Sidebar Component
const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleSliderChange = (value) => {
        const newFilters = { ...localFilters, sustainabilityRadius: value };
        setLocalFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const handleEcoScoreChange = (score, checked) => {
        const newEcoScores = checked
            ? [...localFilters.ecoScores, score]
            : localFilters.ecoScores.filter(s => s !== score);

        const newFilters = { ...localFilters, ecoScores: newEcoScores };
        setLocalFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const handlePackagingChange = (type, checked) => {
        const newPackaging = checked
            ? [...localFilters.packagingTypes, type]
            : localFilters.packagingTypes.filter(t => t !== type);

        const newFilters = { ...localFilters, packagingTypes: newPackaging };
        setLocalFilters(newFilters);
        onFiltersChange(newFilters);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 bg-white shadow-xl lg:shadow-md
        transform transition-transform duration-300 z-50 lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto border-r border-gray-200
      `}>
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center">
                            <Filter className="w-5 h-5 mr-2 text-emerald-600" />
                            Filters
                        </h2>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Sustainability Radius */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            Sustainability Radius: {localFilters.sustainabilityRadius} km
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={localFilters.sustainabilityRadius}
                            onChange={(e) => handleSliderChange(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none slider"
                            style={{
                                background: `linear-gradient(to right, #10b981 0%, #10b981 ${localFilters.sustainabilityRadius}%, #e5e7eb ${localFilters.sustainabilityRadius}%, #e5e7eb 100%)`
                            }}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>0 km</span>
                            <span>100 km</span>
                        </div>
                    </div>

                    {/* EcoScore Filter */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            EcoScore Rating
                        </label>
                        <div className="space-y-2">
                            {['A+', 'A', 'B'].map(score => (
                                <label key={score} className="flex items-center space-x-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={localFilters.ecoScores.includes(score)}
                                        onChange={(e) => handleEcoScoreChange(score, e.target.checked)}
                                        className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                    />
                                    <EcoScoreBadge score={score} />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Packaging Type */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            Packaging Type
                        </label>
                        <div className="space-y-2">
                            {['Standard', 'Plant-Based', 'Returnable'].map(type => (
                                <label key={type} className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={localFilters.packagingTypes.includes(type)}
                                        onChange={(e) => handlePackagingChange(type, e.target.checked)}
                                        className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-emerald-700 transition-colors">
                                        {type}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Clear Filters */}
                    <button
                        onClick={() => {
                            const resetFilters = {
                                sustainabilityRadius: 50,
                                ecoScores: [],
                                packagingTypes: []
                            };
                            setLocalFilters(resetFilters);
                            onFiltersChange(resetFilters);
                        }}
                        className="w-full py-2 px-4 text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-200"
                    >
                        Clear All Filters
                    </button>
                </div>
            </div>
        </>
    );
};

// Main Storefront Component
const Storefront = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filters, setFilters] = useState({
        sustainabilityRadius: 50,
        ecoScores: [],
        packagingTypes: []
    });
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    const navigate = useNavigate();

    // Filter products based on search and filters
    const filteredProducts = mockProducts.filter(product => {
        // Search filter
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        // EcoScore filter
        if (filters.ecoScores.length > 0 && !filters.ecoScores.includes(product.ecoScore)) {
            return false;
        }

        // Packaging filter
        if (filters.packagingTypes.length > 0 && !filters.packagingTypes.includes(product.packagingType)) {
            return false;
        }

        return true;
    });

    const handleAddToCart = (product) => {
        setCart(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveItem(productId);
            return;
        }
        setCart(prev =>
            prev.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const handleRemoveItem = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const handleClearCart = () => {
        setCart([]);
    };

    const handleViewAlternative = (product) => {
        console.log('View alternatives for:', product.name);
        // Could open modal or navigate to alternatives page
    };

    const getTotalCartItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Cart Sidebar */}
            <Cart
                isOpen={showCart}
                onClose={() => setShowCart(false)}
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
            />

            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <h1 className="text-2xl font-bold text-gray-900">
                            EcoFleet Nexus
                        </h1>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-2xl mx-8">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search sustainable products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Right-side Icons */}
                        <div className="flex items-center gap-4">
                            {/* Mobile Filter Button */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                            >
                                <Filter className="w-5 h-5 mr-2" />
                                Filters
                            </button>

                            {/* Cart Button */}
                            <button
                                onClick={() => setShowCart(true)}
                                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ShoppingCart className="w-6 h-6 text-gray-600" />
                                {getTotalCartItems() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                        {getTotalCartItems()}
                                    </span>
                                )}
                            </button>

                            {/* User Avatar */}
                            <button className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow" onClick={() => navigate('/dashboard')}>
                                <User className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Filter Sidebar */}
                    <FilterSidebar
                        isOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                        filters={filters}
                        onFiltersChange={setFilters}
                    />

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {filteredProducts.length} Products Found
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    Sustainable products with verified EcoScores
                                </p>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={handleAddToCart}
                                        onViewAlternative={handleViewAlternative}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    No products found
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Try adjusting your search or filters to find what you're looking for.
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setFilters({
                                            sustainabilityRadius: 50,
                                            ecoScores: [],
                                            packagingTypes: []
                                        });
                                    }}
                                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Storefront;