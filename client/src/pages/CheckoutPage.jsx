import React, { useState } from 'react';
import { CreditCard, Leaf, Truck, CheckCircle, XCircle, ArrowLeft, Smartphone, Banknote, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [useEcoCredits, setUseEcoCredits] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (!agreementChecked || !selectedPayment) {
      setShowError(true);
      return;
    }
    
    setShowError(false);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setOrderPlaced(true);
    }, 2000);
  };

  const handleBackToStore = () => {
    setOrderPlaced(false);
    setSelectedPayment('');
    setDeliveryAddress('');
    setAgreementChecked(false);
    setUseEcoCredits(false);
    setShowError(false);
    navigate('/store');
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-emerald-100">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
            <p className="text-gray-600">Thanks for choosing sustainability 🌱</p>
            {useEcoCredits && (
              <div className="mt-3 p-2 bg-emerald-50 rounded-lg">
                <p className="text-sm text-emerald-700">🌿 EcoCredits applied! You've saved the planet and your wallet.</p>
              </div>
            )}
          </div>
          
          <button
            onClick={handleBackToStore}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const paymentOptions = [
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', label: 'UPI Payment', icon: Smartphone },
    { id: 'wallet', label: 'Digital Wallet', icon: Wallet },
    { id: 'cod', label: 'Cash on Delivery', icon: Banknote }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your sustainable purchase</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100"
                  onChange={(e) => setUseEcoCredits(e.target.checked)}>

          {/* EcoCredits Checkbox Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-500" />
              EcoCredits
            </h2>
            
            <label className="flex items-start gap-3 cursor-pointer group p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={useEcoCredits}
                  onChange={(e) => setUseEcoCredits(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 border-2 rounded transition-all duration-300 flex items-center justify-center ${
                  useEcoCredits
                    ? 'border-emerald-500 bg-emerald-500'
                    : 'border-gray-300 group-hover:border-emerald-400'
                }`}>
                  {useEcoCredits && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <span className="text-gray-700 font-medium block">Use EcoCredits (₹50 available)</span>
              </div>
            </label>
          </div>


          {/* Payment Method Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-500" />
              Payment Method
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedPayment(option.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                      selectedPayment === option.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-6 h-6 ${
                        selectedPayment === option.id ? 'text-emerald-600' : 'text-gray-500'
                      }`} />
                      <span className={`font-medium ${
                        selectedPayment === option.id ? 'text-emerald-700' : 'text-gray-700'
                      }`}>
                        {option.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          
          {/* Delivery Address Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-500" />
              Delivery Address
            </h2>
            
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="123 Green Street, Bengaluru, India"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-0 transition-colors duration-300 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Agreement Checkbox */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={agreementChecked}
                  onChange={(e) => {
                    setAgreementChecked(e.target.checked);
                    if (e.target.checked) {
                      setShowError(false);
                    }
                  }}
                  className="sr-only"
                />
                <div className={`w-5 h-5 border-2 rounded transition-all duration-300 flex items-center justify-center ${
                  agreementChecked
                    ? 'border-emerald-500 bg-emerald-500'
                    : 'border-gray-300 group-hover:border-emerald-400'
                }`}>
                  {agreementChecked && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
              <span className="text-gray-700 leading-relaxed">
                I agree to support green delivery and eco-friendly packaging.
              </span>
            </label>
          </div>

          {/* Error Message */}
          {showError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700 text-sm">
                Please select a payment method and agree to our eco-friendly terms to continue.
              </span>
            </div>
          )}

          {/* Order Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-2">Order Summary</h3>
            <div className="flex justify-between text-gray-600 mb-1">
              <span>Subtotal</span>
              <span>₹299</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-1">
              <span>Delivery</span>
              <span>₹20</span>
            </div>
            {useEcoCredits && (
              <div className="flex justify-between text-emerald-600 mb-1">
                <span>EcoCredits Discount</span>
                <span>-₹50</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold text-gray-800">
                <span>Total</span>
                <span>₹{useEcoCredits ? '269' : '319'}</span>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : (agreementChecked && selectedPayment)
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 cursor-not-allowed'
            } text-white`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Placing Order...
              </>
            ) : (
              <>
                <Truck className="w-5 h-5" />
                Place Order
              </>
            )}
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
            <Leaf className="w-4 h-4 text-emerald-500" />
            Every order contributes to a greener future
          </p>
        </div>
      </div>
    </div>
  );
}