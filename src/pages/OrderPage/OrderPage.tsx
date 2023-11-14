import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { format } from "date-fns";

import { getOrderById } from "../../services/orders.service";

import styles from "./OrderPage.module.css";

interface IOrder {
  id: string;
  created: string;
  status: string;
  package: string;
  price: string;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  address: string;
}

const OrderPage = () => {
  const { id } = useParams();

  const [order, setOrder] = useState<null | IOrder>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (id: string | number) => {
    setIsLoading(true);
    try {
      const data = await getOrderById(id);
      setOrder(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error, "error");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <CircleLoader loading={isLoading} color={"#556EE6"} size={10} />
      ) : (
        <div className={styles.orderWraper}>
          <p className={styles.orderId}>
            Order ID: <span className={styles.order_id}>{order?.id}</span>
          </p>
          <div className={styles.dateWrapper}>
            <p className={styles.orderDate}>
              {" "}
              Order Date:{" "}
              {order?.created
                ? format(new Date(order.created), "yyyy-MM-dd")
                : "N/A"}
            </p>
            <p className={styles.orderStatus}>
              Status:{" "}
              <span
                className={
                  order?.status == "succeeded"
                    ? `${styles.succesfull}`
                    : styles.any
                }
              >
                {order?.status}
              </span>
            </p>
          </div>

          <div className={styles.orderName}>
            <div className={styles.infoWrapper}>
              <p className={styles.infoTitle}>Name Package</p>
              <p className={styles.infoText}>{order?.package}</p>
            </div>

            <div className={styles.infoWrapper}>
              <p className={styles.infoTitle}>Price</p>
              <p className={styles.infoText}>
                {" "}
                {order?.price
                  ? `$${(parseInt(order.price) / 100).toFixed(2)}`
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className={styles.totalWrapper}>
            <p className={styles.amountTitle}>Total Amount</p>
            <p className={styles.price}>${order?.price}</p>
          </div>

          <div className={styles.personalInfoWrapper}>
            <p className={styles.title}>Personal Information</p>
            <div className={styles.rowWrapper}>
              <div className={styles.columnWrapper}>
                <div className={styles.nameWrapper}>
                  <p className={styles.blockTitle}>Name</p>
                  <p className={styles.descriptionWrapper}>
                    {order?.first_name} {order?.last_name}
                  </p>
                </div>

                <div className={styles.nameWrapper}>
                  <p className={styles.blockTitle}>Country</p>
                  <p className={styles.descriptionWrapper}>{order?.country}</p>
                </div>
              </div>
              <div className={styles.columnWrapper}>
                <div className={styles.nameWrapper}>
                  <p className={styles.blockTitle}>Email</p>
                  <p className={styles.descriptionWrapper}>{order?.email}</p>
                </div>
                <div className={styles.nameWrapper}>
                  <p className={styles.blockTitle}>Address</p>
                  <p className={styles.descriptionWrapper}>{order?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
