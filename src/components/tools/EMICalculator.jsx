import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Percent, Calendar, Calculator, CheckCircle2 } from 'lucide-react';
import { calculateEMI, formatCurrency } from '../../utils/calculators';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState('5000000'); // Default ₹ 50 Lacs
  const [interestRate, setInterestRate] = useState('8.5'); // Default 8.5% p.a.
  const [tenureYears, setTenureYears] = useState('20'); // Default 20 years

  const calculation = useMemo(() => {
    return calculateEMI(loanAmount, interestRate, tenureYears);
  }, [loanAmount, interestRate, tenureYears]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
      
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-slate-100">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Home Loan & EMI Calculator
        </h2>
        <p className="text-slate-500 text-xs font-medium mt-1">
          Estimate your monthly installments, total interest cost, and repayment schedule for your home loan.
        </p>
      </div>

      {/* Preset Loan Amounts */}
      <div className="mb-6">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Loan Presets:</span>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setLoanAmount('2500000')} className="px-3 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">₹ 25 Lacs</button>
          <button onClick={() => setLoanAmount('5000000')} className="px-3 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">₹ 50 Lacs</button>
          <button onClick={() => setLoanAmount('10000000')} className="px-3 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">₹ 1 Crore</button>
          <button onClick={() => setTenureYears('15')} className="px-3 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">15 Years</button>
          <button onClick={() => setTenureYears('20')} className="px-3 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">20 Years</button>
          <button onClick={() => setTenureYears('30')} className="px-3 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">30 Years</button>
        </div>
      </div>

      {/* Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Input 1: Loan Amount */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Loan Amount (₹)</label>
              <span className="text-sm font-extrabold text-indigo-600">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="relative mb-3">
              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-base font-extrabold text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
            <input
              type="range"
              min="500000"
              max="30000000"
              step="500000"
              value={loanAmount || 0}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-1">
              <span>₹ 5 Lacs</span>
              <span>₹ 3 Cr</span>
            </div>
          </div>

          {/* Input 2: Interest Rate */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Interest Rate (% p.a.)</label>
              <span className="text-sm font-extrabold text-indigo-600">{interestRate}%</span>
            </div>
            <div className="relative mb-3">
              <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="number"
                step="0.1"
                min="5"
                max="20"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-base font-extrabold text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
            <input
              type="range"
              min="5"
              max="15"
              step="0.1"
              value={interestRate || 8.5}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-1">
              <span>5%</span>
              <span>15%</span>
            </div>
          </div>

          {/* Input 3: Tenure */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Loan Tenure (Years)</label>
              <span className="text-sm font-extrabold text-indigo-600">{tenureYears} Years ({Number(tenureYears) * 12} Months)</span>
            </div>
            <div className="relative mb-3">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="number"
                min="1"
                max="30"
                value={tenureYears}
                onChange={(e) => setTenureYears(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-base font-extrabold text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenureYears || 20}
              onChange={(e) => setTenureYears(e.target.value)}
              className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-1">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>

        </div>

        {/* Right Output Cards & Payment Breakdown (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full border border-slate-800 shadow-xl">
          
          <div>
            {/* EMI Display Card */}
            <div className="mb-6 pb-6 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                Your Monthly EMI
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                ₹ {calculation.monthlyEMI.toLocaleString('en-IN')}{' '}
                <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
            </div>

            {/* Summary Details */}
            <div className="space-y-4 text-xs font-semibold">
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Principal Amount:</span>
                <span className="text-white font-extrabold">{formatCurrency(loanAmount)}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Total Interest Payable:</span>
                <span className="text-amber-400 font-extrabold">{formatCurrency(calculation.totalInterest)}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Total Amount Payable:</span>
                <span className="text-white font-extrabold">{formatCurrency(calculation.totalPayment)}</span>
              </div>
            </div>

            {/* Visual Payment Breakdown Bar */}
            <div className="mt-8">
              <div className="flex justify-between text-[11px] font-bold text-slate-300 mb-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Principal ({calculation.principalPercent}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Interest ({calculation.interestPercent}%)
                </span>
              </div>

              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${calculation.principalPercent}%` }}
                  className="bg-indigo-500 h-full transition-all duration-500"
                />
                <div
                  style={{ width: `${calculation.interestPercent}%` }}
                  className="bg-amber-400 h-full transition-all duration-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-400 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Accurate estimates based on standard monthly reducing balance.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
