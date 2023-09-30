import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from "../../product/productSlice";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const params = useParams();
  const brand = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const selectedProduct = useSelector(selectProductById);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("DiscountPercentage", selectedProduct.DiscountPercentage);

      setValue("stock", selectedProduct.stock);
      setValue("price", selectedProduct.price);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
  };

  return (
    <>
      <div className="container mx-auto mt-8 p-4">
        <form
          noValidate
          className="max-w-3xl grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md mx-auto"
          onSubmit={handleSubmit((data) => {
            console.log(data);
            const product = { ...data };
            product.images = [
              product.thumbnail,
              product.image1,
              product.image2,
              product.image3,
             
            ];

            delete product["image1"];
            delete product["image2"];
            delete product["image3"];

            product.price = +product.price;
            product.DiscountPercentage = +product.DiscountPercentage;

            product.stock = +product.stock;
            product.rating = 0;
            console.log(product);

            if (params.id) {
              product.id = params.id;
              product.rating = selectedProduct.rating || 0;
              dispatch(updateProductAsync(product));
              reset();
            } else {
              dispatch(createProductAsync(product));
              reset();
            }
          })}
        >
          {/* Left Column */}
          <div>
            {/* Title Field */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-600 font-semibold"
              >
                Product Name
              </label>
              <input
                type="text"
                id="title"
                {...register("title", {
                  required: "Product Name Is Required",
                })}
                className="form-input mt-1 block w-full rounded-md"
                placeholder="Product Title"
              />
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-600 font-semibold"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                {...register("description", {
                  required: "Description Is Required",
                })}
                className="form-input mt-1 block w-full rounded-md"
                placeholder="Product Description"
              />
            </div>

            {/* Price Field */}
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-600 font-semibold"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                {...register("price", {
                  required: "Price Is Required",
                  min: {
                    value: 0,
                    message: "Price must be greater than or equal to 0",
                  },
                  max: {
                    value: 1000,
                    message: "Price must be less than or equal to 1000",
                  }, // Update the maximum value as needed
                })}
                className="form-input mt-1 block w-full rounded-md"
                placeholder="Product Price"
              />
            </div>

            {/* Discount Percentage Field */}
            <div className="mb-4">
              <label
                htmlFor="DiscountPercentage"
                className="block text-gray-600 font-semibold"
              >
                Discount Percentage
              </label>
              <input
                type="number"
                id="DiscountPercentage"
                {...register("DiscountPercentage", {
                  required: "DiscountPercentage Is Required",
                })}
                className="form-input mt-1 block w-full rounded-md"
                placeholder="Discount Percentage"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="brand"
                className="block text-gray-600 font-semibold"
              >
                Brand
              </label>

              <div className="mt-2">
                <select
                  {...register("brand", {
                    required: "brand Is Required",
                  })}
                >
                  {brand.map((brand) => (
                    <option value={brand.value}>{brand.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="categories"
                className="block text-gray-600 font-semibold"
              >
                Categories
              </label>

              <div className="mt-2">
                <select
                  {...register("Categories", {
                    required: "Categories Is Required",
                  })}
                >
                  {categories.map((categories) => (
                    <option value={categories.value}>{categories.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="stock"
                className="block text-gray-600 font-semibold"
              >
                Stock
              </label>
              <input
                type="number"
                id="stock"
                {...register("stock", {
                  required: "stock Is Required",
                })}
                className="form-input mt-1 block w-full rounded-md"
                placeholder="Stock"
              />
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Image Thumbnail Field */}
            <div className="mb-4">
              <label
                htmlFor="thumbnail"
                className="block text-gray-600 font-semibold"
              >
                Image Thumbnail
              </label>
              <input
                type="text"
                id="image"
                {...register("thumbnail", {
                  required: "thumbnail Is Required",
                })}
                className="form-input mt-1 block w-full rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image1"
                className="block text-gray-600 font-semibold"
              >
                Image 1
              </label>
              <input
                type="text"
                id="image1"
                {...register("image1", {
                  required: "image1 Is Required",
                })}
                className="form-input mt-1 block w-full rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image2"
                className="block text-gray-600 font-semibold"
              >
                Image 2
              </label>
              <input
                type="text"
                id="image2"
                {...register("image2", {
                  required: "image2 Is Required",
                })}
                className="form-input mt-1 block w-full rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image3"
                className="block text-gray-600 font-semibold"
              >
                Image 3
              </label>
              <input
                type="text"
                id="image3"
                {...register("image3", {
                  required: "image3 Is Required",
                })}
                className="form-input mt-1 block w-full rounded-md"
              />
            </div>
            
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
            >
              Save
            </button>
            {selectedProduct && (
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md w-full"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
