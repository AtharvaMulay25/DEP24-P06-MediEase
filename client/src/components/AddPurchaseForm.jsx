import React, { useState, useEffect } from "react";
import Select from "react-select";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  CardBody,
  Input,
  Card,
  CardHeader,
  Typography,
  Button,
  CardFooter,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export function AddPurchaseForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    purchaseDate: "",
    invoiceNo: "",
    purchaseDetails: "",
    supplier: null, // This will hold the selected supplier
  });

  const [dataArray, setDataArray] = useState([
    { medicine: "", batchNo: "", mfgDate: "", expDate: "", quantity: "" }
  ]);
  const [netQty, setNetQty] = useState(0);
  const [suppliers, setSuppliers] = useState([]);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    // Fetch suppliers list when the component mounts
    fetchSuppliers();
    fetchMedicines();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/supplier/list"
      );
      // console.log(response.data);
      setSuppliers(response.data.data); // Assuming the response is an array of suppliers
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/medicine/list"
      );
      // console.log(response.data);
      setMedicines(response.data.data); // Assuming the response is an array of medicines
    } catch (error) {
      console.error(error);
    }
  };
  const handleNetQtyChange = ()=>
  {
    let curNetQty = 0;
      dataArray.map((data)=>{
    
        curNetQty = curNetQty + (parseInt(data['quantity']) || 0);
      }      
      )
      setNetQty(curNetQty);
  }

  const handleInputChange = (key, index, value) => {
    // console.log(dataArray)
    console.log(key, index, value);
    const updatedArray = [...dataArray];
    console.log(updatedArray)
    updatedArray[index][key] = value;
    setDataArray(updatedArray);
    if(key == 'quantity')
    {
      handleNetQtyChange();
    }
  };

  const handleDeleteRow = (index) => {
    console.log(index)
    if (dataArray.length == 1) return; // Prevent deleting the first row
    //**** GIVE ERROR MSG HERE
    const updatedArray = [...dataArray];
    updatedArray.splice(index, 1);
    console.log(updatedArray);
    setDataArray(updatedArray);
    setNetQty((prevQty) => prevQty - (parseInt(dataArray[index]['quantity']) || 0));
  };

  const handleAddRow = () => {
    setDataArray([
      ...dataArray,
      { medicine: "", batchNo: "", mfgDate: "", expDate: "", quantity: "" },
    ]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSupplierChange = (selectedSupplier) => {
    console.log(selectedSupplier.value);
    setFormData((prevData) => ({
      ...prevData,
      supplier: selectedSupplier,
    }));
  };

  const handleMedicineChange = (selectedMedicine, index) => {
    console.log(selectedMedicine.value);
    setDataArray((prevData) => {
      const updatedArray = [...prevData];
      updatedArray[index].medicine = selectedMedicine;
      console.log(updatedArray);
      return updatedArray;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      purchaseDate: formData.purchaseDate,
      invoiceNo: formData.invoiceNo,
      supplierId: formData.supplier.value, // Assuming supplier object has a unique identifier 'value'  //will be passing supplier id to backend
      purchaseDetails: formData.purchaseDetails,
    };

    // Here you can handle the submission of the form
    console.log(formData);

    //***DON'T LET THE FORM SUBMIT IF ANY OF MANDATORY ITEMS IS MISSING OR ANY LIST ROW FIELD IS EMPTY */
    try {
      const response = await axios.post(
        "http://localhost:4000/api/purchase/create",
        data
      );
      console.log(response);
      navigate("/purchase/list");
    } catch (error) {
      console.error(error);
    }
  };

  const TABLE_HEAD = [
    "Medicine Name",
    "Batch No.",
    "Mfg. Date",
    "Exp. Date",
    "Total Quantity"
  ];

  return (
    <Card className="h-max w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none pb-3">
        <div className="mb-2 sm:flex sm:flex-row flex-col items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Purchase Form
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              size="md"
              onClick={() => {
                navigate("/purchase/list");
              }}
            >
              Purchase List
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-3 sm:p-6">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
          <div className="grid  sm:grid-cols-2 gap-y-8 gap-x-4 w-full">
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 md:w-72 w-full justify-end">
                <label htmlFor="invoiceNo">
                  Invoice No. <span className="text-red-800">*</span>:
                </label>
              </div>
              <Input
                id="invoiceNo"
                size="md"
                label="Invoice No."
                name="invoiceNo"
                value={formData.invoiceNo}
                onChange={handleChange}
              />
            </div>

            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-4 md:w-72 w-full justify-end">
                <label htmlFor="purchaseDate">
                  Purchase Date <span className="text-red-800">*</span>:
                </label>
              </div>
              <Input
                id="purchaseDate"
                size="md"
                label="Purchase Date"
                className="w-full"
                name="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={handleChange}
              />
            </div>

            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 md:w-72 w-full justify-end">
                <label htmlFor="supplier">
                  Supplier <span className="text-red-800">*</span>:
                </label>
              </div>
              <Select
                id="supplier"
                options={suppliers.map((supplier) => ({
                  value: supplier.id, // Assuming supplier object has a unique identifier 'id'
                  label: supplier.name, // Assuming supplier object has a property 'name'
                }))}
                value={formData.supplier}
                onChange={handleSupplierChange}
                isClearable={true}
                placeholder="Select Supplier"
                className="w-full"
              />
            </div>

            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 md:w-72 w-full justify-end">
                <label htmlFor="purchaseDetails">Details:</label>
              </div>
              <Input
                id="purchaseDetails"
                size="md"
                label="Details"
                name="purchaseDetails"
                value={formData.purchaseDetails}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
        <table className="overflow-scroll mt-12 w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head} 
                  {(head != 'Mfg. Date') && <span className="text-red-900"> *</span>}
                  </Typography>
                </th>
              ))}
              <th className="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Action
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
           
            {dataArray.map((data, index) => (
              <tr key={index}>
                <td key="medicine" className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                  <Select
                    options={medicines.map((medicine) => ({
                      value: medicine.id, // Assuming supplier object has a unique identifier 'id'
                      label: medicine.name, // Assuming supplier object has a property 'name'
                    }))}
                    value={data["medicine"]}
                    onChange={(selectedMedicine) => handleMedicineChange(selectedMedicine, index)}
                    isClearable={true}
                    placeholder="Select Medicine"
                    className="w-full"
                  />
                    
                  </div>
                </td>
                <td key="batchNo" className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      value={data["batchNo"]}
                      onChange={(e) =>
                        handleInputChange('batchNo', index,  e.target.value)
                      }
                    
                    />
                  </div>
                </td>
                <td key="mfgDate" className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                     
                        <Input
                          type="date"
                          value={data['mfgDate']}
                          onChange={(e) =>
                            handleInputChange('mfgDate' ,index,  e.target.value)
                          }
                        />
                      
                    </div>
                  </td>
                  <td key="expDate" className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                     
                        <Input
                          type="date"
                          value={data['expDate']}
                          onChange={(e) =>
                            handleInputChange('expDate' ,index,  e.target.value)
                          }
                        />
                      
                    </div>
                  </td>
                  <td key="quantity" className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      value={data["quantity"]}
                      onChange={(e) =>
                        handleInputChange('quantity', index,  e.target.value)
                       
                      }
                    
                    />
                  </div>
                </td>

                <td className="p-2 border-b border-blue-gray-50">
                  <Tooltip content="Delete">
                    <IconButton
                      variant="text"
                      onClick={() => {
                        handleDeleteRow(index);
                      }}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}

            {/* last row */}
            <tr>
              <td className="p-4 border-b border-blue-gray-50"></td>

              <td className="p-4 border-b border-blue-gray-50"></td>
              <td className="p-4 border-b border-blue-gray-50"></td>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex justify-end items-center gap-3">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold text-right"
                  >
                    Net Quantity :
                  </Typography>
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex justify-center items-center gap-3">
                  <Typography
                    variant="medium"
                    color="blue-gray"
                    className="font-bold"
                  >
                    {netQty}
                  </Typography>
                </div>
              </td>
              <td className="p-2 border-b border-blue-gray-50">
                <Tooltip content="Add">
                  <IconButton variant="text" onClick={handleAddRow}>
                    <PlusCircleIcon className="h-5 w-5" />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          </tbody>
        </table>
      </CardBody>

      <CardFooter divider={true}>
        <div className="flex justify-end">
          <Button
            className="flex items-center gap-3"
            size="lg"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
