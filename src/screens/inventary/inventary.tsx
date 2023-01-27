import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import { bookDelete, bookList, institutionList } from "../../redux/actions";
import { useDispatch } from "../../redux/store";
import { Book, PartialBook } from "../../types/book/books";
import CreateBook from "./create/create";
import styles from "./inventary.module.css";
import UpdateBook from "./update/update";

const Inventary = () => {
  
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const signinUser = useSelector((state: any) => state.signinUser);
  const { userInfo } = signinUser;
  const { uuid } = userInfo;

  const signinInstitution = useSelector((state: any) => state.signinInstitution);
  const { InstitutionInfo } = signinInstitution;
  const { uuid: uuid_in } = InstitutionInfo;

  console.log(InstitutionInfo)

  const listBook = useSelector((state: any) => state.listBook);
  const { loading, error, data: books } = listBook;

  const deleteBook = useSelector((state: any) => state.deleteBook);
  const { success: successDelete } = deleteBook;

  console.log(books);

  const listInstitution = useSelector((state: any) => state.listInstitution);
  const { data: institution } = listInstitution;

  const defaultBook = {
    uuid: "",
    user: "",
    institution: "",
    title: "",
    author: "",
    editorial: "",
    amount: 0,
    state: "",
  };
  const [selectedBook, setSelectedBook] = useState<Book>({...defaultBook});
  const openUpdate = (book: Book) => {
    console.log(book)
    setSelectedBook(book);
    setOpenModalUpdate(!openModalUpdate);
  };

  const deleteHandler = (uuid: string): void => {
    dispatch(bookDelete(uuid) as any);
  };

  useEffect(() => {
    dispatch(institutionList(uuid) as any);
    dispatch(bookList(InstitutionInfo.uuid) as any);
  }, [dispatch, successDelete]);

  return (
    <>
      <Header />
      <div className={styles.container_inventary}>
        <div className={styles.header_inventary}>
          <h2>Inventarios</h2>
          <div className={styles.container_btn}>
          <button onClick={() => setOpenModal(!openModal)}>
            Crear Registro
          </button>
          <Link to={"/report"} className={styles.btn_link}>
            Reportes
          </Link>
          </div>
          
        </div>

        <div className={styles.body_inventary}>
          <div className={styles.container_table_inventary}>
            <table>
              <thead>
                <tr>
                  <th>Titulo </th>
                  <th>Autor </th>
                  <th>Editorial</th>
                  <th>Cantidad</th>
                  <th>Estado Fisico</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {books?.map((book: Book) => (
                  <tr key={book.uuid}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.editorial}</td>
                    <td>{book.amount}</td>
                    <td>{book.state}</td>
                    <td>
                      <div className={styles.container_actions}>
                        <button onClick={() => openUpdate(book)}>
                          <i className="bx bxs-edit"></i>
                        </button>
                        <button onClick={() => deleteHandler(book.uuid)}>
                          <i className="bx bxs-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CreateBook openModal={openModal} setOpenModal={setOpenModal} />
      <UpdateBook
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        bookSelected={selectedBook}
      />
    </>
  );
};

export default Inventary;
