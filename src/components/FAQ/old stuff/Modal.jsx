// import React, { Children } from 'react';
// import Modal from 'react-modal';

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };

// // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement(document.getElementById('app'));

// export default function ModelBox({ Children }) {
//   let subtitle;
//   const [modalIsOpen, setIsOpen] = React.useState(false);

//   function openModal() {
//     setIsOpen(true);
//   }

//   function afterOpenModal() {
//     // references are now sync'd and can be accessed.
//     subtitle.style.color = '#f00';
//   }

//   function closeModal() {
//     setIsOpen(false);
//   }
//   console.log(Children, ' inside modal');

//   return (
//     <>
//       {Children.setAttribute('width', '150px')}
//       <a onClick={openModal} style={{ width: '150px', height: '150px' }}>
//         {Children}
//       </a>
//       <Modal
//         isOpen={modalIsOpen}
//         onAfterOpen={afterOpenModal}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Example Modal"
//       >
//         {Children}
//         <button onClick={closeModal}>close</button>
//       </Modal>
//     </>
//   );
// }

// function ModelBackground() {
//   return (
//     <div
//       style={{
//         position: 'fixed',
//         zIndex: '1',
//         left: '0',
//         top: '0',
//         width: '100%',
//         height: '100%',
//         overflow: 'auto',
//         backgroundColor: 'rgba(0,0,0,0.5)',
//       }}
//     />
//   );
// }
// function ModelBody() {
//   return (
//     <div
//       style={{
//         backgroundColor: 'white',
//         margin: '10% auto',
//         padding: '20px',
//         width: '50%',
//       }}
//     />
//   );
// }

// export default function Modal({ children }) {
//   const [shouldShow, setShouldShow] = useState(false);
//   return (
//     <>
//       <button type="button" onClick={() => setShouldShow(true)}>
//         open Modal
//       </button>
//       {shouldShow && (
//         <div
//           style={{
//             position: 'fixed',
//             zIndex: '1',
//             left: '0',
//             top: '0',
//             width: '100%',
//             height: '100%',
//             overflow: 'auto',
//             backgroundColor: 'rgba(0,0,0,0.5)',
//           }}
//         >
//           <div
//             role="input"
//             style={{
//               backgroundColor: 'white',
//               margin: '10% auto',
//               padding: '20px',
//               width: '50%',
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button type="button" onClick={setShouldShow(false)}>
//               close modal
//             </button>
//             {children}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
