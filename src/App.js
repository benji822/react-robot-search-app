import React from "react";
import axios from "axios";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box-component";
import "./App.css";

class App extends React.Component {
    state = {
        users: [],
        searchField: ""
    };

    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
            const users = res.data;
            this.setState({ users });
        });
    }

    onInputChange = e => {
        this.setState({ searchField: e.target.value });
    };

    render() {
        const { users, searchField } = this.state;
        const filterUsers = users.filter(user => {
            return user.name.toLowerCase().includes(searchField.toLowerCase());
        });
        return (
            <div className="App">
                <h1>Monster Rolodex</h1>
                <SearchBox
                    placeHolder="Search Monster"
                    searchField={this.state.searchField}
                    handleChange={this.onInputChange}
                />
                <CardList users={filterUsers} />
            </div>
        );
    }
}

export default App;
