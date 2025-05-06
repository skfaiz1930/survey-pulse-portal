
import React from "react";
import { SurveyBlock } from "@/lib/survey-builder/types";
import { Button } from "@/components/ui/button";
import { CheckCircle2, List, CircleDashed, FileText, Calendar, Image, Star } from "lucide-react";

interface BlockTypeMenuProps {
  onSelectBlockType: (blockType: SurveyBlock['type']) => void;
  onCancel: () => void;
}

type BlockTypeOption = {
  type: SurveyBlock['type'];
  label: string;
  icon: React.ReactNode;
  description: string;
}

export const BlockTypeMenu = ({ onSelectBlockType, onCancel }: BlockTypeMenuProps) => {
  const blockTypes: BlockTypeOption[] = [
    {
      type: 'text',
      label: 'Text',
      icon: <FileText className="h-5 w-5" />,
      description: 'Short or long text response'
    },
    {
      type: 'multiple_choice',
      label: 'Multiple Choice',
      icon: <List className="h-5 w-5" />,
      description: 'Select one from multiple options'
    },
    {
      type: 'checkbox',
      label: 'Checkbox',
      icon: <CheckCircle2 className="h-5 w-5" />,
      description: 'Select multiple options'
    },
    {
      type: 'dropdown',
      label: 'Dropdown',
      icon: <CircleDashed className="h-5 w-5" />,
      description: 'Select from a dropdown list'
    },
    {
      type: 'date',
      label: 'Date',
      icon: <Calendar className="h-5 w-5" />,
      description: 'Date picker'
    },
    {
      type: 'rating',
      label: 'Rating',
      icon: <Star className="h-5 w-5" />,
      description: 'Star or number rating'
    },
    {
      type: 'image',
      label: 'Image',
      icon: <Image className="h-5 w-5" />,
      description: 'Upload an image'
    }
  ];

  return (
    <div>
      <div className="mb-3">
        <h3 className="text-lg font-medium">Add a Block</h3>
        <p className="text-sm text-gray-500">Select a block type to add to your survey</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {blockTypes.map((blockType) => (
          <Button
            key={blockType.type}
            variant="outline"
            className="flex flex-col items-center justify-center p-4 h-auto"
            onClick={() => onSelectBlockType(blockType.type)}
          >
            <div className="mb-2">
              {blockType.icon}
            </div>
            <div className="text-sm font-medium">{blockType.label}</div>
            <div className="text-xs text-gray-500 mt-1">{blockType.description}</div>
          </Button>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
};
