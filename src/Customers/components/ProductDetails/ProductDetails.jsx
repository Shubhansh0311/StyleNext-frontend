'use client'

import { useEffect, useState } from 'react'

import { Radio, RadioGroup } from '@headlessui/react'
import { Box, Button, Grid, LinearProgress, Rating } from '@mui/material'
import ProductReviewCard from './ProductReviewCard'

import { mens } from '../homeSectionCarousel/homeCarouselData'
import HomeSectionCard from '../homeSectionCard/HomeSectionCard'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findProductById } from '../../State/Product/Action'
import { addCartItem } from '../../State/Cart/Action'

const PRODUCT_SIZES = [
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    const { products } = useSelector((state) => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const product_Id = params.productId

    const product = products.product || {}
    const sizes = Array.isArray(product?.size) && product.size.length > 0 ? product.size : PRODUCT_SIZES
    const [selectedSize, setSelectedSize] = useState(product?.size?.[2] || PRODUCT_SIZES[0])

    useEffect(() => {
        if (product_Id) {
            dispatch(findProductById(product_Id))
        }
    }, [dispatch, product_Id])

    useEffect(() => {
        if (Array.isArray(product?.size) && product.size.length > 0) {
            setSelectedSize(product.size[2] || product.size[0])
        }
    }, [product?.size])

    const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1)
    const categoryName = capitalize(product?.category?.name) || 'Product'
    const previewImages = Array.from({ length: 4 }, (_, index) => ({
        src: product?.imageUrl,
        alt: product?.title ? `${product.title} preview ${index + 1}` : `Product preview ${index + 1}`,
    }))

    const handleAddToCart = () => {
        const data = { productId: product_Id, size: selectedSize?.name }
        dispatch(addCartItem(data))
        navigate('/cart')
    }

    return (
        <div className="bg-white lg:px-6 px-4">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li className="text-sm">
                            <span aria-current="page" className="font-medium text-gray-900">
                                {categoryName}
                            </span>
                        </li>
                    </ol>
                </nav>

                <section className="grid grid-cols-1 lg:grid-cols-2 px-3 sm:px-2 gap-x-8 gap-y-4 mt-2">
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden max-w-[25rem] rounded-lg max-h-[30rem]">
                            <img
                                alt={product?.title || 'Product image'}
                                src={product?.imageUrl}
                                className="overflow-hidden h-full w-full size-full rounded-lg object-cover lg:block"
                            />
                        </div>
                        <div className="flex flex-wrap space-x-5 justify-center mt-5">
                            {previewImages.map((item, index) => (
                                <div key={index} className="rounded-lg overflow-hidden">
                                    <img
                                        alt={item.alt}
                                        src={item.src}
                                        className="aspect-[4/5] size-full rounded-xl object-cover my-2 sm:rounded-lg lg:aspect-auto w-[5rem] gap-x-5 h-[5rem] sm:max-w-[10rem] sm:max-h-[10rem] mx-auto"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1 max-auto max-w-2xl pb-16 sm:px-6 lg:px-8 lg:max-w-7lx lg:pb-10">
                        <div className="lg:col-span-2">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {product?.brand}
                            </h1>
                            <h1 className="lg:text-lg my-2 font-semibold opacity-50 text-gray-500">
                                {product?.title}
                            </h1>
                        </div>

                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <div className="flex items-center space-x-4">
                                <p className="font-semibold text-xl text-gray-900">₹{product?.discountedPrice}</p>
                                <p className="font-semibold opacity-50 line-through">₹{product?.price}</p>
                                <p className="font-semibold text-green-400">{product?.discountedPercent}% off</p>
                            </div>

                            <div className="mt-5">
                                <div className="flex items-center space-x-4">
                                    <Rating name="read-only" value={4.5} precision={0.5} readOnly />
                                    <p className="text-sm font-semibold text-gray-600">53240 ratings</p>
                                    <p className="text-sm font-medium text-indigo-600 hover:text-indigo-400">3440 reviews</p>
                                </div>
                            </div>

                            <form className="mt-10">
                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            Size guide
                                        </a>
                                    </div>

                                    <fieldset aria-label="Choose a size" className="mt-4">
                                        <RadioGroup
                                            value={selectedSize}
                                            required
                                            onChange={setSelectedSize}
                                            className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                                        >
                                            {sizes.map((size) => (
                                                <Radio
                                                    key={size.name}
                                                    value={size}
                                                    disabled={!size.inStock}
                                                    className={classNames(
                                                        size.inStock
                                                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                        'group relative flex items-center justify-center rounded-md border lg:px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6',
                                                    )}
                                                >
                                                    <span>{size.name}</span>
                                                    {size.inStock ? (
                                                        <span
                                                            aria-hidden="true"
                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                                        />
                                                    ) : (
                                                        <span
                                                            aria-hidden="true"
                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                        >
                                                            <svg
                                                                stroke="currentColor"
                                                                viewBox="0 0 100 100"
                                                                preserveAspectRatio="none"
                                                                className="absolute inset-0 size-full stroke-2 text-gray-200"
                                                            >
                                                                <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                            </svg>
                                                        </span>
                                                    )}
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                    </fieldset>
                                </div>

                                <Button
                                    type="button"
                                    onClick={handleAddToCart}
                                    variant="contained"
                                    className="mt-10 hover:bg-indigo-500"
                                    sx={{ marginTop: '10px', width: '10rem', padding: '10px 0px', background: '#4f46e5' }}
                                >
                                    Add to Cart
                                </Button>
                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            <div>
                                <h3 className="sr-only">Description</h3>
                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{product?.description}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {product?.highlights?.map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{product?.details}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-x-4">
                    <h1 className="font-semibold text-gray-800 text-lg p-4 my-1">Recent Reviews and Rating</h1>
                    <div className="border p-4">
                        <Grid container spacing={7} md={1} lg={12} sm={1}>
                            <Grid item xs={12} md={7}>
                                <div className="space-y-5">
                                    {[1, 1, 1].map((item) => (
                                        <ProductReviewCard key={item} />
                                    ))}
                                </div>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <h1 className="font-semibold opacity-80 text-xl sm:mt-6 pb-2">Product Rating</h1>
                                <div className="flex items-center space-x-4">
                                    <Rating name="read-only" value={4.5} readOnly precision={0.5} />
                                    <p className="opacity-50">58490 ratings</p>
                                </div>
                                <Box className="mt-5 sm:mt-10 space-y-0">
                                    <Grid container spacing={2} gap={{ md: 2, sm: 0, lg: 4 }} justifyContent="center" alignItems="center">
                                        <Grid item xs={3} md={2}>
                                            <p>Excellent</p>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <LinearProgress color="success" sx={{ background: '#edf6f7', borderRadius: 4, height: 7 }} variant="determinate" value={80} />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} gap={{ md: 2, sm: 0, lg: 4 }} justifyContent="center" alignItems="center">
                                        <Grid item xs={3} md={2}>
                                            <p>VeryGood</p>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <LinearProgress color="success" sx={{ background: '#edf6f7', borderRadius: 4, height: 7 }} variant="determinate" value={60} />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} gap={{ md: 2, sm: 0, lg: 4 }} justifyContent="center" alignItems="center">
                                        <Grid item xs={3} md={2}>
                                            <p>Good</p>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <LinearProgress color="primary" sx={{ background: '#edf6f7', borderRadius: 4, height: 7 }} variant="determinate" value={40} />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} gap={{ md: 2, sm: 0, lg: 4 }} justifyContent="center" alignItems="center">
                                        <Grid item xs={3} md={2}>
                                            <p>Average</p>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <LinearProgress color="info" sx={{ background: '#edf6f7', borderRadius: 4, height: 7 }} variant="determinate" value={30} />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} gap={{ md: 2, sm: 0, lg: 4 }} justifyContent="center" alignItems="center">
                                        <Grid item xs={3} md={2}>
                                            <p>Poor</p>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <LinearProgress color="warning" className="font-semibold" sx={{ background: '#edf6f7', borderRadius: 4, height: 7 }} variant="determinate" value={20} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                </section>
                <section className="pt-10 px-3 sm:px-2 gap-x-8 gap-y-6 mt-2 mb-4">
                    <h1 className="font-semibold text-xl pb-3 ml-2">Similar Products</h1>
                    <div className="flex flex-wrap space-y-5 sm:justify-between">
                        {mens?.map((item) => (
                            <HomeSectionCard key={item.id} title={item.brand} description={item.description} imageUrl={item.imageUrl} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
