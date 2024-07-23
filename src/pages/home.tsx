import { useApp } from "@/context/app.context";
import { Navbar } from "@/layouts/components/navbar";
import { useEffect } from "react";
import Resource from "./components/resource";

export const Home = () => {
    const { resources, fetchData } = useApp();
    useEffect(() => {  fetchData() }, []);

    return (
        <div>
            <Navbar />
            <div className="container flex gap-6 py-3">
                {resources.length > 0 ?
                    resources.map((item: any, index: number) => <Resource key={index} item={
                        {
                            icon: item.icon,
                            title: item.title,
                            description: item.description,
                            date: item.date,
                            website: item.link
                        }
                    } />)
                    :
                    "No resources found"
                }
            </div>
        </div>
    )
}