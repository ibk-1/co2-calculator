import React from 'react';

const FileUpload = ({ onFileSelect }) => {
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    onFileSelect(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileInput} accept=".json" />
    </div>
  );
};

export default FileUpload;
