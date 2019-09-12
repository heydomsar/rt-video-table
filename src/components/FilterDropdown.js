import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

@inject('store')
@observer
export default class FilterDropdown extends Component {

  handleChange = (event, index, value) => this.props.store.chooseFilter(value);

  render() {
    return (
        <SelectField
          floatingLabelText="Filter by Show"
          value={this.props.store.selectedFilter}
          onChange={this.handleChange}
          autoWidth={true}
        >
          {this.props.store.filterList.map((show, i) => <MenuItem value={show} primaryText={show} key={i} />)}
        </SelectField>
    );
  }
}