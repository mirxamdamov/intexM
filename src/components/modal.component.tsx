import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type propTypes = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  item: any;
};

export const Modal: React.FC<propTypes> = ({
  open,
  onClose,
  children,
  item,
}) => {
  const chil = children;
  const [name, setName] = useState<string>("");
  const [orders, setOrders] = useState<any>();
  const [nameErr, setNameErr] = useState<boolean>(false);
  const [nameErr2, setNameErr2] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(998);
  const [id, setId] = useState<any>();
  const [numberErr, setNumberErr] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const [locationErr, setLocationErr] = useState<boolean>(false);
  const validate = () => {
    if (name === "" || name.length < 3) {
      setNameErr(true);
    } else {
      setNameErr(false);
    }
    if (location === "") {
      setLocationErr(true);
    } else {
      setLocationErr(false);
    }
    if (!number || number.toString().length !== 12) {
      setNumberErr(true);
    } else {
      setNumberErr(false);
    }
  };

  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      const registerOptions = {
        method: "POST",
        url: "http://localhost:3000/users",
        data: JSON.stringify({
          username: name,
          phone_number: number,
          location,
        }),
      };
      const respose = await axios.request(registerOptions);
      setId(respose.data?.id);
      setNameErr2(respose.data.err === "Bu Username allaqachon band qilingan");
      const registerOptionsO = {
        method: "POST",
        url: "http://localhost:3000/orders",
        data: JSON.stringify({
          auth_id: id,
          product_id: item.id,
        }),
      };
      const requestOrders: any = axios.request(registerOptionsO).then((res) => {
        navigate("/rahmat");
      });
    } catch (err) {}
  }

  // useEffect(() => {
  //   navigate("/rahmat");
  // }, []);
  return (
    <div
      className={`fixed inset-0  md:flex  justify-center items-center transition-colors  ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        className={`lg:flex lg:justify-center w-[1130px] bg-white rounded-lg h-[709px] shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
      >
        <div
          style={{
            borderRadius: " 0px 35px 35px 35px",
            boxShadow: " 0px 5px 10px 0px rgba(0, 0, 0, 0.25)",
          }}
          className="md:w-[633px] w-[243px] mt-8 md:h-[505px] h-[161px] bg-white flex justify-center md:m-0 -ms-[700px] items-center"
        >
          <span
            key={item?.id}
            className=" lg:mx-[19px] mx-6 mt-5 inline-block w-[340px] h-[284px]  bg-black"
            style={{
              borderRadius: "0px 35px 35px 35px",
              background: "#FFF",
              boxShadow: " 0px 5px 10px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <center>
              <h1 className="mt-6 text-xl text-[#009398] font-serif font-bold  ">
                {item.ramka}
              </h1>
              <span>
                <img src="../../public/bassen.svg" className="mt-5" alt="" />
                <section>
                  <img src="../../public/x.svg" className="mt-2" alt="" />
                  <p className="font-mono text-[#009398]">{item.bottom}</p>
                </section>
                <section className="flex ms-[280px] -mt-32">
                  <img src="../../public/y.svg" className="mt-2" alt="" />
                  <p className="font-mono text-[#009398] ms-1 mt-5">
                    {item.top}
                  </p>
                </section>
                <div className="flex ms-10 relative">
                  <section className="text-start ms-10 mt-[61px]">
                    <del>{item.chegPrice} so'm</del>
                    <p className="text-xl">{item.price} so'm</p>
                  </section>
                  <section className="absolute end-5 bottom-2"></section>
                </div>
              </span>
            </center>
          </span>
        </div>
        <form className="" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              name="price"
              id="price"
              className="md:ms-5 -ms-[710px] m-5 mt-24 h-[61.824px] block w-[359.702px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Ismingiz"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameErr && (
              <p className="text-red-500 absolute top-0 start-7">
                Your Name is invalid
              </p>
            )}
            {nameErr2 && (
              <p className="text-red-500 absolute top-0 start-7">
                Bu nom allaqachon band
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="number"
              name="price"
              id="price"
              className="md:m-0 -ms-[700px] w-[359.702px] block mt-5 h-[61.824px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 me-10"
              placeholder="Telefon raqamingiz"
              value={number}
              onChange={(e) => setNumber(+e.target.value)}
            />
            {numberErr && (
              <p className="text-red-500 absolute top-0 start-7">
                Your Number is invalid
              </p>
            )}
          </div>

          <div className="relative">
            <div className="flex ms-5 relative">
              <input
                type="text"
                name="price"
                id="price"
                className=" w-[270px] block mt-5 h-[61.824px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <img src="../../public/location.svg" alt="" />
            </div>
            {locationErr && (
              <p className="text-red-500 absolute top-5 start-7">
                Your Location is invalid
              </p>
            )}
          </div>
          <button
            className="bg-[#FFE600] px-10 py-2 rounded-lg mt-4 md:m-0 -ms-[600px]"
            style={{ boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.25)" }}
            onClick={validate}
          >
            Buyurtma
          </button>
        </form>
        <button
          onClick={() => {
            handleSubmit;
          }}
          className="absolute top-5 right-5 "
        >
          <img src="../../public/cancel.svg" alt="" />
        </button>
      </div>
    </div>
  );
};
