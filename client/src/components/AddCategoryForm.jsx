import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";
import { SyncLoadingScreen } from "./UI/LoadingScreen";
import Layout from "../layouts/PageLayout";
export function AddCategoryForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
    strengthType: "",
    otherStrengthType: "",
  });

  const handleChange = (name, value) => {
    // console.log(e.target);
    // const { name, value } = e.target;
    // console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      categoryName: formData.categoryName,
      strengthType:
        formData.strengthType === "other"
          ? formData.otherStrengthType
          : formData.strengthType,
    };

    // Here you can handle the submission of the form
    // console.log(data);
    setLoading(true);
    try {
      const response = await axios.post(apiRoutes.category, data, {
        withCredentials: true,
      });
      console.log(response);
      toast.success("Medicine Category added successfully");
      setTimeout(() => {
        navigate("/medicine/category");
      }, 1000);
    } catch (error) {
      console.error(`ERROR (add-category): ${error?.response?.data?.message}`);
      toast.error(
        error?.response?.data?.message || "Failed to add Medicine Category"
      );
    }
    setLoading(false);
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
                      Category Form
                    </Typography>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:hidden">
                      <Button
                        className="flex items-center gap-3"
                        size="md"
                        onClick={() => {
                          navigate("/medicine/category");
                        }}
                      >
                        Category List
                      </Button>
                    </div>
                  </div>
                  <Typography color="gray" className="mt-1 font-normal">
                    Add a new category to the list.
                  </Typography>
                </div>
                <div className="hidden sm:flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button
                    className="flex items-center gap-3"
                    size="md"
                    onClick={() => {
                      navigate("/medicine/category");
                    }}
                  >
                    Category List
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-3 sm:p-6">
              <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
                <div className="grid  sm:grid-cols-2 gap-y-8 gap-x-4 w-full">
                  <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                    <div className="flex mr-4 md:w-72 w-full justify-end">
                      <label htmlFor="categoryName">
                        Category Name <span className="text-red-800">*</span>:
                      </label>
                    </div>
                    <Input
                      id="categoryName"
                      size="md"
                      label="Category Name"
                      className="w-full"
                      name="categoryName"
                      value={formData.categoryName}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                    <div className="flex mr-2 w-full md:w-72 justify-end">
                      <label htmlFor="strengthType">
                        Strength Type <span className="text-red-800">*</span>:
                      </label>
                    </div>
                    <Select
                      id="strengthType"
                      label="Select Strength Type"
                      name="strengthType"
                      value={formData.strengthType}
                      onChange={(value) => handleChange("strengthType", value)}
                    >
                      <Option value="mg">mg</Option>
                      <Option value="ml">ml</Option>
                      <Option value="grams">grams</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </div>
                  {formData.strengthType === "other" && (
                    <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                      <div className="flex mr-2 w-full md:w-72 justify-end">
                        <label htmlFor="otherStrengthType">
                          Other <span className="text-red-800">*</span>:
                        </label>
                      </div>
                      <Input
                        id="otherStrengthType"
                        size="md"
                        label="Other Strength Type"
                        className="w-full"
                        name="otherStrengthType"
                        value={formData.otherStrengthType}
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                  )}
                </div>
              </form>
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
        </Layout>
      )}
    </>
  );
}
