import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function ViolationDetails() {
  const { scanId, index } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`http://localhost:1102/api/analyse/${scanId}`)
      .then((res) => res.json())
      .then(data =>{
        setData(data.violations[index])
      });
  }, [scanId, index]);

  console.log(data);
  
  if(!data) return ( <h1> Loading Results </h1>)

  return (
    <>
    <p>{data.id}</p>
    <p>{data.impact}</p>
    <p>{data.description}</p>
    <p>{data.help}</p>
    <a href={data.helpUrl} target="_blank" rel="Noreference"> Documentation </a>
    </>
  );
}

export default ViolationDetails;
