import React from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;

  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
  }
`;

function CartItem({
  product,
  handleAddToCart,
  handleRemoveFromCart,
  handleDeleteFromCart,
  checkout,
}) {
  return (
    <div>
      <Wrapper key={product.id} className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={product.image}
            alt={product.image}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="font-bold">{product.name}</h3>
            <div>
              <p className="ml-4">Precio: <span className="font-bold">${product.price}</span></p>
              <p className="ml-4">
                Total: <span className="font-bold">${(product.price * product.amount).toFixed(2)}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <div className="buttons w-32 flex items-center space-between">
              {checkout ? (
                <p>Cantidad: </p>
              ) : (
                <button
                  className={
                    checkout
                      ? "hidden"
                      : "bg-blue-500 hover:bg-blue-700 text-white font-extrabold py-2 px-4 rounded"
                  }
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  -
                </button>
              )}
              <p className="py-2 px-4 font-bold text-lg border-inherit border-solid border-2 border-slate-300 rounded">
                {product.amount}
              </p>
              {product.stock > product.amount ? (
                <button
                  className={
                    checkout
                      ? "hidden"
                      : "bg-blue-500 hover:bg-blue-700 text-white font-extrabold py-2 px-4 rounded"
                  }
                  onClick={() => handleAddToCart(product)}
                >
                  +
                </button>
              ) : (
                <p className={checkout ? "hidden" : "text-red-600"}>Max.</p>
              )}
            </div>
            <div className="flex">
              <button
                onClick={() => handleDeleteFromCart(product.id)}
                type="button"
                className={
                  checkout
                    ? "hidden"
                    : "px-2 py-1 font-medium text-lg text-red-600 border-solid border-2 border-red-600 rounded-md ease-in-out duration-300 hover:text-isabelline hover:bg-red-600"
                }
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

export default CartItem;
