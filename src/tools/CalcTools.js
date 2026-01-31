import React, { useState } from 'react';

// Simple, safe expression evaluator supporting + - * / and parentheses
const evaluateExpression = (expr) => {
  const cleaned = String(expr).replace(/\s+/g, '');
  const tokens = cleaned.match(/(\d+(?:\.\d+)?)|[()+\-*/]/g);
  if (!tokens) throw new Error('Invalid expression');

  // Normalize unary minus by inserting 0 before unary minus
  const processed = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === '-' && (i === 0 || tokens[i - 1] === '(' || /[+\-*/]/.test(tokens[i - 1]))) {
      processed.push('0');
    }
    processed.push(t);
  }

  const output = [];
  const ops = [];
  const prec = { '+': 1, '-': 1, '*': 2, '/': 2 };

  for (const t of processed) {
    if (/^\d/.test(t)) output.push(t);
    else if (t === '+' || t === '-' || t === '*' || t === '/') {
      while (ops.length && ops[ops.length - 1] !== '(' && prec[ops[ops.length - 1]] >= prec[t]) {
        output.push(ops.pop());
      }
      ops.push(t);
    } else if (t === '(') ops.push(t);
    else if (t === ')') {
      while (ops.length && ops[ops.length - 1] !== '(') output.push(ops.pop());
      if (!ops.length) throw new Error('Mismatched parentheses');
      ops.pop();
    }
  }

  while (ops.length) {
    const op = ops.pop();
    if (op === '(' || op === ')') throw new Error('Mismatched parentheses');
    output.push(op);
  }

  const stack = [];
  for (const tok of output) {
    if (/^\d/.test(tok)) stack.push(parseFloat(tok));
    else {
      const b = stack.pop();
      const a = stack.pop();
      if (a === undefined || b === undefined) throw new Error('Invalid expression');
      let res;
      if (tok === '+') res = a + b;
      else if (tok === '-') res = a - b;
      else if (tok === '*') res = a * b;
      else if (tok === '/') {
        if (b === 0) throw new Error('Division by zero');
        res = a / b;
      }
      stack.push(res);
    }
  }

  if (stack.length !== 1) throw new Error('Invalid expression');
  return stack[0];
};

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const calculate = () => {
    try {
      const result = evaluateExpression(display);
      setEquation(display + ' =');
      setDisplay(String(result));
    } catch (e) {
      setDisplay('Erreur');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl">
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <div className="text-gray-400 text-right text-sm mb-1 h-6">{equation}</div>
          <div className="text-white text-right text-3xl font-bold overflow-auto">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-3">
          {buttons.flat().map((btn, i) => (
            <button key={i} onClick={() => (btn === '=' ? calculate() : handleClick(btn))} className={`h-16 rounded-xl font-bold text-xl transition-all hover:scale-105 ${btn === '=' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : ['+', '-', '*', '/'].includes(btn) ? 'bg-orange-500 text-white' : 'bg-gray-600 text-white'}`}>
              {btn}
            </button>
          ))}
        </div>

        <button onClick={clear} className="w-full h-16 bg-red-500 text-white rounded-xl font-bold text-xl hover:bg-red-600 transition-all">Effacer</button>
      </div>
    </div>
  );
};

