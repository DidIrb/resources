import { Helmet } from "react-helmet-async";
import { ResourceList } from "./common/list";

export const Home = () => {
  return (
    <div className="px-4">
      <Helmet> 
        <title> Resources </title>
        <meta name="description" content="A curated list of helpful resources" />
      </Helmet>
      <ResourceList />
    </div>
  )
};
