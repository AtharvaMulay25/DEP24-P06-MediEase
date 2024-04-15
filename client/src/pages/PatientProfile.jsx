	import { useState } from "react";
	import {
		Card,
		CardBody,
		CardHeader,
		Typography,
		Accordion,
		AccordionHeader,
		AccordionBody,
		CardFooter,
		Button,
	} from "@material-tailwind/react";
	import Layout from "../layouts/PageLayout";

	export default function PatientProfile() {
		const [staffDetail, setStaffDetail] = useState({
			name: "John Doe",
			role: "Student",
			department: "Computer Science",
			phoneNumber: "+91 9876543210",
			email: "john@gmail.com",
		});

		const [scheduleData, setScheduleData] = useState([
			{ day: "Sunday", shift: "9:00 AM - 5:00 PM" },
			{ day: "Monday", shift: "9:00 AM - 5:00 PM" },
			{ day: "Tuesday", shift: "9:00 AM - 5:00 PM" },
			{ day: "Wednesday", shift: "9:00 AM - 5:00 PM" },
			{ day: "Thursday", shift: "9:00 AM - 5:00 PM" },
			{ day: "Friday", shift: "9:00 AM - 5:00 PM" },
			{ day: "Saturday", shift: "9:00 AM - 5:00 PM" },
		]);
		const [loading, setLoading] = useState(false);

		return (
			<Layout>
				<Card className="flex w-full">
					<CardHeader floated={false} shadow={false} className="rounded-none">
						<Typography variant="h3" color="blue-gray" className="text-center ">
							Patient Profile
						</Typography>
					</CardHeader>
					<CardBody className="flex flex-col md:flex-row justify-between">
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
              <Typography color="blue-gray" className="text-start">
                {staffDetail.name}
              </Typography>
              <Typography variant="h6" className=" text-start sm:text-center">
                Designation:{" "}
              </Typography>
              <Typography color="blue-gray" className="text-start">
                {staffDetail.role}
              </Typography>
              <Typography variant="h6" className=" text-start sm:text-center">
                Department:{" "}
              </Typography>
              <Typography color="blue-gray" className="text-start">
                {staffDetail.department}
              </Typography>
              <Typography variant="h6" className=" text-start sm:text-center">
                Mobile:{" "}
              </Typography>
              <Typography color="blue-gray" className="text-start">
                {staffDetail.phoneNumber}
              </Typography>
              <Typography variant="h6" className=" text-start sm:text-center">
                Email:{" "}
              </Typography>
              <Typography color="blue-gray" className="text-start">
                {staffDetail.email}
              </Typography>
            </div>
						</div>
						<div className="px-4">
								<Accordion open={true}>
									<AccordionHeader className="pb-1 text-gray-700">
										Other Details
									</AccordionHeader>
									<AccordionBody>
										We&apos;re not always in the position that we want to be at.
										We&apos;re constantly growing. We&apos;re constantly making
										mistakes. We&apos;re constantly trying to express ourselves
										and actualize our dreams.
									</AccordionBody>
								</Accordion>
								<Accordion open={true}>
									<AccordionHeader className="pb-1 text-gray-700">
										Experience
									</AccordionHeader>
									<AccordionBody>
										We&apos;re not always in the position that we want to be at.
										We&apos;re constantly growing. We&apos;re constantly making
										mistakes. We&apos;re constantly trying to express ourselves
										and actualize our dreams.
									</AccordionBody>
								</Accordion>
								<Accordion open={true}>
									<AccordionHeader className="pb-1 text-gray-700">
										Education
									</AccordionHeader>
									<AccordionBody>
										We&apos;re not always in the position that we want to be at.
										We&apos;re constantly growing. We&apos;re constantly making
										mistakes. We&apos;re constantly trying to express ourselves
										and actualize our dreams.
									</AccordionBody>
								</Accordion>
						</div>
					</CardBody>
					<CardFooter className="flex justify-end">
						<Button
							className="flex items-center gap-3"
							size="md"
							onClick={() => {}}
						>
							Edit Profile
						</Button>
					</CardFooter>
				</Card>
			</Layout>
		);
	}
