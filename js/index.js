'use strict';

var container = document.getElementById('container');
var recentLink = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
var alltimeLink = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
var recent = [];
var alltime;
var columnLabels = [{ 'id': 'rankHeader',
  'label': 'Rank'
}, {
  'id': 'camperHeader',
  'label': 'FCC Campers'
}, {
  'id': 'recentHeader',
  'label': 'Recent points'
}, {
  'id': 'alltimeHeader',
  'label': 'All time points'
}];

var Table = React.createClass({
  displayName: 'Table',

  generateHeaders: function generateHeaders() {
    //generate header columns
    var cols = this.props.cols;
    var tabledata = [];
    var string = 'points';
    for (var item in cols) {
      var tableLabel = cols[item].label;
      // if label contain the word points
      if (tableLabel.includes(string)) {
        tabledata.push(React.createElement(
          'th',
          { id: cols[item].id, onClick: this.clickHandler },
          cols[item].label,
          React.createElement('i', { className: 'fa fa-fw fa-sort' })
        ));
      } else {
        tabledata.push(React.createElement(
          'th',
          { id: cols[item].id },
          cols[item].label
        ));
      }
    }
    return tabledata;
  },

  generateCells: function generateCells() {
    //generate rows and cells
    var data = this.props.data;
    var count = 1;
    return data.map(function (obj) {
      var link = 'https://www.freecodecamp.com/' + obj.username;
      var tabledata = [];
      tabledata.push(React.createElement(
        'td',
        { className: 'tableCells rank' },
        count
      ));
      tabledata.push(React.createElement(
        'td',
        { className: 'tableCells userName' },
        React.createElement(
          'a',
          { href: link, target: '_blank' },
          React.createElement(
            'span',
            { className: 'imgSpan' },
            React.createElement('img', { src: obj.img, className: 'img' }),
            React.createElement(
              'span',
              { className: 'usernameSpan' },
              obj.username
            )
          )
        )
      ));
      tabledata.push(React.createElement(
        'td',
        { className: 'tableCells recent' },
        obj.recent
      ));
      tabledata.push(React.createElement(
        'td',
        { className: 'tableCells alltime' },
        obj.alltime
      ));
      count++;
      return React.createElement(
        'tr',
        null,
        tabledata
      );
    });
  },

  clickHandler: function clickHandler(event) {
    // re renders the page depending on whether recent or all time points were clicked
    if (event.target.id === 'recentHeader') {
      ReactDOM.render(React.createElement(Table, { cols: columnLabels, data: recent }), container);
    } else {
      ReactDOM.render(React.createElement(Table, { cols: columnLabels, data: alltime }), container);
    }
  },

  render: function render() {
    var headerItems = this.generateHeaders();
    var rowItems = this.generateCells();
    return React.createElement(
      'div',
      { id: 'mainDiv' },
      React.createElement(
        'h2',
        { id: 'leaderboardHeading' },
        React.createElement(
          'a',
          { href: 'http://www.freecodecamp.com', target: '_blank' },
          'FreeCodeCamp ',
          React.createElement('i', { className: 'fa fa-fw fa-free-code-camp' })
        ),
        ' Leaderboard'
      ),
      React.createElement(
        'div',
        { className: 'panel panel-default' },
        React.createElement(
          'table',
          { className: 'table table-bordered' },
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              { id: 'headerRow' },
              headerItems
            )
          ),
          React.createElement(
            'tbody',
            { id: 'rowBody' },
            ' ',
            rowItems,
            ' '
          )
        )
      ),
      React.createElement(
        'h4',
        { id: 'footer' },
        '*** By',
        React.createElement(
          'a',
          { href: 'http://www.freecodecamp.com/tc216997', target: '_blank' },
          ' @tc216997'
        ),
        ' ***'
      )
    );
  }

});

ReactDOM.render(React.createElement(Table, { cols: columnLabels, data: recent }), container);
// first initial call to get data by recent points
// makes a second call to get data by alltime points
// when user click the alltime points, theres no need to get json again
// making a tradeoff for speed with space
$.getJSON(recentLink, function (data) {
  recent = data;
  ReactDOM.render(React.createElement(Table, { cols: columnLabels, data: recent }), container);
  $.getJSON(alltimeLink, function (data) {
    alltime = data;
  });
});