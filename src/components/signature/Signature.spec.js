import { render } from '@testing-library/react';
import Signature from './Signature';

describe('Signature Tests', () => {
  let mockStoreSignature;
  let mockContext;

  beforeEach(() => {
    mockContext = {
      clearRect: jest.fn()
    };

    mockStoreSignature = jest.fn();
    HTMLCanvasElement.prototype.getContext = jest.fn(() => (mockContext));

  });
  
  it('should render the component', () => {
    const { container } = render(<Signature />);
    expect(container).toBeInTheDocument();
  });

  describe('clearSignature', () => {
    it('should clear the canvas', () => {
      const { container } = render(<Signature storeSignature={mockStoreSignature} />);
      const clearButton = container.querySelector('#clearSignature');
      clearButton.click();
      expect(mockContext.clearRect).toHaveBeenCalled();
    });

    it('should store an empty signature', () => {
      const { container } = render(<Signature storeSignature={mockStoreSignature} />);
      const clearButton = container.querySelector('#clearSignature');
      clearButton.click();
      expect(mockStoreSignature).toHaveBeenCalledWith('');
    });
  });

  describe('printSignature', () => {
    beforeEach(() => {
      HTMLCanvasElement.prototype.toDataURL = jest.fn(() => ('dataURL'));
    });

    it('should do nothing if there is no canvas', () => {
      HTMLCanvasElement.prototype.toDataURL.mockReturnValueOnce(null);
      const { container } = render(<Signature storeSignature={mockStoreSignature} />);
      const printButton = container.querySelector('#printSignature');
      printButton.click();
      expect(mockStoreSignature).not.toHaveBeenCalled();
    });

    it('should do nothing if the canvas is empty (both dataURL the same)', () => {
      const { container } = render(<Signature storeSignature={mockStoreSignature} />);
      const printButton = container.querySelector('#printSignature');

    
      printButton.click();
      expect(mockStoreSignature).not.toHaveBeenCalled();
    });

    it('should store the signature', () => {
      HTMLCanvasElement.prototype.toDataURL.mockReturnValueOnce('non-empty-dataURL');
      
      const { container } = render(<Signature storeSignature={mockStoreSignature} />);
      const printButton = container.querySelector('#printSignature');
      printButton.click();
      expect(mockStoreSignature).toHaveBeenCalledWith('non-empty-dataURL');
    });
  });
  
});
