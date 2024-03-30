import React, {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";
import { PrinterIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import Layout from "../layouts/PageLayout";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import {toast} from "sonner";
import {setToastTimeout} from "../utils/customTimeout"
const TABLE_HEAD = [
  "Medicine",
  "Batch No",
  "Mfd. Date",
  "Exp. Date",
  "Total Quantity",
];
const PurchaseDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [purchaseData, setPurchaseData] = useState({
    invoiceNo: "",
    supplierName: "",
    purchaseDate: "",
    details: "",
    medicines: [],
  });
  console.log("purchase List id: ", id);
  const fetchPurchaseDetail = async () => {
    try {
      const response = await axios.get(apiRoutes.purchase + `/${id}`);
      console.log("response", response.data.data);
      setToastTimeout('success', 'Purchase Details fetched successfully', 1000);
      return response.data.data;
    } catch (error) {
      console.error(
        `ERROR (get-purchase-detail): ${error?.response?.data?.message}`
      );
      setToastTimeout('error', `${error?.response?.data?.message}` || 'Failed to fetch Purchase Details', 1000);
    }
  };

  useEffect(
    () => async () => {
      const data = await fetchPurchaseDetail();
      console.log("data out", data);
      setPurchaseData(data);
      setLoading(false);
    },
    []
  );

  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <div className="flex flex-col self-center lg:w-2/3 h-max">
            <div className="flex flex-col sm:flex-row justify-between py-2">
              <div>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  Purchase Detail
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Invoice No: {purchaseData.invoiceNo}
                </Typography>
              </div>
              <div className="flex gap-x-2 h-10">
                <Button size="md" ripple={true}>
                  Edit
                </Button>
                <Button size="md" ripple={true} className="flex gap-x-1 px-4">
                  <PrinterIcon className="h-4" /> Print
                </Button>
              </div>
            </div>
            <Card className="w-full h-fit min-h-lvh">
              <CardBody>
                <div className="flex border-b border-black p-2 ">
                  {/* <img
                  src="\src\assets\img\iitrprbanner.png"
                  alt="logo"
                  className="w-4/5 h-20 rounded-none"
                /> */}
                  <img
                    src="\src\assets\img\iitroparlogo0.jpg"
                    alt="logo"
                    className="px-4 w-fit h-24 rounded-none"
                  />
                  <div className="w-full">
                    <Typography variant="h3" color="blue-grey" className="">
                      Indian Institute of Technology Ropar
                    </Typography>
                    <Typography variant="h5" color="blue-grey" className="">
                      Medical center / Rupnagar - 140001, Punjab, India
                    </Typography>
                    <Typography
                      variant="h5"
                      color="blue-grey"
                      className="text-end"
                    >
                      Phone: 1234567890
                    </Typography>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 pt-4 pl-10 justify-items-left">
                  <Typography variant="small">Invoice No.</Typography>
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    {purchaseData.invoiceNo}
                  </Typography>

                  <Typography variant="small">Supplier</Typography>
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    {purchaseData.supplierName}
                  </Typography>

                  <Typography variant="small">Purchase Date</Typography>
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    {purchaseData.purchaseDate}
                  </Typography>

                  <Typography variant="small">Details</Typography>
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    {purchaseData.details}
                  </Typography>
                </div>
                <div className="w-full pt-4">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="border-y border-blue-gray-100 bg-blue-gray-50 p-4"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70 text-center"
                            >
                              {head}
                              {head === "Dosage" && "*"}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {purchaseData.medicines.map((medicine) => (
                        <tr className="text-center border-b border-blue-gray-50">
                          <td className="">
                            <Typography
                              variant="small"
                              // color="blue-gray"
                              className="font-normal p-4"
                            >
                              {medicine.name}
                            </Typography>
                          </td>
                          <td>
                            <Typography
                              variant="small"
                              // color="blue-gray"
                              className="font-normal"
                            >
                              {medicine.batchNo}
                            </Typography>
                          </td>
                          <td>
                            <Typography
                              variant="small"
                              // color="blue-gray"
                              className="font-normal"
                            >
                              {medicine.mfgDate}
                            </Typography>
                          </td>
                          <td>
                            <Typography variant="small" className="font-normal">
                              {medicine.expDate}
                            </Typography>
                          </td>
                          <td>
                            <Typography variant="small" className="font-normal">
                              {medicine.totalQuantity}
                            </Typography>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
              <CardFooter className="p-4"></CardFooter>
            </Card>
          </div>
        </Layout>
      )}
    </>
  );
};

export default PurchaseDetail;
