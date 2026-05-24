"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Radio,
  RadioGroup,
} from "@headlessui/react";

import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Rating,
} from "@mui/material";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ProductReviewCard from "./ProductReviewCard";
import HomeSectionCard from "../homeSectionCard/HomeSectionCard";

import { mens } from "../homeSectionCarousel/homeCarouselData";

import { findProductById } from "../../State/Product/Action";
import { addCartItem } from "../../State/Cart/Action";

const PRODUCT_IMAGES = [
  {
    src: "https://i.ibb.co/hQxsX04/cart1.jpg",
    alt: "Product image",
  },
  {
    src: "https://i.ibb.co/hQxsX04/cart1.jpg",
    alt: "Product image",
  },
  {
    src: "https://i.ibb.co/hQxsX04/cart1.jpg",
    alt: "Product image",
  },
  {
    src: "https://i.ibb.co/hQxsX04/cart1.jpg",
    alt: "Product image",
  },
];

const PRODUCT_SIZES = [
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: true },
];

const PRODUCT_HIGHLIGHTS = [
  "Hand cut and sewn locally",
  "Dyed with proprietary colors",
  "Pre-washed & pre-shrunk",
  "Ultra-soft 100% cotton",
];

const PRODUCT_DETAILS =
  "Premium quality fabric with modern fit and long-lasting comfort.";

