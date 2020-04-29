declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
var validator = require("email-validator");

/*export class Hello extends React.Component {
    render() {
        return (
            <center>Welcome to React!!</center>
        );
    }
}*/
const root = document.getElementById("root");

class HeaderElements extends React.Component
{
    render = (() =>
    {
        return <div className="header">
            <div className="pseudo_table header_table">
                <div className="pseudo_td">
                    <img className="magnifying_glass" src="/images/magnifying_glass.jpg" />
                    <div className="header_ball"></div>
                </div>
            </div>
        </div>
    });
}
class TextInput
{
    render = (() =>
    {
        return <input type="text" />
    });
}
class FormElement extends React.Component
{
    
    componentDidMount = (() =>
    {
        /*
         * The image gets rendered on top, so calculate the margin top of the form
         * 
         */

        let form = document.querySelector(".form_root") as HTMLElement;
        let img = document.querySelector(".form_bg_img") as HTMLImageElement;


        let img_completed = false;
        let temp_interval = setInterval(function()
        {
            img_completed = (img.complete);
            console.log(img_completed);
            if(img_completed)
            {
                clearInterval(temp_interval);
                let img_height = img.offsetHeight;
                console.log(img_height);
              
                img.style.height = form.clientHeight.toString() + "px";
                let new_img_height = img.clientHeight + 75; // +75 because the margin-bottom isn't getting returned...
                console.log(new_img_height);
                form.style.marginTop = "-" + new_img_height.toString() + "px";
                
                
            }
        }, 50);
        setTimeout(() =>
        {

        }, 1000);            
        
    })

    id_validation_fn_mapping = 
    {
        "name": ((str) =>
        {
            // some vietname names are two characters long...
            return str.length > 1;
        }),
        "phone": ((str) =>
        {
            let digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
            let digits_found = [];
                
            if(str.trim().length > 0)
            {
                str.trim().split("").map(function(character)
                {
                    if(digits.indexOf(character) > -1)
                    {
                        digits_found.push(character);
                    }
                })
            }
            return digits_found.length === 10;
        }),
        "email": ((str) =>
        {
            return validator.validate(str.trim())
        }),
        "msg": ((str) =>
        {
            return str.trim().length > 0;
        })

    }

    keyUpDelegate = ((ev) =>
    {
        // when the tab key is pressed on the form and moves to the next field,
        // it causes the error message to show up right away...
        if(ev.keyCode === 9)
        {
            return;
        }
        let element = ev.target;
        let id = element.id;
        var value = element.value;
        let error_msg_root = element.parentElement.previousSibling;

        var result = this.id_validation_fn_mapping[id](value);
        if(result === true)
        {
            error_msg_root.querySelectorAll(".actual_msg, .error").forEach((el) =>
            {
                el.style.display = "none";
            });
            error_msg_root.querySelector(".success").style.display = "inline-block";
        }
        else
        {
            error_msg_root.querySelectorAll(".actual_msg, .error").forEach((el) =>
            {
                el.style.display = "inline-block";
            });
            error_msg_root.querySelector(".success").style.display = "none";
        }

    });

    render = (() =>
    {
        return <>
                <img src="/images/form_bg.jpg" className="form_bg_img"></img>
                <div className="pseudo_table">
                    <div className="pseudo_td">
                        <form className="form_root">
                            <div className="top_form_spacer">
                            </div>
                            <h1 className="form_header">
                                Report a Problem
                            </h1>
                            <div className="fields_root">
                                <div className="form_lbl">
                                    Your Name
                                </div>
                                <div className="error_msg">
                                    <p>
                                        <span className="error">&#128683;</span>
                                        <span className="success">&#10003;</span>
                                        <span className="actual_msg">The first name field must be provided.</span>
                                    </p>
                                </div>
                                <div className="form_input">
                                    <input type="text" id="name" onKeyUp={this.keyUpDelegate}/>
                                </div>
                                <div className="form_lbl">
                                        Phone Number
                                </div>
                                <div className="error_msg">
                                    <p>
                                        <span className="error">&#128683;</span>
                                        <span className="success">&#10003;</span>
                                        <span className="actual_msg">Please provide a phone number.</span>
                                    </p>
                                </div>
                                <div className="form_input">
                                    <input type="text" id="phone" onKeyUp={this.keyUpDelegate}/>
                                </div>
                                <div className="form_lbl">
                                    Email
                                </div>
                                <div className="error_msg">
                                        <p>
                                            <span className="error">&#128683;</span>
                                            <span className="success">&#10003;</span>
                                            <span className="actual_msg">A valid email address is required.</span>
                                        </p>
                                    </div>
                                <div className="form_input">
                                    <input type="text" id="email" onKeyUp={this.keyUpDelegate} />
                                </div>
                                <div className="form_lbl">
                                    Message
                                </div>
                                <div className="error_msg">
                                    <p>
                                        <span class="error">&#128683;</span>
                                        <span className="success">&#10003;</span>
                                        <span className="actual_msg">Please type a detailed message</span>
                                    </p>
                                </div>
                                <div className="form_input">
                                    <textarea id="msg" onKeyUp={this.keyUpDelegate}>
                                    </textarea>
                                </div>
                                <div className="submit_button">
                                    Submit
                                </div>
                            </div>                            
                       </form>
                    </div>
                </div>
                </>
    });
}

/*class ChildElement extends React.Component
{
    render = (() =>
    {
        return <p>Child Element</p>
    });
}

class ParentElement extends React.Component
{
    render = (() =>
    {
        return <p>Parent Element</p>;
    });
}*/

ReactDOM.render([<HeaderElements />, <FormElement />/*, <ChildElement />*/], document.getElementById('root'));