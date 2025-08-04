import React, { useState } from 'react';
import { FiUpload, FiSave, FiX } from 'react-icons/fi';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/vendor/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
          images: formData.images
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      setSuccess(true);
      setFormData({
        name: '',
        description: '',
        price: '',
        quantity: '',
        images: []
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form">
      <div className="form-header">
        <h2>Upload New Product</h2>
        <p>Add a new product to your inventory</p>
      </div>

      {success && (
        <div className="success-message">
          Product uploaded successfully!
        </div>
      )}

      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="4"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price (PKR) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00 PKR"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity *</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="0"
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="images">Product Images</label>
          <div className="image-upload">
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageChange}
              multiple
              accept="image/*"
            />
            <label htmlFor="images" className="upload-label">
              <FiUpload /> Choose Images
            </label>
          </div>
        </div>

        {formData.images.length > 0 && (
          <div className="image-preview">
            <h4>Selected Images:</h4>
            <div className="image-grid">
              {formData.images.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image} alt={`Preview ${index + 1}`} />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => removeImage(index)}
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Uploading...' : (
              <>
                <FiSave /> Upload Product
              </>
            )}
          </button>
          
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setFormData({
              name: '',
              description: '',
              price: '',
              quantity: '',
              images: []
            })}
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm; 