const UnitConverter = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [category, setCategory] = useState('length');
  const [result, setResult] = useState('');

  const units = {
    length: {
      m: { name: 'Mètres', factor: 1 },
      km: { name: 'Kilomètres', factor: 1000 },
      cm: { name: 'Centimètres', factor: 0.01 },
      ft: { name: 'Pieds', factor: 0.3048 },
      in: { name: 'Pouces', factor: 0.0254 },
      mi: { name: 'Miles', factor: 1609.34 },
    },
    weight: {
      kg: { name: 'Kilogrammes', factor: 1 },
      g: { name: 'Grammes', factor: 0.001 },
      lb: { name: 'Livres', factor: 0.453592 },
      oz: { name: 'Onces', factor: 0.0283495 },
    },
  };

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return;
    const baseValue = val * units[category][fromUnit].factor;
    const converted = baseValue / units[category][toUnit].factor;
    setResult(converted.toFixed(4));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Catégorie</label>
        <select value={category} onChange={(e) => { setCategory(e.target.value); const firstUnit = Object.keys(units[e.target.value])[0]; setFromUnit(firstUnit); setToUnit(Object.keys(units[e.target.value])[1] || firstUnit); }} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
          <option value="length">Longueur</option>
          <option value="weight">Poids</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Valeur</label>
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Entrez une valeur..." />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">De</label>
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
            {Object.entries(units[category]).map(([key, unit]) => (
              <option key={key} value={key}>{unit.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Vers</label>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
            {Object.entries(units[category]).map(([key, unit]) => (
              <option key={key} value={key}>{unit.name}</option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={convert} className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium">Convertir</button>

      {result && (
        <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">{result}</div>
          <div className="text-sm text-gray-600">{units[category][toUnit].name}</div>
        </div>
      )}
    </div>
  );
};

const PercentageCalc = () => {
  const [base, setBase] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const b = parseFloat(base);
    const p = parseFloat(percentage);
    if (isNaN(b) || isNaN(p)) return;
    setResult({
      value: (b * p / 100).toFixed(2),
      total: (b + (b * p / 100)).toFixed(2),
      remaining: (b - (b * p / 100)).toFixed(2),
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Valeur de base</label>
        <input type="number" value={base} onChange={(e) => setBase(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="100" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Pourcentage (%)</label>
        <input type="number" value={percentage} onChange={(e) => setPercentage(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="20" />
      </div>

      <button onClick={calculate} className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium">Calculer</button>

      {result && (
        <div className="space-y-3">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">{percentage}% de {base} =</div>
            <div className="text-3xl font-bold text-indigo-600">{result.value}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Avec augmentation</div>
              <div className="text-xl font-bold text-green-600">{result.total}</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Avec réduction</div>
              <div className="text-xl font-bold text-orange-600">{result.remaining}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const VATCalculator = () => {
  const [amount, setAmount] = useState('');
  const [vatRate, setVatRate] = useState('20');
  const [mode, setMode] = useState('add');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const amt = parseFloat(amount);
    const rate = parseFloat(vatRate);
    if (isNaN(amt) || isNaN(rate)) return;

    if (mode === 'add') {
      const vatAmount = amt * (rate / 100);
      setResult({ base: amt.toFixed(2), vat: vatAmount.toFixed(2), total: (amt + vatAmount).toFixed(2) });
    } else {
      const base = amt / (1 + rate / 100);
      const vatAmount = amt - base;
      setResult({ base: base.toFixed(2), vat: vatAmount.toFixed(2), total: amt.toFixed(2) });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <button onClick={() => setMode('add')} className={`flex-1 px-6 py-3 rounded-lg font-medium ${mode === 'add' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Ajouter TVA</button>
        <button onClick={() => setMode('remove')} className={`flex-1 px-6 py-3 rounded-lg font-medium ${mode === 'remove' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Retirer TVA</button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Montant (€)</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="100.00" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Taux TVA (%)</label>
        <select value={vatRate} onChange={(e) => setVatRate(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
          <option value="5.5">5.5% (Taux réduit)</option>
          <option value="10">10% (Taux intermédiaire)</option>
          <option value="20">20% (Taux normal)</option>
        </select>
      </div>

      <button onClick={calculate} className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium">Calculer</button>

      {result && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg space-y-3">
          <div className="flex justify-between items-center pb-3 border-b">
            <span className="text-gray-600">Montant HT:</span>
            <span className="text-2xl font-bold text-gray-900">{result.base} €</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b">
            <span className="text-gray-600">TVA ({vatRate}%):</span>
            <span className="text-xl font-semibold text-indigo-600">+ {result.vat} €</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-800 font-medium">Montant TTC:</span>
            <span className="text-3xl font-bold text-green-600">{result.total} €</span>
          </div>
        </div>
      )}
    </div>
  );
};

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (isNaN(w) || isNaN(h) || h === 0) return;

    const bmiValue = w / (h * h);
    let category = '', color = '';

    if (bmiValue < 18.5) { category = 'Insuffisance pondérale'; color = 'text-blue-600'; }
    else if (bmiValue < 25) { category = 'Poids normal'; color = 'text-green-600'; }
    else if (bmiValue < 30) { category = 'Surpoids'; color = 'text-orange-600'; }
    else { category = 'Obésité'; color = 'text-red-600'; }

    setBmi({ value: bmiValue.toFixed(1), category, color });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Poids (kg)</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="70" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Taille (cm)</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="175" />
      </div>

      <button onClick={calculate} className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium">Calculer l'IMC</button>

      {bmi && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg text-center">
          <div className="text-5xl font-bold text-gray-900 mb-2">{bmi.value}</div>
          <div className={`text-xl font-semibold ${bmi.color} mb-4`}>{bmi.category}</div>
        </div>
      )}
    </div>
  );
};

export const CalcTools = {
  Calculator,
  UnitConverter,
  PercentageCalc,
  VATCalculator,
  BMICalculator,
};
