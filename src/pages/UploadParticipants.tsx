
import React, { useState, useRef } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, Download, Upload, CheckCircle, XCircle, Edit, Database, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ValidationError {
  row: number;
  field: string;
  message: string;
  value?: string;
}

const UploadParticipants = () => {
  const [searchParams] = useSearchParams();
  const surveyId = searchParams.get("surveyId");
  const [currentStage] = useState(2);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<Array<Record<string, string>>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Sample data for available surveys
  const availableSurveys = [
    { id: "1", name: "Employee Engagement 2025" },
    { id: "2", name: "Management Effectiveness" },
    { id: "3", name: "Work Environment Assessment" },
    { id: "4", name: "Remote Work Satisfaction" },
    { id: "5", name: "New Hire Onboarding Feedback" }
  ];
  
  const [selectedSurvey, setSelectedSurvey] = useState<string>(surveyId || "1");
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-gray-50");
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-gray-50");
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-gray-50");
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };
  
  const handleFileUpload = (file: File) => {
    // Check if file type is CSV
    if (!file.name.toLowerCase().endsWith('.csv')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }
    
    setFile(file);
    setUploading(true);
    setErrors([]);
    setUploadComplete(false);
    setShowPreview(false);
    setActiveTab("upload");
    
    // Simulate CSV parsing and data preview
    setTimeout(() => {
      const mockPreviewData = [
        { name: "John Smith", email: "john.smith@example.com", department: "Engineering", tenure: "3", manager: "jane.doe@example.com" },
        { name: "Sarah Johnson", email: "sarah.johnson@example.com", department: "Marketing", tenure: "1", manager: "michael.brown@example.com" },
        { name: "David Lee", email: "david.lee@example.com", department: "Sales", tenure: "4", manager: "lisa.wong@example.com" },
        // Simulate error in row 4
        { name: "James Wilson", email: "invalid-email", department: "Engineering", tenure: "2", manager: "jane.doe@example.com" },
        { name: "Emily Davis", email: "emily.davis@example.com", department: "HR", tenure: "5", manager: "john.miller@example.com" }
      ];
      
      setPreviewData(mockPreviewData);
      setShowPreview(true);
      
      // Simulate validation
      const mockErrors: ValidationError[] = [
        { row: 4, field: "email", message: "Invalid email format", value: "invalid-email" }
      ];
      
      if (mockErrors.length > 0) {
        setErrors(mockErrors);
        setActiveTab("errors");
      }
    }, 1000);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        
        // If no errors detected earlier, mark as complete
        if (errors.length === 0) {
          setUploadComplete(true);
          toast({
            title: "Upload Successful",
            description: `100 participants have been added to survey "${availableSurveys.find(s => s.id === selectedSurvey)?.name}".`,
          });
        }
      }
    }, 300);
  };
  
  const handleCorrection = (index: number) => {
    // Here you would open a correction modal/form
    // For this demo, we'll just remove the error
    setErrors(errors.filter((_, i) => i !== index));
    
    if (errors.length <= 1) {
      setUploadComplete(true);
      toast({
        title: "Upload Successful",
        description: `100 participants have been added to survey "${availableSurveys.find(s => s.id === selectedSurvey)?.name}".`,
      });
    }
  };
  
  const handleBulkFix = () => {
    // Simulate fixing all errors
    setErrors([]);
    setUploadComplete(true);
    toast({
      title: "All Errors Fixed",
      description: `100 participants have been added to survey "${availableSurveys.find(s => s.id === selectedSurvey)?.name}".`,
    });
  };
  
  const handleDownloadTemplate = () => {
    toast({
      title: "Template Downloaded",
      description: "CSV template has been downloaded.",
    });
  };
  
  const handleReset = () => {
    setFile(null);
    setUploading(false);
    setUploadProgress(0);
    setErrors([]);
    setUploadComplete(false);
    setShowPreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setActiveTab("upload");
  };
  
  const handleNext = () => {
    navigate(`/review-launch?surveyId=${selectedSurvey}`);
  };

  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-survey-darkText">Upload Participants</h2>
        <p className="text-survey-lightText mt-2">Upload your employee data for the selected survey</p>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-64">
            <label htmlFor="survey-select" className="text-sm font-medium block mb-1">
              Select Survey
            </label>
            <Select value={selectedSurvey} onValueChange={setSelectedSurvey}>
              <SelectTrigger>
                <SelectValue placeholder="Select a survey" />
              </SelectTrigger>
              <SelectContent>
                {availableSurveys.map(survey => (
                  <SelectItem key={survey.id} value={survey.id}>
                    {survey.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-grow">
            <Badge variant="outline" className="mt-6 md:mt-0">
              Survey ID: {selectedSurvey}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5" />
              Upload Participants
            </CardTitle>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="upload" className="flex-1">
                Upload
                {uploadComplete && <CheckCircle className="ml-2 h-4 w-4 text-green-500" />}
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex-1" disabled={!showPreview}>
                Data Preview
                {showPreview && <Database className="ml-2 h-4 w-4" />}
              </TabsTrigger>
              <TabsTrigger value="errors" className="flex-1" disabled={errors.length === 0}>
                Errors 
                {errors.length > 0 && (
                  <Badge variant="destructive" className="ml-2">{errors.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload">
              <CardContent>
                {!file ? (
                  <div 
                    className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      id="file-upload" 
                      ref={fileInputRef}
                      type="file" 
                      className="hidden" 
                      accept=".csv" 
                      onChange={handleFileChange}
                    />
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-survey-lightText mb-4" />
                      <p className="text-survey-darkText font-medium mb-1">
                        Drag and drop your CSV file here
                      </p>
                      <p className="text-survey-lightText text-sm mb-4">
                        or click to browse your files
                      </p>
                      <Button variant="outline" size="sm">
                        Select File
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-md flex items-center">
                      <div className="p-2 bg-blue-100 rounded-md mr-3">
                        <Database className="h-6 w-6 text-blue-700" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-survey-lightText">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={handleReset}>
                        <XCircle className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                    
                    {uploading && (
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="font-medium">Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} />
                      </div>
                    )}
                    
                    {uploadComplete && (
                      <div className="bg-green-50 p-4 rounded-md border border-green-200">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span className="font-medium text-green-800">Upload complete: 100 participants added</span>
                        </div>
                      </div>
                    )}
                    
                    {errors.length > 0 && (
                      <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                        <div className="flex items-center">
                          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                          <span className="font-medium text-amber-800">
                            {errors.length} {errors.length === 1 ? 'error' : 'errors'} found in your data
                          </span>
                        </div>
                        <p className="text-sm text-amber-700 mt-1 ml-7">
                          Please fix the errors to complete the upload
                        </p>
                        <div className="mt-2 ml-7">
                          <Button size="sm" variant="outline" onClick={() => setActiveTab("errors")}>
                            Review Errors
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="preview">
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Row</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Tenure (Years)</TableHead>
                        <TableHead>Manager</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell className={row.email === "invalid-email" ? "text-red-500" : ""}>
                            {row.email}
                            {row.email === "invalid-email" && <AlertCircle className="inline ml-1 h-4 w-4 text-red-500" />}
                          </TableCell>
                          <TableCell>{row.department}</TableCell>
                          <TableCell>{row.tenure}</TableCell>
                          <TableCell>{row.manager}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {previewData.length > 0 && (
                    <div className="text-center text-sm text-survey-lightText mt-4">
                      Showing {previewData.length} of {100} rows
                    </div>
                  )}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="errors">
              <CardContent>
                {errors.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        <h3 className="font-medium">Please fix the following errors:</h3>
                      </div>
                      <Button size="sm" variant="outline" onClick={handleBulkFix}>
                        Auto-Fix All
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Row</TableHead>
                          <TableHead>Field</TableHead>
                          <TableHead>Current Value</TableHead>
                          <TableHead>Error</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {errors.map((error, index) => (
                          <TableRow key={index}>
                            <TableCell>{error.row}</TableCell>
                            <TableCell>{error.field}</TableCell>
                            <TableCell className="text-red-500">{error.value || "—"}</TableCell>
                            <TableCell>{error.message}</TableCell>
                            <TableCell>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleCorrection(index)}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Fix
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <h3 className="text-lg font-medium">No errors found</h3>
                    <p className="text-survey-lightText">Your data is ready for upload</p>
                  </div>
                )}
              </CardContent>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleDownloadTemplate}>
              <Download className="mr-2 h-4 w-4" />
              Download Template
            </Button>
            
            <div className="space-x-2">
              {file && (
                <Button variant="ghost" onClick={handleReset}>
                  Upload New File
                </Button>
              )}
              <Button 
                onClick={handleNext} 
                disabled={!uploadComplete}
              >
                Continue
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Template Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-survey-lightText mb-4">
              Your CSV file should include the following columns:
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <Badge className="mt-0.5 mr-2">Required</Badge>
                <div>
                  <p className="font-medium text-sm">Full Name</p>
                  <p className="text-xs text-survey-lightText">E.g., "John Smith"</p>
                </div>
              </div>
              <div className="flex items-start">
                <Badge className="mt-0.5 mr-2">Required</Badge>
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-xs text-survey-lightText">Must be valid email format</p>
                </div>
              </div>
              <div className="flex items-start">
                <Badge className="mt-0.5 mr-2">Required</Badge>
                <div>
                  <p className="font-medium text-sm">Department</p>
                  <p className="text-xs text-survey-lightText">Must match existing departments</p>
                </div>
              </div>
              <div className="flex items-start">
                <Badge variant="outline" className="mt-0.5 mr-2">Optional</Badge>
                <div>
                  <p className="font-medium text-sm">Tenure in Years</p>
                  <p className="text-xs text-survey-lightText">Numeric values only</p>
                </div>
              </div>
              <div className="flex items-start">
                <Badge className="mt-0.5 mr-2">Required</Badge>
                <div>
                  <p className="font-medium text-sm">Manager Email</p>
                  <p className="text-xs text-survey-lightText">Valid email of participant's manager</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium mb-2 text-sm">Tips:</h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-survey-lightText">
                <li>Save your file in UTF-8 encoding</li>
                <li>First row should contain column headers</li>
                <li>Check for duplicate emails before uploading</li>
                <li>Maximum file size: 10MB</li>
                <li>Supports up to 5,000 participants per upload</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UploadParticipants;
