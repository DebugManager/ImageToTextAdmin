import React, { useState, useEffect, useCallback } from "react";
import { Column } from "react-table";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

import { TableComponent, TableHeader } from "../../components";

import { getAllOrdersWithSort, searchOrders } from "../../services/orders.service";

import styles from "./Orders.module.css";

import editIcon from "../../assets/users-page/edit.svg";
import deleteIcon from "../../assets/users-page/delete.svg";
import searchIcon from "../../assets/users-page/search.svg";
import arrowDownIcon from "../../assets/users-page/errowDown.svg";
import left from "../../assets/users-page/left.svg";
import right from "../../assets/users-page/right.svg";
import clearIcon from "../../assets/users-page/x-circle.svg";

type Orders = {
  id: string;
  name: string;
  email: string;
  package: string;
  affiliate_code: string;
  address_line1: string;
  price: number;
  status: string;
  country: string;
  date: string;
};

type Row = {
  Type: string;
  LastLogin: string;
  Name: string;
  Joined: string;
  LastActive: string;
  Company: string;
  id: number;
};

type ColumnWithCustomHeader = Column<Row> & {
  customHeader: React.ReactNode;
};

const Orders = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [resultsFound, setResultsFound] = useState(true);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [activeSortQuery, setActiveSortQuery] = useState<{
    key: string;
    sortDirection?: string;
  }>({
    key: "first_name",
    sortDirection: "ascending",
  });
  const [sortOptions, setSortOptions] = useState<
    {
      key: string;
      direction: string;
    }[]
  >([
    { key: "first_name", direction: "ascending" },
    { key: "id", direction: "ascending" },
    { key: "email", direction: "ascending" },
    { key: "package", direction: "ascending" },
    { key: "affiliate_code", direction: "ascending" },
    { key: "address_line1", direction: "ascending" },
    { key: "price", direction: "ascending" },
    { key: "status", direction: "ascending" },
    { key: "country", direction: "ascending" },
    { key: "date", direction: "ascending" },
  ]);

  const fetchData = useCallback(
    async ({ key, sortDirection }: { key: string; sortDirection?: string }) => {
      setIsLoading(true);
      try {
        const sortParam = sortDirection === "descending" ? `-${key}` : key;
        const data = await getAllOrdersWithSort(sortParam);
        setOrders(data.data);
        setIsLoading(false);
        setResultsFound(true);
      } catch (error) {
        console.error(error, "error");
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchData(activeSortQuery);
  }, [fetchData, activeSortQuery]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const searchedArray = await searchOrders(searchValue);
    if (searchedArray.length) {
      setIsLoading(false);
      setOrders(searchedArray);
      setResultsFound(true);
    } else {
      setIsLoading(false);
      setResultsFound(false);
    }
  };

  const handleClearSearch = async () => {
    setSearchValue("");
    fetchData(activeSortQuery);
  };

  const handleDelete = async (id: number | string) => {
    console.log(id);
    // const data = await deleteUserById(id);
    // if (data?.status === 204) {
    //   fetchData(activeSortQuery);
    // } else {
    // }
  };

  const sortData = (key: string) => {
    const updatedSortOptions = sortOptions.map((option) => {
      if (option.key === key) {
        const direction =
          option.direction === "ascending" ? "descending" : "ascending";
        return { ...option, direction };
      } else {
        return { ...option, direction: "ascending" };
      }
    });

    setSortOptions(updatedSortOptions);

    const sortDirection = updatedSortOptions.find(
      (option) => option.key === key
    )?.direction;
    setActiveSortQuery({ key, sortDirection });
  };

  const ordersPerPage = 5;

  const columns = [
    {
      Header: (
        <div
          className={styles.headerTableStyles}
          onClick={() => sortData("id")}
        >
          <p>Order ID</p>
          {sortOptions.find((option) => option.key === "id")?.direction ===
          "ascending" ? (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgNoRotate}
            />
          ) : (
            <img src={arrowDownIcon} alt="sort" className={styles.imgRotate} />
          )}
        </div>
      ),
      width: 75,
      accessor: "id",
      Cell: ({ value, row }: { value: string; row: any }) => (
        <Link className={styles.linkId} to={`/order-details/${row.original.id}`}>{value.slice(0, 7)}...</Link>
      ),
    },
    {
      Header: (
        <div
          className={styles.headerTableStyles}
          onClick={() => sortData("first_name")}
        >
          <p>Name</p>
          {sortOptions.find((option) => option.key === "first_name")
            ?.direction === "ascending" ? (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgNoRotate}
            />
          ) : (
            <img src={arrowDownIcon} alt="sort" className={styles.imgRotate} />
          )}
        </div>
      ),
      accessor: "full_name",
      width: 80,
      Cell: ({ row }: { row: any }) => (
        <div>{`${row.original.first_name} ${row.original.last_name}`}</div>
      ),
    },
    {
      Header: (
        <div
          className={styles.headerTableStyles}
          onClick={() => sortData("email")}
        >
          <p>Email</p>
          {sortOptions.find((option) => option.key === "email")?.direction ===
          "ascending" ? (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgNoRotate}
            />
          ) : (
            <img src={arrowDownIcon} alt="sort" className={styles.imgRotate} />
          )}
        </div>
      ),
      accessor: "email",
      width: 120,
    },
    {
      Header: (
        <div
          className={styles.headerTableStyles}
          onClick={() => sortData("package")}
        >
          <p>Package</p>
          {sortOptions.find((option) => option.key === "package")?.direction ===
          "ascending" ? (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgNoRotate}
            />
          ) : (
            <img src={arrowDownIcon} alt="sort" className={styles.imgRotate} />
          )}
        </div>
      ),
      accessor: "package",
      width: 70,
    },
    {
      Header: (
        <div
          className={styles.headerTableStyles}
          onClick={() => sortData("affiliate_code")}
        >
          <p>affiliate_code</p>
          {sortOptions.find((option) => option.key === "affiliate_code")
            ?.direction === "ascending" ? (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgNoRotate}
            />
          ) : (
            <img src={arrowDownIcon} alt="sort" className={styles.imgRotate} />
          )}
        </div>
      ),
      accessor: "affiliate_code",
      width: 90,
      Cell: ({ row }: { row: any }) => (
        <div>{`${
          row.original.affiliate_code ? row.original.affiliate_code : "-"
        } `}</div>
      ),
    },
    {
      Header: (
        <div
          className={styles.headerTableStyles}
          onClick={() => sortData("address_line1")}
        >
          <p>Address</p>
          {sortOptions.find((option) => option.key === "address_line1")
            ?.direction === "ascending" ? (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgNoRotate}
            />
          ) : (
            <img src={arrowDownIcon} alt="sort" className={styles.imgRotate} />
          )}
        </div>
      ),
      accessor: "address_line1",
      width: 90,
      Cell: ({ row }: { row: any }) => (
        <div>{`${
          row.original.address_line1 ? row.original.affiliate_code : "-"
        } `}</div>
      ),
    },
    {
      Header: (
        <div
          className={styles.headerTableStyles}
          onClick={() => sortData("price")}
        >
          <p>Price</p>
          {sortOptions.find((option) => option.key === "price")?.direction ===
          "ascending" ? (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgNoRotate}
            />
          ) : (
            <img src={arrowDownIcon} alt="sort" className={styles.imgRotate} />
          )}
        </div>
      ),
      accessor: "price",
      width: 50,
      Cell: ({ row }: { row: any }) => <p>${`${row.original.price}`}</p>,
    },
    {
      Header: (
        <div
          className={styles.headerTableStyles}
          onClick={() => sortData("status")}
        >
          <p>Status</p>
          {sortOptions.find((option) => option.key === "status")?.direction ===
          "ascending" ? (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgNoRotate}
            />
          ) : (
            <img src={arrowDownIcon} alt="sort" className={styles.imgRotate} />
          )}
        </div>
      ),
      accessor: "status",
      width: 60,
      Cell: ({ row }: { row: any }) => (
        <div className={`${row.original.status && styles.successChips}`}>
          <p>{`${row.original.status}`}</p>
        </div>
      ),
    },
    {
      Header: (
        <div
          className={styles.headerTableStyles}
          onClick={() => sortData("contry")}
        >
          <p>Country</p>
          {sortOptions.find((option) => option.key === "contry")?.direction ===
          "ascending" ? (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgNoRotate}
            />
          ) : (
            <img src={arrowDownIcon} alt="sort" className={styles.imgRotate} />
          )}
        </div>
      ),
      accessor: "contry",
      width: 75,
    },
    {
        Header: (
          <div
            className={styles.headerTableStyles}
            onClick={() => sortData("date")}
          >
            <p>Date /Time</p>
            {sortOptions.find((option) => option.key === "date")?.direction ===
            "ascending" ? (
              <img
                src={arrowDownIcon}
                alt="sort"
                className={styles.imgNoRotate}
              />
            ) : (
              <img src={arrowDownIcon} alt="sort" className={styles.imgRotate} />
            )}
          </div>
        ),
        accessor: "date",
        width: 90,
        Cell: ({ value }: { value: string }) => (
          <div>{format(new Date(value), "yyyy-MM-dd")}</div>
        ),
      },
    {
      Header: (
        <div className={styles.headerTableStyles}>
          <p>Action</p>
        </div>
      ),
      accessor: "orderId",
      width: 80,
      Cell: ({ row }: { row: any }) => (
        <div className={styles.btnWrapper}>
          <Link
            to={`/users/${row.original.id}`}
            className={styles.imageWrapper}
          >
            <img alt="edit" src={editIcon} />
          </Link>

          <div
            className={styles.imageWrapper}
            onClick={() => handleDelete(row.original.id)}
          >
            <img alt="delete" src={deleteIcon} />
          </div>
        </div>
      ),
    },
  ];

  const columnsHeader: ColumnWithCustomHeader[] = [
    {
      Header: "LeftHeader",
      width: 332,
      customHeader: (
        <div className={styles.filterWrapper}>
          <p className={styles.filterTitle}>ORDERS</p>
        </div>
      ),
    },
    {
      Header: "RightHeader",
      width: 600,
      customHeader: (
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            placeholder="Search"
            className={styles.inputSearch}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              padding: "2px 8px",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              borderRadius: "4px",
              background: "var(--main-main, #556EE6)",
            }}
          >
            <img
              src={searchIcon}
              alt="Search Icon"
              className={styles.searchIcon}
            />
            {searchValue.length ? (
              <img
                src={clearIcon}
                alt="clear"
                className={styles.clearIcon}
                onClick={handleClearSearch}
              />
            ) : (
              ""
            )}
            <button className={styles.btnSearch} onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      ),
    },
  ];

  const indexOfLastOrder = (currentPage + 1) * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders?.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableWrapper}>
        <TableHeader columns={columnsHeader} />
        <TableComponent
          resultsFound={resultsFound}
          columns={columns}
          data={currentOrders}
          isLoading={isLoading}
        />
      </div>

      <ReactPaginate
        pageCount={Math.ceil(orders?.length / ordersPerPage)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        initialPage={currentPage}
        containerClassName={styles.pagination}
        activeClassName={styles.activePage}
        previousLabel={
          <button className={styles.pagination__prev}>
            <img alt="prev" src={left} />
            Prev
          </button>
        }
        nextLabel={
          <button className={styles.pagination__prev}>
            Next
            <img alt="next" src={right} />
          </button>
        }
      />
    </div>
  );
};

export default Orders;
