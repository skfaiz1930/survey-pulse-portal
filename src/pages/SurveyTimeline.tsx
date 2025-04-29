
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { addDays, format, isBefore, isAfter } from "date-fns";
import { Calendar as CalendarIcon, Clock, BellRing } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SurveyTimeline = () => {
  const [currentStage] = useState(4);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const today = new Date();
  const defaultStartDate = addDays(today, 7);
  const defaultEndDate = addDays(today, 21);
  
  const [startDate, setStartDate] = useState<Date | undefined>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date | undefined>(defaultEndDate);
  const [reminders, setReminders] = useState({
    startReminder: true,
    midwayReminder: true,
    finalReminder: true
  });
  
  const handleStartDateChange = (date: Date | undefined) => {
    if (date && endDate && isAfter(date, endDate)) {
      toast({
        variant: "destructive",
        title: "Invalid Date Range",
        description: "Start date cannot be after end date",
      });
      return;
    }
    setStartDate(date);
  };
  
  const handleEndDateChange = (date: Date | undefined) => {
    if (date && startDate && isBefore(date, startDate)) {
      toast({
        variant: "destructive",
        title: "Invalid Date Range",
        description: "End date cannot be before start date",
      });
      return;
    }
    setEndDate(date);
  };
  
  const handleReminderToggle = (key: keyof typeof reminders) => {
    setReminders({
      ...reminders,
      [key]: !reminders[key]
    });
  };
  
  const handleNext = () => {
    if (!startDate || !endDate) {
      toast({
        variant: "destructive",
        title: "Missing Dates",
        description: "Please select both start and end dates",
      });
      return;
    }
    
    navigate("/track-progress");
  };
  
  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-survey-darkText">Choose Survey Timeline</h2>
        <p className="text-survey-lightText mt-2">Set your survey dates and configure reminder settings</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              Survey Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-survey-darkText font-medium mb-3">Start Date</p>
                <div className="border rounded-md p-4">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={handleStartDateChange}
                    disabled={(date) => isBefore(date, today)}
                    className="rounded-md border"
                  />
                </div>
                {startDate && (
                  <p className="text-sm mt-2 text-survey-lightText">
                    Selected: {format(startDate, 'PPP')}
                  </p>
                )}
              </div>
              
              <div>
                <p className="text-survey-darkText font-medium mb-3">End Date</p>
                <div className="border rounded-md p-4">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={handleEndDateChange}
                    disabled={(date) => startDate ? isBefore(date, startDate) : isBefore(date, today)}
                    className="rounded-md border"
                  />
                </div>
                {endDate && (
                  <p className="text-sm mt-2 text-survey-lightText">
                    Selected: {format(endDate, 'PPP')}
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-survey-darkText font-medium mb-4">Survey Duration</p>
              <div className="bg-gray-50 p-4 rounded-md">
                {startDate && endDate ? (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-survey-primary" />
                    <p>
                      Your survey will run for{" "}
                      <span className="font-bold">
                        {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))}
                      </span>{" "}
                      days
                    </p>
                  </div>
                ) : (
                  <p className="text-survey-lightText">Please select both start and end dates</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BellRing className="mr-2 h-5 w-5" />
              Reminder Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="start-reminder">Survey Launch Reminder</Label>
                  <p className="text-sm text-survey-lightText">
                    Notify participants when survey starts
                  </p>
                </div>
                <Switch
                  id="start-reminder"
                  checked={reminders.startReminder}
                  onCheckedChange={() => handleReminderToggle("startReminder")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="midway-reminder">Midway Reminder</Label>
                  <p className="text-sm text-survey-lightText">
                    Send reminder halfway through survey period
                  </p>
                </div>
                <Switch
                  id="midway-reminder"
                  checked={reminders.midwayReminder}
                  onCheckedChange={() => handleReminderToggle("midwayReminder")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="final-reminder">Final Reminder</Label>
                  <p className="text-sm text-survey-lightText">
                    Send reminder 2 days before survey closes
                  </p>
                </div>
                <Switch
                  id="final-reminder"
                  checked={reminders.finalReminder}
                  onCheckedChange={() => handleReminderToggle("finalReminder")}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleNext}>
              Set Timeline
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SurveyTimeline;
