import { Icon } from "@iconify/react";
import { useCallback, useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import axios from "axios";

function App() {
  const [itemName, setItemName] = useState("");

  const [itemList, setItemList] = useState([
    {
      id: 0,
      name: "Bread",
      completed: false,
    },
    {
      id: 1,
      name: "Get Milk",
      completed: false,
    },
  ]);

  // const fetchData = async () => {
  //   const res = await axios.get(
  //     "https://wepuirejkqdmeaineqto.hasura.ap-south-1.nhost.run/api/rest/getplayers"
  //   );
  //   console.log(res.data);
  //   const items = res.data.players.map(player => {
  //     return {
  //       id: player.player_email,
  //       name: player.player_name,
  //       completed: false
  //     }
  //   })
  //   setItemList(items)
  // };
  const fetchData = async () => {
        const res = await axios.get(
      "http://localhost:8000/portfolio"
    );
    console.log(res.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleMarkAsCompleted = useCallback((id: number) => {
    // setItemList(itemList.map(item => item.id == id ? {...item, completed: item.completed } : item ))
    setItemList(
      itemList.map((item) =>
        item.id == id ? { ...item, completed: !item.completed } : item
      )
    );
  }, []);

  const handleDelete = (id: number) => {
    let tempItem = [...itemList];
    tempItem = tempItem.filter((item) => item.id != id);
    setItemList(tempItem);
  };

  const handleAddNewItem = useCallback(() => {
    const id = itemList.length;
    const itemToAdd = {
      id,
      name: itemName,
      completed: false,
    };

    setItemList([...itemList, itemToAdd]);
    setItemName("");
  }, [itemName, itemList]);

  const handleInputItem = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const index = parseInt(name);
      setItemList((prevItemList) =>
        prevItemList.map((item, i) =>
          i === index ? { ...item, name: value } : item
        )
      );
    },
    []
  );

  return (
    <div className="p-5">
      <div className="bg-blue-300 rounded-lg p-5 w-80">
        <div className="text-3xl font-bold mb-4">Todo List</div>
        <div className="space-y-4">
          {itemList.map((item, index) => (
            <div className="flex space-x-2 items-center" key={index}>
              {item.completed ? (
                <div className="flex space-x-2">
                  <div className="text-base p-2 bg-red-200 rounded-lg w-40 line-through">
                    {item.name}
                  </div>
                  <button
                    className="bg-green-100 rounded-lg p-2 hover:bg-green-200"
                    onClick={() => handleMarkAsCompleted(item.id)}
                  >
                    <Icon
                      className="text-2xl  stroke-green-700 "
                      icon="material-symbols:undo"
                    />
                  </button>
                </div>
              ) : (
                <InputComponent
                  handleInputItem={handleInputItem}
                  handleMarkAsCompleted={handleMarkAsCompleted}
                  index={index}
                  name={item.name}
                  id={item.id}
                  key={item.id}
                />
              )}

              <button
                className="bg-red-100 rounded-lg p-2 hover:bg-red-200"
                onClick={() => handleDelete(item.id)}
              >
                <Icon
                  className="text-2xl  stroke-red-700 "
                  icon="material-symbols-light:delete-outline"
                />
              </button>
            </div>
          ))}

          <div>
            <div className="text-base mb-1 font-semibold">Add New Item</div>
            <div className="flex space-x-2">
              <input
                type="text"
                className="appearance-none w-40 rounded-lg p-2"
                placeholder="Add New Item"
                onChange={(e) => setItemName(e.target.value)}
                value={itemName}
              />
              <button
                className="bg-sky-100 rounded-lg p-2 hover:bg-sky-200"
                onClick={handleAddNewItem}
              >
                <Icon className="text-2xl " icon="material-symbols:add" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
