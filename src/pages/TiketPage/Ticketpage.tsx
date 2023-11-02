import React, { useCallback, useEffect, useState } from "react";
import { Column } from "react-table";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { TableComponent, TableHeader } from "../../components";
import {
  closeTicket,
  getAllTickets,
  searchCTickets,
} from "../../services/ticket.service";
import { CircleLoader } from "react-spinners";
import { Link } from "react-router-dom";

import styles from "./TicketPage.module.css";

import deleteIcon from "../../assets/users-page/delete.svg";
import eye from "../../assets/users-page/eye.svg";
import searchIcon from "../../assets/users-page/search.svg";
import clearIcon from "../../assets/users-page/x-circle.svg";
import arrowDownIcon from "../../assets/users-page/errowDown.svg";
import left from "../../assets/users-page/left.svg";
import right from "../../assets/users-page/right.svg";

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

interface ITicket {
  id: number;
  subject: string;
  description?: string;
  created: string;
  status: string;
  user_id: number;
}

const myCustomStyles = {
  background: "rgba(0, 0, 0, 0.8)",
  color: "#fff",
};

const progressBarStyles = {
  background: "#556EE6",
};

const CustomCheckmark = () => <div style={{ color: "#556EE6" }}>✔</div>;

const CustomErrorIcon = () => <div style={{ color: "red" }}>✘</div>;

const ticketsPerPage = 5;

