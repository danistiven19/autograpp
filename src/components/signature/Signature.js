import React, { useCallback, useRef, useEffect } from 'react';
import { Button } from '@mui/material';

const SignatureField = (props) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const contextType = '2d';

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

  const endDrawing = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const saveSignature = () => {
    const canvas = canvasRef.current;
    const signatureDataURL = canvas.toDataURL();
    props.storeSignature(signatureDataURL);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext(contextType);
    context.clearRect(0, 0, canvas.width, canvas.height);
    props.storeSignature('');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
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
  }, [startDrawing, draw, endDrawing]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
      />
      <Button onClick={saveSignature}>Save</Button>
      <Button onClick={clearSignature}>Clear</Button>
    </div>
  );
};

export default SignatureField;
