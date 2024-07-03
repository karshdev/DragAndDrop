import React, { useContext, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { CiZoomIn, CiZoomOut } from "react-icons/ci";
import { DataContext } from "../context/DataContext";
import { useTranslation } from "react-i18next";

const Header = ({ setShapes, undo }) => {
  const { t } = useTranslation();
  const { setZoomLevel } = useContext(DataContext);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    address: "",
    number: "",
    neighborhood: "",
    state: "",
    city: "",
  });
  const states = ["São Paulo", "Rio de Janeiro", "Minas Gerais"];
  const citiesByState = [
    "São Paulo City",
    "Campinas",
    "Santos",
    "Rio de Janeiro City",
    "Niterói",
    "Nova Iguaçu",
    "Belo Horizonte",
    "Uberlândia",
    "Contagem",
  ];

  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => Math.min(prevZoomLevel * 1.2, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel / 1.2, 0.1));
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    togglePopup();
  };

  return (
    <header className="text-gray-600 body-font border-b-2 w-full z-[1000]">
      <div className="mx-auto flex flex-wrap py-4 px-1 flex-col md:flex-row justify-between items-center">
        <div className="flex pl-2 w-auto">
          <div className="flex px-4">
            <div className="flex flex-col items-center px-2 hover:text-gray-800 cursor-pointer">
              <TbArrowBackUp className="text-2xl" onClick={undo} />
              <span className="flex flex-col items-center px-2">{t(`undo`)}</span>
            </div>
          </div>
          <button
            onClick={() => setShapes([])}
            className="rounded border border-slate-400 hover:bg-gray-200 px-2 hover:text-gray-800 cursor-pointer"
          >
            {t(`startOver`)}
          </button>
        </div>
        <div className="flex pl-2">
          <div className="flex px-4 w-[21rem] justify-end">
            <div
              onClick={handleZoomIn}
              className="flex flex-col items-center px-2 hover:text-gray-800 cursor-pointer"
            >
              <CiZoomIn className="text-2xl" />
              <span className="flex flex-col items-center px-2 text-sm max-w-max">
                {t(`zoomIn`)}
              </span>
            </div>
            <div
              onClick={handleZoomOut}
              className="flex flex-col items-center px-2 hover:text-gray-800 cursor-pointer"
            >
              <CiZoomOut className="text-2xl" />
              <span className="flex flex-col items-center text-sm max-w-max">
                {t(`zoomOut`)}
              </span>
            </div>
          </div>
          <button
            onClick={togglePopup}
            className="rounded border bg-sky-600 hover:bg-sky-300 px-2 text-white mx-4 max-w-max hover:text-gray-800 cursor-pointer"
          >
            {t(`requestQuotes`)}
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-[1100] bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
            <div className="flex justify-end">
              <button
                onClick={togglePopup}
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4 text-green-700">
              {t(`requestQuotes`)}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label className="block text-gray-700">Telephone:</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Your Telephone"
                />
              </div>
              <div>
                <label className="block text-gray-700">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Your Address"
                />
              </div>
              <div>
                <label className="block text-gray-700">Number:</label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Your Number"
                />
              </div>
              <div>
                <label className="block text-gray-700">Neighborhood:</label>
                <input
                  type="text"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Your Neighborhood"
                />
              </div>
              <div>
                <label className="block text-gray-700">State:</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700">City:</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Select City</option>
                  {citiesByState.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="rounded bg-green-500 hover:bg-green-700 text-white px-4 py-2 hover:text-gray-800 cursor-pointer"
                >
                  {t(`submit`)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
