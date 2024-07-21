import React, { useContext, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { CiZoomIn, CiZoomOut } from "react-icons/ci";
import { DataContext } from "../context/DataContext";
import { useTranslation } from "react-i18next";

const Header = ({ setShapes, undo }) => {
  const { t } = useTranslation();
  const { setZoomLevel, submitClicked, setSubmitClicked } = useContext(DataContext);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message:""
  });
  const [errors, setErrors] = useState({});


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
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setSubmitClicked({
        toggle: true,
        data: formData,
      });
      togglePopup();
    }
  };

  return (
    <header className="text-gray-600 body-font border-b-2 w-full z-[1000]">
      <div className="mx-auto flex flex-wrap py-4 px-1 flex-col md:flex-row justify-between items-center">
        <div className="flex pl-2 w-auto">
          <div className="flex px-4">
            <div className="flex flex-col items-center px-2 hover:text-gray-800 cursor-pointer border-r border-r-[#eff3fb] mr-[20px]">
              <TbArrowBackUp className="text-2xl" onClick={undo} />
              <span className="flex flex-col items-center px-2 text-[14px]">{t(`undo`)}</span>
            </div>
          </div>
          <button
            onClick={() => setShapes([])}
            className="w-36 text-white bg-blue-700 rounded-full border-none text-shadow-none hover:bg-customHover"
          >
            {t(`startOver`)}
          </button>
        </div>
        <div>
          <div className="ml-[250px]">
          <img src="/assets/logo.svg" alt="logo" height={75} width={75} />

          </div>
        </div>
        <div className="flex pl-2">
          <div className="flex px-4 w-[21rem] justify-end">
            <div
              onClick={handleZoomIn}
              className="flex flex-col items-center px-2 hover:text-gray-800 cursor-pointer"
            >
              <CiZoomIn className="text-2xl text-[#1558e5] font-bold	" />
              <span className="flex flex-col items-center px-2 text-sm max-w-max text-[#62656a]">
                {t(`zoomIn`)}
              </span>
            </div>
            <div
              onClick={handleZoomOut}
              className="flex flex-col items-center px-2 hover:text-gray-800 cursor-pointer"
            >
              <CiZoomOut className="text-2xl text-[#1558e5] font-bold	" />
              <span className="flex flex-col items-center text-sm max-w-max text-[#62656a]">
                {t(`zoomOut`)}
              </span>
            </div>
          </div>
          <button
            onClick={togglePopup}
            className="w-56  border-none text-white cursor-pointer rounded-full" style={{ backgroundColor: '#f0cf2a' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e1bd0b'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f0cf2a'}

          >
         <span className="text-[#62656a]">
         {t(`requestQuotes`)}
         </span>
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
            <h2 className="text-xl font-bold mb-4 text-[#62656a]">
            {t(`requestQuotes`)}
            </h2>
            <form onSubmit={handleSubmit} className="p-1 space-y-2">
  <div>
    <label htmlFor="name" className="block text-[#62656a] mb-1">Seu nome</label>
    <input
      id="name"
      type="text"
      name="name"
      value={formData.name}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border border-gray-300 rounded"
      placeholder="Seu nome"
      required
    />
    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
  </div>

  <div>
    <label htmlFor="email" className="block text-[#62656a] mb-1">Seu email</label>
    <input
      id="email"
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border border-gray-300 rounded"
      placeholder="Seu email"
      required
    />
    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
  </div>

  <div>
    <label htmlFor="phone" className="block text-[#62656a] mb-1">Telefone</label>
    <input
      id="phone"
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border border-gray-300 rounded"
      placeholder="(DDD) Telefone"
      required
      // Add mask logic for DDD code zone here
    />
    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
  </div>

  <div>
    <label htmlFor="message" className="block text-[#62656a] mb-1">Sua mensagem</label>
    <textarea
      id="message"
      name="message"
      value={formData.message}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border border-gray-300 rounded"
      placeholder="Sua mensagem"
      rows="4"
      required
    />
    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
  </div>

  <div className="flex items-center space-x-2">
    <input
      id="confirmation"
      type="checkbox"
      name="confirmation"
      className="h-4 w-4 text-green-500 border-gray-300 rounded"
      required
    />
    <label htmlFor="confirmation" className="text-[#62656a]">
      Confirmo o envio das informações acima.
    </label>
  </div>

  <div className="flex justify-end">
    <button
      type="submit"
      className="w-[140px] p-2 border-none text-white cursor-pointer rounded-full" style={{ backgroundColor: '#f0cf2a' }}
    >
    <span className="text-[#62656a]">

    {t(`submit`)}
    </span>
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
