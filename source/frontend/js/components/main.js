var React = require('react');
  
var Main = React.createClass({
    render: function(){
        return (
          <div className="hero">
            <h1>HELLO WORLD</h1>
          </div>
        );
    }

});

React.render(<Main />, document.getElementById('page-contain'));

module.exports = Main;