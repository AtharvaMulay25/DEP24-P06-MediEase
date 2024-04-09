import React, { useState, useEffect } from "react";
import {
    CardBody,
    Input,
    Card,
    CardHeader,
    Typography,
    Button,
    CardFooter,
    Select,
    Option,
} from "@material-tailwind/react";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";
import { SyncLoadingScreen } from './UI/LoadingScreen';

export function UpdateSupplierForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        supplierName: "",
        mobileNo: "",
        email: "",
        city: "",
        state: "",
        zip: "",
        address1: "",
        address2: "",
    });

    useEffect(() => {
        const fetchSupplierDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiRoutes.supplier}/${id}`, {
                    withCredentials: true
                });
                const resData = response.data;
                if (resData.ok) {
                    const { data } = resData;
                    console.log(data);

                    setFormData({
                        supplierName: data.name,
                        mobileNo: data.mobileNumber,
                        email: data.email || "",
                        city: data.city || "",
                        state: data.state,
                        zip: data.pinCode || "",
                        address1: data.address,
                        address2: "",
                    });

                    console.log("Supplier details fetched successfully");
                } else {
                    console.log("ERROR (fetch-supplier-details): ", resData.error);
                }
            } catch (error) {
                console.error(`ERROR (fetch-supplier-details): ${error?.response?.data?.message}`);
                toast.error(error?.response?.data?.message || "Failed to fetch Supplier details");
            }
            setLoading(false);
        }

        fetchSupplierDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const data = {
            name: formData.supplierName,
            mobileNumber: formData.mobileNo,
            state: formData.state,
            address1: formData.address1,
        };
        
        if (formData.email) data["email"] = formData.email;
        if (formData.city) data["city"] = formData.city;
        if (formData.zip) data["pinCode"] = parseInt(formData.zip) || 0;
        if (formData.address2) data["address2"] = formData.address2;
        
        // Here you can handle the submission of the form
        // console.log(data);
        try {
            const response = await axios.put(`${apiRoutes.supplier}/${id}`, data, {
                withCredentials: true
            });
            // console.log(response);
            console.log("Supplier updated successfully");
            toast.success("Supplier updated successfully");
            setTimeout(() => {
                navigate("/supplier");
            }, 1000);
        } catch (error) {
            console.error(`ERROR (update-supplier): ${error?.response?.data?.message}`);
            toast.error(error?.response?.data?.message || "Failed to update Supplier");
        }
    };

    return (
        <>
            {loading && <SyncLoadingScreen />}
            {!loading && <Card className="h-max w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none pb-3">
                    <div className="mb-2 sm:flex sm:flex-row flex-col items-center justify-between gap-8">
                        <div>
                            <div className="flex flex-row items-center justify-between gap-8">
                                <Typography variant="h5" color="blue-gray">
                                    Supplier Form
                                </Typography>
                                <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:hidden">
                                    <Button
                                        className="flex items-center gap-3"
                                        size="md"
                                        onClick={() => {
                                            navigate("/supplier");
                                        }}
                                    >
                                        Supplier List
                                    </Button>
                                </div>
                            </div>
                            <Typography color="gray" className="mt-1 font-normal">
                                Update Supplier
                            </Typography>
                        </div>
                        <div className="hidden sm:flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button
                                className="flex items-center gap-3"
                                size="md"
                                onClick={() => {
                                    navigate("/supplier");
                                }}
                            >
                                Supplier List
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="p-3 sm:p-6">
                    <form onSubmit={handleUpdate} className="flex flex-wrap gap-6">
                        <div className="grid  sm:grid-cols-2 gap-y-8 gap-x-4 w-full">
                            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                                <div className="flex mr-4 md:w-72 w-full justify-end">
                                    <label htmlFor="supplierName">
                                        Supplier Name <span className="text-red-800">*</span>:
                                    </label>
                                </div>
                                <Input
                                    id="supplierName"
                                    size="md"
                                    label="Supplier Name"
                                    className="w-full"
                                    name="supplierName"
                                    value={formData.supplierName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                                <div className="flex mr-2 md:w-72 w-full justify-end">
                                    <label htmlFor="mobileNo">
                                        Mobile No <span className="text-red-800">*</span>:
                                    </label>
                                </div>
                                <Input
                                    id="mobileNo"
                                    size="md"
                                    label="Mobile No"
                                    name="mobileNo"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                                <div className="flex mr-2 md:w-72 w-full justify-end">
                                    <label htmlFor="email">Email :</label>
                                </div>
                                <Input
                                    id="email"
                                    size="md"
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                                <div className="flex mr-2 md:w-72 w-full justify-end">
                                    <label htmlFor="city">City :</label>
                                </div>
                                <Input
                                    id="city"
                                    size="md"
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                                <div className="flex mr-2 md:w-72 w-full justify-end">
                                    <label htmlFor="state">
                                        State <span className="text-red-800">*</span>:
                                    </label>
                                </div>
                                <Input
                                    id="state"
                                    size="md"
                                    label="State"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                                <div className="flex mr-2 md:w-72 w-full justify-end">
                                    <label htmlFor="zip">ZIP:</label>
                                </div>
                                <Input
                                    id="zip"
                                    type="number"
                                    min={1}
                                    size="md"
                                    label="ZIP"
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                                <div className="flex mr-2 md:w-72 w-full justify-end">
                                    <label htmlFor="address1">
                                        Address Line 1 <span className="text-red-800">*</span>:
                                    </label>
                                </div>
                                <Input
                                    id="address1"
                                    size="md"
                                    label="Address Line 1"
                                    name="address1"
                                    value={formData.address1}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                                <div className="flex mr-2 md:w-72 w-full justify-end">
                                    <label htmlFor="address2">Address Line 2:</label>
                                </div>
                                <Input
                                    id="address2"
                                    size="md"
                                    label="Address Line 2"
                                    name="address2"
                                    value={formData.address2}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </form>
                </CardBody>
                <CardFooter divider={true}>
                    <div className="flex justify-end">
                        <Button
                            className="flex items-center gap-3"
                            size="lg"
                            onClick={handleUpdate}
                        >
                            Save
                        </Button>
                    </div>
                </CardFooter>
            </Card>}
        </>
    );
}
