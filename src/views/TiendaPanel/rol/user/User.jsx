import Button from "../../left/Button";
import { BiEdit } from "react-icons/bi";

export default function User({ setId }) {
<<<<<<< HEAD
    return (
        <>
            {/* Crear Producto */}
            <Button
                div="flex bg-green-200 justify-center p-2 rounded-lg mt-3 mb-3 hover:bg-sky-700 cursor-pointer"
                text="Historial de compra"
                buttonclassName="flex items-center font-bold"
                icon={<BiEdit className="mr-2" />}
                f={() => setId("crear")}
            />
        </>
    )
=======
  return (
    <>
      {/* Historial de Compras */}
      <Button
        div="flex bg-green-200 justify-center p-2 rounded-lg mt-3 mb-3 hover:bg-sky-700 cursor-pointer"
        text="Historial de compra"
        buttonclassName="flex items-center font-bold"
        icon={<BiEdit className="mr-2" />}
        f={() => setId("historial")}
      />
    </>
  );
>>>>>>> 22f6fd5882306a2cae4d94e9a16326ebdaf52e09
}
