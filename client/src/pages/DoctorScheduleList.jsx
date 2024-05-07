import React from 'react'
import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import {
    SyncLoadingScreen,
} from "../components/UI/LoadingScreen";

const TABLE_HEAD = {
    id: "#",
    day: "Day",
    shift: "Shift",
    name: "Doctor Name",
    department: "Department",
    email: "Email",
};

import Layout from "../layouts/PageLayout";
import { toast } from "sonner";
import { apiRoutes } from "../utils/apiRoutes";

const getScheduleData = async () => {
    try {
        const response = await axios.get(apiRoutes.schedule, {
            withCredentials: true
        });
        toast.success("Doctors Schedule List fetched successfully");
        return response.data.data;
    } catch (error) {
        console.log("ERROR : ", error);
        console.error(
            `ERROR (get-doctors-schedule-list): ${error?.response?.data?.message}`
        );
        toast.error("Failed to fetch Doctors Schedule List");
    }
};

const DoctorScheduleList = () => {
    const [loading, setLoading] = useState(true);
    const [doctorSchedules, setDoctorSchedules] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getScheduleData();
            const doctorsSchedule = data.filter((schedule) => schedule.role)
            setDoctorSchedules(doctorsSchedule);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <>
          
                    <SortableTable
                        tableHead={TABLE_HEAD}
                        title="Schedule"
                        data={doctorSchedules}
                        detail="See the current schedule of our doctors."
                        text="Add Schedule"
                        addLink="/schedule/add"
                        searchKey="day"
                        handleDelete={() => {}}
                        actionFlag='false'
                        showAddBtn={false}
                    />
               
        </>
    );
}

export default DoctorScheduleList