import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";


export default function Pagination({
    currentPage, setCurrentPage, paginate, maxPages
}) {
    const getItemProps = (index) =>
    ({
      variant: currentPage === index ? "filled" : "text",
      color: "gray",
      onClick: () => {
        setCurrentPage(index);
      }
    });

    const EmptyIconButton = () => {
        return <><IconButton variant="text">  </IconButton></>
    };

    return (
    <div className="md:flex md:flex-row flex-col items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={() => paginate("dec")}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {currentPage <= maxPages && <IconButton  {...getItemProps(currentPage)}>{currentPage}</IconButton>}
        {currentPage <= maxPages-1 ? <IconButton {...getItemProps(currentPage+1)}>{currentPage+1}</IconButton> : <EmptyIconButton />}
        {currentPage <= maxPages-2 ? <IconButton {...getItemProps(currentPage+2)}>{currentPage+2}</IconButton> : <EmptyIconButton />}
        {currentPage <= maxPages-3 ? <IconButton {...getItemProps(currentPage+3)}>{currentPage+3}</IconButton> : <EmptyIconButton />}
        {currentPage <= maxPages-4 ? <IconButton {...getItemProps(currentPage+4)}>{currentPage+4}</IconButton> : <EmptyIconButton />}
        {maxPages >= 5 && currentPage+4 < maxPages && <IconButton variant="text">...</IconButton>}
        {maxPages >= 5 && currentPage+4 < maxPages && <IconButton {...getItemProps(maxPages)}>{maxPages}</IconButton>}
      </div>
      <div className="flex justify-end">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={() => paginate("inc")}
          >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}