
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { SurveyState, SurveyBlock } from "@/lib/survey-builder/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlockTypeMenu } from "@/components/survey-builder/BlockTypeMenu";
import { BlockEditor } from "@/components/survey-builder/BlockEditor";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableBlock } from "@/components/survey-builder/SortableBlock";

interface BuilderCanvasProps {
  surveyState: SurveyState;
  onSurveyChange: (updatedSurvey: SurveyState) => void;
}

export const BuilderCanvas = ({ surveyState, onSurveyChange }: BuilderCanvasProps) => {
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddBlock = (blockType: SurveyBlock['type']) => {
    const newBlock: SurveyBlock = {
      id: `block_${Date.now()}`,
      type: blockType,
      settings: {
        required: false,
        label: `New ${blockType} question`,
        description: '',
        placeholder: ''
      },
      content: blockType === 'multiple_choice' ? ['Option 1', 'Option 2', 'Option 3'] : []
    };
    
    onSurveyChange({
      ...surveyState,
      blocks: [...surveyState.blocks, newBlock]
    });
    
    setShowBlockMenu(false);
    setActiveBlockId(newBlock.id);
  };

  const handleBlockChange = (updatedBlock: SurveyBlock) => {
    onSurveyChange({
      ...surveyState,
      blocks: surveyState.blocks.map(block => 
        block.id === updatedBlock.id ? updatedBlock : block
      )
    });
  };

  const handleBlockDelete = (blockId: string) => {
    onSurveyChange({
      ...surveyState,
      blocks: surveyState.blocks.filter(block => block.id !== blockId)
    });
    
    if (activeBlockId === blockId) {
      setActiveBlockId(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = surveyState.blocks.findIndex(block => block.id === active.id);
      const newIndex = surveyState.blocks.findIndex(block => block.id === over.id);
      
      onSurveyChange({
        ...surveyState,
        blocks: arrayMove(surveyState.blocks, oldIndex, newIndex)
      });
    }
  };

  return (
    <div className="p-4 min-h-[400px] bg-white">
      {surveyState.blocks.length === 0 && !showBlockMenu ? (
        <div className="flex flex-col items-center justify-center h-[300px] border-2 border-dashed border-gray-200 rounded-md">
          <p className="text-gray-500 mb-4">Your survey is empty</p>
          <Button 
            variant="outline" 
            onClick={() => setShowBlockMenu(true)}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Add your first question
          </Button>
        </div>
      ) : (
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={surveyState.blocks.map(block => block.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {surveyState.blocks.map((block) => (
                <SortableBlock 
                  key={block.id} 
                  block={block} 
                  isActive={block.id === activeBlockId}
                  onActivate={() => setActiveBlockId(block.id)}
                  onChange={handleBlockChange}
                  onDelete={() => handleBlockDelete(block.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {showBlockMenu ? (
        <div className="mt-4">
          <Card className="p-4">
            <BlockTypeMenu onSelectBlockType={handleAddBlock} onCancel={() => setShowBlockMenu(false)} />
          </Card>
        </div>
      ) : (
        <div className="mt-4 flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => setShowBlockMenu(true)}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Add Question
          </Button>
        </div>
      )}
    </div>
  );
};
