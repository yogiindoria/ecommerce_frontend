 import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrderAsync, selectUserOrders, selectUserInfo, selectUserOrdersStatus } from "../userSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { discountedPrice } from "../../../app/constants";
import { ColorRing } from "react-loader-spinner";

export default function UserOrders() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  console.log(userInfo);
  const orders = useSelector(selectUserOrders);
  console.log(orders);
  const status = useSelector(selectUserOrdersStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(userInfo.id));
  }, [dispatch, userInfo]);

  return (
    <div>
      {status === "loading" ? (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : null}
      {orders && orders.map((order) => (
        <div key={order.id}>
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 rounded-md sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold py-4 tracking-tight text-gray-900">
              Order # {order.id}
            </h1>
            <h4 className="text-xl font-bold py-4 tracking-tight text-red-900">
              Order Status : {order.status}
            </h4>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.product.id}>{item.product.title}</a>
                            </h3>
                            <p className="ml-4">${discountedPrice(item.product)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty : {item.quantity}
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p> ${order.totalAmount}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Items In Cart</p>
                <p>{order.totalItems} Items</p>
              </div>
              
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping Address :
              </p>
              <div className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200">
                <div className="flex min-w-0 px-3 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {order.selectedAddress.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectedAddress.street}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {order.selectedAddress.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    {order.selectedAddress.pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
