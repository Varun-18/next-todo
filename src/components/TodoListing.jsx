import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import AlertDialog from "./Dialog";
import TodoItem from "./TodoItem";

const TodoListing = () => {
  let [data, setData] = useState([]);

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    const { data } = await axios.get("/api/getTask");
    // console.log(data, "**** did mount ****");
    if (data[0]) {
      setData(data[0].taskList);
    }
  };

  return (
    <div>
      <div>
        {_.size(data) > 0 ? (
          <ul>
            {data.map((item, index) => (
              <TodoItem
                key={item._id}
                index={index}
                item={item}
                setData={setData}
              />
            ))}
          </ul>
        ) : (
          "no Task Found yet"
        )}
      </div>
      <div className="absolute bottom-14 right-4">
        <AlertDialog setData={setData} />
      </div>
    </div>
  );
};

export default TodoListing;
