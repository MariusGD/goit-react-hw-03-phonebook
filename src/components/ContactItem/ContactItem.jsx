import styles from './ContactItem.module.css';
import PropTypes from 'prop-types';

const Item = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

const ContactItem = ({ contact, onDeleteContact }) => {
  const { id, name, number } = contact;

  return (
    <Item className={styles.item}>
      <span>{name}</span>
      <span> {number}</span>
      <button
        className={styles.button_delete}
        onClick={() => onDeleteContact(id)}
      >
        Delete
      </button>
    </Item>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactItem;
