import React, { useState, useRef } from 'react';
import axios from 'axios';

const FileInput = () => {
  const fileInputRef = useRef(null);
  const [applyDragStyle, setApplyDragStyle] = useState(false);
  const [isFileLoaded, setIsFileLoaded] = useState(false);

  const handleFileLoadedStatus = (e) => {
    if (fileInputRef.current.files.length > 0) {
      setIsFileLoaded(true);
      setApplyDragStyle(false);
    }
    else {
      setIsFileLoaded(false);
    }
  }

  const handleFileInput = () => {
    const reader = new FileReader();
    reader.onload = async () => {
      const inputDataArray = reader.result.split('\n').map((line) => splitData(line));
      inputDataArray.sort((a, b) => {
        if (a[0] > b[0]) return 1;
        else if (a[0] < b[0]) return -1;
        return 0;
      });
      // const postBody = JSON.stringify({ inputData: inputDataArray });
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // };
      // try {
      //   await axios.post('http://localhost:5000/api/insert/by-file', postBody, config);
      // } catch (error) {
      //   console.log(error);
      // }
    }
    reader.readAsText(fileInputRef.current.files[0]);
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setApplyDragStyle(true);
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setApplyDragStyle(false);
  }

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setApplyDragStyle(true);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current.files = e.dataTransfer.files;
    handleFileLoadedStatus();
  }

  const handleOpenFileSelect = () => {
    fileInputRef.current.click();
  }

  return (
    <React.Fragment>
      <p className="file-input-header">파일로 데이터 입력하기</p>
      <div
        className="file-drop-zone"
        style={applyDragStyle ? { backgroundColor: '#60768e', boxShadow: '5px 5px 23px #000' } : null}
        // onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          className="file-input"
          type="file"
          accept=".csv"
          ref={fileInputRef}
          onChange={handleFileLoadedStatus}
        />
        <button
          type="button"
          className="choose-file-btn"
          onClick={handleOpenFileSelect}
        >파일선택</button>
        {isFileLoaded ? <p>현재 파일: {fileInputRef.current.files[0].name}</p> : <p>파일을 여기다 끌어 놓아주세요.</p>}
      </div>
    </React.Fragment>
  );
}

function splitData(line) {
  line += ',';
  let splitResult = [];
  let processedString = '';
  for (const char of line) {
    if (char !== ',') {
      processedString += char;
    }
    else if (char === ',' && processedString.trim().length > 0) {
      splitResult.push(processedString.trim());
      processedString = '';
    }
  }
  return splitResult;
}

export default FileInput;
