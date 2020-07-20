import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { Zoom } from "react-awesome-reveal";

import "./ContactMessage.css";
import Spinner from "../layout/Spinner";

import { connect } from "react-redux";
import { setIsClosed } from "../../actions/modal";
import { getContact } from "../../actions/contact";

const ContactMessage = ({
  id,
  setIsClosed,
  modal: { messageOpen },
  getContact,
  contact: { contact },
}) => {
  useState(() => {
    getContact(id);
  }, [getContact]);

  return (
    <Modal
      className="modal"
      isOpen={messageOpen}
      onRequestClose={setIsClosed}
      shouldCloseOnOverlayClick={true}
      appElement={document.getElementById("root")}
    >
      <Zoom duration={300}>
        {contact === null ? (
          <Spinner />
        ) : (
          <div className="cart">
            <div className="cart-head">
              <h3>Your Cart</h3>
              <button type="button" onClick={() => setIsClosed()}>
                X
              </button>
            </div>
            {contact.message.map((data, k) => (
              <Fragment key={k}>
                <h3>{data.subject}</h3>
                <p>{data.text}</p>
                {contact.message.length > 1 && <hr />}
              </Fragment>
            ))}
          </div>
        )}
      </Zoom>
    </Modal>
  );
};

ContactMessage.propTypes = {
  setIsClosed: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contact: state.contact,
  modal: state.modal,
});

export default connect(mapStateToProps, { setIsClosed, getContact })(
  ContactMessage
);
