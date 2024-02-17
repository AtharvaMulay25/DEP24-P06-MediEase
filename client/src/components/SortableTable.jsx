import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  useAccordion,
} from "@material-tailwind/react";

import MockData from "../assets/MOCK_DATA.json";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const TABLE_HEAD = {
  id: "#",
  Purchase_id: "Purchase_id",
  Supplier: "Supplier",
  date: "Date",
  total_amount: "Total Amount",
  action: "Action",
};

export function SortableTable() {
  const [data, setData] = useState(MockData);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  const [paginatedData, setPaginatedData] = useState([]);

  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  const [maxPages, setMaxPages] = useState(Math.ceil((data.length)/itemsPerPage));

  useEffect(() => {
    setMaxPages(Math.ceil((data.length)/itemsPerPage)); 
  }, [data]);

  useEffect(() => {
    const indexOfLastPage = currentPage * itemsPerPage;
    const indexOfFirstPage = indexOfLastPage - itemsPerPage;
    const currentItems = data.slice(indexOfFirstPage, Math.min(indexOfLastPage, data.length));
    setPaginatedData(currentItems);
    setSearchList(currentItems);
  }, [currentPage]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterItems(e.target.value);
  };

  const filterItems = (str) => {
    const filteredArray = paginatedData.filter(item => 
      ((item.Supplier).toLowerCase()).includes(str.toLowerCase())
    );
    console.log(filteredArray);
    setSearchList(filteredArray);
  };

  const paginate = (act) => {
    if (act === "inc") {
      let newPageNum = currentPage + 1;
      if (newPageNum > Math.ceil(data.length / itemsPerPage)) newPageNum = 1;
      setCurrentPage(newPageNum);
    } else {
      let newPageNum = currentPage - 1;
      if (newPageNum < 1) newPageNum = 1;
      setCurrentPage(newPageNum);
    }  
  };

  const [sort, setSort] = useState({
    id: "asc",
    Purchase_id: "",
    Supplier: "",
    date: "",
  });

  const sorting = (col) => {
    if(col !== "date" && col !== "id"){
      if(sort[col] == "" || sort[col] == "dsc"){
        const sorted = [...searchList].sort((a,b) =>
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        );
        setSearchList(sorted);
        
        let newSort = {id:"", Purchase_id:"", date:"", Supplier:""};
        newSort = {...newSort, [col]: "asc"};
        setSort(newSort);
      }
      else if(sort[col] == "asc"){
        const sorted = [...searchList].sort((a,b) =>
          a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        );
        setSearchList(sorted);

        let newSort = {id:"", Purchase_id:"", date:"", Supplier:""};
        newSort = {...newSort, [col]: "dsc"};
        setSort(newSort);
      }
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none pb-3">
        <div className="mb-2 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Purchase List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all purchases
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {/* <Button variant="outlined" size="sm">
            view all
            </Button> */}
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add purchase
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs> */}
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={search}
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="flex-1 overflow-y-scroll px-4 py-1">
        <table className="w-full border table-auto text-left">
          <thead>
            <tr>
              {Object.entries(TABLE_HEAD).map(([value, head]) => (
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
                    {value !== "total_amount" && value !== "action" && sort[value] === "" && (
                      <div>
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-5 w-5"
                          onClick={() => sorting(value)}
                        />
                      </div>
                    )}
                    {value !== "total_amount" && value !== "action" && sort[value] === "asc" && (
                      <ChevronDownIcon
                        strokeWidth={4}
                        className="h-2.5 w-3"
                        onClick={() => sorting(value)}
                      />
                    )}
                    {value !== "total_amount" && value !== "action" && sort[value] === "dsc" && (
                      <ChevronUpIcon
                        strokeWidth={4}
                        className="h-2.5 w-3"
                        onClick={() => sorting(value)}
                      />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {searchList.map(
              //  ["#", "Purchase_id", "Supplier", "Date", "Total Amount", "Action"]
              ({ id, Purchase_id, Supplier, date, total_amount }) => {
                // const isLast = index === data.length - 1;
                // const classes = isLast
                //   ? "p-4 border-2"
                //   : "p-4 border-b border-2 border-blue-gray-50";
                const classes = "px-3 border-2 opacity-80";

                return (
                  <tr key={id} className="even:bg-blue-gray-50/50">
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Purchase_id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Supplier}
                      </Typography>
                    </td>
                    {/* <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={online ? "online" : "offline"}
                          color={online ? "green" : "blue-gray"}
                        />
                      </div>
                    </td> */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {total_amount}
                      </Typography>
                    </td>

                    <td className={("", classes)}>
                      <Tooltip content="Edit Purcahse">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <Pagination 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginate={paginate}
        maxPages={maxPages}
      />
      {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" onClick={() => paginate("dec")}>
            Previous
          </Button>
          <Button variant="outlined" size="sm" onClick={() => paginate("inc")}>
            Next
          </Button>
        </div>
      </CardFooter> */}
    </Card>
  );
}
