  import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal } from "../components/modal.component";
// import Btn from "../components/btn";

const navigation1: any = [
  { name: "Ramkali basseynlar", href: "#Ramkali basenlar", current: false },
  {
    name: "Shishiriladigan basseynlar",
    href: "#Shishiriladigan basseynlar",
    current: false,
  },
];
// async function getProducts() {
//   const products = await fetch("http://localhost:3000/");
//   console.log(products);
// }

//251

function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [arr1, setArr] = useState<any>([]);
  const [navigation, setNavigation] = useState<any>([]);
  const [name, setName] = useState<string>("");
  const [nameErr, setNameErr] = useState<boolean>(false);
  const [nameErr2, setNameErr2] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(998);
  const [numberErr, setNumberErr] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => {
        console.log("res", res?.data);
        setArr(res?.data);
      })
      .catch((err) => console.log("err", err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/catigory")
      .then((res) => {
        console.log("res1", res?.data);
        setNavigation(res?.data);
      })
      .catch((err) => console.log("err", err));
  }, []);
  const handleButtonClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

    const validate = () => {
      if (name === "" || name.length < 3) {
        setNameErr(true);
      } else {
        setNameErr(false);
      }
      if (!number || number.toString().length !== 12) {
        setNumberErr(true);
      } else {
        setNumberErr(false);
      }
    };
  return (
    <main>
      <nav className="bg-[#00979C] h-20 ">
        <div className="container mx-auto flex justify-between px-3 items-center">
          <p className="font-semibold -2xl text-lg text-white absolute top-5">
            INTEX-MARKET.UZ
          </p>
          <div className="flex absolute end-10 top-5">
            <p>
              <img src="../../public/telegram.png" alt="" />
            </p>
            <p>
              <img src="../../public/insta.png" alt="" />
            </p>
            <p>
              <img src="../../public/language.png" alt="" />
            </p>
          </div>
          <div className="mt-5 mx-auto">
            {navigation.map((item: any) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="lg:inline-block hidden mx-5  justify-center rounded text-lg text-white"
              >
                {item.title}
              </a>
            ))}
          </div>
          <div className="lg:hidden absolute end-3 top-7">
            <button onClick={handleButtonClick} className="focus:outline-none">
              {isMenuOpen ? (
                <></>
              ) : (
                <img src="../../public/Hamburger_icon.svg" width="20" alt="" />
              )}
            </button>
          </div>

          <div
            ref={menuRef}
            className={`lg:hidden ${
              isMenuOpen ? "flex" : "hidden"
            } lg:flex lg:items-center lg:w-auto w-full`}
          >
            <div className="text-sm lg:flex-grow  absolute lg:top-5 lg:start-52 start-0   text-white lg:h-[0] h-[100vh] w-[284px]   lg:bg-[transparent] bg-[#009398]">
              <img
                src="../../public/right.png"
                className="absolute -right-[106px] w-[106px] h-[100%]"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                alt=""
              />
              <center className="font-semibold  text-2xl text-white mt-4 ">
                INTEX-MARKET.UZ
              </center>

              <div className="mt-16">
                {navigation.map((item: any) => (
                  <a
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    key={item.id}
                    href={`#${item.id}`}
                    className=" mt-[30px] lg:inline-block py-4 lg:mt-0 w-[236px] m-auto bg-white  hover:text-gray-500 flex justify-center rounded text-lg text-[#009398]"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <a
                href="tel:999110204"
                className=" mt-[239px] lg:inline-block py-4 lg:mt-0 w-[236px] m-auto bg-[#139D4B]  hover:bg-gray-500 flex justify-center rounded text-lg text-white"
              >
                <img src="../../public/tel.svg" className="mr-4" alt="" />
                Qo'ng'iroq qilish
              </a>
              <a
                // href=
                className=" mt-[30px] lg:inline-block py-4 lg:mt-0 w-[236px] m-auto bg-white  hover:text-gray-500 flex justify-center rounded text-lg text-[#009398]"
              >
                <img
                  src="../../public/tele.svg"
                  className="mr-4 ms-[-50px]"
                  alt=""
                />
                Telegram
              </a>
              <a
                // href=
                className=" mt-[30px] lg:inline-block py-4 lg:mt-0 w-[236px] m-auto bg-white  hover:text-gray-500 flex justify-center rounded text-lg text-[#009398]"
              >
                <img
                  src="../../public/insta1.jpg"
                  className="w-[30px] mr-4 ms-[-50px]"
                  alt=""
                />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </nav>
      <header>
        <div className="flex justify-center">
          <img src="../../public/index.png" alt="" />
        </div>
        {arr1.map((e: any) => {
          console.log("e", e);

          return (
            <div key={e?.id} id={e?.id}>
              <span className="py-[22px] flex justify-center text-2xl my-24 text-white bg-[#009398] shadow-[0px 10px 10px 0px rgba(0, 0, 0, 0.25)]">
                {e?.title}
              </span>
              {e?.Products?.map((item: any) => {
                return (
                  <span
                    key={item?.id}
                    className=" lg:mx-[19px] mx-6 mt-5 inline-block w-[340px] h-[284px]  bg-black"
                    style={{
                      borderRadius: "0px 35px 35px 35px",
                      background: "#FFF",
                      boxShadow: " 0px 5px 10px 0px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    {item?.tavsiya === true ? (
                      <p
                        className="text-white bg-green-700 inline-block py-1 ps-5 pe-10"
                        style={{
                          borderRadius: "0px 0px 10px 0px",
                          boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        Chegirma
                      </p>
                    ) : (
                      <p
                        className="text-white bg-red-700 inline-block py-1 ps-5 pe-10"
                        style={{
                          borderRadius: "0px 0px 10px 0px",
                          background: "#ED2020",
                          boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        sotuvda yo'q
                      </p>
                    )}
                    <center>
                      <h1 className="mt-6 text-xl text-[#009398] font-serif font-bold  ">
                        {item.ramka}
                      </h1>
                      <span>
                        <img
                          src="../../public/bassen.svg"
                          className="mt-5"
                          alt=""
                        />
                        <section>
                          <img
                            src="../../public/x.svg"
                            className="mt-2"
                            alt=""
                          />
                          <p className="font-mono text-[#009398]">
                            {item.bottom}
                          </p>
                        </section>
                        <section className="flex ms-[280px] -mt-32">
                          <img
                            src="../../public/y.svg"
                            className="mt-2"
                            alt=""
                          />
                          <p className="font-mono text-[#009398] ms-1 mt-5">
                            {item.top}
                          </p>
                        </section>
                        <div className="flex ms-10 relative">
                          <section className="text-start ms-10 mt-[61px]">
                            <del>{item.chegPrice} so'm</del>
                            <p className="text-xl">{item.price} so'm</p>
                          </section>
                          <section className="absolute end-5 bottom-2">
                            <button
                              className="py-1 px-2 "
                              style={{
                                borderRadius: " 0px 10px",
                                background: " #FFE600",
                                boxShadow:
                                  "0px 1px 7px 0px rgba(0, 0, 0, 0.25)",
                              }}
                              onClick={() => setOpen(true)}
                            >
                              Buyurtma qilish
                            </button>
                            <Modal
                              item={item}
                              open={open}
                              onClose={() => setOpen(false)}
                            >
                              hello
                            </Modal>
                          </section>
                        </div>
                      </span>
                    </center>
                  </span>
                );
              })}
            </div>
          );
        })}
        <img
          src="../../public/yetkazish.png"
          className="w-[100vw] mt-10"
          alt=""
        />
        <div className="mt-10 justify-end relative md:flex">
          <section className="flex">
            <img src="../../public/ishchi.png" alt="" />
            <div>
              <p className="md:text-[40px] text-lg font-normal ">Tajriba</p>
              <p className="md:text-[24px] md:mt-2 text-sm md:w-[5%] ">
                Xodimlarimizning professionalligi
              </p>
            </div>
          </section>
          <section className="flex">
            <img src="../../public/mashina.png" alt="" />
            <div>
              <p className="md:text-[40px] text-lg font-normal ">
                Yetkazib berish
              </p>
              <p className="md:text-[24px] md:mt-2 text-sm md:w-[80%] ">
                Shahar bo’ylab bepul yetkazib berish
              </p>
            </div>
          </section>
          <section className="flex">
            <img src="../../public/medal.png" alt="" />
            <div>
              <p className="md:text-[40px] text-lg font-normal ">
                Yetkazib berish
              </p>
              <p className="md:text-[24px] md:mt-2 text-sm md:w-[80%] ">
                Shahar bo’ylab bepul yetkazib berish
              </p>
            </div>
          </section>
        </div>
        <img
          src="../../public/intex-t.png"
          className="mt-10 w-[100vw]"
          alt=""
        />
        <div className="mt-10 ms-5 md:flex justify-between font-normal">
          <p className="md:w-[503px] w-[95vw] text-2xl font-normal">
            Intex basseynlari - bu butun oila uchun yoqimli dam olish uchun
            mo'ljallangan arzon, yuqori sifatli, ishonchli va ekologik toza
            mahsulotlar. Basseyn har qanday hovliga to'liq o'rnatilishi va yozda
            faol foydalanilishi mumkin. Basseyn sizga yorqin his-tuyg'ularni
            beradi va issiq yoz kunlarida sizni jaziramadan qutqaradi.
          </p>
          <section>
            <p className="md:w-[535px] w-[95vw] md:mt-0 mt-3 text-2xl  font-normal">
              Intex Basseynlari afzalliklarning kengligi bilan ajralib turadi,
              quyida ulardan eng muhimlarini ajratib ko'rsatish mumkin:
            </p>
            <img src="../../public/list.png" alt="" className="mt-3" />
          </section>
        </div>
        <div className="md:flex justify-around mt-10 pb-10 bg-[#009398] text-white ">
          <section className="mt-5">
            <center className="w-[250px] text-2xl">
              Bepul konsultatsiya yordami uchun
            </center>
            <form onSubmit={async (e) => {
              e.preventDefault()
                 const registerOptions = {
                   method: "POST",
                   url: "http://localhost:3000/users",
                   data: JSON.stringify({
                     username: name,
                     phone_number: number,
                   }),
                 };
                 const respose = await axios.request(registerOptions).then((e) => {
                    setName('')
                    setNumber(998)
                  }).catch(e => {
                  console.log(e);
                 });
            }}>
              <div className="relative">
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="my-5 md:-ms-10 ms-5 h-[61.824px] block w-[359.702px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="my-5 md:-ms-10 ms-5 w-[359.702px] block mt-5 h-[61.824px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 me-10"
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
              <button
                className="bg-[#FFE600] px-10 py-2 rounded-lg mt-4 md:m-0 -ms-[600px]"
                style={{ boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.25)" }}
                onClick={validate}
              >
                konsultatsiya
              </button>
            </form>
          </section>
          <img src="../../public/footer.png" alt="" />
        </div>
      </header>
    </main>
  );
}

export default Home;

// gap-[19px] font-medium xl:flex hidden ms-[150px] text-xl
