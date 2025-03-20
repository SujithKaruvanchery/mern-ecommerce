import React from "react";

function CartCards({ item, handleClose, handleUpdateCart }) {
  const stock = item?.productId?.stockQuantity;

  return (
    <div className="relative flex items-center justify-between">
      <i
        className="fa fa-times absolute top-2 right-2 text-sm cursor-pointer border border-gray-400 rounded-none p-2"
        onClick={() => handleClose(item.productId._id)}
      ></i>
      <div>
        <div>
          <img
            src={item?.productId?.image}
            className="w-90 h-90 object-cover"
          />
        </div>
        <div className="pt-1 pb-1">
          <h2 className="font-medium">{item?.productId?.title}</h2>
          <h3>{`Rs.${item?.productId?.price}`}</h3>
          <div className="flex items-center gap-2">
            <button
              className="border px-2 py-1"
              onClick={() =>
                handleUpdateCart(
                  item.productId._id,
                  Math.max(1, item.quantity - 1)
                )
              }
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="border px-2 py-1"
              onClick={() =>
                item.quantity < stock &&
                handleUpdateCart(item.productId._id, item.quantity + 1)
              }
              disabled={item.quantity >= stock}
            >
              +
            </button>
          </div>
          {item.quantity >= stock && (
            <p className="text-red-500 text-sm mt-1">Max stock reached</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartCards;
