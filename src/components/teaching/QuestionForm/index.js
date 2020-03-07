import React, { Component } from 'react';
import { EMPTY } from '../../../utils/constants';

export class QuestionForm extends Component {
    state = {
        questionText: '',
    };

    componentDidMount() {
        const {
            initialState
        } = this.props;

        if (initialState) {
            if (initialState === EMPTY)
                this.setState({
                    questionText: '',
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
                    questionText: '',
                });
                
            else
                this.setState(initialState);
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const {
            questionText,
        } = this.state;

        this.props.onSubmit({
            questionText,
        });

        this.setState({
            questionText: '',
        });
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const {
            questionText,
        } = this.state;

        return (
            <form className="form" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Question Text</label>
                    <input
                        className="form-control"
                        type="text"
                        name="questionText"
                        onChange={this.onChange}
                        value={questionText}
                        />
                </div>
                <div className="form-group mt-4">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        )
    }
}

export default QuestionForm
