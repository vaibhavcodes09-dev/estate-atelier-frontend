import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Check, Info, RefreshCw } from 'lucide-react';
import {
  AREA_UNITS,
  LENGTH_UNITS,
  BIGHA_REGIONS,
  convertUnits,
} from '../../utils/converters';

export default function UnitConverter() {
  const [unitType, setUnitType] = useState('area'); // 'area' or 'length'
  const [inputValue, setInputValue] = useState('1000');
  const [fromUnit, setFromUnit] = useState('sqft');
  const [toUnit, setToUnit] = useState('sqyd');
  const [bighaRegion, setBighaRegion] = useState('UP_STANDARD');

  // Handle Unit Type Switch
  const handleTypeChange = (type) => {
    setUnitType(type);
    if (type === 'area') {
      setFromUnit('sqft');
      setToUnit('sqyd');
    } else {
      setFromUnit('ft');
      setToUnit('m');
    }
  };

  // Swap Units
  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  // Perform Calculation
  const result = useMemo(() => {
    return convertUnits({
      value: inputValue,
      fromUnitId: fromUnit,
      toUnitId: toUnit,
      bighaRegionKey: bighaRegion,
    });
  }, [inputValue, fromUnit, toUnit, bighaRegion]);

  const activeUnits = unitType === 'area' ? AREA_UNITS : LENGTH_UNITS;

  const currentFromUnit = activeUnits.find((u) => u.id === fromUnit);
  const currentToUnit = activeUnits.find((u) => u.id === toUnit);

  const isBighaInvolved = fromUnit === 'bigha' || toUnit === 'bigha' || fromUnit === 'biswa' || toUnit === 'biswa';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Real Estate Unit Converter
          </h2>
          <p className="text-slate-500 text-xs font-medium mt-1">
            Instantly convert plot areas, land dimensions, and length measurements.
          </p>
        </div>

        {/* Category Pill Switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl w-fit">
          <button
            onClick={() => handleTypeChange('area')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              unitType === 'area' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Land Area
          </button>
          <button
            onClick={() => handleTypeChange('length')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              unitType === 'length' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Length / Dimensions
          </button>
        </div>
      </div>

      {/* Preset Chips */}
      <div className="mb-6">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Quick Presets:</span>
        <div className="flex flex-wrap gap-2">
          {unitType === 'area' ? (
            <>
              <button onClick={() => { setInputValue('1000'); setFromUnit('sqft'); setToUnit('sqyd'); }} className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">1,000 sq.ft ➔ Gaj</button>
              <button onClick={() => { setInputValue('1'); setFromUnit('bigha'); setToUnit('sqft'); }} className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">1 Bigha ➔ sq.ft</button>
              <button onClick={() => { setInputValue('1'); setFromUnit('acre'); setToUnit('sqft'); }} className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">1 Acre ➔ sq.ft</button>
              <button onClick={() => { setInputValue('100'); setFromUnit('sqyd'); setToUnit('sqft'); }} className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">100 Gaj ➔ sq.ft</button>
            </>
          ) : (
            <>
              <button onClick={() => { setInputValue('30'); setFromUnit('ft'); setToUnit('m'); }} className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">30 Feet ➔ Meters</button>
              <button onClick={() => { setInputValue('100'); setFromUnit('m'); setToUnit('ft'); }} className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">100 Meters ➔ Feet</button>
              <button onClick={() => { setInputValue('50'); setFromUnit('yd'); setToUnit('ft'); }} className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">50 Yards ➔ Feet</button>
            </>
          )}
        </div>
      </div>

      {/* Converter Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center mb-8">
        
        {/* From Input & Dropdown */}
        <div className="md:col-span-5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Value & From Unit</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              min="0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-lg font-extrabold text-slate-900 focus:outline-none focus:border-indigo-600"
              placeholder="Enter value..."
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="sm:w-48 bg-white border border-slate-200 rounded-xl px-3 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600"
            >
              {activeUnits.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex justify-center py-2 md:py-0">
          <button
            onClick={handleSwap}
            className="p-3 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-full transition-all shadow-sm active:scale-95"
            title="Swap Units"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* To Dropdown */}
        <div className="md:col-span-5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Unit</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-600"
          >
            {activeUnits.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Regional Bigha Context Selector (If Bigha/Biswa involved) */}
      {unitType === 'area' && isBighaInvolved && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-8 p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 mb-2">
            <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Select Regional Bigha Definition:</span>
          </div>
          <select
            value={bighaRegion}
            onChange={(e) => setBighaRegion(e.target.value)}
            className="w-full bg-white border border-indigo-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none"
          >
            {Object.entries(BIGHA_REGIONS).map(([key, reg]) => (
              <option key={key} value={key}>
                {reg.name} — ({reg.desc})
              </option>
            ))}
          </select>
          <p className="text-[11px] text-indigo-700 font-medium mt-2">
            Note: Bigha measurement values vary significantly by state/region in India.
          </p>
        </motion.div>
      )}

      {/* Result Display Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Conversion Result</span>
          <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {result.toLocaleString('en-IN', { maximumFractionDigits: 4 })}{' '}
            <span className="text-indigo-400 text-xl font-bold">{currentToUnit?.symbol || ''}</span>
          </div>
        </div>

        <div className="text-right text-xs text-slate-300 font-medium bg-white/10 px-4 py-2.5 rounded-xl border border-white/15">
          <span>{inputValue || '0'} {currentFromUnit?.symbol}</span> ={' '}
          <strong className="text-white">{result.toLocaleString('en-IN', { maximumFractionDigits: 4 })} {currentToUnit?.symbol}</strong>
        </div>
      </div>

    </div>
  );
}
