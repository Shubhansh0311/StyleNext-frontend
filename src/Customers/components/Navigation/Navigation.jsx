import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Avatar, Badge } from "@mui/material";

import { useNavigate, Link } from "react-router-dom";

import AuthModal from "../../Auth/AuthModal";
import { navigation } from "./NavigationData.js";

import { useDispatch, useSelector } from "react-redux";

import { getUser, logout } from "../../State/Auth/Action.js";
import { getCartItem } from "../../State/Cart/Action.js";

export default function Navigation() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { auth, cart } = useSelector((store) => store);

  const jwt = localStorage.getItem("jwt");

  const [openAuthModal, setOpenAuthModal] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!jwt) return;

    dispatch(getUser(jwt)).then(() => {
      dispatch(getCartItem());
      setOpenAuthModal(false);
    });
  }, [jwt, dispatch]);

  const handleCategoryClick = (category, section, item) => {
    navigate(`/${category.id}/${section.id}/${item.name}`);
    setOpen(false);
  };

  const handleAuthOpen = () => {
    navigate("/login");
    setOpenAuthModal(true);
  };

  const handleAuthClose = () => {
    setOpenAuthModal(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleMyOrders = () => {
    navigate("/order");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog
        open={open}
        onClose={handleClose}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0" />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={handleClose}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>

                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Mobile Tabs */}
            <TabGroup className="lg:mt-2 mt-10">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>

              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pt-6 pb-8"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />

                          <Link
                            to={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />

                            {item.name}
                          </Link>

                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>

                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>

                        <ul
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <button
                                type="button"
                                className="-m-2 block p-2 text-gray-500"
                                onClick={() =>
                                  handleCategoryClick(
                                    category,
                                    section,
                                    item
                                  )
                                }
                              >
                                {item.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link
                    to={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative z-[999] bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over ₹1299
        </p>

        <nav aria-label="Top" className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={handleOpen}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />

                <span className="sr-only">Open menu</span>

                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>

                  <img
                    alt="Logo"
                    src="https://i.ibb.co/8gTxsr6n/logo.jpg"
                    className="h-8 rounded-lg w-auto"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 hover:text-gray-800 data-open:border-indigo-600 data-open:text-indigo-600">
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel className="absolute inset-x-0 top-full text-sm text-gray-500">
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 top-1/2 bg-white shadow-sm"
                        />

                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div
                                    key={item.name}
                                    className="group relative text-base sm:text-sm"
                                  >
                                    <img
                                      alt={item.imageAlt}
                                      src={item.imageSrc}
                                      className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                    />

                                    <Link
                                      to={item.href}
                                      className="mt-6 block font-medium text-gray-900"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 z-10"
                                      />
                                    </Link>

                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>

                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p
                                      id={`${section.name}-heading`}
                                      className="font-medium text-gray-900"
                                    >
                                      {section.name}
                                    </p>

                                    <ul
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li
                                          key={item.name}
                                          className="flex"
                                        >
                                          <button
                                            type="button"
                                            className="hover:text-gray-800"
                                            onClick={() =>
                                              handleCategoryClick(
                                                category,
                                                section,
                                                item
                                              )
                                            }
                                          >
                                            {item.name}
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </PopoverGroup>

              {/* Right Section */}
              <div className="ml-auto flex items-center">
                {auth.user?.firstName?.[0] ? (
                  <Popover className="relative">
                    <PopoverButton className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                      <Avatar
                        className="text-white"
                        sx={{ bgcolor: "#4f46e5", cursor: "pointer" }}
                      >
                        {auth.user?.firstName[0].toUpperCase()}
                      </Avatar>
                    </PopoverButton>

                    <PopoverPanel className="absolute right-0 mt-2 w-48 bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={handleProfile}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </button>

                        <button
                          type="button"
                          onClick={handleMyOrders}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Orders
                        </button>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </PopoverPanel>
                  </Popover>
                ) : (
                  <Button
                    onClick={handleAuthOpen}
                    sx={{ bgcolor: "#4f46e5", cursor: "pointer" }}
                  >
                    Signin
                  </Button>
                )}

                {/* Search */}
                <div className="flex lg:ml-6">
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Search</span>

                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="size-6"
                    />
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button
                    type="button"
                    onClick={handleCart}
                    className="group -m-2 flex items-center p-2"
                  >
                    <Badge
                      badgeContent={cart.cart?.cartItems?.length || 0}
                      color="primary"
                    >
                      <ShoppingCartIcon color="action" />
                    </Badge>

                    <span className="sr-only">
                      items in cart, view bag
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal
        handleClose={handleAuthClose}
        openAuthModal={openAuthModal}
      />
    </div>
  );
}