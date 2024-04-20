import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";

export default function DialogBox({
    type = "id",
    title,
    open,
    setOpen,
    handleDelete,
    deletedRecordId = "",
    setDeletedRecordId = ()=>{},
  }) {
    const handleDialogResponse = () => {
      setOpen(false);
      setDeletedRecordId(null);
    };
  
    return (
      <>
        <Dialog open={open}>
          <DialogHeader className="text-1xl">
            {`Are you sure you want to delete this ` + title + `?`}
          </DialogHeader>
          <DialogBody>
            {(title === "Admin" || title === "Staff" || title === "Patient") &&
              `
            Deleting this ` +
                title +
                ` will also delete the associated user account.
            `}
          </DialogBody>
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
                (type === "id") ? handleDelete(e, deletedRecordId) : handleDelete();
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