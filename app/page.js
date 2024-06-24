"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import SimpleStorage from "../artifacts/contracts/SimpleStorage.sol/SimpleStorage.json"; // Nota la ruta

const SimpleStorageApp = () => {
  const [storedNumber, setStoredNumber] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const loadContract = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = "TU_CONTRACT_ADDRESS"; // Reemplaza con la dirección de tu contrato
        const contract = new ethers.Contract(
          contractAddress,
          SimpleStorage.abi,
          signer
        );
        setContract(contract);
      }
    };
    loadContract();
  }, []);

  const fetchNumber = async () => {
    if (contract) {
      const number = await contract.getNumber();
      setStoredNumber(number.toString());
    }
  };

  const setNumber = async () => {
    if (contract && inputNumber) {
      await contract.setNumber(inputNumber);
      fetchNumber();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Simple Storage DApp</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Stored Number:</label>
          <p className="text-xl">{storedNumber}</p>
          <button
            className="mt-2 p-2 bg-blue-500 text-white rounded"
            onClick={fetchNumber}
          >
            Fetch Number
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Set Number:</label>
          <input
            className="p-2 border border-gray-300 rounded w-full"
            type="number"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
          />
          <button
            className="mt-2 p-2 bg-blue-500 text-white rounded"
            onClick={setNumber}
          >
            Set Number
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleStorageApp;
