import { observable, action, runInAction } from 'mobx';

class Store {

    @observable filterList = [''];
    @observable selectedFilter = '';
    @observable sort = { col: "title", order: "ASC" };
    @observable shows = [];

    @action loadData = async () => { 
        const response = await (await fetch('http://localhost:3001/data')).json();

        runInAction(() => {
            this.shows = response;
            this.shows.forEach(show => this.filterList.push(show.name))
        });
    }

    @action chooseFilter = (value) => this.selectedFilter = value;

    @action setSort = (sortObj) => this.sort = sortObj;
}

export default new Store();