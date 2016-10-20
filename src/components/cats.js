const h = require('react-hyperscript')
const React = require('react')
const xhr = require('xhr')

const {
  Link
} = require('react-router')

/**
# Cat Search

In cat search we will present the user with an input box and a browse all button,
the input box will be where the user can type a partial cat name and get a
filtered verson of the cats available. The app will show random kitten pictures
using placekitten.com

*/
const Cats = React.createClass({
  getInitialState: function () {
    return {
      s: '',
      results: null
    }
  },
  handleChangeSearch: function (e) {
    this.setState({
      s: e.target.value
    })
  },
  handleSubmit: function (e) {
    e.preventDefault()
    xhr({
      method: 'GET',
      url: '/cats.json',
      json: true
    }, (error, response, results) => {
      this.setState({
        results: results.filter(obj =>
          obj
          .name
          .toUpperCase()
          .indexOf(this.state.s.toUpperCase()) === 0)
      })
    })
  },
  handleBrowseAll: function (e) {
    xhr({
      method: 'GET',
      url: '/cats.json',
      json: true
    }, (error, response, results) => {
      this.setState({
        results
      })
    })
  },
  render: function () {
    function showResults(list) {
      return list.map(cat => h('div', [
        h('img.mt3', {
          src: 'http://placekitten.com/150/100'
        }),
        h('h1', cat.name),
        h('p', cat.from)
      ]))
    }
    return (
      h('div.pa4', [
        h('h1', 'Cat Search'),
        h('form', {
          onSubmit: this.handleSubmit
        }, [
          h('input', {
            onChange: this.handleChangeSearch,
            value: this.state.s
          })
        ]),
        h('button.db.mt2', {
          onClick: this.handleBrowseAll
        }, 'Browse All'),
        this.state.results ? showResults(this.state.results) : null,
        this.state.results && this.state.results.length === 0 ? h('div.red', 'No Cats Found!') : null,
        h(Link, {
          to: '/',
          className: 'link db mt2'
        }, 'Home')
      ])
    )
  }
})

module.exports = Cats
