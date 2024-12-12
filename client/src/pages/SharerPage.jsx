import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import Sharer from '../components/Sharer/Sharer.jsx';
import { useParams } from "react-router-dom";

const SharerPage = () => {
  // const profile = data?.profile || [];
  const params  = useParams();
  const { loading, data } = useQuery(QUERY_USER, {variables:{userId: params.userId}});

  return (
    <main>
      <div className="flex-row justify-center">
        <div>
          {data ?
          <Sharer userData={data} />
          :<></>
        }
        </div>
      </div>
    </main>
  );
};
  
  export default SharerPage;