import React, { useState } from 'react';
import DiscussionBoard from './Discussionboard';
import ShopLocations from './ShopLocations';
import Slideshows from './Slideshows';
import OnlineShop from './OnlineShop';

function AdvancedJS() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, name: 'Discussion Board' },
    { id: 2, name: 'Shop Locations' },
    { id: 3, name: 'Slideshows' },
    { id: 4, name: 'Online Shop' }
  ];

  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    header: {
      backgroundColor: '#2F3F4F',
      padding: '8px 16px',
      minHeight: '40px',
      display: 'flex',
      alignItems: 'center',
    },
    headerText: {
      color: 'white',
      margin: 0,
      fontSize: '18px',
    },
    mainContent: {
      display: 'flex',
      flex: 1,
      overflow: 'hidden',
    },
    sidebar: {
      width: '120px',
      minWidth: '120px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f0f0f0',
    },
    button: {
      width: '100%',
      height: '32px',
      padding: '0 8px',
      marginBottom: '1px',
      color: '#0a33ae',
      border: 'none',
      cursor: 'pointer',
      fontSize: '13px',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    activeButton: {
      backgroundColor: '#ffc000',
    },
    inactiveButton: {
      backgroundColor: '#5a9bd5',
    },
    contentArea: {
      flex: 1,
      padding: '16px',
      overflow: 'auto',
      backgroundColor: '#ffffff',
    },
    footer: {
      backgroundColor: '#2F3F4F',
      color: 'white',
      textAlign: 'center',
      padding: '8px 0',
      fontSize: '12px',
      minHeight: '32px',
    },
    '@media (max-width: 768px)': {
      mainContent: {
        flexDirection: 'column',
      },
      sidebar: {
        width: '100%',
        minWidth: 'unset',
        flexDirection: 'row',
        overflowX: 'auto',
      },
      button: {
        height: '40px',
        marginRight: '1px',
        marginBottom: 0,
        padding: '0 12px',
        minWidth: '120px',
        justifyContent: 'center',
        textAlign: 'center',
      },
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerText}>JavaScript Extension</h1>
      </header>

      <div style={styles.mainContent}>
        <div style={styles.sidebar}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.button,
                ...(activeTab === tab.id ? styles.activeButton : styles.inactiveButton),
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div style={styles.contentArea}>
          {activeTab === 1 && <DiscussionBoard />}
          {activeTab === 2 && <ShopLocations />}
          {activeTab === 3 && <Slideshows />}
          {activeTab === 4 && <OnlineShop />}
        </div>
      </div>

      <footer style={styles.footer}>
        Advanced Web Design, Copyright © 2018
      </footer>
    </div>
  );
}

export default AdvancedJS;