import React from "react";
import './ActivityListCard.css';
import barbel from "./images/barbel.png"
import swim from './images/swim.png'
import bicycle from './images/bicycle.png'
import run from './images/run.png';
import edit from './images/edit.png';
import remove from './images/remove.png';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { getToken } from "../../Login/services/auth";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as loadingData from "./images/loading.json";
import Select from 'react-select';


const ActivityListCard = () => {

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5


    const [activity, setActivity] = useState([]);

  //For Loading animate
  const [loading, setLoading] = useState(true);


  //Fetch data from database to show at card
  const fetchData = () => {
    setLoading(true)
    axios
    .get(`http://localhost:8080/users/me/activities`, {headers: {authorization: `Bearer ${getToken()}`}})
    .then((res) => {
      setActivity(res.data)
    })
    .catch((err) => {
      alert(err)
    })
    .finally(() => setLoading(false))
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData()
      setLoading(false)
    }, 1000)

  }, [])

  
  // const options = [
  //   "Newest to oldest", "Oldest to newest"
  // ]

  const options = [
    { value: 'New', label: 'Newest to oldest' },
    { value: 'Old', label: 'Oldest to newest' }
  ];

  const [select, setSelect] = useState("");

  console.log(select)
  const onSelect = async() => {
    console.log(select)
    if(select.value === "New") {
      setLoading(true)
      setTimeout(() => {
        axios
        .get(`http://localhost:8080/users/me/activities/`, {headers: {authorization: `Bearer ${getToken()}`}})
        .then((res) => {
          setActivity(res.data)
        })
        .then (()=> setLoading(false))
        .catch((err) => {
          alert(err)})
    }, 500);
  }
    else if (select.value === "Old") {
      setLoading(true)
      setTimeout(() => {
      axios
      .get(`http://localhost:8080/users/me/activities/asc`, {headers: {authorization: `Bearer ${getToken()}`}})
      .then((res) => {
        setActivity(res.data)
      })
      .then (()=> setLoading(false))
      .catch((err) => {
        alert(err)
      })
    }, 500);
    }
    else {
      setLoading(true)
      fetchData()
      setLoading(false)
    }
  }

  useEffect(() => {
    onSelect()
  }, [select])



  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(activity.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(activity.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, activity]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % activity.length;
    setItemOffset(newOffset);
  };
  
    //For change img according to  activity
    const pic = (act) => {
        if(act.ActType==="Swimming"){
            return swim
        } else if (act.ActType==="Running"){
            return run
        } else if (act.ActType==="Hiking"){
            return barbel
        } else if (act.ActType==="Riding bicycle") {
            return bicycle
        } else {
            return run
        }
    }

    
    //For delete data when click on icon and show popup
    const confirmDel = (id) => {
        //popup for confirm to delete
        Swal.fire({
            title:"Do you want to delete?",
            icon:"warning",
            showCancelButton:true,
        }).then((result)=>{
            if(result.isConfirmed){
              deleteBlog(id)
            }
        })
      }


    //req to api to delete data
    const deleteBlog = (id) => {
        axios
        .delete(`${import.meta.env.VITE_API_URL}/users/me/activities/${id}`, {headers: {authorization: `Bearer ${getToken()}`}})
        .then(()=>{
        //popup for show it complete
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
          title: 'Your data had been deleted.'
        })
        //Req to show new data after delete
        fetchData()
        })
        .catch(err=>console.log(err))
    }

  
  return (
    <div className="container">
        <div className="scroll">
        {/* <Dropdown options={options} placeholder="Select an option" onChange={onSelect}/> */}
        <Select
        defaultValue={select}
        onChange={setSelect}
        options={options}
        />
        {loading ? (
            <div style={{width:"700px"}}><Lottie options={defaultOptions} height={150} width={150} /></div> ) : 
        <div className="container-listcard">
          <FadeIn>
            {currentItems.map((act,index) => (
                    <div className="listCard" key={index} >
                        <div className="card" key={index} >
                            <div className="container-content" key={index} >
                                <img src= {pic(act)} alt="" />
                                    <div className="span-can">
                                        <div className="div-text"><p id="text-name">Activity type : </p><span id="span-text">{act.ActType}</span></div>
                                        <div className="div-text"><p id="text-name">Duration : </p><span id="span-text">{act.hour} hour || {act.minute} minutes</span></div>
                                        <div className="div-text"><p id="text-name">Date : </p><span id="span-text">{new Date(act.date).toLocaleDateString()}</span></div>
                                        <p id="text-name">Description : </p><div className="des-con"><p className="text-des">{act.description}</p></div>
                                    </div>
                            </div>
                            <div className="card-btn">
                                <Link to={`/edit/${act._id}`}><img src= { edit } alt="" /></Link>
                                <div onClick={()=>confirmDel(act._id)}><img src= { remove } /></div>
                            </div>
                        </div>
                    </div>
                    ))}
          </FadeIn>
        </div> 
      }
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName= "pagegination"
        pageLinkClassName="page-num"
        previousClassName="page-num"
        activeClassName="activePage"
      />
      </div>
    </div> 
  )
}

export default ActivityListCard