import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Leaf, 
  Settings, 
  TrendingUp, 
  Award, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  Recycle,
  TreePine,
  Droplets,
  Zap,
  Gift,
  Calendar,
  MapPin,
  CreditCard
} from 'lucide-react';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('Orders');

  // Mock data
  const userStats = {
    totalOrders: 24,
    co2Saved: 142.5,
    treesPlanted: 12,
    waterSaved: 450,
    energySaved: 89
  };

  const ecoCredits = {
    balance: 1250,
    earned: 2400,
    spent: 1150
  };

  const recentOrders = [
    {
      id: 'ECO-001',
      items: ['Bamboo Water Bottle', 'Organic Cotton Tote'],
      total: '₹1,299',
      date: '2025-06-18',
      status: 'Delivered',
      co2Saved: 15.2,
      packaging: 'Recyclable'
    },
    {
      id: 'ECO-002',
      items: ['Solar Power Bank', 'Eco-Friendly Phone Case'],
      total: '₹2,199',
      date: '2025-06-15',
      status: 'In Transit',
      co2Saved: 28.7,
      packaging: 'Biodegradable'
    },
    {
      id: 'ECO-003',
      items: ['Reusable Straw Set'],
      total: '₹299',
      date: '2025-06-10',
      status: 'Cancelled',
      co2Saved: 0,
      packaging: 'Minimal'
    }
  ];

  const creditHistory = [
    { type: 'Earned', amount: '+50', reason: 'Order ECO-001', date: '2025-06-18' },
    { type: 'Spent', amount: '-25', reason: 'Discount Applied', date: '2025-06-15' },
    { type: 'Earned', amount: '+100', reason: 'Referral Bonus', date: '2025-06-12' },
    { type: 'Earned', amount: '+75', reason: 'Order ECO-002', date: '2025-06-10' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'In Transit':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'In Transit':
        return <Clock className="w-4 h-4" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const StatCard = ({ icon: Icon, title, value, unit, color = "emerald" }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <TrendingUp className="w-4 h-4 text-green-500" />
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-600">{title}</p>
        {unit && <p className="text-xs text-gray-500">{unit}</p>}
      </div>
    </div>
  );

  const OrderCard = ({ order }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">Order {order.id}</h3>
          <p className="text-sm text-gray-600">{order.date}</p>
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
          {getStatusIcon(order.status)}
          {order.status}
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        {order.items.map((item, index) => (
          <p key={index} className="text-sm text-gray-700">• {item}</p>
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Leaf className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-gray-600">{order.co2Saved}kg CO₂</span>
          </div>
          <div className="flex items-center gap-1">
            <Recycle className="w-4 h-4 text-teal-500" />
            <span className="text-sm text-gray-600">{order.packaging}</span>
          </div>
        </div>
        <p className="font-semibold text-gray-800">{order.total}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600 mt-1">Track your sustainable journey</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-lg">
                <Award className="w-5 h-5 text-emerald-600" />
                <span className="font-medium text-emerald-700">Eco Warrior</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8 max-w-md">
          {['Orders', 'Impact', 'Settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === 'Orders' && (
          <div className="space-y-8">
            {/* EcoRewards Wallet */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">EcoRewards Wallet</h2>
                  <p className="opacity-90">Your sustainable shopping rewards</p>
                </div>
                <Gift className="w-8 h-8 opacity-80" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-3xl font-bold">₹{ecoCredits.balance}</p>
                  <p className="opacity-90">Available Balance</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-xl font-semibold">₹{ecoCredits.earned}</p>
                  <p className="opacity-90">Total Earned</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-xl font-semibold">₹{ecoCredits.spent}</p>
                  <p className="opacity-90">Total Spent</p>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h2>
              <div className="grid gap-6">
                {recentOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>

            {/* Credit History */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Credit History</h3>
              <div className="space-y-3">
                {creditHistory.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'Earned' ? 'bg-emerald-100' : 'bg-orange-100'
                      }`}>
                        {transaction.type === 'Earned' ? 
                          <TrendingUp className="w-4 h-4 text-emerald-600" /> :
                          <CreditCard className="w-4 h-4 text-orange-600" />
                        }
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{transaction.reason}</p>
                        <p className="text-sm text-gray-600">{transaction.date}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${
                      transaction.type === 'Earned' ? 'text-emerald-600' : 'text-orange-600'
                    }`}>
                      {transaction.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Impact Tab */}
        {activeTab === 'Impact' && (
          <div className="space-y-8">
            {/* Impact Stats Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Environmental Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={Package}
                  title="Total Orders"
                  value={userStats.totalOrders}
                  unit="sustainable purchases"
                />
                <StatCard
                  icon={Leaf}
                  title="CO₂ Saved"
                  value={userStats.co2Saved}
                  unit="kg carbon offset"
                  color="emerald"
                />
                <StatCard
                  icon={TreePine}
                  title="Trees Planted"
                  value={userStats.treesPlanted}
                  unit="through your orders"
                  color="green"
                />
                <StatCard
                  icon={Droplets}
                  title="Water Saved"
                  value={userStats.waterSaved}
                  unit="liters conserved"
                  color="blue"
                />
              </div>
            </div>

            {/* Impact Visualization */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Monthly Impact Trend</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">CO₂ Reduction</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">78%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Waste Reduction</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">65%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Energy Savings</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full" style={{width: '82%'}}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">82%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Eco Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <Award className="w-8 h-8 text-emerald-600" />
                  <div>
                    <p className="font-semibold text-emerald-700">Eco Warrior</p>
                    <p className="text-sm text-emerald-600">10+ sustainable orders</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <TreePine className="w-8 h-8 text-teal-600" />
                  <div>
                    <p className="font-semibold text-teal-700">First Step</p>
                    <p className="text-sm text-teal-600">First order</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Droplets className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-700">Water Saver</p>
                    <p className="text-sm text-blue-600">Saved 400+ liters</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'Settings' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
              <div className="grid gap-6">
                {/* Profile Settings */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue="Arjun Sharma" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        defaultValue="arjun@example.com" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input 
                        type="tel" 
                        defaultValue="+91 98765 43210" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Notification Preferences */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Notification Preferences</h3>
                  <div className="space-y-3">
                    {[
                      'Order updates and shipping notifications',
                      'EcoRewards and special offers',
                      'Environmental impact reports',
                      'New sustainable products'
                    ].map((setting, index) => (
                      <label key={index} className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
                        <span className="text-gray-700">{setting}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sustainability Goals */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Sustainability Goals</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Monthly CO₂ Reduction Target</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                        <option>50 kg CO₂</option>
                        <option>100 kg CO₂</option>
                        <option>150 kg CO₂</option>
                        <option>200 kg CO₂</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Packaging</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                        <option>Biodegradable</option>
                        <option>Recyclable</option>
                        <option>Minimal</option>
                        <option>Zero Waste</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}