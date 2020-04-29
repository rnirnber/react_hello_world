declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
var validator = require("email-validator");

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
    
    initial_keyup_detected_map = 
    {
        "name": false,
        "phone": false,
        "email": false,
        "msg": false
    }

    form_submitted = false

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

    submitButtonDelegate = (() =>
    {
        if(this.form_submitted)
        {
            return;
        }

        let error_msg = "All form fields must be provided in a valid format.";
        let show_missing_fields_message = false;
        
        Object.keys(this.initial_keyup_detected_map).forEach((key) =>
        {
            if(this.initial_keyup_detected_map[key] === false)
            {
                show_missing_fields_message = true;
            }
        });
        if(show_missing_fields_message)
        {
            window.alert(error_msg);
            return;
        }

        let form_elements = Array.prototype.slice.call(document.querySelectorAll(".form_input input, .form_input textarea"));
        let form_data = new FormData();
        let form_fields = [];

        form_elements.map((element) =>
        {
            let error_msg_root = element.parentElement.previousSibling;
            let error_span = error_msg_root.querySelector(".error");
            if(error_span.style.display.toLowerCase() === "none")
            {
                form_fields.push({"key": element.id, "value": element.value.trim()});
                form_data.append(element.id, element.value.trim());

            }            
        });
        if(form_elements.length !== form_fields.length)
        {
            window.alert("The form could not be submitted. Please correct the errors.");
            return;
        }
        
        console.log(form_fields);
        this.form_submitted = true;
        let submit_btn = document.querySelector(".submit_button") as HTMLElement;
        submit_btn.style.opacity = "0.25";
        fetch("/send_report",
        {
            body: form_data,
            method: "post"
        }).then((response) =>
        {
            submit_btn.style.opacity = "1.0";
            submit_btn.innerText = "All Set!";
        })
        .catch(() =>
        {
            submit_btn.style.opacity = "1.0";
            //submit_btn.innerText = "Uh oh?"

            // this is only for testing purposes since the POST handler isn't set up.
            submit_btn.innerText = "All Set!";

        });
        console.log(form_data);
    });

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
        this.initial_keyup_detected_map[id] = true;
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
                                        <span className="actual_msg">A name must be provided.</span>
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
                                        <span className="actual_msg">Phone is required.</span>
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
                                        <span className="error">&#128683;</span>
                                        <span className="success">&#10003;</span>
                                        <span className="actual_msg">A message is required.</span>
                                    </p>
                                </div>
                                <div className="form_input">
                                    <textarea id="msg" onKeyUp={this.keyUpDelegate}>
                                    </textarea>
                                </div>
                                <div className="submit_button" onClick={this.submitButtonDelegate}>
                                    Submit
                                </div>
                            </div>                            
                       </form>
                    </div>
                </div>
                </>
    });
}
class FooterElement extends React.Component
{
    render = (() =>
    {
        return <div className="pseudo_table" id="footer_root">
                    <div className="pseudo_td">
                        <div className="footer_spacing">
                        </div>
                        <table className="social_media_links_root">
                            <tbody>
                                <tr>
                                    <td>
                                        <a href="#" className="social_media_link twitter_link">
                                            <img src="/images/twitter_logo.jpg" />
                                        </a>
                                    </td>
                                    <td>
                                        <a href="#" className="social_media_link linked_in_link">
                                            <img src="/images/linked_in_logo.jpg" />
                                        </a>
                                    </td>
                                    <td>
                                        <a href="#" className="social_media_link instagram_link">
                                            <img src="/images/instagram_logo.jpg" />
                                        </a>
                                    </td>
                                </tr>
                            </tbody>                            
                        </table>
                        <div className="footer_spacing">
                        </div>
                        <table className="footer_links_table">
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="first_link_set">
                                            <a href="#">Claim Your Venue</a>
                                            <a href="#">Venue Login</a>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="second_link_set">
                                            <a href="#">Terms and Conditions</a>
                                            <a href="#">Privacy Policy</a>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="third_link_set link_set_desktop_only">
                                            <p>
                                                <span>Default</span>
                                                <span className="third_link_whitespace"></span>
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="third_link_set link_set_mobile_only">
                                    <td colSpan="2">
                                        <div className="default_wrapper">
                                            <div className="third_link_set link_set_mobile_only_div">
                                                <p>
                                                    <span>Default</span>
                                                    <span className="third_link_whitespace"></span>
                                                </p>
                                            </div>
                                        </div>                                        
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="footer_spacing">                            
                        </div>
                    </div>
               </div>
    });
}

ReactDOM.render([<HeaderElements />, <FormElement />, <FooterElement />], document.getElementById('root'));