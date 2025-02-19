import React, { useEffect, useState, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import logo from "../../img/logo.png";
import Cart from "../cart/Cart";
import SearchBar from "../serchbar/SearchBar";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import userRojo from "../../img/userRojo.png";
import {
  filterProductsByCategories,
  filterProductsByDiscounts,
  getDiscounts,
  getCategories,
  filterByCat_Disc,
  resetProductsShop,
} from "../../redux/actions";
import MenuFilters from "./MenuFilters";

const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 0px;
  top: 0px;
`;

const Nav = ({
  open,
  setOpen,
  cartItems,
  setCartItems,
  shopEmail,
  getTotalItems,
  handleAddToCart,
  handleRemoveFromCart,
  handleDeleteFromCart,
}) => {
  const { shopId } = useParams();
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const discounts = useSelector((state) => state.discounts);
  const itemsPerShop = cartItems.filter((item) => item.shopId === shopId);
  const [category, setCategory] = useState();
  const [discount, setDiscount] = useState();

  const user_id = user?.sub.split("|")[1];
  //console.log(cartItems);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    shopId ? dispatch(getCategories(shopId)) : dispatch(getCategories());
    dispatch(getDiscounts(shopId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (category && discount) {
      //console.log(`Entro: ${category} y ${discount}`);
      dispatch(filterByCat_Disc(shopId, discount, category));
    } else if (category && !discount) {
      setDiscount(undefined);
      dispatch(filterProductsByCategories(shopId, category));
    } else if (!category && discount) {
      setCategory("");
      dispatch(filterProductsByDiscounts(shopId, discount));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, discount]);

  function handleFilterCategories(e) {
    if (e.target.value === "category" && !discount) {
      setCategory(undefined);
      console.log("entro en categorias");
      dispatch(resetProductsShop());
    } else if (e.target.value === "category" && discount) {
      setCategory(undefined);
      dispatch(filterProductsByDiscounts(shopId, discount));
    } else {
      setCategory(e.target.value);
    }
  }

  function handleFilterOffers(e) {
    if (e.target.value === "discount" && !category) {
      setDiscount(undefined);
      console.log("entro en descuentos");
      dispatch(resetProductsShop());
    } else if (e.target.value === "discount" && category) {
      setDiscount(undefined);
      dispatch(filterProductsByCategories(shopId, category));
    } else {
      setDiscount(e.target.value);
    }
  }

  return (
    <div className="font-poppins w-full h-24 bg-ochre flex justify-between">
      <div className="w-1/3 flex justify-between items-center p-1 ">
        <Link to="/home" className="ml-4 hidden sm:block">
          <img
            src={logo}
            className="w-10 sm:w-11 lg:w-16 lg:ml-28"
            alt="logos"
          />
        </Link>
        <MenuFilters
          handleFilterCategories={handleFilterCategories}
          categories={categories}
          handleFilterOffers={handleFilterOffers}
          discounts={discounts}
        />
        <div className="ml-4">
          <SearchBar />
        </div>
        <div className="hidden ml-8 w-full text-isabelline font-bold lg:flex justify-around items-center">
          <select
            onChange={(e) => handleFilterCategories(e)}
            name="categorys"
            className="p-2 h-10 focus:outline-none bg-ochre hover:bg-princetonOrange font-bold border-none text-center"
          >
            <option value="category">Categorías</option>
            {categories?.map((c, index) => {
              return (
                <option key={index} value={c.name}>
                  {c.name}
                </option>
              );
            })}
          </select>

          <select
            onChange={(e) => handleFilterOffers(e)}
            name="offers"
            className="hidden lg:block p-2 h-10 focus:outline-none bg-ochre hover:bg-princetonOrange font-bold border-none text-center"
          >
            <option value="discount">Ofertas de la tienda</option>
            {discounts?.map((d, index) => {
              return (
                <option key={index} value={d}>
                  {d}%
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div
        className={
          isAuthenticated
            ? "w-1/4 flex justify-center items-center mr-6"
            : "w-1/6 flex justify-beetwen items-center mr-16"
        }
      >
        <Menu as="div" className="mt-1 mr-4 relative">
          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 hidden md:inline-block icon icon-tabler icon-tabler-arrow-bar-right"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="#000000"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="20" y1="12" x2="10" y2="12" />
              <line x1="20" y1="12" x2="16" y2="16" />
              <line x1="20" y1="12" x2="16" y2="8" />
              <line x1="4" y1="4" x2="4" y2="20" />
            </svg>

            {isAuthenticated ? (
              <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <img
                  className="h-12 w-12 rounded-full"
                  src={user?.picture}
                  alt="img not found"
                />
              </Menu.Button>
            ) : (
              <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <img
                  className="h-12 w-12 rounded-full"
                  src={userRojo}
                  alt="img not found"
                />
              </Menu.Button>
            )}
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {isAuthenticated ? (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href={`/settings/${user_id}`}
                        className={classNames(
                          active ? "hover:bg-gray-700" : "",
                          "block px-4 py-2 text-sm text-white"
                        )}
                      >
                        Panel de usuario
                      </a>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          logout({ returnTo: window.location.origin })
                        }
                        className={classNames(
                          active ? "hover:bg-gray-700" : "",
                          "block px-4 py-2 text-sm text-white"
                        )}
                      >
                        Cerrar sesion
                      </button>
                    )}
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => loginWithRedirect()}
                      className={classNames(
                        active ? "hover:bg-gray-700" : "",
                        "block px-4 py-2 text-sm text-white"
                      )}
                    >
                      Iniciar sesion / registrarse
                    </button>
                  )}
                </Menu.Item>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
        <div className={open ? "opacity-0" : "bg-emerald-400 rounded-full"}>
          <StyledButton onClick={() => setOpen(true)}>
            <Badge badgeContent={getTotalItems(itemsPerShop)} color="error">
              <AddShoppingCartIcon />
            </Badge>
          </StyledButton>
        </div>
      </div>
      <Cart
        className="mr-10"
        open={open}
        setOpen={setOpen}
        itemsPerShop={itemsPerShop}
        cartItems={cartItems}
        setCartItems={setCartItems}
        shopEmail={shopEmail}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleDeleteFromCart={handleDeleteFromCart}
      />
    </div>
  );
};

export default Nav;
