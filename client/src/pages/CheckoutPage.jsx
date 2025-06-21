import React, { useState } from 'react';
import { CreditCard, Leaf, Truck, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showError, setShowError] = useState(false);

  const handlePlaceOrder = () => {
    if (!agreementChecked) {
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
    setShowError(false);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-emerald-100">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
            <p className="text-gray-600">Thanks for choosing sustainability 🌱</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your sustainable purchase</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
          {/* Payment Method Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-500" />
              Payment Method
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Credit/Debit Card Option */}
              <button
                onClick={() => setSelectedPayment('card')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                  selectedPayment === 'card'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className={`w-6 h-6 ${
                    selectedPayment === 'card' ? 'text-emerald-600' : 'text-gray-500'
                  }`} />
                  <span className={`font-medium ${
                    selectedPayment === 'card' ? 'text-emerald-700' : 'text-gray-700'
                  }`}>
                    Credit/Debit Card
                  </span>
                </div>
              </button>

              {/* EcoCredits Option */}
              <button
                onClick={() => setSelectedPayment('eco')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                  selectedPayment === 'eco'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Leaf className={`w-6 h-6 ${
                    selectedPayment === 'eco' ? 'text-emerald-600' : 'text-gray-500'
                  }`} />
                  <span className={`font-medium ${
                    selectedPayment === 'eco' ? 'text-emerald-700' : 'text-gray-700'
                  }`}>
                    EcoCredits
                  </span>
                </div>
              </button>
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
                Please agree to our eco-friendly terms to continue.
              </span>
            </div>
          )}

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : agreementChecked
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