import React, { useState } from 'react';

// ตัวอย่างข้อมูลสินค้า E-SIM
const esimProducts = [
  { id: 1, country: "Thailand", dataPlan: "10 GB", duration: "15 Days", price: 9.99, network: "AIS" },
  { id: 2, country: "Thailand", dataPlan: "Unlimited", duration: "30 Days", price: 29.99, network: "DTAC" },
  { id: 3, country: "Japan", dataPlan: "5 GB", duration: "30 Days", price: 19.99, network: "NTT Docomo" },
  { id: 4, country: "Japan", dataPlan: "20 GB", duration: "15 Days", price: 24.99, network: "SoftBank" },
  { id: 5, country: "South Korea", dataPlan: "Unlimited", duration: "7 Days", price: 14.99, network: "SK Telecom" },
  { id: 6, country: "South Korea", dataPlan: "1 GB", duration: "30 Days", price: 10.99, network: "KT" },
  { id: 7, country: "USA", dataPlan: "Unlimited", duration: "30 Days", price: 49.99, network: "AT&T" },
  { id: 8, country: "USA", dataPlan: "50 GB", duration: "15 Days", price: 39.99, network: "T-Mobile" },
];

const ProductPages = () => {
  const [selectedCountry, setSelectedCountry] = useState('ทั้งหมด');
  const [selectedDataPlan, setSelectedDataPlan] = useState('ทั้งหมด');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState('products');

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงในตัวกรอง
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleDataPlanChange = (event) => {
    setSelectedDataPlan(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  // ฟังก์ชันสำหรับเพิ่มสินค้าลงในตะกร้า
  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // ฟังก์ชันสำหรับจำลองการชำระเงิน
  const handlePayment = () => {
    alert("การชำระเงินสำเร็จแล้ว!");
    setCartItems([]); // ล้างตะกร้าสินค้า
    setCurrentPage('products'); // กลับไปหน้าสินค้า
  };

  // กรองสินค้าตามตัวเลือกของผู้ใช้ทั้งหมด
  const filteredProducts = esimProducts.filter(product => {
    const isCountryMatch = selectedCountry === 'ทั้งหมด' || product.country === selectedCountry;
    const isDataPlanMatch = selectedDataPlan === 'ทั้งหมด' || product.dataPlan === selectedDataPlan;
    const isPriceInRange = (minPrice === '' || product.price >= parseFloat(minPrice)) &&
                           (maxPrice === '' || product.price <= parseFloat(maxPrice));
    
    return isCountryMatch && isDataPlanMatch && isPriceInRange;
  });

  // รวบรวมรายชื่อประเทศและรูปแบบข้อมูลที่ไม่ซ้ำกัน
  const uniqueCountries = ['ทั้งหมด', ...new Set(esimProducts.map(item => item.country))];
  const uniqueDataPlans = ['ทั้งหมด', ...new Set(esimProducts.map(item => item.dataPlan))];

  // คำนวณราคารวม
  const total = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  // ส่วน UI ของหน้า Products
  const productsPageUI = (
    <>
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            E-SIM Data Plans
          </h1>
          {cartItems.length > 0 && (
            <button
              onClick={() => setCurrentPage('checkout')}
              className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors duration-300"
            >
              ดูตะกร้า ({cartItems.length})
            </button>
          )}
        </div>

        {/* ส่วนตัวกรอง (Filters) */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          {/* Dropdown สำหรับเลือกประเทศ */}
          <div className="w-full md:w-1/4">
            <label htmlFor="country-filter" className="block text-sm font-medium text-gray-700 mb-1">
              เลือกประเทศ:
            </label>
            <select
              id="country-filter"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {uniqueCountries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown สำหรับเลือก Data Plan */}
          <div className="w-full md:w-1/4">
            <label htmlFor="data-plan-filter" className="block text-sm font-medium text-gray-700 mb-1">
              รูปแบบข้อมูล:
            </label>
            <select
              id="data-plan-filter"
              value={selectedDataPlan}
              onChange={handleDataPlanChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {uniqueDataPlans.map(dataPlan => (
                <option key={dataPlan} value={dataPlan}>
                  {dataPlan}
                </option>
              ))}
            </select>
          </div>

          {/* กล่องกรอกราคา */}
          <div className="w-full md:w-1/4">
            <label htmlFor="price-range-filter" className="block text-sm font-medium text-gray-700 mb-1">
              ช่วงราคา ($):
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="ต่ำสุด"
                value={minPrice}
                onChange={handleMinPriceChange}
                className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="สูงสุด"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* ส่วนแสดงรายการสินค้า */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-gray-500 uppercase">{product.network}</span>
                    <div className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {product.duration}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.country}</h2>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Data:</span> {product.dataPlan}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-3xl font-extrabold text-indigo-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-300">
                      ซื้อเลย
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-10">
              ไม่พบสินค้าสำหรับตัวเลือกนี้
            </p>
          )}
        </div>
      </div>
    </>
  );

  // ส่วน UI ของหน้า Checkout
  const checkoutPageUI = (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          ตะกร้าสินค้า & ชำระเงิน
        </h1>
        <button
          onClick={() => setCurrentPage('products')}
          className="bg-gray-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-500 transition-colors duration-300"
        >
          กลับไปเลือกซื้อ
        </button>
      </div>
      
      {/* รายการสินค้าในตะกร้า */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b border-gray-200 py-4 last:border-b-0">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.country} - {item.dataPlan}</h3>
                <p className="text-gray-500 text-sm">{item.duration}</p>
              </div>
              <span className="text-xl font-bold text-indigo-600">${item.price.toFixed(2)}</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">ตะกร้าของคุณว่างเปล่า</p>
        )}
      </div>

      {/* ราคารวม */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-6 rounded-xl shadow-md mb-8">
        <span className="text-2xl font-bold text-gray-700">ราคารวมทั้งหมด:</span>
        <span className="text-3xl font-extrabold text-indigo-700">${total}</span>
      </div>

      {/* ส่วนการชำระเงินด้วย PromptPay */}
      {cartItems.length > 0 && (
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ชำระเงินด้วย PromptPay
          </h2>
          <p className="text-gray-600 mb-4">
            ยอดที่ต้องชำระ: <span className="text-xl font-bold text-indigo-600">${total}</span>
          </p>
          <div className="w-48 h-48 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 mb-4">
            {/* QR Code จำลอง - สำหรับการแสดงผลเท่านั้น */}
            <img 
              src={`https://placehold.co/200x200/5C6BC0/FFFFFF?text=QR+Code+Mock`} 
              alt="QR Code for payment" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center text-sm text-gray-500 mb-6">
            สแกน QR Code นี้เพื่อชำระเงิน
          </p>
          <button 
            onClick={handlePayment}
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors duration-300 w-full md:w-auto"
          >
            ยืนยันการชำระเงิน
          </button>
        </div>
      )}

    </div>
  );

  // การแสดงผลตามสถานะของหน้า
  return (
    <>
      {currentPage === 'products' ? productsPageUI : checkoutPageUI}
    </>
  );
};

export default ProductPages;