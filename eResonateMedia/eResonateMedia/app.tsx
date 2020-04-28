declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

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
                <div class="pseudo_td">
                    <img className="magnifying_glass" src="/images/magnifying_glass.jpg" />
                    <div className="header_ball"></div>
                </div>
            </div>
        </div>
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

ReactDOM.render([<HeaderElements />/*, <ChildElement />*/], document.getElementById('root'));