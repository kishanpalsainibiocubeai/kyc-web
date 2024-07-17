import React, {forwardRef, useImperativeHandle} from 'react'
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

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef !== null ? (webcamRef?.current?.getScreenshot()) : ''
      console.log("capture :", webcamRef?.current, imageSrc)
      props.setCaptureImage(imageSrc)
    },
    [webcamRef]
  );

  const handleMedia = (event:any) => {
    console.log("handleMedia :", event)
  }
  const handleReCapture = () => {
    debugger
    // webcamRef.current = null
    props.setCaptureImage('')
  }

  useImperativeHandle(ref, () => ({

    getAlert() {
      alert("getAlert from Child");
    },
    captures: () => capture(),
    reCapture: () => handleReCapture(),

  }));

  return (
    <div>
        
      <Webcam
        audio={false}
        height={'auto'}
        ref={webcamRef}
        // screenshotFormat="image/jpeg"
        onUserMedia={handleMedia}
        width={'100%'}
        videoConstraints={videoConstraints}
      />
      {/* <button onClick={capture}>Capture photo</button> */}
    </div>
  )
})

export default WebcamCapture