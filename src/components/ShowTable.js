import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FilterDropdown from './FilterDropdown';

const styles = {
  ep_img: {
    height: '100px',
    display: 'block'
  }
};

@inject('store')
@observer
export default class ShowTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: true,
      showRowHover: true,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '100%',
    };
  }

  handleClick = (sortBy) => {
    const newOrder = this.props.store.sort.order === "ASC" ? "DESC" : "ASC";
    this.props.store.setSort({ col: sortBy, order: newOrder })
  };

  createMarkup(value) { return {__html: value}; };

  render() {
    const { shows } = this.props.store;
    let tableData = shows.filter(show => this.props.store.selectedFilter === '' || show.name === this.props.store.selectedFilter )
      .reduce((episodes, show) => {
        show.seasons.forEach(season => {
          season.show_episodes.forEach(episode => episodes.push({...episode, show: show.name, summary: show.summary, season: season.slug}))
        })
        return episodes;
      }, [])
      .sort((a, b) => {
        let comparison = 0;
        if (a[this.props.store.sort.col] < b[this.props.store.sort.col]) { comparison = -1; }
        if (a[this.props.store.sort.col] > b[this.props.store.sort.col]) { comparison = 1; }
        return this.props.store.sort.order === "ASC" ? comparison : comparison * -1;
      });

    return (
      <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn  width={'15%'} tooltip="Filter by Show" style={{textAlign: 'center'}}>
                <FilterDropdown />
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn width={'15%'} tooltip="The Show">
                Show <button onClick={() => this.handleClick('show')}>{this.props.store.sort.order === "ASC" ? "^" : "v"}</button>
              </TableHeaderColumn>
              <TableHeaderColumn width={'15%'} tooltip="The Season">
                Season <button onClick={() => this.handleClick('season')}>{this.props.store.sort.order === "ASC" ? "^" : "v"}</button>
              </TableHeaderColumn>
              <TableHeaderColumn width={'25%'} tooltip="The Episode">
                Episode <button onClick={() => this.handleClick('title')}>{this.props.store.sort.order === "ASC" ? "^" : "v"}</button>
              </TableHeaderColumn>
              <TableHeaderColumn width={'45%'} tooltip="The Description">
                Description <button onClick={() => this.handleClick('caption')}>{this.props.store.sort.order === "ASC" ? "^" : "v"}</button>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn width={'15%'}>{row.show}</TableRowColumn>
                <TableRowColumn width={'15%'}>{row.season}</TableRowColumn>
                <TableRowColumn width={'25%'}>
                  <img src={row.picture_url} title={row.caption} alt={row.caption} style={styles.ep_img} />
                  {row.title}
                </TableRowColumn>
                <TableRowColumn width={'45%'}><div dangerouslySetInnerHTML={this.createMarkup(row.description)} /></TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}