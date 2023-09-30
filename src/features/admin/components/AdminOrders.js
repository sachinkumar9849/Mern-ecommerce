import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { Pagination } from "../../common/Pagination";

import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleShow = () => {
    console.log("show");
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return (
    <>
      <div className="w-full mx-auto py-4">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
            {/* Table Header */}
            <thead className="bg-gray-100">
              <tr>
                <th
                  onClick={(e) =>
                    handleSort({
                      sort: "id",
                      order: sort?._order === "asc" ? "desc" : "asc",
                    })
                  }
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  Order#{" "}
                  {sort._sort === "id" &&
                    (sort._order === "asc" ? (
                      <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                    ))}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Items
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Shipping Address
                </th>

                <th
                  className="py-3 px-6 text-left cursor-pointer"
                  onClick={(e) =>
                    handleSort({
                      sort: "totalAmount",
                      order: sort?._order === "asc" ? "desc" : "asc",
                    })
                  }
                >
                  Total Amount{" "}
                  {sort._sort === "totalAmount" &&
                    (sort._order === "asc" ? (
                      <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                    ))}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => {
                return (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.items.map((item) => (
                        <div className="admin_pr">
                          <img
                            class="w-10 h-10 object-cover rounded-full"
                            src={item.thumbnail}
                            alt=""
                          />

                          <p>
                            {item.title}
                            <strong className="px-3">#{item.quantity}</strong> $
                            {discountedPrice(item)}
                          </p>
                        </div>
                      ))}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="div">
                        <b> {order.selectedAddress.name}</b>
                        <p> {order.selectedAddress.email}</p>
                        <p> {order.selectedAddress.phone}</p>
                        <p> {order.selectedAddress.street}</p>
                        <p> {order.selectedAddress.city}</p>
                        <p> {order.selectedAddress.state}</p>
                        <p> {order.selectedAddress.pinCode}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {order.totalAmount}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => handleUpdate(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )}px-2 inline-flex text-xs leading-5 font-semibold rounded-full px-3 py-1`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => handleShow(order)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ml-2"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        onClick={(e) => handleEdit(order)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>

                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-2">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders} // Pass totalOrders as totalItems
      />
    </>
  );
};

export default AdminOrders;
