import React, { useState, useEffect } from 'react';
import { FiSearch, FiX, FiPlus, FiTrash2, FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Compare = () => {
  const [compareItems, setCompareItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if there's a product to compare from URL state
  useEffect(() => {
    const state = location.state;
    if (state?.productToCompare) {
      setCompareItems([state.productToCompare]);
    }
  }, [location]);

  const searchProducts = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to search products');
      const data = await response.json();
      setSearchResults(data.products || data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 2) {
      searchProducts(query);
    } else {
      setSearchResults([]);
    }
  };

  const addToCompare = (product) => {
    if (compareItems.length >= 3) {
      alert('You can compare up to 3 products at a time');
      return;
    }
    
    if (compareItems.find(item => item._id === product._id)) {
      alert('This product is already in your comparison');
      return;
    }

    setCompareItems(prev => [...prev, product]);
    setSearchQuery('');
    setSearchResults([]);
  };

  const removeFromCompare = (productId) => {
    setCompareItems(prev => prev.filter(item => item._id !== productId));
  };

  const clearAll = () => {
    setCompareItems([]);
  };

  const getProductImage = (product) => {
    return product.images && product.images[0] 
      ? product.images[0] 
      : 'https://via.placeholder.com/200x200?text=No+Image';
  };

  const getDiscountPercentage = (product) => {
    if (product.originalPrice && product.price) {
      const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const isProductNew = (product) => {
    if (!product.createdAt) return false;
    const createdDate = new Date(product.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem',
      minHeight: '100vh',
      background: '#f8fafc',
    },
    header: {
      marginBottom: '2rem',
      textAlign: 'center',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: '#64748b',
      fontSize: '1.1rem',
    },
    searchSection: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    searchTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '1rem',
    },
    searchContainer: {
      position: 'relative',
      maxWidth: '500px',
      margin: '0 auto',
    },
    searchInput: {
      width: '100%',
      padding: '1rem 1rem 1rem 3rem',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    },
    searchIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#64748b',
      fontSize: '1.2rem',
    },
    searchResults: {
      position: 'absolute',
      top: '100%',
      left: '0',
      right: '0',
      background: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      maxHeight: '300px',
      overflowY: 'auto',
      zIndex: 1000,
    },
    searchResultItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
      borderBottom: '1px solid #f1f5f9',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    searchResultItemHover: {
      background: '#f8fafc',
    },
    searchResultImage: {
      width: '50px',
      height: '50px',
      objectFit: 'cover',
      borderRadius: '6px',
      marginRight: '1rem',
    },
    searchResultInfo: {
      flex: 1,
    },
    searchResultName: {
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '0.25rem',
    },
    searchResultPrice: {
      color: '#059669',
      fontWeight: '600',
    },
    addButton: {
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
    },
    compareSection: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    compareHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    compareTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1e293b',
    },
    clearButton: {
      background: '#dc2626',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background 0.3s ease',
    },
    compareGrid: {
      display: 'grid',
      gridTemplateColumns: `repeat(${Math.max(compareItems.length, 1)}, 1fr)`,
      gap: '2rem',
      marginTop: '2rem',
    },
    compareCard: {
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      padding: '1.5rem',
      position: 'relative',
      background: 'white',
    },
    removeButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: '#dc2626',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '2rem',
      height: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '1rem',
    },
    productImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '1rem',
    },
    productName: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '0.5rem',
    },
    productPrice: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#059669',
      marginBottom: '0.5rem',
    },
    originalPrice: {
      fontSize: '1rem',
      color: '#64748b',
      textDecoration: 'line-through',
      marginBottom: '0.5rem',
    },
    discountBadge: {
      background: '#dc2626',
      color: 'white',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      display: 'inline-block',
    },
    newBadge: {
      background: '#059669',
      color: 'white',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      display: 'inline-block',
    },
    productDescription: {
      color: '#64748b',
      fontSize: '0.875rem',
      lineHeight: '1.5',
      marginBottom: '1rem',
    },
    productSpecs: {
      marginBottom: '1rem',
    },
    specItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.5rem 0',
      borderBottom: '1px solid #f1f5f9',
    },
    specLabel: {
      fontWeight: '500',
      color: '#374151',
    },
    specValue: {
      color: '#64748b',
    },
    productActions: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: '1rem',
    },
    actionButton: {
      flex: 1,
      padding: '0.75rem',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
    },
    primaryButton: {
      background: '#3b82f6',
      color: 'white',
    },
    secondaryButton: {
      background: '#f3f4f6',
      color: '#374151',
      border: '1px solid #e5e7eb',
    },
    emptyState: {
      textAlign: 'center',
      padding: '4rem 2rem',
      color: '#64748b',
    },
    emptyIcon: {
      fontSize: '4rem',
      marginBottom: '1rem',
      color: '#94a3b8',
    },
    emptyTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#374151',
    },
    emptyText: {
      fontSize: '1rem',
      color: '#64748b',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Compare Products</h1>
        <p style={styles.subtitle}>Compare up to 3 products side by side</p>
      </div>

      {/* Search Section */}
      <div style={styles.searchSection}>
        <h2 style={styles.searchTitle}>Search Products to Compare</h2>
        <div style={styles.searchContainer}>
          <FiSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearch}
            style={styles.searchInput}
          />
          {searchResults.length > 0 && (
            <div style={styles.searchResults}>
              {searchResults.map((product) => (
                <div
                  key={product._id}
                  style={styles.searchResultItem}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'white';
                  }}
                >
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    style={styles.searchResultImage}
                  />
                  <div style={styles.searchResultInfo}>
                    <div style={styles.searchResultName}>{product.name}</div>
                    <div style={styles.searchResultPrice}>
                      PKR {product.price?.toLocaleString()}
                    </div>
                  </div>
                  <button
                    style={styles.addButton}
                    onClick={() => addToCompare(product)}
                  >
                    Add to Compare
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Compare Section */}
      <div style={styles.compareSection}>
        <div style={styles.compareHeader}>
          <h2 style={styles.compareTitle}>
            Comparing {compareItems.length} Product{compareItems.length !== 1 ? 's' : ''}
          </h2>
          {compareItems.length > 0 && (
            <button style={styles.clearButton} onClick={clearAll}>
              Clear All
            </button>
          )}
        </div>

        {compareItems.length === 0 ? (
          <div style={styles.emptyState}>
            <FiSearch style={styles.emptyIcon} />
            <h3 style={styles.emptyTitle}>No products to compare</h3>
            <p style={styles.emptyText}>
              Search for products above to start comparing
            </p>
          </div>
        ) : (
          <div style={styles.compareGrid}>
            {compareItems.map((product) => (
              <div key={product._id} style={styles.compareCard}>
                <button
                  style={styles.removeButton}
                  onClick={() => removeFromCompare(product._id)}
                >
                  <FiX />
                </button>
                
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  style={styles.productImage}
                />
                
                <h3 style={styles.productName}>{product.name}</h3>
                
                {product.originalPrice && product.originalPrice > product.price && (
                  <div style={styles.originalPrice}>
                    PKR {product.originalPrice?.toLocaleString()}
                  </div>
                )}
                
                <div style={styles.productPrice}>
                  PKR {product.price?.toLocaleString()}
                </div>
                
                {getDiscountPercentage(product) > 0 && (
                  <div style={styles.discountBadge}>
                    {getDiscountPercentage(product)}% OFF
                  </div>
                )}
                
                {isProductNew(product) && (
                  <div style={styles.newBadge}>NEW</div>
                )}
                
                <p style={styles.productDescription}>
                  {product.description?.substring(0, 150)}...
                </p>
                
                <div style={styles.productSpecs}>
                  <div style={styles.specItem}>
                    <span style={styles.specLabel}>Category:</span>
                    <span style={styles.specValue}>{product.category}</span>
                  </div>
                  <div style={styles.specItem}>
                    <span style={styles.specLabel}>Stock:</span>
                    <span style={styles.specValue}>
                      {product.quantity > 0 ? `${product.quantity} available` : 'Out of stock'}
                    </span>
                  </div>
                  {product.brand && (
                    <div style={styles.specItem}>
                      <span style={styles.specLabel}>Brand:</span>
                      <span style={styles.specValue}>{product.brand}</span>
                    </div>
                  )}
                </div>
                
                <div style={styles.productActions}>
                  <button style={{...styles.actionButton, ...styles.primaryButton}}>
                    <FiShoppingCart /> Add to Cart
                  </button>
                  <Link
                    to={`/product/${product._id}`}
                    style={{...styles.actionButton, ...styles.secondaryButton, textDecoration: 'none'}}
                  >
                    <FiEye /> View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare; 