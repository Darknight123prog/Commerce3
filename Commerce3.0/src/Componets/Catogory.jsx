import React, { useState } from 'react';

function Catogory() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  return (
    <div className="flex flex-wrap h-auto p-2 w-full justify-center gap-2 md:gap-5 lg:gap-8">
      
      {/* Electronics */}
      <div
        onMouseEnter={() => setOpen4(true)}
        onMouseLeave={() => setOpen4(false)}
        className="relative"
      >
        <button className="text-sm font-semibold text-white/50 hover:text-white transition">
          Electronics
        </button>

        {open4 && (
          <div className="absolute top-full left-0 mt-1 w-36 md:w-40 lg:w-48 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-black text-sm z-50">
            <div className="divide-y divide-white/20">
              <div className="p-2">
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="/product?keyword=mobilePhones">
                  <p className="font-semibold text-sm">Mobile Phone</p>
                  <p className="text-white/50 text-xs">Exclusive offer on new Smart Phones</p>
                </a>
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="/product?keyword=fridge">
                  <p className="font-semibold text-sm">Fridge</p>
                  <p className="text-white/50 text-xs">New Innovative fridge collection</p>
                </a>
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="/product?keyword=washingMachine">
                  <p className="font-semibold text-sm">Washing Machine</p>
                  <p className="text-white/50 text-xs">Innovative things at great deals</p>
                </a>
              </div>
              <div className="p-2">
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="product?keyword=watches">
                  <p className="font-semibold text-sm">Watches</p>
                  <p className="text-white/50 text-xs">Trendy and classic collection</p>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Women Fashion */}
      <div
        onMouseEnter={() => setOpen3(true)}
        onMouseLeave={() => setOpen3(false)}
        className="relative"
      >
        <button className="text-sm font-semibold text-white/50 hover:text-white transition">
          Women Fashion
        </button>

        {open3 && (
          <div className="absolute top-full left-0 mt-1 w-36 md:w-40 lg:w-48 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-black text-sm z-50">
            <div className="divide-y divide-white/20">
              <div className="p-2">
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="product?keyword=womenKurta">
                  <p className="font-semibold text-sm">Kurta</p>
                  <p className="text-white/50 text-xs">Elegant Kurta, Effortless Style</p>
                </a>
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="product?keyword=saree">
                  <p className="font-semibold text-sm">Saree</p>
                  <p className="text-white/50 text-xs">Grace in Every Drape</p>
                </a>
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="product?keyword=lehengas">
                  <p className="font-semibold text-sm">Lehengas</p>
                  <p className="text-white/50 text-xs">Gorgeous Lehengas for Your Grand Moments</p>
                </a>
              </div>
              <div className="p-2">
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="product?keyword=Womenoversized">
                  <p className="font-semibold text-sm">Oversized</p>
                  <p className="text-white/50 text-xs">Best Oversized t-shirts</p>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Kids & Toys */}
      <div
        onMouseEnter={() => setOpen2(true)}
        onMouseLeave={() => setOpen2(false)}
        className="relative"
      >
        <button className="text-sm font-semibold text-white/50 hover:text-white transition">
          Kids & Toys
        </button>

        {open2 && (
          <div className="absolute top-full left-0 mt-1 w-36 md:w-40 lg:w-48 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-black text-sm z-50">
            <div className="divide-y divide-white/20">
              <div className="p-2">
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="product?keyword=kidsClothing">
                  <p className="font-semibold text-sm">Kids Clothing</p>
                  <p className="text-white/50 text-xs">Measure actions your users take</p>
                </a>
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="product?keyword=kidsToys">
                  <p className="font-semibold text-sm">Kids Toys</p>
                  <p className="text-white/50 text-xs">Kids Accessories</p>
                </a>
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="product?keyword=babyCare">
                  <p className="font-semibold text-sm">Baby Care</p>
                  <p className="text-white/50 text-xs">Track your growth</p>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Home & Kitchen */}
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="relative"
      >
        <button className="text-sm hidden md:block lg:block font-semibold text-white/50 hover:text-white transition">
          Home & Kitchen
        </button>

        {open && (
          <div className="absolute top-full left-0 mt-1 w-36 md:w-40 lg:w-48 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-white text-sm z-50">
            <div className="divide-y divide-white/20">
              <div className="p-2">
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="product?keyword=kitchen">
                  <p className="font-semibold text-sm">Kitchen</p>
                  <p className='text-white/50 text-xs'>Best Appliances at great deal</p>
                </a>
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="product?keyword=Furniture">
                  <p className="font-semibold text-sm">Furniture</p>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Men's Fashion */}
      <div
        onMouseEnter={() => setOpen5(true)}
        onMouseLeave={() => setOpen5(false)}
        className="relative"
      >
        <button className="text-sm hidden md:block lg:block font-semibold text-white/50 hover:text-white transition">
          Men's Fashion
        </button>

        {open5 && (
          <div className="absolute top-full left-0 mt-1 w-36 md:w-40 lg:w-48 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-white text-sm z-50">
            <div className="divide-y divide-white/20">
              <div className="p-2">
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="/product?keyword=menFormal">
                  <p className="font-semibold text-sm">Formals</p>
                  <p className="text-white/50 text-xs">Measure actions your users take</p>
                </a>
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="/product?keyword=menSherwani">
                  <p className="font-semibold text-sm">Sherwani</p>
                  <p className="text-white/50 text-xs">Create targeted content</p>
                </a>
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="/product?keyword=menKurta">
                  <p className="font-semibold text-sm">Kurta</p>
                  <p className="text-white/50 text-xs">Track your growth</p>
                </a>
              </div>
              <div className="p-2">
                <a className="block rounded px-2 py-1 hover:bg-white/20" href="/product?keyword=menWesternWear">
                  <p className="font-semibold text-sm">Western Wear</p>
                  <p className="text-white/50 text-xs">Integrate products</p>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default Catogory;
