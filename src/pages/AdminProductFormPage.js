import React from "react";
// import {ProductForm} from '../features'
import ProductForm from "../features/admin/components/ProductForm";
import NavBar from "../features/navbar/Navbar";

const AdminProductFormPage = () => {
  return (
    <div>
      <NavBar>
        <ProductForm></ProductForm>
      </NavBar>
    </div>
  );
};

export default AdminProductFormPage;
