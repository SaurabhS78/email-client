import React, { Component } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState , convertToRaw} from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html"


export default class TextEditor extends Component {


    state = {
    editorState: EditorState.createEmpty()
     }


onEditorStateChange = (editorState)=>{
this.setState({
    editorState, 
});
};

    render() {
        const{editorState} = this.state
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        return (
            <div>
                <form action="/compose" method="post"> 
                    <label for="email">To:</label>
                    <input type="email" name="to" typeholder="Recipents" id="to" />
                    <label for="subject">Subject:</label>
                    <input type="text" name="Subject" typeholder="Subject" id="Subject"/>
                     
                     
                     <Editor
                     editorState={editorState}
                     toolbarClassName="toolbarClassName"
                     wrapperClassName="wrapperClassName"
                     editorClassName="editorClassName"
                     onEditorStateChange={this.onEditorStateChange}
                     />
                 
                    
                     <div className="choice">
                        <input type="radio" id="immediate" name ="choose" defaultValue ="1"/>
                        <label for="immediate">Send Immediately:</label>
                     </div>

                    <div className="choice">
                        <input type="radio" id="sec" name ="choose" defaultValue ="2"/>
                        <label for="sec">Recuuring Schedule (every 30sec)</label>
                    </div>
                    <div className="choice">
                        <input type="radio" id="week" name ="choose" defaultValue ="3"/>
                        <label for="week">weekly Schedule</label>
                        <input type="text" id="day" name ="day" defaultValue ="0"/>
                    </div>
           

                    <div className="choice">
                        <input type="radio" id="month" name ="choose" defaultValue ="4"/>
                        <label for="month">monthly Schedule</label>
                    </div>

                    <div className="choice">
                        <input type="radio" id="year" name ="choose" defaultValue ="5"/>
                        <label for="year">yearly Schedule</label>
                    </div>

                    <div className="choice">
                        <label for="sendat">For monthly and yearly early Schedule select date and time:
                            <input type="date" id="sendat" name="date" defaultValue="2020-12-25"/>
                            <input type="time" id="time" placeholder="time" name="time" defaultValue="13:30"/>
                        </label>
                    </div>

        
                    <input type="submit" defaultValue="Submit"/>
    </form>     

            </div>


        );
    }
}

