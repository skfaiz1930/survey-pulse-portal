
import React from "react";
import { SurveyBlock } from "@/lib/survey-builder/types";
import { Trash, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface BlockEditorProps {
  block: SurveyBlock;
  onChange: (updatedBlock: SurveyBlock) => void;
  onDelete: () => void;
}

export const BlockEditor = ({ block, onChange, onDelete }: BlockEditorProps) => {
  const handleSettingChange = (key: keyof SurveyBlock['settings'], value: any) => {
    onChange({
      ...block,
      settings: {
        ...block.settings,
        [key]: value
      }
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    if (!Array.isArray(block.content)) return;
    
    const newContent = [...block.content];
    newContent[index] = value;
    
    onChange({
      ...block,
      content: newContent
    });
  };

  const addOption = () => {
    if (!Array.isArray(block.content)) return;
    
    onChange({
      ...block,
      content: [...block.content, `Option ${block.content.length + 1}`]
    });
  };

  const removeOption = (index: number) => {
    if (!Array.isArray(block.content)) return;
    
    onChange({
      ...block,
      content: block.content.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${block.id}-label`}>Question</Label>
        <Input
          id={`${block.id}-label`}
          value={block.settings.label}
          onChange={(e) => handleSettingChange('label', e.target.value)}
          placeholder="Enter question text"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`${block.id}-description`}>Description (Optional)</Label>
        <Textarea
          id={`${block.id}-description`}
          value={block.settings.description || ''}
          onChange={(e) => handleSettingChange('description', e.target.value)}
          placeholder="Add a description"
          rows={2}
        />
      </div>
      
      {(block.type === 'multiple_choice' || block.type === 'checkbox' || block.type === 'dropdown') && Array.isArray(block.content) && (
        <div className="space-y-2">
          <Label>Options</Label>
          <div className="space-y-2">
            {block.content.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeOption(index)}
                  disabled={block.content.length <= 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              onClick={addOption}
              size="sm"
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
        </div>
      )}
      
      {(block.type === 'text') && (
        <div className="space-y-2">
          <Label htmlFor={`${block.id}-placeholder`}>Placeholder Text</Label>
          <Input
            id={`${block.id}-placeholder`}
            value={block.settings.placeholder || ''}
            onChange={(e) => handleSettingChange('placeholder', e.target.value)}
            placeholder="Enter placeholder text"
          />
        </div>
      )}
      
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-2">
          <Switch 
            id={`${block.id}-required`}
            checked={block.settings.required}
            onCheckedChange={(checked) => handleSettingChange('required', checked)}
          />
          <Label htmlFor={`${block.id}-required`}>Required</Label>
        </div>
        
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={onDelete}
        >
          Delete Block
        </Button>
      </div>
    </div>
  );
};
