import React from 'react'
import Modal from 'react-native-modal'

const BoxModal = props => {
  return (
    <>
      <Modal
        {...props}
      >
        {props.children}
      </Modal>
    </>
  )
}

export default BoxModal
