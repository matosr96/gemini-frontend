import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { institutionList } from "../../../redux/actions";
import { PartialBook } from "../../../types/book/books";
import { bookCreate } from "../../../redux/actions";
import styles from "./create.module.css";

interface Props {
  openModal: boolean;
  setOpenModal: Function;
}

const CreateBook = ({ setOpenModal, openModal }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signinUser = useSelector((state: any) => state.signinUser);
  const { userInfo } = signinUser;
  const { uuid } = userInfo;

  const signinInstitution = useSelector((state: any) => state.signinInstitution);
  const { InstitutionInfo } = signinInstitution;

  const listInstitution = useSelector((state: any) => state.listInstitution);
  const { loading, error, data } = listInstitution;

  const createBook = useSelector((state: any) => state.createBook);
  const { loading: LoadingCreate, error:errorCreate, success: successRegister } = createBook;

  console.log("INSTITUCION", data)

  const [state, setState] = useState("Bueno");

  const [book, setBook] = useState<PartialBook>({
    user: uuid,
    institution: InstitutionInfo.uuid,
    title: "",
    author: "",
    editorial: "",
    amount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      dispatch(bookCreate({ ...book, state: state }) as any);
      setOpenModal(false)
    } catch (error) {
      console.log(error)
    }
    
  };

  useEffect(() => {
    if(successRegister){
      () => setOpenModal(false)
    }
    dispatch(institutionList(uuid) as any);
  }, [successRegister, dispatch]);

  return (
    <div className={openModal ? styles.open_modal : styles.close_modal}>
      <div className={styles.container_form_book}>
        <div className={styles.header_form_book}>
          <h3>Registrar libros</h3>
          <button onClick={() => setOpenModal(!openModal)}>Cerrar</button>
        </div>
        <form className={styles.form_book} onSubmit={handleSubmit}>
          <div className={styles.container_input}>
            <span>Titulo del libro</span>
            <input
              name="title"
              id="title"
              value={book.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.container_input}>
            <span>Autor</span>
            <input
              name="author"
              id="author"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.container_input}>
            <span>Editorial</span>
            <input
              name="editorial"
              id="editorial"
              value={book.editorial}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.container_input}>
            <span>Cantidad</span>
            <input
              name="amount"
              id="amount"
              type="number"
              value={book.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.container_input}>
            <span>Estado fisico</span>
            <select
              className={styles.select_form_book}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="Bueno"> Bueno</option>
              <option value="Regular">Regular</option>
              <option value="Malo">Malo</option>
            </select>
          </div>
          <button>Guardar registro</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
