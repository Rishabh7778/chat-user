import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from '../assets/loader.gif';
// import logo1 from '../assets/logo2.jpg';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/ApiRoute";

export const SetAvatar = () => {
    const api = "http://api.multiavatar.com/1233678";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectAvatar, setSelectAvatar] = useState(undefined);

    const toastOption = {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    };

    useEffect(() => {
        if (!localStorage.getItem("chatappuser")) {
            navigate('/login');
        }
    }, [navigate]); // Include navigate as a dependency


    const setProfilePicture = async () => {
        if (selectAvatar === undefined) {
            toast.error("Please select an avatar", toastOption);
        }
        else {
            const user = await JSON.parse(localStorage.getItem("chatappuser"));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectAvatar],
            });

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chatappuser", JSON.stringify(user));
                navigate('/');
            } else {
                toast.error("Error setting Avatar. Please try again! ", toastOption)
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                );
                // Use Buffer to handle binary data
                const buffer = Buffer.from(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    return isLoading ? (
        <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
            <img src={Loader} alt="Loader" />
        </div>
    ) : (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
            <h1 className="text-2xl font-bold mb-6">Pick an avatar as your profile picture</h1>

            <div className="flex flex-wrap gap-3 justify-center">
                {avatars.map((avatar, index) => (
                    <div
                        key={index}
                        className={`h-20 w-20 flex items-center justify-center p-2 border-2 
            ${selectAvatar === index ? "border-indigo-700 rounded-full" : "border-transparent"} 
            hover:bg-indigo-700 hover:rounded-full cursor-pointer`}
                        onClick={() => setSelectAvatar(index)}
                    >
                        <img
                            src={`data:image/svg+xml;base64,${avatar}`}
                            alt="avatar"
                            className="h-full w-full object-contain rounded-lg"
                        />
                    </div>
                ))}
                {/* <div onClick={() => setSelectAvatar(index)}  key={index}>

                <img src={logo1} alt="logo1" className="h-40 w-40 rounded-full object-contain rounded-lg" />
                <img src={logo1} alt="logo1" className="h-40 w-40 object-contain rounded-lg" />
                <img src={logo1} alt="logo1" className="h-40 w-40 object-contain rounded-lg" />
                <img src={logo1} alt="logo1" className="h-40 w-40 object-contain rounded-lg" />
                </div> */}
            </div>
            <button onClick={setProfilePicture} className="bg-blue-500 text-white p-2 rounded-xl mt-4 font-bold transition ease-in-out delay-100 hover:bg-blue-700 hover:scale-105">
                Set as Profile Picture
            </button>

            <ToastContainer />
        </div>
    );
};
