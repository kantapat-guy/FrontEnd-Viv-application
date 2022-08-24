import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./CreateActivity.css";
import axios from "axios";
import Swal from 'sweetalert2';
import { getToken } from "../Login/services/auth";

const CreateAct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //for redirect to another page
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data)
    axios
    .post(`${import.meta.env.VITE_API_URL}/users/me/activities/create`, data, {headers: {authorization: `Bearer ${getToken()}`}})
    .then((res) => {
      console.log(res.data)
      //popup to show it been save
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Your data had been saved.'
      })
    .then(()=>navigate("/"))
    })
    .catch((err) => {
        //popup to show if error
        Swal.fire(
            'Sorry for a problem!',
            err.response.data.error,
            'error'
        )
    })
  };


  return (
<div>
    <div className="bigBox">
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="type">
          <h2>Type activity</h2>
          <select {...register("ActType", { required: true })}>
            <option value="">---- Select your activity ----</option>
            <option value="Running">Running  🏃</option>
            <option value="Swimming">Swimming  🏊🏻‍♂️</option>
            <option value="Hiking">Hiking  🌲👨🏻‍🦯</option>
            <option value="Riding bicycle">Riding bicycle  🚴🏻‍♂️</option>
            <option value="Walking">Walking  🚶</option>
          </select>
          {errors.ActType && <p>Type is required</p>}
        </div>

        <div className="type">
          <h2>Duration</h2>
          <div className="boxDu">
            <input className="num" type="number" min="0" max="24"{...register("hour", { required: true})} />
            <h3>Hours</h3>
            <input className="num" id="mins" type="number" min="0" max="59"{...register("minute", { required: true })} />
            <h3>Minutes</h3>
          </div>
          {errors.hour && <p>Hour is required</p>}
          {errors.minute && <p>Minutes is required</p>}
        </div>
        <div className="cal">
          <h2>Date</h2>
          <input className="inDate" type="date" {...register("date", { required: true})} />
            {errors.date && <p>Date is required</p>}
        </div>

        <div className="typeD">
          <h2>Description</h2>
          <textarea {...register("description")} placeholder="Description" />
        </div>

        <div className="btn">
          <button style={{border: "0px", cursor: "pointer"}}>
              <input type="submit" value="Add" style={{cursor: "pointer"}}/>
          </button>
          <Link to="/">
              <input type="submit" value="Cancel" style={{cursor: "pointer"}}/>
          </Link>
        </div>
      </form>
    </div>
    </div>
  );
  
};

export default CreateAct;
