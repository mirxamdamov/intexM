import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Adminp() {
  const [number, setNumber] = useState<string>("");
  const [numberinp, setNumberinp] = useState<any>("");
  const [address, setAddres] = useState<any>("");
  const [location, setLocation] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openl, setOpenL] = useState<boolean>(false);
  const navigate = useNavigate();

  async function getData() {
    const registerOptions = {
      method: "GET",
      url: `http://localhost:3000/users/${localStorage.getItem("name")}`,
      data: JSON.stringify({
        username: localStorage.getItem("name"),
      }),
    };
    const respose: any = await axios
      .request(registerOptions)
      .then((e) => {
        setNumber(e.data.phone_number);
        setLocation(e.data.location);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  getData();
  const pathname = window.location.pathname.slice(7);
  try {
    const el: any = document.querySelector(`.${pathname}`);
    el.style.color = "#009398";
  } catch (error) {}

  return (
    <main className="bg-[#d6d3d341]">
      <nav className="flex  text-[#A6A6A6] bg-transparent h-[90px] fixed w-full py-[34px]  border-b-2 px-[51px] ">
        <h1 className="text-[#009398]  font-medium text-xl">INTEX-MARKET.UZ</h1>
        <div className="flex gap-10 absolute end-[65px]">
          <p>
            <Link to={"/"}>Просмотр веб-сайта</Link>
          </p>
          <p>|</p>
          <p className="flex gap-2">
            <img src="../../public/avatar.svg" alt="" />
            {localStorage.getItem("name")}
          </p>
        </div>
      </nav>
      <section className="pt-[126px] h-[100vh] text-[#B4B4C6] bg-white w-[262px] pl-[41px]">
        <p className="mt-4 text-xl product">
          <Link to="/admin/kategory">Продукты</Link>
        </p>
        <p className="mt-4 text-xl zakaz">
          <Link to="/admin/zaka">Заказы</Link>
        </p>
        <p className="mt-4 text-xl kategory">
          <Link to="/admin/kategory">Категории</Link>
        </p>
        <p className="mt-4 text-xl sayd">Сайт</p>
      </section>
      <ul className="absolute top-[160px] start-[300px]">
        <li className="w-[1088px] h-[69px] flex bg-white rounded-3xl py-5 px-12">
          <p>Телефонный номер</p>
          <p className="ms-[110px] me-[620px]">{number}</p>
          <button
            onClick={() => {
              setOpen(true);
            }}
          >
            <img src="../../public/edit.svg" alt="" />
          </button>
        </li>
        <li className="w-[1088px] h-[69px] mt-5 flex bg-white rounded-3xl py-5 px-12">
          <p>Адрес</p>
          <p className="ms-[210px] me-[620px]">{location}</p>
          <button
            onClick={() => {
              setOpenL(true);
            }}
          >
            <img src="../../public/edit.svg" alt="" />
          </button>
        </li>
      </ul>
      <section
        className={`fixed inset-0  md:flex  justify-center items-center transition-colors  ${
          open ? "visible bg-black/30" : "invisible"
        }`}
      >
        <div
          className={`lg:flex lg:justify-center w-[1130px] bg-white rounded-3xl h-[415px] shadow p-6 transition-all ${
            open ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
        >
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            <img
              src="../../public/x.png"
              className="w-[32px] h-[30px] absolute top-8 end-8"
              alt=""
            />
          </button>

          <h1 className="text-3xl text-[#009398]">Телефонный номер</h1>
          <form
            className="absolute top-[145px] start-[362px] flex-none"
            onSubmit={(e) => {
              e.preventDefault();
              fetch("http://localhost:3000/usersa", {
                method: "POST",
                body: JSON.stringify({
                  username: localStorage.getItem("name"),
                  phone_number: numberinp,
                }),
              }).then((res) =>
                res.json().then((res) => {
                  console.log(res);
                  setOpen(false);
                })
              );
            }}
          >
            <label htmlFor="tel">Номер</label>
            <br />
            <input
              id="tel"
              value={numberinp}
              onChange={(e) => {
                setNumberinp(e.target.value);
              }}
              className="w-[378px] h-[33px] border-b outline-none focus:border-b"
              type="number"
            />
          </form>
        </div>
      </section>
      <section
        className={`fixed inset-0  md:flex  justify-center items-center transition-colors  ${
          openl ? "visible bg-black/30" : "invisible"
        }`}
      >
        <div
          className={`lg:flex lg:justify-center w-[1130px] bg-white rounded-3xl h-[415px] shadow p-6 transition-all ${
            openl ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
        >
          <button
            onClick={() => {
              setOpenL(false);
            }}
          >
            <img
              src="../../public/x.png"
              className="w-[32px] h-[30px] absolute top-8 end-8"
              alt=""
            />
          </button>

          <h1 className="text-3xl text-[#009398]">Телефонный номер</h1>
          <form
            className="absolute top-[145px] start-[362px] flex-none"
            onSubmit={async (e) => {
              e.preventDefault();
              await fetch("http://localhost:3000/usersa", {
                method: "POST",
                body: JSON.stringify({
                  username: localStorage.getItem("name"),
                  location: address,
                }),
              }).then((res) =>
                res.json().then((res) => {
                  console.log(res);
                  setOpenL(false);
                })
              );
            }}
          >
            <label htmlFor="adres">Адрес</label>
            <br />
            <input
              id="adres"
              value={address}
              onChange={(e) => {
                setAddres(e.target.value);
              }}
              className="w-[378px] h-[33px] border-b outline-none focus:border-b"
              type="text"
            />
          </form>
        </div>
      </section>
    </main>
  );
}

export default Adminp;
