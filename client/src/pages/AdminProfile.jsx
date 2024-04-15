import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
	Input,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import Layout from "../layouts/PageLayout";

export default function AdminProfile({ edit=false }) {
  const [staffDetail, setStaffDetail] = useState({
    name: "John Doe",
    role: "Admin",
    phoneNumber: "+91 9876543210",
    email: "john@gmail.com",
    age: "25",
  });

  const [loading, setLoading] = useState(false);

	const handleSave = () => {
		setLoading(true);
	}

  return (
    <Layout>
      <Card className="flex w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <Typography variant="h3" color="blue-gray" className="text-center ">
            Admin Profile
          </Typography>
        </CardHeader>
        <CardBody className="flex justify-center">
          <div className="flex flex-col sm:w-2/5 w-full min-w-fit justify-center gap-8 p-4 border border-blue-gray-100">
            <div className="flex justify-center">
              <img
                src="/src/assets/img/patient.png"
                alt="staff"
                className="rounded-full w-48 h-48 "
              />
            </div>
            <div className="content-center text-center grid sm:grid-cols-2 gap-y-3">
              <Typography variant="h6" className="text-start sm:text-center">
                Name:{" "}
              </Typography>
							{ edit ? (
								<input 
									placeholder="Full Name"
									className="px-2 py-1 border border-blue-gray-200 rounded-md"	
									value={staffDetail.name}
									onChange={(e) => setStaffDetail({...staffDetail, name: e.target.value})}
								/>
							) : (
								<Typography color="blue-gray" className="text-start">
									{staffDetail.name}
								</Typography>
							)}
              <Typography variant="h6" className="text-start sm:text-center">
                Email:{" "}
              </Typography>
							{ edit ? (
								<Input 
									disabled
									value={staffDetail.email}
								/>
							) : (
								<Typography color="blue-gray" className="text-start">
									{staffDetail.email}
								</Typography>
							)}
              <Typography variant="h6" className="text-start sm:text-center">
                Role:{" "}
              </Typography>
							{ edit ? (
								<Input 
									disabled
									value={staffDetail.role}
								/>
							) : (
								<Typography color="blue-gray" className="text-start">
									{staffDetail.role}
								</Typography>
							)}
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex justify-end">
					{!edit ? (
						<Button
							className="flex items-center gap-3"
							size="md"
							onClick={() => {}}
						>
							Edit Profile
						</Button>
					) : (
						<Button
							className="flex items-center gap-3"
							size="md"
							onClick={() => {handleSave()}}
						>
							Save
						</Button>
					)}
        </CardFooter>
      </Card>
    </Layout>
  );
}
