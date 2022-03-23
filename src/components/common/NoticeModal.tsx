import React, { useContext } from 'react'
import ResourceManager from '../ResourceManager';
import Modal from 'react-modal';

type AppProps = {
    isOpen: boolean,
    handleAfterClose: () => void,
    header: string, 
    subHeader: string
}


export const NoticeModal: React.FC<AppProps> = (props) => {
    const { isOpen, handleAfterClose, header, subHeader } = props;
    const stringResources = useContext(ResourceManager);

    // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    Modal.setAppElement('#root');

     /**
     * Custom modal styles.
     * I tried putting these in the
     * AddItemStyles.scss, but the
     * react-modal library wanted
     * an object instead of a CssStyles
     * object.
     */
      const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '1rem',
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
        },
    };

    const closeModalButtonStyles = {
        backgroundColor: '#0078d0',
        border: 0,
        borderRadius: '56px',
        color: '#fff',
        cursor: 'pointer',
        display: 'inline-block',
        fontFamily: 'system-ui,-apple-system,system-ui,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif',
        fontSize: '18px',
        fontWeight: 600,
        outline: 0,
        padding: '10px',
    };


    return (
            <Modal
                isOpen={isOpen}
                onRequestClose={handleAfterClose}
                style={modalStyles}
                contentLabel="Empty Content Modal"
            >
                <h2 style={{ display: 'flex', justifyContent: 'center' }}>{header}</h2>
                <h4>{subHeader}</h4>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button style={closeModalButtonStyles} onClick={handleAfterClose}>close</button>
                </div>

            </Modal>
    );
}

export default NoticeModal