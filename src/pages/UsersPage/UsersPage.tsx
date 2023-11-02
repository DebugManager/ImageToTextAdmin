import React, { useState, useEffect, useCallback } from "react";
import { Column } from "react-table";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

import {
  deleteUserById,
  getAllUsersWithSort,
  searchUsers,
} from "../../services/user.service";

import { TableComponent, TableHeader } from "../../components";

import styles from "./UsersPage.module.css";

import editIcon from "../../assets/users-page/edit.svg";
import deleteIcon from "../../assets/users-page/delete.svg";
import searchIcon from "../../assets/users-page/search.svg";
import arrowDownIcon from "../../assets/users-page/errowDown.svg";
import clearIcon from "../../assets/users-page/x-circle.svg";
import left from "../../assets/users-page/left.svg";
import right from "../../assets/users-page/right.svg";

type User = {
  address_line1: string;
  city: string;
  country: string;
  current_plan: null | number;
  email: string;
  first_name: string;
  id: number;
  joined: string;
  last_login: string;
  last_name: string;
  role: string;
  zip_code: number;
  company?: string;
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

const UsersPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [resultsFound, setResultsFound] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
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
    { key: "last_name", direction: "ascending" },
    { key: "email", direction: "ascending" },
    { key: "phone", direction: "ascending" },
    { key: "affiliate", direction: "ascending" },
    { key: "affiliate_code", direction: "ascending" },
    { key: "address_line1", direction: "ascending" },
    { key: "status", direction: "ascending" },
    { key: "country", direction: "ascending" },
    { key: "joined", direction: "ascending" },
    { key: "action", direction: "ascending" },
  ]);

  const usersPerPage = 5;

  const fetchData = useCallback(
    async ({ key, sortDirection }: { key: string; sortDirection?: string }) => {
      setIsLoading(true);
      try {
        const sortParam = sortDirection === "descending" ? `-${key}` : key;
        const data = await getAllUsersWithSort(sortParam);
        setUsers(data);
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

  const handleDelete = async (id: number | string) => {
    const data = await deleteUserById(id);
    if (data?.status === 204) {
      fetchData(activeSortQuery);
    } else {
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const searchedArray = await searchUsers(searchValue);
    if (searchedArray.length) {
      setIsLoading(false);
      setUsers(searchedArray);
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

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
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

  const columns = [
    {
      Header: (
        <div
          className={styles.headerTableStyles}
          onClick={() => sortData("first_name")}
        >
          <p>Name</p>
          {sortOptions.find((option) => option.key === "first_name")?.direction ===
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
      width: 90,
      accessor: "full_name",
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
      width: 135,
    },
    {
      Header: (
        <div
          className={styles.headerTableStyles}
          onClick={() => sortData("phone")}
        >
          <p>Phone</p>
          {sortOptions.find((option) => option.key === "phone")?.direction ===
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
      accessor: "phone",
      width: 90,
      Cell: ({ row }: { row: any }) => (
        <div>{`${row.original.phone ? row.original.phone : '-'} `}</div>
      ),
    },
    {
      Header: (
        <div
          className={styles.headerTableStyles}
          onClick={() => sortData("affiliate")}
        >
          <p>Affiliate</p>
          {sortOptions.find((option) => option.key === "affiliate")
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
      accessor: "affiliate",
      width: 75,
      Cell: ({ row }: { row: any }) => (
        <div>{`${row.original.affiliate ? 'Yes' : 'No'} `}</div>
      ),
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
        <div>{`${row.original.affiliate_code ? row.original.affiliate_code : '-'} `}</div>
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
      width: 120,
      Cell: ({ row }: { row: any }) => (
        <div>{`${row.original.address_line1 ? row.original.affiliate_code : '-'} `}</div>
      ),
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
      width: 70,
      Cell: ({ row }: { row: any }) => (
        <div className={`${row.original.status && styles.successChips}`}><p>{`${row.original.status}`}</p></div>
      ),
    },
    {
      Header: (
        <div
          className={styles.headerTableStyles}
          onClick={() => sortData("country")}
        >
          <p>Country</p>
          {sortOptions.find((option) => option.key === "country")?.direction ===
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
      accessor: "country",
      width: 75,
      Cell: ({ row }: { row: any }) => (
        <div>{`${row.original.country ? row.original.country : '-'} `}</div>
      ),
    },
    {
      Header: (
        <div
          className={styles.headerTableStyles}
          onClick={() => sortData("joined")}
        >
          <p>Date /Time Joined</p>
          {sortOptions.find((option) => option.key === "joined")?.direction ===
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
      accessor: "joined",
      width: 110,
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
      accessor: "id",
      width: 80,
      Cell: ({ row }: { row: any }) => (
        <div className={styles.btnWrapper}>
          <Link to={`/users/${row.original.id}`}
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
          <p className={styles.filterTitle}>USER</p>
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

  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableWrapper}>
        <TableHeader columns={columnsHeader} />
        <TableComponent
          resultsFound={resultsFound}
          columns={columns}
          data={currentUsers}
          isLoading={isLoading}
        />
      </div>

      <ReactPaginate
        pageCount={Math.ceil(users?.length / usersPerPage)}
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
        } // Стилізуйте кнопку "Prev"
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

export default UsersPage;
