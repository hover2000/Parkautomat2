import React, { useState } from 'react';

// Main component of the application
function App() {
  // State variables for K11 coin counts (current)
  const [coin10ctK11, setCoin10ctK11] = useState('');
  const [coin20ctK11, setCoin20ctK11] = useState('');
  const [coin50ctK11, setCoin50ctK11] = useState('');
  const [coin2EuroK11, setCoin2EuroK11] = useState('');

  // State variables for K12 coin counts (current)
  const [coin10ctK12, setCoin10ctK12] = useState('');
  const [coin50ctK12, setCoin50ctK12] = useState('');
  const [coin2EuroK12, setCoin2EuroK12] = useState('');

  // Maximum capacities for K11 coin containers
  const maxCapacityK11 = {
    '10ct': 770,
    '20ct': 600,
    '50ct': 400,
    '2Euro': 380,
  };

  // Maximum capacities for K12 coin containers
  const maxCapacityK12 = {
    '10ct': 1000,
    '50ct': 700,
    '2Euro': 600,
  };

  // Function to determine the numeric value for the "Nachfüllen" input (for calculations)
  const getRefillNumericValue = (currentCoinAmount, maxCapacityCoin, coinType) => {
    const parsedCurrent = parseFloat(currentCoinAmount || 0);

    if (currentCoinAmount === '') {
      return ''; // Return empty string if input is empty
    }

    if (parsedCurrent >= maxCapacityCoin) {
      return 0; // If max capacity is reached or exceeded, 0 needs to be refilled
    } else {
      const needed = maxCapacityCoin - parsedCurrent;
      let roundedNeeded;
      const roundingStep = coinType === '50ct' ? 50 : 100;

      // Calculate rounded value
      roundedNeeded = Math.round(needed / roundingStep) * roundingStep;

      // If rounding up would exceed the actual needed amount,
      // and the actual needed amount is not a multiple of the rounding step,
      // then round down to the previous multiple to avoid overfilling.
      if (roundedNeeded > needed && needed > 0) {
        roundedNeeded = Math.floor(needed / roundingStep) * roundingStep;
      }
      // Ensure the value is not negative (e.g., if needed was very small positive and rounded to 0)
      return Math.max(0, roundedNeeded);
    }
  };

  // Function to determine the display value for the "Nachfüllen" input (string or number)
  const getRefillDisplayValue = (currentCoinAmount, maxCapacityCoin, coinType) => {
    if (currentCoinAmount === '') {
      return ''; // Keep empty if current input is empty
    }

    const parsedCurrent = parseFloat(currentCoinAmount || 0);

    if (parsedCurrent >= maxCapacityCoin) {
      return 'Max. erreicht !!!'; // Display message if max capacity is reached or exceeded
    } else {
      return getRefillNumericValue(currentCoinAmount, maxCapacityCoin, coinType);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Parkautomat Kassenstand</h1>

        {/* Input fields for K11 and K12 side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* K11 specific input with coin denominations and calculated refill targets */}
          <div className="bg-blue-100 p-6 rounded-xl shadow-inner border border-blue-300 h-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center underline">K11</h2>

            {/* 10 Cent input (current, calculated refill, and new total side-by-side) */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                10 Cent Münzen (<span className="text-red-600 font-bold">Max: {maxCapacityK11['10ct']}</span> Stk.):
              </label>
              <div className="grid grid-cols-3 gap-x-2">
                <div>
                  <label htmlFor="coin10ctK11" className="block text-gray-700 text-xs mb-1">Aktuell:</label>
                  <input
                    type="number"
                    id="coin10ctK11"
                    value={coin10ctK11}
                    onChange={(e) => setCoin10ctK11(e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-xs text-center"
                    placeholder="Stk."
                    aria-label="Anzahl 10 Cent Münzen (aktuell) für K11"
                  />
                </div>
                <div>
                  <label htmlFor="refill10ctCalculatedK11" className="block text-gray-700 text-xs mb-1">Nachfüllen:</label>
                  <input
                    type="text"
                    id="refill10ctCalculatedK11"
                    value={getRefillDisplayValue(coin10ctK11, maxCapacityK11['10ct'], '10ct')}
                    readOnly
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg bg-yellow-100 text-gray-600 font-bold italic focus:outline-none text-xs text-center"
                    aria-label="Benötigte 10 Cent Münzen zum Nachfüllen für K11"
                  />
                </div>
                <div>
                  <label htmlFor="newStand10ctK11" className="block text-gray-700 text-xs mb-1">Neuer Stand:</label>
                  <input
                    type="text"
                    id="newStand10ctK11"
                    value={
                      coin10ctK11 === ''
                        ? ''
                        : parseFloat(coin10ctK11 || 0) + parseFloat(getRefillNumericValue(coin10ctK11, maxCapacityK11['10ct'], '10ct') || 0)
                    }
                    readOnly
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg bg-lime-400 text-gray-800 font-bold focus:outline-none text-xs text-center"
                    aria-label="Neuer Stand 10 Cent Münzen für K11"
                  />
                </div>
              </div>
            </div>

            {/* 20 Cent input (current, calculated refill, and new total side-by-side) */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                20 Cent Münzen (<span className="text-red-600 font-bold">Max: {maxCapacityK11['20ct']}</span> Stk.):
              </label>
              <div className="grid grid-cols-3 gap-x-2">
                <div>
                  <label htmlFor="coin20ctK11" className="block text-gray-700 text-xs mb-1">Aktuell:</label>
                  <input
                    type="number"
                    id="coin20ctK11"
                    value={coin20ctK11}
                    onChange={(e) => setCoin20ctK11(e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-xs text-center"
                    placeholder="Stk."
                    aria-label="Anzahl 20 Cent Münzen (aktuell) für K11"
                  />
                </div>
                <div>
                  <label htmlFor="refill20ctCalculatedK11" className="block text-gray-700 text-xs mb-1">Nachfüllen:</label>
                  <input
                    type="text"
                    id="refill20ctCalculatedK11"
                    value={getRefillDisplayValue(coin20ctK11, maxCapacityK11['20ct'], '20ct')}
                    readOnly
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg bg-yellow-100 text-gray-600 font-bold italic focus:outline-none text-xs text-center"
                    aria-label="Benötigte 20 Cent Münzen zum Nachfüllen für K11"
                  />
                </div>
                <div>
                  <label htmlFor="newStand20ctK11" className="block text-gray-700 text-xs mb-1">Neuer Stand:</label>
                  <input
                    type="text"
                    id="newStand20ctK11"
                    value={
                      coin20ctK11 === ''
                        ? ''
                        : parseFloat(coin20ctK11 || 0) + parseFloat(getRefillNumericValue(coin20ctK11, maxCapacityK11['20ct'], '20ct') || 0)
                    }
                    readOnly
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg bg-lime-400 text-gray-800 font-bold focus:outline-none text-xs text-center"
                    aria-label="Neuer Stand 20 Cent Münzen für K11"
                  />
                </div>
              </div>
            </div>

            {/* 50 Cent input (current, calculated refill, and new total side-by-side) */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                50 Cent Münzen (<span className="text-red-600 font-bold">Max: {maxCapacityK11['50ct']}</span> Stk.):
              </label>
              <div className="grid grid-cols-3 gap-x-2">
                <div>
                  <label htmlFor="coin50ctK11" className="block text-gray-700 text-xs mb-1">Aktuell:</label>
                  <input
                    type="number"
                    id="coin50ctK11"
                    value={coin50ctK11}
                    onChange={(e) => setCoin50ctK11(e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-xs text-center"
                    placeholder="Stk."
                    aria-label="Anzahl 50 Cent Münzen (aktuell) für K11"
                  />
                </div>
                <div>
                  <label htmlFor="refill50ctCalculatedK11" className="block text-gray-700 text-xs mb-1">Nachfüllen:</label>
                  <input
                    type="text"
                    id="refill50ctCalculatedK11"
                    value={getRefillDisplayValue(coin50ctK11, maxCapacityK11['50ct'], '50ct')}
                    readOnly
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg bg-yellow-100 text-gray-600 font-bold italic focus:outline-none text-xs text-center"
                    aria-label="Benötigte 50 Cent Münzen zum Nachfüllen für K11"
                  />
                </div>
                <div>
                  <label htmlFor="newStand50ctK11" className="block text-gray-700 text-xs mb-1">Neuer Stand:</label>
                  <input
                    type="text"
                    id="newStand50ctK11"
                    value={
                      coin50ctK11 === ''
                        ? ''
                        : parseFloat(coin50ctK11 || 0) + parseFloat(getRefillNumericValue(coin50ctK11, maxCapacityK11['50ct'], '50ct') || 0)
                    }
                    readOnly
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg bg-lime-400 text-gray-800 font-bold focus:outline-none text-xs text-center"
                    aria-label="Neuer Stand 50 Cent Münzen für K11"
                  />
                </div>
              </div>
            </div>

            {/* 2 Euro input (current, calculated refill, and new total side-by-side) */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                2 Euro Münzen (<span className="text-red-600 font-bold">Max: {maxCapacityK11['2Euro']}</span> Stk.):
              </label>
              <div className="grid grid-cols-3 gap-x-2">
                <div>
                  <label htmlFor="coin2EuroK11" className="block text-gray-700 text-xs mb-1">Aktuell:</label>
                  <input
                    type="number"
                    id="coin2EuroK11"
                    value={coin2EuroK11}
                    onChange={(e) => setCoin2EuroK11(e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-xs text-center"
                    placeholder="Stk."
                    aria-label="Anzahl 2 Euro Münzen (aktuell) für K11"
                  />
                </div>
                <div>
                  <label htmlFor="refill2EuroCalculatedK11" className="block text-gray-700 text-xs mb-1">Nachfüllen:</label>
                  <input
                    type="text"
                    id="refill2EuroCalculatedK11"
                    value={getRefillDisplayValue(coin2EuroK11, maxCapacityK11['2Euro'], '2Euro')}
                    readOnly
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg bg-yellow-100 text-gray-600 font-bold italic focus:outline-none text-xs text-center"
                    aria-label="Benötigte 2 Euro Münzen zum Nachfüllen für K11"
                  />
                </div>
                <div>
                  <label htmlFor="newStand2EuroK11" className="block text-gray-700 text-xs mb-1">Neuer Stand:</label>
                  <input
                    type="text"
                    id="newStand2EuroK11"
                    value={
                      coin2EuroK11 === ''
                        ? ''
                        : parseFloat(coin2EuroK11 || 0) + parseFloat(getRefillNumericValue(coin2EuroK11, maxCapacityK11['2Euro'], '2Euro') || 0)
                    }
                    readOnly
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg bg-lime-400 text-gray-800 font-bold focus:outline-none text-xs text-center"
                    aria-label="Neuer Stand 2 Euro Münzen für K11"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* K12 specific input with coin denominations and calculated refill targets */}
          <div className="bg-purple-100 p-6 rounded-xl shadow-inner border border-purple-300 h-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center underline">K12</h2>

            {/* 10 Cent input (current, calculated refill, and new total side-by-side) */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                10 Cent Münzen (<span className="text-red-600 font-bold">Max: {maxCapacityK12['10ct']}</span> Stk.):
              </label>
              <div className="grid grid-cols-3 gap-x-2">
                <div>
                  <label htmlFor="coin10ctK12" className="block text-gray-700 text-xs mb-1">Aktuell:</label>
                  <input
                    type="number"
                    id="coin10ctK12"
                    value={coin10ctK12}
                    onChange={(e) => setCoin10ctK12(e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-xs text-center"
                    placeholder="Stk."
                    aria-label="Anzahl 10 Cent Münzen (aktuell) für K12"
                  />
                </div>
                <div>
                  <label htmlFor="refill10ctCalculatedK12" className="block text-gray-700 text-xs mb-1">Nachfüllen:</label>
                  <input
                    type="text"
                    id="refill10ctCalculatedK12"
                    value={getRefillDisplayValue(coin10ctK12, maxCapacityK12['10ct'], '10ct')}
                    readOnly
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg bg-yellow-100 text-gray-600 font-bold italic focus:outline-none text-xs text-center"
                    aria-label="Benötigte 10 Cent Münzen zum Nachfüllen für K12"
                  />
                </div>
                <div>
                  <label htmlFor="newStand10ctK12" className="block text-gray-700 text-xs mb-1">Neuer Stand:</label>
                  <input
                    type="text"
                    id="newStand10ctK12"
                    value={
                      coin10ctK12 === ''
                        ? ''
                        : parseFloat(coin10ctK12 || 0) + parseFloat(getRefillNumericValue(coin10ctK12, maxCapacityK12['10ct'], '10ct') || 0)
                    }
                    readOnly
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg bg-lime-400 text-gray-800 font-bold focus:outline-none text-xs text-center"
                    aria-label="Neuer Stand 10 Cent Münzen für K12"
                  />
                </div>
              </div>
            </div>

            {/* 50 Cent input (current, calculated refill, and new total side-by-side) */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                50 Cent Münzen (<span className="text-red-600 font-bold">Max: {maxCapacityK12['50ct']}</span> Stk.):
              </label>
              <div className="grid grid-cols-3 gap-x-2">
                <div>
                  <label htmlFor="coin50ctK12" className="block text-gray-700 text-xs mb-1">Aktuell:</label>
                  <input
                    type="number"
                    id="coin50ctK12"
                    value={coin50ctK12}
                    onChange={(e) => setCoin50ctK12(e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-xs text-center"
                    placeholder="Stk."
                    aria-label="Anzahl 50 Cent Münzen (aktuell) für K12"
                  />
                </div>
                <div>
                  <label htmlFor="refill50ctCalculatedK12" className="block text-gray-700 text-xs mb-1">Nachfüllen:</label>
                  <input
                    type="text"
                    id="refill50ctCalculatedK12"
                    value={getRefillDisplayValue(coin50ctK12, maxCapacityK12['50ct'], '50ct')}
                    readOnly
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg bg-yellow-100 text-gray-600 font-bold italic focus:outline-none text-xs text-center"
                    aria-label="Benötigte 50 Cent Münzen zum Nachfüllen für K12"
                  />
                </div>
                <div>
                  <label htmlFor="newStand50ctK12" className="block text-gray-700 text-xs mb-1">Neuer Stand:</label>
                  <input
                    type="text"
                    id="newStand50ctK12"
                    value={
                      coin50ctK12 === ''
                        ? ''
                        : parseFloat(coin50ctK12 || 0) + parseFloat(getRefillNumericValue(coin50ctK12, maxCapacityK12['50ct'], '50ct') || 0)
                    }
                    readOnly
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg bg-lime-400 text-gray-800 font-bold focus:outline-none text-xs text-center"
                    aria-label="Neuer Stand 50 Cent Münzen für K12"
                  />
                </div>
              </div>
            </div>

            {/* 2 Euro input (current, calculated refill, and new total side-by-side) */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                2 Euro Münzen (<span className="text-red-600 font-bold">Max: {maxCapacityK12['2Euro']}</span> Stk.):
              </label>
              <div className="grid grid-cols-3 gap-x-2">
                <div>
                  <label htmlFor="coin2EuroK12" className="block text-gray-700 text-xs mb-1">Aktuell:</label>
                  <input
                    type="number"
                    id="coin2EuroK12"
                    value={coin2EuroK12}
                    onChange={(e) => setCoin2EuroK12(e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-xs text-center"
                    placeholder="Stk."
                    aria-label="Anzahl 2 Euro Münzen (aktuell) für K12"
                  />
                </div>
                <div>
                  <label htmlFor="refill2EuroCalculatedK12" className="block text-gray-700 text-xs mb-1">Nachfüllen:</label>
                  <input
                    type="text"
                    id="refill2EuroCalculatedK12"
                    value={getRefillDisplayValue(coin2EuroK12, maxCapacityK12['2Euro'], '2Euro')}
                    readOnly
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg bg-yellow-100 text-gray-600 font-bold italic focus:outline-none text-xs text-center"
                    aria-label="Benötigte 2 Euro Münzen zum Nachfüllen für K12"
                  />
                </div>
                <div>
                  <label htmlFor="newStand2EuroK12" className="block text-gray-700 text-xs mb-1">Neuer Stand:</label>
                  <input
                    type="text"
                    id="newStand2EuroK12"
                    value={
                      coin2EuroK12 === ''
                        ? ''
                        : parseFloat(coin2EuroK12 || 0) + parseFloat(getRefillNumericValue(coin2EuroK12, maxCapacityK12['2Euro'], '2Euro') || 0)
                    }
                    readOnly
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg bg-lime-400 text-gray-800 font-bold focus:outline-none text-xs text-center"
                    aria-label="Neuer Stand 2 Euro Münzen für K12"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
