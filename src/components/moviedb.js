const React = require('react')
const h = require('react-hyperscript')
const {
  Link
} = require('react-router')

const Moviedb = React.createClass({
  getInitialState: function () {
    return {
      s: '',
      r: 'json'
    }
  },
  handleChange: function (e) {
    this.setState({
      s: e.target.value
    })
  },
  handleSubmit: function (e) {
    e.preventDefault()
    this.setState({
      
    })
  },
  render: function () {
    console.log(this.state)
    return h('div.pv2.ph5', [
      h('h1', 'Movies'),
      h('form', {
        onSubmit: this.handleSubmit
      }, [
        h('input.mb2', {
          name: 's',
          onChange: this.handleChange
        })
      ]),
      h('button', 'Browse All'),
      h(Link, {
        to: '/',
        className: 'link db mt2'
      }, 'Home')
    ])
  }
})

module.exports = Moviedb
