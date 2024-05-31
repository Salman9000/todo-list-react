import { Icon } from '@iconify/react'
import { FC, memo } from 'react';


interface InputComponentProps {
  index: number;
  name: string;
  id: number;
  handleInputItem: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMarkAsCompleted: (id: number) => void; // Assuming id is a number
}

const InputComponent: FC<InputComponentProps> = memo(({ index, handleInputItem, name, id, handleMarkAsCompleted }) => {
  return (
    <div className="flex space-x-2">
    <input
  type="text"
  name={`${index}`}
  className="appearance-none text-base p-2 bg-blue-200 rounded-lg w-40"
  placeholder="Add New Item"
  onChange={handleInputItem}
  value={name}
/>
    <button
      className="bg-green-100 rounded-lg p-2 hover:bg-green-200"
      onClick={() => handleMarkAsCompleted(id)}
    >
      <Icon
        className="text-2xl  stroke-green-700 "
        icon="mdi:tick"
      />
    </button>
  </div>
  )
});

export default InputComponent