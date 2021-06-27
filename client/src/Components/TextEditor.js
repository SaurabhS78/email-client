import React, { Component, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      subject: "",
      date: "",
      time: "",
      editorState: EditorState.createEmpty(),
      choice: "1",
      weeklyday: "1",
      body: "",
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChoiceChange = (e) => { 
    this.setState({choice : e.target.value});
  }
  submitHandler = (e) => {
    e.preventDefault();
    this.setState({
      body : draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }, () => console.log(this.state))

  };
  

  render() {
    const { editorState , email , subject , date , time , choice , body } = this.state;
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    return (
      <div>
        <form action="/compose" onSubmit={this.submitHandler} method="post">
          <label for="email">To:</label>
          <input
            type="email"
            name="email"
            typeholder="Recipents"
            id="to"
            value={email}
            onChange={this.changeHandler}
          />
          <label for="subject">Subject:</label>
          <input
            type="text"
            name="subject"
            typeholder="Subject"
            id="Subject"
            value={subject}
            onChange={this.changeHandler}
          />

          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
          />
          <fieldset onChange={this.handleChoiceChange}>
          <div className="choice">
            <input
              type="radio"
              id="immediate"
              name="choice"
              value="1"
              checked = {choice == 1}
/>
            <label for="immediate">Send Immediately:</label>
          </div>

          <div className="choice">
            <input type="radio" id="sec" name="choice"  
              value="2"
              checked = {choice == 2}
            />
            <label for="sec">Recuuring Schedule (every 30sec)</label>
          </div>
          <div className="choice">
            <input type="radio" id="week" name="choice" 
              value="3"
              checked = {choice == 3}
            />
            <label for="week">weekly Schedule</label>
          </div>

          <div className="choice">
            <input type="radio" id="month" name="choice" value = "4"
              checked = {choice == 4}
            />
            <label for="month">monthly Schedule</label>
          </div>

          <div className="choice">
            <input type="radio" id="year" name="choice" defaultValue="5" value = "5"
            checked = {choice == 5}
            />
            <label for="year">yearly Schedule</label>
          </div>
          </fieldset>

          <div className="choice">
            <label for="sendat">
              For monthly and yearly early Schedule select date and time:
              <input
                type="date"
                id="sendat"
                name="date"
                defaultValue="2020-12-25"
                value={date}
                onChange={this.changeHandler}
              />
              <input
                type="time"
                id="time"
                placeholder="time"
                name="time"
                defaultValue="13:30"
                value = {time}
                onChange={this.changeHandler}
              />
            </label>
          </div>

          <input type="submit" defaultValue="Submit" />
        </form>
      </div>
    );
  }
}
