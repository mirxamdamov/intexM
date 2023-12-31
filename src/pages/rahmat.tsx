import { useNavigate } from "react-router-dom";

export const Thenks = () => {
      const navigate = useNavigate();
    return (
      <div className="justify-center flex h-[100vh] items-center">
        <img
          src="../../public/backgaund.png"
          className="absolute h-[100vh] w-[100vw]"
          alt=""
        />
        <div className="relative w-[1130px] h-[584px]">
          <div className="bg-white rounded-3xl md:h-[584px] h-[535px]" />
          <center className="flex justify-center ">
            <img
              className="absolute top-[49px]"
              src="../../public/✔.svg"
              alt=""
            />

            <p className="text-6xl font-medium absolute top-[310px]">Raxmat!</p>
            <p className="absolute top-[433px] text-xl">
              Buyurtmangiz muvaffaqiyatli ro’yxatdan o’tdi. Yaqin vaqt
              oralig’ida siz bilan bog’lanamiz
            </p>
          </center>

          <button
            className="absolute top-9 end-14"
            onClick={(e) => {
                navigate('/')
            }}
          >
            <img src="../../public/x.png" alt="" />
          </button>
        </div>
      </div>
    );
}