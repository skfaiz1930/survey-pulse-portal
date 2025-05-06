
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { SurveyBlock } from "@/lib/survey-builder/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BlockEditor } from "@/components/survey-builder/BlockEditor";
import { BlockPreview } from "@/components/survey-builder/BlockPreview";

interface SortableBlockProps {
  block: SurveyBlock;
  isActive: boolean;
  onActivate: () => void;
  onChange: (updatedBlock: SurveyBlock) => void;
  onDelete: () => void;
}

export const SortableBlock = ({ 
  block, 
  isActive,
  onActivate,
  onChange,
  onDelete
}: SortableBlockProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: block.id,
    disabled: isActive
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 'auto'
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className={`${isActive ? 'ring-2 ring-primary' : ''} ${isDragging ? 'shadow-lg' : ''}`}
      onClick={!isActive ? onActivate : undefined}
    >
      <CardHeader className="py-2 px-4 bg-gray-50 flex flex-row items-center justify-between border-b">
        <div 
          {...attributes} 
          {...listeners}
          className="cursor-grab flex items-center p-1 rounded hover:bg-gray-200"
        >
          <GripVertical size={16} className="text-gray-500" />
        </div>
        <div className="text-sm font-medium text-gray-500">
          {block.type === 'text' && 'Text Input'}
          {block.type === 'multiple_choice' && 'Multiple Choice'}
          {block.type === 'checkbox' && 'Checkbox'}
          {block.type === 'dropdown' && 'Dropdown'}
          {block.type === 'date' && 'Date Picker'}
          {block.type === 'rating' && 'Rating'}
          {block.type === 'image' && 'Image'}
        </div>
        <div className="w-4" /> {/* Empty div for alignment */}
      </CardHeader>
      
      <CardContent className="p-4">
        {isActive ? (
          <BlockEditor 
            block={block} 
            onChange={onChange} 
            onDelete={onDelete} 
          />
        ) : (
          <BlockPreview block={block} />
        )}
      </CardContent>
    </Card>
  );
};
