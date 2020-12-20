import React, { useState, useRef } from 'react';
import axios from 'axios';

import loadingSpinner from '../loading-spinner.gif';

const FileInput = () => {
  const fileInputRef = useRef(null);
  const [applyDragStyle, setApplyDragStyle] = useState(false);
  const [isFileLoaded, setIsFileLoaded] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);

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
    setIsFileUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const inputDataArray = reader.result.split('\n').map((line) => splitData(line));
      inputDataArray.sort((a, b) => {
        if (a[0] > b[0]) return 1;
        else if (a[0] < b[0]) return -1;
        return 0;
      });
      const postBody = JSON.stringify({ inputData: inputDataArray });
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      try {
        await axios.post('http://localhost:5000/api/insert/by-file', postBody, config);
        window.alert('데이터가 성공적으로 저장되었습니다!');
        setIsFileLoaded(false);
        setIsFileUploading(false);
        fileInputRef.current.value = '';
      } catch (error) {
        console.log(error);
        window.alert('데이터 저장 실패.');
        setIsFileUploading(false);
      }
    }
    reader.readAsText(fileInputRef.current.files[0]);
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
        {isFileUploading ? (
          <img

            src={loadingSpinner} alt="loading spinner" />
        ) : (
            <React.Fragment>
              <div className="file-input-btns">
                <button
                  type="button"
                  className="choose-file-btn"
                  onClick={handleOpenFileSelect}
                >{isFileLoaded ? '파일 재선택' : '파일 선택'}</button>
                {isFileLoaded && (
                  <button
                    type="button"
                    className="insert-file-btn"
                    onClick={handleFileInput}
                  >데이터 저장</button>
                )}
              </div>
              {isFileLoaded ? <p>현재 파일: {fileInputRef.current.files[0].name}</p> : <p>파일을 여기다 끌어 놓아주세요.</p>}
            </React.Fragment>
          )}
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
