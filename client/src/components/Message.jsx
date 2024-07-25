import PropTypes from "prop-types";

function Message({ message }) {
  return (
    <section>
      <p>{message}</p>
    </section>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;
