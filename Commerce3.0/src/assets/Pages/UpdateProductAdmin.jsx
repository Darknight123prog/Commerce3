import Product from "@/Componets/Product";
import Pagination from "@/Componets/Pagination";
import { useAuth } from "@/Context/AuthContext";
import { showError } from "@/Utils/Toast";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

function UpdateProductAdmin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // 🔐 ADMIN PROTECTION
  useEffect(() => {
    if (!user) return;

    if (user.role !== "admin") {
      showError("Unauthorized Access");
      navigate("/");
    }
  }, [user, navigate]);

  // 📦 FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const query = new URLSearchParams(search).get("keyword");

        const res = await axios.get(
          "http://localhost:8568/api/v1/admin/allproducts",
          {
            params: {
              keyword: query || undefined,
              page,
            },
            withCredentials: true,
          }
        );

        setProducts(res.data.details);
        setTotalPage(res.data.total_page);
      } catch (err) {
        showError("Unable to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, page]);

  // ⏳ LOADER
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <HashLoader color="#77e56e" />
      </div>
    );
  }

  // 🚫 UNAUTHORIZED VIEW
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Unauthorized Access 
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Admin Product Management
      </h1>

      {/* PRODUCT GRID */}
      <div
        className="
          grid w-full
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-4
        "
      >
        {products.map((prod) => (
          <Product
            key={prod._id}
            product={prod}
            isUpdate={true}
          />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default UpdateProductAdmin;
