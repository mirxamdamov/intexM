import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Adminpro() {
  const [e1, setE1] = useState<any>();
  const [catigory, setCatygory] = useState<any>([]);
  const [catigoryinp, setCatygoryinp] = useState<any>(10);
  const [catigory2, setCatygory2] = useState<any>([]);
  const [productPrice, setProductPrice] = useState("");
  const [productChegPrice, setProductChegPrice] = useState("");
  const [productRamka, setProductRamka] = useState("");
  const [obj2, setObj2] = useState<any>({});
  const [id, setId] = useState<any>();
  const [open, setOpen] = useState(false);
  const [openl, setOpenL] = useState(false);
  const navigate = useNavigate();
  const serverUrl = "http://localhost:3000"; // Server manzili
  async function deleteCategory(id: number) {
    try {
      const response = await axios.post(`${serverUrl}/products/${id}`);
      console.log(response);
      getData();
    } catch (error) {
      console.error("Category deletion error:", error);
    }
  }
  const ids = useParams();
  async function getData() {
    try {
      const response = await axios.get("http://localhost:3000/catigory");
      setCatygory(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function getData2() {
    try {
      const response = await axios.get("http://localhost:3000/productsa");
      setCatygory2(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    getData();
    getData2();
  }, [openl, open]);
  const pathname = window.location.pathname.slice(7);
  try {
    const el: any = document.getElementById(`${id}`);
    el.style.color = "#009398";
    const el1: any = document.getElementById(`product`);
    el1.style.color = "#009398";
  } catch (error) {}
  console.log("el1", e1?.id);

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
        <p className="mt-4 text-xl product" id="product">
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
      <ul className="flex gap-[46px] absolute top-28 start-[500px] uppercase text-3xl font-normal ">
        {catigory.map((e: any) => {
          return (
            <li
              className={`${
                ids?.id == e.id ? "text-[#009398]" : "text-[#A6A6A6]"
              }`}
              id={e.id}
              key={e.id}
            >
              <Link to={`/admin/products/${e.id}`}>{e.title}</Link>
            </li>
          );
        })}
      </ul>
      <ul className="absolute w-[1088px] mt-10 h-[100%] block top-[160px] start-[300px] overflow-y-auto ">
        <li className="w-[1068px] mb-10 h-[69px] flex bg-white rounded-3xl py-5 px-12">
          <p className="me-[120px]">Цена(сум)</p>
          <p className="mx-[120px]">Рамка</p>
          <p className="mx-[120px]">Время</p>
          <p className="ms-[120px]">Действия</p>
        </li>
        <table>
          {catigory2.map((e: any) => {
            if (e?.Catigories?.[0]?.id == ids?.id) {
              return (
                <tr
                  key={e.id}
                  className=" w-[1068px] mt-2 h-[69px] flex bg-white rounded-3xl py-5 px-12"
                >
                  <td className="w-[301px]">{e?.chegPrice}</td>
                  <td className="w-[141px]">{e?.ramka}</td>
                  <td className="w-[181px]">{e?.location}</td>
                  <td className="w-[200px] -ms-20">{e?.createdAt}</td>
                  <td className=" ms-20">
                    <button
                      className="absolute end-16"
                      onClick={() => deleteCategory(e.id)}
                    >
                      <img src="../../public/delete.png" alt="" />
                    </button>
                    <button
                      className="ms-20"
                      onClick={() =>
                        deleteCategory(e.Products?.[0]?.Orders?.id)
                      }
                    >
                      <img src="../../public/edit.svg" alt="" />
                    </button>
                  </td>
                </tr>
              );
            }
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

          <h1 className="text-3xl text-[#009398]">Добавить категории</h1>
          <form
            className="absolute top-[145px] start-15 flex-none"
            onSubmit={async (e) => {
              e.preventDefault();
              await fetch("http://localhost:3000/products", {
                method: "POST",
                body: JSON.stringify({
                  price: productPrice,
                  chegPrice: productChegPrice,
                  ramka: productRamka,
                  tavsiya: true,
                }),
              }).then((res) =>
                res.json().then((res) => {
                  fetch("http://localhost:3000/ordersCatygory", {
                    method: "POST",
                    body: JSON.stringify({
                      catigory_id: catigoryinp,
                      product_id: res.id,
                    }),
                  }).then((resp) =>
                    resp.json().then((resp) => {
                      console.log(resp);
                      setOpen(false);
                      getData();
                    })
                  );
                })
              );
            }}
          >
            <div className="flex">
              <span className="mx-9 mb-8">
                <label htmlFor="cat">Категории</label>
                <br />
                <select
                  name="cat"
                  id="cat"
                  onChange={(e) => {
                    setCatygoryinp(e.target.value);
                  }}
                  value={catigoryinp}
                >
                  {catigory.map((e: any) => (
                    <option key={e.id} value={e.id}>
                      {e.title}
                    </option>
                  ))}
                </select>
              </span>
              <span>
                <label htmlFor="ram">Рамка</label>
                <br />
                <input
                  id="ram"
                  value={productRamka}
                  onChange={(e) => {
                    setProductRamka(e.target.value);
                  }}
                  className="w-[378px] h-[33px] border-b outline-none focus:border-b"
                  type="text"
                />
              </span>
            </div>
            <div className="flex">
              <span className="mx-9">
                <label htmlFor="tel">цена (сум)</label>
                <br />
                <input
                  id="tel"
                  value={productPrice}
                  onChange={(e) => {
                    setProductPrice(e.target.value);
                  }}
                  className="w-[378px]  h-[33px] border-b outline-none focus:border-b"
                  type="text"
                />
              </span>
              <span>
                <label htmlFor="tel">Название</label>
                <br />
                <input
                  id="tel"
                  value={productChegPrice}
                  onChange={(e) => {
                    setProductChegPrice(e.target.value);
                  }}
                  className="w-[378px] h-[33px] border-b outline-none focus:border-b"
                  type="text"
                />
              </span>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Adminpro;
