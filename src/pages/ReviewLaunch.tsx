
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Rocket, Eye, Check, BarChart } from "lucide-react";

const ReviewLaunch = () => {
  const [currentStage] = useState(3);
  const navigate = useNavigate();
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [dryRunComplete, setDryRunComplete] = useState(false);
  
  // Sample survey statements
  const statements = [
    "My manager provides clear direction on what is expected of me.",
    "My manager gives me regular, constructive feedback on my performance.",
    "My manager recognizes my achievements and contributions.",
    "My manager supports my professional development.",
    "My manager creates an inclusive environment where everyone feels valued."
  ];
  
  // Sample test participants
  const testParticipants = [
    { id: "1", name: "Jane Smith", email: "jane.smith@company.com", department: "Marketing" },
    { id: "2", name: "John Doe", email: "john.doe@company.com", department: "Engineering" },
    { id: "3", name: "Lisa Johnson", email: "lisa.johnson@company.com", department: "HR" },
    { id: "4", name: "Mike Williams", email: "mike.williams@company.com", department: "Sales" },
    { id: "5", name: "Sarah Brown", email: "sarah.brown@company.com", department: "Product" }
  ];
  
  const handleParticipantSelect = (id: string) => {
    if (selectedParticipants.includes(id)) {
      setSelectedParticipants(selectedParticipants.filter((pid) => pid !== id));
    } else {
      setSelectedParticipants([...selectedParticipants, id]);
    }
  };
  
  const handleDryRunLaunch = () => {
    // Here you would launch the actual test survey
    // For this demo, we'll just simulate completion
    setTimeout(() => {
      setDryRunComplete(true);
    }, 1500);
  };
  
  const handleNext = () => {
    navigate("/survey-timeline");
  };
  
  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-survey-darkText">
          Review & Launch Survey
        </h2>
        <p className="text-survey-lightText mt-2">
          Review survey questions and conduct a test run before launching
        </p>
      </div>

      <Tabs defaultValue="review">
        <TabsList className="mb-6">
          <TabsTrigger value="review">Review Statements</TabsTrigger>
          <TabsTrigger value="dry-run">Dry Run</TabsTrigger>
        </TabsList>

        <TabsContent value="review">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Manager Statement Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {statements.map((statement, index) => (
                <div key={index} className="mb-8 last:mb-0">
                  <p className="font-medium text-survey-darkText mb-3">
                    Statement {index + 1}:
                  </p>
                  <p className="p-4 bg-gray-50 rounded-md border border-gray-200 text-survey-darkText">
                    "{statement}"
                  </p>
                  <div className="mt-4">
                    <p className="text-sm text-survey-lightText mb-2">
                      Response Scale:
                    </p>
                    <RadioGroup className="flex space-x-4 mt-2">
                      <div className="flex flex-col items-center">
                        <RadioGroupItem value="1" id={`q${index}-1`} />
                        <label htmlFor={`q${index}-1`} className="text-xs mt-1">
                          Strongly Disagree
                        </label>
                      </div>
                      <div className="flex flex-col items-center">
                        <RadioGroupItem value="2" id={`q${index}-2`} />
                        <label htmlFor={`q${index}-2`} className="text-xs mt-1">
                          Disagree
                        </label>
                      </div>
                      <div className="flex flex-col items-center">
                        <RadioGroupItem value="3" id={`q${index}-3`} />
                        <label htmlFor={`q${index}-3`} className="text-xs mt-1">
                          Neutral
                        </label>
                      </div>
                      <div className="flex flex-col items-center">
                        <RadioGroupItem value="4" id={`q${index}-4`} />
                        <label htmlFor={`q${index}-4`} className="text-xs mt-1">
                          Agree
                        </label>
                      </div>
                      <div className="flex flex-col items-center">
                        <RadioGroupItem value="5" id={`q${index}-5`} />
                        <label htmlFor={`q${index}-5`} className="text-xs mt-1">
                          Strongly Agree
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => document.getElementById("dry-run-tab")?.click()}
              >
                Continue to Dry Run
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="dry-run" id="dry-run-tab">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Select Test Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-survey-lightText mb-4">
                  Select up to 5 participants to send a test survey to before
                  launching to all employees.
                </p>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Select</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testParticipants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedParticipants.includes(
                              participant.id
                            )}
                            onChange={() =>
                              handleParticipantSelect(participant.id)
                            }
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </TableCell>
                        <TableCell>{participant.name}</TableCell>
                        <TableCell>{participant.email}</TableCell>
                        <TableCell>{participant.department}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-6 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={handleDryRunLaunch}
                    disabled={
                      selectedParticipants.length === 0 || dryRunComplete
                    }
                  >
                    {!dryRunComplete
                      ? "Send Test Surveys"
                      : "Test Surveys Sent"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 h-5 w-5" />
                  Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!dryRunComplete ? (
                  <div className="text-center py-8">
                    <p className="text-survey-lightText">
                      Run a test survey to see results preview here
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-1">
                        Average Response Score
                      </p>
                      <div className="h-8 bg-green-100 rounded-md flex items-center pl-3">
                        <span className="font-bold">4.2/5</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-1">Response Rate</p>
                      <div className="h-8 bg-blue-100 rounded-md flex items-center pl-3">
                        <span className="font-bold">100%</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">
                        Top Scoring Statement
                      </p>
                      <p className="text-xs italic">
                        "My manager creates an inclusive environment where
                        everyone feels valued."
                      </p>
                      <p className="text-xs font-bold mt-1">Score: 4.8/5</p>
                    </div>

                    <div className="mt-8 flex items-center text-green-600">
                      <Check className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">
                        Ready to Launch
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={!dryRunComplete}>
                  <Rocket className="mr-2 h-4 w-4" />
                  Launch Survey
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Launch Survey?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You're about to launch the survey to all participants. This
                    action cannot be undone. Are you sure you want to proceed?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleNext}>
                    Launch Survey
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ReviewLaunch;
