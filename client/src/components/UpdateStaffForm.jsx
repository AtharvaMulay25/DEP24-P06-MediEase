import React, { useState, useEffect } from "react";
import {
    CardBody,
    Input,
    Card,
    CardHeader,
    Typography,
    Button,
    CardFooter,
    Select as MaterialSelect,
    Option,
} from "@material-tailwind/react";
import { SyncLoadingScreen } from "./UI/LoadingScreen";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layouts/PageLayout";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";
import { setNavigateTimeout, setToastTimeout } from "../utils/customTimeout";

export function UpdateStaffForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const departments = ["AYURVEDIC", "GYNECOLOGY", "HOMEOPATHY"];
    const roles = ["Doctor", "Paramedical"];

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        staffName: "",
        role: "",
        department: "",
        gender: "",
        email: "",
        mobileNumber: "",
    });

    useEffect(() => {
        const fetchStaffDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiRoutes.staff}/${id}`, {
                    withCredentials: true
                });
                const resData = response.data;
                if (resData.ok) {
                    const { data } = resData;
                    console.log(data);

                    setFormData({
                        staffName: data.name,
                        role: data.role,
                        department: data.department,
                        gender: data.gender,
                        email: data.email,
                        mobileNumber: data.mobileNumber,
                    });
                    
                    console.log("Staff details fetched successfully");
                } else {
                    console.log("ERROR (fetch-staff-details): ", resData.error);
                }
            } catch (error) {
                console.error(`ERROR (fetch-staff-details): ${error?.response?.data?.message}`);
                toast.error(error?.response?.data?.message || "Failed to fetch Staff details");
            }
            setLoading(false);
        }

        fetchStaffDetails();
    }, []);

    const handleChange = (name, value) => {
        console.log(name, value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        // await fn();

        // const data = {
        //     name: formData.staffName,
        //     role: formData.role.toUpperCase(),
        //     email: formData.email,
        //     gender: formData.gender.toUpperCase(),
        // };
        // if (formData.department)
        //     data.department = formData.department.toUpperCase();
        // if (formData.mobileNumber) data.mobileNumber = formData.mobileNumber;
        setLoading(true);
        try {
            const response = await axios.put(`${apiRoutes.staff}/${id}`, formData, {
                withCredentials: true
            });
            setToastTimeout("success", "Staff updated successfully", 200);
            setNavigateTimeout(navigate, "/staff", 1000);

        } catch (error) {
            console.error(error);
            setToastTimeout("error", error?.response?.data?.message || "Failed to update Staff", 200);
        }
        setTimeout(() => {
            setLoading(false);
        }, 100);
    };

    return (
        <>
            {loading && <SyncLoadingScreen />}
            {!loading && (
                <Layout>
                    <Card className="h-max w-full">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            className="rounded-none pb-3"
                        >
                            <div className="mb-2 sm:flex sm:flex-row flex-col items-center justify-between gap-8">
                                <div>
                                    <div className="flex flex-row items-center justify-between gap-8">
                                        <Typography variant="h5" color="blue-gray">
                                            Update Staff
                                        </Typography>
                                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:hidden">
                                            <Button
                                                className="flex items-center gap-3"
                                                size="md"
                                                onClick={() => {
                                                    navigate("/staff");
                                                }}
                                            >
                                                Staff List
                                            </Button>
                                        </div>
                                    </div>
                                    <Typography color="gray" className="mt-1 font-normal">
                                        Update staff.
                                    </Typography>
                                </div>
                                <div className="hidden sm:flex shrink-0 flex-col gap-2 sm:flex-row">
                                    <Button
                                        className="flex items-center gap-3"
                                        size="md"
                                        onClick={() => {
                                            navigate("/staff");
                                        }}
                                    >
                                        Staff List
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="p-3 sm:p-6">
                            <form onSubmit={handleUpdate} className="flex flex-wrap gap-6">
                                <div className="grid  sm:grid-cols-2 gap-y-8 gap-x-4 w-full">
                                    <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                                        <div className="flex mr-4 md:w-72 w-full justify-end">
                                            <label htmlFor="staffName">
                                                Staff Name <span className="text-red-800">*</span>:
                                            </label>
                                        </div>
                                        <Input
                                            id="staffName"
                                            size="md"
                                            label="Staff Name"
                                            className="w-full"
                                            name="staffName"
                                            value={formData.staffName}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        />
                                    </div>
                                    <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                                        <div className="flex mr-2 md:w-72 w-full justify-end">
                                            <label htmlFor="role">
                                                Role <span className="text-red-800">*</span>:
                                            </label>
                                        </div>
                                        <Input
                                            id="role"
                                            size="md"
                                            label="Role"
                                            className="w-full"
                                            name="role"
                                            value={formData.role}
                                            disabled
                                        />
                                    </div>
                                    {formData.role === "Doctor" && (
                                        <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                                            <div className="flex mr-2 md:w-72 w-full justify-end">
                                                <label htmlFor="department">Department :</label>
                                            </div>
                                            <MaterialSelect
                                                id="department"
                                                size="md"
                                                name="department"
                                                label="Department"
                                                value={formData.department}
                                                onChange={(value) => handleChange("department", value)}
                                            >
                                                {departments.map((group) => (
                                                    <Option key={group} value={group}>
                                                        {group}
                                                    </Option>
                                                ))}
                                            </MaterialSelect>
                                        </div>
                                    )}
                                    <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                                        <div className="flex mr-2 w-full md:w-72 justify-end">
                                            <label htmlFor="email">
                                                Email <span className="text-red-800">*</span>:
                                            </label>
                                        </div>
                                        <Input
                                            id="email"
                                            size="md"
                                            label="Email"
                                            className="w-full"
                                            name="email"
                                            value={formData.email}
                                            disabled
                                        />
                                    </div>
                                    <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                                        <div className="flex mr-2 md:w-72 w-full justify-end">
                                            <label htmlFor="gender">
                                                Gender <span className="text-red-800">*</span>:
                                            </label>
                                        </div>
                                        <MaterialSelect
                                            id="gender"
                                            label="Select Gender"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={(value) => handleChange("gender", value)}
                                        >
                                            <Option value="MALE">Male</Option>
                                            <Option value="FEMALE">Female</Option>
                                        </MaterialSelect>
                                    </div>
                                    <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                                        <div className="flex mr-2 w-full md:w-72 justify-end">
                                            <label htmlFor="mobileNumber">Mobile Number:</label>
                                        </div>
                                        <Input
                                            id="mobileNumber"
                                            size="md"
                                            label="Mobile Number"
                                            className="w-full"
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                    </Card>
                </Layout>
            )}
        </>
    );
}
