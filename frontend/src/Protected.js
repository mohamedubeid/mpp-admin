import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import requestsService from './service/requestsService';
import watchesService from './service/watchesService';

function Protected(props) {
    let Component = props.component;
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("user")){
          localStorage.removeItem("user");
          navigate("/login");
        } else if (localStorage.getItem("user") === "undefined"){
         console.log("undefined")
         localStorage.removeItem("user");
         navigate("/login");
        } else if(localStorage.getItem("user").length < 10) {
          console.log("Wrong access")
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          const user = JSON.parse(localStorage.getItem("user"));
          requestsService.getAllContact().then((res) => {
            if(res.data.error) {
              console.log(res.data.error);
              navigate("/login");
            }
          }).catch((err) => {
            console.log(err);
          });
        }
    }, []);
    
  return (
    <div>
    <Component/>
    </div>
  )
}

export default Protected
