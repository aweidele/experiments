import React, { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

const initialItems = [
  { id: "1", name: "Item 1", rank: 10 },
  { id: "2", name: "Item 2", rank: 23 },
  { id: "3", name: "Item 3", rank: 31 },
  { id: "4", name: "Item 4", rank: 49 },
];

const DragAndDropList = () => {
  const [items, setItems] = useState(initialItems);
  console.log(items);

  // Sensors for mouse and keyboard support
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex).map((item, index) => ({
      ...item,
      rank: index + 1, // Update rank
    }));

    setItems(newItems);
  };

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} name={item.name} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <ul>
        {items.map((item) => (
          <li key={`l-${item.id}`}>
            {item.name} / {item.rank}
          </li>
        ))}
      </ul>
    </>
  );
};

export default DragAndDropList;