const ADD_TO_CART_STYLE = {
  mt: 2,
  width: "12rem",
  py: 1.2,
  bgcolor: "#4f46e5",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { productId } = useParams();

  // Optimized selector
  const product = useSelector(
    (state) => state.products.product
  );

  const [selectedSize, setSelectedSize] =
    useState(null);

  // Fetch product
  useEffect(() => {
    if (productId) {
      dispatch(findProductById(productId));
    }
  }, [dispatch, productId]);

  // Set default size after product load
  useEffect(() => {
    if (PRODUCT_SIZES.length) {
      setSelectedSize(PRODUCT_SIZES[0]);
    }
  }, []);

  // Memoized category name
  const categoryName = useMemo(() => {
    const name = product?.category?.name || "";

    return (
      name.charAt(0).toUpperCase() +
      name.slice(1)
    );
  }, [product]);

  // Memoized product values
  const {
    imageUrl,
    brand,
    title,
    discountedPrice,
    price,
    discountedPercent,
    description,
  } = product || {};

  // Optimized add to cart
  const handleAddToCart = useCallback(() => {
    if (!selectedSize) return;

    dispatch(
      addCartItem({
        productId,
        size: selectedSize.name,
      })
    );

    navigate("/cart");
  }, [
    dispatch,
    navigate,
    productId,
    selectedSize,
  ]);

  // Memoized review list
  const reviewItems = useMemo(
    () => [1, 2, 3],
    []
  );

  // Memoized similar products
  const similarProducts = useMemo(
    () =>
      mens?.map((item) => (
        <HomeSectionCard
          key={item.id}
          title={item.brand}
          description={item.description}
          imageUrl={item.imageUrl}
        />
      )),
    []
  );

  // Loading state
  if (!product) {
    return (
      <div className="p-10">
        <LinearProgress />
      </div>
    );
  }

  return (
    <div className="bg-white lg:px-6 px-4">
      <div className="pt-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-7xl items-center space-x-2 px-4">
            <li>
              <div className="flex items-center">
                <Link
                  to="/"
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  Home
                </Link>

                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li className="text-sm">
              <span className="font-medium text-gray-500">
                {categoryName}
              </span>
            </li>
          </ol>
        </nav>

        {/* Product Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          {/* Images */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden max-w-[25rem] rounded-lg">
              <img
                alt={title}
                src={imageUrl}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-5">
              {PRODUCT_IMAGES.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden"
                >
                  <img
                    alt={item.alt}
                    src={imageUrl}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="pb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              {brand}
            </h1>

            <h2 className="text-lg mt-2 opacity-60">
              {title}
            </h2>

            {/* Pricing */}
            <div className="flex items-center gap-4 mt-4">
              <p className="font-semibold text-2xl">
                ₹{discountedPrice}
              </p>

              <p className="line-through opacity-50">
                ₹{price}
              </p>

              <p className="text-green-500 font-semibold">
                {discountedPercent}% off
              </p>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-4 mt-5">
              <Rating
                value={4.5}
                precision={0.5}
                readOnly
              />

              <p className="text-sm text-gray-600">
                53,240 Ratings
              </p>

              <p className="text-sm text-indigo-600">
                3,440 Reviews
              </p>
            </div>

            {/* Sizes */}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">
                  Size
                </h3>

                <button
                  type="button"
                  className="text-sm font-medium text-indigo-600"
                >
                  Size Guide
                </button>
              </div>

              <fieldset className="mt-4">
                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="grid grid-cols-4 gap-4"
                >
                  {PRODUCT_SIZES.map((size) => (
                    <Radio
                      key={size.name}
                      value={size}
                      disabled={!size.inStock}
                      className={classNames(
                        size.inStock
                          ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                          : "cursor-not-allowed bg-gray-50 text-gray-200",
                        "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50"
                      )}
                    >
                      <span>{size.name}</span>
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>

            {/* Add To Cart */}
            <Button
              onClick={handleAddToCart}
              variant="contained"
              sx={ADD_TO_CART_STYLE}
            >
              Add To Cart
            </Button>

            {/* Description */}
            <div className="mt-10">
              <h3 className="font-semibold text-lg">
                Description
              </h3>

              <p className="mt-4 text-gray-700">
                {description}
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-10">
              <h3 className="font-semibold text-lg">
                Highlights
              </h3>

              <ul className="list-disc pl-5 mt-4 space-y-2">
                {PRODUCT_HIGHLIGHTS.map((item) => (
                  <li key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Details */}
            <div className="mt-10">
              <h3 className="font-semibold text-lg">
                Details
              </h3>

              <p className="mt-4 text-gray-700">
                {PRODUCT_DETAILS}
              </p>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-10">
          <h1 className="font-semibold text-xl mb-4">
            Recent Reviews & Ratings
          </h1>

          <div className="border p-4 rounded-lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <div className="space-y-5">
                  {reviewItems.map((item) => (
                    <ProductReviewCard key={item} />
                  ))}
                </div>
              </Grid>

              <Grid item xs={12} md={5}>
                <h2 className="font-semibold text-xl mb-4">
                  Product Ratings
                </h2>

                <div className="flex items-center gap-4 mb-6">
                  <Rating
                    value={4.5}
                    precision={0.5}
                    readOnly
                  />

                  <p className="opacity-60">
                    58,490 Ratings
                  </p>
                </div>

                <Box className="space-y-5">
                  {[
                    {
                      label: "Excellent",
                      value: 80,
                      color: "success",
                    },
                    {
                      label: "Very Good",
                      value: 60,
                      color: "success",
                    },
                    {
                      label: "Good",
                      value: 40,
                      color: "primary",
                    },
                    {
                      label: "Average",
                      value: 30,
                      color: "info",
                    },
                    {
                      label: "Poor",
                      value: 20,
                      color: "warning",
                    },
                  ].map((item) => (
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      key={item.label}
                    >
                      <Grid item xs={3}>
                        <p>{item.label}</p>
                      </Grid>

                      <Grid item xs={9}>
                        <LinearProgress
                          color={item.color}
                          variant="determinate"
                          value={item.value}
                          sx={{
                            background: "#edf6f7",
                            borderRadius: 4,
                            height: 7,
                          }}
                        />
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* Similar Products */}
        <section className="pt-10 mb-10">
          <h1 className="font-semibold text-xl mb-5">
            Similar Products
          </h1>

          <div className="flex flex-wrap gap-5">
            {similarProducts}
          </div>
        </section>
      </div>
    </div>
  );
}