const Ticketpage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultsFound, setResultsFound] = useState(true);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loadingStates, setLoadingStates] = useState<{
    [key: number]: boolean;
  }>({});
  const [activeSortQuery, setActiveSortQuery] = useState<{
    key: string;
    sortDirection?: string;
  }>({
    key: "website",
    sortDirection: "ascending",
  });
  const [sortOptions, setSortOptions] = useState<
    {
      key: string;
      direction: string;
    }[]
  >([
    { key: "website", direction: "ascending" },
    { key: "site_code", direction: "ascending" },
    { key: "ticket_code", direction: "ascending" },
    { key: "first_name", direction: "ascending" },
    { key: "email", direction: "ascending" },
    { key: "status", direction: "ascending" },
  ]);

  const fetchData = useCallback(
    async ({ key, sortDirection }: { key: string; sortDirection?: string }) => {
      setIsLoading(true);
      try {
        const sortParam = sortDirection === "descending" ? `-${key}` : key;
        const data = await getAllTickets(sortParam);
        setTickets(data);
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

  const handleSearch = async () => {
    setIsLoading(true);
    const searchedArray = await searchCTickets(searchValue);
    if (searchedArray.length) {
      setIsLoading(false);
      setTickets(searchedArray);
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

  const handleCloseTicket = async (id: number) => {
    setLoadingStates({ ...loadingStates, [id]: true });
    const req = await closeTicket(id);
    if (req?.id) {
      setLoadingStates({ ...loadingStates, [id]: false });
      toast.success("Ticket was closed", {
        position: "top-right",
        autoClose: 3000,
        className: "my-custom-toast",
        style: myCustomStyles,
        progressClassName: "my-custom-progress-bar",
        progressStyle: progressBarStyles,
        icon: <CustomCheckmark />,
      });
      fetchData(activeSortQuery);
    } else {
      toast.error("Something goes wrong", {
        position: "top-right",
        autoClose: 3000,
        className: "my-custom-toast-error",
        style: myCustomStyles,
        progressClassName: "my-custom-progress-bar",
        progressStyle: progressBarStyles,
        icon: <CustomErrorIcon />,
      });
      setLoadingStates({ ...loadingStates, [id]: false });
      fetchData(activeSortQuery);
    }
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
        <div className={styles.tableHeader} onClick={() => sortData("website")}>
          <p>Web Site</p>
          {sortOptions.find((option) => option.key === "website")?.direction ===
          "ascending" ? (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgNoRotate}
            />
          ) : (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgRotate}
            />
          )}
        </div>
      ),
      width: 100,
      accessor: "website",
    },
    {
      Header: (
        <div
          className={styles.tableHeader}
          onClick={() => sortData("site_code")}
        >
          <p>Site Code</p>
          {sortOptions.find((option) => option.key === "site_code")
            ?.direction === "ascending" ? (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgNoRotate}
            />
          ) : (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgRotate}
            />
          )}
        </div>
      ),
      accessor: "site_code",
      width: 80,
    },
    {
      Header: (
        <div
          className={styles.tableHeader}
          onClick={() => sortData("ticket_code")}
        >
          <p>Ticket Code</p>
          {sortOptions.find((option) => option.key === "ticket_code")
            ?.direction === "ascending" ? (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgNoRotate}
            />
          ) : (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgRotate}
            />
          )}
        </div>
      ),
      accessor: "ticket_code",
      width: 75,
    },
    {
      Header: (
        <div
          className={styles.tableHeader}
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
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgRotate}
            />
          )}
        </div>
      ),
      width: 80,
      accessor: "full_name",
      Cell: ({ row }: { row: any }) => (
        <div>{`${row.original.first_name} ${row.original.last_name}`}</div>
      ),
    },
    {
      Header: (
        <div className={styles.tableHeader} onClick={() => sortData("email")}>
          <p>Email</p>
          {sortOptions.find((option) => option.key === "email")?.direction ===
          "ascending" ? (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgNoRotate}
            />
          ) : (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgRotate}
            />
          )}
        </div>
      ),
      accessor: "email",
      width: 120,
    },
    {
      Header: (
        <div className={styles.tableHeader} onClick={() => sortData("status")}>
          <p>Status</p>
          {sortOptions.find((option) => option.key === "status")?.direction ===
          "ascending" ? (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgNoRotate}
            />
          ) : (
            <img
              src={arrowDownIcon}
              alt="sort"
              className={styles.imgRotate}
            />
          )}
        </div>
      ),
      accessor: "status",
      width: 70,
      Cell: ({ row }: { row: any }) => (
        <div className={`${row.original.status === 'Pending' ? styles.pendingChips : styles.successChips}`}><p>{`${row.original.status}`}</p></div>
      ),
    },
    {
      Header: (
        <div className={styles.tableHeader}>
          <p>Action</p>
        </div>
      ),
      accessor: "currentid",
      with: 120,
      Cell: ({ row }: { row: any }) => {
        return (
          <div className={styles.btnWrapper}>
            <Link
              to={`/tickets/${row.original.id}`}
              className={styles.btnReply}
            >
              <img alt="reply" src={eye} />
              View
            </Link>

            {loadingStates[row.original.id] ? (
              <CircleLoader
                loading={loadingStates[row.original.id]}
                color={"#556EE6"}
                size={20}
              />
            ) : (
              <div
                className={styles.imageDeleteWraper}
                onClick={() => handleCloseTicket(row.original.id)}
              >
                <img src={deleteIcon} alt="delete" />
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const columnsHeader: ColumnWithCustomHeader[] = [
    {
      Header: "LeftHeader",
      width: 230,
      customHeader: (
        <div className={styles.filterWrapper}>
          <p className={styles.filterTitle}>TICKETS</p>
        </div>
      ),
    },
    {
      Header: "RightHeader",
      width: 230,
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

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const indexOfLastUser = (currentPage + 1) * ticketsPerPage;
  const indexOfFirstUser = indexOfLastUser - ticketsPerPage;
  const currentCompanies = tickets?.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableWrapper}>
        <TableHeader columns={columnsHeader} />
        <TableComponent
          resultsFound={resultsFound}
          columns={columns}
          data={currentCompanies}
          isLoading={isLoading}
        />
      </div>

      <ReactPaginate
        pageCount={Math.ceil(tickets?.length / ticketsPerPage)}
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

export default Ticketpage;
