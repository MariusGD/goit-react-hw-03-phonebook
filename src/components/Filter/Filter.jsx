import { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './Filter.module.css';

export default class Filter extends Component {
  static propTypes = {
    onFilter: PropTypes.func.isRequired,
    filter: PropTypes.string,
  };

  render() {
    const { filter, onFilter } = this.props;

    return (
      <label className={Styles.filterLabel}>
        Find contacts by name
        <input
          className={Styles.filterInput}
          type="text"
          onChange={onFilter}
          value={filter}
        />
      </label>
    );
  }
}
