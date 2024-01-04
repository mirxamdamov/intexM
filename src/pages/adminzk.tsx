import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Adminpzk() {
  const [numberinp, setNumberinp] = useState<any>("");
  const [address, setAddres] = useState<any>("");
  const [products, setProducts] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openl, setOpenL] = useState<boolean>(false);
  const navigate = useNavigate();
  const serverUrl = "http://localhost:3000"; // Server manzili

  async function deleteCategory(id: number) {
    try {
      const response = await axios.post(`${serverUrl}/users/${id}`);
      console.log(response);
      getData();
    } catch (error) {
      console.error("Category deletion error:", error);
    }
  }

  async function getData() {
    const registerOptions = {
      method: "GET",
      url: `http://localhost:3000/users`,
    };
    const respose: any = await axios
      .request(registerOptions)
      .then((e) => {
        setProducts(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  const pathname = window.location.pathname.slice(7);
  try {
    const el: any = document.querySelector(`.zakaz`);
    const el1: any = document.querySelector(`#zakaz`);

    el1.style.color = "#009398";
    el.style.color = "#009398";
  } catch (error) {}

  return (
    <main className="bg-[#d6d3d341]">
      <nav className="flex  text-[#A6A6A6] bg-transparent h-[90px] w-full py-[34px]  border-b-2 px-[51px] ">
        <div className="flex gap-10  end-[65px]">
          <h1 className="text-[#009398] abs font-medium text-xl">
            INTEX-MARKET.UZ
          </h1>
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
      <section className="pt-[26px] h-[100vh] text-[#B4B4C6] bg-white w-[262px] pl-[41px]">
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
      <ul className="flex absolute top-28 start-[45%] gap-[75px] text-[#A6A6A6] text-3xl">
        <li>
          <Link to="/admin/zakaz">Заказы</Link>
        </li>
        <li id="zakaz">Консультации</li>
      </ul>
      <ul className="absolute w-[1088px] h-[100%] block top-[160px] start-[300px] overflow-y-auto ">
        <li className="w-[1068px] mb-10 h-[69px] flex bg-white rounded-3xl py-5 px-12">
          <p>Имя клиента</p>
          <p className="ms-[150px]">Телефон</p>
          <p className="ms-[250px]">Время</p>
          <p className="ms-[220px]">Действия</p>
        </li>
        <table>
          {products.map((e: any) => {
            return (
              <tr
                key={e.id}
                className=" w-[1068px] mt-2 h-[69px] flex bg-white rounded-3xl py-5 px-12"
              >
                <td className="w-[131px]">{e.username}</td>
                <td className="w-[181px] ms-[80px]">{e?.phone_number}</td>
                <td className="w-[200px] ms-[90px]">{e?.createdAt}</td>
                <td className=" ms-20">
                  <p
                    className="absolute end-16"
                    onClick={() => deleteCategory(e.id)}
                  >
                    <img src="../../public/delete.png" alt="" />
                  </p>
                </td>
              </tr>
            );
          })}
        </table>
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

export default Adminpzk;
