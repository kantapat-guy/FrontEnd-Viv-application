import Avatar from "@mui/material/Avatar";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState, useEffect } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { getToken } from '../../Login/services/auth';
import "./Profile.css"
import check from "./images/check.png"
import user from "../../../assets/user.png"

const Profile =() => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [dbUrl, setDBUrl] = useState("");
  const [profile, setProfile] = useState({
            name:"",
            lastname:""
        })

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const fetchData = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/users/login`, {headers: {authorization: `Bearer ${getToken()}`}})
    .then ((res) => {
        setProfile(res.data)
    }).catch((err) => {
        alert(err)
    })
  }

  const fetchImg = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/users/profile`, {headers: {authorization: `Bearer ${getToken()}`}})
    .then ((res) => {
      setDBUrl(res.data.url)
    }).catch((err) => {
      setDBUrl(user)
      console.log(err)
    })
  }



  const handleSubmit = () => {
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            axios.post(`${import.meta.env.VITE_API_URL}/users/profile`, {url}, {headers: {authorization: `Bearer ${getToken()}`}})
            fetchImg()
          })
          .then (() => fetchImg())
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchData()
    fetchImg()
  }, [])


  return (
    <div className="con-profile">
      <div>
        <Avatar src={!dbUrl ? user : dbUrl} sx={{ width: 150, height: 150 }} />
      <div className='up-container'>
        <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file"  onChange={handleImageChange} />
            <PhotoCamera  className='photo' />
        </IconButton>
        <button className='upload' onClick={handleSubmit}><img className='check' src= {check}/></button>
      </div>
      </div>


      <div className='profileName'>{`${profile.name} ${profile.lastname}`}</div>
    </div>
  );
}

export default Profile;