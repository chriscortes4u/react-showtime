const React = require('react')
const h = require('react-hyperscript')
const xhr = require('xhr')
const { Link } = require('react-router')

const Moviedb = React.createClass({
  getInitialState: function () {
    return {
      s: '',
      r: 'json',
      results: {}
    }
  },
  handleChange: function (e) {
    this.setState({
      s: e.target.value
    })
  },
  handleSubmit: function (e) {
    e.preventDefault()
    xhr({
      method: 'GET',
      json: true,
      url: `https://www.omdbapi.com/?r=${this.state.r}&s=${this.state.s}`
    }, (err, resp, body) => {
      if (err) return console.log(err.message)
      this.setState({
        results: body
      })
    })
  },
  render: function () {
    console.log(this.state)
    // var count = 0
    var content = ''

    if (this.state.results['Response'] === 'False') {
      content = [
        h('p.f1', { 'style': {'color': 'red'} }, 'No Results'),
        h('img', { src: './img/magic-word-2.gif' })
      ]
    }
    if (this.state.results['Search']) {
      // count = this.state.results['Search'].length
      content = this.state.results['Search'].map(movie =>
        h('div.movie-container', [
          h('div.fl.db.w-100.w-50-m.w-25-l.overflow-hidden', {
            style: {
              position: 'relative',
              cursor: 'pointer'
            }
          }, [
            h('a.db.w-100.h-100.aspect-ratio--4x6.grow', {
              href: 'http://www.imdb.com/title/' + movie.imdbID,
              target: '_blank',
              style: {
                background: `url(${movie.Poster}) no-repeat center center`,
                backgroundSize: 'cover'
              }
            }, ''),
            h('h2.f3.pa2.tc', {
              style: {
                position: 'absolute',
                bottom: '10px',
                left: '0'
              }
            }, [
              h('a.link', {
                href: 'http://www.imdb.com/title/' + movie.imdbID,
                style: {
                  color: 'white',
                  textShadow: '2px 2px 6px rgba(0,0,0,.9)'
                }
              },
              movie.Title + ' (' + movie.Year + ')')
            ]
            )
          ])
        ])
      )
    }

    return h('div.pv2.ph5', [
      h('header', [
        h('h1', 'Movies')
        // h('h2', count)
      ]),
      h('form', {
        onSubmit: this.handleSubmit
      }, [
        h('input.mb2', {
          onChange: this.handleChange
        }),
        h('p', [
          h('button', 'Browse All')
        ])
      ]),
      h('div.content.cb', content),
      h(Link, {
        to: '/',
        className: 'link db mt2'
      }, 'Home')
    ])
  }
})

module.exports = Moviedb
