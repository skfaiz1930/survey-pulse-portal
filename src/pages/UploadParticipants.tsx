
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, Download, Upload, CheckCircle, XCircle, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UploadParticipants = () => {
  const [currentStage] = useState(2);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<Array<{row: number, field: string, message: string}>>([]);
  const [uploadComplete, setUploadComplete] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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
    setFile(file);
    setUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        
        // Simulate validation errors
        setErrors([
          { row: 3, field: 'email', message: 'Invalid email format' },
          { row: 7, field: 'department', message: 'Department not found' },
          { row: 12, field: 'name', message: 'Name is required' }
        ]);
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
        description: "100 participants have been added to the system.",
      });
    }
  };
  
  const handleDownloadTemplate = () => {
    toast({
      title: "Template Downloaded",
      description: "CSV template has been downloaded.",
    });
  };
  
  const handleNext = () => {
    navigate("/review-launch");
  };
  
  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-survey-darkText">Upload Participants</h2>
        <p className="text-survey-lightText mt-2">Upload your employee data using our CSV template</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5" />
              Upload Participants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input 
                id="file-upload" 
                type="file" 
                className="hidden" 
                accept=".csv" 
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-survey-lightText mb-4" />
                <p className="text-survey-darkText font-medium mb-1">
                  {file ? file.name : "Drag and drop your CSV file here"}
                </p>
                <p className="text-survey-lightText text-sm mb-4">
                  {file ? `${(file.size / 1024).toFixed(2)} KB` : "or click to browse your files"}
                </p>
                <Button variant="outline" size="sm">
                  Select File
                </Button>
              </div>
            </div>
            
            {uploading && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-medium">Uploading...</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-survey-primary h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {errors.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <h3 className="font-medium">Please fix the following errors:</h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Row</TableHead>
                      <TableHead>Field</TableHead>
                      <TableHead>Error</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {errors.map((error, index) => (
                      <TableRow key={index}>
                        <TableCell>{error.row}</TableCell>
                        <TableCell>{error.field}</TableCell>
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
            )}
            
            {uploadComplete && (
              <div className="mt-6 bg-green-50 p-4 rounded-md border border-green-200">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium text-green-800">Upload complete: 100 participants added</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleDownloadTemplate}>
              <Download className="mr-2 h-4 w-4" />
              Download Template
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!uploadComplete}
            >
              Continue
            </Button>
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
            <ul className="list-disc list-inside space-y-2 text-sm text-survey-lightText">
              <li>Full Name (required)</li>
              <li>Email (required)</li>
              <li>Department (required)</li>
              <li>Age (optional)</li>
              <li>Tenure in Years (optional)</li>
              <li>Manager Email (required)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UploadParticipants;
