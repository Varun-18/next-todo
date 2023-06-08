import { CheckBox } from "@mui/icons-material";
import axios from "axios";

export default function TodoItem({ item, index, setData }) {
  console.log(item.status);
  const changeStatus = async (e) => {
    console.log(e.target.checked);
    applyChange(item._id, e.target.checked);
  };
  const applyChange = async (id, value) => {
    const { data } = await axios.post("/api/updateStatus", { id, value });
    console.log(data);
    setData(data[0].taskList);
  };
  return (
    <li className="my-2">
      <div className="flex items-center text-xl">
        <input
          type="checkbox"
          className="scale-150 mx-4 w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          onChange={(event) => changeStatus(event)}
          checked={item.status}
        />
        <span style={{ textDecoration: item.status ? "line-through" : "none" }}>
          {item.task}
        </span>
        {item.status ? (
          <div className="mx-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="delete"
              width="25px"
              version="1.1"
              viewBox="0 0 29 29"
              fill="#fff"
            >
              <path d="M19.795 27H9.205a2.99 2.99 0 0 1-2.985-2.702L4.505 7.099A.998.998 0 0 1 5.5 6h18a1 1 0 0 1 .995 1.099L22.78 24.297A2.991 2.991 0 0 1 19.795 27zM6.604 8 8.21 24.099a.998.998 0 0 0 .995.901h10.59a.998.998 0 0 0 .995-.901L22.396 8H6.604z"></path>
              <path d="M26 8H3a1 1 0 1 1 0-2h23a1 1 0 1 1 0 2zM14.5 23a1 1 0 0 1-1-1V11a1 1 0 1 1 2 0v11a1 1 0 0 1-1 1zM10.999 23a1 1 0 0 1-.995-.91l-1-11a1 1 0 0 1 .905-1.086 1.003 1.003 0 0 1 1.087.906l1 11a1 1 0 0 1-.997 1.09zM18.001 23a1 1 0 0 1-.997-1.09l1-11c.051-.55.531-.946 1.087-.906a1 1 0 0 1 .905 1.086l-1 11a1 1 0 0 1-.995.91z"></path>
              <path d="M19 8h-9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm-8-2h7V4h-7v2z"></path>
            </svg>
          </div>
        ) : null}
      </div>
    </li>
  );
}
