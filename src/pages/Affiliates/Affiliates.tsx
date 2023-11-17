import React, { useState, useEffect, useCallback } from "react";
import { Column } from "react-table";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

import { TableComponent, TableHeader } from "../../components";

import {
  getAllAffiliatesWithSort,
  searchAffiliates,
} from "../../services/affiliates.service";

import styles from "./Affiliates.module.css";

import editIcon from "../../assets/users-page/edit.svg";
import deleteIcon from "../../assets/users-page/delete.svg";
import searchIcon from "../../assets/users-page/search.svg";
import arrowDownIcon from "../../assets/users-page/errowDown.svg";
import left from "../../assets/users-page/left.svg";
import right from "../../assets/users-page/right.svg";
import clearIcon from "../../assets/users-page/x-circle.svg";
import { AffiliatesStatusEnums } from "../../enums/AffiliatesEnums";

type IAffiliates = {
  first_name: string;
  last_name: string;
  email: string;
  users_signed_up: string | number;
  sales: string | number;
  commission: string | number;
  status: boolean;
  country: string;
  created: string;
  id: string | number;
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

const Affiliates = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [resultsFound, setResultsFound] = useState(true);
  const [affiliates, setAffiliates] = useState<IAffiliates[]>([]);
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
    { key: "users_signed_up", direction: "ascending" },
    { key: "sales", direction: "ascending" },
    { key: "commission", direction: "ascending" },
    { key: "status", direction: "ascending" },
    { key: "country", direction: "ascending" },
    { key: "created", direction: "ascending" },
  ]);

  const fetchData = useCallback(
    async ({ key, sortDirection }: { key: string; sortDirection?: string }) => {
      setIsLoading(true);
      try {
        const sortParam = sortDirection === "descending" ? `-${key}` : key;
        const data = await getAllAffiliatesWithSort(sortParam);
        setAffiliates(data.affiliates);
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
    const searchedArray = await searchAffiliates(searchValue);
    if (searchedArray.length) {
      setIsLoading(false);
      setAffiliates(searchedArray);
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
      width: 75,
      Cell: ({ row }: { row: any }) => (
        <Link
          style={{ textDecoration: "none" }}
          to={`/affiliates/${row.original.id}`}
        >{`${row.original.first_name} ${row.original.last_name}`}</Link>
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
          onClick={() => sortData("users_signed_up")}
        >
          <p>Users Signed Up</p>
          {sortOptions.find((option) => option.key === "users_signed_up")
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
      accessor: "users_signed_up",
      width: 100,
    },
    {
      Header: (
        <div
          className={styles.headerTableStyles}
          onClick={() => sortData("sales")}
        >
          <p>$ Sales</p>
          {sortOptions.find((option) => option.key === "sales")?.direction ===
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
      accessor: "sales",
      width: 65,
    },
    {
      Header: (
        <div
          className={styles.headerTableStyles}
          onClick={() => sortData("commission")}
        >
          <p>Commission Earned</p>
          {sortOptions.find((option) => option.key === "commission")
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
      accessor: "commission",
      width: 120,
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
      width: 75,
      Cell: ({ row }: { row: any }) => (
        <div
          className={`
        ${
          row.original.status === AffiliatesStatusEnums.Pending
            ? styles.pendingChips
            : row.original.status === AffiliatesStatusEnums.Success
            ? styles.successChips
            : row.original.status === AffiliatesStatusEnums.Decline
            ? styles.declinedChips
            : ""
        }
      `}
        >
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
          onClick={() => sortData("created")}
        >
          <p>Date /Time</p>
          {sortOptions.find((option) => option.key === "created")?.direction ===
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
      accessor: "created",
      width: 75,
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
            to={`/affiliates/${row.original.id}`}
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
          <p className={styles.filterTitle}>AFFILIATES</p>
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
  const currentOrders = affiliates?.slice(indexOfFirstOrder, indexOfLastOrder);
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
        pageCount={Math.ceil(affiliates?.length / ordersPerPage)}
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

export default Affiliates;
