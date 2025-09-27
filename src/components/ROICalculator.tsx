import React, { useState, useEffect } from 'react';
import { Calculator, Phone, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    dailyCalls: 50,
    missedCallsPercentage: 20,
    avgOrderValue: 150,
    conversionRate: 30,
    businessDays: 22
  });

  const [results, setResults] = useState({
    missedCallsDaily: 0,
    missedCallsMonthly: 0,
    potentialCustomers: 0,
    monthlyLostRevenue: 0,
    annualLostRevenue: 0,
    aiSavings: 0,
    roiPercentage: 0
  });

  const aiServiceCost = 297; // Monthly cost for AI voice agent

  useEffect(() => {
    const missedCallsDaily = Math.round((inputs.dailyCalls * inputs.missedCallsPercentage) / 100);
    const missedCallsMonthly = missedCallsDaily * inputs.businessDays;
    const potentialCustomers = Math.round((missedCallsMonthly * inputs.conversionRate) / 100);
    const monthlyLostRevenue = potentialCustomers * inputs.avgOrderValue;
    const annualLostRevenue = monthlyLostRevenue * 12;
    const aiSavings = monthlyLostRevenue - aiServiceCost;
    const roiPercentage = Math.round(((aiSavings / aiServiceCost) * 100));

    setResults({
      missedCallsDaily,
      missedCallsMonthly,
      potentialCustomers,
      monthlyLostRevenue,
      annualLostRevenue,
      aiSavings,
      roiPercentage
    });
  }, [inputs]);

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: Math.max(0, parseInt(value) || 0)
    }));
  };

  return (
    <div className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-12 h-12 text-blue-400 mr-4" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              ROI Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate Your Hidden Revenue Loss
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Phone className="w-6 h-6 mr-3 text-blue-400" />
              Your Business Details
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Daily Incoming Calls
                </label>
                <input
                  type="number"
                  value={inputs.dailyCalls}
                  onChange={(e) => handleInputChange('dailyCalls', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="50"
                />
                <p className="text-xs text-gray-400 mt-1">Average number of calls your business receives per day</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Missed Calls Percentage (%)
                </label>
                <input
                  type="number"
                  value={inputs.missedCallsPercentage}
                  onChange={(e) => handleInputChange('missedCallsPercentage', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="20"
                  min="0"
                  max="100"
                />
                <p className="text-xs text-gray-400 mt-1">What percentage of calls go unanswered?</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Average Order Value ($)
                </label>
                <input
                  type="number"
                  value={inputs.avgOrderValue}
                  onChange={(e) => handleInputChange('avgOrderValue', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="150"
                />
                <p className="text-xs text-gray-400 mt-1">Average revenue per customer transaction</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Call-to-Customer Conversion Rate (%)
                </label>
                <input
                  type="number"
                  value={inputs.conversionRate}
                  onChange={(e) => handleInputChange('conversionRate', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="30"
                  min="0"
                  max="100"
                />
                <p className="text-xs text-gray-400 mt-1">What percentage of callers become customers?</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Business Days per Month
                </label>
                <input
                  type="number"
                  value={inputs.businessDays}
                  onChange={(e) => handleInputChange('businessDays', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="22"
                />
                <p className="text-xs text-gray-400 mt-1">How many days per month are you open?</p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Alert Box */}
            <div className="bg-red-900/30 border border-red-500/50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
                <h3 className="text-xl font-bold text-red-400">Revenue Loss Analysis</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {results.missedCallsDaily}
                  </div>
                  <div className="text-sm text-gray-300">Missed Calls/Day</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {results.missedCallsMonthly}
                  </div>
                  <div className="text-sm text-gray-300">Missed Calls/Month</div>
                </div>
              </div>
            </div>

            {/* Monthly Loss */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <DollarSign className="w-6 h-6 text-yellow-400 mr-3" />
                <h3 className="text-xl font-bold">Lost Revenue</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Potential Customers Lost/Month:</span>
                  <span className="text-xl font-bold text-yellow-400">{results.potentialCustomers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Monthly Lost Revenue:</span>
                  <span className="text-2xl font-bold text-red-400">${results.monthlyLostRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-600">
                  <span className="text-gray-300">Annual Lost Revenue:</span>
                  <span className="text-3xl font-bold text-red-500">${results.annualLostRevenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            * Results are estimates based on your inputs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;