import React from 'react';
import { useNavigateHook } from './useNavigateHook'; // Import the custom hook

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
    this.navigate = this.props.navigate; // Get the navigate function from props
  }

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    // You can perform the upload to a server here
    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    console.log(this.state.selectedFile);
    alert('File has uploaded');
    // Call an API to upload the file here
    // Example: axios.post('api/uploadfile', formData);

    // Navigate to the graph page
    this.navigate('/graph');
  };

  render() {
    return (
      <div>
        <h3>Upload a File</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Upload!
          </button>
        </div>
      </div>
    );
  }
}

// Wrap FileUpload with the custom hook
function FileUploadWithNavigate(props) {
  const navigate = useNavigateHook();
  return <FileUpload {...props} navigate={navigate} />;
}

export default FileUploadWithNavigate;
