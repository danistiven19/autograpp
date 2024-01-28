import React, { useCallback, useRef, useEffect } from 'react';
import { Button } from '@mui/material';

const SignatureField = (props) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const contextType = '2d';
  let blankCanvas = null;
  
  function createBlankCanvas() {
    if (blankCanvas) {
      return blankCanvas;
    }
  
    const { current: canvas } = canvasRef;

    blankCanvas = document.createElement('canvas');
    blankCanvas.width = canvas.width;
    blankCanvas.height = canvas.height;
    return blankCanvas;
  }

  const getCanvasContextAndPosition = useCallback((event) => {
    if (!event) {
      return;
    }

    const { current: canvas } = canvasRef;

    if (!canvas) {
      event.preventDefault();
      return;
    }

    const context = canvas.getContext(contextType);

    if (!context) {
      event.preventDefault();
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { context, x, y };
  }, [canvasRef]);

  const startDrawing = useCallback((event) => {
    const { context, x, y } = getCanvasContextAndPosition(event);

    if (!context || !x || !y) {
      return;
    }

    context.beginPath();
    context.moveTo(x, y);
    isDrawing.current = true;
  }, [getCanvasContextAndPosition]);

  const draw = useCallback((event) => {
    if (!isDrawing.current) {
      event.preventDefault()
      return;
    }

    const { context, x, y } = getCanvasContextAndPosition(event);
    if (!context || !x || !y) {
      return;
    }

    context.lineTo(x, y);
    context.stroke();

  }, [getCanvasContextAndPosition, isDrawing]);

  const printSignature = () => {
    const { current: canvas } = canvasRef;
    const signatureDataURL = canvas.toDataURL();
    const blankCanvasDataURL = createBlankCanvas().toDataURL();

    if (!signatureDataURL || signatureDataURL === blankCanvasDataURL) {
      return;
    }
  
    props.storeSignature(signatureDataURL);
  };

  const clearSignature = () => {
    const { current: canvas } = canvasRef;
    const context = canvas.getContext(contextType);
    context.clearRect(0, 0, canvas.width, canvas.height);
    props.storeSignature('');
  };

  useEffect(() => {
    const { current: canvas } = canvasRef;
    const endDrawing = () => isDrawing.current = false;
    if (canvas) {
      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', endDrawing);
      canvas.addEventListener('mouseout', endDrawing);
    }
    // Cleanup function
    return () => {
      if (canvas) {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', endDrawing);
        canvas.removeEventListener('mouseout', endDrawing);
      }
    };
  }, [startDrawing, draw]);

  return (
    <div>
      <canvas ref={canvasRef} />
      <Button id="printSignature" onClick={printSignature}>Print</Button>
      <Button id="clearSignature" onClick={clearSignature}>Clear</Button>
    </div>
  );
};

export default SignatureField;
