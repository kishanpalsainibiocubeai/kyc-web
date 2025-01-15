import React, {useState, forwardRef, useImperativeHandle} from 'react'
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  interface IWebcamCapture{
        setCaptureImage: (str: string) => void

  }
const WebcamCapture = forwardRef((props:IWebcamCapture, ref:any) => {
    const webcamRef:any = React.useRef(null);
    const [file, setFile] = useState<any>(null);

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef !== null ? (webcamRef?.current?.getScreenshot()) : ''
      const temp = webcamRef.current.handleUserMedia()
      // .then((blob:any) => {
      //   const data = URL.createObjectURL(blob);
      //   console.log("createObjectURL :", data)
      // })
      console.log("capture :", webcamRef?.current, temp)
      handleSubmit()
      props.setCaptureImage(imageSrc)
    },
    [webcamRef]
  );

  const handleMedia = (event:any) => {
    console.log("handleMedia :", event)
  }
  const handleReCapture = () => {
    handleSubmit()
    // webcamRef.current = null
    props.setCaptureImage('')
  }
  const handleFileChange = async (event:any ) => {
    const temp = await event.target.files[0]
        console.log("handleFileChange", event.target.files);
    // const temp = await URL.createObjectURL(event.target.files[0])
    
    setFile(temp);
  };

  const handleSubmit = async () => {
    // event.preventDefault();
    // if (!file) {
    //   setMessage('Please select a file to upload.');
    //   return;
    // }

    const formData = new FormData();
    console.log("formData :", file)
    file && formData.append('image_file', file);

    try {
      const response = await fetch('http://13.201.40.247:8000/api/v1/face/upload-image', {
        method: 'POST',
        body : formData,
        headers: {
          'accept': 'application/json',
          // 'Content-Type': 'multipart/form-data',
          // 'auth': 'kecqp4GwfD86o3wL8Io6ZMZHTrFQOIEw'
          // Note: Content-Type should not be set manually to 'multipart/form-data' when using FormData
        },
      });

      if (response.ok) {
        console.log('File uploaded successfully!');
      } else {
        console.log('Failed to upload the file.');
      }
    } catch (error) {
      console.log('An error occurred while uploading the file.');
    }
  };

  useImperativeHandle(ref, () => ({

    getAlert() {
      alert("getAlert from Child");
    },
    captures: () => capture(),
    reCapture: () => handleReCapture(),

  }));

  return (
    <div>
        <input type="file" onChange={handleFileChange} accept='image/*'  />
        <button onClick={handleSubmit}>click me </button>
      <Webcam
        audio={false}
        height={'auto'}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        onUserMedia={handleMedia}
        width={'100%'}
        videoConstraints={videoConstraints}
      />
      {/* <button onClick={capture}>Capture photo</button> */}
    </div>
  )
})

export default WebcamCapture