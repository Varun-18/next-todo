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
      </div>
    </li>
  );
}
