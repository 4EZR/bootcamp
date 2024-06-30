import React, { Component } from 'react';
import { Input } from '@/components/ui/input';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }

    handleInputChange = (e) => {
        this.setState({ query: e.target.value });
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.props.onSearch(this.state.query);
        }
    };

    render() {
        return (
            <Input
                ref={this.inputRef}
                type="text"
                value={this.state.query}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                placeholder="Search Content"
                className="w-full px-4 py-2 border rounded-md"
            />
        );
    }
}

export default SearchBar;
