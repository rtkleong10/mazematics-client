import React, { Component } from 'react';
import { EMPTY } from '../../../utils/constants';

export class LearningMaterialForm extends Component {
    state = {
        title: '',
        description: '',
        link: '',
    };

    componentDidMount() {
        const {
            initialState
        } = this.props;

        if (initialState) {
            if (initialState === EMPTY)
                this.setState({
                    title: '',
                    description: '',
                    link: '',
                });

            else
                this.setState(initialState);
        }
    }

    componentDidUpdate(prevProps) {
        const {
            initialState
        } = this.props;

        if (initialState && initialState !== prevProps.initialState) {
            if (initialState === EMPTY)
                this.setState({
                    title: '',
                    description: '',
                    link: '',
                });
                
            else
                this.setState(initialState);
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const {
            title,
            description,
            link,
        } = this.state;

        this.props.onSubmit({
            title,
            description,
            link,
        });

        this.setState({
            title: '',
            description: '',
            link: '',
        });
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const {
            title,
            description,
            link,
        } = this.state;

        return (
            <form className="form" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        onChange={this.onChange}
                        value={title}
                        />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        className="form-control"
                        type="text"
                        name="description"
                        onChange={this.onChange}
                        value={description}
                        />
                </div>
                <div className="form-group">
                    <label>Link</label>
                    <input
                        className="form-control"
                        type="text"
                        name="link"
                        onChange={this.onChange}
                        value={link}
                        />
                </div>
                <div className="form-group mt-4">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        )
    }
}

export default LearningMaterialForm
