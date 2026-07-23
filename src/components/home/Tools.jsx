import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSliders, FiZap } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';

function EMICalculator() {
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const monthlyRate = rate / 12 / 100;
  const n = years * 12;
  const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  const total = emi * n;
  const interest = total - amount;

  return (
    <div  className="flex flex-col gap-6">
      <div className="space-y-5">
        <div>
          <div className="mb-2 flex justify-between text-sm font-medium text-ink-600">
            <span>Loan Amount</span>
            <span className="font-bold text-ink-900">₹{amount.toLocaleString('en-IN')}</span>
          </div>
          <input type="range" min="500000" max="50000000" step="100000" value={amount} onChange={(e) => setAmount(+e.target.value)} className="w-full accent-brand-500" />
        </div>
        <div>
          <div className="mb-2 flex justify-between text-sm font-medium text-ink-600">
            <span>Interest Rate (%)</span>
            <span className="font-bold text-ink-900">{rate}%</span>
          </div>
          <input type="range" min="6" max="15" step="0.1" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full accent-brand-500" />
        </div>
        <div>
          <div className="mb-2 flex justify-between text-sm font-medium text-ink-600">
            <span>Tenure (Years)</span>
            <span className="font-bold text-ink-900">{years} yrs</span>
          </div>
          <input type="range" min="5" max="30" step="1" value={years} onChange={(e) => setYears(+e.target.value)} className="w-full accent-brand-500" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 rounded-2xl bg-ink-50 p-4">
        <div>
          <p className="text-xs text-ink-400">Monthly EMI</p>
          <p className="text-lg font-bold text-ink-900">₹{Math.round(emi).toLocaleString('en-IN')}</p>
        </div>
        <div>
          <p className="text-xs text-ink-400">Total Interest</p>
          <p className="text-lg font-bold text-ink-900">₹{Math.round(interest).toLocaleString('en-IN')}</p>
        </div>
        <div>
          <p className="text-xs text-ink-400">Total Payable</p>
          <p className="text-lg font-bold text-ink-900">₹{Math.round(total).toLocaleString('en-IN')}</p>
        </div>
      </div>
    </div>
  );
}

const UNITS = {
  'sq.ft': 1,
  'sq.m': 0.092903,
  'sq.yd': 0.111111,
  'acre': 0.0000229568,
  'hectare': 0.000092903,
};

function AreaConverter() {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState('sq.ft');
  const [to, setTo] = useState('sq.m');

  const result = (value * UNITS[from]) / UNITS[to];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400">Value</label>
          <input type="number" value={value} onChange={(e) => setValue(+e.target.value)} className="input-field" />
        </div>
        <div className="flex-1">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400">From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="input-field">
            {Object.keys(UNITS).map((u) => <option key={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <div className="flex-1">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400">To</label>
        <select value={to} onChange={(e) => setTo(e.target.value)} className="input-field">
          {Object.keys(UNITS).map((u) => <option key={u}>{u}</option>)}
        </select>
      </div>
      <div className="rounded-2xl bg-ink-50 p-5 text-center">
        <p className="text-sm text-ink-400">Result</p>
        <p className="mt-1 text-2xl font-bold text-ink-900">{result.toLocaleString('en-IN', { maximumFractionDigits: 4 })} {to}</p>
      </div>
    </div>
  );
}

export default function Tools() {
  const [tab, setTab] = useState('emi');

  return (
    <section id="tools" className="bg-ink-50 py-20 lg:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="Smart Tools"
          title="Plan your purchase with confidence"
          subtitle="Free, instant calculators to help you budget and convert — no sign-up required."
        />

        <div className="mx-auto mt-12 max-w-2xl card-surface p-6 sm:p-8">
          <div className="mb-6 flex gap-2 rounded-2xl bg-ink-50 p-1.5">
            <button
              onClick={() => setTab('emi')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition ${tab === 'emi' ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-500'}`}
            >
              <FiSliders className="h-4 w-4" /> EMI Calculator
            </button>
            <button
              onClick={() => setTab('area')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition ${tab === 'area' ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-500'}`}
            >
              <FiZap className="h-4 w-4" /> Area Converter
            </button>
          </div>
          {tab === 'emi' ? <EMICalculator /> : <AreaConverter />}
        </div>
      </div>
    </section>
  );
}
