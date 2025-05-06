
import React from "react";
import { SurveyBlock } from "@/lib/survey-builder/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlockPreviewProps {
  block: SurveyBlock;
}

export const BlockPreview = ({ block }: BlockPreviewProps) => {
  const { settings } = block;
  
  return (
    <div className="space-y-2 pointer-events-none">
      <div className="flex items-center space-x-2">
        <h3 className="text-base font-medium">{settings.label}</h3>
        {settings.required && (
          <Badge variant="outline" className="text-xs">Required</Badge>
        )}
      </div>
      
      {settings.description && (
        <p className="text-sm text-gray-500">{settings.description}</p>
      )}
      
      <div className="mt-2">
        {block.type === 'text' && (
          <Textarea 
            placeholder={settings.placeholder || "Type your answer here..."} 
            disabled
          />
        )}
        
        {block.type === 'multiple_choice' && Array.isArray(block.content) && (
          <RadioGroup disabled defaultValue={block.content[0]}>
            {block.content.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${block.id}-option-${index}`} />
                <Label htmlFor={`${block.id}-option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
        
        {block.type === 'checkbox' && Array.isArray(block.content) && (
          <div className="space-y-2">
            {block.content.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={`${block.id}-option-${index}`} disabled />
                <Label htmlFor={`${block.id}-option-${index}`}>{option}</Label>
              </div>
            ))}
          </div>
        )}
        
        {block.type === 'dropdown' && Array.isArray(block.content) && (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {block.content.map((option, index) => (
                <SelectItem key={index} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        
        {block.type === 'date' && (
          <div className="flex items-center border rounded-md p-2 bg-background">
            <Calendar className="h-4 w-4 mr-2 opacity-50" />
            <span className="text-sm text-gray-500">Select a date</span>
          </div>
        )}
        
        {block.type === 'rating' && (
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Button key={index} size="sm" variant="outline" className="h-8 w-8 p-0">
                {index + 1}
              </Button>
            ))}
          </div>
        )}
        
        {block.type === 'image' && (
          <div className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-500">Upload an image</p>
            <Button variant="outline" size="sm" className="mt-2" disabled>Choose File</Button>
          </div>
        )}
      </div>
    </div>
  );
};
