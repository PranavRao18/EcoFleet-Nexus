import React, { useState, useEffect } from 'react';
import { Leaf, ShoppingBag, BarChart3, Truck, Shield, Users, Package, Zap } from 'lucide-react';

// StatsCard Component
const StatsCard = ({ icon: Icon, value, label, color = "green" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const colorClasses = {
    green: "from-emerald-500 to-teal-600",
    blue: "from-blue-500 to-cyan-600", 
    purple: "from-purple-500 to-indigo-600",
    orange: "from-orange-500 to-red-500"
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`stats-card-${label}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [label]);

  useEffect(() => {
    if (!isVisible) return;

    const targetValue = parseFloat(value.replace(/[^\d.]/g, ''));
    const duration = 2000;
    const increment = targetValue / (duration / 16);
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const formatCount = (num) => {
    if (value.includes('tons')) return `${num.toFixed(1)} tons`;
    if (value.includes('kg')) return `${Math.round(num)}kg`;
    if (value.includes('+')) return `${Math.round(num).toLocaleString()}+`;
    return Math.round(num).toLocaleString();
  };

  return (
    <div
      id={`stats-card-${label}`}
      className={`relative group overflow-hidden rounded-2xl bg-gradient-to-br ${colorClasses[color]} p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <Icon className="h-8 w-8 text-white/90" />
          <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="text-3xl font-bold text-white mb-1">
          {isVisible ? formatCount(count) : '0'}
        </div>
        <div className="text-white/80 text-sm font-medium">
          {label}
        </div>
      </div>
      <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
    </div>
  );
};

// HowItWorksStep Component
const HowItWorksStep = ({ step, title, description, icon: Icon, isLast = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`step-${step}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [step]);

  return (
    <div 
      id={`step-${step}`}
      className={`relative flex-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${step * 200}ms` }}
    >
      <div className="relative group">
        {/* Step Number */}
        <div className="flex items-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">{step}</span>
            </div>
            <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          </div>
          
          {/* Connecting Line */}
          {!isLast && (
            <div className="hidden lg:block flex-1 h-0.5 bg-gradient-to-r from-emerald-300 to-transparent ml-4"></div>
          )}
        </div>

        {/* Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
            <Icon className="h-10 w-10 text-emerald-600" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </div>
    </div>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  const stats = [
    { icon: Leaf, value: "4.2 tons", label: "CO₂ Saved", color: "green" },
    { icon: Package, value: "780kg", label: "Plastic Avoided", color: "blue" },
    { icon: Users, value: "12,000+", label: "Active Users", color: "purple" },
    { icon: Shield, value: "2,300+", label: "Verified Products", color: "orange" }
  ];

  const steps = [
    {
      step: 1,
      title: "Discover",
      description: "Browse eco-friendly products with AI-verified EcoScore ratings. Every item is certified for sustainability impact.",
      icon: ShoppingBag
    },
    {
      step: 2,
      title: "Optimize",
      description: "Smart checkout with optimized packaging and green delivery routes. Minimize environmental impact automatically.",
      icon: Truck
    },
    {
      step: 3,
      title: "Track Impact",
      description: "Monitor your sustainability journey with personalized dashboards. See your real environmental contribution.",
      icon: BarChart3
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 min-h-screen flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-100/10 to-teal-100/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            {/* Main Headline */}
            <div className={`transition-all duration-1000 transform ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Shop Green.
                </span>
                <br />
                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Deliver Clean.
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                  Impact Seen.
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <div className={`transition-all duration-1000 transform ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Empowering conscious choices with AI-powered sustainability insights and transparent impact tracking.
              </p>
            </div>

            {/* CTA Button */}
            <div className={`transition-all duration-1000 transform ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
              <button
                onClick={() => window.location.href = '/store'}
                className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  Explore Green Store
                  <Zap className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Hero Image Placeholder */}
            {/* <div className={`transition-all duration-1000 transform ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
              <div className="relative max-w-4xl mx-auto mt-16">
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[Leaf, Package, Users, BarChart3].map((Icon, index) => (
                      <div key={index} className="flex flex-col items-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl">
                        <Icon className="h-8 w-8 text-emerald-600 mb-2" />
                        <span className="text-sm text-gray-600 font-medium">EcoScore</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Impact, Real Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands making a difference through conscious commerce
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                color={stat.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your shopping into environmental action
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {steps.map((stepData, index) => (
              <HowItWorksStep
                key={index}
                step={stepData.step}
                title={stepData.title}
                description={stepData.description}
                icon={stepData.icon}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the Movement
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Start shopping sustainably today and be part of the solution. Every purchase creates positive environmental impact.
          </p>
          
          <button
            onClick={() => window.location.href = '/store'}
            className="group relative inline-flex items-center px-10 py-5 text-lg font-semibold text-emerald-600 bg-white rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center">
              Go to Store
              <ShoppingBag className="ml-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;