import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<number>();
  const [isAdmin, setAdmin] = useState<boolean>(false);
  const [nameErr, setNameErr] = useState<boolean>(false);
  const [nameErr2, setNameErr2] = useState<boolean>(false);
  const [numberErr, setNumberErr] = useState<boolean>(false);
  const navigate = useNavigate();

  const validate = () => {
    if (name === "" || name.length < 3) {
      setNameErr(true);
    } else {
      setNameErr(false);
    }
    if (!number || number.toString().length !== 9) {
      setNumberErr(true);
    } else {
      setNumberErr(false);
    }
  };
  return (
    <div className="flex justify-center h-[100vh] items-center">
      <img
        src="../../public/bg.png"
        className="absolute w-[100vw] h-[100vh]"
        alt=""
      />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const registerOptions = {
            method: "GET",
            url: `http://localhost:3000/users/${name}`,
            data: JSON.stringify({
              username: name,
              phone_number: number,
            }),
          };
          const respose: any = await axios
            .request(registerOptions)
            .then((e) => {
              if (e?.data?.phone_number == number) {
                setAdmin(true);
                localStorage.setItem("isAdmin", "true");
                localStorage.setItem("name", e.data.username);
                navigate("/admin");
              }

              setName("");
              setNumber(0);
            })
            .catch((e) => {
              console.log(e);
            });
        }}
        className="text-center fixed w-[621px] rounded-xl h-[519px] bg-white"
      >
        <h1 className="text-5xl font-medium uppercase text-[#009398] mt-9 mb-4">
          Intex-market.uz
        </h1>
        <p className="text-2xl w-[547px] ms-7 font-semibold text-[#A3A3A3]">
          Введите имя пользователя и пароль, чтобы получить доступ к системе.
        </p>
        <input
          type="name"
          className="ms-36 my-5 w-[359.702px] block mt-5 h-[61.824px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 me-10"
          placeholder="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameErr && (
          <p className="text-red-500 absolute top-44 start-36">
            Your Name is invalid
          </p>
        )}
        <input
          type="string"
          className="ms-36 my-5 w-[359.702px] block mt-5 h-[61.824px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 me-10"
          placeholder="Telefon raqamingiz"
          value={number}
          onChange={(e) => setNumber(+e.target.value)}
        />
        {numberErr && (
          <p className="text-red-500 absolute top-64 start-36">
            Your Number is invalid
          </p>
        )}
        <button
          className="bg-[#FFE600] px-10 py-2 rounded-lg mt-4 md:m-0 -ms-[600px]"
          style={{ boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.25)" }}
          onClick={validate}
        >
          submit
        </button>
      </form>
    </div>
  );
}
export default Admin;
