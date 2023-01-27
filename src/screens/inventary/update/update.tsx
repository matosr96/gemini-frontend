import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookUpdate, institutionList } from "../../../redux/actions";
import { Book, PartialBook } from "../../../types/book/books";
import styles from "./update.module.css";

interface Props {
  openModalUpdate: boolean;
  setOpenModalUpdate: Function;
  bookSelected: Book;
}

const UpdateBook = ({
  setOpenModalUpdate,
  openModalUpdate,
  bookSelected,
}: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title } = bookSelected;

  console.log("selecionado", title);

  const signinUser = useSelector((state: any) => state.signinUser);
  const { userInfo } = signinUser;
  const { uuid } = userInfo;

  const listInstitution = useSelector((state: any) => state.listInstitution);
  const { loading, error, data } = listInstitution;

  const signinInstitution = useSelector(
    (state: any) => state.signinInstitution
  );
  const { InstitutionInfo } = signinInstitution;

  const updateBook = useSelector((state: any) => state.updateBook);
  const {
    loading: LoadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = updateBook;

  console.log("INSTITUCION", data);

  const [state, setState] = useState("Bueno");

  const [book, setBook] = useState<PartialBook>({
    user: uuid,
    institution: InstitutionInfo.uuid,
    title: title,
    author: bookSelected && bookSelected.author,
    editorial: bookSelected && bookSelected.editorial,
    amount: bookSelected && bookSelected.amount,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      dispatch(bookUpdate(bookSelected && bookSelected.uuid, { ...book, state: state }) as any);
      setOpenModalUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (successUpdate) {
      window.location.reload();
    }

    setBook((prev) => ({
      ...prev,
      title: bookSelected.title,
      author: bookSelected.author,
      editorial: bookSelected.editorial,
      amount: bookSelected.amount,
    }));
    dispatch(institutionList(uuid) as any);
  }, [successUpdate, dispatch, bookSelected]);

  return (
    <div className={openModalUpdate ? styles.open_modal : styles.close_modal}>
      <div className={styles.container_form_book}>
        <div className={styles.header_form_book}>
          <h3>Actualizar libros</h3>
          <button onClick={() => setOpenModalUpdate(!openModalUpdate)}>
            Cerrar
          </button>
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

export default UpdateBook;
