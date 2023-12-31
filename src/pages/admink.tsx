import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Adminp1() {
  const [e1, setE1] = useState<any>([]);
  const [catigory, setCatygory] = useState([]);
  const [numberinp, setNumberinp] = useState("");
  const [address, setAddres] = useState("");
  const [open, setOpen] = useState(false);
  const [openl, setOpenL] = useState(false);
  const navigate = useNavigate();
  const serverUrl = "http://localhost:3000"; // Server manzili

  async function deleteCategory(id: number) {
    try {
      const response = await axios.post(`${serverUrl}/catigory/${id}`);
      console.log(response);
      getData();
    } catch (error) {
      console.error("Category deletion error:", error);
    }
  }

  async function getData() {
    try {
      const response = await axios.get("http://localhost:3000/catigory");
      setCatygory(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, [openl,open]);

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
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="w-[242px] h-[64px] rounded-full absolute top-24 end-10 text-white bg-[#009398]"
      >
        + Добавить категории
      </button>

      <section className="pt-[126px] h-[100vh] text-[#B4B4C6] bg-white w-[262px] pl-[41px]">
        <p className="mt-4 text-xl product">
          <Link to="/admin/products/10">Продукты</Link>
        </p>
        <p className="mt-4 text-xl zakaz">
          <Link to="/admin/zakaz">Заказы</Link>
        </p>
        <p className="mt-4 text-xl kategory">
          <Link to="/admin/kategory">Категории</Link>
        </p>
        <p className="mt-4 text-xl sayd">
          <Link to="/admin/sayd">Сайт</Link>
        </p>
      </section>
      <ul className="absolute top-[160px] start-[300px]">
        {catigory.map((e: any) => {
          // setE1(e)
          return (
            <li
              key={e.id}
              className="relative w-[1088px] h-[69px] flex bg-white rounded-3xl py-5 px-12 mt-2"
            >
              <p>{e.title}</p>
              <p className="ms-[110px] me-[620px]"></p>
              <button
                className="absolute end-8"
                onClick={() => {
                  setE1(e.id);

                  setOpenL(true);
                }}
              >
                <img src="../../public/edit.svg" alt="" />
              </button>
              <button
                className="absolute end-16"
                onClick={() => deleteCategory(e.id)}
              >
                <img src="../../public/delete.png" alt="" />
              </button>
            </li>
          );
        })}
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

          <h1 className="text-3xl text-[#009398]">Добавить категории</h1>
          <form
            className="absolute top-[145px] start-[362px] flex-none"
            onSubmit={(e) => {
              e.preventDefault();
              fetch("http://localhost:3000/catigory", {
                method: "POST",
                body: JSON.stringify({
                  title: numberinp,
                }),
              }).then((res) =>
                res.json().then((res) => {
                  console.log(res);
                  setOpen(false);
                  getData();
                })
              );
            }}
          >
            <label htmlFor="tel">Название</label>
            <br />
            <input
              id="tel"
              value={numberinp}
              onChange={(e) => {
                setNumberinp(e.target.value);
              }}
              className="w-[378px] h-[33px] border-b outline-none focus:border-b"
              type="text"
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

          <h1 className="text-3xl text-[#009398]">Категории</h1>
          <form
            className="absolute top-[145px] start-[362px] flex-none"
            onSubmit={async (e) => {
              e.preventDefault();
              await fetch("http://localhost:3000/catigorya", {
                method: "POST",
                body: JSON.stringify({
                  id: e1,
                  title: address,
                }),
              }).then((res) =>
                res.json().then((res) => {
                  getData();
                  console.log(res);
                  setOpenL(false);
                })
              );
            }}
          >
            <label htmlFor="adres">категории</label>
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

export default Adminp1;
