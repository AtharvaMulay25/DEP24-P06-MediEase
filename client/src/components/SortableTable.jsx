import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  DocumentIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import {
  PencilIcon,
  UserPlusIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState, useRef } from "react";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

export function DialogDefault({
  open,
  setOpen,
  handleDelete,
  deletedRecordId,
  setDeletedRecordId,
}) {
  const handleDialogResponse = () => {
    setOpen(false);
    setDeletedRecordId(null);
  };

  return (
    <>
      <Dialog open={open}>
        <DialogHeader className="text-1xl">
          Are you sure you want to delete this record.
        </DialogHeader>
        <DialogBody></DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="green"
            onClick={() => handleDialogResponse()}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            onClick={(e) => {
              handleDelete(e, deletedRecordId);
              setOpen(false);
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export function SortableTable({
  tableHead,
  title,
  data,
  detail,
  text,
  addLink,
  handleDelete,
  searchKey,
}) {
  const [open, setOpen] = useState(false);
  const [deletedRecordId, setDeletedRecordId] = useState(null);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [paginatedData, setPaginatedData] = useState([]);

  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState(data);

  useEffect(() => {
    filterItems("");
  }, [data]);

  const [maxPages, setMaxPages] = useState(
    Math.ceil(data.length / itemsPerPage)
  );

  const tableRef = useRef(null);
  useEffect(() => {
    setMaxPages(Math.ceil(searchList.length / itemsPerPage));
  }, [searchList, itemsPerPage]);

  let csvData = [];

  useEffect(() => {
    const indexOfLastPage = currentPage * itemsPerPage;
    const indexOfFirstPage = indexOfLastPage - itemsPerPage;
    const currentItems = searchList.slice(
      indexOfFirstPage,
      Math.min(indexOfLastPage, searchList.length)
    );
    setPaginatedData(currentItems);
    // setSearchList(currentItems);
  }, [currentPage, itemsPerPage, searchList]);

  const handleDialogDelete = (e, id) => {
    setDeletedRecordId(id);
    setOpen(!open);
  };

  const getDataToExport = () => {
    //removing action field from each row and returning an array of arrays
    //updating uuid of first col entry of each row to its row Idx
    const dataToExport = data.map((rowData, rowIdx) => {
      const tableContent = [];
      Object.keys(tableHead).forEach((key, idx) => {
        if (idx == 0) {
          tableContent.push(rowIdx + 1);
        } else if (idx !== Object.keys(tableHead).length - 1) {
          tableContent.push(rowData[key]);
        }
      });
      return tableContent;
    });
    return dataToExport;
  };
  const exportToExcel = () => {
    // Implement Excel export logic here
    if (!tableRef.current) return;
    const dataToExport = getDataToExport();
    const excelData = [Object.values(tableHead).slice(0, -1), ...dataToExport];
    // Create a worksheet from the data
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    /* ***** NEED TO STYLE/ BOLD  THE HEADERS IN EXCEL SHEET ****** */

    // Make the first row bold (header row)
    // const headerCellStyle = { font: { bold: true } };
    // Object.keys(tableHead).forEach((key, index) => {
    //   const headerCellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
    //   const cell = ws[headerCellAddress];
    //   ws[headerCellAddress] = { ...cell, s: { ...(cell.s || {}), ...headerCellStyle } };
    // });

    // Create a workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Convert the workbook to an Excel buffer
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Create a blob from the buffer and save it
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, `${title}${fileExtension}`);
  };

  const exportToCSV = () => {
    // Implement CSV export logic here
    if (!tableRef.current) return;
    const dataToExport = getDataToExport();

    const csvData = [Object.values(tableHead).slice(0, -1), ...dataToExport];
    // const csvDataArray = csvData.map(row => row.join(','));
    // const csvDataString = csvDataArray.join('\n');
    return csvData;
  };

  const exportToPDF = () => {
    if (!tableRef.current) return;
    // Implement PDF export logic here
    const doc = new jsPDF();
    const tableData = getDataToExport();
    // console.log(tableData);
    doc.autoTable({
      head: [Object.values(tableHead).slice(0, -1)],
      body: tableData,
    });
    doc.save(`${title}.pdf`);
  };

  const copyToClipboard = async () => {
    if (!tableRef.current) return;

    const dataToExport = getDataToExport(); // Get data to export
    const formattedData = dataToExport.map((row) => row.join("\t")).join("\n");

    try {
      await navigator.clipboard.writeText(formattedData);
      console.log("Copied to clipboard");
      /* ***** NEED TO SHOW A SUCCESS MESSAGE HERE ****** */
    } catch (err) {
      console.error("Failed to copy to clipboard", err);
      /* ***** NEED TO SHOW AN ERROR MESSAGE HERE ****** */
    }
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterItems(e.target.value);
  };

  const filterItems = (str) => {
    const filteredArray = data.filter((item) =>
      item[searchKey].toLowerCase().includes(str.toLowerCase())
    );
    setSearchList(filteredArray);
    sorting("action");
  };

  const paginate = (act) => {
    if (act === "inc") {
      let newPageNum = currentPage + 1;
      if (newPageNum > Math.ceil(searchList.length / itemsPerPage))
        newPageNum = 1;
      setCurrentPage(newPageNum);
    } else {
      let newPageNum = currentPage - 1;
      if (newPageNum < 1) newPageNum = 1;
      setCurrentPage(newPageNum);
    }
  };

  const [sort, setSort] = useState(() => {
    const initialSortState = {};
    Object.keys(tableHead).forEach((key, index) => {
      if (key !== "action") initialSortState[key] = index === 0 ? "asc" : "";
    });
    return initialSortState;
  });

  const sorting = (col) => {
    if (col === "action") {
      let newSort = {};
      Object.keys(tableHead).forEach((key, index) => {
        if (key !== "action") newSort[key] = "";
      });
      setSort(newSort);
      return;
    }
    const sortOrder = sort[col] === "asc" ? 1 : -1;

    if (col === "id" || col === "temperature") {
      const sorted = [...searchList].sort((a, b) => {
        if (a[col] === null) return -sortOrder;
        if (b[col] === null) return sortOrder;
        if (a[col] < b[col]) return sortOrder;
        if (a[col] > b[col]) return -sortOrder;
        return 0;
      });
      // setPaginatedData(sorted);
      setSearchList(sorted);
    } else {
      const sorted = [...searchList].sort((a, b) => {
        if (a[col] === null) return -sortOrder;
        if (b[col] === null) return sortOrder;
        if (a[col].toLowerCase() < b[col].toLowerCase()) return sortOrder;
        if (a[col].toLowerCase() > b[col].toLowerCase()) return -sortOrder;
        return 0;
      });
      // setPaginatedData(sorted);
      setSearchList(sorted);
    }
    let newSort = {};
    Object.keys(tableHead).forEach((key, index) => {
      if (key !== "action") newSort[key] = "";
    });
    if (sort[col] === "asc") newSort = { ...newSort, [col]: "dsc" };
    else newSort = { ...newSort, [col]: "asc" };
    setSort(newSort);
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none pb-3">
        <div className="mb-2 flex-col sm:flex sm:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex flex-row items-center justify-between gap-8">
              <Typography variant="h5" color="blue-gray">
                {title}
              </Typography>
              {text != "" && (
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:hidden">
                  {/* <Button variant="outlined" size="sm">
              view all
              </Button> */}
                  <Button
                    className="flex items-center gap-3"
                    size="sm"
                    onClick={() => {
                      navigate(addLink);
                    }}
                  >
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> {text}
                  </Button>
                </div>
              )}
            </div>
            <Typography color="gray" className="mt-1 font-normal">
              {detail}
            </Typography>
          </div>
          {text != "" && (
            <div className="hidden sm:flex shrink-0 flex-col gap-2 sm:flex-row">
              {/* <Button variant="outlined" size="sm">
              view all
              </Button> */}
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={() => {
                  navigate(addLink);
                }}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> {text}
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-start gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={search}
              onChange={(e) => handleSearch(e)}
            />
          </div>
          {title !== "Pending Request List" && (
            <div className="flex justify-evenly md:justify-normal w-full md:w-72">
              <Tooltip content="Copy to Clipboard">
                <IconButton variant="text" onClick={copyToClipboard}>
                  <DocumentIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip>
              <Tooltip content="Export to Excel">
                <IconButton variant="text" onClick={exportToExcel}>
                  <FontAwesomeIcon icon={faFileExcel} className="h-4 w-4" />
                  {/* <FontAwesomeIcon icon="fa-light fa-file-excel" /> */}
                </IconButton>
              </Tooltip>
              <Tooltip content="Export to CSV">
                <IconButton variant="text">
                  {(csvData = exportToCSV()) && (
                    <CSVLink data={csvData} filename={`${title}.csv`}>
                      {" "}
                      <DocumentTextIcon className="h-4 w-4" />{" "}
                    </CSVLink>
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip content="Save as PDF">
                <IconButton variant="text" onClick={exportToPDF}>
                  <ArrowDownTrayIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
        {/* <div className="flex items-center justify-between gap-4 md:flex-row">
         
        </div> */}
      </CardHeader>
      <CardBody className="flex-1 overflow-y-auto px-4 py-1">
        <table ref={tableRef} className="w-full border table-auto text-left">
          <thead>
            <tr>
              {Object.entries(tableHead).map(([value, head]) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-bold leading-none"
                  >
                    {head} {""}
                    {value !== "total_amount" &&
                      value !== "action" &&
                      sort[value] === "" && (
                        <div>
                          <ChevronUpDownIcon
                            strokeWidth={2}
                            className="h-5 w-5"
                            onClick={() => sorting(value)}
                          />
                        </div>
                      )}
                    {value !== "total_amount" &&
                      value !== "action" &&
                      sort[value] === "asc" && (
                        <ChevronDownIcon
                          strokeWidth={4}
                          className="h-2.5 w-5"
                          onClick={() => sorting(value)}
                        />
                      )}
                    {value !== "total_amount" &&
                      value !== "action" &&
                      sort[value] === "dsc" && (
                        <ChevronUpIcon
                          strokeWidth={4}
                          className="h-2.5 w-5"
                          onClick={() => sorting(value)}
                        />
                      )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((rowData, index) => {
              const classes = "px-3 border-2 opacity-80";
              return (
                <tr key={index} className="even:bg-blue-gray-50/50">
                  {Object.entries(tableHead).map(([key, value]) => {
                    if (key === "id")
                      return (
                        <td className={classes} key={key}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </Typography>
                        </td>
                      );
                    if (key === "purchaseItems")
                      return (
                        <div className="flex justify-center">
                          <td className="px-3 border-0 opacity-80">
                            <Tooltip content="View">
                              <IconButton variant="text">
                                <EyeIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </div>
                      );
                    if (key !== "action")
                      return (
                        <td className={classes} key={key}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {rowData[key]}
                          </Typography>
                        </td>
                      );
                  })}
                  <td className={("", classes)}>
                    <div className="flex gap-0.5">
                      {title !== "Pending Request List" ? (
                        <>
                          <Tooltip content="Edit">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Delete">
                            <IconButton
                              variant="text"
                              onClick={(e) => handleDelete(e, rowData["id"])}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <Tooltip content="Approve">
                            <IconButton variant="text">
                              <CheckCircleIcon
                                className="h-6 w-6"
                                style={{ color: "green" }}
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Reject">
                            <IconButton variant="text">
                              <XCircleIcon
                                className="h-6 w-6"
                                style={{ color: "red" }}
                              />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="min-w-0 flex-col lg:flex-row lg:flex items-center justify-between border-t border-blue-gray-50 p-3">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          paginate={paginate}
          maxPages={maxPages}
        />
        <div className="md:flex md:flex-row flex-col pt-2 justify-end">
          <Typography color="gray" className="min-w-0 font-normal px-2 mt-2">
            Items per page
          </Typography>
          <div className="">
            <Select
              value={itemsPerPage.toString()}
              onChange={(value) => setItemsPerPage(value)}
            >
              <Option value="10">10</Option>
              <Option value="25">25</Option>
              <Option value="50">50</Option>
              <Option value="100">100</Option>
            </Select>
          </div>
        </div>
      </CardFooter>
      <DialogDefault
        open={open}
        setOpen={setOpen}
        handleDelete={handleDelete}
        deletedRecordId={deletedRecordId}
        setDeletedRecordId={setDeletedRecordId}
      />
    </Card>
  );
}
