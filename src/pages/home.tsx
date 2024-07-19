import { Navbar } from "@/layouts/components/navbar"
import Resource from "./components/resource"
import { useState, useEffect } from "react";
import axios from 'axios';
export const api = import.meta.env.VITE_BACKEND_URL

export const Home = () => {
    // USE AXIOS TO GET DATA FROM OUR API THAT WE WILL USE IN OUR APP
    const [resources, setResources] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api}/resources`);
                setResources(response.data);
                console.log(response)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    
    return (
        <div>
            <Navbar />
            <div className="container pb-3">
               {/* <Resource item={{
                    icon: "https/image.image",
                    name: "name",
                    description: "Description",
                    date: "January 2022",
                    website: "Https://website.com"
                }} /> */}
            </div>
        </div>
    )
}