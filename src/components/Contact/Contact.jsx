import { MdPerson, MdPhone } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

export default function Contact({ contact: { id, name, number } }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      <div>
        <p>
          <MdPerson />
          {name}
        </p>
        <p>
          <MdPhone /> {number}
        </p>
      </div>
      <button onClick={handleDelete}> Delete </button>
    </>
  );
}
